import { code, Code, imp, joinCode } from 'ts-poet';
import { Context } from './context';

const Writer = imp('Writer@protobufjs/minimal');
const Reader = imp('Reader@protobufjs/minimal');

export function generateTypeRegistry(ctx: Context): Code {
  const chunks: Code[] = [];

  chunks.push(generateMessageType(ctx));

  chunks.push(code`
    export type UnknownMessage = {$type: string};
  `);

  chunks.push(code`
    export const messageTypeRegistry = new Map<string, MessageType>();
  `);

  chunks.push(code`${ctx.utils.DeepPartial.ifUsed}`);

  return joinCode(chunks, { on: '\n\n' });
}

function generateMessageType(ctx: Context): Code {
  const chunks: Code[] = [];

  chunks.push(code`export interface MessageType<Message extends UnknownMessage = UnknownMessage> {`);

  chunks.push(code`$type: Message['$type'];`);

  if (ctx.options.outputEncodeMethods) {
    chunks.push(code`encode(message: Message, writer?: ${Writer}): ${Writer};`);
    chunks.push(code`decode(input: ${Reader} | Uint8Array, length?: number): Message;`);
  }

  if (ctx.options.outputJsonMethods) {
    chunks.push(code`fromJSON(object: any): Message;`);
    chunks.push(code`toJSON(message: Message): unknown;`);
  }

  if (ctx.options.outputPartialMethods) {
    chunks.push(code`fromPartial(object: ${ctx.utils.DeepPartial}<Message>): Message;`);
  }

  chunks.push(code`}`);

  return joinCode(chunks, { on: '\n' });
}
