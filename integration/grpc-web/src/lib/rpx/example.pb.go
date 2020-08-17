// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: example.proto

package rpx

import (
	pb "../pb"
	context "context"
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type DashFlash_Type int32

const (
	DashFlash_Undefined DashFlash_Type = 0
	DashFlash_Success   DashFlash_Type = 1
	DashFlash_Warn      DashFlash_Type = 2
	DashFlash_Error     DashFlash_Type = 3
)

var DashFlash_Type_name = map[int32]string{
	0: "Undefined",
	1: "Success",
	2: "Warn",
	3: "Error",
}

var DashFlash_Type_value = map[string]int32{
	"Undefined": 0,
	"Success":   1,
	"Warn":      2,
	"Error":     3,
}

func (x DashFlash_Type) String() string {
	return proto.EnumName(DashFlash_Type_name, int32(x))
}

func (DashFlash_Type) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{0, 0}
}

type DashFlash struct {
	Msg                  string         `protobuf:"bytes,1,opt,name=msg,proto3" json:"msg,omitempty"`
	Type                 DashFlash_Type `protobuf:"varint,2,opt,name=type,proto3,enum=rpx.DashFlash_Type" json:"type,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *DashFlash) Reset()         { *m = DashFlash{} }
func (m *DashFlash) String() string { return proto.CompactTextString(m) }
func (*DashFlash) ProtoMessage()    {}
func (*DashFlash) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{0}
}
func (m *DashFlash) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashFlash.Unmarshal(m, b)
}
func (m *DashFlash) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashFlash.Marshal(b, m, deterministic)
}
func (m *DashFlash) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashFlash.Merge(m, src)
}
func (m *DashFlash) XXX_Size() int {
	return xxx_messageInfo_DashFlash.Size(m)
}
func (m *DashFlash) XXX_DiscardUnknown() {
	xxx_messageInfo_DashFlash.DiscardUnknown(m)
}

var xxx_messageInfo_DashFlash proto.InternalMessageInfo

func (m *DashFlash) GetMsg() string {
	if m != nil {
		return m.Msg
	}
	return ""
}

func (m *DashFlash) GetType() DashFlash_Type {
	if m != nil {
		return m.Type
	}
	return DashFlash_Undefined
}

type DashUserSettingsState struct {
	Email                string                      `protobuf:"bytes,1,opt,name=email,proto3" json:"email,omitempty"`
	URLs                 *DashUserSettingsState_URLs `protobuf:"bytes,6,opt,name=urls,proto3" json:"urls,omitempty"`
	Flashes              []*DashFlash                `protobuf:"bytes,7,rep,name=flashes,proto3" json:"flashes,omitempty"`
	XXX_NoUnkeyedLiteral struct{}                    `json:"-"`
	XXX_unrecognized     []byte                      `json:"-"`
	XXX_sizecache        int32                       `json:"-"`
}

func (m *DashUserSettingsState) Reset()         { *m = DashUserSettingsState{} }
func (m *DashUserSettingsState) String() string { return proto.CompactTextString(m) }
func (*DashUserSettingsState) ProtoMessage()    {}
func (*DashUserSettingsState) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{1}
}
func (m *DashUserSettingsState) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashUserSettingsState.Unmarshal(m, b)
}
func (m *DashUserSettingsState) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashUserSettingsState.Marshal(b, m, deterministic)
}
func (m *DashUserSettingsState) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashUserSettingsState.Merge(m, src)
}
func (m *DashUserSettingsState) XXX_Size() int {
	return xxx_messageInfo_DashUserSettingsState.Size(m)
}
func (m *DashUserSettingsState) XXX_DiscardUnknown() {
	xxx_messageInfo_DashUserSettingsState.DiscardUnknown(m)
}

var xxx_messageInfo_DashUserSettingsState proto.InternalMessageInfo

func (m *DashUserSettingsState) GetEmail() string {
	if m != nil {
		return m.Email
	}
	return ""
}

func (m *DashUserSettingsState) GetURLs() *DashUserSettingsState_URLs {
	if m != nil {
		return m.URLs
	}
	return nil
}

func (m *DashUserSettingsState) GetFlashes() []*DashFlash {
	if m != nil {
		return m.Flashes
	}
	return nil
}

type DashUserSettingsState_URLs struct {
	ConnectGoogle        string   `protobuf:"bytes,1,opt,name=connect_google,json=connectGoogle,proto3" json:"connect_google,omitempty"`
	ConnectGithub        string   `protobuf:"bytes,2,opt,name=connect_github,json=connectGithub,proto3" json:"connect_github,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DashUserSettingsState_URLs) Reset()         { *m = DashUserSettingsState_URLs{} }
func (m *DashUserSettingsState_URLs) String() string { return proto.CompactTextString(m) }
func (*DashUserSettingsState_URLs) ProtoMessage()    {}
func (*DashUserSettingsState_URLs) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{1, 0}
}
func (m *DashUserSettingsState_URLs) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashUserSettingsState_URLs.Unmarshal(m, b)
}
func (m *DashUserSettingsState_URLs) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashUserSettingsState_URLs.Marshal(b, m, deterministic)
}
func (m *DashUserSettingsState_URLs) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashUserSettingsState_URLs.Merge(m, src)
}
func (m *DashUserSettingsState_URLs) XXX_Size() int {
	return xxx_messageInfo_DashUserSettingsState_URLs.Size(m)
}
func (m *DashUserSettingsState_URLs) XXX_DiscardUnknown() {
	xxx_messageInfo_DashUserSettingsState_URLs.DiscardUnknown(m)
}

