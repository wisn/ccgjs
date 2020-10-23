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

```typescript
const str = '(<T S 0 2> (<L S/NP PSP PSP Hi S/NP>) (<L NP NNP NNP Wisnu NP>))';
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
      predArgCat: 'S/NP',
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

```typescript
const str = '(<T S 0 2> (<L S/NP PSP PSP Hi S/NP>) (<L NP NNP NNP Wisnu NP>))';
const tree = new CCG.Tree(str);
console.log(tree);
```

The returned object looks like this:

```
Tree {
  metadata: {
    isParsed: true,
    sentence: 'Hi Wisnu',
    words: [ 'Hi', 'Wisnu' ],
    ccgCats: [ 'S/NP', 'NP' ],
    height: 2,
    nodes: [ [Object], [Object], [Object] ]
  },
  mappedIndexedWords: { '0': { value: [Object] }, '1': { value: [Object] } },
  root: {
    value: { type: 'T', ccgCat: 'S', head: 0, dtrs: 2 },
    left: { value: [Object] },
    right: { value: [Object] }
  }
}
```

For more information about the omitted `[Object]`,
see `CCG.TreeTypes.Metadata`, `CCG.TreeTypes.IndexedWordMapper`, and
`CCG.TreeTypes.Node`.

#### toString

We can also turn the tree back into machine-readable CCG derivation by doing
`tree.toString()`. The returned `string` will be:

```
(<T S 0 2> (<L S/NP PSP PSP Hi S/NP>) (<L NP NNP NNP Wisnu NP>))
```

#### buildDerivations

It is possible to get the structured CCG derivation based on the
`CCG.TreeTypes.Node` simply by doing `tree.buildDerivations()`.
The returned `Array<Array<CCG.TreeTypes.Derivation>>` will be:

```
[
  [
    { from: 0, to: 0, ccgCat: 'S/NP' },
    { from: 1, to: 1, ccgCat: 'NP' }
  ],
  [ { from: 0, to: 1, ccgCat: 'S', opr: '>' } ]
]
```

How to read?

In the `CCG.TreeTypes.Metadata`, we may find `words` key. In this example,
it will be `['Hi', 'Wisnu']`. Meaning that word `Hi` is at `0` index and
word `Wisnu` is at `1` index. We may read it as:

```
  Hi     Wisnu
------ ---------
 S/NP     NP
--------------->
       S
```

### CCG.DOM

Render and manipulate `CCG.Tree` as a DOM (document object model) directly on
the browser. Currently, there is only one method available.

Usage:

```typescript
const str = [
  '(<T Sf 1 2>',
  '(<T NP 0 2>',
  '(<L NP NNP NNP raam NP>)',
  '(<L NP\\NP PSP PSP ne NP\\NP>))',
  '(<T Sf\\NP 1 2>',
  '(<T NP 0 2>',
  '(<L NP NNP NNP mohan NP>)',
  '(<L NP\\NP PSP PSP ko NP\\NP>))',
  '(<T (Sf\\NP)\\NP 1 2>',
  '(<T NP 1 2>',
  '(<L NP/NP JJ JJ niilii NP/NP>)',
  '(<L NP NN NN kitaab NP>))',
  '(<L ((Sf\\NP)\\NP)\\NP VM VM dii ((Sf\\NP)\\NP)\\NP>))))',
].join(' ');
const dom = new CCG.DOM(str);
const table = dom.createTable();

// apply it directly
document.body.appendChild(table);

// or take the HTML string
console.log(table.outerHTML);
```

How it looks like?
Take a look on this [JS Bin](https://jsbin.com/woqazik/3/edit?html,output)!

## TODO

There are a lot of things to do.
The goal of this project is to enable interactive CCG derivation manipulation
directly on the web browser. By _manipulation_ we meant, as an example, the
ability to (interactively) create, edit, and delete a CCG node from its tree.
The direction of this project should be clear by now.

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
