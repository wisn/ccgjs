{
  function int(x) {
    return parseInt(x, 10);
  }
}

Start = Tree

Tree
  = __ "(" node:NodeT left:Tree right:Tree ")" __
    { return { node, left, right }; }
  / __ "(" node:NodeT left:Tree "(" c:NodeL ")" __ ")" __
    { return { node, left, right: { node: c } }; }
  / __ "(" node:NodeT "(" c:NodeL ")" right:Tree ")" __
    { return { node, left: { node: c }, right }; }
  / __ "(" node:NodeT left:Tree ")" __
    { return { node, left }; }
  / __ "(" node:NodeT c:Node ")" __
    { return { node, ...c }; }

Node
  = __ "(" c1:NodeL ")" __ "(" c2:NodeL ")" __
    { return { left: { node: c1 }, right: { node: c2 } }; }
  / __ "(" c:NodeL ")" __
    { return { left: { node: c } }; }

NodeT
  = __ "<" __ "T" _ ccgCat:CCGCat _ head:Head _ dtrs:Dtrs __ ">" __
    { return { type: "T", ccgCat, head, dtrs }; }

Head
  = ("0" / "1") { return int(text()); }

Dtrs
  = ("0" / "1" / "2") { return int(text()); }

NodeL
  = __ "<" __ "L" _
      ccgCat:CCGCat _
      modPOSTag:POSTag _
      origPOSTag:POSTag _
      word:Word _
      predArgCat:CCGCat __
    ">" __
    {
      return {
        type: "L",
        ccgCat,
        modPOSTag,
        origPOSTag,
        word,
        predArgCat,
      };
    }

CCGCat
  = ("(" CCGCat ")" RightCat
  / LeftCat "(" CCGCat ")"
  / "(" CCGCat ")"
  / SingleCat "/" SingleCat
  / SingleCat "\\" SingleCat
  / SingleCat) { return text(); }

LeftCat
  = SingleCat "/" / SingleCat "\\"

RightCat
  = "/" SingleCat / "\\" SingleCat

SingleCat
  = [A-Za-z]+ "[" [A-Za-z,]+ "]" / [A-Za-z]+

POSTag
  = [A-Z]+ { return text(); }

Word
  = [A-Za-z0-9]+ { return text(); }

_ "whitespace"
  = [ \t\n\r]+

__ "whitespaces"
  = [ \t\n\r]*