var xxx_messageInfo_DashUserSettingsState_URLs proto.InternalMessageInfo

func (m *DashUserSettingsState_URLs) GetConnectGoogle() string {
	if m != nil {
		return m.ConnectGoogle
	}
	return ""
}

func (m *DashUserSettingsState_URLs) GetConnectGithub() string {
	if m != nil {
		return m.ConnectGithub
	}
	return ""
}

type DashCred struct {
	Description          string   `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	Metadata             string   `protobuf:"bytes,3,opt,name=metadata,proto3" json:"metadata,omitempty"`
	Token                string   `protobuf:"bytes,4,opt,name=token,proto3" json:"token,omitempty"`
	ID                   *pb.ID   `protobuf:"bytes,7,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DashCred) Reset()         { *m = DashCred{} }
func (m *DashCred) String() string { return proto.CompactTextString(m) }
func (*DashCred) ProtoMessage()    {}
func (*DashCred) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{2}
}
func (m *DashCred) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashCred.Unmarshal(m, b)
}
func (m *DashCred) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashCred.Marshal(b, m, deterministic)
}
func (m *DashCred) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashCred.Merge(m, src)
}
func (m *DashCred) XXX_Size() int {
	return xxx_messageInfo_DashCred.Size(m)
}
func (m *DashCred) XXX_DiscardUnknown() {
	xxx_messageInfo_DashCred.DiscardUnknown(m)
}

var xxx_messageInfo_DashCred proto.InternalMessageInfo

func (m *DashCred) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *DashCred) GetMetadata() string {
	if m != nil {
		return m.Metadata
	}
	return ""
}

func (m *DashCred) GetToken() string {
	if m != nil {
		return m.Token
	}
	return ""
}

func (m *DashCred) GetID() *pb.ID {
	if m != nil {
		return m.ID
	}
	return nil
}

