# 👨🏽‍⚕️ Cyrillic Doctor

Node.js library for detecting and fixing hidden Cyrillic letters in Latin text or vice versa.

## Installation

```
npm install cyrillic-doctor
```

Import package into your project:

```js
// ESM
import Doctor from "cyrillic-doctor";
```

```js
// CommonJS
const Doctor = require("cyrillic-doctor");
```

Or you can import only the functions you need:

```js
// ESM
import { fixCyrillic } from "cyrillic-doctor";
```

```js
// CommonJS
const { fixCyrillic } = require("cyrillic-doctor");
```

## Documentation

This library is support working with both hidden Cyrillic letters in Latin texts and hidden Latin letters in Cyrillic texts. Therefore, each function has one of the postfixes: _Cyrillic_ or _Latin_.

-   **isHasCyrillic**(`string`): `boolean`

    Check is string has at least one hidden Cyrillic letter.

    ```js
    const str = "Неllо, Wоrld!"; // "H", "e" and "o" are Cyrillic

    Doctor.isHasCyrillic(str); // true
    ```

-   **isHasLatin**(`string`): `boolean`

    Check is string has at least one hidden Latin letter.

    ```js
    const str = "Пpивeт, Mиp!"; // "p", "e" and "M" are Latin

    Doctor.isHasCyrillic(str); // true
    ```

-   **detectCyrillic**(`string`): `{position: number, value: string}[]`

    Detect all positions of hidden Cyrillic letters in the string.

    ```js
    const str = "Неllо, Wоrld!";

    Doctor.detectCyrillic(str);
    ```

    ```js
    [
        { position: 0, value: "Н" },
        { position: 1, value: "е" },
        { position: 4, value: "о" },
        { position: 8, value: "о" },
    ];
    ```

    > If there are no hidden letters in the source string, the result will be an empty array.

-   **detectLatin**(`string`): `{position: number, value: string}[]`

    Detect all positions of hidden Latin letters in the string.

    ```js
    const str = "Пpивeт, Mиp!";

    Doctor.detectLatin(str);
    ```

    ```js
    [
        { position: 1, value: "p" },
        { position: 4, value: "e" },
        { position: 8, value: "M" },
        { position: 10, value: "p" },
    ];
    ```

-   **fixCyrillic**(`string`): `string`

    Replace all hidden Cyrillic letters with equivalent Latin letters.

    ```js
    const str = "Неllо, Wоrld!";
    const fixedStr = Doctor.fixCyrillic(str);

    Doctor.isHasCyrillic(fixedStr); // false
    ```

    > If there is nothing to fix, the result will return the original string.

-   **fixLatin**(`string`): `string`

    Replace all hidden Latin letters with equivalent Cyrillic letters.

    ```js
    const str = "Пpивeт, Mиp!";
    const fixedStr = Doctor.fixLatin(str);

    Doctor.isHasLatin(fixedStr); // false
    ```

## License

This project is under [MIT License](./LICENSE).
