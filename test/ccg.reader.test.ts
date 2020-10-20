import { parse } from "../src/ccg.reader.js";

describe("ccg.reader", () => {
  it("won't compile a single wild node", () => {
    const str = "(<T S 0 0>)";
    try {
      parse(str);
      expect("").toEqual("must not compile");
    } catch {
      expect(true).toBeTruthy();
    }
  });

  it("won't compile a single leaf node", () => {
    const str = "(<L NP NNP NNP Wisnu NP>)";
    try {
      parse(str);
      expect("").toEqual("must not compile");
    } catch {
      expect(true).toBeTruthy();
    }
  });

  it("compiles CCG tree with a single leaf", () => {
    const str = "(<T S 0 1> (<L S/NP NNP NNP Wisnu NP>))";
    const tree = {
      "node": {
        "type": "T",
        "ccgCat": "S",
        "head": 0,
        "dtrs": 1,
      },
      "left": {
        "type": "L",
        "ccgCat": "S/NP",
        "modPOSTag": "NNP",
        "origPOSTag": "NNP",
        "word": "Wisnu",
        "predArgCat": "NP",
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles CCG tree with two leaves", () => {
    const str = [
      "(<T S 0 2>",
      "(<L S/NP PSP PSP Hi NP>)",
      "(<L NP NNP NNP Wisnu NP>))",
    ].join(" ");
    const tree = {
      "node": {
        "type": "T",
        "ccgCat": "S",
        "head": 0,
        "dtrs": 2,
      },
      "left": {
        "type": "L",
        "ccgCat": "S/NP",
        "modPOSTag": "PSP",
        "origPOSTag": "PSP",
        "word": "Hi",
        "predArgCat": "NP",
      },
      "right": {
        "type": "L",
        "ccgCat": "NP",
        "modPOSTag": "NNP",
        "origPOSTag": "NNP",
        "word": "Wisnu",
        "predArgCat": "NP",
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles left leaf and right tree (single leaf)", () => {
    const str = [
      "(<T S 0 2>",
      "(<L NP NNP NNP Wisnu NP>)",
      "(<T S/NP 0 1> (<L S/NP PSP PSP pergi S/NP>)))",
    ].join(" ");
    const tree = {
      "node": {
        "ccgCat": "S",
        "dtrs": 2,
        "head": 0,
        "type": "T",
      },
      "left": {
        "ccgCat": "NP",
        "modPOSTag": "NNP",
        "origPOSTag": "NNP",
        "predArgCat": "NP",
        "type": "L",
        "word": "Wisnu",
      },
      "right": {
        "node": {
          "ccgCat": "S/NP",
          "dtrs": 1,
          "head": 0,
          "type": "T",
        },
        "left": {
          "ccgCat": "S/NP",
          "modPOSTag": "PSP",
          "origPOSTag": "PSP",
          "predArgCat": "S/NP",
          "type": "L",
          "word": "pergi",
        },
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles left leaf and right tree (two leaves)", () => {
    const str = [
      "(<T S 0 2>",
      "(<L NP NNP NNP Wisnu NP>)",
      "(<T S/NP 0 2> (<L NP PSP PSP pergi NP>)",
      "(<L NP/NP PSP PSP jauh NP/NP>)))",
    ].join(" ");
    const tree = {
      "node": {
        "ccgCat": "S",
        "dtrs": 2,
        "head": 0,
        "type": "T",
      },
      "left": {
        "ccgCat": "NP",
        "modPOSTag": "NNP",
        "origPOSTag": "NNP",
        "predArgCat": "NP",
        "type": "L",
        "word": "Wisnu",
      },
      "right": {
        "node": {
          "ccgCat": "S/NP",
          "dtrs": 2,
          "head": 0,
          "type": "T",
        },
        "left": {
          "ccgCat": "NP",
          "modPOSTag": "PSP",
          "origPOSTag": "PSP",
          "predArgCat": "NP",
          "type": "L",
          "word": "pergi",
        },
        "right": {
          "ccgCat": "NP/NP",
          "modPOSTag": "PSP",
          "origPOSTag": "PSP",
          "predArgCat": "NP/NP",
          "type": "L",
          "word": "jauh",
        },
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles left tree (single leaf) and right leaf", () => {
    const str = [
      "(<T S 0 2>",
      "(<T S/NP 0 1> (<L S/NP NNP NNP Wisnu S/NP>))",
      "(<L NP PSP PSP pergi NP>))",
    ].join(" ");
    const tree = {
      "node": {
        "ccgCat": "S",
        "dtrs": 2,
        "head": 0,
        "type": "T",
      },
      "left": {
        "node": {
          "ccgCat": "S/NP",
          "dtrs": 1,
          "head": 0,
          "type": "T",
        },
        "left": {
          "ccgCat": "S/NP",
          "modPOSTag": "NNP",
          "origPOSTag": "NNP",
          "predArgCat": "S/NP",
          "type": "L",
          "word": "Wisnu",
        },
      },
      "right": {
        "ccgCat": "NP",
        "modPOSTag": "PSP",
        "origPOSTag": "PSP",
        "predArgCat": "NP",
        "type": "L",
        "word": "pergi",
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles left tree (two leaves) and right leaf", () => {
    const str = [
      "(<T S 0 2>",
      "(<T S/NP 1 2>",
      "(<L (S/NP)\\NP NNP NNP Wisnu (S/NP)\\NP>)",
      "(<L NP PSP PSP pergi NP>))",
      "(<L NP PSP PSP jauh NP>))",
    ].join(" ");
    const tree = {
      "node": {
        "ccgCat": "S",
        "dtrs": 2,
        "head": 0,
        "type": "T",
      },
      "left": {
        "node": {
          "ccgCat": "S/NP",
          "dtrs": 2,
          "head": 1,
          "type": "T",
        },
        "left": {
          "ccgCat": "(S/NP)\\NP",
          "modPOSTag": "NNP",
          "origPOSTag": "NNP",
          "predArgCat": "(S/NP)\\NP",
          "type": "L",
          "word": "Wisnu",
        },
        "right": {
          "ccgCat": "NP",
          "modPOSTag": "PSP",
          "origPOSTag": "PSP",
          "predArgCat": "NP",
          "type": "L",
          "word": "pergi",
        },
      },
      "right": {
        "ccgCat": "NP",
        "modPOSTag": "PSP",
        "origPOSTag": "PSP",
        "predArgCat": "NP",
        "type": "L",
        "word": "jauh",
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("compiles the real coarse-grained CCG tree", () => {
    const str = [
      "(<T Sf 1 2>",
      "(<T NP 0 2>",
      "(<L NP NNP NNP raam NP>)",
      "(<L NP\\NP PSP PSP ne NP\\NP>))",
      "(<T Sf\\NP 1 2>",
      "(<T NP 0 2>",
      "(<L NP NNP NNP mohan NP>)",
      "(<L NP\\NP PSP PSP ko NP\\NP>))",
      "(<T (Sf\\NP)\\NP 1 2>",
      "(<T NP 1 2>",
      "(<L NP/NP JJ JJ niilii NP/NP>)",
      "(<L NP NN NN kitaab NP>))",
      "(<L ((Sf\\NP)\\NP)\\NP VM VM dii ((Sf\\NP)\\NP)\\NP>))))"
    ].join(" ");
    const tree = {
      "node": {
        "type": "T",
        "ccgCat": "Sf",
        "head": 1,
        "dtrs": 2,
      },
      "left": {
        "node": {
          "type": "T",
          "ccgCat": "NP",
          "head": 0,
          "dtrs": 2,
        },
        "left": {
          "type": "L",
          "ccgCat": "NP",
          "modPOSTag": "NNP",
          "origPOSTag": "NNP",
          "word": "raam",
          "predArgCat": "NP",
        },
        "right": {
          "type": "L",
          "ccgCat": "NP\\NP",
          "modPOSTag": "PSP",
          "origPOSTag": "PSP",
          "word": "ne",
          "predArgCat": "NP\\NP",
        },
      },
      "right": {
        "node": {
          "type": "T",
          "ccgCat": "Sf\\NP",
          "head": 1,
          "dtrs": 2,
        },
        "left": {
          "node": {
            "type": "T",
            "ccgCat": "NP",
            "head": 0,
            "dtrs": 2,
          },
          "left": {
            "type": "L",
            "ccgCat": "NP",
            "modPOSTag": "NNP",
            "origPOSTag": "NNP",
            "word": "mohan",
            "predArgCat": "NP",
          },
          "right": {
            "type": "L",
            "ccgCat": "NP\\NP",
            "modPOSTag": "PSP",
            "origPOSTag": "PSP",
            "word": "ko",
            "predArgCat": "NP\\NP",
          },
        },
        "right": {
          "node": {
            "type": "T",
            "ccgCat": "(Sf\\NP)\\NP",
            "head": 1,
            "dtrs": 2,
          },
          "left": {
            "node": {
              "type": "T",
              "ccgCat": "NP",
              "head": 1,
              "dtrs": 2,
            },
            "left": {
              "type": "L",
              "ccgCat": "NP/NP",
              "modPOSTag": "JJ",
              "origPOSTag": "JJ",
              "word": "niilii",
              "predArgCat": "NP/NP",
            },
            "right": {
              "type": "L",
              "ccgCat": "NP",
              "modPOSTag": "NN",
              "origPOSTag": "NN",
              "word": "kitaab",
              "predArgCat": "NP",
            },
          },
          "right": {
            "type": "L",
            "ccgCat": "((Sf\\NP)\\NP)\\NP",
            "modPOSTag": "VM",
            "origPOSTag": "VM",
            "word": "dii",
            "predArgCat": "((Sf\\NP)\\NP)\\NP",
          },
        },
      },
    };

    expect(parse(str)).toStrictEqual(tree);
  });

  it("won't compile the real malformed CCG tree", () => {
    const str = [
      "(<T Sf 1 2>",
      "(<T NP 0 2>",
      "(<L NP NNP NNP raam NP>)",
      "(<L NP\\NP PSP PSP ne NP\\NP>))",
      "(<T Sf\\NP 1 2>",
      "(<T NP 0 2>",
      "(<L NP NNP NNP mohan NP>)",
      "(<L NP\\NP PSP PSP ko NP\\NP>))",
      "(<T (Sf\\NP)\\NP 1 2>",
      "(<T NP 1 2>",
      "(<L NP/NP JJ JJ niilii NP/NP>)",
      "(<L NP NN NN kitaab NP>))",
      "(<L ((Sf\\NP)\\NP)\\NP VM VM dii ((Sf\\NP)\\NP)\\NP>)))))"
    ].join(" ");
    try {
      parse(str);
      expect("").toEqual("must not compile");
    } catch {
      expect(true).toBeTruthy();
    }
  });
});
