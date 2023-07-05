/* eslint-disable */

export const protobufPackage = "";

export interface Encode {
  encode: string;
}

export const Encode = {
  toJSON(message: Encode): unknown {
    const obj: any = {};
    message.encode !== undefined && (obj.encode = message.encode);
    return obj;
  },
};
