import { maybeAddComment } from "../src/utils";
import { Code, joinCode } from "ts-poet";

describe("utils", () => {
  describe("maybeAddComment", () => {
    it("handles single-line impl comments", () => {
      // Foo
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo\n" }, chunks);
      expect(joinCode(chunks).toCodeString([])).toMatchInlineSnapshot(`"/** Foo */"`);
    });

    it("handles single-dot star comments", () => {
      // /* Foo */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo " }, chunks);
      expect(joinCode(chunks).toCodeString([])).toMatchInlineSnapshot(`"/** Foo */"`);
    });

    it("handles single-line double-dot star comments", () => {
      // /** Foo */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " * Foo " }, chunks);
      expect(joinCode(chunks).toCodeString([])).toMatchInlineSnapshot(`"/** Foo */"`);
    });

    it("handles double-line double-dot star comments", () => {
      // /**
      //  * Foo
      //  *
      //  * bar.
      //  */
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: "*\n Foo\n \n bar.\n" }, chunks);
      expect(joinCode(chunks).toCodeString([])).toMatchInlineSnapshot(`
        "/**
         * Foo
         * 
         * bar.
         */"
      `);
    });

    it("handles double-line impl comments", () => {
      // // Foo
      // // Bar
      const chunks: Code[] = [];
      maybeAddComment({ leadingComments: " Foo\n Bar\n" }, chunks);
      expect(joinCode(chunks).toCodeString([])).toMatchInlineSnapshot(`
        "/**
         * Foo
         * Bar
         */"
      `);
    });
  });
});
