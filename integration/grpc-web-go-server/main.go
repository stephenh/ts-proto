package main

import (
	"flag"
	"fmt"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/grpclog"
	"google.golang.org/grpc/metadata"
	"math/rand"
	"net/http"

	"golang.org/x/net/context"

	rpx "./generated/lib/rpx"
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

	server := grpc.NewServer()
	rpx.RegisterDashStateServer(server, &stateService{})
	rpx.RegisterDashAPICredsServer(server, &credsService{})

	wrappedServer := grpcweb.WrapServer(server)

	handler := func(resp http.ResponseWriter, req *http.Request) {
		grpclog.Infof("Request: %v", req)
		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: http.HandlerFunc(handler),
	}

	grpclog.Infof("Starting server. http port: %d, with TLS: %v", port, *enableTls)

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

func (s *stateService) UserSettings(ctx context.Context, in *rpx.Empty) (*rpx.DashUserSettingsState, error) {
	grpc.SendHeader(ctx, metadata.Pairs("Pre-Response-Metadata", "Is-sent-as-headers-unary"))
	grpc.SetTrailer(ctx, metadata.Pairs("Post-Response-Metadata", "Is-sent-as-trailers-unary"))

	urls := rpx.DashUserSettingsState_URLs{
		ConnectGoogle: "http://google.com",
		ConnectGithub: "http://github.com",
	}

	flashes := []*rpx.DashFlash{
		&rpx.DashFlash{Msg: "flash1", Type: rpx.DashFlash_Warn},
		&rpx.DashFlash{Msg: "flash2", Type: rpx.DashFlash_Success},
	}

	settings := rpx.DashUserSettingsState{
		Email:   "test-email@example.com",
		Urls:    &urls,
		Flashes: flashes,
	}

	return &settings, nil
}

func (s *stateService) ActiveUserSettingsStream(in *rpx.Empty, stream rpx.DashState_ActiveUserSettingsStreamServer) error {
	urls := rpx.DashUserSettingsState_URLs{
		ConnectGoogle: "http://google.com",
		ConnectGithub: "http://github.com",
	}

	flashes := []*rpx.DashFlash{
		&rpx.DashFlash{Msg: "flash1", Type: rpx.DashFlash_Warn},
		&rpx.DashFlash{Msg: "flash2", Type: rpx.DashFlash_Success},
	}

	stream.Send(&rpx.DashUserSettingsState{Email: "test1-email@example.com", Urls: &urls, Flashes: flashes})
	stream.Send(&rpx.DashUserSettingsState{Email: "test2-email@example.com", Urls: &urls, Flashes: flashes})
	stream.Send(&rpx.DashUserSettingsState{Email: "test3-email@example.com", Urls: &urls, Flashes: flashes})

	return nil
}

type credsService struct{}

var creds = map[string]rpx.DashCred{}

func (s *credsService) Create(c context.Context, in *rpx.DashAPICredsCreateReq) (*rpx.DashCred, error) {
	cred := rpx.DashCred{
		Description: in.Description,
		Metadata:    in.Metadata,
		Token:       "token123",
		Id:          fmt.Sprintf("id-%d", rand.Int()),
	}

	creds[cred.Id] = cred

	return &cred, nil
}

func (s *credsService) Update(c context.Context, in *rpx.DashAPICredsUpdateReq) (*rpx.DashCred, error) {
	fmt.Println("Update", in.CredSid)
	return nil, grpc.Errorf(codes.NotFound, "not found")
}

func (s *credsService) Delete(c context.Context, in *rpx.DashAPICredsDeleteReq) (*rpx.DashCred, error) {
	grpclog.Infof("DELETE ID: %v", in.Id)

	cred, ok := creds[in.Id]

	grpclog.Infof("cred: %v", creds)

	if !ok {
		return nil, grpc.Errorf(codes.NotFound, "not found")
	}
	delete(creds, in.Id)
	return &cred, nil
}