type DashAPICredsCreateReq struct {
	Description          string   `protobuf:"bytes,1,opt,name=description,proto3" json:"description,omitempty"`
	Metadata             string   `protobuf:"bytes,2,opt,name=metadata,proto3" json:"metadata,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DashAPICredsCreateReq) Reset()         { *m = DashAPICredsCreateReq{} }
func (m *DashAPICredsCreateReq) String() string { return proto.CompactTextString(m) }
func (*DashAPICredsCreateReq) ProtoMessage()    {}
func (*DashAPICredsCreateReq) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{3}
}
func (m *DashAPICredsCreateReq) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashAPICredsCreateReq.Unmarshal(m, b)
}
func (m *DashAPICredsCreateReq) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashAPICredsCreateReq.Marshal(b, m, deterministic)
}
func (m *DashAPICredsCreateReq) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashAPICredsCreateReq.Merge(m, src)
}
func (m *DashAPICredsCreateReq) XXX_Size() int {
	return xxx_messageInfo_DashAPICredsCreateReq.Size(m)
}
func (m *DashAPICredsCreateReq) XXX_DiscardUnknown() {
	xxx_messageInfo_DashAPICredsCreateReq.DiscardUnknown(m)
}

var xxx_messageInfo_DashAPICredsCreateReq proto.InternalMessageInfo

func (m *DashAPICredsCreateReq) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *DashAPICredsCreateReq) GetMetadata() string {
	if m != nil {
		return m.Metadata
	}
	return ""
}

type DashAPICredsUpdateReq struct {
	CredSID              string   `protobuf:"bytes,1,opt,name=cred_sid,json=credSid,proto3" json:"cred_sid,omitempty"`
	Description          string   `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	Metadata             string   `protobuf:"bytes,3,opt,name=metadata,proto3" json:"metadata,omitempty"`
	ID                   *pb.ID   `protobuf:"bytes,5,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DashAPICredsUpdateReq) Reset()         { *m = DashAPICredsUpdateReq{} }
func (m *DashAPICredsUpdateReq) String() string { return proto.CompactTextString(m) }
func (*DashAPICredsUpdateReq) ProtoMessage()    {}
func (*DashAPICredsUpdateReq) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{4}
}
func (m *DashAPICredsUpdateReq) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashAPICredsUpdateReq.Unmarshal(m, b)
}
func (m *DashAPICredsUpdateReq) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashAPICredsUpdateReq.Marshal(b, m, deterministic)
}
func (m *DashAPICredsUpdateReq) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashAPICredsUpdateReq.Merge(m, src)
}
func (m *DashAPICredsUpdateReq) XXX_Size() int {
	return xxx_messageInfo_DashAPICredsUpdateReq.Size(m)
}
func (m *DashAPICredsUpdateReq) XXX_DiscardUnknown() {
	xxx_messageInfo_DashAPICredsUpdateReq.DiscardUnknown(m)
}

var xxx_messageInfo_DashAPICredsUpdateReq proto.InternalMessageInfo

func (m *DashAPICredsUpdateReq) GetCredSID() string {
	if m != nil {
		return m.CredSID
	}
	return ""
}

func (m *DashAPICredsUpdateReq) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *DashAPICredsUpdateReq) GetMetadata() string {
	if m != nil {
		return m.Metadata
	}
	return ""
}

func (m *DashAPICredsUpdateReq) GetID() *pb.ID {
	if m != nil {
		return m.ID
	}
	return nil
}

type DashAPICredsDeleteReq struct {
	CredSID              string   `protobuf:"bytes,1,opt,name=cred_sid,json=credSid,proto3" json:"cred_sid,omitempty"`
	ID                   *pb.ID   `protobuf:"bytes,3,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *DashAPICredsDeleteReq) Reset()         { *m = DashAPICredsDeleteReq{} }
func (m *DashAPICredsDeleteReq) String() string { return proto.CompactTextString(m) }
func (*DashAPICredsDeleteReq) ProtoMessage()    {}
func (*DashAPICredsDeleteReq) Descriptor() ([]byte, []int) {
	return fileDescriptor_15a1dc8d40dadaa6, []int{5}
}
func (m *DashAPICredsDeleteReq) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_DashAPICredsDeleteReq.Unmarshal(m, b)
}
func (m *DashAPICredsDeleteReq) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_DashAPICredsDeleteReq.Marshal(b, m, deterministic)
}
func (m *DashAPICredsDeleteReq) XXX_Merge(src proto.Message) {
	xxx_messageInfo_DashAPICredsDeleteReq.Merge(m, src)
}
func (m *DashAPICredsDeleteReq) XXX_Size() int {
	return xxx_messageInfo_DashAPICredsDeleteReq.Size(m)
}
func (m *DashAPICredsDeleteReq) XXX_DiscardUnknown() {
	xxx_messageInfo_DashAPICredsDeleteReq.DiscardUnknown(m)
}

