import Reader, {
  MachineReadableCCGNodeT,
  MachineReadableCCGNodeL,
  MachineReadableCCG,
} from './ccg.reader';

export type NodeT = MachineReadableCCGNodeT;

export type NodeL = MachineReadableCCGNodeL;

export type Node = {
  value: NodeT | NodeL;
  left?: Node;
  right?: Node;
};

export type Metadata = {
  isParsed: boolean;
  sentence: string;
  nodes: Array<Node>;
};

export type WordMapper = { [key: string]: Node };

export default class Tree {
  public root?: Node;
  public metadata?: Metadata;
  public mappedWords?: WordMapper;
  private stringBuilder?: string;

  constructor(str: string = '') {
    if (str.length > 0) {
      this.metadata = {
        isParsed: false,
        sentence: '',
        nodes: [],
      };
      this.constructTree(str);
    }
  }

  public toString(): string {
    if (this.root) {
      this.stringBuilder = '';
      this.toStringUtil(this.root);

      return this.stringBuilder.substring(1);
    }

    return '';
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
    this.buildTreeUtil(obj);
  }

  private buildTreeUtil(
    obj: MachineReadableCCG,
    parent?: Node,
    dir?: string
  ): void {
    const node: Node = { value: obj.node };
    if (this.root === undefined) {
      this.mappedWords = {};
      this.root = node;
    }

    this.metadata?.nodes.push(node);
    if (node.value.type === 'L') {
      const nodeL: NodeL = node.value as NodeL;
      this.mappedWords![nodeL.word] = node;

      if (this.metadata?.sentence === '') {
        this.metadata!.sentence = nodeL.word;
      } else {
        this.metadata!.sentence += ` ${nodeL.word}`;
      }
    }

    if (dir === 'left') {
      parent!.left = node;
    }

    if (dir === 'right') {
      parent!.right = node;
    }

    obj.left && this.buildTreeUtil(obj.left, node, 'left');
    obj.right && this.buildTreeUtil(obj.right, node, 'right');
  }

  private toStringUtil(node: Node): void {
    this.stringBuilder += ' (';

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

    node.left && this.toStringUtil(node.left);
    node.right && this.toStringUtil(node.right);

    this.stringBuilder += ')';
  }

  private isNodeT(node: Node): boolean {
    return (node.value as NodeT).head !== undefined;
  }

  private isNodeL(node: Node): boolean {
    return (node.value as NodeL).word !== undefined;
  }
}
