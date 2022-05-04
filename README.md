<div style="text-align:center">

<h1>Enum to Array</h1>
<p>Convert Typescript Enums to a strongly typed array.</p>

[![npm package](https://badge.fury.io/js/enum-to-array.svg)](https://www.npmjs.com/package/enum-to-array)
[![Github CI](https://img.shields.io/github/workflow/status/JacobLey/enum-to-array/Publish%20Canary)](https://github.com/JacobLey/enum-to-array/actions/workflows/publish-canary.yaml)
[![License](https://img.shields.io/github/license/JacobLey/enum-to-array.svg)](https://github.com/JacobLey/enum-to-array/blob/master/LICENSE)
[![Quality](https://img.shields.io/npms-io/quality-score/enum-to-array)](https://www.npmjs.com/package/enum-to-array)

</div>

## Contents
- [Introduction](#Introduction)
- [Install](#Install)
- [Example](#Example)
- [Usage](#usage)
- [API](#api)

<a name="Introduction"></a>
## Introduction

Enum to array is a light module for converting a typescript enum to an array of keys or values.

Thanks to [reverse mappings](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings) this is a little bit trickier than `Object.keys` or `Object.values`

<a name="Install"></a>
## Install

```sh
npm i enum-to-array
```

<a name="Example"></a>
## Example

```ts
import { enumToValues } from 'enum-to-values';

enum MyEnum {
    FOO = 'BAR',
    ABC = 123,
}
console.log(enumToArray(MyEnum));
// [{ key: 'FOO', value: 'BAR' }, { key: 'ABC', value: 123 }]
```

<a name="usage"></a>
## Usage

Enum To Array is an ESM module. That means it _must_ be `import`ed. To load from a CJS module, use dynamic import `const { enumToArray } = await import('enum-to-array');`.

Due to the nature of `const enum`s, those are not usable with this library as there is nothing to pass at runtime.

This can be partially resolved by using [preserveConstEnums](https://www.typescriptlang.org/tsconfig#preserveConstEnums).

<a name="api"></a>
## API

Enum To Array exports three functions:

### enumToArray
Lists key-value pairs of enum, in order that they occur.

```ts
import { enumToArray } from 'enum-to-array';

enum MyEnum {
    FOO = 'BAR',
    ABC = 123,
    DUP = FOO,
}
console.log(enumToArray(MyEnum));
// [
//    { key: 'FOO', value: 'BAR' },
//    { key: 'ABC', value: 123 },
//    { key: 'DUP', value: 'BAR' },
// ]
```

### enumToValues
Lists values of enum, in order that they occur.

```ts
import { enumToValues } from 'enum-to-array';

console.log(enumToValues(MyEnum));
// ['BAR', 123, 'BAR']
```

Optionally de-dupe values with `{ unique: true }` provided as a second parameter.

```ts
console.log(enumToValues(MyEnum, { unique: true }));
// ['BAR', 123]
```

### enumToKeys
Lists keys of enum, in order that they occur.

```ts
import { enumToKeys } from 'enum-to-array';

console.log(enumToKeys(MyEnum));
// ['FOO', 'ABC', 'DUP']
```