var xxx_messageInfo_DashAPICredsDeleteReq proto.InternalMessageInfo

func (m *DashAPICredsDeleteReq) GetCredSID() string {
	if m != nil {
		return m.CredSID
	}
	return ""
}

func (m *DashAPICredsDeleteReq) GetID() *pb.ID {
	if m != nil {
		return m.ID
	}
	return nil
}

func init() {
	proto.RegisterEnum("rpx.DashFlash_Type", DashFlash_Type_name, DashFlash_Type_value)
	proto.RegisterType((*DashFlash)(nil), "rpx.DashFlash")
	proto.RegisterType((*DashUserSettingsState)(nil), "rpx.DashUserSettingsState")
	proto.RegisterType((*DashUserSettingsState_URLs)(nil), "rpx.DashUserSettingsState.URLs")
	proto.RegisterType((*DashCred)(nil), "rpx.DashCred")
	proto.RegisterType((*DashAPICredsCreateReq)(nil), "rpx.DashAPICredsCreateReq")
	proto.RegisterType((*DashAPICredsUpdateReq)(nil), "rpx.DashAPICredsUpdateReq")
	proto.RegisterType((*DashAPICredsDeleteReq)(nil), "rpx.DashAPICredsDeleteReq")
}

func init() { proto.RegisterFile("example.proto", fileDescriptor_15a1dc8d40dadaa6) }

