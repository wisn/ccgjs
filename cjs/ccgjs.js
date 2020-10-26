'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// @ts-nocheck
var SyntaxError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(SyntaxError, _Error);

  function SyntaxError(message, expected, found, location) {
    var _this;

    _this = _Error.call(this) || this;
    _this.message = message;
    _this.expected = expected;
    _this.found = found;
    _this.location = location;
    _this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(_assertThisInitialized(_this), SyntaxError);
    }

    return _this;
  }

  SyntaxError.buildMessage = function buildMessage(expected, found) {
    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return "\\x" + hex(ch);
      });
    }

    function classEscape(s) {
      return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
        return "\\x0" + hex(ch);
      }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
        return "\\x" + hex(ch);
      });
    }

    function describeExpectation(expectation) {
      switch (expectation.type) {
        case "literal":
          return "\"" + literalEscape(expectation.text) + "\"";

        case "class":
          var escapedParts = expectation.parts.map(function (part) {
            return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
          });
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";

        case "any":
          return "any character";

        case "end":
          return "end of input";

        case "other":
          return expectation.description;
      }
    }

    function describeExpected(expected1) {
      var descriptions = expected1.map(describeExpectation);
      var i;
      var j;
      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }

        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found1) {
      return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  return SyntaxError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function peg$parse(input, options) {
  options = options !== undefined ? options : {};
  var peg$FAILED = {};
  var peg$startRuleFunctions = {
    Start: peg$parseStart
  };
  var peg$startRuleFunction = peg$parseStart;
  var peg$c0 = "(";
  var peg$c1 = peg$literalExpectation("(", false);
  var peg$c2 = ")";
  var peg$c3 = peg$literalExpectation(")", false);

  var peg$c4 = function peg$c4(node, left, right) {
    return {
      node: node,
      left: left,
      right: right
    };
  };

  var peg$c5 = function peg$c5(node, left, c) {
    return {
      node: node,
      left: left,
      right: {
        node: c
      }
    };
  };

  var peg$c6 = function peg$c6(node, c, right) {
    return {
      node: node,
      left: {
        node: c
      },
      right: right
    };
  };

  var peg$c7 = function peg$c7(node, left) {
    return {
      node: node,
      left: left
    };
  };

  var peg$c8 = function peg$c8(node, c) {
    return _extends({
      node: node
    }, c);
  };

  var peg$c9 = function peg$c9(c1, c2) {
    return {
      left: {
        node: c1
      },
      right: {
        node: c2
      }
    };
  };

  var peg$c10 = function peg$c10(c) {
    return {
      left: {
        node: c
      }
    };
  };

  var peg$c11 = "<";
  var peg$c12 = peg$literalExpectation("<", false);
  var peg$c13 = "T";
  var peg$c14 = peg$literalExpectation("T", false);
  var peg$c15 = ">";
  var peg$c16 = peg$literalExpectation(">", false);

  var peg$c17 = function peg$c17(ccgCat, head, dtrs) {
    return {
      type: "T",
      ccgCat: ccgCat,
      head: head,
      dtrs: dtrs
    };
  };

  var peg$c18 = "0";
  var peg$c19 = peg$literalExpectation("0", false);
  var peg$c20 = "1";
  var peg$c21 = peg$literalExpectation("1", false);

  var peg$c22 = function peg$c22() {
    return _int(text());
  };

  var peg$c23 = "2";
  var peg$c24 = peg$literalExpectation("2", false);
  var peg$c25 = "L";
  var peg$c26 = peg$literalExpectation("L", false);

  var peg$c27 = function peg$c27(ccgCat, modPOSTag, origPOSTag, word, predArgCat) {
    return {
      type: "L",
      ccgCat: ccgCat,
      modPOSTag: modPOSTag,
      origPOSTag: origPOSTag,
      word: word,
      predArgCat: predArgCat
    };
  };

  var peg$c28 = "/";
  var peg$c29 = peg$literalExpectation("/", false);
  var peg$c30 = "\\";
  var peg$c31 = peg$literalExpectation("\\", false);

  var peg$c32 = function peg$c32() {
    return text();
  };

  var peg$c33 = /^[A-Za-z]/;
  var peg$c34 = peg$classExpectation([["A", "Z"], ["a", "z"]], false, false);
  var peg$c35 = "[";
  var peg$c36 = peg$literalExpectation("[", false);
  var peg$c37 = /^[A-Za-z,]/;
  var peg$c38 = peg$classExpectation([["A", "Z"], ["a", "z"], ","], false, false);
  var peg$c39 = "]";
  var peg$c40 = peg$literalExpectation("]", false);
  var peg$c41 = /^[A-Z]/;
  var peg$c42 = peg$classExpectation([["A", "Z"]], false, false);
  var peg$c43 = /^[A-Za-z0-9]/;
  var peg$c44 = peg$classExpectation([["A", "Z"], ["a", "z"], ["0", "9"]], false, false);
  var peg$c45 = peg$otherExpectation("whitespace");
  var peg$c46 = /^[ \t\n\r]/;
  var peg$c47 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);
  var peg$c48 = peg$otherExpectation("whitespaces");
  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{
    line: 1,
    column: 1
  }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;
  var peg$resultsCache = {};
  var peg$result;

  if (options.startRule !== undefined) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function peg$literalExpectation(text1, ignoreCase) {
    return {
      type: "literal",
      text: text1,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$otherExpectation(description) {
    return {
      type: "other",
      description: description
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    return {
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected1) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected1);
  }

  function peg$buildStructuredError(expected1, found, location1) {
    return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
  }

  function peg$parseStart() {
    var s0;
    var key = peg$currPos * 15 + 0;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$parseTree();
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseTree() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
    var key = peg$currPos * 15 + 1;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c0;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c1);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parseNodeT();

        if (s3 !== peg$FAILED) {
          s4 = peg$parseTree();

          if (s4 !== peg$FAILED) {
            s5 = peg$parseTree();

            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 41) {
                s6 = peg$c2;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c3);
                }
              }

              if (s6 !== peg$FAILED) {
                s7 = peg$parse__();

                if (s7 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c4(s3, s4, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse__();

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c0;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseNodeT();

          if (s3 !== peg$FAILED) {
            s4 = peg$parseTree();

            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s5 = peg$c0;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parseNodeL();

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s7 = peg$c2;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c3);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse__();

                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s9 = peg$c2;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c3);
                        }
                      }

                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse__();

                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c5(s3, s4, s6);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse__();

        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }

          if (s2 !== peg$FAILED) {
            s3 = peg$parseNodeT();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s4 = peg$c0;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parseNodeL();

                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c2;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c3);
                    }
                  }

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseTree();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c2;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c3);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse__();

                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c6(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse__();

          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 40) {
              s2 = peg$c0;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c1);
              }
            }

            if (s2 !== peg$FAILED) {
              s3 = peg$parseNodeT();

              if (s3 !== peg$FAILED) {
                s4 = peg$parseTree();

                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s5 = peg$c2;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c3);
                    }
                  }

                  if (s5 !== peg$FAILED) {
                    s6 = peg$parse__();

                    if (s6 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s4);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse__();

            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s2 = peg$c0;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }

              if (s2 !== peg$FAILED) {
                s3 = peg$parseNodeT();

                if (s3 !== peg$FAILED) {
                  s4 = peg$parseNode();

                  if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s5 = peg$c2;
                      peg$currPos++;
                    } else {
                      s5 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c3);
                      }
                    }

                    if (s5 !== peg$FAILED) {
                      s6 = peg$parse__();

                      if (s6 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c8(s3, s4);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseNode() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
    var key = peg$currPos * 15 + 2;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 40) {
        s2 = peg$c0;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c1);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parseNodeL();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 41) {
            s4 = peg$c2;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c3);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse__();

            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 40) {
                s6 = peg$c0;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c1);
                }
              }

              if (s6 !== peg$FAILED) {
                s7 = peg$parseNodeL();

                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s8 = peg$c2;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c3);
                    }
                  }

                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse__();

                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c9(s3, s7);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse__();

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c0;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseNodeL();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c2;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c3);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse__();

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c10(s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseNodeT() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
    var key = peg$currPos * 15 + 3;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 60) {
        s2 = peg$c11;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parse__();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 84) {
            s4 = peg$c13;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c14);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s6 = peg$parseCCGCat();

              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();

                if (s7 !== peg$FAILED) {
                  s8 = peg$parseHead();

                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseDtrs();

                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse__();

                        if (s11 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 62) {
                            s12 = peg$c15;
                            peg$currPos++;
                          } else {
                            s12 = peg$FAILED;

                            if (peg$silentFails === 0) {
                              peg$fail(peg$c16);
                            }
                          }

                          if (s12 !== peg$FAILED) {
                            s13 = peg$parse__();

                            if (s13 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c17(s6, s8, s10);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseHead() {
    var s0, s1;
    var key = peg$currPos * 15 + 4;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 48) {
      s1 = peg$c18;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c19);
      }
    }

    if (s1 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 49) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c21);
        }
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c22();
    }

    s0 = s1;
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseDtrs() {
    var s0, s1;
    var key = peg$currPos * 15 + 5;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 48) {
      s1 = peg$c18;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c19);
      }
    }

    if (s1 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 49) {
        s1 = peg$c20;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c21);
        }
      }

      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 50) {
          s1 = peg$c23;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c22();
    }

    s0 = s1;
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseNodeL() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17;
    var key = peg$currPos * 15 + 6;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$parse__();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 60) {
        s2 = peg$c11;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parse__();

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 76) {
            s4 = peg$c25;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s6 = peg$parseCCGCat();

              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();

                if (s7 !== peg$FAILED) {
                  s8 = peg$parsePOSTag();

                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();

                    if (s9 !== peg$FAILED) {
                      s10 = peg$parsePOSTag();

                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse_();

                        if (s11 !== peg$FAILED) {
                          s12 = peg$parseWord();

                          if (s12 !== peg$FAILED) {
                            s13 = peg$parse_();

                            if (s13 !== peg$FAILED) {
                              s14 = peg$parseCCGCat();

                              if (s14 !== peg$FAILED) {
                                s15 = peg$parse__();

                                if (s15 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 62) {
                                    s16 = peg$c15;
                                    peg$currPos++;
                                  } else {
                                    s16 = peg$FAILED;

                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c16);
                                    }
                                  }

                                  if (s16 !== peg$FAILED) {
                                    s17 = peg$parse__();

                                    if (s17 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c27(s6, s8, s10, s12, s14);
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseCCGCat() {
    var s0, s1, s2, s3, s4, s5;
    var key = peg$currPos * 15 + 7;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c1);
      }
    }

    if (s2 !== peg$FAILED) {
      s3 = peg$parseCCGCat();

      if (s3 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 41) {
          s4 = peg$c2;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseRightCat();

          if (s5 !== peg$FAILED) {
            s2 = [s2, s3, s4, s5];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 === peg$FAILED) {
      s1 = peg$currPos;
      s2 = peg$parseLeftCat();

      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s3 = peg$c0;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = peg$parseCCGCat();

          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s5 = peg$c2;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c3);
              }
            }

            if (s5 !== peg$FAILED) {
              s2 = [s2, s3, s4, s5];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 === peg$FAILED) {
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c0;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parseCCGCat();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c2;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c3);
              }
            }

            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parseSingleCat();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s3 = peg$c28;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parseSingleCat();

              if (s4 !== peg$FAILED) {
                s2 = [s2, s3, s4];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }

          if (s1 === peg$FAILED) {
            s1 = peg$currPos;
            s2 = peg$parseSingleCat();

            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 92) {
                s3 = peg$c30;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c31);
                }
              }

              if (s3 !== peg$FAILED) {
                s4 = peg$parseSingleCat();

                if (s4 !== peg$FAILED) {
                  s2 = [s2, s3, s4];
                  s1 = s2;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }

            if (s1 === peg$FAILED) {
              s1 = peg$parseSingleCat();
            }
          }
        }
      }
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c32();
    }

    s0 = s1;
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseLeftCat() {
    var s0, s1, s2;
    var key = peg$currPos * 15 + 8;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = peg$parseSingleCat();

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 47) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseSingleCat();

      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 92) {
          s2 = peg$c30;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c31);
          }
        }

        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseRightCat() {
    var s0, s1, s2;
    var key = peg$currPos * 15 + 9;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;

    if (input.charCodeAt(peg$currPos) === 47) {
      s1 = peg$c28;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c29);
      }
    }

    if (s1 !== peg$FAILED) {
      s2 = peg$parseSingleCat();

      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 92) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parseSingleCat();

        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseSingleCat() {
    var s0, s1, s2, s3, s4;
    var key = peg$currPos * 15 + 10;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = [];

    if (peg$c33.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c34);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c33.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c34);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 91) {
        s2 = peg$c35;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c36);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = [];

        if (peg$c37.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        if (s4 !== peg$FAILED) {
          while (s4 !== peg$FAILED) {
            s3.push(s4);

            if (peg$c37.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c38);
              }
            }
          }
        } else {
          s3 = peg$FAILED;
        }

        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s4 = peg$c39;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c40);
            }
          }

          if (s4 !== peg$FAILED) {
            s1 = [s1, s2, s3, s4];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = [];

      if (peg$c33.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c34);
        }
      }

      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);

          if (peg$c33.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c34);
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parsePOSTag() {
    var s0, s1, s2;
    var key = peg$currPos * 15 + 11;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = [];

    if (peg$c41.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c42);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c32();
    }

    s0 = s1;
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parseWord() {
    var s0, s1, s2;
    var key = peg$currPos * 15 + 12;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    s0 = peg$currPos;
    s1 = [];

    if (peg$c43.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c44);
      }
    }

    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);

        if (peg$c43.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c32();
    }

    s0 = s1;
    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parse_() {
    var s0, s1;
    var key = peg$currPos * 15 + 13;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    peg$silentFails++;
    s0 = [];

    if (peg$c46.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c47);
      }
    }

    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);

        if (peg$c46.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c47);
          }
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c45);
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function peg$parse__() {
    var s0, s1;
    var key = peg$currPos * 15 + 14;
    var cached = peg$resultsCache[key];

    if (cached) {
      peg$currPos = cached.nextPos;
      return cached.result;
    }

    peg$silentFails++;
    s0 = [];

    if (peg$c46.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c47);
      }
    }

    while (s1 !== peg$FAILED) {
      s0.push(s1);

      if (peg$c46.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c47);
        }
      }
    }

    peg$silentFails--;

    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;

      if (peg$silentFails === 0) {
        peg$fail(peg$c48);
      }
    }

    peg$resultsCache[key] = {
      nextPos: peg$currPos,
      result: s0
    };
    return s0;
  }

  function _int(x) {
    return parseInt(x, 10);
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
  }
}

