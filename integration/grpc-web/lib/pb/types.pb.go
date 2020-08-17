// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: types.proto

package pb

import (
	bytes "bytes"
	fmt "fmt"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
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

type Timestamp struct {
	// Represents seconds of UTC time since Unix epoch
	// 1970-01-01T00:00:00Z. Must be from from 0001-01-01T00:00:00Z to
	// 9999-12-31T23:59:59Z inclusive.
	Seconds int64 `protobuf:"varint,1,opt,name=seconds,proto3" json:"seconds,omitempty"`
	// Non-negative fractions of a second at nanosecond resolution. Negative
	// second values with fractions must still have non-negative nanos values
	// that count forward in time. Must be from 0 to 999,999,999
	// inclusive.
	Nanos                int64    `protobuf:"varint,2,opt,name=nanos,proto3" json:"nanos,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Timestamp) Reset()         { *m = Timestamp{} }
func (m *Timestamp) String() string { return proto.CompactTextString(m) }
func (*Timestamp) ProtoMessage()    {}
func (*Timestamp) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{0}
}
func (m *Timestamp) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Timestamp.Unmarshal(m, b)
}
func (m *Timestamp) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Timestamp.Marshal(b, m, deterministic)
}
func (m *Timestamp) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Timestamp.Merge(m, src)
}
func (m *Timestamp) XXX_Size() int {
	return xxx_messageInfo_Timestamp.Size(m)
}
func (m *Timestamp) XXX_DiscardUnknown() {
	xxx_messageInfo_Timestamp.DiscardUnknown(m)
}

var xxx_messageInfo_Timestamp proto.InternalMessageInfo

func (m *Timestamp) GetSeconds() int64 {
	if m != nil {
		return m.Seconds
	}
	return 0
}

func (m *Timestamp) GetNanos() int64 {
	if m != nil {
		return m.Nanos
	}
	return 0
}

type Duration struct {
	Nanos                int64    `protobuf:"varint,1,opt,name=nanos,proto3" json:"nanos,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Duration) Reset()         { *m = Duration{} }
func (m *Duration) String() string { return proto.CompactTextString(m) }
func (*Duration) ProtoMessage()    {}
func (*Duration) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{1}
}
func (m *Duration) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Duration.Unmarshal(m, b)
}
func (m *Duration) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Duration.Marshal(b, m, deterministic)
}
func (m *Duration) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Duration.Merge(m, src)
}
func (m *Duration) XXX_Size() int {
	return xxx_messageInfo_Duration.Size(m)
}
func (m *Duration) XXX_DiscardUnknown() {
	xxx_messageInfo_Duration.DiscardUnknown(m)
}

var xxx_messageInfo_Duration proto.InternalMessageInfo

func (m *Duration) GetNanos() int64 {
	if m != nil {
		return m.Nanos
	}
	return 0
}

// Empty is only used as a message for rpc calls that
// return no data.
type Empty struct {
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Empty) Reset()         { *m = Empty{} }
func (m *Empty) String() string { return proto.CompactTextString(m) }
func (*Empty) ProtoMessage()    {}
func (*Empty) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{2}
}
func (m *Empty) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Empty.Unmarshal(m, b)
}
func (m *Empty) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Empty.Marshal(b, m, deterministic)
}
func (m *Empty) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Empty.Merge(m, src)
}
func (m *Empty) XXX_Size() int {
	return xxx_messageInfo_Empty.Size(m)
}
func (m *Empty) XXX_DiscardUnknown() {
	xxx_messageInfo_Empty.DiscardUnknown(m)
}

var xxx_messageInfo_Empty proto.InternalMessageInfo

// An optional string value used for RPCs that update a record.
// If the Optional is undefined, the updating code will not change
// the field.
type OptString struct {
	Val                  string   `protobuf:"bytes,1,opt,name=val,proto3" json:"val,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *OptString) Reset()         { *m = OptString{} }
func (m *OptString) String() string { return proto.CompactTextString(m) }
func (*OptString) ProtoMessage()    {}
func (*OptString) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{3}
}
func (m *OptString) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OptString.Unmarshal(m, b)
}
func (m *OptString) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OptString.Marshal(b, m, deterministic)
}
func (m *OptString) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OptString.Merge(m, src)
}
func (m *OptString) XXX_Size() int {
	return xxx_messageInfo_OptString.Size(m)
}
func (m *OptString) XXX_DiscardUnknown() {
	xxx_messageInfo_OptString.DiscardUnknown(m)
}

var xxx_messageInfo_OptString proto.InternalMessageInfo

func (m *OptString) GetVal() string {
	if m != nil {
		return m.Val
	}
	return ""
}

type OptInt64 struct {
	Val                  int64    `protobuf:"varint,1,opt,name=val,proto3" json:"val,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *OptInt64) Reset()         { *m = OptInt64{} }
func (m *OptInt64) String() string { return proto.CompactTextString(m) }
func (*OptInt64) ProtoMessage()    {}
func (*OptInt64) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{4}
}
func (m *OptInt64) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OptInt64.Unmarshal(m, b)
}
func (m *OptInt64) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OptInt64.Marshal(b, m, deterministic)
}
func (m *OptInt64) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OptInt64.Merge(m, src)
}
func (m *OptInt64) XXX_Size() int {
	return xxx_messageInfo_OptInt64.Size(m)
}
func (m *OptInt64) XXX_DiscardUnknown() {
	xxx_messageInfo_OptInt64.DiscardUnknown(m)
}

