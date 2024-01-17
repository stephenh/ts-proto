import { maybeAddComment, generateIndexFiles } from "../src/utils";
import { defaultOptions } from "../src/options";
import { Code, joinCode } from "ts-poet";
import { FileDescriptorProto } from "ts-proto-descriptors";

describe("utils", () => {
  describe("maybeAddComment", () => {
    it("handles single-line impl comments", () => {
      // Foo
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo\n" }, chunks);
      expect(joinCode(chunks).toString()).toMatchInlineSnapshot(`
        "/** Foo */
        "
      `);
    });

    it("handles single-dot star comments", () => {
      // /* Foo */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo " }, chunks);
      expect(joinCode(chunks).toString()).toMatchInlineSnapshot(`
        "/** Foo */
        "
      `);
    });

    it("handles single-line double-dot star comments", () => {
      // /** Foo */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " * Foo " }, chunks);
      expect(joinCode(chunks).toString()).toMatchInlineSnapshot(`
        "/** Foo */
        "
      `);
    });

    it("handles double-line double-dot star comments", () => {
      // /**
      //  * Foo
      //  *
      //  * bar.
      //  */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: "*\n Foo\n \n bar.\n" }, chunks);
      expect(joinCode(chunks).toString()).toMatchInlineSnapshot(`
        "/**
         * Foo
         *
         * bar.
         */
        "
      `);
    });

    it("handles double-line impl comments", () => {
      // // Foo
      // // Bar
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo\n Bar\n" }, chunks);
      expect(joinCode(chunks).toString()).toMatchInlineSnapshot(`
        "/**
         * Foo
         * Bar
         */
        "
      `);
    });
  });

  describe("generateIndexFiles", () => {
    const options = defaultOptions();
    const files: FileDescriptorProto[] = [
      FileDescriptorProto.fromJSON({ name: "Test.proto" }),
      FileDescriptorProto.fromJSON({ name: "package/TestPackage.proto", package: "package" }),
    ];

    it("handles files", () => {
      const indexFiles = generateIndexFiles(files, options);

      expect(indexFiles[0][0]).toMatch("index.ts");
      expect(indexFiles[0][1].toString()).toMatchInlineSnapshot(`
        "export * from "./Test";
        export * as package from "./index.package";
        "
      `);

      expect(indexFiles[1][0]).toMatch("index.package.ts");
      expect(indexFiles[1][1].toString()).toMatchInlineSnapshot(`
        "export * from "./package/TestPackage";
        "
      `);
    });

    it("handles files with importSuffix=.js", () => {
      const indexFiles = generateIndexFiles(files, { ...options, importSuffix: ".js" });

      expect(indexFiles[0][0]).toMatch("index.ts");
      expect(indexFiles[0][1].toString()).toMatchInlineSnapshot(`
        "export * from "./Test.js";
        export * as package from "./index.package.js";
        "
      `);

      expect(indexFiles[1][0]).toMatch("index.package.ts");
      expect(indexFiles[1][1].toString()).toMatchInlineSnapshot(`
        "export * from "./package/TestPackage.js";
        "
      `);
    });
  });
});