var parse = peg$parse;

var DependencyHead;

(function (DependencyHead) {
  DependencyHead[DependencyHead["Left"] = 0] = "Left";
  DependencyHead[DependencyHead["Right"] = 1] = "Right";
})(DependencyHead || (DependencyHead = {}));

var Reader = /*#__PURE__*/function () {
  function Reader(str) {
    if (str === void 0) {
      str = '';
    }

    this.isSucceed = false;
    this.original = str;
  }

  var _proto = Reader.prototype;

  _proto.read = function read() {
    var obj;

    try {
      obj = parse(this.original);
    } catch (_unused) {
      return false;
    }

    this.result = obj;
    this.isSucceed = true;
    return obj;
  };

  return Reader;
}();

var ReaderTypes = {
  __proto__: null,
  get DependencyHead () { return DependencyHead; },
  'default': Reader
};

var Tree = /*#__PURE__*/function () {
  function Tree(str) {
    if (str === void 0) {
      str = '';
    }

    if (str.length > 0) {
      this.metadata = {
        isParsed: false,
        sentence: '',
        words: [],
        ccgCats: [],
        height: 0,
        nodes: []
      };
      this.constructTree(str);
    }
  }

  var _proto = Tree.prototype;

  _proto.traverse = function traverse(fn) {
    return fn(this.root);
  };

  _proto.toString = function toString(opts) {
    if (this.root) {
      this.stringBuilder = '';
      this.toStringUtil(this.root, 0, opts);
      return this.stringBuilder.substring(1);
    }

    return '';
  };

  _proto.buildDerivations = function buildDerivations() {
    if (!this.root) {
      return [];
    }

    this.metadata.derivations = [];

    for (var i = 0; i < this.metadata.height; i++) {
      this.metadata.derivations.push([]);
    }

    this.buildDerivUtil(this.root);
    return this.metadata.derivations;
  };

  _proto.constructTree = function constructTree(str) {
    var reader = new Reader(str);

    if (reader.read()) {
      var result = reader.result;
      this.buildTree(result);
      this.metadata.isParsed = true;
    }
  };

  _proto.buildTree = function buildTree(obj) {
    this.buildTreeUtil(obj, 1);
  };

  _proto.buildTreeUtil = function buildTreeUtil(obj, level, parent, dir) {
    var _this$metadata, _this$metadata2, _this$metadata4;

    var node = {
      value: obj.node
    };

    if (this.root === undefined) {
      this.mappedIndexedWords = {};
      this.root = node;
    }

    var nIndex = (_this$metadata = this.metadata) == null ? void 0 : _this$metadata.nodes.length;
    node.value.nIndex = nIndex;
    (_this$metadata2 = this.metadata) == null ? void 0 : _this$metadata2.nodes.push(node);

    if (this.isNodeL(node)) {
      var _this$metadata3;

      var nodeL = node.value;
      var wIndex = this.metadata.words.length;
      nodeL.wIndex = wIndex;
      this.metadata.words.push(nodeL.word);
      this.metadata.ccgCats.push(nodeL.ccgCat);
      this.mappedIndexedWords[wIndex] = node;

      if (((_this$metadata3 = this.metadata) == null ? void 0 : _this$metadata3.sentence) === '') {
        this.metadata.sentence = nodeL.word;
      } else {
        this.metadata.sentence += " " + nodeL.word;
      }
    }

    this.metadata.height = Math.max((_this$metadata4 = this.metadata) == null ? void 0 : _this$metadata4.height, level);

    if (dir === 'left') {
      parent.left = node;
    }

    if (dir === 'right') {
      parent.right = node;
    }

    obj.left && this.buildTreeUtil(obj.left, level + 1, node, 'left');
    obj.right && this.buildTreeUtil(obj.right, level + 1, node, 'right');
  };

  _proto.toStringUtil = function toStringUtil(node, level, opts) {
    if (opts == null ? void 0 : opts.pretty) {
      var indents = 2 * level;
      this.stringBuilder += '\n' + ' '.repeat(indents) + '(';
    } else {
      this.stringBuilder += ' (';
    }

    if (this.isNodeT(node)) {
      var n = node.value;
      this.stringBuilder += ['<T', "" + n.ccgCat, "" + n.head, n.dtrs + ">"].join(' ');
    } else if (this.isNodeL(node)) {
      var _n = node.value;
      this.stringBuilder += ['<L', "" + _n.ccgCat, "" + _n.modPOSTag, "" + _n.origPOSTag, "" + _n.word, _n.predArgCat + ">"].join(' ');
    } else {
      this.stringBuilder += '<ill-formed CCG Node>';
    }

    node.left && this.toStringUtil(node.left, level + 1, opts);
    node.right && this.toStringUtil(node.right, level + 1, opts);
    this.stringBuilder += ')';
  };

  _proto.isNodeT = function isNodeT(node) {
    return node.value.head !== undefined;
  };

  _proto.isNodeL = function isNodeL(node) {
    return node.value.word !== undefined;
  };

  _proto.buildDerivUtil = function buildDerivUtil(node, dir) {
    var _derivRight$, _derivRight$2;

    if (this.isNodeL(node)) {
      var nodeL = node.value;
      var index = nodeL.wIndex;
      var _derivation = {
        from: index,
        to: index,
        ccgCat: nodeL.ccgCat
      };
      this.metadata.derivations[0].push(_derivation);

      if (dir === 'left') {
        return [index, -1, 1];
      }

      return [-1, index, 1];
    }

    var derivLeft = this.buildDerivUtil(node.left, 'left');
    var derivRight = [null, null, null];

    if (node.right) {
      derivRight = this.buildDerivUtil(node.right, 'right');
    }

    var derivation = {
      from: derivLeft[0],
      to: (_derivRight$ = derivRight[1]) != null ? _derivRight$ : derivLeft[0],
      ccgCat: node.value.ccgCat,
      opr: node.value.head !== 0 ? '<' : '>'
    };
    var bottom = Math.max(derivLeft[2], (_derivRight$2 = derivRight[2]) != null ? _derivRight$2 : -1);
    this.metadata.derivations[bottom].push(derivation);
    return [derivation.from, derivation.to, bottom + 1];
  };

  return Tree;
}();

