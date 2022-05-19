/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'basic';

export interface GetBasicRequest {
name: string,
}

export interface GetBasicResponse {
name: string,
}

export interface BasicService {
getBasic(request: t:GetBasicRequest@./only-types-grpc-metadata,metadata?: Metadata): Promise<t:GetBasicResponse@./only-types-grpc-metadata>;
}









































