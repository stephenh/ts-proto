import { mkdtempSync, mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import * as api from "../../src/index";
import { loadClientGenerator } from "../../src/client-generator";
import { GreeterFakeClient, fakeMisc } from "./example";
import { fromString } from "./example.fake-string";
import { greeting } from "./example.fake-code";

describe("client generator", () => {
  it("emits generateClientImpl output inline, once per service", () => {
    expect(GreeterFakeClient).toEqual({ methods: ["SayHello", "Wave"] });
  });

  it("emits generateClientMisc output inline, once per file", () => {
    expect(fakeMisc).toEqual("example.proto");
  });

  it("writes string files from generateFiles", () => {
    expect(fromString).toBe(true);
  });

  it("resolves imports of Code files relative to the returned path", () => {
    expect(greeting).toEqual({ name: "fake" });
  });

  it("rejects modules exporting none of the hooks", () => {
    expect(() => loadClientGenerator("./package.json")).toThrow("must export");
  });

  it("loads a client generator from a path relative to the cwd", () => {
    expect(
      typeof loadClientGenerator("./integration/client-generator/fake-client-generator.js").generateClientImpl,
    ).toBe("function");
  });

  it("resolves bare package names from the cwd's node_modules", () => {
    const dir = mkdtempSync(join(tmpdir(), "ts-proto-ext-"));
    mkdirSync(join(dir, "node_modules/fake-pkg"), { recursive: true });
    writeFileSync(join(dir, "node_modules/fake-pkg/index.js"), "exports.generateClientMisc = () => null;");
    const cwd = process.cwd();
    process.chdir(dir);
    try {
      expect(typeof loadClientGenerator("fake-pkg").generateClientMisc).toBe("function");
    } finally {
      process.chdir(cwd);
    }
  });

  it("exposes the helpers client generators need from the package entry point", () => {
    for (const name of [
      "code",
      "imp",
      "joinCode",
      "def",
      "requestType",
      "responseType",
      "getFieldJsonName",
      "BinaryReader",
    ]) {
      expect(typeof (api as any)[name]).toBe("function");
    }
  });
});
