/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "useNullAsOptional";

export interface ProfileInfo {
  id: number;
  bio: string;
  phone: string;
}

export interface User {
  id: number;
  username: string;
  profile?: ProfileInfo | null;
}

export interface UserById {
  id: number;
}

function createBaseProfileInfo(): ProfileInfo {
  return { id: 0, bio: "", phone: "" };
}

export const ProfileInfo = {
  encode(message: ProfileInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.bio !== "") {
      writer.uint32(18).string(message.bio);
    }
    if (message.phone !== "") {
      writer.uint32(26).string(message.phone);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProfileInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProfileInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bio = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.phone = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProfileInfo {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      bio: isSet(object.bio) ? globalThis.String(object.bio) : "",
      phone: isSet(object.phone) ? globalThis.String(object.phone) : "",
    };
  },

  toJSON(message: ProfileInfo): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.bio !== "") {
      obj.bio = message.bio;
    }
    if (message.phone !== "") {
      obj.phone = message.phone;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProfileInfo>, I>>(base?: I): ProfileInfo {
    return ProfileInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProfileInfo>, I>>(object: I): ProfileInfo {
    const message = createBaseProfileInfo();
    message.id = object.id ?? 0;
    message.bio = object.bio ?? "";
    message.phone = object.phone ?? "";
    return message;
  },
};

function createBaseUser(): User {
  return { id: 0, username: "", profile: null };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.profile !== undefined && message.profile !== null) {
      ProfileInfo.encode(message.profile, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.profile = ProfileInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      profile: isSet(object.profile) ? ProfileInfo.fromJSON(object.profile) : null,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.profile !== undefined && message.profile !== null) {
      obj.profile = ProfileInfo.toJSON(message.profile);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<User>, I>>(base?: I): User {
    return User.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.id = object.id ?? 0;
    message.username = object.username ?? "";
    message.profile = (object.profile !== undefined && object.profile !== null)
      ? ProfileInfo.fromPartial(object.profile)
      : undefined;
    return message;
  },
};

function createBaseUserById(): UserById {
  return { id: 0 };
}

export const UserById = {
  encode(message: UserById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserById {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserById();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserById {
    return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
  },

  toJSON(message: UserById): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserById>, I>>(base?: I): UserById {
    return UserById.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserById>, I>>(object: I): UserById {
    const message = createBaseUserById();
    message.id = object.id ?? 0;
    return message;
  },
};

export interface HeroService {
  FindOneHero(request: UserById): Promise<User>;
}

export const HeroServiceServiceName = "useNullAsOptional.HeroService";
export class HeroServiceClientImpl implements HeroService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HeroServiceServiceName;
    this.rpc = rpc;
    this.FindOneHero = this.FindOneHero.bind(this);
  }
  FindOneHero(request: UserById): Promise<User> {
    const data = UserById.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindOneHero", data);
    return promise.then((data) => User.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
