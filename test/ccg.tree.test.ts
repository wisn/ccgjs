import CCG from '../src/';

describe('ccg.tree', () => {
  it('ables to retrieve the correct order of sentence', () => {
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
    const ccgTree = new CCG.Tree(str);
    const sentence = 'raam ne mohan ko niilii kitaab dii';

    expect(ccgTree.metadata?.sentence).toEqual(sentence);
  });

  it('formats the generated tree into its original machine-readable CCG derivation', () => {
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
    const ccgTree = new CCG.Tree(str);
    const machineReadableCCG = ccgTree.toString();

    expect(machineReadableCCG).toEqual(str);
  });

  it('derives the CCG derivation in the right order', () => {
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
    const ccgTree = new CCG.Tree(str);
    const derivation = [
      [
        { from: 0, to: 0, ccgCat: 'NP' },
        { from: 1, to: 1, ccgCat: 'NP\\NP' },
        { from: 2, to: 2, ccgCat: 'NP' },
        { from: 3, to: 3, ccgCat: 'NP\\NP' },
        { from: 4, to: 4, ccgCat: 'NP/NP' },
        { from: 5, to: 5, ccgCat: 'NP' },
        { from: 6, to: 6, ccgCat: '((Sf\\NP)\\NP)\\NP' },
      ],
      [
        { from: 0, to: 1, ccgCat: 'NP', opr: '>' },
        { from: 2, to: 3, ccgCat: 'NP', opr: '>' },
        { from: 4, to: 5, ccgCat: 'NP', opr: '<' },
      ],
      [{ from: 4, to: 6, ccgCat: '(Sf\\NP)\\NP', opr: '<' }],
      [{ from: 2, to: 6, ccgCat: 'Sf\\NP', opr: '<' }],
      [{ from: 0, to: 6, ccgCat: 'Sf', opr: '<' }],
    ];

    expect(ccgTree.buildDerivations()).toStrictEqual(derivation);
  });
});
