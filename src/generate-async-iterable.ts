import { code, Code } from "ts-poet";
import { Context } from "./context";
import { localMessageMethod, messageMethodHead } from "./utils";

/** Creates a function to transform a message Source to a Uint8Array Source. */
export function generateEncodeTransform(ctx: Context, fullName: string): Code {
  return code`
    // encodeTransform encodes a source of message objects.
    // Transform<${fullName}, Uint8Array>
    ${messageMethodHead(ctx.options, fullName, "encodeTransform", true)}(
      source: AsyncIterable<${fullName} | ${fullName}[]> | Iterable<${fullName} | ${fullName}[]>
    ): AsyncIterable<Uint8Array> {
      for await (const pkt of source) {
        if (${ctx.utils.globalThis}.Array.isArray(pkt)) {
          for (const p of (pkt as any)) {
            yield* [${localMessageMethod(ctx.options, fullName, "encode")}(p).finish()]
          }
        } else {
          yield* [${localMessageMethod(ctx.options, fullName, "encode")}(pkt as any).finish()]
        }
      }
    }
  `;
}

/** Creates a function to transform a Uint8Array Source to a message Source. */
export function generateDecodeTransform(ctx: Context, fullName: string): Code {
  return code`
    // decodeTransform decodes a source of encoded messages.
    // Transform<Uint8Array, ${fullName}>
    ${messageMethodHead(ctx.options, fullName, "decodeTransform", true)}(
      source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>
    ): AsyncIterable<${fullName}> {
      for await (const pkt of source) {
        if (${ctx.utils.globalThis}.Array.isArray(pkt)) {
          for (const p of (pkt as any)) {
            yield* [${localMessageMethod(ctx.options, fullName, "decode")}(p)]
          }
        } else {
          yield* [${localMessageMethod(ctx.options, fullName, "decode")}(pkt as any)]
        }
      }
    }
  `;
}
