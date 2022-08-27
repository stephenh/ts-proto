/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "basic";

export interface GetBasicRequest {
  name: string;
}

export interface GetBasicResponse {
  name: string;
}

export interface BasicService {
  getBasic(
    request: GetBasicRequest,
    metadata?: Metadata,
  ): Promise<GetBasicResponse>;
}
