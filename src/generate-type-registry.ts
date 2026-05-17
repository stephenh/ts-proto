import { code, Code, imp, joinCode } from "ts-poet";
import { BaseContext } from "./context";
import { impFile } from "./utils";
import { addTypeToMessages } from "./options";

export function generateTypeRegistry(ctx: BaseContext): Code {
  const chunks: Code[] = [];

  chunks.push(generateMessageType(ctx));

  if (addTypeToMessages(ctx.options)) {
    chunks.push(code`
    export type UnknownMessage = {$type: string};
  `);
  } else {
    chunks.push(code`
    export type UnknownMessage = unknown;
  `);
  }

  chunks.push(code`
    export const messageTypeRegistry = new Map<string, MessageType>();
  `);

  chunks.push(code` ${ctx.utils.Builtin.ifUsed} ${ctx.utils.DeepPartial.ifUsed}`);

  return joinCode(chunks, { on: "\n\n" });
}

function generateMessageType(ctx: BaseContext): Code {
  const chunks: Code[] = [];

  chunks.push(code`export interface MessageType<Message extends UnknownMessage = UnknownMessage> {`);

  if (addTypeToMessages(ctx.options)) {
    chunks.push(code`$type: Message['$type'];`);
  } else {
    chunks.push(code`$type: string;`);
  }

  if (ctx.options.outputEncodeMethods) {
    const BinaryReader = imp("t:BinaryReader@@bufbuild/protobuf/wire");
    const BinaryWriter = imp("t:BinaryWriter@@bufbuild/protobuf/wire");

    chunks.push(code`encode(message: Message, writer?: ${BinaryWriter}): ${BinaryWriter};`);
    chunks.push(code`decode(input: ${BinaryReader} | Uint8Array, length?: number): Message;`);
  }

  if (ctx.options.outputJsonMethods) {
    chunks.push(code`fromJSON(object: any): Message;`);
    chunks.push(code`toJSON(message: Message): unknown;`);
  }

  if (ctx.options.outputPartialMethods) {
    chunks.push(code`fromPartial(object: ${ctx.utils.DeepPartial}<Message>): Message;`);
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: "\n" });
}