var xxx_messageInfo_OptInt64 proto.InternalMessageInfo

func (m *OptInt64) GetVal() int64 {
	if m != nil {
		return m.Val
	}
	return 0
}

type OptBool struct {
	Val                  bool     `protobuf:"varint,1,opt,name=val,proto3" json:"val,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *OptBool) Reset()         { *m = OptBool{} }
func (m *OptBool) String() string { return proto.CompactTextString(m) }
func (*OptBool) ProtoMessage()    {}
func (*OptBool) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{5}
}
func (m *OptBool) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OptBool.Unmarshal(m, b)
}
func (m *OptBool) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OptBool.Marshal(b, m, deterministic)
}
func (m *OptBool) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OptBool.Merge(m, src)
}
func (m *OptBool) XXX_Size() int {
	return xxx_messageInfo_OptBool.Size(m)
}
func (m *OptBool) XXX_DiscardUnknown() {
	xxx_messageInfo_OptBool.DiscardUnknown(m)
}

var xxx_messageInfo_OptBool proto.InternalMessageInfo

func (m *OptBool) GetVal() bool {
	if m != nil {
		return m.Val
	}
	return false
}

type IPNet struct {
	IP                   []byte   `protobuf:"bytes,1,opt,name=ip,proto3" json:"ip,omitempty"`
	Mask                 []byte   `protobuf:"bytes,2,opt,name=mask,proto3" json:"mask,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *IPNet) Reset()         { *m = IPNet{} }
func (m *IPNet) String() string { return proto.CompactTextString(m) }
func (*IPNet) ProtoMessage()    {}
func (*IPNet) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{6}
}
func (m *IPNet) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_IPNet.Unmarshal(m, b)
}
func (m *IPNet) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_IPNet.Marshal(b, m, deterministic)
}
func (m *IPNet) XXX_Merge(src proto.Message) {
	xxx_messageInfo_IPNet.Merge(m, src)
}
func (m *IPNet) XXX_Size() int {
	return xxx_messageInfo_IPNet.Size(m)
}
func (m *IPNet) XXX_DiscardUnknown() {
	xxx_messageInfo_IPNet.DiscardUnknown(m)
}

var xxx_messageInfo_IPNet proto.InternalMessageInfo

func (m *IPNet) GetIP() []byte {
	if m != nil {
		return m.IP
	}
	return nil
}

func (m *IPNet) GetMask() []byte {
	if m != nil {
		return m.Mask
	}
	return nil
}

type ID struct {
	ID                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ID) Reset()         { *m = ID{} }
func (m *ID) String() string { return proto.CompactTextString(m) }
func (*ID) ProtoMessage()    {}
func (*ID) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{7}
}
func (m *ID) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ID.Unmarshal(m, b)
}
func (m *ID) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ID.Marshal(b, m, deterministic)
}
func (m *ID) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ID.Merge(m, src)
}
func (m *ID) XXX_Size() int {
	return xxx_messageInfo_ID.Size(m)
}
func (m *ID) XXX_DiscardUnknown() {
	xxx_messageInfo_ID.DiscardUnknown(m)
}

var xxx_messageInfo_ID proto.InternalMessageInfo

func (m *ID) GetID() string {
	if m != nil {
		return m.ID
	}
	return ""
}

func init() {
	proto.RegisterType((*Timestamp)(nil), "pb.Timestamp")
	proto.RegisterType((*Duration)(nil), "pb.Duration")
	proto.RegisterType((*Empty)(nil), "pb.Empty")
	proto.RegisterType((*OptString)(nil), "pb.OptString")
	proto.RegisterType((*OptInt64)(nil), "pb.OptInt64")
	proto.RegisterType((*OptBool)(nil), "pb.OptBool")
	proto.RegisterType((*IPNet)(nil), "pb.IPNet")
	proto.RegisterType((*ID)(nil), "pb.ID")
}

