package main

import (
	"flag"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/net/context"

	pb "./src/lib/pb"
	rpx "./src/lib/rpx"
)

var (
	enableTls       = flag.Bool("enable_tls", false, "Use TLS - required for HTTP2.")
	tlsCertFilePath = flag.String("tls_cert_file", "../../misc/localhost.crt", "Path to the CRT/PEM file.")
	tlsKeyFilePath  = flag.String("tls_key_file", "../../misc/localhost.key", "Path to the private key file.")
)

func main() {
	flag.Parse()

	port := 9090
	if *enableTls {
		port = 9091
	}

	grpcServer := grpc.NewServer()

	rpx.RegisterDashStateServer(grpcServer, &stateService{})
	rpx.RegisterDashAPICredsServer(grpcServer, &credsService{})

	grpclog.SetLogger(log.New(os.Stdout, "exampleserver: ", log.LstdFlags))

	wrappedServer := grpcweb.WrapServer(grpcServer)

	handler := func(resp http.ResponseWriter, req *http.Request) {
		grpclog.Printf("Request: %v", req)
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	grpclog.Printf("Starting server. http port: %d, with TLS: %v", port, *enableTls)

	if *enableTls {
		if err := httpServer.ListenAndServeTLS(*tlsCertFilePath, *tlsKeyFilePath); err != nil {
			grpclog.Fatalf("failed starting http2 server: %v", err)
		}
	} else {
		if err := httpServer.ListenAndServe(); err != nil {
			grpclog.Fatalf("failed starting http server: %v", err)
		}
	}
}

type stateService struct{}

func (s *stateService) UserSettings(ctx context.Context, in *pb.Empty) (*rpx.DashUserSettingsState, error) {
	grpc.SendHeader(ctx, metadata.Pairs("Pre-Response-Metadata", "Is-sent-as-headers-unary"))
	grpc.SetTrailer(ctx, metadata.Pairs("Post-Response-Metadata", "Is-sent-as-trailers-unary"))

	urls := rpx.DashUserSettingsState_URLs{
		ConnectGoogle: "http://google.com",
		ConnectGithub: "http://github.com",
	}

	flashes := []*rpx.DashFlash{
		&rpx.DashFlash{
			Msg:  "flash1",
			Type: rpx.DashFlash_Warn,
		},
		&rpx.DashFlash{
			Msg:  "flash2",
			Type: rpx.DashFlash_Success,
		},
	}

	val := rpx.DashUserSettingsState{
		Email:   "test-email@example.com",
		URLs:    &urls,
		Flashes: flashes,
	}

	return &val, nil
}

type credsService struct{}

var creds = map[string]rpx.DashCred{}

func (s *credsService) Create(c context.Context, in *rpx.DashAPICredsCreateReq) (*rpx.DashCred, error) {
	cred := rpx.DashCred{
		Description: in.Description,
		Metadata:    in.Metadata,
		Token:       "token123",
		ID:          &pb.ID{ID: fmt.Sprintf("id-%d", rand.Int())},
	}

	creds[cred.ID.String()] = cred

	return &cred, nil
}

func (s *credsService) Update(c context.Context, in *rpx.DashAPICredsUpdateReq) (*rpx.DashCred, error) {

	fmt.Println("Update", in.CredSID)
	return nil, grpc.Errorf(codes.NotFound, "not found")
}

func (s *credsService) Delete(c context.Context, in *rpx.DashAPICredsDeleteReq) (*rpx.DashCred, error) {
	grpclog.Printf("DELETE ID: %v", in.ID)

	cred, ok := creds[in.ID.String()]

	grpclog.Printf("cred: %v", creds)

	if !ok {
		return nil, grpc.Errorf(codes.NotFound, "not found")
	}
	delete(creds, in.ID.String())
	return &cred, nil
}
