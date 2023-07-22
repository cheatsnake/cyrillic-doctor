const cyrillicLatinMap: Record<string, string> = {
    А: "A",
    а: "a",
    В: "B",
    Е: "E",
    е: "e",
    К: "K",
    к: "k", // tricky moment
    М: "M",
    Н: "H",
    О: "O",
    о: "o",
    Р: "P",
    р: "p",
    С: "C",
    с: "c",
    Т: "T",
    у: "y",
    Х: "X",
    х: "x",
};

// The same as "cyrillicLatinMap", but with Latin letters as keys and Cyrillic as values
const latinCyrillicMap: Record<string, string> = Object.fromEntries(
    Object.entries(cyrillicLatinMap).map((a) => a.reverse())
);

interface DetectionResult {
    position: number;
    value: string;
}

//** Check is string has at least one hidden Cyrillic letter */
export const isHasCyrillic = (str: string): boolean => {
    return [...str].some((value) => !!cyrillicLatinMap[value]);
};

//** Check is string has at least one hidden Latin letter */
export const isHasLatin = (str: string): boolean => {
    return [...str].some((value) => !!latinCyrillicMap[value]);
};

//** Detect all positions of hidden Cyrillic letters in the string */
export const detectCyrillic = (str: string): DetectionResult[] => {
    return [...str].reduce((result: DetectionResult[], value, position) => {
        if (cyrillicLatinMap[value]) result.push({ position, value });
        return result;
    }, []);
};

//** Detect all positions of hidden Latin letters in the string */
export const detectLatin = (str: string): DetectionResult[] => {
    return [...str].reduce((result: DetectionResult[], value, position) => {
        if (latinCyrillicMap[value]) result.push({ position, value });
        return result;
    }, []);
};

//** Replace all hidden Cyrillic letters with equivalent Latin letters */
export const fixCyrillic = (str: string): string => {
    return [...str].map((value) => cyrillicLatinMap[value] ?? value).join("");
};

//** Replace all hidden Latin letters with equivalent Cyrillic letters */
export const fixLatin = (str: string): string => {
    return [...str].map((value) => latinCyrillicMap[value] ?? value).join("");
};

export default { isHasCyrillic, isHasLatin, detectCyrillic, detectLatin, fixCyrillic, fixLatin };