func init() { proto.RegisterFile("types.proto", fileDescriptor_d938547f84707355) }

var fileDescriptor_d938547f84707355 = []byte{
	// 279 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x4c, 0x90, 0xbf, 0x4e, 0xb4, 0x40,
	0x14, 0xc5, 0xc3, 0xec, 0xb2, 0xc0, 0xdd, 0x2d, 0xbe, 0x4c, 0xbe, 0x18, 0xe2, 0x9f, 0xec, 0x66,
	0x2a, 0x1b, 0xa1, 0x58, 0x63, 0xa1, 0x1d, 0xc1, 0x82, 0x46, 0x36, 0x68, 0x65, 0xc7, 0x2c, 0x88,
	0x13, 0x61, 0x66, 0xc2, 0x5c, 0x4c, 0xf6, 0x6d, 0x7c, 0x32, 0x0b, 0x2b, 0x1f, 0xc3, 0x38, 0x68,
	0xa4, 0x3b, 0xbf, 0xf9, 0x9d, 0x93, 0xdc, 0x0c, 0x2c, 0xf1, 0xa0, 0x6b, 0x13, 0xe9, 0x5e, 0xa1,
	0xa2, 0x44, 0xf3, 0xe3, 0x8b, 0x46, 0xe0, 0xf3, 0xc0, 0xa3, 0xbd, 0xea, 0xe2, 0x46, 0x35, 0x2a,
	0xb6, 0x8a, 0x0f, 0x4f, 0x96, 0x2c, 0xd8, 0x34, 0x4e, 0xd8, 0x0d, 0x04, 0x0f, 0xa2, 0xab, 0x0d,
	0x96, 0x9d, 0xa6, 0x21, 0x78, 0xa6, 0xde, 0x2b, 0x59, 0x99, 0xd0, 0xd9, 0x38, 0xe7, 0xb3, 0xe2,
	0x17, 0xe9, 0x7f, 0x70, 0x65, 0x29, 0x95, 0x09, 0x89, 0x7d, 0x1f, 0x81, 0x6d, 0xc0, 0x4f, 0x87,
	0xbe, 0x44, 0xa1, 0xe4, 0x5f, 0xc3, 0x99, 0x36, 0x3c, 0x70, 0x6f, 0x3b, 0x8d, 0x07, 0x76, 0x06,
	0x41, 0xae, 0xf1, 0x1e, 0x7b, 0x21, 0x1b, 0xfa, 0x0f, 0x66, 0xaf, 0x65, 0x6b, 0x9b, 0x41, 0xf1,
	0x1d, 0xd9, 0x29, 0xf8, 0xb9, 0xc6, 0x4c, 0xe2, 0xd5, 0xe5, 0xd4, 0xce, 0x46, 0x7b, 0x02, 0x5e,
	0xae, 0x31, 0x51, 0xaa, 0x9d, 0x4a, 0x7f, 0x94, 0x5b, 0x70, 0xb3, 0xdd, 0x5d, 0x8d, 0xf4, 0x08,
	0x88, 0xd0, 0xd6, 0xac, 0x92, 0xc5, 0xc7, 0xfb, 0x9a, 0x64, 0xbb, 0x82, 0x08, 0x4d, 0x29, 0xcc,
	0xbb, 0xd2, 0xbc, 0xd8, 0xd3, 0x57, 0x85, 0xcd, 0x8c, 0x01, 0xc9, 0x52, 0xbb, 0xa8, 0xc6, 0x33,
	0x7e, 0x16, 0x69, 0x41, 0x44, 0x75, 0x3d, 0xff, 0x7c, 0x5b, 0x3b, 0xc9, 0xf2, 0x31, 0x88, 0xa2,
	0xb8, 0x15, 0x3c, 0xd6, 0x9c, 0x2f, 0xec, 0x77, 0x6d, 0xbf, 0x02, 0x00, 0x00, 0xff, 0xff, 0x05,
	0x1b, 0xfa, 0x9a, 0x70, 0x01, 0x00, 0x00,
}

func (this *ID) Equal(that interface{}) bool {
	if that == nil {
		return this == nil
	}

	that1, ok := that.(*ID)
	if !ok {
		that2, ok := that.(ID)
		if ok {
			that1 = &that2
		} else {
			return false
		}
	}
	if that1 == nil {
		return this == nil
	} else if this == nil {
		return false
	}
	if this.ID != that1.ID {
		return false
	}
	if !bytes.Equal(this.XXX_unrecognized, that1.XXX_unrecognized) {
		return false
	}
	return true
}