var fileDescriptor_15a1dc8d40dadaa6 = []byte{
	// 563 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xa4, 0x54, 0xcd, 0x6e, 0xd3, 0x40,
	0x10, 0xc6, 0x3f, 0xb5, 0xe3, 0x71, 0x53, 0x45, 0x0b, 0x48, 0x96, 0x0f, 0x24, 0xb2, 0x04, 0xe4,
	0x82, 0x2b, 0xa5, 0x42, 0x9c, 0x38, 0x90, 0xa6, 0xa0, 0x48, 0x1c, 0x90, 0xd3, 0x08, 0x89, 0x4b,
	0xe5, 0xd8, 0x53, 0xd7, 0xc2, 0x7f, 0xec, 0x6e, 0xa4, 0xf4, 0x02, 0x4f, 0xc2, 0x23, 0xf0, 0x4a,
	0x3d, 0xf4, 0xcc, 0x43, 0xa0, 0xdd, 0x0d, 0x26, 0x69, 0x13, 0x24, 0xc4, 0x6d, 0x67, 0xe6, 0xfb,
	0x66, 0xbf, 0xfd, 0x66, 0x6c, 0xe8, 0xe2, 0x2a, 0x2e, 0x9b, 0x02, 0xc3, 0x86, 0xd6, 0xbc, 0x26,
	0x06, 0x6d, 0x56, 0xfe, 0x8b, 0x2c, 0xe7, 0x57, 0xcb, 0x45, 0x98, 0xd4, 0xe5, 0x71, 0x56, 0x67,
	0xf5, 0xb1, 0xac, 0x2d, 0x96, 0x97, 0x32, 0x92, 0x81, 0x3c, 0x29, 0x8e, 0xef, 0xf2, 0xeb, 0x06,
	0x99, 0x0a, 0x82, 0x6f, 0xe0, 0x4c, 0x62, 0x76, 0xf5, 0xb6, 0x88, 0xd9, 0x15, 0xe9, 0x81, 0x51,
	0xb2, 0xcc, 0xd3, 0x06, 0xda, 0xd0, 0x89, 0xc4, 0x91, 0x3c, 0x07, 0x53, 0xa0, 0x3d, 0x7d, 0xa0,
	0x0d, 0x8f, 0x46, 0x0f, 0x43, 0xda, 0xac, 0xc2, 0x16, 0x1f, 0x9e, 0x5f, 0x37, 0x18, 0x49, 0x40,
	0xf0, 0x0a, 0x4c, 0x11, 0x91, 0x2e, 0x38, 0xf3, 0x2a, 0xc5, 0xcb, 0xbc, 0xc2, 0xb4, 0xf7, 0x80,
	0xb8, 0x60, 0xcf, 0x96, 0x49, 0x82, 0x8c, 0xf5, 0x34, 0xd2, 0x01, 0xf3, 0x63, 0x4c, 0xab, 0x9e,
	0x4e, 0x1c, 0x38, 0x38, 0xa3, 0xb4, 0xa6, 0x3d, 0x23, 0xf8, 0xa9, 0xc1, 0x63, 0xd1, 0x71, 0xce,
	0x90, 0xce, 0x90, 0xf3, 0xbc, 0xca, 0xd8, 0x8c, 0xc7, 0x1c, 0xc9, 0x23, 0x38, 0xc0, 0x32, 0xce,
	0x8b, 0xb5, 0x1e, 0x15, 0x90, 0xd7, 0x60, 0x2e, 0x69, 0xc1, 0x3c, 0x6b, 0xa0, 0x0d, 0xdd, 0x51,
	0xbf, 0x55, 0x74, 0x8f, 0x1f, 0xce, 0xa3, 0xf7, 0x6c, 0xdc, 0xb9, 0xbd, 0xe9, 0x9b, 0xe2, 0x14,
	0x49, 0x1a, 0x19, 0x82, 0x7d, 0x29, 0xb4, 0x23, 0xf3, 0xec, 0x81, 0x31, 0x74, 0x47, 0x47, 0xdb,
	0x6f, 0x8a, 0x7e, 0x97, 0xfd, 0x73, 0x90, 0x3c, 0xf2, 0x14, 0x8e, 0x92, 0xba, 0xaa, 0x30, 0xe1,
	0x17, 0x59, 0x5d, 0x67, 0x05, 0xae, 0xf5, 0x74, 0xd7, 0xd9, 0x77, 0x32, 0xb9, 0x05, 0x93, 0xe3,
	0x90, 0x9e, 0x6d, 0xc0, 0x64, 0x32, 0xf8, 0x0a, 0x1d, 0x71, 0xd7, 0x29, 0xc5, 0x94, 0x0c, 0xc0,
	0x4d, 0x91, 0x25, 0x34, 0x6f, 0x78, 0x5e, 0x57, 0x6b, 0xfc, 0x66, 0x8a, 0xf8, 0xd0, 0x29, 0x91,
	0xc7, 0x69, 0xcc, 0x63, 0xcf, 0x90, 0xe5, 0x36, 0x16, 0xf6, 0xf0, 0xfa, 0x33, 0x56, 0x9e, 0xa9,
	0xec, 0x91, 0x01, 0x79, 0x02, 0x7a, 0x9e, 0x7a, 0xb6, 0x34, 0xc7, 0x0a, 0x9b, 0x45, 0x38, 0x9d,
	0x8c, 0xad, 0xdb, 0x9b, 0xbe, 0x3e, 0x9d, 0x44, 0x7a, 0x9e, 0x06, 0x73, 0xe5, 0xf6, 0x9b, 0x0f,
	0x53, 0x21, 0x81, 0x9d, 0x52, 0x8c, 0x39, 0x46, 0xf8, 0xe5, 0xae, 0x18, 0xed, 0xef, 0x62, 0xf4,
	0x6d, 0x31, 0xc1, 0x77, 0x6d, 0xbb, 0xef, 0xbc, 0x49, 0xd7, 0x7d, 0x9f, 0x41, 0x27, 0xa1, 0x98,
	0x5e, 0xb0, 0x3c, 0x55, 0x4d, 0xc7, 0xee, 0xed, 0x4d, 0xdf, 0x16, 0xa8, 0xd9, 0x74, 0x12, 0xd9,
	0xa2, 0x38, 0xcb, 0xff, 0xd7, 0x0c, 0xf5, 0xec, 0x83, 0xbd, 0xcf, 0xbe, 0xd8, 0x96, 0x37, 0xc1,
	0x02, 0xff, 0x4d, 0x9e, 0xba, 0xc0, 0xd8, 0x77, 0xc1, 0x68, 0xac, 0xbe, 0x23, 0xb5, 0xb9, 0x2f,
	0xe1, 0x70, 0x73, 0x1d, 0x89, 0x23, 0x08, 0x67, 0x65, 0xc3, 0xaf, 0x7d, 0x7f, 0xff, 0xc2, 0x8e,
	0x7e, 0x68, 0x70, 0xb8, 0xa9, 0x92, 0x9c, 0x80, 0xa5, 0x06, 0x44, 0xfe, 0xd0, 0xee, 0x4d, 0xce,
	0xef, 0xb6, 0x35, 0xb9, 0x55, 0x27, 0x60, 0x29, 0xf7, 0x77, 0x90, 0xda, 0xb1, 0xec, 0x20, 0x29,
	0x4f, 0x76, 0x90, 0x5a, 0xb3, 0xee, 0x90, 0xc6, 0xce, 0x27, 0xbb, 0xc8, 0x17, 0xc7, 0xb4, 0x59,
	0x2d, 0x2c, 0xf9, 0x37, 0x39, 0xf9, 0x15, 0x00, 0x00, 0xff, 0xff, 0x9a, 0xd6, 0xfe, 0xe7, 0x9f,
	0x04, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// DashStateClient is the client API for DashState service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type DashStateClient interface {
	UserSettings(ctx context.Context, in *pb.Empty, opts ...grpc.CallOption) (*DashUserSettingsState, error)
}

