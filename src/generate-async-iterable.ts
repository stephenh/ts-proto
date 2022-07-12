import { code, Code } from 'ts-poet';

/** Creates a function to transform a message Source to a Uint8Array Source. */
export function generateEncodeTransform(fullName: string): Code {
  return code`
    // encodeTransform encodes a source of message objects.
    // Transform<${fullName}, Uint8Array>
    async *encodeTransform(
      source: AsyncIterable<${fullName} | ${fullName}[]> | Iterable<${fullName} | ${fullName}[]>
    ): AsyncIterable<Uint8Array> {
      for await (const pkt of source) {
        if (Array.isArray(pkt)) {
          for (const p of pkt) {
            yield* [${fullName}.encode(p).finish()]
          }
        } else {
          yield* [${fullName}.encode(pkt).finish()]
        }
      }
    }
  `;
}

/** Creates a function to transform a Uint8Array Source to a message Source. */
export function generateDecodeTransform(fullName: string): Code {
  return code`
    // decodeTransform decodes a source of encoded messages.
    // Transform<Uint8Array, ${fullName}>
    async *decodeTransform(
      source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>
    ): AsyncIterable<${fullName}> {
      for await (const pkt of source) {
        if (Array.isArray(pkt)) {
          for (const p of pkt) {
            yield* [${fullName}.decode(p)]
          }
        } else {
          yield* [${fullName}.decode(pkt)]
        }
      }
    }
  `;
}
