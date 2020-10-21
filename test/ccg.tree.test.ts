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
});