var TreeTypes = {
  __proto__: null,
  'default': Tree
};

var DOM = /*#__PURE__*/function () {
  function DOM(tree) {
    var _this$tree;

    if (typeof tree === 'string') {
      if (tree.length > 0) {
        this.tree = new Tree(tree);
      }
    } else {
      this.tree = tree;
    }

    (_this$tree = this.tree) == null ? void 0 : _this$tree.buildDerivations();
  }

  var _proto = DOM.prototype;

  _proto.create = function create(fn) {
    if (fn) {
      return fn(this.tree);
    }

    return this.createTable();
  };

  _proto.createTable = function createTable() {
    var _this$tree2,
        _this$tree2$metadata,
        _this$tree3,
        _this$tree3$metadata,
        _this$tree3$metadata$,
        _this = this;

    var table = document.createElement('table');
    table.className = 'ccgjs';
    this.domBuilder = table;
    var lastTo;
    var hrTr;
    var numOfWords = this.tree.metadata.words.length;
    var wordTr = document.createElement('tr');
    (_this$tree2 = this.tree) == null ? void 0 : (_this$tree2$metadata = _this$tree2.metadata) == null ? void 0 : _this$tree2$metadata.words.forEach(function (word) {
      var wordTd = document.createElement('td');
      var text = document.createTextNode(word);
      wordTd.appendChild(text);
      wordTr.appendChild(wordTd);
      var oprTd = document.createElement('td');
      oprTd.className = 'ccgjs-operation';
      wordTr.appendChild(oprTd);
    });
    wordTr.className = 'ccgjs-words';
    this.domBuilder.appendChild(wordTr);
    (_this$tree3 = this.tree) == null ? void 0 : (_this$tree3$metadata = _this$tree3.metadata) == null ? void 0 : (_this$tree3$metadata$ = _this$tree3$metadata.derivations) == null ? void 0 : _this$tree3$metadata$.forEach(function (row) {
      var _this$domBuilder, _this$domBuilder2;

      var derivTr = document.createElement('tr');
      derivTr.className = 'ccgjs-derivation';
      lastTo = 0;
      hrTr = document.createElement('tr');
      hrTr.className = 'ccgjs-ruler';
      row.forEach(function (deriv) {
        var _deriv$opr;

        var from = deriv.from,
            to = deriv.to;
        var diff = from - lastTo;

        if (diff > 1) {
          var _derivTd = document.createElement('td');

          _derivTd.colSpan = diff * 2;
          derivTr.appendChild(_derivTd);

          var _hrTd = document.createElement('td');

          _hrTd.colSpan = diff * 2;
          hrTr.appendChild(_hrTd);
        }

        var derivTd = document.createElement('td');
        var text = document.createTextNode(deriv.ccgCat);
        derivTd.appendChild(text);
        var hr = document.createElement('hr');
        var hrTd = document.createElement('td');
        hrTd.appendChild(hr);
        var oprTd = document.createElement('td');
        oprTd.className = 'ccgjs-operation';
        var opr = document.createTextNode((_deriv$opr = deriv.opr) != null ? _deriv$opr : '');
        oprTd.appendChild(opr);
        var fakeOpr = document.createElement('td');
        fakeOpr.className = 'ccgjs-operation';

        if (to - from > 0) {
          var diffM = (to - from + 1) * 2 - 1;
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
        var diff = (numOfWords - (lastTo + 1)) * 2;
        var derivTd = document.createElement('td');
        derivTd.colSpan = diff;
        derivTr.appendChild(derivTd);
        var hrTd = document.createElement('td');
        hrTd.colSpan = diff;
        hrTr.appendChild(hrTd);
      }

      (_this$domBuilder = _this.domBuilder) == null ? void 0 : _this$domBuilder.appendChild(hrTr);
      (_this$domBuilder2 = _this.domBuilder) == null ? void 0 : _this$domBuilder2.appendChild(derivTr);
    });
    return this.domBuilder;
  };

  return DOM;
}();

var CCG = {
  DOM: DOM,
  Reader: Reader,
  ReaderTypes: ReaderTypes,
  Tree: Tree,
  TreeTypes: TreeTypes
};

exports.CCG = CCG;
exports.default = CCG;
//# sourceMappingURL=ccgjs.cjs.development.js.map
