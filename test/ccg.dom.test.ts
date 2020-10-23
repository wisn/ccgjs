import CCG from '../src';

describe('ccg.dom', () => {
  it('works', () => {
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
    const htmlStr = [
      '<table class="ccgjs"><tr class="ccgjs-words"><td>raam</td>',
      '<td class="ccgjs-operation"></td><td>ne</td><td class="ccgjs-operation">',
      '</td><td>mohan</td><td class="ccgjs-operation"></td><td>ko</td>',
      '<td class="ccgjs-operation"></td><td>niilii</td><td class="ccgjs-operation">',
      '</td><td>kitaab</td><td class="ccgjs-operation"></td><td>dii</td>',
      '<td class="ccgjs-operation"></td></tr><tr class="ccgjs-ruler"><td><hr></td>',
      '<td class="ccgjs-operation"></td><td><hr></td><td class="ccgjs-operation">',
      '</td><td><hr></td><td class="ccgjs-operation"></td><td><hr></td>',
      '<td class="ccgjs-operation"></td><td><hr></td><td class="ccgjs-operation">',
      '</td><td><hr></td><td class="ccgjs-operation"></td><td><hr></td>',
      '<td class="ccgjs-operation"></td></tr><tr class="ccgjs-derivation"><td>NP',
      '<td class="ccgjs-operation"></td></td><td>NP\\NP<td class="ccgjs-operation">',
      '</td></td><td>NP<td class="ccgjs-operation"></td></td><td>NP\\NP',
      '<td class="ccgjs-operation"></td></td><td>NP/NP<td class="ccgjs-operation">',
      '</td></td><td>NP<td class="ccgjs-operation"></td></td><td>((Sf\\NP)\\NP)\\NP',
      '<td class="ccgjs-operation"></td></td></tr><tr class="ccgjs-ruler">',
      '<td colspan="3"><hr></td><td class="ccgjs-operation">&gt;</td><td colspan="3">',
      '<hr></td><td class="ccgjs-operation">&gt;</td><td colspan="3"><hr></td>',
      '<td class="ccgjs-operation">&lt;</td><td colspan="2"></td></tr>',
      '<tr class="ccgjs-derivation"><td colspan="3">NP<td class="ccgjs-operation">',
      '</td></td><td colspan="3">NP<td class="ccgjs-operation"></td></td>',
      '<td colspan="3">NP<td class="ccgjs-operation"></td></td><td colspan="2"></td>',
      '</tr><tr class="ccgjs-ruler"><td colspan="8"></td><td colspan="5"><hr></td>',
      '<td class="ccgjs-operation">&lt;</td></tr><tr class="ccgjs-derivation">',
      '<td colspan="8"></td><td colspan="5">(Sf\\NP)\\NP<td class="ccgjs-operation">',
      '</td></td></tr><tr class="ccgjs-ruler"><td colspan="4"></td><td colspan="9">',
      '<hr></td><td class="ccgjs-operation">&lt;</td></tr><tr class="ccgjs-derivation">',
      '<td colspan="4"></td><td colspan="9">Sf\\NP<td class="ccgjs-operation"></td></td>',
      '</tr><tr class="ccgjs-ruler"><td colspan="13"><hr></td>',
      '<td class="ccgjs-operation">&lt;</td></tr><tr class="ccgjs-derivation">',
      '<td colspan="13">Sf<td class="ccgjs-operation"></td></td></tr></table>',
    ].join('');

    expect(table.outerHTML).toStrictEqual(htmlStr);
  });
});
