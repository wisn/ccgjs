import * as PEGjs from './generated.pegjs';

export enum DependencyHead {
  Left = 0,
  Right = 1,
}

export type MachineReadableCCGNodeT = {
  type?: string;
  ccgCat: string;
  head: DependencyHead;
  dtrs: 0 | 1 | 2;
};

export type MachineReadableCCGNodeL = {
  type?: string;
  ccgCat: string;
  modPOSTag: string;
  origPOSTag: string;
  word: string;
  predArgCat: string;
};

export type MachineReadableCCG = {
  node: MachineReadableCCGNodeT | MachineReadableCCGNodeL;
  left?: MachineReadableCCG;
  right?: MachineReadableCCG;
};

export default class Reader {
  public original: string;
  public isSucceed: boolean = false;
  public result?: MachineReadableCCG;

  public constructor(str: string = '') {
    this.original = str;
  }

  public read(): MachineReadableCCG | boolean {
    let obj;
    try {
      obj = PEGjs.parse(this.original);
    } catch {
      return false;
    }

    this.result = obj;
    this.isSucceed = true;

    return obj;
  }
}
