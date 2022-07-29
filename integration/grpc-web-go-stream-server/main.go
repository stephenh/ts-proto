package main

import (
	"crypto/tls"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	testproto "grpc-web-go-stream-server/generated/lib/rpx"

	google_protobuf "github.com/golang/protobuf/ptypes/empty"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/status"
)

var (
	httpPort = flag.Int("http_port", 9090, "Port to listen.")
)

func main() {
	flag.Parse()

	grpcServer := grpc.NewServer()
	testServer := &testSrv{}
	testproto.RegisterTestServiceServer(grpcServer, testServer)

	grpclog.SetLogger(log.New(os.Stdout, "grpc-go-stream-server: ", log.LstdFlags))

	websocketOriginFunc := grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
		return true
	})
	httpOriginFunc := grpcweb.WithOriginFunc(func(origin string) bool {
		return true
	})

	wrappedServer := grpcweb.WrapServer(
		grpcServer,
		grpcweb.WithWebsockets(true),
		httpOriginFunc,
		websocketOriginFunc,
	)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr: fmt.Sprintf(":%d", *httpPort),
		Handler: http.HandlerFunc(func(resp http.ResponseWriter, req *http.Request) {
			resp.Header().Add("Access-Control-Allow-Credentials", "true")
			resp.Header().Add("Access-Control-Allow-Headers", "*")
			resp.Header().Add("Access-Control-Allow-Methods", "*")
			resp.Header().Add("Access-Control-Allow-Origin", "*")
			resp.Header().Add("Access-Control-Expose-Headers", "Upload-Offset, Content-Disposition")
			handler(resp, req)
		}),
	}
	httpServer.TLSNextProto = map[string]func(*http.Server, *tls.Conn, http.Handler){} // Disable HTTP2
	grpclog.Printf("Starting servers port: %d", *httpPort)

	if err := httpServer.ListenAndServe(); err != nil {
		grpclog.Fatal(err)
	}
}

type testSrv struct{}

func (s *testSrv) PingEmpty(ctx context.Context, _ *google_protobuf.Empty) (*testproto.PingResponse, error) {
	return &testproto.PingResponse{Value: "pong"}, nil
}

func (s *testSrv) Ping(ctx context.Context, ping *testproto.PingRequest) (*testproto.PingResponse, error) {
	return &testproto.PingResponse{Value: ping.GetValue()}, nil
}

func (s *testSrv) PingError(ctx context.Context, ping *testproto.PingRequest) (*google_protobuf.Empty, error) {
	return nil, status.Errorf(codes.Code(codes.Aborted), ping.Value)
}

func (s *testSrv) PingList(ping *testproto.PingRequest, stream testproto.TestService_PingListServer) error {
	value := ping.GetValue()
	for {
		select {
		case <-stream.Context().Done():
			grpclog.Info("PingList context done.")
			return nil
		case <-time.After(time.Second):
			err := stream.Send(&testproto.PingResponse{
				Value: fmt.Sprintf("[%s] pong with %s", time.Now(), value),
			})
			if err != nil {
				return err
			}
		}
	}
}

func (s *testSrv) PingStream(stream testproto.TestService_PingStreamServer) error {
	var allValue []string
	for {
		in, err := stream.Recv()
		if err == io.EOF {
			stream.SendAndClose(&testproto.PingResponse{
				Value: strings.Join(allValue, ","),
			})
			return nil
		}
		if err != nil {
			return err
		}
		allValue = append(allValue, in.GetValue())
	}
}

func (s *testSrv) PingPongBidi(stream testproto.TestService_PingPongBidiServer) error {
	for {
		in, err := stream.Recv()
		if err == io.EOF {
			return nil
		}
		if err != nil {
			return err
		}
		sendErr := stream.Send(&testproto.PingResponse{
			Value: in.Value,
		})
		if sendErr != nil {
			// If there was a send error then stop the test server non-gracefully to ensure tests fail in an
			// identifiable way
			panic(sendErr)
		}
	}
}
