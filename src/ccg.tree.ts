import Reader, {
  MachineReadableCCGNodeT,
  MachineReadableCCGNodeL,
  MachineReadableCCG,
} from './ccg.reader';

export type NodeT = MachineReadableCCGNodeT & { nIndex?: number };

export type NodeL = MachineReadableCCGNodeL & {
  nIndex?: number;
  wIndex?: number;
};

export type Node = {
  value: NodeT | NodeL;
  left?: Node;
  right?: Node;
};

export type Derivation = {
  from: number;
  to: number;
  ccgCat: string;
  opr?: string;
};

export type Metadata = {
  isParsed: boolean;
  sentence: string;
  words: Array<string>;
  ccgCats: Array<string>;
  derivations?: Array<Array<Derivation>>;
  height: number;
  nodes: Array<Node>;
};

export type IndexedWordMapper = { [key: number]: Node };

export type ToStringOptions = { pretty?: boolean };

export default class Tree {
  public root?: Node;
  public metadata?: Metadata;
  public mappedIndexedWords?: IndexedWordMapper;
  private stringBuilder?: string;

  constructor(str: string = '') {
    if (str.length > 0) {
      this.metadata = {
        isParsed: false,
        sentence: '',
        words: [],
        ccgCats: [],
        height: 0,
        nodes: [],
      };
      this.constructTree(str);
    }
  }

  public traverse(fn: Function): any {
    return fn(this.root);
  }

  public toString(opts?: ToStringOptions): string {
    if (this.root) {
      this.stringBuilder = '';
      this.toStringUtil(this.root, 0, opts);

      return this.stringBuilder.substring(1);
    }

    return '';
  }

  public buildDerivations(): Array<Array<Derivation>> {
    if (!this.root) {
      return [];
    }

    this.metadata!.derivations = [];
    for (let i = 0; i < this.metadata!.height!; i++) {
      this.metadata!.derivations.push([]);
    }

    this.buildDerivUtil(this.root!);

    return this.metadata!.derivations;
  }

  private constructTree(str: string): void {
    const reader = new Reader(str);
    if (reader.read()) {
      const result: MachineReadableCCG = reader.result as MachineReadableCCG;

      this.buildTree(result);
      this.metadata!.isParsed = true;
    }
  }

  private buildTree(obj: MachineReadableCCG): void {
    this.buildTreeUtil(obj, 1);
  }

  private buildTreeUtil(
    obj: MachineReadableCCG,
    level: number,
    parent?: Node,
    dir?: string
  ): void {
    const node: Node = { value: obj.node };
    if (this.root === undefined) {
      this.mappedIndexedWords = {};
      this.root = node;
    }

    const nIndex = this.metadata?.nodes.length;
    node.value.nIndex = nIndex;
    this.metadata?.nodes.push(node);

    if (this.isNodeL(node)) {
      const nodeL: NodeL = node.value as NodeL;
      const wIndex = this.metadata!.words.length;

      nodeL.wIndex = wIndex;
      this.metadata!.words.push(nodeL.word);
      this.metadata!.ccgCats.push(nodeL.ccgCat);
      this.mappedIndexedWords![wIndex] = node;

      if (this.metadata?.sentence === '') {
        this.metadata!.sentence = nodeL.word;
      } else {
        this.metadata!.sentence += ` ${nodeL.word}`;
      }
    }

    this.metadata!.height = Math.max(this.metadata?.height!, level);

    if (dir === 'left') {
      parent!.left = node;
    }

    if (dir === 'right') {
      parent!.right = node;
    }

    obj.left && this.buildTreeUtil(obj.left, level + 1, node, 'left');
    obj.right && this.buildTreeUtil(obj.right, level + 1, node, 'right');
  }

  private toStringUtil(
    node: Node,
    level: number,
    opts?: ToStringOptions
  ): void {
    if (opts?.pretty) {
      const indents = 2 * level;
      this.stringBuilder += '\n' + ' '.repeat(indents) + '(';
    } else {
      this.stringBuilder += ' (';
    }

    if (this.isNodeT(node)) {
      const n: NodeT = node.value as NodeT;
      this.stringBuilder += [
        '<T',
        `${n.ccgCat}`,
        `${n.head}`,
        `${n.dtrs}>`,
      ].join(' ');
    } else if (this.isNodeL(node)) {
      const n: NodeL = node.value as NodeL;
      this.stringBuilder += [
        '<L',
        `${n.ccgCat}`,
        `${n.modPOSTag}`,
        `${n.origPOSTag}`,
        `${n.word}`,
        `${n.predArgCat}>`,
      ].join(' ');
    } else {
      this.stringBuilder += '<ill-formed CCG Node>';
    }

    node.left && this.toStringUtil(node.left, level + 1, opts);
    node.right && this.toStringUtil(node.right, level + 1, opts);

    this.stringBuilder += ')';
  }

  private isNodeT(node: Node): boolean {
    return (node.value as NodeT).head !== undefined;
  }

  private isNodeL(node: Node): boolean {
    return (node.value as NodeL).word !== undefined;
  }

  private buildDerivUtil(node: Node, dir?: string): Array<number> {
    if (this.isNodeL(node)) {
      const nodeL: NodeL = node.value as NodeL;
      const index = nodeL.wIndex!;

      const derivation: Derivation = {
        from: index,
        to: index,
        ccgCat: nodeL.ccgCat,
      };
      this.metadata!.derivations![0].push(derivation);

      if (dir === 'left') {
        return [index, -1, 1];
      }

      return [-1, index, 1];
    }

    const derivLeft = this.buildDerivUtil(node.left!, 'left');
    let derivRight: Array<null> | Array<number> = [null, null, null];

    if (node.right) {
      derivRight = this.buildDerivUtil(node.right!, 'right');
    }

    const derivation: Derivation = {
      from: derivLeft[0],
      to: derivRight[1] ?? derivLeft[0],
      ccgCat: node.value.ccgCat,
      opr: (node.value as NodeT).head !== 0 ? '<' : '>',
    };
    const bottom = Math.max(derivLeft[2], derivRight[2] ?? -1);

    this.metadata!.derivations![bottom].push(derivation);

    return [derivation.from, derivation.to, bottom + 1];
  }
}
