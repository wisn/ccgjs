# CCGjs

A combinatory categorial grammar (CCG) library for the web.

**NOTE**: Work-in-progress could be found on the [development][1] branch.

## Requirements

- Node.js ^= 12.18.2
- NPM ^= 6.14.7

## Installation

Run `npm install` and we are all set.

## Available APIs

### CCG.Reader

Read and then parse machine-readable CCG derivation into a JavaScript object.

Usage:

```javascript
const str = '(<T S 0 2> (<L S/NP PSP PSP Hi NP>) (<L NP NNP NNP Wisnu NP>))';
const reader = new CCG.Reader(str);
if (reader.read()) {
  console.log(reader.result);
}
```

The returned object looks like this:

```
{
  node: {
    type: 'T',
    ccgCat: 'S',
    head: 0,
    dtrs: 2,
  },
  left: {
    node: {
      type: 'L',
      ccgCat: 'S/NP',
      modPOSTag: 'PSP',
      origPOSTag: 'PSP',
      word: 'Hi',
      predArgCat: 'NP',
    },
  },
  right: {
    node: {
      type: 'L',
      ccgCat: 'NP',
      modPOSTag: 'NNP',
      origPOSTag: 'NNP',
      word: 'Wisnu',
      predArgCat: 'NP',
    },
  },
}
```

We uses PEG.js to build the parser.
The parsing expression grammar could be found on the `src/ccg.pegjs` file.
As for the generated parser, it could be found on the `src/generated.pegjs.ts`
file.

Run `npm run pegjs` to generate the `.pegjs` file into `.ts` file.

### CCG.Tree

Construct a JavaScript tree object based on the parsed machine-readable CCG
derivation via `CCG.Reader`. It will also building useful metadata for later
use.

Usage:

```javascript
const str = '(<T S 0 2> (<L S/NP PSP PSP Hi NP>) (<L NP NNP NNP Wisnu NP>))';
const tree = new CCG.Tree(str);
console.log(tree);
```

The returned object looks like this:

```
Tree {
  metadata: {
    isParsed: true,
    sentence: 'Hi Wisnu',
    nodes: [ [Object], [Object], [Object] ]
  },
  mappedWords: { Hi: { value: [Object] }, Wisnu: { value: [Object] } },
  root: {
    value: { type: 'T', ccgCat: 'S', head: 0, dtrs: 2 },
    left: { value: [Object] },
    right: { value: [Object] }
  }
}
```

For more information about the omitted `[Object]`,
see `CCG.TreeTypes.Metadata`, `CCG.TreeTypes.WordMapper`, and
`CCG.TreeTypes.Node`.

We can also turn the tree back into machine-readable CCG derivation by doing
`tree.toString()`. The returned string will be:

```
(<T S 0 2> (<L S/NP PSP PSP Hi NP>) (<L NP NNP NNP Wisnu NP>))
```

## Unavailable API

This API will be added shortly.

### CCG.DOM

Render and manipulate `CCG.Tree` as a DOM (document object model) directly on
the browser.

## Contributing

Please refrain to contribute for the time being until this project officially
released. We will add `CONTRIBUTING.md` after we are ready.

Both issues and pull requests will be ignored.

## References

Hockenmaier, J., & Steedman, M. (2007). CCGbank: A corpus of CCG derivations
and dependency structures extracted from the Penn Treebank.
_Computational Linguistics_, _33_(3), 355–396.

Ambati, B.R., Deoskar, T. & Steedman, M. Hindi CCGbank: A CCG treebank
from the Hindi dependency treebank.
_Lang Resources & Evaluation_ **52**, 67–100 (2018).

## License

Licensed under the [MIT License](LICENSE).

[1]: https://github.com/wisn/ccgjs/tree/development
