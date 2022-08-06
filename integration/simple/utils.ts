export function bytesFromBase64(b64: string): Uint8Array {
  return Buffer.from(b64, 'base64');
}

export function base64FromBytes(arr: Uint8Array): string {
  return Buffer.from(arr).toString('base64');
}
