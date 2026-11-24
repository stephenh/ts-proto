const { code, imp } = require("ts-poet");

// Stand-in for a user's out-of-repo client generator, exercising all three hooks.
exports.generateClientImpl = (ctx, fileDesc, serviceDesc) =>
  code`export const ${serviceDesc.name}FakeClient = { methods: ${JSON.stringify(serviceDesc.method.map((m) => m.name))} };`;

exports.generateClientMisc = (ctx, fileDesc) => code`export const fakeMisc = "${fileDesc.name}";`;

exports.generateFiles = (ctx, fileDesc) => {
  if (fileDesc.service.length === 0) return [];
  const base = fileDesc.name.replace(".proto", "");
  return [
    [`${base}.fake-string.ts`, `export const fromString = true;\n`],
    [`${base}.fake-code.ts`, code`export const greeting: ${imp("Greeting@./example")} = { name: "fake" };`],
  ];
};
