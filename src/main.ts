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
    for (let i = 0; i < str.length; i++) {
        if (str[i] in cyrillicLatinMap) return true;
    }

    return false;
};

//** Check is string has at least one hidden Latin letter */
export const isHasLatin = (str: string): boolean => {
    for (let i = 0; i < str.length; i++) {
        if (str[i] in latinCyrillicMap) return true;
    }

    return false;
};

//** Detect all positions of hidden Cyrillic letters in the string */
export const detectCyrillic = (str: string): DetectionResult[] => {
    const result: DetectionResult[] = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] in cyrillicLatinMap) result.push({ position: i, value: str[i] });
    }

    return result;
};

//** Detect all positions of hidden Latin letters in the string */
export const detectLatin = (str: string): DetectionResult[] => {
    const result: DetectionResult[] = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] in latinCyrillicMap) result.push({ position: i, value: str[i] });
    }

    return result;
};

//** Replace all hidden Cyrillic letters with equivalent Latin letters */
export const fixCyrillic = (str: string): string => {
    let fixedStr = "";

    for (let i = 0; i < str.length; i++) {
        fixedStr += cyrillicLatinMap[str[i]] ?? str[i];
    }

    return fixedStr;
};

//** Replace all hidden Latin letters with equivalent Cyrillic letters */
export const fixLatin = (str: string): string => {
    let fixedStr = "";

    for (let i = 0; i < str.length; i++) {
        fixedStr += latinCyrillicMap[str[i]] ?? str[i];
    }

    return fixedStr;
};

export default { isHasCyrillic, isHasLatin, detectCyrillic, detectLatin, fixCyrillic, fixLatin };
