import Tree from './ccg.tree';

export default class DOM {
  public tree?: Tree;
  private domBuilder?: HTMLElement;

  public constructor(tree: string | Tree) {
    if (typeof tree === 'string') {
      if (tree.length > 0) {
        this.tree = new Tree(tree);
      }
    } else {
      this.tree = tree;
    }

    this.tree?.buildDerivations();
  }

  public create(fn?: Function): any {
    if (fn) {
      return fn(this.tree);
    }

    return this.createTable();
  }

  public createTable(): HTMLElement {
    const table = document.createElement('table');
    table.className = 'ccgjs';
    this.domBuilder = table;

    let lastTo: number;
    let hrTr: HTMLTableRowElement;
    const numOfWords = this.tree!.metadata!.words.length;
    const wordTr = document.createElement('tr');

    this.tree?.metadata?.words.forEach(word => {
      const wordTd = document.createElement('td');
      const text = document.createTextNode(word);
      wordTd.appendChild(text);
      wordTr.appendChild(wordTd);

      const oprTd = document.createElement('td');
      oprTd.className = 'ccgjs-operation';
      wordTr.appendChild(oprTd);
    });

    wordTr.className = 'ccgjs-words';
    this.domBuilder.appendChild(wordTr);

    this.tree?.metadata?.derivations?.forEach(row => {
      const derivTr = document.createElement('tr');
      derivTr.className = 'ccgjs-derivation';

      lastTo = 0;
      hrTr = document.createElement('tr');
      hrTr.className = 'ccgjs-ruler';

      row.forEach(deriv => {
        const { from, to } = deriv;
        const diff = from - lastTo;

        if (diff > 1) {
          const derivTd = document.createElement('td');
          derivTd.colSpan = diff * 2;
          derivTr.appendChild(derivTd);

          const hrTd = document.createElement('td');
          hrTd.colSpan = diff * 2;
          hrTr.appendChild(hrTd);
        }

        const derivTd = document.createElement('td');
        const text = document.createTextNode(deriv.ccgCat);
        derivTd.appendChild(text);

        const hr = document.createElement('hr');
        const hrTd = document.createElement('td');
        hrTd.appendChild(hr);

        const oprTd = document.createElement('td');
        oprTd.className = 'ccgjs-operation';
        const opr = document.createTextNode(deriv.opr ?? '');
        oprTd.appendChild(opr);

        const fakeOpr = document.createElement('td');
        fakeOpr.className = 'ccgjs-operation';

        if (to - from > 0) {
          const diffM = (to - from + 1) * 2 - 1;
          derivTd.colSpan = diffM;
          hrTd.colSpan = diffM;
        }

        hrTr.appendChild(hrTd);
        hrTr.appendChild(oprTd);
        derivTr.appendChild(derivTd);
        derivTr.appendChild(fakeOpr);

        lastTo = to;
      });

      if (lastTo + 1 < numOfWords) {
        const diff = (numOfWords - (lastTo + 1)) * 2;

        const derivTd = document.createElement('td');
        derivTd.colSpan = diff;
        derivTr.appendChild(derivTd);

        const hrTd = document.createElement('td');
        hrTd.colSpan = diff;
        hrTr.appendChild(hrTd);
      }

      this.domBuilder?.appendChild(hrTr);
      this.domBuilder?.appendChild(derivTr);
    });

    return this.domBuilder;
  }
}