type dashStateClient struct {
	cc *grpc.ClientConn
}

func NewDashStateClient(cc *grpc.ClientConn) DashStateClient {
	return &dashStateClient{cc}
}

func (c *dashStateClient) UserSettings(ctx context.Context, in *pb.Empty, opts ...grpc.CallOption) (*DashUserSettingsState, error) {
	out := new(DashUserSettingsState)
	err := c.cc.Invoke(ctx, "/rpx.DashState/UserSettings", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// DashStateServer is the server API for DashState service.
type DashStateServer interface {
	UserSettings(context.Context, *pb.Empty) (*DashUserSettingsState, error)
}

// UnimplementedDashStateServer can be embedded to have forward compatible implementations.
type UnimplementedDashStateServer struct {
}

func (*UnimplementedDashStateServer) UserSettings(ctx context.Context, req *pb.Empty) (*DashUserSettingsState, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UserSettings not implemented")
}

func RegisterDashStateServer(s *grpc.Server, srv DashStateServer) {
	s.RegisterService(&_DashState_serviceDesc, srv)
}

func _DashState_UserSettings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(pb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DashStateServer).UserSettings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rpx.DashState/UserSettings",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DashStateServer).UserSettings(ctx, req.(*pb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

var _DashState_serviceDesc = grpc.ServiceDesc{
	ServiceName: "rpx.DashState",
	HandlerType: (*DashStateServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "UserSettings",
			Handler:    _DashState_UserSettings_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "example.proto",
}

// DashAPICredsClient is the client API for DashAPICreds service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type DashAPICredsClient interface {
	Create(ctx context.Context, in *DashAPICredsCreateReq, opts ...grpc.CallOption) (*DashCred, error)
	Update(ctx context.Context, in *DashAPICredsUpdateReq, opts ...grpc.CallOption) (*DashCred, error)
	Delete(ctx context.Context, in *DashAPICredsDeleteReq, opts ...grpc.CallOption) (*DashCred, error)
}

type dashAPICredsClient struct {
	cc *grpc.ClientConn
}

func NewDashAPICredsClient(cc *grpc.ClientConn) DashAPICredsClient {
	return &dashAPICredsClient{cc}
}

func (c *dashAPICredsClient) Create(ctx context.Context, in *DashAPICredsCreateReq, opts ...grpc.CallOption) (*DashCred, error) {
	out := new(DashCred)
	err := c.cc.Invoke(ctx, "/rpx.DashAPICreds/Create", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *dashAPICredsClient) Update(ctx context.Context, in *DashAPICredsUpdateReq, opts ...grpc.CallOption) (*DashCred, error) {
	out := new(DashCred)
	err := c.cc.Invoke(ctx, "/rpx.DashAPICreds/Update", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *dashAPICredsClient) Delete(ctx context.Context, in *DashAPICredsDeleteReq, opts ...grpc.CallOption) (*DashCred, error) {
	out := new(DashCred)
	err := c.cc.Invoke(ctx, "/rpx.DashAPICreds/Delete", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// DashAPICredsServer is the server API for DashAPICreds service.
type DashAPICredsServer interface {
	Create(context.Context, *DashAPICredsCreateReq) (*DashCred, error)
	Update(context.Context, *DashAPICredsUpdateReq) (*DashCred, error)
	Delete(context.Context, *DashAPICredsDeleteReq) (*DashCred, error)
}

// UnimplementedDashAPICredsServer can be embedded to have forward compatible implementations.
type UnimplementedDashAPICredsServer struct {
}

func (*UnimplementedDashAPICredsServer) Create(ctx context.Context, req *DashAPICredsCreateReq) (*DashCred, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Create not implemented")
}
func (*UnimplementedDashAPICredsServer) Update(ctx context.Context, req *DashAPICredsUpdateReq) (*DashCred, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Update not implemented")
}
func (*UnimplementedDashAPICredsServer) Delete(ctx context.Context, req *DashAPICredsDeleteReq) (*DashCred, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Delete not implemented")
}

func RegisterDashAPICredsServer(s *grpc.Server, srv DashAPICredsServer) {
	s.RegisterService(&_DashAPICreds_serviceDesc, srv)
}

func _DashAPICreds_Create_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DashAPICredsCreateReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DashAPICredsServer).Create(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rpx.DashAPICreds/Create",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DashAPICredsServer).Create(ctx, req.(*DashAPICredsCreateReq))
	}
	return interceptor(ctx, in, info, handler)
}

func _DashAPICreds_Update_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DashAPICredsUpdateReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DashAPICredsServer).Update(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rpx.DashAPICreds/Update",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DashAPICredsServer).Update(ctx, req.(*DashAPICredsUpdateReq))
	}
	return interceptor(ctx, in, info, handler)
}

func _DashAPICreds_Delete_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DashAPICredsDeleteReq)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(DashAPICredsServer).Delete(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/rpx.DashAPICreds/Delete",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(DashAPICredsServer).Delete(ctx, req.(*DashAPICredsDeleteReq))
	}
	return interceptor(ctx, in, info, handler)
}

var _DashAPICreds_serviceDesc = grpc.ServiceDesc{
	ServiceName: "rpx.DashAPICreds",
	HandlerType: (*DashAPICredsServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Create",
			Handler:    _DashAPICreds_Create_Handler,
		},
		{
			MethodName: "Update",
			Handler:    _DashAPICreds_Update_Handler,
		},
		{
			MethodName: "Delete",
			Handler:    _DashAPICreds_Delete_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "example.proto",
}
