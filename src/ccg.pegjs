{
  function int(x) {
  	return parseInt(x, 10);
  }
}

Tree
  = "(" node:NodeT _ left:Tree _ right:Tree ")" { return { node, left, right }; }
  / "(" node:NodeT _ left:Tree _ "(" c:NodeL ")" ")" { return { node, left, right: { node: c } }; }
  / "(" node:NodeT _ "(" c:NodeL ")" _ right:Tree ")" { return { node, left: { node: c }, right }; }
  / "(" node:NodeT _ left:Tree ")" { return { node, left }; }
  / "(" node:NodeT _ c:Node ")" { return { node, ...c }; }

Node
  = "(" c1:NodeL ")" _ "(" c2:NodeL ")" { return { left: { node: c1 }, right: { node: c2 } }; }
  / "(" c:NodeL ")" { return { left: { node: c } }; }

NodeT
  = "<T" _ ccgCat:CCGCat _ head:Head _ dtrs:Dtrs ">" {
    return { type: "T", ccgCat, head, dtrs };
  }

Head
  = ("0" / "1") { return int(text()); }

Dtrs
  = ("0" / "1" / "2") { return int(text()); }

NodeL
  = "<L" _ ccgCat:CCGCat _ modPOSTag:POSTag _ origPOSTag:POSTag _ word:Word _ predArgCat:CCGCat ">" {
    return { type: "L", ccgCat, modPOSTag, origPOSTag, word, predArgCat };
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
  = [A-Za-z]+ "[" [a-z]+ "]" / [A-Za-z]+

POSTag
  = [A-Z]+ { return text(); }

Word
  = [A-Za-z0-9]+ { return text(); }

_ "whitespace"
  = [ ]