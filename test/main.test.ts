import { test } from "node:test";
import assert from "node:assert";
import Doctor from "../src/main";

test("Check is string has at least one Cyrillic letter", async (t) => {
    await t.test("string with Cyrillic only", (_t) => {
        const cases = ["НАСК", "сар", "Тор", "НОМЕ"];
        const expect = true;

        for (const str of cases) {
            const result = Doctor.isHasCyrillic(str);
            assert.strictEqual(result, expect);
        }
    });

    await t.test("string with Latin only", (_t) => {
        const cases = ["HACK", "cap", "Top", "HOME"];
        const expect = false;

        for (const str of cases) {
            const result = Doctor.isHasCyrillic(str);
            assert.strictEqual(result, expect);
        }
    });
});

test("Check is string has at least one Latin letter", async (t) => {
    await t.test("string with Latin only", (_t) => {
        const cases = ["MOPE", "KBAC", "Typ", "Xoky", "OBEH"];
        const expect = true;

        for (const str of cases) {
            const result = Doctor.isHasLatin(str);
            assert.strictEqual(result, expect);
        }
    });

    await t.test("string with Cyrillic only", (_t) => {
        const cases = ["МОРЕ", "КВАС", "Тур", "ХоКу", "ОВЕН"];
        const expect = false;

        for (const str of cases) {
            const result = Doctor.isHasLatin(str);
            assert.strictEqual(result, expect);
        }
    });
});

test("Detect all positions of Cyrillic letters in the string", async (t) => {
    await t.test("Cyrillic only string", (_t) => {
        const str = "МАСТЕРСТВО";
        const expect = str.length;

        const result = Doctor.detectCyrillic(str);
        assert.strictEqual(result.length, expect);
    });

    await t.test("Latin only string", (_t) => {
        const str = "MACTEPCTBO";
        const expect = 0;

        const result = Doctor.detectCyrillic(str);
        assert.strictEqual(result.length, expect);
    });
});

test("Detect all positions of Latin letters in the string", async (t) => {
    await t.test("Latin only string", (_t) => {
        const str = "COMPACT";
        const expect = str.length;

        const result = Doctor.detectLatin(str);
        assert.strictEqual(result.length, expect);
    });

    await t.test("Cyrillic only string", (_t) => {
        const str = "СОМРАСТ";
        const expect = 0;

        const result = Doctor.detectLatin(str);
        assert.strictEqual(result.length, expect);
    });
});

test("Replace all Cyrillic letters with equivalent Latin letters", async (t) => {
    await t.test("Cyrillic only string", (_t) => {
        const str = "РОСКЕТ";
        const expect = "POCKET";

        const result = Doctor.fixCyrillic(str);
        assert.strictEqual(result, expect);
    });

    await t.test("Latin only string", (_t) => {
        const str = "TEXTBOOK";

        const result = Doctor.fixCyrillic(str);
        assert.strictEqual(result, str);
    });
});

test("Replace all Latin letters with equivalent Cyrillic letters", async (t) => {
    await t.test("Latin only string", (_t) => {
        const str = "BEPCTAK";
        const expect = "ВЕРСТАК";

        const result = Doctor.fixLatin(str);
        assert.strictEqual(result, expect);
    });

    await t.test("Cyrillic only string", (_t) => {
        const str = "Каска";

        const result = Doctor.fixLatin(str);
        assert.strictEqual(result, str);
    });
});
