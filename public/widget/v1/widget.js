var Xc = Object.create, bB = Object.defineProperty, Jc = Object.getOwnPropertyDescriptor, Wc = Object.getOwnPropertyNames, Yc = Object.getPrototypeOf, KB = Object.prototype.hasOwnProperty, Zc = (B, a) => () => (a || (B((a = { exports: {} }).exports, a), B = null), a.exports), qc = (B, a, c, u) => {
  if (a && typeof a == "object" || typeof a == "function")
    for (var U = Wc(a), w = 0, F = U.length, p; w < F; w++)
      p = U[w], !KB.call(B, p) && p !== c && bB(B, p, {
        get: ((v) => a[v]).bind(null, p),
        enumerable: !(u = Jc(a, p)) || u.enumerable
      });
  return B;
}, jc = (B, a, c) => (c = B != null ? Xc(Yc(B)) : {}, qc(a || !B || !B.__esModule || !KB.call(B, "default") ? bB(c, "default", {
  value: B,
  enumerable: !0
}) : c, B)), lr, $, LB, zc, le, cB, _B, DB, on, tr, Bt, SB, wn, un, gn, $c, Br = {}, ir = [], Au = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, cr = Array.isArray;
function zA(B, a) {
  for (var c in a) B[c] = a[c];
  return B;
}
function Cn(B) {
  B && B.parentNode && B.parentNode.removeChild(B);
}
function TB(B, a, c) {
  var u, U, w, F = {};
  for (w in a) w == "key" ? u = a[w] : w == "ref" ? U = a[w] : F[w] = a[w];
  if (arguments.length > 2 && (F.children = arguments.length > 3 ? lr.call(arguments, 2) : c), typeof B == "function" && B.defaultProps != null) for (w in B.defaultProps) F[w] === void 0 && (F[w] = B.defaultProps[w]);
  return rr(B, F, u, U, null);
}
function rr(B, a, c, u, U) {
  var w = {
    type: B,
    props: a,
    key: c,
    ref: u,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: void 0,
    __v: U == null ? ++LB : U,
    __i: -1,
    __u: 0
  };
  return U == null && $.vnode != null && $.vnode(w), w;
}
function ur(B) {
  return B.children;
}
function nr(B, a) {
  this.props = B, this.context = a;
}
function Fe(B, a) {
  if (a == null) return B.__ ? Fe(B.__, B.__i + 1) : null;
  for (var c; a < B.__k.length; a++) if ((c = B.__k[a]) != null && c.__e != null) return c.__e;
  return typeof B.type == "function" ? Fe(B) : null;
}
function eu(B) {
  if (B.__P && B.__d) {
    var a = B.__v, c = a.__e, u = [], U = [], w = zA({}, a);
    w.__v = a.__v + 1, $.vnode && $.vnode(w), fn(B.__P, w, a, B.__n, B.__P.namespaceURI, 32 & a.__u ? [c] : null, u, c == null ? Fe(a) : c, !!(32 & a.__u), U), w.__v = a.__v, w.__.__k[w.__i] = w, RB(u, w, U), a.__e = a.__ = null, w.__e != c && OB(w);
  }
}
function OB(B) {
  if ((B = B.__) != null && B.__c != null) return B.__e = B.__c.base = null, B.__k.some(function(a) {
    if (a != null && a.__e != null) return B.__e = B.__c.base = a.__e;
  }), OB(B);
}
function uB(B) {
  (!B.__d && (B.__d = !0) && le.push(B) && !ar.__r++ || cB != $.debounceRendering) && ((cB = $.debounceRendering) || _B)(ar);
}
function ar() {
  try {
    for (var B, a = 1; le.length; ) le.length > a && le.sort(DB), B = le.shift(), a = le.length, eu(B);
  } finally {
    le.length = ar.__r = 0;
  }
}
function NB(B, a, c, u, U, w, F, p, v, d, _) {
  var N, C, I, M, J, Z, W = u && u.__k || ir, x = a.length;
  for (v = tu(c, a, W, v, x), N = 0; N < x; N++) (I = c.__k[N]) != null && (C = I.__i != -1 && W[I.__i] || Br, I.__i = N, Z = fn(B, I, C, U, w, F, p, v, d, _), M = I.__e, I.ref && C.ref != I.ref && (C.ref && Un(C.ref, null, I), _.push(I.ref, I.__c || M, I)), J == null && M != null && (J = M), 4 & I.__u ? (v = MB(I, v, B), C.__e && (C.__e = null)) : typeof I.type == "function" && Z !== void 0 ? v = Z : M && (v = M.nextSibling), I.__u &= -7);
  return c.__e = J, v;
}
function tu(B, a, c, u, U) {
  var w, F, p, v, d, _ = c.length, N = _, C = 0;
  for (B.__k = new Array(U), w = 0; w < U; w++) (F = a[w]) != null && typeof F != "boolean" && typeof F != "function" ? (typeof F == "string" || typeof F == "number" || typeof F == "bigint" || F.constructor == String ? F = B.__k[w] = rr(null, F, null, null, null) : cr(F) ? F = B.__k[w] = rr(ur, { children: F }, null, null, null) : F.constructor === void 0 && F.__b > 0 ? F = B.__k[w] = rr(F.type, F.props, F.key, F.ref ? F.ref : null, F.__v) : B.__k[w] = F, v = w + C, F.__ = B, F.__b = B.__b + 1, p = null, (d = F.__i = ru(F, c, v, N)) != -1 && (N--, (p = c[d]) && (p.__u |= 2)), p == null || p.__v == null ? (d == -1 && (U > _ ? C-- : U < _ && C++), typeof F.type != "function" && (F.__u |= 4)) : d != v && (d == v - 1 ? C-- : d == v + 1 ? C++ : (d > v ? C-- : C++, F.__u |= 4))) : B.__k[w] = null;
  if (N) for (w = 0; w < _; w++) (p = c[w]) != null && (2 & p.__u) == 0 && (p.__e == u && (u = Fe(p)), VB(p, p));
  return u;
}
function MB(B, a, c) {
  var u, U;
  if (typeof B.type == "function") {
    for (u = B.__k, U = 0; u && U < u.length; U++) u[U] && (u[U].__ = B, a = MB(u[U], a, c));
    return a;
  }
  B.__e != a && (a && B.type && !a.parentNode && (a = Fe(B)), a = c.insertBefore(B.__e, a || null));
  do
    a = a && a.nextSibling;
  while (a != null && a.nodeType == 8);
  return a;
}
function ru(B, a, c, u) {
  var U, w, F, p = B.key, v = B.type, d = a[c], _ = d != null && (2 & d.__u) == 0;
  if (d === null && p == null || _ && p == d.key && v == d.type) return c;
  if (u > (_ ? 1 : 0)) {
    for (U = c - 1, w = c + 1; U >= 0 || w < a.length; ) if ((d = a[F = U >= 0 ? U-- : w++]) != null && (2 & d.__u) == 0 && p == d.key && v == d.type) return F;
  }
  return -1;
}
function gB(B, a, c) {
  a[0] == "-" ? B.setProperty(a, c == null ? "" : c) : B[a] = c == null ? "" : typeof c != "number" || Au.test(a) ? c : c + "px";
}
function er(B, a, c, u, U) {
  var w, F;
  A: if (a == "style") if (typeof c == "string") B.style.cssText = c;
  else {
    if (typeof u == "string" && (B.style.cssText = u = ""), u) for (a in u) c && a in c || gB(B.style, a, "");
    if (c) for (a in c) u && c[a] == u[a] || gB(B.style, a, c[a]);
  }
  else if (a[0] == "o" && a[1] == "n") w = a != (a = a.replace(SB, "$1")), F = a.toLowerCase(), a = F in B || a == "onFocusOut" || a == "onFocusIn" ? F.slice(2) : a.slice(2), B.l || (B.l = {}), B.l[a + w] = c, c ? u ? c[Bt] = u[Bt] : (c[Bt] = wn, B.addEventListener(a, w ? gn : un, w)) : B.removeEventListener(a, w ? gn : un, w);
  else {
    if (U == "http://www.w3.org/2000/svg") a = a.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (a != "width" && a != "height" && a != "href" && a != "list" && a != "form" && a != "tabIndex" && a != "download" && a != "rowSpan" && a != "colSpan" && a != "role" && a != "popover" && a in B) try {
      B[a] = c == null ? "" : c;
      break A;
    } catch {
    }
    typeof c == "function" || (c == null || c === !1 && a[4] != "-" ? B.removeAttribute(a) : B.setAttribute(a, a == "popover" && c == 1 ? "" : c));
  }
}
function QB(B) {
  return function(a) {
    if (this.l) {
      var c = this.l[a.type + B];
      if (a[tr] == null) a[tr] = wn++;
      else if (a[tr] < c[Bt]) return;
      return c($.event ? $.event(a) : a);
    }
  };
}
function fn(B, a, c, u, U, w, F, p, v, d) {
  var _, N, C, I, M, J, Z, W, x, UA, MA, yA, wA, xA, vA, ce, CA = a.type;
  if (a.constructor !== void 0) return null;
  128 & c.__u && (v = !!(32 & c.__u), w = [p = a.__e = c.__e]), (_ = $.__b) && _(a);
  A: if (typeof CA == "function") {
    N = F.length;
    try {
      if (x = a.props, UA = CA.prototype && CA.prototype.render, MA = (_ = CA.contextType) && u[_.__c], yA = _ ? MA ? MA.props.value : _.__ : u, c.__c ? W = (C = a.__c = c.__c).__ = C.__E : (UA ? a.__c = C = new CA(x, yA) : (a.__c = C = new nr(x, yA), C.constructor = CA, C.render = su), MA && MA.sub(C), C.state || (C.state = {}), C.__n = u, I = C.__d = !0, C.__h = [], C._sb = []), UA && C.__s == null && (C.__s = C.state), UA && CA.getDerivedStateFromProps != null && (C.__s == C.state && (C.__s = zA({}, C.__s)), zA(C.__s, CA.getDerivedStateFromProps(x, C.__s))), M = C.props, J = C.state, C.__v = a, I) UA && CA.getDerivedStateFromProps == null && C.componentWillMount != null && C.componentWillMount(), UA && C.componentDidMount != null && C.__h.push(C.componentDidMount);
      else {
        if (UA && CA.getDerivedStateFromProps == null && x !== M && C.componentWillReceiveProps != null && C.componentWillReceiveProps(x, yA), a.__v == c.__v || !C.__e && C.shouldComponentUpdate != null && C.shouldComponentUpdate(x, C.__s, yA) === !1) {
          a.__v != c.__v && (C.props = x, C.state = C.__s, C.__d = !1), a.__e = c.__e, a.__k = c.__k, a.__k.some(function(hA) {
            hA && (hA.__ = a);
          }), ir.push.apply(C.__h, C._sb), C._sb = [], C.__h.length && F.push(C), p = Fe(c);
          break A;
        }
        C.componentWillUpdate != null && C.componentWillUpdate(x, C.__s, yA), UA && C.componentDidUpdate != null && C.__h.push(function() {
          C.componentDidUpdate(M, J, Z);
        });
      }
      if (C.context = yA, C.props = x, C.__P = B, C.__e = !1, wA = $.__r, xA = 0, UA) C.state = C.__s, C.__d = !1, wA && wA(a), _ = C.render(C.props, C.state, C.context), ir.push.apply(C.__h, C._sb), C._sb = [];
      else do
        C.__d = !1, wA && wA(a), _ = C.render(C.props, C.state, C.context), C.state = C.__s;
      while (C.__d && ++xA < 25);
      C.state = C.__s, C.getChildContext != null && (u = zA(zA({}, u), C.getChildContext())), UA && !I && C.getSnapshotBeforeUpdate != null && (Z = C.getSnapshotBeforeUpdate(M, J)), vA = _ != null && _.type === ur && _.key == null ? GB(_.props.children) : _, p = NB(B, cr(vA) ? vA : [vA], a, c, u, U, w, F, p, v, d), C.base = a.__e, a.__u &= -161, C.__h.length && F.push(C), W && (C.__E = C.__ = null);
    } catch (hA) {
      if (F.length = N, a.__v = null, v || w != null) {
        if (hA.then) {
          for (a.__u |= v ? 160 : 128; p && p.nodeType == 8 && p.nextSibling; ) p = p.nextSibling;
          w != null && (w[w.indexOf(p)] = null), a.__e = p;
        } else if (w != null) for (ce = w.length; ce--; ) Cn(w[ce]);
      } else a.__e = c.__e;
      a.__k == null && (a.__k = c.__k || []), hA.then || xB(a), $.__e(hA, a, c);
    }
  } else w == null && a.__v == c.__v ? (a.__k = c.__k, a.__e = c.__e) : p = a.__e = nu(c.__e, a, c, u, U, w, F, v, d);
  return (_ = $.diffed) && _(a), 128 & a.__u ? void 0 : p;
}
function xB(B) {
  B && (B.__c && (B.__c.__e = !0), B.__k && B.__k.some(xB));
}
function RB(B, a, c) {
  for (var u = 0; u < c.length; u++) Un(c[u], c[++u], c[++u]);
  $.__c && $.__c(a, B), B.some(function(U) {
    try {
      B = U.__h, U.__h = [], B.some(function(w) {
        w.call(U);
      });
    } catch (w) {
      $.__e(w, U.__v);
    }
  });
}
function GB(B) {
  return typeof B != "object" || B == null || B.__b > 0 ? B : cr(B) ? B.map(GB) : B.constructor !== void 0 ? null : zA({}, B);
}
function nu(B, a, c, u, U, w, F, p, v) {
  var d, _, N, C, I, M, J, Z = c.props || Br, W = a.props, x = a.type;
  if (x == "svg" ? U = "http://www.w3.org/2000/svg" : x == "math" ? U = "http://www.w3.org/1998/Math/MathML" : U || (U = "http://www.w3.org/1999/xhtml"), w != null) {
    for (d = 0; d < w.length; d++) if ((I = w[d]) && "setAttribute" in I == !!x && (x ? I.localName == x : I.nodeType == 3)) {
      B = I, w[d] = null;
      break;
    }
  }
  if (B == null) {
    if (x == null) return document.createTextNode(W);
    B = document.createElementNS(U, x, W.is && W), p && ($.__m && $.__m(a, w), p = !1), w = null;
  }
  if (x == null) Z === W || p && B.data == W || (B.data = W);
  else {
    if (w = x == "textarea" && W.defaultValue != null ? null : w && lr.call(B.childNodes), !p && w != null) for (Z = {}, d = 0; d < B.attributes.length; d++) Z[(I = B.attributes[d]).name] = I.value;
    for (d in Z) I = Z[d], d == "dangerouslySetInnerHTML" ? N = I : d == "children" || d in W || d == "value" && "defaultValue" in W || d == "checked" && "defaultChecked" in W || er(B, d, null, I, U);
    for (d in W) I = W[d], d == "children" ? C = I : d == "dangerouslySetInnerHTML" ? _ = I : d == "value" ? M = I : d == "checked" ? J = I : p && typeof I != "function" || Z[d] === I || er(B, d, I, Z[d], U);
    if (_) p || N && (_.__html == N.__html || _.__html == B.innerHTML) || (B.innerHTML = _.__html), a.__k = [];
    else if (N && (B.innerHTML = ""), NB(a.type == "template" ? B.content : B, cr(C) ? C : [C], a, c, u, x == "foreignObject" ? "http://www.w3.org/1999/xhtml" : U, w, F, w ? w[0] : c.__k && Fe(c, 0), p, v), w != null) for (d = w.length; d--; ) Cn(w[d]);
    p && x != "textarea" || (d = "value", x == "progress" && M == null ? B.removeAttribute("value") : M != null && (M !== B[d] || x == "progress" && !M || x == "option" && M != Z[d]) && er(B, d, M, Z[d], U), d = "checked", J != null && J != B[d] && er(B, d, J, Z[d], U));
  }
  return B;
}
function Un(B, a, c) {
  try {
    if (typeof B == "function") {
      var u = typeof B.__u == "function";
      u && B.__u(), u && a == null || (B.__u = B(a));
    } else B.current = a;
  } catch (U) {
    $.__e(U, c);
  }
}
function VB(B, a, c) {
  var u, U;
  if ($.unmount && $.unmount(B), (u = B.ref) && (u.current && u.current != B.__e || Un(u, null, a)), (u = B.__c) != null) {
    if (u.componentWillUnmount) try {
      u.componentWillUnmount();
    } catch (w) {
      $.__e(w, a);
    }
    u.base = u.__P = u.__n = null;
  }
  if (u = B.__k) for (U = 0; U < u.length; U++) u[U] && VB(u[U], a, c || typeof B.type != "function");
  c || Cn(B.__e), B.__c = B.__ = B.__e = void 0;
}
function su(B, a, c) {
  return this.constructor(B, c);
}
function Bu(B, a, c) {
  var u, U, w, F;
  a == document && (a = document.documentElement), $.__ && $.__(B, a), U = (u = typeof c == "function") ? null : c && c.__k || a.__k, w = [], F = [], fn(a, B = (!u && c || a).__k = TB(ur, null, [B]), U || Br, Br, a.namespaceURI, !u && c ? [c] : U ? null : a.firstChild ? lr.call(a.childNodes) : null, w, !u && c ? c : U ? U.__e : a.firstChild, u, F), RB(w, B, F), B.props.children = null;
}
lr = ir.slice, $ = { __e: function(B, a, c, u) {
  for (var U, w, F; a = a.__; ) if ((U = a.__c) && !U.__) try {
    if ((w = U.constructor) && w.getDerivedStateFromError != null && (U.setState(w.getDerivedStateFromError(B)), F = U.__d), U.componentDidCatch != null && (U.componentDidCatch(B, u || {}), F = U.__d), F) return U.__E = U;
  } catch (p) {
    B = p;
  }
  throw B;
} }, LB = 0, zc = function(B) {
  return B != null && B.constructor === void 0;
}, nr.prototype.setState = function(B, a) {
  var c = this.__s != null && this.__s != this.state ? this.__s : this.__s = zA({}, this.state);
  typeof B == "function" && (B = B(zA({}, c), this.props)), B && zA(c, B), B != null && this.__v && (a && this._sb.push(a), uB(this));
}, nr.prototype.forceUpdate = function(B) {
  this.__v && (this.__e = !0, B && this.__h.push(B), uB(this));
}, nr.prototype.render = ur, le = [], _B = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, DB = function(B, a) {
  return B.__v.__b - a.__v.__b;
}, ar.__r = 0, on = Math.random().toString(8), tr = "__d" + on, Bt = "__a" + on, SB = /(PointerCapture)$|Capture$/i, wn = 0, un = QB(!1), gn = QB(!0), $c = 0;
var at, sA, ln, wB, or = 0, kB = [], aA = $, CB = aA.__b, fB = aA.__r, UB = aA.diffed, hB = aA.__c, FB = aA.unmount, dB = aA.__;
function hn(B, a) {
  aA.__h && aA.__h(sA, B, or || a), or = 0;
  var c = sA.__H || (sA.__H = {
    __: [],
    __h: []
  });
  return B >= c.__.length && c.__.push({}), c.__[B];
}
function IA(B) {
  return or = 1, iu(XB, B);
}
function iu(B, a, c) {
  var u = hn(at++, 2);
  if (u.t = B, !u.__c && (u.__ = [c ? c(a) : XB(void 0, a), function(p) {
    var v = u.__N ? u.__N[0] : u.__[0], d = u.t(v, p);
    v !== d && (u.__N = [d, u.__[1]], u.__c.setState({}));
  }], u.__c = sA, !sA.__f)) {
    var U = function(p, v, d) {
      if (!u.__c.__H) return !0;
      var _ = !1, N = u.__c.props !== p;
      if (u.__c.__H.__.some(function(I) {
        if (I.__N) {
          _ = !0;
          var M = I.__[0];
          I.__ = I.__N, I.__N = void 0, M !== I.__[0] && (N = !0);
        }
      }), w) {
        var C = w.call(this, p, v, d);
        return _ ? C || N : C;
      }
      return !_ || N;
    };
    sA.__f = !0;
    var w = sA.shouldComponentUpdate, F = sA.componentWillUpdate;
    sA.componentWillUpdate = function(p, v, d) {
      if (this.__e) {
        var _ = w;
        w = void 0, U(p, v, d), w = _;
      }
      F && F.call(this, p, v, d);
    }, sA.shouldComponentUpdate = U;
  }
  return u.__N || u.__;
}
function pB(B, a) {
  var c = hn(at++, 3);
  !aA.__s && PB(c.__H, a) && (c.__ = B, c.u = a, sA.__H.__h.push(c));
}
function EB(B) {
  return or = 5, au(function() {
    return { current: B };
  }, []);
}
function au(B, a) {
  var c = hn(at++, 7);
  return PB(c.__H, a) && (c.__ = B(), c.__H = a, c.__h = B), c.__;
}
function ou() {
  for (var B; B = kB.shift(); ) {
    var a = B.__H;
    if (B.__P && a) try {
      a.__h.some(sr), a.__h.some(Qn), a.__h = [];
    } catch (c) {
      a.__h = [], aA.__e(c, B.__v);
    }
  }
}
aA.__b = function(B) {
  sA = null, CB && CB(B);
}, aA.__ = function(B, a) {
  B && a.__k && a.__k.__m && (B.__m = a.__k.__m), dB && dB(B, a);
}, aA.__r = function(B) {
  fB && fB(B), at = 0;
  var a = (sA = B.__c).__H;
  a && (ln === sA ? (a.__h = [], sA.__h = [], a.__.some(function(c) {
    c.__N && (c.__ = c.__N), c.u = c.__N = void 0;
  })) : (a.__h.some(sr), a.__h.some(Qn), a.__h = [], at = 0)), ln = sA;
}, aA.diffed = function(B) {
  UB && UB(B);
  var a = B.__c;
  a && a.__H && (a.__H.__h.length && (kB.push(a) !== 1 && wB === aA.requestAnimationFrame || ((wB = aA.requestAnimationFrame) || lu)(ou)), a.__H.__.some(function(c) {
    c.u && (c.__H = c.u, c.u = void 0);
  })), ln = sA = null;
}, aA.__c = function(B, a) {
  a.some(function(c) {
    try {
      c.__h.some(sr), c.__h = c.__h.filter(function(u) {
        return !u.__ || Qn(u);
      });
    } catch (u) {
      a.some(function(U) {
        U.__h && (U.__h = []);
      }), a = [], aA.__e(u, c.__v);
    }
  }), hB && hB(B, a);
}, aA.unmount = function(B) {
  FB && FB(B);
  var a, c = B.__c;
  c && c.__H && (c.__H.__.some(function(u) {
    try {
      sr(u);
    } catch (U) {
      a = U;
    }
  }), c.__H = void 0, a && aA.__e(a, c.__v));
};
var vB = typeof requestAnimationFrame == "function";
function lu(B) {
  var a, c = function() {
    clearTimeout(u), vB && cancelAnimationFrame(a), setTimeout(B);
  }, u = setTimeout(c, 35);
  vB && (a = requestAnimationFrame(c));
}
function sr(B) {
  var a = sA, c = B.__c;
  typeof c == "function" && (B.__c = void 0, c()), sA = a;
}
function Qn(B) {
  var a = sA;
  B.__c = B.__(), sA = a;
}
function PB(B, a) {
  return !B || B.length !== a.length || a.some(function(c, u) {
    return c !== B[u];
  });
}
function XB(B, a) {
  return typeof a == "function" ? a(B) : a;
}
async function cu(B, a) {
  const c = `${B.replace(/\/$/, "")}/api/public/widget/config?key=${encodeURIComponent(a)}`, u = await fetch(c, { headers: { Accept: "application/json" } });
  if (!u.ok) throw new Error(`Widget config request failed with status ${u.status}`);
  return (await u.json()).data;
}
function cn(B) {
  if (typeof B == "string") return B;
  if (B instanceof Error) return B.message;
  try {
    return JSON.stringify(B);
  } catch {
    return String(B);
  }
}
function uu(B, a) {
  var c, u;
  let U;
  typeof B == "string" ? U = B : B instanceof URL ? U = B.toString() : B instanceof Request ? U = B.url : U = String(B);
  const w = ((c = (u = a == null ? void 0 : a.method) !== null && u !== void 0 ? u : B instanceof Request ? B.method : "GET") !== null && c !== void 0 ? c : "GET").toUpperCase();
  return {
    url: U,
    method: w
  };
}
function gu() {
  const B = [], a = console.error, c = (...d) => {
    B.push({
      kind: "console",
      message: d.map(cn).join(" "),
      timestamp: Date.now()
    }), a.apply(console, d);
  }, u = (d) => {
    B.push({
      kind: "window",
      message: d.message,
      timestamp: Date.now(),
      detail: d.filename ? `${d.filename}:${d.lineno}` : void 0
    });
  }, U = (d) => {
    B.push({
      kind: "unhandledrejection",
      message: cn(d.reason),
      timestamp: Date.now()
    });
  }, w = window.fetch.bind(window), F = (d, _) => {
    const N = uu(d, _);
    return w(d, _).then((C) => (C.ok || B.push({
      kind: "network",
      message: `HTTP ${C.status} for ${N.method} ${N.url}`,
      timestamp: Date.now()
    }), C), (C) => {
      throw B.push({
        kind: "network",
        message: `Failed ${N.method} ${N.url}: ${cn(C)}`,
        timestamp: Date.now()
      }), C;
    });
  }, p = XMLHttpRequest.prototype.open, v = function(d, _, ...N) {
    const C = typeof _ == "string" ? _ : _.toString();
    (() => {
      const W = () => {
        this.readyState === 4 && this.status >= 400 && B.push({
          kind: "network",
          message: `XHR ${d.toUpperCase()} ${C} -> ${this.status}`,
          timestamp: Date.now()
        });
      };
      this.addEventListener("readystatechange", W);
    })();
    const M = N[0] === void 0 ? !0 : N[0], J = N[1], Z = N[2];
    return p.call(this, d, _, M, J, Z);
  };
  return console.error = c, window.fetch = F, XMLHttpRequest.prototype.open = v, window.addEventListener("error", u), window.addEventListener("unhandledrejection", U), {
    getErrors() {
      return B.slice();
    },
    stop() {
      console.error = a, window.fetch = w, XMLHttpRequest.prototype.open = p, window.removeEventListener("error", u), window.removeEventListener("unhandledrejection", U);
    }
  };
}
var Qu = /* @__PURE__ */ Zc(((B, a) => {
  (function(c, u) {
    typeof B == "object" && typeof a != "undefined" ? a.exports = u() : typeof define == "function" && define.amd ? define(u) : (c = typeof globalThis != "undefined" ? globalThis : c || self, c.html2canvas = u());
  })(B, (function() {
    "use strict";
    var c = function(e, A) {
      return c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, t) {
        r.__proto__ = t;
      } || function(r, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
      }, c(e, A);
    };
    function u(e, A) {
      if (typeof A != "function" && A !== null) throw new TypeError("Class extends value " + String(A) + " is not a constructor or null");
      c(e, A);
      function r() {
        this.constructor = e;
      }
      e.prototype = A === null ? Object.create(A) : (r.prototype = A.prototype, new r());
    }
    var U = function() {
      return U = Object.assign || function(A) {
        for (var r, t = 1, n = arguments.length; t < n; t++) {
          r = arguments[t];
          for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (A[s] = r[s]);
        }
        return A;
      }, U.apply(this, arguments);
    };
    function w(e, A, r, t) {
      function n(s) {
        return s instanceof r ? s : new r(function(i) {
          i(s);
        });
      }
      return new (r || (r = Promise))(function(s, i) {
        function o(Q) {
          try {
            g(t.next(Q));
          } catch (f) {
            i(f);
          }
        }
        function l(Q) {
          try {
            g(t.throw(Q));
          } catch (f) {
            i(f);
          }
        }
        function g(Q) {
          Q.done ? s(Q.value) : n(Q.value).then(o, l);
        }
        g((t = t.apply(e, A || [])).next());
      });
    }
    function F(e, A) {
      var r = {
        label: 0,
        sent: function() {
          if (s[0] & 1) throw s[1];
          return s[1];
        },
        trys: [],
        ops: []
      }, t, n, s, i;
      return i = {
        next: o(0),
        throw: o(1),
        return: o(2)
      }, typeof Symbol == "function" && (i[Symbol.iterator] = function() {
        return this;
      }), i;
      function o(g) {
        return function(Q) {
          return l([g, Q]);
        };
      }
      function l(g) {
        if (t) throw new TypeError("Generator is already executing.");
        for (; r; ) try {
          if (t = 1, n && (s = g[0] & 2 ? n.return : g[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, g[1])).done) return s;
          switch (n = 0, s && (g = [g[0] & 2, s.value]), g[0]) {
            case 0:
            case 1:
              s = g;
              break;
            case 4:
              return r.label++, {
                value: g[1],
                done: !1
              };
            case 5:
              r.label++, n = g[1], g = [0];
              continue;
            case 7:
              g = r.ops.pop(), r.trys.pop();
              continue;
            default:
              if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (g[0] === 6 || g[0] === 2)) {
                r = 0;
                continue;
              }
              if (g[0] === 3 && (!s || g[1] > s[0] && g[1] < s[3])) {
                r.label = g[1];
                break;
              }
              if (g[0] === 6 && r.label < s[1]) {
                r.label = s[1], s = g;
                break;
              }
              if (s && r.label < s[2]) {
                r.label = s[2], r.ops.push(g);
                break;
              }
              s[2] && r.ops.pop(), r.trys.pop();
              continue;
          }
          g = A.call(e, r);
        } catch (Q) {
          g = [6, Q], n = 0;
        } finally {
          t = s = 0;
        }
        if (g[0] & 5) throw g[1];
        return {
          value: g[0] ? g[1] : void 0,
          done: !0
        };
      }
    }
    function p(e, A, r) {
      if (r || arguments.length === 2)
        for (var t = 0, n = A.length, s; t < n; t++) (s || !(t in A)) && (s || (s = Array.prototype.slice.call(A, 0, t)), s[t] = A[t]);
      return e.concat(s || A);
    }
    for (var v = (function() {
      function e(A, r, t, n) {
        this.left = A, this.top = r, this.width = t, this.height = n;
      }
      return e.prototype.add = function(A, r, t, n) {
        return new e(this.left + A, this.top + r, this.width + t, this.height + n);
      }, e.fromClientRect = function(A, r) {
        return new e(r.left + A.windowBounds.left, r.top + A.windowBounds.top, r.width, r.height);
      }, e.fromDOMRectList = function(A, r) {
        var t = Array.from(r).find(function(n) {
          return n.width !== 0;
        });
        return t ? new e(t.left + A.windowBounds.left, t.top + A.windowBounds.top, t.width, t.height) : e.EMPTY;
      }, e.EMPTY = new e(0, 0, 0, 0), e;
    })(), d = function(e, A) {
      return v.fromClientRect(e, A.getBoundingClientRect());
    }, _ = function(e) {
      var A = e.body, r = e.documentElement;
      if (!A || !r) throw new Error("Unable to get document size");
      return new v(0, 0, Math.max(Math.max(A.scrollWidth, r.scrollWidth), Math.max(A.offsetWidth, r.offsetWidth), Math.max(A.clientWidth, r.clientWidth)), Math.max(Math.max(A.scrollHeight, r.scrollHeight), Math.max(A.offsetHeight, r.offsetHeight), Math.max(A.clientHeight, r.clientHeight)));
    }, N = function(e) {
      for (var A = [], r = 0, t = e.length; r < t; ) {
        var n = e.charCodeAt(r++);
        if (n >= 55296 && n <= 56319 && r < t) {
          var s = e.charCodeAt(r++);
          (s & 64512) === 56320 ? A.push(((n & 1023) << 10) + (s & 1023) + 65536) : (A.push(n), r--);
        } else A.push(n);
      }
      return A;
    }, C = function() {
      for (var e = [], A = 0; A < arguments.length; A++) e[A] = arguments[A];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, e);
      var r = e.length;
      if (!r) return "";
      for (var t = [], n = -1, s = ""; ++n < r; ) {
        var i = e[n];
        i <= 65535 ? t.push(i) : (i -= 65536, t.push((i >> 10) + 55296, i % 1024 + 56320)), (n + 1 === r || t.length > 16384) && (s += String.fromCharCode.apply(String, t), t.length = 0);
      }
      return s;
    }, I = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", M = typeof Uint8Array == "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256), J = 0; J < I.length; J++) M[I.charCodeAt(J)] = J;
    for (var Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", W = typeof Uint8Array == "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256), x = 0; x < Z.length; x++) W[Z.charCodeAt(x)] = x;
    for (var UA = function(e) {
      var A = e.length * 0.75, r = e.length, t, n = 0, s, i, o, l;
      e[e.length - 1] === "=" && (A--, e[e.length - 2] === "=" && A--);
      var g = typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined" && typeof Uint8Array.prototype.slice != "undefined" ? new ArrayBuffer(A) : new Array(A), Q = Array.isArray(g) ? g : new Uint8Array(g);
      for (t = 0; t < r; t += 4)
        s = W[e.charCodeAt(t)], i = W[e.charCodeAt(t + 1)], o = W[e.charCodeAt(t + 2)], l = W[e.charCodeAt(t + 3)], Q[n++] = s << 2 | i >> 4, Q[n++] = (i & 15) << 4 | o >> 2, Q[n++] = (o & 3) << 6 | l & 63;
      return g;
    }, MA = function(e) {
      for (var A = e.length, r = [], t = 0; t < A; t += 2) r.push(e[t + 1] << 8 | e[t]);
      return r;
    }, yA = function(e) {
      for (var A = e.length, r = [], t = 0; t < A; t += 4) r.push(e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]);
      return r;
    }, wA = 5, xA = 11, vA = 2, ce = xA - wA, CA = 65536 >> wA, hA = (1 << wA) - 1, lt = CA + (1024 >> wA) + 32, $A = 65536 >> xA, RA = (1 << ce) - 1, GA = function(e, A, r) {
      return e.slice ? e.slice(A, r) : new Uint16Array(Array.prototype.slice.call(e, A, r));
    }, ct = function(e, A, r) {
      return e.slice ? e.slice(A, r) : new Uint32Array(Array.prototype.slice.call(e, A, r));
    }, gr = function(e, A) {
      var r = UA(e), t = Array.isArray(r) ? yA(r) : new Uint32Array(r), n = Array.isArray(r) ? MA(r) : new Uint16Array(r), s = 24, i = GA(n, s / 2, t[4] / 2), o = t[5] === 2 ? GA(n, (s + t[4]) / 2) : ct(t, Math.ceil((s + t[4]) / 4));
      return new Qr(t[0], t[1], t[2], t[3], i, o);
    }, Qr = (function() {
      function e(A, r, t, n, s, i) {
        this.initialValue = A, this.errorValue = r, this.highStart = t, this.highValueIndex = n, this.index = s, this.data = i;
      }
      return e.prototype.get = function(A) {
        var r;
        if (A >= 0) {
          if (A < 55296 || A > 56319 && A <= 65535)
            return r = this.index[A >> wA], r = (r << vA) + (A & hA), this.data[r];
          if (A <= 65535)
            return r = this.index[CA + (A - 55296 >> wA)], r = (r << vA) + (A & hA), this.data[r];
          if (A < this.highStart)
            return r = lt - $A + (A >> xA), r = this.index[r], r += A >> wA & RA, r = this.index[r], r = (r << vA) + (A & hA), this.data[r];
          if (A <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, e;
    })(), ut = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", wr = typeof Uint8Array == "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256), P = 0; P < ut.length; P++) wr[ut.charCodeAt(P)] = P;
    var cA = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", bA = 50, KA = 1, OA = 2, Ne = 3, Me = 4, gt = 5, de = 7, pe = 8, LA = 9, VA = 10, Cr = 11, Fn = 12, fr = 13, YB = 14, xe = 15, Ur = 16, Qt = 17, Re = 18, ZB = 19, dn = 20, hr = 21, Ge = 22, Fr = 23, Ee = 24, HA = 25, Ve = 26, ke = 27, ve = 28, qB = 29, ue = 30, jB = 31, wt = 32, Ct = 33, dr = 34, pr = 35, Er = 36, Pe = 37, vr = 38, ft = 39, Ut = 40, Hr = 41, pn = 42, zB = 43, $B = [9001, 65288], En = "!", G = "×", ht = "÷", mr = gr(cA), WA = [ue, Er], Ir = [
      KA,
      OA,
      Ne,
      gt
    ], vn = [VA, pe], Hn = [ke, Ve], Ai = Ir.concat(vn), mn = [
      vr,
      ft,
      Ut,
      dr,
      pr
    ], ei = [xe, fr], ti = function(e, A) {
      A === void 0 && (A = "strict");
      var r = [], t = [], n = [];
      return e.forEach(function(s, i) {
        var o = mr.get(s);
        if (o > bA ? (n.push(!0), o -= bA) : n.push(!1), [
          "normal",
          "auto",
          "loose"
        ].indexOf(A) !== -1 && [
          8208,
          8211,
          12316,
          12448
        ].indexOf(s) !== -1)
          return t.push(i), r.push(Ur);
        if (o === Me || o === Cr) {
          if (i === 0)
            return t.push(i), r.push(ue);
          var l = r[i - 1];
          return Ai.indexOf(l) === -1 ? (t.push(t[i - 1]), r.push(l)) : (t.push(i), r.push(ue));
        }
        if (t.push(i), o === jB) return r.push(A === "strict" ? hr : Pe);
        if (o === pn || o === qB) return r.push(ue);
        if (o === zB)
          return s >= 131072 && s <= 196605 || s >= 196608 && s <= 262141 ? r.push(Pe) : r.push(ue);
        r.push(o);
      }), [
        t,
        r,
        n
      ];
    }, yr = function(e, A, r, t) {
      var n = t[r];
      if (Array.isArray(e) ? e.indexOf(n) !== -1 : e === n)
        for (var s = r; s <= t.length; ) {
          s++;
          var i = t[s];
          if (i === A) return !0;
          if (i !== VA) break;
        }
      if (n === VA)
        for (var s = r; s > 0; ) {
          s--;
          var o = t[s];
          if (Array.isArray(e) ? e.indexOf(o) !== -1 : e === o)
            for (var l = r; l <= t.length; ) {
              l++;
              var i = t[l];
              if (i === A) return !0;
              if (i !== VA) break;
            }
          if (o !== VA) break;
        }
      return !1;
    }, In = function(e, A) {
      for (var r = e; r >= 0; ) {
        var t = A[r];
        if (t === VA) r--;
        else return t;
      }
      return 0;
    }, ri = function(e, A, r, t, n) {
      if (r[t] === 0) return G;
      var s = t - 1;
      if (Array.isArray(n) && n[s] === !0) return G;
      var i = s - 1, o = s + 1, l = A[s], g = i >= 0 ? A[i] : 0, Q = A[o];
      if (l === OA && Q === Ne) return G;
      if (Ir.indexOf(l) !== -1) return En;
      if (Ir.indexOf(Q) !== -1 || vn.indexOf(Q) !== -1) return G;
      if (In(s, A) === pe) return ht;
      if (mr.get(e[s]) === Cr || (l === wt || l === Ct) && mr.get(e[o]) === Cr || l === de || Q === de || l === LA || [
        VA,
        fr,
        xe
      ].indexOf(l) === -1 && Q === LA || [
        Qt,
        Re,
        ZB,
        Ee,
        ve
      ].indexOf(Q) !== -1 || In(s, A) === Ge || yr(Fr, Ge, s, A) || yr([Qt, Re], hr, s, A) || yr(Fn, Fn, s, A)) return G;
      if (l === VA) return ht;
      if (l === Fr || Q === Fr) return G;
      if (Q === Ur || l === Ur) return ht;
      if ([
        fr,
        xe,
        hr
      ].indexOf(Q) !== -1 || l === YB || g === Er && ei.indexOf(l) !== -1 || l === ve && Q === Er || Q === dn || WA.indexOf(Q) !== -1 && l === HA || WA.indexOf(l) !== -1 && Q === HA || l === ke && [
        Pe,
        wt,
        Ct
      ].indexOf(Q) !== -1 || [
        Pe,
        wt,
        Ct
      ].indexOf(l) !== -1 && Q === Ve || WA.indexOf(l) !== -1 && Hn.indexOf(Q) !== -1 || Hn.indexOf(l) !== -1 && WA.indexOf(Q) !== -1 || [ke, Ve].indexOf(l) !== -1 && (Q === HA || [Ge, xe].indexOf(Q) !== -1 && A[o + 1] === HA) || [Ge, xe].indexOf(l) !== -1 && Q === HA || l === HA && [
        HA,
        ve,
        Ee
      ].indexOf(Q) !== -1) return G;
      if ([
        HA,
        ve,
        Ee,
        Qt,
        Re
      ].indexOf(Q) !== -1)
        for (var f = s; f >= 0; ) {
          var h = A[f];
          if (h === HA) return G;
          if ([ve, Ee].indexOf(h) !== -1) f--;
          else break;
        }
      if ([ke, Ve].indexOf(Q) !== -1)
        for (var f = [Qt, Re].indexOf(l) !== -1 ? i : s; f >= 0; ) {
          var h = A[f];
          if (h === HA) return G;
          if ([ve, Ee].indexOf(h) !== -1) f--;
          else break;
        }
      if (vr === l && [
        vr,
        ft,
        dr,
        pr
      ].indexOf(Q) !== -1 || [ft, dr].indexOf(l) !== -1 && [ft, Ut].indexOf(Q) !== -1 || [Ut, pr].indexOf(l) !== -1 && Q === Ut || mn.indexOf(l) !== -1 && [dn, Ve].indexOf(Q) !== -1 || mn.indexOf(Q) !== -1 && l === ke || WA.indexOf(l) !== -1 && WA.indexOf(Q) !== -1 || l === Ee && WA.indexOf(Q) !== -1 || WA.concat(HA).indexOf(l) !== -1 && Q === Ge && $B.indexOf(e[o]) === -1 || WA.concat(HA).indexOf(Q) !== -1 && l === Re) return G;
      if (l === Hr && Q === Hr) {
        for (var m = r[s], E = 1; m > 0 && (m--, A[m] === Hr); )
          E++;
        if (E % 2 !== 0) return G;
      }
      return l === wt && Q === Ct ? G : ht;
    }, ni = function(e, A) {
      A || (A = {
        lineBreak: "normal",
        wordBreak: "normal"
      });
      var r = ti(e, A.lineBreak), t = r[0], n = r[1], s = r[2];
      (A.wordBreak === "break-all" || A.wordBreak === "break-word") && (n = n.map(function(o) {
        return [
          HA,
          ue,
          pn
        ].indexOf(o) !== -1 ? Pe : o;
      }));
      var i = A.wordBreak === "keep-all" ? s.map(function(o, l) {
        return o && e[l] >= 19968 && e[l] <= 40959;
      }) : void 0;
      return [
        t,
        n,
        i
      ];
    }, si = (function() {
      function e(A, r, t, n) {
        this.codePoints = A, this.required = r === En, this.start = t, this.end = n;
      }
      return e.prototype.slice = function() {
        return C.apply(void 0, this.codePoints.slice(this.start, this.end));
      }, e;
    })(), Bi = function(e, A) {
      var r = N(e), t = ni(r, A), n = t[0], s = t[1], i = t[2], o = r.length, l = 0, g = 0;
      return { next: function() {
        if (g >= o) return {
          done: !0,
          value: null
        };
        for (var Q = G; g < o && (Q = ri(r, s, n, ++g, i)) === G; ) ;
        if (Q !== G || g === o) {
          var f = new si(r, Q, l, g);
          return l = g, {
            value: f,
            done: !1
          };
        }
        return {
          done: !0,
          value: null
        };
      } };
    }, ii = 1, ai = 2, Xe = 4, yn = 8, Ft = 10, bn = 47, Je = 92, oi = 9, li = 32, dt = 34, We = 61, ci = 35, ui = 36, gi = 37, pt = 39, Et = 40, Ye = 41, Qi = 95, FA = 45, wi = 33, Ci = 60, fi = 62, Ui = 64, hi = 91, Fi = 93, di = 61, pi = 123, vt = 63, Ei = 125, Kn = 124, vi = 126, Hi = 128, Ln = 65533, br = 42, ge = 43, mi = 44, Ii = 58, yi = 59, Ze = 46, bi = 0, Ki = 8, Li = 11, _i = 14, Di = 31, Si = 127, kA = -1, _n = 48, Dn = 97, Sn = 101, Ti = 102, Oi = 117, Ni = 122, Tn = 65, On = 69, Nn = 70, Mi = 85, xi = 90, fA = function(e) {
      return e >= _n && e <= 57;
    }, Ri = function(e) {
      return e >= 55296 && e <= 57343;
    }, He = function(e) {
      return fA(e) || e >= Tn && e <= Nn || e >= Dn && e <= Ti;
    }, Gi = function(e) {
      return e >= Dn && e <= Ni;
    }, Vi = function(e) {
      return e >= Tn && e <= xi;
    }, ki = function(e) {
      return Gi(e) || Vi(e);
    }, Pi = function(e) {
      return e >= Hi;
    }, Ht = function(e) {
      return e === Ft || e === oi || e === li;
    }, mt = function(e) {
      return ki(e) || Pi(e) || e === Qi;
    }, Mn = function(e) {
      return mt(e) || fA(e) || e === FA;
    }, Xi = function(e) {
      return e >= bi && e <= Ki || e === Li || e >= _i && e <= Di || e === Si;
    }, Ae = function(e, A) {
      return e !== Je ? !1 : A !== Ft;
    }, It = function(e, A, r) {
      return e === FA ? mt(A) || Ae(A, r) : mt(e) ? !0 : !!(e === Je && Ae(e, A));
    }, Kr = function(e, A, r) {
      return e === ge || e === FA ? fA(A) ? !0 : A === Ze && fA(r) : fA(e === Ze ? A : e);
    }, Ji = function(e) {
      var A = 0, r = 1;
      (e[A] === ge || e[A] === FA) && (e[A] === FA && (r = -1), A++);
      for (var t = []; fA(e[A]); ) t.push(e[A++]);
      var n = t.length ? parseInt(C.apply(void 0, t), 10) : 0;
      e[A] === Ze && A++;
      for (var s = []; fA(e[A]); ) s.push(e[A++]);
      var i = s.length, o = i ? parseInt(C.apply(void 0, s), 10) : 0;
      (e[A] === On || e[A] === Sn) && A++;
      var l = 1;
      (e[A] === ge || e[A] === FA) && (e[A] === FA && (l = -1), A++);
      for (var g = []; fA(e[A]); ) g.push(e[A++]);
      var Q = g.length ? parseInt(C.apply(void 0, g), 10) : 0;
      return r * (n + o * Math.pow(10, -i)) * Math.pow(10, l * Q);
    }, Wi = { type: 2 }, Yi = { type: 3 }, Zi = { type: 4 }, qi = { type: 13 }, ji = { type: 8 }, zi = { type: 21 }, $i = { type: 9 }, Aa = { type: 10 }, ea = { type: 11 }, ta = { type: 12 }, ra = { type: 14 }, yt = { type: 23 }, na = { type: 1 }, sa = { type: 25 }, Ba = { type: 24 }, ia = { type: 26 }, aa = { type: 27 }, oa = { type: 28 }, la = { type: 29 }, ca = { type: 31 }, Lr = { type: 32 }, xn = (function() {
      function e() {
        this._value = [];
      }
      return e.prototype.write = function(A) {
        this._value = this._value.concat(N(A));
      }, e.prototype.read = function() {
        for (var A = [], r = this.consumeToken(); r !== Lr; )
          A.push(r), r = this.consumeToken();
        return A;
      }, e.prototype.consumeToken = function() {
        var A = this.consumeCodePoint();
        switch (A) {
          case dt:
            return this.consumeStringToken(dt);
          case ci:
            var r = this.peekCodePoint(0), t = this.peekCodePoint(1), n = this.peekCodePoint(2);
            if (Mn(r) || Ae(t, n)) {
              var s = It(r, t, n) ? ai : ii, i = this.consumeName();
              return {
                type: 5,
                value: i,
                flags: s
              };
            }
            break;
          case ui:
            if (this.peekCodePoint(0) === We)
              return this.consumeCodePoint(), qi;
            break;
          case pt:
            return this.consumeStringToken(pt);
          case Et:
            return Wi;
          case Ye:
            return Yi;
          case br:
            if (this.peekCodePoint(0) === We)
              return this.consumeCodePoint(), ra;
            break;
          case ge:
            if (Kr(A, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(A), this.consumeNumericToken();
            break;
          case mi:
            return Zi;
          case FA:
            var o = A, l = this.peekCodePoint(0), g = this.peekCodePoint(1);
            if (Kr(o, l, g))
              return this.reconsumeCodePoint(A), this.consumeNumericToken();
            if (It(o, l, g))
              return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
            if (l === FA && g === fi)
              return this.consumeCodePoint(), this.consumeCodePoint(), Ba;
            break;
          case Ze:
            if (Kr(A, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(A), this.consumeNumericToken();
            break;
          case bn:
            if (this.peekCodePoint(0) === br)
              for (this.consumeCodePoint(); ; ) {
                var Q = this.consumeCodePoint();
                if (Q === br && (Q = this.consumeCodePoint(), Q === bn))
                  return this.consumeToken();
                if (Q === kA) return this.consumeToken();
              }
            break;
          case Ii:
            return ia;
          case yi:
            return aa;
          case Ci:
            if (this.peekCodePoint(0) === wi && this.peekCodePoint(1) === FA && this.peekCodePoint(2) === FA)
              return this.consumeCodePoint(), this.consumeCodePoint(), sa;
            break;
          case Ui:
            if (It(this.peekCodePoint(0), this.peekCodePoint(1), this.peekCodePoint(2))) {
              var i = this.consumeName();
              return {
                type: 7,
                value: i
              };
            }
            break;
          case hi:
            return oa;
          case Je:
            if (Ae(A, this.peekCodePoint(0)))
              return this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
            break;
          case Fi:
            return la;
          case di:
            if (this.peekCodePoint(0) === We)
              return this.consumeCodePoint(), ji;
            break;
          case pi:
            return ea;
          case Ei:
            return ta;
          case Oi:
          case Mi:
            var f = this.peekCodePoint(0), h = this.peekCodePoint(1);
            return f === ge && (He(h) || h === vt) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(A), this.consumeIdentLikeToken();
          case Kn:
            if (this.peekCodePoint(0) === We)
              return this.consumeCodePoint(), $i;
            if (this.peekCodePoint(0) === Kn)
              return this.consumeCodePoint(), zi;
            break;
          case vi:
            if (this.peekCodePoint(0) === We)
              return this.consumeCodePoint(), Aa;
            break;
          case kA:
            return Lr;
        }
        return Ht(A) ? (this.consumeWhiteSpace(), ca) : fA(A) ? (this.reconsumeCodePoint(A), this.consumeNumericToken()) : mt(A) ? (this.reconsumeCodePoint(A), this.consumeIdentLikeToken()) : {
          type: 6,
          value: C(A)
        };
      }, e.prototype.consumeCodePoint = function() {
        var A = this._value.shift();
        return typeof A == "undefined" ? -1 : A;
      }, e.prototype.reconsumeCodePoint = function(A) {
        this._value.unshift(A);
      }, e.prototype.peekCodePoint = function(A) {
        return A >= this._value.length ? -1 : this._value[A];
      }, e.prototype.consumeUnicodeRangeToken = function() {
        for (var A = [], r = this.consumeCodePoint(); He(r) && A.length < 6; )
          A.push(r), r = this.consumeCodePoint();
        for (var t = !1; r === vt && A.length < 6; )
          A.push(r), r = this.consumeCodePoint(), t = !0;
        if (t) {
          var n = parseInt(C.apply(void 0, A.map(function(l) {
            return l === vt ? _n : l;
          })), 16), s = parseInt(C.apply(void 0, A.map(function(l) {
            return l === vt ? Nn : l;
          })), 16);
          return {
            type: 30,
            start: n,
            end: s
          };
        }
        var i = parseInt(C.apply(void 0, A), 16);
        if (this.peekCodePoint(0) === FA && He(this.peekCodePoint(1))) {
          this.consumeCodePoint(), r = this.consumeCodePoint();
          for (var o = []; He(r) && o.length < 6; )
            o.push(r), r = this.consumeCodePoint();
          var s = parseInt(C.apply(void 0, o), 16);
          return {
            type: 30,
            start: i,
            end: s
          };
        } else return {
          type: 30,
          start: i,
          end: i
        };
      }, e.prototype.consumeIdentLikeToken = function() {
        var A = this.consumeName();
        return A.toLowerCase() === "url" && this.peekCodePoint(0) === Et ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === Et ? (this.consumeCodePoint(), {
          type: 19,
          value: A
        }) : {
          type: 20,
          value: A
        };
      }, e.prototype.consumeUrlToken = function() {
        var A = [];
        if (this.consumeWhiteSpace(), this.peekCodePoint(0) === kA) return {
          type: 22,
          value: ""
        };
        var r = this.peekCodePoint(0);
        if (r === pt || r === dt) {
          var t = this.consumeStringToken(this.consumeCodePoint());
          return t.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === kA || this.peekCodePoint(0) === Ye) ? (this.consumeCodePoint(), {
            type: 22,
            value: t.value
          }) : (this.consumeBadUrlRemnants(), yt);
        }
        for (; ; ) {
          var n = this.consumeCodePoint();
          if (n === kA || n === Ye) return {
            type: 22,
            value: C.apply(void 0, A)
          };
          if (Ht(n))
            return this.consumeWhiteSpace(), this.peekCodePoint(0) === kA || this.peekCodePoint(0) === Ye ? (this.consumeCodePoint(), {
              type: 22,
              value: C.apply(void 0, A)
            }) : (this.consumeBadUrlRemnants(), yt);
          if (n === dt || n === pt || n === Et || Xi(n))
            return this.consumeBadUrlRemnants(), yt;
          if (n === Je)
            if (Ae(n, this.peekCodePoint(0))) A.push(this.consumeEscapedCodePoint());
            else
              return this.consumeBadUrlRemnants(), yt;
          else A.push(n);
        }
      }, e.prototype.consumeWhiteSpace = function() {
        for (; Ht(this.peekCodePoint(0)); ) this.consumeCodePoint();
      }, e.prototype.consumeBadUrlRemnants = function() {
        for (; ; ) {
          var A = this.consumeCodePoint();
          if (A === Ye || A === kA) return;
          Ae(A, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
        }
      }, e.prototype.consumeStringSlice = function(A) {
        for (var r = 5e4, t = ""; A > 0; ) {
          var n = Math.min(r, A);
          t += C.apply(void 0, this._value.splice(0, n)), A -= n;
        }
        return this._value.shift(), t;
      }, e.prototype.consumeStringToken = function(A) {
        var r = "", t = 0;
        do {
          var n = this._value[t];
          if (n === kA || n === void 0 || n === A)
            return r += this.consumeStringSlice(t), {
              type: 0,
              value: r
            };
          if (n === Ft)
            return this._value.splice(0, t), na;
          if (n === Je) {
            var s = this._value[t + 1];
            s !== kA && s !== void 0 && (s === Ft ? (r += this.consumeStringSlice(t), t = -1, this._value.shift()) : Ae(n, s) && (r += this.consumeStringSlice(t), r += C(this.consumeEscapedCodePoint()), t = -1));
          }
          t++;
        } while (!0);
      }, e.prototype.consumeNumber = function() {
        var A = [], r = Xe, t = this.peekCodePoint(0);
        for ((t === ge || t === FA) && A.push(this.consumeCodePoint()); fA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
        t = this.peekCodePoint(0);
        var n = this.peekCodePoint(1);
        if (t === Ze && fA(n))
          for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), r = yn; fA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
        t = this.peekCodePoint(0), n = this.peekCodePoint(1);
        var s = this.peekCodePoint(2);
        if ((t === On || t === Sn) && ((n === ge || n === FA) && fA(s) || fA(n)))
          for (A.push(this.consumeCodePoint(), this.consumeCodePoint()), r = yn; fA(this.peekCodePoint(0)); ) A.push(this.consumeCodePoint());
        return [Ji(A), r];
      }, e.prototype.consumeNumericToken = function() {
        var A = this.consumeNumber(), r = A[0], t = A[1], n = this.peekCodePoint(0);
        return It(n, this.peekCodePoint(1), this.peekCodePoint(2)) ? {
          type: 15,
          number: r,
          flags: t,
          unit: this.consumeName()
        } : n === gi ? (this.consumeCodePoint(), {
          type: 16,
          number: r,
          flags: t
        }) : {
          type: 17,
          number: r,
          flags: t
        };
      }, e.prototype.consumeEscapedCodePoint = function() {
        var A = this.consumeCodePoint();
        if (He(A)) {
          for (var r = C(A); He(this.peekCodePoint(0)) && r.length < 6; ) r += C(this.consumeCodePoint());
          Ht(this.peekCodePoint(0)) && this.consumeCodePoint();
          var t = parseInt(r, 16);
          return t === 0 || Ri(t) || t > 1114111 ? Ln : t;
        }
        return A === kA ? Ln : A;
      }, e.prototype.consumeName = function() {
        for (var A = ""; ; ) {
          var r = this.consumeCodePoint();
          if (Mn(r)) A += C(r);
          else if (Ae(r, this.peekCodePoint(0))) A += C(this.consumeEscapedCodePoint());
          else
            return this.reconsumeCodePoint(r), A;
        }
      }, e;
    })(), Rn = (function() {
      function e(A) {
        this._tokens = A;
      }
      return e.create = function(A) {
        var r = new xn();
        return r.write(A), new e(r.read());
      }, e.parseValue = function(A) {
        return e.create(A).parseComponentValue();
      }, e.parseValues = function(A) {
        return e.create(A).parseComponentValues();
      }, e.prototype.parseComponentValue = function() {
        for (var A = this.consumeToken(); A.type === 31; ) A = this.consumeToken();
        if (A.type === 32) throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
        this.reconsumeToken(A);
        var r = this.consumeComponentValue();
        do
          A = this.consumeToken();
        while (A.type === 31);
        if (A.type === 32) return r;
        throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      }, e.prototype.parseComponentValues = function() {
        for (var A = []; ; ) {
          var r = this.consumeComponentValue();
          if (r.type === 32) return A;
          A.push(r), A.push();
        }
      }, e.prototype.consumeComponentValue = function() {
        var A = this.consumeToken();
        switch (A.type) {
          case 11:
          case 28:
          case 2:
            return this.consumeSimpleBlock(A.type);
          case 19:
            return this.consumeFunction(A);
        }
        return A;
      }, e.prototype.consumeSimpleBlock = function(A) {
        for (var r = {
          type: A,
          values: []
        }, t = this.consumeToken(); ; ) {
          if (t.type === 32 || ga(t, A)) return r;
          this.reconsumeToken(t), r.values.push(this.consumeComponentValue()), t = this.consumeToken();
        }
      }, e.prototype.consumeFunction = function(A) {
        for (var r = {
          name: A.value,
          values: [],
          type: 18
        }; ; ) {
          var t = this.consumeToken();
          if (t.type === 32 || t.type === 3) return r;
          this.reconsumeToken(t), r.values.push(this.consumeComponentValue());
        }
      }, e.prototype.consumeToken = function() {
        var A = this._tokens.shift();
        return typeof A == "undefined" ? Lr : A;
      }, e.prototype.reconsumeToken = function(A) {
        this._tokens.unshift(A);
      }, e;
    })(), qe = function(e) {
      return e.type === 15;
    }, me = function(e) {
      return e.type === 17;
    }, q = function(e) {
      return e.type === 20;
    }, ua = function(e) {
      return e.type === 0;
    }, _r = function(e, A) {
      return q(e) && e.value === A;
    }, Gn = function(e) {
      return e.type !== 31;
    }, Ie = function(e) {
      return e.type !== 31 && e.type !== 4;
    }, PA = function(e) {
      var A = [], r = [];
      return e.forEach(function(t) {
        if (t.type === 4) {
          if (r.length === 0) throw new Error("Error parsing function args, zero tokens for arg");
          A.push(r), r = [];
          return;
        }
        t.type !== 31 && r.push(t);
      }), r.length && A.push(r), A;
    }, ga = function(e, A) {
      return A === 11 && e.type === 12 || A === 28 && e.type === 29 ? !0 : A === 2 && e.type === 3;
    }, ee = function(e) {
      return e.type === 17 || e.type === 15;
    }, BA = function(e) {
      return e.type === 16 || ee(e);
    }, Vn = function(e) {
      return e.length > 1 ? [e[0], e[1]] : [e[0]];
    }, uA = {
      type: 17,
      number: 0,
      flags: Xe
    }, Dr = {
      type: 16,
      number: 50,
      flags: Xe
    }, te = {
      type: 16,
      number: 100,
      flags: Xe
    }, je = function(e, A, r) {
      var t = e[0], n = e[1];
      return [AA(t, A), AA(typeof n != "undefined" ? n : t, r)];
    }, AA = function(e, A) {
      if (e.type === 16) return e.number / 100 * A;
      if (qe(e)) switch (e.unit) {
        case "rem":
        case "em":
          return 16 * e.number;
        default:
          return e.number;
      }
      return e.number;
    }, kn = "deg", Pn = "grad", Xn = "rad", Jn = "turn", bt = {
      name: "angle",
      parse: function(e, A) {
        if (A.type === 15) switch (A.unit) {
          case kn:
            return Math.PI * A.number / 180;
          case Pn:
            return Math.PI / 200 * A.number;
          case Xn:
            return A.number;
          case Jn:
            return Math.PI * 2 * A.number;
        }
        throw new Error("Unsupported angle type");
      }
    }, Wn = function(e) {
      return e.type === 15 && (e.unit === kn || e.unit === Pn || e.unit === Xn || e.unit === Jn);
    }, Yn = function(e) {
      switch (e.filter(q).map(function(A) {
        return A.value;
      }).join(" ")) {
        case "to bottom right":
        case "to right bottom":
        case "left top":
        case "top left":
          return [uA, uA];
        case "to top":
        case "bottom":
          return _A(0);
        case "to bottom left":
        case "to left bottom":
        case "right top":
        case "top right":
          return [uA, te];
        case "to right":
        case "left":
          return _A(90);
        case "to top left":
        case "to left top":
        case "right bottom":
        case "bottom right":
          return [te, te];
        case "to bottom":
        case "top":
          return _A(180);
        case "to top right":
        case "to right top":
        case "left bottom":
        case "bottom left":
          return [te, uA];
        case "to left":
        case "right":
          return _A(270);
      }
      return 0;
    }, _A = function(e) {
      return Math.PI * e / 180;
    }, re = {
      name: "color",
      parse: function(e, A) {
        if (A.type === 18) {
          var r = Qa[A.name];
          if (typeof r == "undefined") throw new Error('Attempting to parse an unsupported color function "' + A.name + '"');
          return r(e, A.values);
        }
        if (A.type === 5) {
          if (A.value.length === 3) {
            var t = A.value.substring(0, 1), n = A.value.substring(1, 2), s = A.value.substring(2, 3);
            return se(parseInt(t + t, 16), parseInt(n + n, 16), parseInt(s + s, 16), 1);
          }
          if (A.value.length === 4) {
            var t = A.value.substring(0, 1), n = A.value.substring(1, 2), s = A.value.substring(2, 3), i = A.value.substring(3, 4);
            return se(parseInt(t + t, 16), parseInt(n + n, 16), parseInt(s + s, 16), parseInt(i + i, 16) / 255);
          }
          if (A.value.length === 6) {
            var t = A.value.substring(0, 2), n = A.value.substring(2, 4), s = A.value.substring(4, 6);
            return se(parseInt(t, 16), parseInt(n, 16), parseInt(s, 16), 1);
          }
          if (A.value.length === 8) {
            var t = A.value.substring(0, 2), n = A.value.substring(2, 4), s = A.value.substring(4, 6), i = A.value.substring(6, 8);
            return se(parseInt(t, 16), parseInt(n, 16), parseInt(s, 16), parseInt(i, 16) / 255);
          }
        }
        if (A.type === 20) {
          var o = YA[A.value.toUpperCase()];
          if (typeof o != "undefined") return o;
        }
        return YA.TRANSPARENT;
      }
    }, ne = function(e) {
      return (255 & e) === 0;
    }, lA = function(e) {
      var A = 255 & e, r = 255 & e >> 8, t = 255 & e >> 16, n = 255 & e >> 24;
      return A < 255 ? "rgba(" + n + "," + t + "," + r + "," + A / 255 + ")" : "rgb(" + n + "," + t + "," + r + ")";
    }, se = function(e, A, r, t) {
      return (e << 24 | A << 16 | r << 8 | Math.round(t * 255) << 0) >>> 0;
    }, Zn = function(e, A) {
      if (e.type === 17) return e.number;
      if (e.type === 16) {
        var r = A === 3 ? 1 : 255;
        return A === 3 ? e.number / 100 * r : Math.round(e.number / 100 * r);
      }
      return 0;
    }, qn = function(e, A) {
      var r = A.filter(Ie);
      if (r.length === 3) {
        var t = r.map(Zn), n = t[0], s = t[1], i = t[2];
        return se(n, s, i, 1);
      }
      if (r.length === 4) {
        var o = r.map(Zn), n = o[0], s = o[1], i = o[2], l = o[3];
        return se(n, s, i, l);
      }
      return 0;
    };
    function Sr(e, A, r) {
      return r < 0 && (r += 1), r >= 1 && (r -= 1), r < 1 / 6 ? (A - e) * r * 6 + e : r < 1 / 2 ? A : r < 2 / 3 ? (A - e) * 6 * (2 / 3 - r) + e : e;
    }
    var jn = function(e, A) {
      var r = A.filter(Ie), t = r[0], n = r[1], s = r[2], i = r[3], o = (t.type === 17 ? _A(t.number) : bt.parse(e, t)) / (Math.PI * 2), l = BA(n) ? n.number / 100 : 0, g = BA(s) ? s.number / 100 : 0, Q = typeof i != "undefined" && BA(i) ? AA(i, 1) : 1;
      if (l === 0) return se(g * 255, g * 255, g * 255, 1);
      var f = g <= 0.5 ? g * (l + 1) : g + l - g * l, h = g * 2 - f, m = Sr(h, f, o + 1 / 3), E = Sr(h, f, o), H = Sr(h, f, o - 1 / 3);
      return se(m * 255, E * 255, H * 255, Q);
    }, Qa = {
      hsl: jn,
      hsla: jn,
      rgb: qn,
      rgba: qn
    }, ze = function(e, A) {
      return re.parse(e, Rn.create(A).parseComponentValue());
    }, YA = {
      ALICEBLUE: 4042850303,
      ANTIQUEWHITE: 4209760255,
      AQUA: 16777215,
      AQUAMARINE: 2147472639,
      AZURE: 4043309055,
      BEIGE: 4126530815,
      BISQUE: 4293182719,
      BLACK: 255,
      BLANCHEDALMOND: 4293643775,
      BLUE: 65535,
      BLUEVIOLET: 2318131967,
      BROWN: 2771004159,
      BURLYWOOD: 3736635391,
      CADETBLUE: 1604231423,
      CHARTREUSE: 2147418367,
      CHOCOLATE: 3530104575,
      CORAL: 4286533887,
      CORNFLOWERBLUE: 1687547391,
      CORNSILK: 4294499583,
      CRIMSON: 3692313855,
      CYAN: 16777215,
      DARKBLUE: 35839,
      DARKCYAN: 9145343,
      DARKGOLDENROD: 3095837695,
      DARKGRAY: 2846468607,
      DARKGREEN: 6553855,
      DARKGREY: 2846468607,
      DARKKHAKI: 3182914559,
      DARKMAGENTA: 2332068863,
      DARKOLIVEGREEN: 1433087999,
      DARKORANGE: 4287365375,
      DARKORCHID: 2570243327,
      DARKRED: 2332033279,
      DARKSALMON: 3918953215,
      DARKSEAGREEN: 2411499519,
      DARKSLATEBLUE: 1211993087,
      DARKSLATEGRAY: 793726975,
      DARKSLATEGREY: 793726975,
      DARKTURQUOISE: 13554175,
      DARKVIOLET: 2483082239,
      DEEPPINK: 4279538687,
      DEEPSKYBLUE: 12582911,
      DIMGRAY: 1768516095,
      DIMGREY: 1768516095,
      DODGERBLUE: 512819199,
      FIREBRICK: 2988581631,
      FLORALWHITE: 4294635775,
      FORESTGREEN: 579543807,
      FUCHSIA: 4278255615,
      GAINSBORO: 3705462015,
      GHOSTWHITE: 4177068031,
      GOLD: 4292280575,
      GOLDENROD: 3668254975,
      GRAY: 2155905279,
      GREEN: 8388863,
      GREENYELLOW: 2919182335,
      GREY: 2155905279,
      HONEYDEW: 4043305215,
      HOTPINK: 4285117695,
      INDIANRED: 3445382399,
      INDIGO: 1258324735,
      IVORY: 4294963455,
      KHAKI: 4041641215,
      LAVENDER: 3873897215,
      LAVENDERBLUSH: 4293981695,
      LAWNGREEN: 2096890111,
      LEMONCHIFFON: 4294626815,
      LIGHTBLUE: 2916673279,
      LIGHTCORAL: 4034953471,
      LIGHTCYAN: 3774873599,
      LIGHTGOLDENRODYELLOW: 4210742015,
      LIGHTGRAY: 3553874943,
      LIGHTGREEN: 2431553791,
      LIGHTGREY: 3553874943,
      LIGHTPINK: 4290167295,
      LIGHTSALMON: 4288707327,
      LIGHTSEAGREEN: 548580095,
      LIGHTSKYBLUE: 2278488831,
      LIGHTSLATEGRAY: 2005441023,
      LIGHTSLATEGREY: 2005441023,
      LIGHTSTEELBLUE: 2965692159,
      LIGHTYELLOW: 4294959359,
      LIME: 16711935,
      LIMEGREEN: 852308735,
      LINEN: 4210091775,
      MAGENTA: 4278255615,
      MAROON: 2147483903,
      MEDIUMAQUAMARINE: 1724754687,
      MEDIUMBLUE: 52735,
      MEDIUMORCHID: 3126187007,
      MEDIUMPURPLE: 2473647103,
      MEDIUMSEAGREEN: 1018393087,
      MEDIUMSLATEBLUE: 2070474495,
      MEDIUMSPRINGGREEN: 16423679,
      MEDIUMTURQUOISE: 1221709055,
      MEDIUMVIOLETRED: 3340076543,
      MIDNIGHTBLUE: 421097727,
      MINTCREAM: 4127193855,
      MISTYROSE: 4293190143,
      MOCCASIN: 4293178879,
      NAVAJOWHITE: 4292783615,
      NAVY: 33023,
      OLDLACE: 4260751103,
      OLIVE: 2155872511,
      OLIVEDRAB: 1804477439,
      ORANGE: 4289003775,
      ORANGERED: 4282712319,
      ORCHID: 3664828159,
      PALEGOLDENROD: 4008225535,
      PALEGREEN: 2566625535,
      PALETURQUOISE: 2951671551,
      PALEVIOLETRED: 3681588223,
      PAPAYAWHIP: 4293907967,
      PEACHPUFF: 4292524543,
      PERU: 3448061951,
      PINK: 4290825215,
      PLUM: 3718307327,
      POWDERBLUE: 2967529215,
      PURPLE: 2147516671,
      REBECCAPURPLE: 1714657791,
      RED: 4278190335,
      ROSYBROWN: 3163525119,
      ROYALBLUE: 1097458175,
      SADDLEBROWN: 2336560127,
      SALMON: 4202722047,
      SANDYBROWN: 4104413439,
      SEAGREEN: 780883967,
      SEASHELL: 4294307583,
      SIENNA: 2689740287,
      SILVER: 3233857791,
      SKYBLUE: 2278484991,
      SLATEBLUE: 1784335871,
      SLATEGRAY: 1887473919,
      SLATEGREY: 1887473919,
      SNOW: 4294638335,
      SPRINGGREEN: 16744447,
      STEELBLUE: 1182971135,
      TAN: 3535047935,
      TEAL: 8421631,
      THISTLE: 3636451583,
      TOMATO: 4284696575,
      TRANSPARENT: 0,
      TURQUOISE: 1088475391,
      VIOLET: 4001558271,
      WHEAT: 4125012991,
      WHITE: 4294967295,
      WHITESMOKE: 4126537215,
      YELLOW: 4294902015,
      YELLOWGREEN: 2597139199
    }, wa = {
      name: "background-clip",
      initialValue: "border-box",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.map(function(r) {
          if (q(r)) switch (r.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, Ca = {
      name: "background-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, Kt = function(e, A) {
      var r = re.parse(e, A[0]), t = A[1];
      return t && BA(t) ? {
        color: r,
        stop: t
      } : {
        color: r,
        stop: null
      };
    }, zn = function(e, A) {
      var r = e[0], t = e[e.length - 1];
      r.stop === null && (r.stop = uA), t.stop === null && (t.stop = te);
      for (var n = [], s = 0, i = 0; i < e.length; i++) {
        var o = e[i].stop;
        if (o !== null) {
          var l = AA(o, A);
          l > s ? n.push(l) : n.push(s), s = l;
        } else n.push(null);
      }
      for (var g = null, i = 0; i < n.length; i++) {
        var Q = n[i];
        if (Q === null)
          g === null && (g = i);
        else if (g !== null) {
          for (var f = i - g, h = (Q - n[g - 1]) / (f + 1), m = 1; m <= f; m++) n[g + m - 1] = h * m;
          g = null;
        }
      }
      return e.map(function(E, H) {
        return {
          color: E.color,
          stop: Math.max(Math.min(1, n[H] / A), 0)
        };
      });
    }, fa = function(e, A, r) {
      var t = A / 2, n = r / 2, s = AA(e[0], A) - t, i = n - AA(e[1], r);
      return (Math.atan2(i, s) + Math.PI * 2) % (Math.PI * 2);
    }, Ua = function(e, A, r) {
      var t = typeof e == "number" ? e : fa(e, A, r), n = Math.abs(A * Math.sin(t)) + Math.abs(r * Math.cos(t)), s = A / 2, i = r / 2, o = n / 2, l = Math.sin(t - Math.PI / 2) * o, g = Math.cos(t - Math.PI / 2) * o;
      return [
        n,
        s - g,
        s + g,
        i - l,
        i + l
      ];
    }, NA = function(e, A) {
      return Math.sqrt(e * e + A * A);
    }, $n = function(e, A, r, t, n) {
      return [
        [0, 0],
        [0, A],
        [e, 0],
        [e, A]
      ].reduce(function(s, i) {
        var o = i[0], l = i[1], g = NA(r - o, t - l);
        return (n ? g < s.optimumDistance : g > s.optimumDistance) ? {
          optimumCorner: i,
          optimumDistance: g
        } : s;
      }, {
        optimumDistance: n ? 1 / 0 : -1 / 0,
        optimumCorner: null
      }).optimumCorner;
    }, ha = function(e, A, r, t, n) {
      var s = 0, i = 0;
      switch (e.size) {
        case 0:
          e.shape === 0 ? s = i = Math.min(Math.abs(A), Math.abs(A - t), Math.abs(r), Math.abs(r - n)) : e.shape === 1 && (s = Math.min(Math.abs(A), Math.abs(A - t)), i = Math.min(Math.abs(r), Math.abs(r - n)));
          break;
        case 2:
          if (e.shape === 0) s = i = Math.min(NA(A, r), NA(A, r - n), NA(A - t, r), NA(A - t, r - n));
          else if (e.shape === 1) {
            var o = Math.min(Math.abs(r), Math.abs(r - n)) / Math.min(Math.abs(A), Math.abs(A - t)), l = $n(t, n, A, r, !0), g = l[0], Q = l[1];
            s = NA(g - A, (Q - r) / o), i = o * s;
          }
          break;
        case 1:
          e.shape === 0 ? s = i = Math.max(Math.abs(A), Math.abs(A - t), Math.abs(r), Math.abs(r - n)) : e.shape === 1 && (s = Math.max(Math.abs(A), Math.abs(A - t)), i = Math.max(Math.abs(r), Math.abs(r - n)));
          break;
        case 3:
          if (e.shape === 0) s = i = Math.max(NA(A, r), NA(A, r - n), NA(A - t, r), NA(A - t, r - n));
          else if (e.shape === 1) {
            var o = Math.max(Math.abs(r), Math.abs(r - n)) / Math.max(Math.abs(A), Math.abs(A - t)), f = $n(t, n, A, r, !1), g = f[0], Q = f[1];
            s = NA(g - A, (Q - r) / o), i = o * s;
          }
      }
      return Array.isArray(e.size) && (s = AA(e.size[0], t), i = e.size.length === 2 ? AA(e.size[1], n) : s), [s, i];
    }, Fa = function(e, A) {
      var r = _A(180), t = [];
      return PA(A).forEach(function(n, s) {
        if (s === 0) {
          var i = n[0];
          if (i.type === 20 && i.value === "to") {
            r = Yn(n);
            return;
          } else if (Wn(i)) {
            r = bt.parse(e, i);
            return;
          }
        }
        var o = Kt(e, n);
        t.push(o);
      }), {
        angle: r,
        stops: t,
        type: 1
      };
    }, Lt = function(e, A) {
      var r = _A(180), t = [];
      return PA(A).forEach(function(n, s) {
        if (s === 0) {
          var i = n[0];
          if (i.type === 20 && [
            "top",
            "left",
            "right",
            "bottom"
          ].indexOf(i.value) !== -1) {
            r = Yn(n);
            return;
          } else if (Wn(i)) {
            r = (bt.parse(e, i) + _A(270)) % _A(360);
            return;
          }
        }
        var o = Kt(e, n);
        t.push(o);
      }), {
        angle: r,
        stops: t,
        type: 1
      };
    }, da = function(e, A) {
      var r = _A(180), t = [], n = 1, s = 0, i = 3, o = [];
      return PA(A).forEach(function(l, g) {
        var Q = l[0];
        if (g === 0) {
          if (q(Q) && Q.value === "linear") {
            n = 1;
            return;
          } else if (q(Q) && Q.value === "radial") {
            n = 2;
            return;
          }
        }
        if (Q.type === 18) {
          if (Q.name === "from") {
            var f = re.parse(e, Q.values[0]);
            t.push({
              stop: uA,
              color: f
            });
          } else if (Q.name === "to") {
            var f = re.parse(e, Q.values[0]);
            t.push({
              stop: te,
              color: f
            });
          } else if (Q.name === "color-stop") {
            var h = Q.values.filter(Ie);
            if (h.length === 2) {
              var f = re.parse(e, h[1]), m = h[0];
              me(m) && t.push({
                stop: {
                  type: 16,
                  number: m.number * 100,
                  flags: m.flags
                },
                color: f
              });
            }
          }
        }
      }), n === 1 ? {
        angle: (r + _A(180)) % _A(360),
        stops: t,
        type: n
      } : {
        size: i,
        shape: s,
        stops: t,
        position: o,
        type: n
      };
    }, As = "closest-side", es = "farthest-side", ts = "closest-corner", rs = "farthest-corner", ns = "circle", ss = "ellipse", Bs = "cover", is = "contain", pa = function(e, A) {
      var r = 0, t = 3, n = [], s = [];
      return PA(A).forEach(function(i, o) {
        var l = !0;
        if (o === 0) {
          var g = !1;
          l = i.reduce(function(f, h) {
            if (g)
              if (q(h)) switch (h.value) {
                case "center":
                  return s.push(Dr), f;
                case "top":
                case "left":
                  return s.push(uA), f;
                case "right":
                case "bottom":
                  return s.push(te), f;
              }
              else (BA(h) || ee(h)) && s.push(h);
            else if (q(h)) switch (h.value) {
              case ns:
                return r = 0, !1;
              case ss:
                return r = 1, !1;
              case "at":
                return g = !0, !1;
              case As:
                return t = 0, !1;
              case Bs:
              case es:
                return t = 1, !1;
              case is:
              case ts:
                return t = 2, !1;
              case rs:
                return t = 3, !1;
            }
            else if (ee(h) || BA(h))
              return Array.isArray(t) || (t = []), t.push(h), !1;
            return f;
          }, l);
        }
        if (l) {
          var Q = Kt(e, i);
          n.push(Q);
        }
      }), {
        size: t,
        shape: r,
        stops: n,
        position: s,
        type: 2
      };
    }, _t = function(e, A) {
      var r = 0, t = 3, n = [], s = [];
      return PA(A).forEach(function(i, o) {
        var l = !0;
        if (o === 0 ? l = i.reduce(function(Q, f) {
          if (q(f)) switch (f.value) {
            case "center":
              return s.push(Dr), !1;
            case "top":
            case "left":
              return s.push(uA), !1;
            case "right":
            case "bottom":
              return s.push(te), !1;
          }
          else if (BA(f) || ee(f))
            return s.push(f), !1;
          return Q;
        }, l) : o === 1 && (l = i.reduce(function(Q, f) {
          if (q(f)) switch (f.value) {
            case ns:
              return r = 0, !1;
            case ss:
              return r = 1, !1;
            case is:
            case As:
              return t = 0, !1;
            case es:
              return t = 1, !1;
            case ts:
              return t = 2, !1;
            case Bs:
            case rs:
              return t = 3, !1;
          }
          else if (ee(f) || BA(f))
            return Array.isArray(t) || (t = []), t.push(f), !1;
          return Q;
        }, l)), l) {
          var g = Kt(e, i);
          n.push(g);
        }
      }), {
        size: t,
        shape: r,
        stops: n,
        position: s,
        type: 2
      };
    }, Ea = function(e) {
      return e.type === 1;
    }, va = function(e) {
      return e.type === 2;
    }, Tr = {
      name: "image",
      parse: function(e, A) {
        if (A.type === 22) {
          var r = {
            url: A.value,
            type: 0
          };
          return e.cache.addImage(A.value), r;
        }
        if (A.type === 18) {
          var t = as[A.name];
          if (typeof t == "undefined") throw new Error('Attempting to parse an unsupported image function "' + A.name + '"');
          return t(e, A.values);
        }
        throw new Error("Unsupported image type " + A.type);
      }
    };
    function Ha(e) {
      return !(e.type === 20 && e.value === "none") && (e.type !== 18 || !!as[e.name]);
    }
    var as = {
      "linear-gradient": Fa,
      "-moz-linear-gradient": Lt,
      "-ms-linear-gradient": Lt,
      "-o-linear-gradient": Lt,
      "-webkit-linear-gradient": Lt,
      "radial-gradient": pa,
      "-moz-radial-gradient": _t,
      "-ms-radial-gradient": _t,
      "-o-radial-gradient": _t,
      "-webkit-radial-gradient": _t,
      "-webkit-gradient": da
    }, ma = {
      name: "background-image",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        if (A.length === 0) return [];
        var r = A[0];
        return r.type === 20 && r.value === "none" ? [] : A.filter(function(t) {
          return Ie(t) && Ha(t);
        }).map(function(t) {
          return Tr.parse(e, t);
        });
      }
    }, Ia = {
      name: "background-origin",
      initialValue: "border-box",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.map(function(r) {
          if (q(r)) switch (r.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
          return 0;
        });
      }
    }, ya = {
      name: "background-position",
      initialValue: "0% 0%",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        return PA(A).map(function(r) {
          return r.filter(BA);
        }).map(Vn);
      }
    }, ba = {
      name: "background-repeat",
      initialValue: "repeat",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return PA(A).map(function(r) {
          return r.filter(q).map(function(t) {
            return t.value;
          }).join(" ");
        }).map(Ka);
      }
    }, Ka = function(e) {
      switch (e) {
        case "no-repeat":
          return 1;
        case "repeat-x":
        case "repeat no-repeat":
          return 2;
        case "repeat-y":
        case "no-repeat repeat":
          return 3;
        default:
          return 0;
      }
    }, ye;
    (function(e) {
      e.AUTO = "auto", e.CONTAIN = "contain", e.COVER = "cover";
    })(ye || (ye = {}));
    var La = {
      name: "background-size",
      initialValue: "0",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return PA(A).map(function(r) {
          return r.filter(_a);
        });
      }
    }, _a = function(e) {
      return q(e) || BA(e);
    }, Dt = function(e) {
      return {
        name: "border-" + e + "-color",
        initialValue: "transparent",
        prefix: !1,
        type: 3,
        format: "color"
      };
    }, Da = Dt("top"), Sa = Dt("right"), Ta = Dt("bottom"), Oa = Dt("left"), St = function(e) {
      return {
        name: "border-radius-" + e,
        initialValue: "0 0",
        prefix: !1,
        type: 1,
        parse: function(A, r) {
          return Vn(r.filter(BA));
        }
      };
    }, Na = St("top-left"), Ma = St("top-right"), xa = St("bottom-right"), Ra = St("bottom-left"), Tt = function(e) {
      return {
        name: "border-" + e + "-style",
        initialValue: "solid",
        prefix: !1,
        type: 2,
        parse: function(A, r) {
          switch (r) {
            case "none":
              return 0;
            case "dashed":
              return 2;
            case "dotted":
              return 3;
            case "double":
              return 4;
          }
          return 1;
        }
      };
    }, Ga = Tt("top"), Va = Tt("right"), ka = Tt("bottom"), Pa = Tt("left"), Ot = function(e) {
      return {
        name: "border-" + e + "-width",
        initialValue: "0",
        type: 0,
        prefix: !1,
        parse: function(A, r) {
          return qe(r) ? r.number : 0;
        }
      };
    }, Xa = Ot("top"), Ja = Ot("right"), Wa = Ot("bottom"), Ya = Ot("left"), Za = {
      name: "color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, qa = {
      name: "direction",
      initialValue: "ltr",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        return A === "rtl" ? 1 : 0;
      }
    }, ja = {
      name: "display",
      initialValue: "inline-block",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.filter(q).reduce(function(r, t) {
          return r | za(t.value);
        }, 0);
      }
    }, za = function(e) {
      switch (e) {
        case "block":
        case "-webkit-box":
          return 2;
        case "inline":
          return 4;
        case "run-in":
          return 8;
        case "flow":
          return 16;
        case "flow-root":
          return 32;
        case "table":
          return 64;
        case "flex":
        case "-webkit-flex":
          return 128;
        case "grid":
        case "-ms-grid":
          return 256;
        case "ruby":
          return 512;
        case "subgrid":
          return 1024;
        case "list-item":
          return 2048;
        case "table-row-group":
          return 4096;
        case "table-header-group":
          return 8192;
        case "table-footer-group":
          return 16384;
        case "table-row":
          return 32768;
        case "table-cell":
          return 65536;
        case "table-column-group":
          return 131072;
        case "table-column":
          return 262144;
        case "table-caption":
          return 524288;
        case "ruby-base":
          return 1048576;
        case "ruby-text":
          return 2097152;
        case "ruby-base-container":
          return 4194304;
        case "ruby-text-container":
          return 8388608;
        case "contents":
          return 16777216;
        case "inline-block":
          return 33554432;
        case "inline-list-item":
          return 67108864;
        case "inline-table":
          return 134217728;
        case "inline-flex":
          return 268435456;
        case "inline-grid":
          return 536870912;
      }
      return 0;
    }, $a = {
      name: "float",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "left":
            return 1;
          case "right":
            return 2;
          case "inline-start":
            return 3;
          case "inline-end":
            return 4;
        }
        return 0;
      }
    }, Ao = {
      name: "letter-spacing",
      initialValue: "0",
      prefix: !1,
      type: 0,
      parse: function(e, A) {
        return A.type === 20 && A.value === "normal" ? 0 : A.type === 17 || A.type === 15 ? A.number : 0;
      }
    }, Nt;
    (function(e) {
      e.NORMAL = "normal", e.STRICT = "strict";
    })(Nt || (Nt = {}));
    var eo = {
      name: "line-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        return A === "strict" ? Nt.STRICT : Nt.NORMAL;
      }
    }, to = {
      name: "line-height",
      initialValue: "normal",
      prefix: !1,
      type: 4
    }, os = function(e, A) {
      return q(e) && e.value === "normal" ? 1.2 * A : e.type === 17 ? A * e.number : BA(e) ? AA(e, A) : A;
    }, ro = {
      name: "list-style-image",
      initialValue: "none",
      type: 0,
      prefix: !1,
      parse: function(e, A) {
        return A.type === 20 && A.value === "none" ? null : Tr.parse(e, A);
      }
    }, no = {
      name: "list-style-position",
      initialValue: "outside",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        return A === "inside" ? 0 : 1;
      }
    }, Or = {
      name: "list-style-type",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "disc":
            return 0;
          case "circle":
            return 1;
          case "square":
            return 2;
          case "decimal":
            return 3;
          case "cjk-decimal":
            return 4;
          case "decimal-leading-zero":
            return 5;
          case "lower-roman":
            return 6;
          case "upper-roman":
            return 7;
          case "lower-greek":
            return 8;
          case "lower-alpha":
            return 9;
          case "upper-alpha":
            return 10;
          case "arabic-indic":
            return 11;
          case "armenian":
            return 12;
          case "bengali":
            return 13;
          case "cambodian":
            return 14;
          case "cjk-earthly-branch":
            return 15;
          case "cjk-heavenly-stem":
            return 16;
          case "cjk-ideographic":
            return 17;
          case "devanagari":
            return 18;
          case "ethiopic-numeric":
            return 19;
          case "georgian":
            return 20;
          case "gujarati":
            return 21;
          case "gurmukhi":
            return 22;
          case "hebrew":
            return 22;
          case "hiragana":
            return 23;
          case "hiragana-iroha":
            return 24;
          case "japanese-formal":
            return 25;
          case "japanese-informal":
            return 26;
          case "kannada":
            return 27;
          case "katakana":
            return 28;
          case "katakana-iroha":
            return 29;
          case "khmer":
            return 30;
          case "korean-hangul-formal":
            return 31;
          case "korean-hanja-formal":
            return 32;
          case "korean-hanja-informal":
            return 33;
          case "lao":
            return 34;
          case "lower-armenian":
            return 35;
          case "malayalam":
            return 36;
          case "mongolian":
            return 37;
          case "myanmar":
            return 38;
          case "oriya":
            return 39;
          case "persian":
            return 40;
          case "simp-chinese-formal":
            return 41;
          case "simp-chinese-informal":
            return 42;
          case "tamil":
            return 43;
          case "telugu":
            return 44;
          case "thai":
            return 45;
          case "tibetan":
            return 46;
          case "trad-chinese-formal":
            return 47;
          case "trad-chinese-informal":
            return 48;
          case "upper-armenian":
            return 49;
          case "disclosure-open":
            return 50;
          case "disclosure-closed":
            return 51;
          default:
            return -1;
        }
      }
    }, Mt = function(e) {
      return {
        name: "margin-" + e,
        initialValue: "0",
        prefix: !1,
        type: 4
      };
    }, so = Mt("top"), Bo = Mt("right"), io = Mt("bottom"), ao = Mt("left"), oo = {
      name: "overflow",
      initialValue: "visible",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.filter(q).map(function(r) {
          switch (r.value) {
            case "hidden":
              return 1;
            case "scroll":
              return 2;
            case "clip":
              return 3;
            case "auto":
              return 4;
            default:
              return 0;
          }
        });
      }
    }, lo = {
      name: "overflow-wrap",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        return A === "break-word" ? "break-word" : "normal";
      }
    }, xt = function(e) {
      return {
        name: "padding-" + e,
        initialValue: "0",
        prefix: !1,
        type: 3,
        format: "length-percentage"
      };
    }, co = xt("top"), uo = xt("right"), go = xt("bottom"), Qo = xt("left"), wo = {
      name: "text-align",
      initialValue: "left",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "right":
            return 2;
          case "center":
          case "justify":
            return 1;
          default:
            return 0;
        }
      }
    }, Co = {
      name: "position",
      initialValue: "static",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "relative":
            return 1;
          case "absolute":
            return 2;
          case "fixed":
            return 3;
          case "sticky":
            return 4;
        }
        return 0;
      }
    }, fo = {
      name: "text-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        return A.length === 1 && _r(A[0], "none") ? [] : PA(A).map(function(r) {
          for (var t = {
            color: YA.TRANSPARENT,
            offsetX: uA,
            offsetY: uA,
            blur: uA
          }, n = 0, s = 0; s < r.length; s++) {
            var i = r[s];
            ee(i) ? (n === 0 ? t.offsetX = i : n === 1 ? t.offsetY = i : t.blur = i, n++) : t.color = re.parse(e, i);
          }
          return t;
        });
      }
    }, Uo = {
      name: "text-transform",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "uppercase":
            return 2;
          case "lowercase":
            return 1;
          case "capitalize":
            return 3;
        }
        return 0;
      }
    }, ho = {
      name: "transform",
      initialValue: "none",
      prefix: !0,
      type: 0,
      parse: function(e, A) {
        if (A.type === 20 && A.value === "none") return null;
        if (A.type === 18) {
          var r = Eo[A.name];
          if (typeof r == "undefined") throw new Error('Attempting to parse an unsupported transform function "' + A.name + '"');
          return r(A.values);
        }
        return null;
      }
    }, Fo = function(e) {
      var A = e.filter(function(r) {
        return r.type === 17;
      }).map(function(r) {
        return r.number;
      });
      return A.length === 6 ? A : null;
    }, po = function(e) {
      var A = e.filter(function(l) {
        return l.type === 17;
      }).map(function(l) {
        return l.number;
      }), r = A[0], t = A[1];
      A[2], A[3];
      var n = A[4], s = A[5];
      A[6], A[7], A[8], A[9], A[10], A[11];
      var i = A[12], o = A[13];
      return A[14], A[15], A.length === 16 ? [
        r,
        t,
        n,
        s,
        i,
        o
      ] : null;
    }, Eo = {
      matrix: Fo,
      matrix3d: po
    }, ls = {
      type: 16,
      number: 50,
      flags: Xe
    }, vo = [ls, ls], Ho = {
      name: "transform-origin",
      initialValue: "50% 50%",
      prefix: !0,
      type: 1,
      parse: function(e, A) {
        var r = A.filter(BA);
        return r.length !== 2 ? vo : [r[0], r[1]];
      }
    }, mo = {
      name: "visible",
      initialValue: "none",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "hidden":
            return 1;
          case "collapse":
            return 2;
          default:
            return 0;
        }
      }
    }, $e;
    (function(e) {
      e.NORMAL = "normal", e.BREAK_ALL = "break-all", e.KEEP_ALL = "keep-all";
    })($e || ($e = {}));
    for (var Io = {
      name: "word-break",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "break-all":
            return $e.BREAK_ALL;
          case "keep-all":
            return $e.KEEP_ALL;
          default:
            return $e.NORMAL;
        }
      }
    }, yo = {
      name: "z-index",
      initialValue: "auto",
      prefix: !1,
      type: 0,
      parse: function(e, A) {
        if (A.type === 20) return {
          auto: !0,
          order: 0
        };
        if (me(A)) return {
          auto: !1,
          order: A.number
        };
        throw new Error("Invalid z-index number parsed");
      }
    }, cs = {
      name: "time",
      parse: function(e, A) {
        if (A.type === 15) switch (A.unit.toLowerCase()) {
          case "s":
            return 1e3 * A.number;
          case "ms":
            return A.number;
        }
        throw new Error("Unsupported time type");
      }
    }, bo = {
      name: "opacity",
      initialValue: "1",
      type: 0,
      prefix: !1,
      parse: function(e, A) {
        return me(A) ? A.number : 1;
      }
    }, Ko = {
      name: "text-decoration-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color"
    }, Lo = {
      name: "text-decoration-line",
      initialValue: "none",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.filter(q).map(function(r) {
          switch (r.value) {
            case "underline":
              return 1;
            case "overline":
              return 2;
            case "line-through":
              return 3;
            case "none":
              return 4;
          }
          return 0;
        }).filter(function(r) {
          return r !== 0;
        });
      }
    }, _o = {
      name: "font-family",
      initialValue: "",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        var r = [], t = [];
        return A.forEach(function(n) {
          switch (n.type) {
            case 20:
            case 0:
              r.push(n.value);
              break;
            case 17:
              r.push(n.number.toString());
              break;
            case 4:
              t.push(r.join(" ")), r.length = 0;
          }
        }), r.length && t.push(r.join(" ")), t.map(function(n) {
          return n.indexOf(" ") === -1 ? n : "'" + n + "'";
        });
      }
    }, Do = {
      name: "font-size",
      initialValue: "0",
      prefix: !1,
      type: 3,
      format: "length"
    }, So = {
      name: "font-weight",
      initialValue: "normal",
      type: 0,
      prefix: !1,
      parse: function(e, A) {
        return me(A) ? A.number : q(A) && A.value === "bold" ? 700 : 400;
      }
    }, To = {
      name: "font-variant",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        return A.filter(q).map(function(r) {
          return r.value;
        });
      }
    }, Oo = {
      name: "font-style",
      initialValue: "normal",
      prefix: !1,
      type: 2,
      parse: function(e, A) {
        switch (A) {
          case "oblique":
            return "oblique";
          case "italic":
            return "italic";
          default:
            return "normal";
        }
      }
    }, oA = function(e, A) {
      return (e & A) !== 0;
    }, No = {
      name: "content",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        if (A.length === 0) return [];
        var r = A[0];
        return r.type === 20 && r.value === "none" ? [] : A;
      }
    }, Mo = {
      name: "counter-increment",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(e, A) {
        if (A.length === 0) return null;
        var r = A[0];
        if (r.type === 20 && r.value === "none") return null;
        for (var t = [], n = A.filter(Gn), s = 0; s < n.length; s++) {
          var i = n[s], o = n[s + 1];
          if (i.type === 20) {
            var l = o && me(o) ? o.number : 1;
            t.push({
              counter: i.value,
              increment: l
            });
          }
        }
        return t;
      }
    }, xo = {
      name: "counter-reset",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(e, A) {
        if (A.length === 0) return [];
        for (var r = [], t = A.filter(Gn), n = 0; n < t.length; n++) {
          var s = t[n], i = t[n + 1];
          if (q(s) && s.value !== "none") {
            var o = i && me(i) ? i.number : 0;
            r.push({
              counter: s.value,
              reset: o
            });
          }
        }
        return r;
      }
    }, Ro = {
      name: "duration",
      initialValue: "0s",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        return A.filter(qe).map(function(r) {
          return cs.parse(e, r);
        });
      }
    }, Go = {
      name: "quotes",
      initialValue: "none",
      prefix: !0,
      type: 1,
      parse: function(e, A) {
        if (A.length === 0) return null;
        var r = A[0];
        if (r.type === 20 && r.value === "none") return null;
        var t = [], n = A.filter(ua);
        if (n.length % 2 !== 0) return null;
        for (var s = 0; s < n.length; s += 2) {
          var i = n[s].value, o = n[s + 1].value;
          t.push({
            open: i,
            close: o
          });
        }
        return t;
      }
    }, us = function(e, A, r) {
      if (!e) return "";
      var t = e[Math.min(A, e.length - 1)];
      return t ? r ? t.open : t.close : "";
    }, Vo = {
      name: "box-shadow",
      initialValue: "none",
      type: 1,
      prefix: !1,
      parse: function(e, A) {
        return A.length === 1 && _r(A[0], "none") ? [] : PA(A).map(function(r) {
          for (var t = {
            color: 255,
            offsetX: uA,
            offsetY: uA,
            blur: uA,
            spread: uA,
            inset: !1
          }, n = 0, s = 0; s < r.length; s++) {
            var i = r[s];
            _r(i, "inset") ? t.inset = !0 : ee(i) ? (n === 0 ? t.offsetX = i : n === 1 ? t.offsetY = i : n === 2 ? t.blur = i : t.spread = i, n++) : t.color = re.parse(e, i);
          }
          return t;
        });
      }
    }, ko = {
      name: "paint-order",
      initialValue: "normal",
      prefix: !1,
      type: 1,
      parse: function(e, A) {
        var r = [
          0,
          1,
          2
        ], t = [];
        return A.filter(q).forEach(function(n) {
          switch (n.value) {
            case "stroke":
              t.push(1);
              break;
            case "fill":
              t.push(0);
              break;
            case "markers":
              t.push(2);
          }
        }), r.forEach(function(n) {
          t.indexOf(n) === -1 && t.push(n);
        }), t;
      }
    }, Po = {
      name: "-webkit-text-stroke-color",
      initialValue: "currentcolor",
      prefix: !1,
      type: 3,
      format: "color"
    }, Xo = {
      name: "-webkit-text-stroke-width",
      initialValue: "0",
      type: 0,
      prefix: !1,
      parse: function(e, A) {
        return qe(A) ? A.number : 0;
      }
    }, Jo = (function() {
      function e(A, r) {
        var t, n;
        this.animationDuration = K(A, Ro, r.animationDuration), this.backgroundClip = K(A, wa, r.backgroundClip), this.backgroundColor = K(A, Ca, r.backgroundColor), this.backgroundImage = K(A, ma, r.backgroundImage), this.backgroundOrigin = K(A, Ia, r.backgroundOrigin), this.backgroundPosition = K(A, ya, r.backgroundPosition), this.backgroundRepeat = K(A, ba, r.backgroundRepeat), this.backgroundSize = K(A, La, r.backgroundSize), this.borderTopColor = K(A, Da, r.borderTopColor), this.borderRightColor = K(A, Sa, r.borderRightColor), this.borderBottomColor = K(A, Ta, r.borderBottomColor), this.borderLeftColor = K(A, Oa, r.borderLeftColor), this.borderTopLeftRadius = K(A, Na, r.borderTopLeftRadius), this.borderTopRightRadius = K(A, Ma, r.borderTopRightRadius), this.borderBottomRightRadius = K(A, xa, r.borderBottomRightRadius), this.borderBottomLeftRadius = K(A, Ra, r.borderBottomLeftRadius), this.borderTopStyle = K(A, Ga, r.borderTopStyle), this.borderRightStyle = K(A, Va, r.borderRightStyle), this.borderBottomStyle = K(A, ka, r.borderBottomStyle), this.borderLeftStyle = K(A, Pa, r.borderLeftStyle), this.borderTopWidth = K(A, Xa, r.borderTopWidth), this.borderRightWidth = K(A, Ja, r.borderRightWidth), this.borderBottomWidth = K(A, Wa, r.borderBottomWidth), this.borderLeftWidth = K(A, Ya, r.borderLeftWidth), this.boxShadow = K(A, Vo, r.boxShadow), this.color = K(A, Za, r.color), this.direction = K(A, qa, r.direction), this.display = K(A, ja, r.display), this.float = K(A, $a, r.cssFloat), this.fontFamily = K(A, _o, r.fontFamily), this.fontSize = K(A, Do, r.fontSize), this.fontStyle = K(A, Oo, r.fontStyle), this.fontVariant = K(A, To, r.fontVariant), this.fontWeight = K(A, So, r.fontWeight), this.letterSpacing = K(A, Ao, r.letterSpacing), this.lineBreak = K(A, eo, r.lineBreak), this.lineHeight = K(A, to, r.lineHeight), this.listStyleImage = K(A, ro, r.listStyleImage), this.listStylePosition = K(A, no, r.listStylePosition), this.listStyleType = K(A, Or, r.listStyleType), this.marginTop = K(A, so, r.marginTop), this.marginRight = K(A, Bo, r.marginRight), this.marginBottom = K(A, io, r.marginBottom), this.marginLeft = K(A, ao, r.marginLeft), this.opacity = K(A, bo, r.opacity);
        var s = K(A, oo, r.overflow);
        this.overflowX = s[0], this.overflowY = s[s.length > 1 ? 1 : 0], this.overflowWrap = K(A, lo, r.overflowWrap), this.paddingTop = K(A, co, r.paddingTop), this.paddingRight = K(A, uo, r.paddingRight), this.paddingBottom = K(A, go, r.paddingBottom), this.paddingLeft = K(A, Qo, r.paddingLeft), this.paintOrder = K(A, ko, r.paintOrder), this.position = K(A, Co, r.position), this.textAlign = K(A, wo, r.textAlign), this.textDecorationColor = K(A, Ko, (t = r.textDecorationColor) !== null && t !== void 0 ? t : r.color), this.textDecorationLine = K(A, Lo, (n = r.textDecorationLine) !== null && n !== void 0 ? n : r.textDecoration), this.textShadow = K(A, fo, r.textShadow), this.textTransform = K(A, Uo, r.textTransform), this.transform = K(A, ho, r.transform), this.transformOrigin = K(A, Ho, r.transformOrigin), this.visibility = K(A, mo, r.visibility), this.webkitTextStrokeColor = K(A, Po, r.webkitTextStrokeColor), this.webkitTextStrokeWidth = K(A, Xo, r.webkitTextStrokeWidth), this.wordBreak = K(A, Io, r.wordBreak), this.zIndex = K(A, yo, r.zIndex);
      }
      return e.prototype.isVisible = function() {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      }, e.prototype.isTransparent = function() {
        return ne(this.backgroundColor);
      }, e.prototype.isTransformed = function() {
        return this.transform !== null;
      }, e.prototype.isPositioned = function() {
        return this.position !== 0;
      }, e.prototype.isPositionedWithZIndex = function() {
        return this.isPositioned() && !this.zIndex.auto;
      }, e.prototype.isFloating = function() {
        return this.float !== 0;
      }, e.prototype.isInlineLevel = function() {
        return oA(this.display, 4) || oA(this.display, 33554432) || oA(this.display, 268435456) || oA(this.display, 536870912) || oA(this.display, 67108864) || oA(this.display, 134217728);
      }, e;
    })(), Wo = /* @__PURE__ */ (function() {
      function e(A, r) {
        this.content = K(A, No, r.content), this.quotes = K(A, Go, r.quotes);
      }
      return e;
    })(), gs = /* @__PURE__ */ (function() {
      function e(A, r) {
        this.counterIncrement = K(A, Mo, r.counterIncrement), this.counterReset = K(A, xo, r.counterReset);
      }
      return e;
    })(), K = function(e, A, r) {
      var t = new xn(), n = r !== null && typeof r != "undefined" ? r.toString() : A.initialValue;
      t.write(n);
      var s = new Rn(t.read());
      switch (A.type) {
        case 2:
          var i = s.parseComponentValue();
          return A.parse(e, q(i) ? i.value : A.initialValue);
        case 0:
          return A.parse(e, s.parseComponentValue());
        case 1:
          return A.parse(e, s.parseComponentValues());
        case 4:
          return s.parseComponentValue();
        case 3:
          switch (A.format) {
            case "angle":
              return bt.parse(e, s.parseComponentValue());
            case "color":
              return re.parse(e, s.parseComponentValue());
            case "image":
              return Tr.parse(e, s.parseComponentValue());
            case "length":
              var o = s.parseComponentValue();
              return ee(o) ? o : uA;
            case "length-percentage":
              var l = s.parseComponentValue();
              return BA(l) ? l : uA;
            case "time":
              return cs.parse(e, s.parseComponentValue());
          }
      }
    }, Yo = "data-html2canvas-debug", Zo = function(e) {
      switch (e.getAttribute(Yo)) {
        case "all":
          return 1;
        case "clone":
          return 2;
        case "parse":
          return 3;
        case "render":
          return 4;
        default:
          return 0;
      }
    }, Nr = function(e, A) {
      var r = Zo(e);
      return r === 1 || A === r;
    }, XA = /* @__PURE__ */ (function() {
      function e(A, r) {
        if (this.context = A, this.textNodes = [], this.elements = [], this.flags = 0, Nr(r, 3)) debugger;
        this.styles = new Jo(A, window.getComputedStyle(r, null)), jr(r) && (this.styles.animationDuration.some(function(t) {
          return t > 0;
        }) && (r.style.animationDuration = "0s"), this.styles.transform !== null && (r.style.transform = "none")), this.bounds = d(this.context, r), Nr(r, 4) && (this.flags |= 16);
      }
      return e;
    })(), qo = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", Qs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", At = typeof Uint8Array == "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256), Rt = 0; Rt < Qs.length; Rt++) At[Qs.charCodeAt(Rt)] = Rt;
    for (var jo = function(e) {
      var A = e.length * 0.75, r = e.length, t, n = 0, s, i, o, l;
      e[e.length - 1] === "=" && (A--, e[e.length - 2] === "=" && A--);
      var g = typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined" && typeof Uint8Array.prototype.slice != "undefined" ? new ArrayBuffer(A) : new Array(A), Q = Array.isArray(g) ? g : new Uint8Array(g);
      for (t = 0; t < r; t += 4)
        s = At[e.charCodeAt(t)], i = At[e.charCodeAt(t + 1)], o = At[e.charCodeAt(t + 2)], l = At[e.charCodeAt(t + 3)], Q[n++] = s << 2 | i >> 4, Q[n++] = (i & 15) << 4 | o >> 2, Q[n++] = (o & 3) << 6 | l & 63;
      return g;
    }, zo = function(e) {
      for (var A = e.length, r = [], t = 0; t < A; t += 2) r.push(e[t + 1] << 8 | e[t]);
      return r;
    }, $o = function(e) {
      for (var A = e.length, r = [], t = 0; t < A; t += 4) r.push(e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]);
      return r;
    }, Qe = 5, Mr = 11, xr = 2, Al = Mr - Qe, ws = 65536 >> Qe, Rr = (1 << Qe) - 1, el = ws + (1024 >> Qe) + 32, tl = 65536 >> Mr, rl = (1 << Al) - 1, Cs = function(e, A, r) {
      return e.slice ? e.slice(A, r) : new Uint16Array(Array.prototype.slice.call(e, A, r));
    }, nl = function(e, A, r) {
      return e.slice ? e.slice(A, r) : new Uint32Array(Array.prototype.slice.call(e, A, r));
    }, sl = function(e, A) {
      var r = jo(e), t = Array.isArray(r) ? $o(r) : new Uint32Array(r), n = Array.isArray(r) ? zo(r) : new Uint16Array(r), s = 24, i = Cs(n, s / 2, t[4] / 2), o = t[5] === 2 ? Cs(n, (s + t[4]) / 2) : nl(t, Math.ceil((s + t[4]) / 4));
      return new Bl(t[0], t[1], t[2], t[3], i, o);
    }, Bl = (function() {
      function e(A, r, t, n, s, i) {
        this.initialValue = A, this.errorValue = r, this.highStart = t, this.highValueIndex = n, this.index = s, this.data = i;
      }
      return e.prototype.get = function(A) {
        var r;
        if (A >= 0) {
          if (A < 55296 || A > 56319 && A <= 65535)
            return r = this.index[A >> Qe], r = (r << xr) + (A & Rr), this.data[r];
          if (A <= 65535)
            return r = this.index[ws + (A - 55296 >> Qe)], r = (r << xr) + (A & Rr), this.data[r];
          if (A < this.highStart)
            return r = el - tl + (A >> Mr), r = this.index[r], r += A >> Qe & rl, r = this.index[r], r = (r << xr) + (A & Rr), this.data[r];
          if (A <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }, e;
    })(), fs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", il = typeof Uint8Array == "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256), Gt = 0; Gt < fs.length; Gt++) il[fs.charCodeAt(Gt)] = Gt;
    var al = 1, Gr = 2, Vr = 3, Us = 4, hs = 5, ol = 7, Fs = 8, kr = 9, Pr = 10, ds = 11, ps = 12, Es = 13, vs = 14, Xr = 15, ll = function(e) {
      for (var A = [], r = 0, t = e.length; r < t; ) {
        var n = e.charCodeAt(r++);
        if (n >= 55296 && n <= 56319 && r < t) {
          var s = e.charCodeAt(r++);
          (s & 64512) === 56320 ? A.push(((n & 1023) << 10) + (s & 1023) + 65536) : (A.push(n), r--);
        } else A.push(n);
      }
      return A;
    }, cl = function() {
      for (var e = [], A = 0; A < arguments.length; A++) e[A] = arguments[A];
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, e);
      var r = e.length;
      if (!r) return "";
      for (var t = [], n = -1, s = ""; ++n < r; ) {
        var i = e[n];
        i <= 65535 ? t.push(i) : (i -= 65536, t.push((i >> 10) + 55296, i % 1024 + 56320)), (n + 1 === r || t.length > 16384) && (s += String.fromCharCode.apply(String, t), t.length = 0);
      }
      return s;
    }, ul = sl(qo), DA = "×", Jr = "÷", gl = function(e) {
      return ul.get(e);
    }, Ql = function(e, A, r) {
      var t = r - 2, n = A[t], s = A[r - 1], i = A[r];
      if (s === Gr && i === Vr) return DA;
      if (s === Gr || s === Vr || s === Us || i === Gr || i === Vr || i === Us) return Jr;
      if (s === Fs && [
        Fs,
        kr,
        ds,
        ps
      ].indexOf(i) !== -1 || (s === ds || s === kr) && (i === kr || i === Pr) || (s === ps || s === Pr) && i === Pr || i === Es || i === hs || i === ol || s === al) return DA;
      if (s === Es && i === vs) {
        for (; n === hs; ) n = A[--t];
        if (n === vs) return DA;
      }
      if (s === Xr && i === Xr) {
        for (var o = 0; n === Xr; )
          o++, n = A[--t];
        if (o % 2 === 0) return DA;
      }
      return Jr;
    }, wl = function(e) {
      var A = ll(e), r = A.length, t = 0, n = 0, s = A.map(gl);
      return { next: function() {
        if (t >= r) return {
          done: !0,
          value: null
        };
        for (var i = DA; t < r && (i = Ql(A, s, ++t)) === DA; ) ;
        if (i !== DA || t === r) {
          var o = cl.apply(null, A.slice(n, t));
          return n = t, {
            value: o,
            done: !1
          };
        }
        return {
          done: !0,
          value: null
        };
      } };
    }, Cl = function(e) {
      for (var A = wl(e), r = [], t; !(t = A.next()).done; ) t.value && r.push(t.value.slice());
      return r;
    }, fl = function(e) {
      var A = 123;
      if (e.createRange) {
        var r = e.createRange();
        if (r.getBoundingClientRect) {
          var t = e.createElement("boundtest");
          t.style.height = A + "px", t.style.display = "block", e.body.appendChild(t), r.selectNode(t);
          var n = r.getBoundingClientRect(), s = Math.round(n.height);
          if (e.body.removeChild(t), s === A) return !0;
        }
      }
      return !1;
    }, Ul = function(e) {
      var A = e.createElement("boundtest");
      A.style.width = "50px", A.style.display = "block", A.style.fontSize = "12px", A.style.letterSpacing = "0px", A.style.wordSpacing = "0px", e.body.appendChild(A);
      var r = e.createRange();
      A.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
      var t = A.firstChild, n = N(t.data).map(function(l) {
        return C(l);
      }), s = 0, i = {}, o = n.every(function(l, g) {
        r.setStart(t, s), r.setEnd(t, s + l.length);
        var Q = r.getBoundingClientRect();
        s += l.length;
        var f = Q.x > i.x || Q.y > i.y;
        return i = Q, g === 0 ? !0 : f;
      });
      return e.body.removeChild(A), o;
    }, hl = function() {
      return typeof new Image().crossOrigin != "undefined";
    }, Fl = function() {
      return typeof new XMLHttpRequest().responseType == "string";
    }, dl = function(e) {
      var A = new Image(), r = e.createElement("canvas"), t = r.getContext("2d");
      if (!t) return !1;
      A.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
        t.drawImage(A, 0, 0), r.toDataURL();
      } catch {
        return !1;
      }
      return !0;
    }, Hs = function(e) {
      return e[0] === 0 && e[1] === 255 && e[2] === 0 && e[3] === 255;
    }, pl = function(e) {
      var A = e.createElement("canvas"), r = 100;
      A.width = r, A.height = r;
      var t = A.getContext("2d");
      if (!t) return Promise.reject(!1);
      t.fillStyle = "rgb(0, 255, 0)", t.fillRect(0, 0, r, r);
      var n = new Image(), s = A.toDataURL();
      n.src = s;
      var i = Wr(r, r, 0, 0, n);
      return t.fillStyle = "red", t.fillRect(0, 0, r, r), ms(i).then(function(o) {
        t.drawImage(o, 0, 0);
        var l = t.getImageData(0, 0, r, r).data;
        t.fillStyle = "red", t.fillRect(0, 0, r, r);
        var g = e.createElement("div");
        return g.style.backgroundImage = "url(" + s + ")", g.style.height = r + "px", Hs(l) ? ms(Wr(r, r, 0, 0, g)) : Promise.reject(!1);
      }).then(function(o) {
        return t.drawImage(o, 0, 0), Hs(t.getImageData(0, 0, r, r).data);
      }).catch(function() {
        return !1;
      });
    }, Wr = function(e, A, r, t, n) {
      var s = "http://www.w3.org/2000/svg", i = document.createElementNS(s, "svg"), o = document.createElementNS(s, "foreignObject");
      return i.setAttributeNS(null, "width", e.toString()), i.setAttributeNS(null, "height", A.toString()), o.setAttributeNS(null, "width", "100%"), o.setAttributeNS(null, "height", "100%"), o.setAttributeNS(null, "x", r.toString()), o.setAttributeNS(null, "y", t.toString()), o.setAttributeNS(null, "externalResourcesRequired", "true"), i.appendChild(o), o.appendChild(n), i;
    }, ms = function(e) {
      return new Promise(function(A, r) {
        var t = new Image();
        t.onload = function() {
          return A(t);
        }, t.onerror = r, t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
      });
    }, gA = {
      get SUPPORT_RANGE_BOUNDS() {
        var e = fl(document);
        return Object.defineProperty(gA, "SUPPORT_RANGE_BOUNDS", { value: e }), e;
      },
      get SUPPORT_WORD_BREAKING() {
        var e = gA.SUPPORT_RANGE_BOUNDS && Ul(document);
        return Object.defineProperty(gA, "SUPPORT_WORD_BREAKING", { value: e }), e;
      },
      get SUPPORT_SVG_DRAWING() {
        var e = dl(document);
        return Object.defineProperty(gA, "SUPPORT_SVG_DRAWING", { value: e }), e;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var e = typeof Array.from == "function" && typeof window.fetch == "function" ? pl(document) : Promise.resolve(!1);
        return Object.defineProperty(gA, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: e }), e;
      },
      get SUPPORT_CORS_IMAGES() {
        var e = hl();
        return Object.defineProperty(gA, "SUPPORT_CORS_IMAGES", { value: e }), e;
      },
      get SUPPORT_RESPONSE_TYPE() {
        var e = Fl();
        return Object.defineProperty(gA, "SUPPORT_RESPONSE_TYPE", { value: e }), e;
      },
      get SUPPORT_CORS_XHR() {
        var e = "withCredentials" in new XMLHttpRequest();
        return Object.defineProperty(gA, "SUPPORT_CORS_XHR", { value: e }), e;
      },
      get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
        var e = !!(typeof Intl != "undefined" && Intl.Segmenter);
        return Object.defineProperty(gA, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: e }), e;
      }
    }, et = /* @__PURE__ */ (function() {
      function e(A, r) {
        this.text = A, this.bounds = r;
      }
      return e;
    })(), El = function(e, A, r, t) {
      var n = ml(A, r), s = [], i = 0;
      return n.forEach(function(o) {
        if (r.textDecorationLine.length || o.trim().length > 0)
          if (gA.SUPPORT_RANGE_BOUNDS) {
            var l = Is(t, i, o.length).getClientRects();
            if (l.length > 1) {
              var g = Yr(o), Q = 0;
              g.forEach(function(h) {
                s.push(new et(h, v.fromDOMRectList(e, Is(t, Q + i, h.length).getClientRects()))), Q += h.length;
              });
            } else s.push(new et(o, v.fromDOMRectList(e, l)));
          } else {
            var f = t.splitText(o.length);
            s.push(new et(o, vl(e, t))), t = f;
          }
        else gA.SUPPORT_RANGE_BOUNDS || (t = t.splitText(o.length));
        i += o.length;
      }), s;
    }, vl = function(e, A) {
      var r = A.ownerDocument;
      if (r) {
        var t = r.createElement("html2canvaswrapper");
        t.appendChild(A.cloneNode(!0));
        var n = A.parentNode;
        if (n) {
          n.replaceChild(t, A);
          var s = d(e, t);
          return t.firstChild && n.replaceChild(t.firstChild, t), s;
        }
      }
      return v.EMPTY;
    }, Is = function(e, A, r) {
      var t = e.ownerDocument;
      if (!t) throw new Error("Node has no owner document");
      var n = t.createRange();
      return n.setStart(e, A), n.setEnd(e, A + r), n;
    }, Yr = function(e) {
      if (gA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var A = new Intl.Segmenter(void 0, { granularity: "grapheme" });
        return Array.from(A.segment(e)).map(function(r) {
          return r.segment;
        });
      }
      return Cl(e);
    }, Hl = function(e, A) {
      if (gA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
        var r = new Intl.Segmenter(void 0, { granularity: "word" });
        return Array.from(r.segment(e)).map(function(t) {
          return t.segment;
        });
      }
      return yl(e, A);
    }, ml = function(e, A) {
      return A.letterSpacing !== 0 ? Yr(e) : Hl(e, A);
    }, Il = [
      32,
      160,
      4961,
      65792,
      65793,
      4153,
      4241
    ], yl = function(e, A) {
      for (var r = Bi(e, {
        lineBreak: A.lineBreak,
        wordBreak: A.overflowWrap === "break-word" ? "break-word" : A.wordBreak
      }), t = [], n, s = function() {
        if (n.value) {
          var i = N(n.value.slice()), o = "";
          i.forEach(function(l) {
            Il.indexOf(l) === -1 ? o += C(l) : (o.length && t.push(o), t.push(C(l)), o = "");
          }), o.length && t.push(o);
        }
      }; !(n = r.next()).done; ) s();
      return t;
    }, bl = /* @__PURE__ */ (function() {
      function e(A, r, t) {
        this.text = Kl(r.data, t.textTransform), this.textBounds = El(A, this.text, t, r);
      }
      return e;
    })(), Kl = function(e, A) {
      switch (A) {
        case 1:
          return e.toLowerCase();
        case 3:
          return e.replace(Ll, _l);
        case 2:
          return e.toUpperCase();
        default:
          return e;
      }
    }, Ll = /(^|\s|:|-|\(|\))([a-z])/g, _l = function(e, A, r) {
      return e.length > 0 ? A + r.toUpperCase() : e;
    }, ys = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.src = t.currentSrc || t.src, n.intrinsicWidth = t.naturalWidth, n.intrinsicHeight = t.naturalHeight, n.context.cache.addImage(n.src), n;
      }
      return A;
    })(XA), bs = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.canvas = t, n.intrinsicWidth = t.width, n.intrinsicHeight = t.height, n;
      }
      return A;
    })(XA), Ks = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this, s = new XMLSerializer(), i = d(r, t);
        return t.setAttribute("width", i.width + "px"), t.setAttribute("height", i.height + "px"), n.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(t)), n.intrinsicWidth = t.width.baseVal.value, n.intrinsicHeight = t.height.baseVal.value, n.context.cache.addImage(n.svg), n;
      }
      return A;
    })(XA), Ls = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.value = t.value, n;
      }
      return A;
    })(XA), Zr = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.start = t.start, n.reversed = typeof t.reversed == "boolean" && t.reversed === !0, n;
      }
      return A;
    })(XA), Dl = [{
      type: 15,
      flags: 0,
      unit: "px",
      number: 3
    }], Sl = [{
      type: 16,
      flags: 0,
      number: 50
    }], Tl = function(e) {
      return e.width > e.height ? new v(e.left + (e.width - e.height) / 2, e.top, e.height, e.height) : e.width < e.height ? new v(e.left, e.top + (e.height - e.width) / 2, e.width, e.width) : e;
    }, Ol = function(e) {
      var A = e.type === Nl ? new Array(e.value.length + 1).join("•") : e.value;
      return A.length === 0 ? e.placeholder || "" : A;
    }, Vt = "checkbox", kt = "radio", Nl = "password", _s = 707406591, qr = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        switch (n.type = t.type.toLowerCase(), n.checked = t.checked, n.value = Ol(t), (n.type === Vt || n.type === kt) && (n.styles.backgroundColor = 3739148031, n.styles.borderTopColor = n.styles.borderRightColor = n.styles.borderBottomColor = n.styles.borderLeftColor = 2779096575, n.styles.borderTopWidth = n.styles.borderRightWidth = n.styles.borderBottomWidth = n.styles.borderLeftWidth = 1, n.styles.borderTopStyle = n.styles.borderRightStyle = n.styles.borderBottomStyle = n.styles.borderLeftStyle = 1, n.styles.backgroundClip = [0], n.styles.backgroundOrigin = [0], n.bounds = Tl(n.bounds)), n.type) {
          case Vt:
            n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = Dl;
            break;
          case kt:
            n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = Sl;
        }
        return n;
      }
      return A;
    })(XA), Ds = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this, s = t.options[t.selectedIndex || 0];
        return n.value = s && s.text || "", n;
      }
      return A;
    })(XA), Ss = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.value = t.value, n;
      }
      return A;
    })(XA), Ts = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        n.src = t.src, n.width = parseInt(t.width, 10) || 0, n.height = parseInt(t.height, 10) || 0, n.backgroundColor = n.styles.backgroundColor;
        try {
          if (t.contentWindow && t.contentWindow.document && t.contentWindow.document.documentElement) {
            n.tree = Ns(r, t.contentWindow.document.documentElement);
            var s = t.contentWindow.document.documentElement ? ze(r, getComputedStyle(t.contentWindow.document.documentElement).backgroundColor) : YA.TRANSPARENT, i = t.contentWindow.document.body ? ze(r, getComputedStyle(t.contentWindow.document.body).backgroundColor) : YA.TRANSPARENT;
            n.backgroundColor = ne(s) ? ne(i) ? n.styles.backgroundColor : i : s;
          }
        } catch {
        }
        return n;
      }
      return A;
    })(XA), Ml = [
      "OL",
      "UL",
      "MENU"
    ], Pt = function(e, A, r, t) {
      for (var n = A.firstChild, s = void 0; n; n = s)
        if (s = n.nextSibling, Ms(n) && n.data.trim().length > 0) r.textNodes.push(new bl(e, n, r.styles));
        else if (be(n))
          if (Ps(n) && n.assignedNodes) n.assignedNodes().forEach(function(o) {
            return Pt(e, o, r, t);
          });
          else {
            var i = Os(e, n);
            i.styles.isVisible() && (xl(n, i, t) ? i.flags |= 4 : Rl(i.styles) && (i.flags |= 2), Ml.indexOf(n.tagName) !== -1 && (i.flags |= 8), r.elements.push(i), n.slot, n.shadowRoot ? Pt(e, n.shadowRoot, i, t) : !Jt(n) && !xs(n) && !Wt(n) && Pt(e, n, i, t));
          }
    }, Os = function(e, A) {
      return $r(A) ? new ys(e, A) : Rs(A) ? new bs(e, A) : xs(A) ? new Ks(e, A) : Gl(A) ? new Ls(e, A) : Vl(A) ? new Zr(e, A) : kl(A) ? new qr(e, A) : Wt(A) ? new Ds(e, A) : Jt(A) ? new Ss(e, A) : Vs(A) ? new Ts(e, A) : new XA(e, A);
    }, Ns = function(e, A) {
      var r = Os(e, A);
      return r.flags |= 4, Pt(e, A, r, r), r;
    }, xl = function(e, A, r) {
      return A.styles.isPositionedWithZIndex() || A.styles.opacity < 1 || A.styles.isTransformed() || zr(e) && r.styles.isTransparent();
    }, Rl = function(e) {
      return e.isPositioned() || e.isFloating();
    }, Ms = function(e) {
      return e.nodeType === Node.TEXT_NODE;
    }, be = function(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }, jr = function(e) {
      return be(e) && typeof e.style != "undefined" && !Xt(e);
    }, Xt = function(e) {
      return typeof e.className == "object";
    }, Gl = function(e) {
      return e.tagName === "LI";
    }, Vl = function(e) {
      return e.tagName === "OL";
    }, kl = function(e) {
      return e.tagName === "INPUT";
    }, Pl = function(e) {
      return e.tagName === "HTML";
    }, xs = function(e) {
      return e.tagName === "svg";
    }, zr = function(e) {
      return e.tagName === "BODY";
    }, Rs = function(e) {
      return e.tagName === "CANVAS";
    }, Gs = function(e) {
      return e.tagName === "VIDEO";
    }, $r = function(e) {
      return e.tagName === "IMG";
    }, Vs = function(e) {
      return e.tagName === "IFRAME";
    }, ks = function(e) {
      return e.tagName === "STYLE";
    }, Xl = function(e) {
      return e.tagName === "SCRIPT";
    }, Jt = function(e) {
      return e.tagName === "TEXTAREA";
    }, Wt = function(e) {
      return e.tagName === "SELECT";
    }, Ps = function(e) {
      return e.tagName === "SLOT";
    }, Xs = function(e) {
      return e.tagName.indexOf("-") > 0;
    }, Jl = (function() {
      function e() {
        this.counters = {};
      }
      return e.prototype.getCounterValue = function(A) {
        var r = this.counters[A];
        return r && r.length ? r[r.length - 1] : 1;
      }, e.prototype.getCounterValues = function(A) {
        var r = this.counters[A];
        return r || [];
      }, e.prototype.pop = function(A) {
        var r = this;
        A.forEach(function(t) {
          return r.counters[t].pop();
        });
      }, e.prototype.parse = function(A) {
        var r = this, t = A.counterIncrement, n = A.counterReset, s = !0;
        t !== null && t.forEach(function(o) {
          var l = r.counters[o.counter];
          l && o.increment !== 0 && (s = !1, l.length || l.push(1), l[Math.max(0, l.length - 1)] += o.increment);
        });
        var i = [];
        return s && n.forEach(function(o) {
          var l = r.counters[o.counter];
          i.push(o.counter), l || (l = r.counters[o.counter] = []), l.push(o.reset);
        }), i;
      }, e;
    })(), Js = {
      integers: [
        1e3,
        900,
        500,
        400,
        100,
        90,
        50,
        40,
        10,
        9,
        5,
        4,
        1
      ],
      values: [
        "M",
        "CM",
        "D",
        "CD",
        "C",
        "XC",
        "L",
        "XL",
        "X",
        "IX",
        "V",
        "IV",
        "I"
      ]
    }, Ws = {
      integers: [
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        900,
        800,
        700,
        600,
        500,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "Ք",
        "Փ",
        "Ւ",
        "Ց",
        "Ր",
        "Տ",
        "Վ",
        "Ս",
        "Ռ",
        "Ջ",
        "Պ",
        "Չ",
        "Ո",
        "Շ",
        "Ն",
        "Յ",
        "Մ",
        "Ճ",
        "Ղ",
        "Ձ",
        "Հ",
        "Կ",
        "Ծ",
        "Խ",
        "Լ",
        "Ի",
        "Ժ",
        "Թ",
        "Ը",
        "Է",
        "Զ",
        "Ե",
        "Դ",
        "Գ",
        "Բ",
        "Ա"
      ]
    }, Wl = {
      integers: [
        1e4,
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        19,
        18,
        17,
        16,
        15,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "י׳",
        "ט׳",
        "ח׳",
        "ז׳",
        "ו׳",
        "ה׳",
        "ד׳",
        "ג׳",
        "ב׳",
        "א׳",
        "ת",
        "ש",
        "ר",
        "ק",
        "צ",
        "פ",
        "ע",
        "ס",
        "נ",
        "מ",
        "ל",
        "כ",
        "יט",
        "יח",
        "יז",
        "טז",
        "טו",
        "י",
        "ט",
        "ח",
        "ז",
        "ו",
        "ה",
        "ד",
        "ג",
        "ב",
        "א"
      ]
    }, Yl = {
      integers: [
        1e4,
        9e3,
        8e3,
        7e3,
        6e3,
        5e3,
        4e3,
        3e3,
        2e3,
        1e3,
        900,
        800,
        700,
        600,
        500,
        400,
        300,
        200,
        100,
        90,
        80,
        70,
        60,
        50,
        40,
        30,
        20,
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1
      ],
      values: [
        "ჵ",
        "ჰ",
        "ჯ",
        "ჴ",
        "ხ",
        "ჭ",
        "წ",
        "ძ",
        "ც",
        "ჩ",
        "შ",
        "ყ",
        "ღ",
        "ქ",
        "ფ",
        "ჳ",
        "ტ",
        "ს",
        "რ",
        "ჟ",
        "პ",
        "ო",
        "ჲ",
        "ნ",
        "მ",
        "ლ",
        "კ",
        "ი",
        "თ",
        "ჱ",
        "ზ",
        "ვ",
        "ე",
        "დ",
        "გ",
        "ბ",
        "ა"
      ]
    }, Ke = function(e, A, r, t, n, s) {
      return e < A || e > r ? rt(e, n, s.length > 0) : t.integers.reduce(function(i, o, l) {
        for (; e >= o; )
          e -= o, i += t.values[l];
        return i;
      }, "") + s;
    }, Ys = function(e, A, r, t) {
      var n = "";
      do
        r || e--, n = t(e) + n, e /= A;
      while (e * A >= A);
      return n;
    }, nA = function(e, A, r, t, n) {
      var s = r - A + 1;
      return (e < 0 ? "-" : "") + (Ys(Math.abs(e), s, t, function(i) {
        return C(Math.floor(i % s) + A);
      }) + n);
    }, we = function(e, A, r) {
      r === void 0 && (r = ". ");
      var t = A.length;
      return Ys(Math.abs(e), t, !1, function(n) {
        return A[Math.floor(n % t)];
      }) + r;
    }, Le = 1, Be = 2, ie = 4, tt = 8, ZA = function(e, A, r, t, n, s) {
      if (e < -9999 || e > 9999) return rt(e, 4, n.length > 0);
      var i = Math.abs(e), o = n;
      if (i === 0) return A[0] + o;
      for (var l = 0; i > 0 && l <= 4; l++) {
        var g = i % 10;
        g === 0 && oA(s, Le) && o !== "" ? o = A[g] + o : g > 1 || g === 1 && l === 0 || g === 1 && l === 1 && oA(s, Be) || g === 1 && l === 1 && oA(s, ie) && e > 100 || g === 1 && l > 1 && oA(s, tt) ? o = A[g] + (l > 0 ? r[l - 1] : "") + o : g === 1 && l > 0 && (o = r[l - 1] + o), i = Math.floor(i / 10);
      }
      return (e < 0 ? t : "") + o;
    }, Zs = "十百千萬", qs = "拾佰仟萬", js = "マイナス", An = "마이너스", rt = function(e, A, r) {
      var t = r ? ". " : "", n = r ? "、" : "", s = r ? ", " : "", i = r ? " " : "";
      switch (A) {
        case 0:
          return "•" + i;
        case 1:
          return "◦" + i;
        case 2:
          return "◾" + i;
        case 5:
          var o = nA(e, 48, 57, !0, t);
          return o.length < 4 ? "0" + o : o;
        case 4:
          return we(e, "〇一二三四五六七八九", n);
        case 6:
          return Ke(e, 1, 3999, Js, 3, t).toLowerCase();
        case 7:
          return Ke(e, 1, 3999, Js, 3, t);
        case 8:
          return nA(e, 945, 969, !1, t);
        case 9:
          return nA(e, 97, 122, !1, t);
        case 10:
          return nA(e, 65, 90, !1, t);
        case 11:
          return nA(e, 1632, 1641, !0, t);
        case 12:
        case 49:
          return Ke(e, 1, 9999, Ws, 3, t);
        case 35:
          return Ke(e, 1, 9999, Ws, 3, t).toLowerCase();
        case 13:
          return nA(e, 2534, 2543, !0, t);
        case 14:
        case 30:
          return nA(e, 6112, 6121, !0, t);
        case 15:
          return we(e, "子丑寅卯辰巳午未申酉戌亥", n);
        case 16:
          return we(e, "甲乙丙丁戊己庚辛壬癸", n);
        case 17:
        case 48:
          return ZA(e, "零一二三四五六七八九", Zs, "負", n, Be | ie | tt);
        case 47:
          return ZA(e, "零壹貳參肆伍陸柒捌玖", qs, "負", n, Le | Be | ie | tt);
        case 42:
          return ZA(e, "零一二三四五六七八九", Zs, "负", n, Be | ie | tt);
        case 41:
          return ZA(e, "零壹贰叁肆伍陆柒捌玖", qs, "负", n, Le | Be | ie | tt);
        case 26:
          return ZA(e, "〇一二三四五六七八九", "十百千万", js, n, 0);
        case 25:
          return ZA(e, "零壱弐参四伍六七八九", "拾百千万", js, n, Le | Be | ie);
        case 31:
          return ZA(e, "영일이삼사오육칠팔구", "십백천만", An, s, Le | Be | ie);
        case 33:
          return ZA(e, "零一二三四五六七八九", "十百千萬", An, s, 0);
        case 32:
          return ZA(e, "零壹貳參四五六七八九", "拾百千", An, s, Le | Be | ie);
        case 18:
          return nA(e, 2406, 2415, !0, t);
        case 20:
          return Ke(e, 1, 19999, Yl, 3, t);
        case 21:
          return nA(e, 2790, 2799, !0, t);
        case 22:
          return nA(e, 2662, 2671, !0, t);
        case 22:
          return Ke(e, 1, 10999, Wl, 3, t);
        case 23:
          return we(e, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
        case 24:
          return we(e, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
        case 27:
          return nA(e, 3302, 3311, !0, t);
        case 28:
          return we(e, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", n);
        case 29:
          return we(e, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", n);
        case 34:
          return nA(e, 3792, 3801, !0, t);
        case 37:
          return nA(e, 6160, 6169, !0, t);
        case 38:
          return nA(e, 4160, 4169, !0, t);
        case 39:
          return nA(e, 2918, 2927, !0, t);
        case 40:
          return nA(e, 1776, 1785, !0, t);
        case 43:
          return nA(e, 3046, 3055, !0, t);
        case 44:
          return nA(e, 3174, 3183, !0, t);
        case 45:
          return nA(e, 3664, 3673, !0, t);
        case 46:
          return nA(e, 3872, 3881, !0, t);
        default:
          return nA(e, 48, 57, !0, t);
      }
    }, zs = "data-html2canvas-ignore", $s = (function() {
      function e(A, r, t) {
        if (this.context = A, this.options = t, this.scrolledElements = [], this.referenceElement = r, this.counters = new Jl(), this.quoteDepth = 0, !r.ownerDocument) throw new Error("Cloned element does not have an owner document");
        this.documentElement = this.cloneNode(r.ownerDocument.documentElement, !1);
      }
      return e.prototype.toIFrame = function(A, r) {
        var t = this, n = Zl(A, r);
        if (!n.contentWindow) return Promise.reject("Unable to find iframe window");
        var s = A.defaultView.pageXOffset, i = A.defaultView.pageYOffset, o = n.contentWindow, l = o.document, g = zl(n).then(function() {
          return w(t, void 0, void 0, function() {
            var Q, f;
            return F(this, function(h) {
              switch (h.label) {
                case 0:
                  return this.scrolledElements.forEach(tc), o && (o.scrollTo(r.left, r.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (o.scrollY !== r.top || o.scrollX !== r.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(o.scrollX - r.left, o.scrollY - r.top, 0, 0))), Q = this.options.onclone, f = this.clonedReferenceElement, typeof f == "undefined" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : l.fonts && l.fonts.ready ? [4, l.fonts.ready] : [3, 2];
                case 1:
                  h.sent(), h.label = 2;
                case 2:
                  return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, jl(l)] : [3, 4];
                case 3:
                  h.sent(), h.label = 4;
                case 4:
                  return typeof Q == "function" ? [2, Promise.resolve().then(function() {
                    return Q(l, f);
                  }).then(function() {
                    return n;
                  })] : [2, n];
              }
            });
          });
        });
        return l.open(), l.write(Ac(document.doctype) + "<html></html>"), ec(this.referenceElement.ownerDocument, s, i), l.replaceChild(l.adoptNode(this.documentElement), l.documentElement), l.close(), g;
      }, e.prototype.createElementClone = function(A) {
        if (Nr(A, 2)) debugger;
        if (Rs(A)) return this.createCanvasClone(A);
        if (Gs(A)) return this.createVideoClone(A);
        if (ks(A)) return this.createStyleClone(A);
        var r = A.cloneNode(!1);
        return $r(r) && ($r(A) && A.currentSrc && A.currentSrc !== A.src && (r.src = A.currentSrc, r.srcset = ""), r.loading === "lazy" && (r.loading = "eager")), Xs(r) ? this.createCustomElementClone(r) : r;
      }, e.prototype.createCustomElementClone = function(A) {
        var r = document.createElement("html2canvascustomelement");
        return en(A.style, r), r;
      }, e.prototype.createStyleClone = function(A) {
        try {
          var r = A.sheet;
          if (r && r.cssRules) {
            var t = [].slice.call(r.cssRules, 0).reduce(function(s, i) {
              return i && typeof i.cssText == "string" ? s + i.cssText : s;
            }, ""), n = A.cloneNode(!1);
            return n.textContent = t, n;
          }
        } catch (s) {
          if (this.context.logger.error("Unable to access cssRules property", s), s.name !== "SecurityError") throw s;
        }
        return A.cloneNode(!1);
      }, e.prototype.createCanvasClone = function(A) {
        var r;
        if (this.options.inlineImages && A.ownerDocument) {
          var t = A.ownerDocument.createElement("img");
          try {
            return t.src = A.toDataURL(), t;
          } catch {
            this.context.logger.info("Unable to inline canvas contents, canvas is tainted", A);
          }
        }
        var n = A.cloneNode(!1);
        try {
          n.width = A.width, n.height = A.height;
          var s = A.getContext("2d"), i = n.getContext("2d");
          if (i)
            if (!this.options.allowTaint && s) i.putImageData(s.getImageData(0, 0, A.width, A.height), 0, 0);
            else {
              var o = (r = A.getContext("webgl2")) !== null && r !== void 0 ? r : A.getContext("webgl");
              if (o) {
                var l = o.getContextAttributes();
                (l == null ? void 0 : l.preserveDrawingBuffer) === !1 && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", A);
              }
              i.drawImage(A, 0, 0);
            }
          return n;
        } catch {
          this.context.logger.info("Unable to clone canvas as it is tainted", A);
        }
        return n;
      }, e.prototype.createVideoClone = function(A) {
        var r = A.ownerDocument.createElement("canvas");
        r.width = A.offsetWidth, r.height = A.offsetHeight;
        var t = r.getContext("2d");
        try {
          return t && (t.drawImage(A, 0, 0, r.width, r.height), this.options.allowTaint || t.getImageData(0, 0, r.width, r.height)), r;
        } catch {
          this.context.logger.info("Unable to clone video as it is tainted", A);
        }
        var n = A.ownerDocument.createElement("canvas");
        return n.width = A.offsetWidth, n.height = A.offsetHeight, n;
      }, e.prototype.appendChildNode = function(A, r, t) {
        (!be(r) || !Xl(r) && !r.hasAttribute(zs) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(r))) && (!this.options.copyStyles || !be(r) || !ks(r)) && A.appendChild(this.cloneNode(r, t));
      }, e.prototype.cloneChildNodes = function(A, r, t) {
        for (var n = this, s = A.shadowRoot ? A.shadowRoot.firstChild : A.firstChild; s; s = s.nextSibling) if (be(s) && Ps(s) && typeof s.assignedNodes == "function") {
          var i = s.assignedNodes();
          i.length && i.forEach(function(o) {
            return n.appendChildNode(r, o, t);
          });
        } else this.appendChildNode(r, s, t);
      }, e.prototype.cloneNode = function(A, r) {
        if (Ms(A)) return document.createTextNode(A.data);
        if (!A.ownerDocument) return A.cloneNode(!1);
        var t = A.ownerDocument.defaultView;
        if (t && be(A) && (jr(A) || Xt(A))) {
          var n = this.createElementClone(A);
          n.style.transitionProperty = "none";
          var s = t.getComputedStyle(A), i = t.getComputedStyle(A, ":before"), o = t.getComputedStyle(A, ":after");
          this.referenceElement === A && jr(n) && (this.clonedReferenceElement = n), zr(n) && sc(n);
          var l = this.counters.parse(new gs(this.context, s)), g = this.resolvePseudoContent(A, n, i, nt.BEFORE);
          Xs(A) && (r = !0), Gs(A) || this.cloneChildNodes(A, n, r), g && n.insertBefore(g, n.firstChild);
          var Q = this.resolvePseudoContent(A, n, o, nt.AFTER);
          return Q && n.appendChild(Q), this.counters.pop(l), (s && (this.options.copyStyles || Xt(A)) && !Vs(A) || r) && en(s, n), (A.scrollTop !== 0 || A.scrollLeft !== 0) && this.scrolledElements.push([
            n,
            A.scrollLeft,
            A.scrollTop
          ]), (Jt(A) || Wt(A)) && (Jt(n) || Wt(n)) && (n.value = A.value), n;
        }
        return A.cloneNode(!1);
      }, e.prototype.resolvePseudoContent = function(A, r, t, n) {
        var s = this;
        if (t) {
          var i = t.content, o = r.ownerDocument;
          if (!(!o || !i || i === "none" || i === "-moz-alt-content" || t.display === "none")) {
            this.counters.parse(new gs(this.context, t));
            var l = new Wo(this.context, t), g = o.createElement("html2canvaspseudoelement");
            en(t, g), l.content.forEach(function(f) {
              if (f.type === 0) g.appendChild(o.createTextNode(f.value));
              else if (f.type === 22) {
                var h = o.createElement("img");
                h.src = f.value, h.style.opacity = "1", g.appendChild(h);
              } else if (f.type === 18) {
                if (f.name === "attr") {
                  var m = f.values.filter(q);
                  m.length && g.appendChild(o.createTextNode(A.getAttribute(m[0].value) || ""));
                } else if (f.name === "counter") {
                  var E = f.values.filter(Ie), H = E[0], R = E[1];
                  if (H && q(H)) {
                    var D = s.counters.getCounterValue(H.value), L = R && q(R) ? Or.parse(s.context, R.value) : 3;
                    g.appendChild(o.createTextNode(rt(D, L, !1)));
                  }
                } else if (f.name === "counters") {
                  var eA = f.values.filter(Ie), H = eA[0], X = eA[1], R = eA[2];
                  if (H && q(H)) {
                    var T = s.counters.getCounterValues(H.value), b = R && q(R) ? Or.parse(s.context, R.value) : 3, V = X && X.type === 0 ? X.value : "", k = T.map(function(dA) {
                      return rt(dA, b, !1);
                    }).join(V);
                    g.appendChild(o.createTextNode(k));
                  }
                }
              } else if (f.type === 20) switch (f.value) {
                case "open-quote":
                  g.appendChild(o.createTextNode(us(l.quotes, s.quoteDepth++, !0)));
                  break;
                case "close-quote":
                  g.appendChild(o.createTextNode(us(l.quotes, --s.quoteDepth, !1)));
                  break;
                default:
                  g.appendChild(o.createTextNode(f.value));
              }
            }), g.className = tn + " " + rn;
            var Q = n === nt.BEFORE ? " " + tn : " " + rn;
            return Xt(r) ? r.className.baseValue += Q : r.className += Q, g;
          }
        }
      }, e.destroy = function(A) {
        return A.parentNode ? (A.parentNode.removeChild(A), !0) : !1;
      }, e;
    })(), nt;
    (function(e) {
      e[e.BEFORE = 0] = "BEFORE", e[e.AFTER = 1] = "AFTER";
    })(nt || (nt = {}));
    var Zl = function(e, A) {
      var r = e.createElement("iframe");
      return r.className = "html2canvas-container", r.style.visibility = "hidden", r.style.position = "fixed", r.style.left = "-10000px", r.style.top = "0px", r.style.border = "0", r.width = A.width.toString(), r.height = A.height.toString(), r.scrolling = "no", r.setAttribute(zs, "true"), e.body.appendChild(r), r;
    }, ql = function(e) {
      return new Promise(function(A) {
        if (e.complete) {
          A();
          return;
        }
        if (!e.src) {
          A();
          return;
        }
        e.onload = A, e.onerror = A;
      });
    }, jl = function(e) {
      return Promise.all([].slice.call(e.images, 0).map(ql));
    }, zl = function(e) {
      return new Promise(function(A, r) {
        var t = e.contentWindow;
        if (!t) return r("No window assigned for iframe");
        var n = t.document;
        t.onload = e.onload = function() {
          t.onload = e.onload = null;
          var s = setInterval(function() {
            n.body.childNodes.length > 0 && n.readyState === "complete" && (clearInterval(s), A(e));
          }, 50);
        };
      });
    }, $l = [
      "all",
      "d",
      "content"
    ], en = function(e, A) {
      for (var r = e.length - 1; r >= 0; r--) {
        var t = e.item(r);
        $l.indexOf(t) === -1 && A.style.setProperty(t, e.getPropertyValue(t));
      }
      return A;
    }, Ac = function(e) {
      var A = "";
      return e && (A += "<!DOCTYPE ", e.name && (A += e.name), e.internalSubset && (A += e.internalSubset), e.publicId && (A += '"' + e.publicId + '"'), e.systemId && (A += '"' + e.systemId + '"'), A += ">"), A;
    }, ec = function(e, A, r) {
      e && e.defaultView && (A !== e.defaultView.pageXOffset || r !== e.defaultView.pageYOffset) && e.defaultView.scrollTo(A, r);
    }, tc = function(e) {
      var A = e[0], r = e[1], t = e[2];
      A.scrollLeft = r, A.scrollTop = t;
    }, rc = ":before", nc = ":after", tn = "___html2canvas___pseudoelement_before", rn = "___html2canvas___pseudoelement_after", AB = `{
    content: "" !important;
    display: none !important;
}`, sc = function(e) {
      Bc(e, "." + tn + rc + AB + `
         .` + rn + nc + AB);
    }, Bc = function(e, A) {
      var r = e.ownerDocument;
      if (r) {
        var t = r.createElement("style");
        t.textContent = A, e.appendChild(t);
      }
    }, eB = (function() {
      function e() {
      }
      return e.getOrigin = function(A) {
        var r = e._link;
        return r ? (r.href = A, r.href = r.href, r.protocol + r.hostname + r.port) : "about:blank";
      }, e.isSameOrigin = function(A) {
        return e.getOrigin(A) === e._origin;
      }, e.setContext = function(A) {
        e._link = A.document.createElement("a"), e._origin = e.getOrigin(A.location.href);
      }, e._origin = "about:blank", e;
    })(), ic = (function() {
      function e(A, r) {
        this.context = A, this._options = r, this._cache = {};
      }
      return e.prototype.addImage = function(A) {
        var r = Promise.resolve();
        return this.has(A) || (sn(A) || cc(A)) && (this._cache[A] = this.loadImage(A)).catch(function() {
        }), r;
      }, e.prototype.match = function(A) {
        return this._cache[A];
      }, e.prototype.loadImage = function(A) {
        return w(this, void 0, void 0, function() {
          var r, t, n, s, i = this;
          return F(this, function(o) {
            switch (o.label) {
              case 0:
                return r = eB.isSameOrigin(A), t = !nn(A) && this._options.useCORS === !0 && gA.SUPPORT_CORS_IMAGES && !r, n = !nn(A) && !r && !sn(A) && typeof this._options.proxy == "string" && gA.SUPPORT_CORS_XHR && !t, !r && this._options.allowTaint === !1 && !nn(A) && !sn(A) && !n && !t ? [2] : (s = A, n ? [4, this.proxy(s)] : [3, 2]);
              case 1:
                s = o.sent(), o.label = 2;
              case 2:
                return this.context.logger.debug("Added image " + A.substring(0, 256)), [4, new Promise(function(l, g) {
                  var Q = new Image();
                  Q.onload = function() {
                    return l(Q);
                  }, Q.onerror = g, (uc(s) || t) && (Q.crossOrigin = "anonymous"), Q.src = s, Q.complete === !0 && setTimeout(function() {
                    return l(Q);
                  }, 500), i._options.imageTimeout > 0 && setTimeout(function() {
                    return g("Timed out (" + i._options.imageTimeout + "ms) loading image");
                  }, i._options.imageTimeout);
                })];
              case 3:
                return [2, o.sent()];
            }
          });
        });
      }, e.prototype.has = function(A) {
        return typeof this._cache[A] != "undefined";
      }, e.prototype.keys = function() {
        return Promise.resolve(Object.keys(this._cache));
      }, e.prototype.proxy = function(A) {
        var r = this, t = this._options.proxy;
        if (!t) throw new Error("No proxy defined");
        var n = A.substring(0, 256);
        return new Promise(function(s, i) {
          var o = gA.SUPPORT_RESPONSE_TYPE ? "blob" : "text", l = new XMLHttpRequest();
          l.onload = function() {
            if (l.status === 200)
              if (o === "text") s(l.response);
              else {
                var f = new FileReader();
                f.addEventListener("load", function() {
                  return s(f.result);
                }, !1), f.addEventListener("error", function(h) {
                  return i(h);
                }, !1), f.readAsDataURL(l.response);
              }
            else i("Failed to proxy resource " + n + " with status code " + l.status);
          }, l.onerror = i;
          var g = t.indexOf("?") > -1 ? "&" : "?";
          if (l.open("GET", "" + t + g + "url=" + encodeURIComponent(A) + "&responseType=" + o), o !== "text" && l instanceof XMLHttpRequest && (l.responseType = o), r._options.imageTimeout) {
            var Q = r._options.imageTimeout;
            l.timeout = Q, l.ontimeout = function() {
              return i("Timed out (" + Q + "ms) proxying " + n);
            };
          }
          l.send();
        });
      }, e;
    })(), ac = /^data:image\/svg\+xml/i, oc = /^data:image\/.*;base64,/i, lc = /^data:image\/.*/i, cc = function(e) {
      return gA.SUPPORT_SVG_DRAWING || !gc(e);
    }, nn = function(e) {
      return lc.test(e);
    }, uc = function(e) {
      return oc.test(e);
    }, sn = function(e) {
      return e.substr(0, 4) === "blob";
    }, gc = function(e) {
      return e.substr(-3).toLowerCase() === "svg" || ac.test(e);
    }, y = (function() {
      function e(A, r) {
        this.type = 0, this.x = A, this.y = r;
      }
      return e.prototype.add = function(A, r) {
        return new e(this.x + A, this.y + r);
      }, e;
    })(), _e = function(e, A, r) {
      return new y(e.x + (A.x - e.x) * r, e.y + (A.y - e.y) * r);
    }, Yt = (function() {
      function e(A, r, t, n) {
        this.type = 1, this.start = A, this.startControl = r, this.endControl = t, this.end = n;
      }
      return e.prototype.subdivide = function(A, r) {
        var t = _e(this.start, this.startControl, A), n = _e(this.startControl, this.endControl, A), s = _e(this.endControl, this.end, A), i = _e(t, n, A), o = _e(n, s, A), l = _e(i, o, A);
        return r ? new e(this.start, t, i, l) : new e(l, o, s, this.end);
      }, e.prototype.add = function(A, r) {
        return new e(this.start.add(A, r), this.startControl.add(A, r), this.endControl.add(A, r), this.end.add(A, r));
      }, e.prototype.reverse = function() {
        return new e(this.end, this.endControl, this.startControl, this.start);
      }, e;
    })(), SA = function(e) {
      return e.type === 1;
    }, Qc = /* @__PURE__ */ (function() {
      function e(A) {
        var r = A.styles, t = A.bounds, n = je(r.borderTopLeftRadius, t.width, t.height), s = n[0], i = n[1], o = je(r.borderTopRightRadius, t.width, t.height), l = o[0], g = o[1], Q = je(r.borderBottomRightRadius, t.width, t.height), f = Q[0], h = Q[1], m = je(r.borderBottomLeftRadius, t.width, t.height), E = m[0], H = m[1], R = [];
        R.push((s + l) / t.width), R.push((E + f) / t.width), R.push((i + H) / t.height), R.push((g + h) / t.height);
        var D = Math.max.apply(Math, R);
        D > 1 && (s /= D, i /= D, l /= D, g /= D, f /= D, h /= D, E /= D, H /= D);
        var L = t.width - l, eA = t.height - h, X = t.width - f, T = t.height - H, b = r.borderTopWidth, V = r.borderRightWidth, k = r.borderBottomWidth, O = r.borderLeftWidth, iA = AA(r.paddingTop, A.bounds.width), dA = AA(r.paddingRight, A.bounds.width), mA = AA(r.paddingBottom, A.bounds.width), j = AA(r.paddingLeft, A.bounds.width);
        this.topLeftBorderDoubleOuterBox = s > 0 || i > 0 ? tA(t.left + O / 3, t.top + b / 3, s - O / 3, i - b / 3, Y.TOP_LEFT) : new y(t.left + O / 3, t.top + b / 3), this.topRightBorderDoubleOuterBox = s > 0 || i > 0 ? tA(t.left + L, t.top + b / 3, l - V / 3, g - b / 3, Y.TOP_RIGHT) : new y(t.left + t.width - V / 3, t.top + b / 3), this.bottomRightBorderDoubleOuterBox = f > 0 || h > 0 ? tA(t.left + X, t.top + eA, f - V / 3, h - k / 3, Y.BOTTOM_RIGHT) : new y(t.left + t.width - V / 3, t.top + t.height - k / 3), this.bottomLeftBorderDoubleOuterBox = E > 0 || H > 0 ? tA(t.left + O / 3, t.top + T, E - O / 3, H - k / 3, Y.BOTTOM_LEFT) : new y(t.left + O / 3, t.top + t.height - k / 3), this.topLeftBorderDoubleInnerBox = s > 0 || i > 0 ? tA(t.left + O * 2 / 3, t.top + b * 2 / 3, s - O * 2 / 3, i - b * 2 / 3, Y.TOP_LEFT) : new y(t.left + O * 2 / 3, t.top + b * 2 / 3), this.topRightBorderDoubleInnerBox = s > 0 || i > 0 ? tA(t.left + L, t.top + b * 2 / 3, l - V * 2 / 3, g - b * 2 / 3, Y.TOP_RIGHT) : new y(t.left + t.width - V * 2 / 3, t.top + b * 2 / 3), this.bottomRightBorderDoubleInnerBox = f > 0 || h > 0 ? tA(t.left + X, t.top + eA, f - V * 2 / 3, h - k * 2 / 3, Y.BOTTOM_RIGHT) : new y(t.left + t.width - V * 2 / 3, t.top + t.height - k * 2 / 3), this.bottomLeftBorderDoubleInnerBox = E > 0 || H > 0 ? tA(t.left + O * 2 / 3, t.top + T, E - O * 2 / 3, H - k * 2 / 3, Y.BOTTOM_LEFT) : new y(t.left + O * 2 / 3, t.top + t.height - k * 2 / 3), this.topLeftBorderStroke = s > 0 || i > 0 ? tA(t.left + O / 2, t.top + b / 2, s - O / 2, i - b / 2, Y.TOP_LEFT) : new y(t.left + O / 2, t.top + b / 2), this.topRightBorderStroke = s > 0 || i > 0 ? tA(t.left + L, t.top + b / 2, l - V / 2, g - b / 2, Y.TOP_RIGHT) : new y(t.left + t.width - V / 2, t.top + b / 2), this.bottomRightBorderStroke = f > 0 || h > 0 ? tA(t.left + X, t.top + eA, f - V / 2, h - k / 2, Y.BOTTOM_RIGHT) : new y(t.left + t.width - V / 2, t.top + t.height - k / 2), this.bottomLeftBorderStroke = E > 0 || H > 0 ? tA(t.left + O / 2, t.top + T, E - O / 2, H - k / 2, Y.BOTTOM_LEFT) : new y(t.left + O / 2, t.top + t.height - k / 2), this.topLeftBorderBox = s > 0 || i > 0 ? tA(t.left, t.top, s, i, Y.TOP_LEFT) : new y(t.left, t.top), this.topRightBorderBox = l > 0 || g > 0 ? tA(t.left + L, t.top, l, g, Y.TOP_RIGHT) : new y(t.left + t.width, t.top), this.bottomRightBorderBox = f > 0 || h > 0 ? tA(t.left + X, t.top + eA, f, h, Y.BOTTOM_RIGHT) : new y(t.left + t.width, t.top + t.height), this.bottomLeftBorderBox = E > 0 || H > 0 ? tA(t.left, t.top + T, E, H, Y.BOTTOM_LEFT) : new y(t.left, t.top + t.height), this.topLeftPaddingBox = s > 0 || i > 0 ? tA(t.left + O, t.top + b, Math.max(0, s - O), Math.max(0, i - b), Y.TOP_LEFT) : new y(t.left + O, t.top + b), this.topRightPaddingBox = l > 0 || g > 0 ? tA(t.left + Math.min(L, t.width - V), t.top + b, L > t.width + V ? 0 : Math.max(0, l - V), Math.max(0, g - b), Y.TOP_RIGHT) : new y(t.left + t.width - V, t.top + b), this.bottomRightPaddingBox = f > 0 || h > 0 ? tA(t.left + Math.min(X, t.width - O), t.top + Math.min(eA, t.height - k), Math.max(0, f - V), Math.max(0, h - k), Y.BOTTOM_RIGHT) : new y(t.left + t.width - V, t.top + t.height - k), this.bottomLeftPaddingBox = E > 0 || H > 0 ? tA(t.left + O, t.top + Math.min(T, t.height - k), Math.max(0, E - O), Math.max(0, H - k), Y.BOTTOM_LEFT) : new y(t.left + O, t.top + t.height - k), this.topLeftContentBox = s > 0 || i > 0 ? tA(t.left + O + j, t.top + b + iA, Math.max(0, s - (O + j)), Math.max(0, i - (b + iA)), Y.TOP_LEFT) : new y(t.left + O + j, t.top + b + iA), this.topRightContentBox = l > 0 || g > 0 ? tA(t.left + Math.min(L, t.width + O + j), t.top + b + iA, L > t.width + O + j ? 0 : l - O + j, g - (b + iA), Y.TOP_RIGHT) : new y(t.left + t.width - (V + dA), t.top + b + iA), this.bottomRightContentBox = f > 0 || h > 0 ? tA(t.left + Math.min(X, t.width - (O + j)), t.top + Math.min(eA, t.height + b + iA), Math.max(0, f - (V + dA)), h - (k + mA), Y.BOTTOM_RIGHT) : new y(t.left + t.width - (V + dA), t.top + t.height - (k + mA)), this.bottomLeftContentBox = E > 0 || H > 0 ? tA(t.left + O + j, t.top + T, Math.max(0, E - (O + j)), H - (k + mA), Y.BOTTOM_LEFT) : new y(t.left + O + j, t.top + t.height - (k + mA));
      }
      return e;
    })(), Y;
    (function(e) {
      e[e.TOP_LEFT = 0] = "TOP_LEFT", e[e.TOP_RIGHT = 1] = "TOP_RIGHT", e[e.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", e[e.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
    })(Y || (Y = {}));
    var tA = function(e, A, r, t, n) {
      var s = 4 * ((Math.sqrt(2) - 1) / 3), i = r * s, o = t * s, l = e + r, g = A + t;
      switch (n) {
        case Y.TOP_LEFT:
          return new Yt(new y(e, g), new y(e, g - o), new y(l - i, A), new y(l, A));
        case Y.TOP_RIGHT:
          return new Yt(new y(e, A), new y(e + i, A), new y(l, g - o), new y(l, g));
        case Y.BOTTOM_RIGHT:
          return new Yt(new y(l, A), new y(l, A + o), new y(e + i, g), new y(e, g));
        case Y.BOTTOM_LEFT:
        default:
          return new Yt(new y(l, g), new y(l - i, g), new y(e, A + o), new y(e, A));
      }
    }, Zt = function(e) {
      return [
        e.topLeftBorderBox,
        e.topRightBorderBox,
        e.bottomRightBorderBox,
        e.bottomLeftBorderBox
      ];
    }, wc = function(e) {
      return [
        e.topLeftContentBox,
        e.topRightContentBox,
        e.bottomRightContentBox,
        e.bottomLeftContentBox
      ];
    }, qt = function(e) {
      return [
        e.topLeftPaddingBox,
        e.topRightPaddingBox,
        e.bottomRightPaddingBox,
        e.bottomLeftPaddingBox
      ];
    }, Cc = /* @__PURE__ */ (function() {
      function e(A, r, t) {
        this.offsetX = A, this.offsetY = r, this.matrix = t, this.type = 0, this.target = 6;
      }
      return e;
    })(), jt = /* @__PURE__ */ (function() {
      function e(A, r) {
        this.path = A, this.target = r, this.type = 1;
      }
      return e;
    })(), fc = /* @__PURE__ */ (function() {
      function e(A) {
        this.opacity = A, this.type = 2, this.target = 6;
      }
      return e;
    })(), Uc = function(e) {
      return e.type === 0;
    }, tB = function(e) {
      return e.type === 1;
    }, hc = function(e) {
      return e.type === 2;
    }, rB = function(e, A) {
      return e.length === A.length ? e.some(function(r, t) {
        return r === A[t];
      }) : !1;
    }, Fc = function(e, A, r, t, n) {
      return e.map(function(s, i) {
        switch (i) {
          case 0:
            return s.add(A, r);
          case 1:
            return s.add(A + t, r);
          case 2:
            return s.add(A + t, r + n);
          case 3:
            return s.add(A, r + n);
        }
        return s;
      });
    }, nB = /* @__PURE__ */ (function() {
      function e(A) {
        this.element = A, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
      }
      return e;
    })(), sB = (function() {
      function e(A, r) {
        if (this.container = A, this.parent = r, this.effects = [], this.curves = new Qc(this.container), this.container.styles.opacity < 1 && this.effects.push(new fc(this.container.styles.opacity)), this.container.styles.transform !== null) {
          var t = this.container.bounds.left + this.container.styles.transformOrigin[0].number, n = this.container.bounds.top + this.container.styles.transformOrigin[1].number, s = this.container.styles.transform;
          this.effects.push(new Cc(t, n, s));
        }
        if (this.container.styles.overflowX !== 0) {
          var i = Zt(this.curves), o = qt(this.curves);
          rB(i, o) ? this.effects.push(new jt(i, 6)) : (this.effects.push(new jt(i, 2)), this.effects.push(new jt(o, 4)));
        }
      }
      return e.prototype.getEffects = function(A) {
        for (var r = [2, 3].indexOf(this.container.styles.position) === -1, t = this.parent, n = this.effects.slice(0); t; ) {
          var s = t.effects.filter(function(l) {
            return !tB(l);
          });
          if (r || t.container.styles.position !== 0 || !t.parent) {
            if (n.unshift.apply(n, s), r = [2, 3].indexOf(t.container.styles.position) === -1, t.container.styles.overflowX !== 0) {
              var i = Zt(t.curves), o = qt(t.curves);
              rB(i, o) || n.unshift(new jt(o, 6));
            }
          } else n.unshift.apply(n, s);
          t = t.parent;
        }
        return n.filter(function(l) {
          return oA(l.target, A);
        });
      }, e;
    })(), Bn = function(e, A, r, t) {
      e.container.elements.forEach(function(n) {
        var s = oA(n.flags, 4), i = oA(n.flags, 2), o = new sB(n, e);
        oA(n.styles.display, 2048) && t.push(o);
        var l = oA(n.flags, 8) ? [] : t;
        if (s || i) {
          var g = s || n.styles.isPositioned() ? r : A, Q = new nB(o);
          if (n.styles.isPositioned() || n.styles.opacity < 1 || n.styles.isTransformed()) {
            var f = n.styles.zIndex.order;
            if (f < 0) {
              var h = 0;
              g.negativeZIndex.some(function(E, H) {
                return f > E.element.container.styles.zIndex.order ? (h = H, !1) : h > 0;
              }), g.negativeZIndex.splice(h, 0, Q);
            } else if (f > 0) {
              var m = 0;
              g.positiveZIndex.some(function(E, H) {
                return f >= E.element.container.styles.zIndex.order ? (m = H + 1, !1) : m > 0;
              }), g.positiveZIndex.splice(m, 0, Q);
            } else g.zeroOrAutoZIndexOrTransformedOrOpacity.push(Q);
          } else n.styles.isFloating() ? g.nonPositionedFloats.push(Q) : g.nonPositionedInlineLevel.push(Q);
          Bn(o, Q, s ? Q : r, l);
        } else
          n.styles.isInlineLevel() ? A.inlineLevel.push(o) : A.nonInlineLevel.push(o), Bn(o, A, r, l);
        oA(n.flags, 8) && BB(n, l);
      });
    }, BB = function(e, A) {
      for (var r = e instanceof Zr ? e.start : 1, t = e instanceof Zr ? e.reversed : !1, n = 0; n < A.length; n++) {
        var s = A[n];
        s.container instanceof Ls && typeof s.container.value == "number" && s.container.value !== 0 && (r = s.container.value), s.listValue = rt(r, s.container.styles.listStyleType, !0), r += t ? -1 : 1;
      }
    }, dc = function(e) {
      var A = new sB(e, null), r = new nB(A), t = [];
      return Bn(A, r, r, t), BB(A.container, t), r;
    }, iB = function(e, A) {
      switch (A) {
        case 0:
          return TA(e.topLeftBorderBox, e.topLeftPaddingBox, e.topRightBorderBox, e.topRightPaddingBox);
        case 1:
          return TA(e.topRightBorderBox, e.topRightPaddingBox, e.bottomRightBorderBox, e.bottomRightPaddingBox);
        case 2:
          return TA(e.bottomRightBorderBox, e.bottomRightPaddingBox, e.bottomLeftBorderBox, e.bottomLeftPaddingBox);
        default:
          return TA(e.bottomLeftBorderBox, e.bottomLeftPaddingBox, e.topLeftBorderBox, e.topLeftPaddingBox);
      }
    }, pc = function(e, A) {
      switch (A) {
        case 0:
          return TA(e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox, e.topRightBorderBox, e.topRightBorderDoubleOuterBox);
        case 1:
          return TA(e.topRightBorderBox, e.topRightBorderDoubleOuterBox, e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox);
        case 2:
          return TA(e.bottomRightBorderBox, e.bottomRightBorderDoubleOuterBox, e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox);
        default:
          return TA(e.bottomLeftBorderBox, e.bottomLeftBorderDoubleOuterBox, e.topLeftBorderBox, e.topLeftBorderDoubleOuterBox);
      }
    }, Ec = function(e, A) {
      switch (A) {
        case 0:
          return TA(e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox, e.topRightBorderDoubleInnerBox, e.topRightPaddingBox);
        case 1:
          return TA(e.topRightBorderDoubleInnerBox, e.topRightPaddingBox, e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox);
        case 2:
          return TA(e.bottomRightBorderDoubleInnerBox, e.bottomRightPaddingBox, e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox);
        default:
          return TA(e.bottomLeftBorderDoubleInnerBox, e.bottomLeftPaddingBox, e.topLeftBorderDoubleInnerBox, e.topLeftPaddingBox);
      }
    }, vc = function(e, A) {
      switch (A) {
        case 0:
          return zt(e.topLeftBorderStroke, e.topRightBorderStroke);
        case 1:
          return zt(e.topRightBorderStroke, e.bottomRightBorderStroke);
        case 2:
          return zt(e.bottomRightBorderStroke, e.bottomLeftBorderStroke);
        default:
          return zt(e.bottomLeftBorderStroke, e.topLeftBorderStroke);
      }
    }, zt = function(e, A) {
      var r = [];
      return SA(e) ? r.push(e.subdivide(0.5, !1)) : r.push(e), SA(A) ? r.push(A.subdivide(0.5, !0)) : r.push(A), r;
    }, TA = function(e, A, r, t) {
      var n = [];
      return SA(e) ? n.push(e.subdivide(0.5, !1)) : n.push(e), SA(r) ? n.push(r.subdivide(0.5, !0)) : n.push(r), SA(t) ? n.push(t.subdivide(0.5, !0).reverse()) : n.push(t), SA(A) ? n.push(A.subdivide(0.5, !1).reverse()) : n.push(A), n;
    }, aB = function(e) {
      var A = e.bounds, r = e.styles;
      return A.add(r.borderLeftWidth, r.borderTopWidth, -(r.borderRightWidth + r.borderLeftWidth), -(r.borderTopWidth + r.borderBottomWidth));
    }, $t = function(e) {
      var A = e.styles, r = e.bounds, t = AA(A.paddingLeft, r.width), n = AA(A.paddingRight, r.width), s = AA(A.paddingTop, r.width), i = AA(A.paddingBottom, r.width);
      return r.add(t + A.borderLeftWidth, s + A.borderTopWidth, -(A.borderRightWidth + A.borderLeftWidth + t + n), -(A.borderTopWidth + A.borderBottomWidth + s + i));
    }, Hc = function(e, A) {
      return e === 0 ? A.bounds : e === 2 ? $t(A) : aB(A);
    }, mc = function(e, A) {
      return e === 0 ? A.bounds : e === 2 ? $t(A) : aB(A);
    }, an = function(e, A, r) {
      var t = Hc(Se(e.styles.backgroundOrigin, A), e), n = mc(Se(e.styles.backgroundClip, A), e), s = Ic(Se(e.styles.backgroundSize, A), r, t), i = s[0], o = s[1], l = je(Se(e.styles.backgroundPosition, A), t.width - i, t.height - o);
      return [
        yc(Se(e.styles.backgroundRepeat, A), l, s, t, n),
        Math.round(t.left + l[0]),
        Math.round(t.top + l[1]),
        i,
        o
      ];
    }, De = function(e) {
      return q(e) && e.value === ye.AUTO;
    }, Ar = function(e) {
      return typeof e == "number";
    }, Ic = function(e, A, r) {
      var t = A[0], n = A[1], s = A[2], i = e[0], o = e[1];
      if (!i) return [0, 0];
      if (BA(i) && o && BA(o)) return [AA(i, r.width), AA(o, r.height)];
      var l = Ar(s);
      if (q(i) && (i.value === ye.CONTAIN || i.value === ye.COVER))
        return Ar(s) ? r.width / r.height < s != (i.value === ye.COVER) ? [r.width, r.width / s] : [r.height * s, r.height] : [r.width, r.height];
      var g = Ar(t), Q = Ar(n), f = g || Q;
      if (De(i) && (!o || De(o)))
        return g && Q ? [t, n] : !l && !f ? [r.width, r.height] : f && l ? [g ? t : n * s, Q ? n : t / s] : [g ? t : r.width, Q ? n : r.height];
      if (l) {
        var h = 0, m = 0;
        return BA(i) ? h = AA(i, r.width) : BA(o) && (m = AA(o, r.height)), De(i) ? h = m * s : (!o || De(o)) && (m = h / s), [h, m];
      }
      var E = null, H = null;
      if (BA(i) ? E = AA(i, r.width) : o && BA(o) && (H = AA(o, r.height)), E !== null && (!o || De(o)) && (H = g && Q ? E / t * n : r.height), H !== null && De(i) && (E = g && Q ? H / n * t : r.width), E !== null && H !== null) return [E, H];
      throw new Error("Unable to calculate background-size for element");
    }, Se = function(e, A) {
      var r = e[A];
      return typeof r == "undefined" ? e[0] : r;
    }, yc = function(e, A, r, t, n) {
      var s = A[0], i = A[1], o = r[0], l = r[1];
      switch (e) {
        case 2:
          return [
            new y(Math.round(t.left), Math.round(t.top + i)),
            new y(Math.round(t.left + t.width), Math.round(t.top + i)),
            new y(Math.round(t.left + t.width), Math.round(l + t.top + i)),
            new y(Math.round(t.left), Math.round(l + t.top + i))
          ];
        case 3:
          return [
            new y(Math.round(t.left + s), Math.round(t.top)),
            new y(Math.round(t.left + s + o), Math.round(t.top)),
            new y(Math.round(t.left + s + o), Math.round(t.height + t.top)),
            new y(Math.round(t.left + s), Math.round(t.height + t.top))
          ];
        case 1:
          return [
            new y(Math.round(t.left + s), Math.round(t.top + i)),
            new y(Math.round(t.left + s + o), Math.round(t.top + i)),
            new y(Math.round(t.left + s + o), Math.round(t.top + i + l)),
            new y(Math.round(t.left + s), Math.round(t.top + i + l))
          ];
        default:
          return [
            new y(Math.round(n.left), Math.round(n.top)),
            new y(Math.round(n.left + n.width), Math.round(n.top)),
            new y(Math.round(n.left + n.width), Math.round(n.height + n.top)),
            new y(Math.round(n.left), Math.round(n.height + n.top))
          ];
      }
    }, bc = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", oB = "Hidden Text", Kc = (function() {
      function e(A) {
        this._data = {}, this._document = A;
      }
      return e.prototype.parseMetrics = function(A, r) {
        var t = this._document.createElement("div"), n = this._document.createElement("img"), s = this._document.createElement("span"), i = this._document.body;
        t.style.visibility = "hidden", t.style.fontFamily = A, t.style.fontSize = r, t.style.margin = "0", t.style.padding = "0", t.style.whiteSpace = "nowrap", i.appendChild(t), n.src = bc, n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", s.style.fontFamily = A, s.style.fontSize = r, s.style.margin = "0", s.style.padding = "0", s.appendChild(this._document.createTextNode(oB)), t.appendChild(s), t.appendChild(n);
        var o = n.offsetTop - s.offsetTop + 2;
        t.removeChild(s), t.appendChild(this._document.createTextNode(oB)), t.style.lineHeight = "normal", n.style.verticalAlign = "super";
        var l = n.offsetTop - t.offsetTop + 2;
        return i.removeChild(t), {
          baseline: o,
          middle: l
        };
      }, e.prototype.getMetrics = function(A, r) {
        var t = A + " " + r;
        return typeof this._data[t] == "undefined" && (this._data[t] = this.parseMetrics(A, r)), this._data[t];
      }, e;
    })(), lB = /* @__PURE__ */ (function() {
      function e(A, r) {
        this.context = A, this.options = r;
      }
      return e;
    })(), Lc = 1e4, _c = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n._activeEffects = [], n.canvas = t.canvas ? t.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), t.canvas || (n.canvas.width = Math.floor(t.width * t.scale), n.canvas.height = Math.floor(t.height * t.scale), n.canvas.style.width = t.width + "px", n.canvas.style.height = t.height + "px"), n.fontMetrics = new Kc(document), n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-t.x, -t.y), n.ctx.textBaseline = "bottom", n._activeEffects = [], n.context.logger.debug("Canvas renderer initialized (" + t.width + "x" + t.height + ") with scale " + t.scale), n;
      }
      return A.prototype.applyEffects = function(r) {
        for (var t = this; this._activeEffects.length; ) this.popEffect();
        r.forEach(function(n) {
          return t.applyEffect(n);
        });
      }, A.prototype.applyEffect = function(r) {
        this.ctx.save(), hc(r) && (this.ctx.globalAlpha = r.opacity), Uc(r) && (this.ctx.translate(r.offsetX, r.offsetY), this.ctx.transform(r.matrix[0], r.matrix[1], r.matrix[2], r.matrix[3], r.matrix[4], r.matrix[5]), this.ctx.translate(-r.offsetX, -r.offsetY)), tB(r) && (this.path(r.path), this.ctx.clip()), this._activeEffects.push(r);
      }, A.prototype.popEffect = function() {
        this._activeEffects.pop(), this.ctx.restore();
      }, A.prototype.renderStack = function(r) {
        return w(this, void 0, void 0, function() {
          var t;
          return F(this, function(n) {
            switch (n.label) {
              case 0:
                return t = r.element.container.styles, t.isVisible() ? [4, this.renderStackContent(r)] : [3, 2];
              case 1:
                n.sent(), n.label = 2;
              case 2:
                return [2];
            }
          });
        });
      }, A.prototype.renderNode = function(r) {
        return w(this, void 0, void 0, function() {
          return F(this, function(t) {
            switch (t.label) {
              case 0:
                if (oA(r.container.flags, 16)) debugger;
                return r.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(r)] : [3, 3];
              case 1:
                return t.sent(), [4, this.renderNodeContent(r)];
              case 2:
                t.sent(), t.label = 3;
              case 3:
                return [2];
            }
          });
        });
      }, A.prototype.renderTextWithLetterSpacing = function(r, t, n) {
        var s = this;
        t === 0 ? this.ctx.fillText(r.text, r.bounds.left, r.bounds.top + n) : Yr(r.text).reduce(function(i, o) {
          return s.ctx.fillText(o, i, r.bounds.top + n), i + s.ctx.measureText(o).width;
        }, r.bounds.left);
      }, A.prototype.createFontStyle = function(r) {
        var t = r.fontVariant.filter(function(i) {
          return i === "normal" || i === "small-caps";
        }).join(""), n = Nc(r.fontFamily).join(", "), s = qe(r.fontSize) ? "" + r.fontSize.number + r.fontSize.unit : r.fontSize.number + "px";
        return [
          [
            r.fontStyle,
            t,
            r.fontWeight,
            s,
            n
          ].join(" "),
          n,
          s
        ];
      }, A.prototype.renderTextNode = function(r, t) {
        return w(this, void 0, void 0, function() {
          var n, s, i, o, l, g, Q, f, h = this;
          return F(this, function(m) {
            return n = this.createFontStyle(t), s = n[0], i = n[1], o = n[2], this.ctx.font = s, this.ctx.direction = t.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", l = this.fontMetrics.getMetrics(i, o), g = l.baseline, Q = l.middle, f = t.paintOrder, r.textBounds.forEach(function(E) {
              f.forEach(function(H) {
                switch (H) {
                  case 0:
                    h.ctx.fillStyle = lA(t.color), h.renderTextWithLetterSpacing(E, t.letterSpacing, g);
                    var R = t.textShadow;
                    R.length && E.text.trim().length && (R.slice(0).reverse().forEach(function(D) {
                      h.ctx.shadowColor = lA(D.color), h.ctx.shadowOffsetX = D.offsetX.number * h.options.scale, h.ctx.shadowOffsetY = D.offsetY.number * h.options.scale, h.ctx.shadowBlur = D.blur.number, h.renderTextWithLetterSpacing(E, t.letterSpacing, g);
                    }), h.ctx.shadowColor = "", h.ctx.shadowOffsetX = 0, h.ctx.shadowOffsetY = 0, h.ctx.shadowBlur = 0), t.textDecorationLine.length && (h.ctx.fillStyle = lA(t.textDecorationColor || t.color), t.textDecorationLine.forEach(function(D) {
                      switch (D) {
                        case 1:
                          h.ctx.fillRect(E.bounds.left, Math.round(E.bounds.top + g), E.bounds.width, 1);
                          break;
                        case 2:
                          h.ctx.fillRect(E.bounds.left, Math.round(E.bounds.top), E.bounds.width, 1);
                          break;
                        case 3:
                          h.ctx.fillRect(E.bounds.left, Math.ceil(E.bounds.top + Q), E.bounds.width, 1);
                      }
                    }));
                    break;
                  case 1:
                    t.webkitTextStrokeWidth && E.text.trim().length && (h.ctx.strokeStyle = lA(t.webkitTextStrokeColor), h.ctx.lineWidth = t.webkitTextStrokeWidth, h.ctx.lineJoin = window.chrome ? "miter" : "round", h.ctx.strokeText(E.text, E.bounds.left, E.bounds.top + g)), h.ctx.strokeStyle = "", h.ctx.lineWidth = 0, h.ctx.lineJoin = "miter";
                }
              });
            }), [2];
          });
        });
      }, A.prototype.renderReplacedElement = function(r, t, n) {
        if (n && r.intrinsicWidth > 0 && r.intrinsicHeight > 0) {
          var s = $t(r), i = qt(t);
          this.path(i), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(n, 0, 0, r.intrinsicWidth, r.intrinsicHeight, s.left, s.top, s.width, s.height), this.ctx.restore();
        }
      }, A.prototype.renderNodeContent = function(r) {
        return w(this, void 0, void 0, function() {
          var t, n, s, i, o, l, L, L, g, Q, f, h, X, m, E, T, H, R, D, L, eA, X, T;
          return F(this, function(b) {
            switch (b.label) {
              case 0:
                this.applyEffects(r.getEffects(4)), t = r.container, n = r.curves, s = t.styles, i = 0, o = t.textNodes, b.label = 1;
              case 1:
                return i < o.length ? (l = o[i], [4, this.renderTextNode(l, s)]) : [3, 4];
              case 2:
                b.sent(), b.label = 3;
              case 3:
                return i++, [3, 1];
              case 4:
                if (!(t instanceof ys)) return [3, 8];
                b.label = 5;
              case 5:
                return b.trys.push([
                  5,
                  7,
                  ,
                  8
                ]), [4, this.context.cache.match(t.src)];
              case 6:
                return L = b.sent(), this.renderReplacedElement(t, n, L), [3, 8];
              case 7:
                return b.sent(), this.context.logger.error("Error loading image " + t.src), [3, 8];
              case 8:
                if (t instanceof bs && this.renderReplacedElement(t, n, t.canvas), !(t instanceof Ks)) return [3, 12];
                b.label = 9;
              case 9:
                return b.trys.push([
                  9,
                  11,
                  ,
                  12
                ]), [4, this.context.cache.match(t.svg)];
              case 10:
                return L = b.sent(), this.renderReplacedElement(t, n, L), [3, 12];
              case 11:
                return b.sent(), this.context.logger.error("Error loading svg " + t.svg.substring(0, 255)), [3, 12];
              case 12:
                return t instanceof Ts && t.tree ? (g = new A(this.context, {
                  scale: this.options.scale,
                  backgroundColor: t.backgroundColor,
                  x: 0,
                  y: 0,
                  width: t.width,
                  height: t.height
                }), [4, g.render(t.tree)]) : [3, 14];
              case 13:
                Q = b.sent(), t.width && t.height && this.ctx.drawImage(Q, 0, 0, t.width, t.height, t.bounds.left, t.bounds.top, t.bounds.width, t.bounds.height), b.label = 14;
              case 14:
                if (t instanceof qr && (f = Math.min(t.bounds.width, t.bounds.height), t.type === Vt ? t.checked && (this.ctx.save(), this.path([
                  new y(t.bounds.left + f * 0.39363, t.bounds.top + f * 0.79),
                  new y(t.bounds.left + f * 0.16, t.bounds.top + f * 0.5549),
                  new y(t.bounds.left + f * 0.27347, t.bounds.top + f * 0.44071),
                  new y(t.bounds.left + f * 0.39694, t.bounds.top + f * 0.5649),
                  new y(t.bounds.left + f * 0.72983, t.bounds.top + f * 0.23),
                  new y(t.bounds.left + f * 0.84, t.bounds.top + f * 0.34085),
                  new y(t.bounds.left + f * 0.39363, t.bounds.top + f * 0.79)
                ]), this.ctx.fillStyle = lA(_s), this.ctx.fill(), this.ctx.restore()) : t.type === kt && t.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(t.bounds.left + f / 2, t.bounds.top + f / 2, f / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = lA(_s), this.ctx.fill(), this.ctx.restore())), Dc(t) && t.value.length) {
                  switch (h = this.createFontStyle(s), X = h[0], m = h[1], E = this.fontMetrics.getMetrics(X, m).baseline, this.ctx.font = X, this.ctx.fillStyle = lA(s.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = Tc(t.styles.textAlign), T = $t(t), H = 0, t.styles.textAlign) {
                    case 1:
                      H += T.width / 2;
                      break;
                    case 2:
                      H += T.width;
                  }
                  R = T.add(H, 0, 0, -T.height / 2 + 1), this.ctx.save(), this.path([
                    new y(T.left, T.top),
                    new y(T.left + T.width, T.top),
                    new y(T.left + T.width, T.top + T.height),
                    new y(T.left, T.top + T.height)
                  ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new et(t.value, R), s.letterSpacing, E), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
                }
                if (!oA(t.styles.display, 2048)) return [3, 20];
                if (t.styles.listStyleImage === null) return [3, 19];
                if (D = t.styles.listStyleImage, D.type !== 0) return [3, 18];
                L = void 0, eA = D.url, b.label = 15;
              case 15:
                return b.trys.push([
                  15,
                  17,
                  ,
                  18
                ]), [4, this.context.cache.match(eA)];
              case 16:
                return L = b.sent(), this.ctx.drawImage(L, t.bounds.left - (L.width + 10), t.bounds.top), [3, 18];
              case 17:
                return b.sent(), this.context.logger.error("Error loading list-style-image " + eA), [3, 18];
              case 18:
                return [3, 20];
              case 19:
                r.listValue && t.styles.listStyleType !== -1 && (X = this.createFontStyle(s)[0], this.ctx.font = X, this.ctx.fillStyle = lA(s.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", T = new v(t.bounds.left, t.bounds.top + AA(t.styles.paddingTop, t.bounds.width), t.bounds.width, os(s.lineHeight, s.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new et(r.listValue, T), s.letterSpacing, os(s.lineHeight, s.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), b.label = 20;
              case 20:
                return [2];
            }
          });
        });
      }, A.prototype.renderStackContent = function(r) {
        return w(this, void 0, void 0, function() {
          var t, n, D, s, i, D, o, l, D, g, Q, D, f, h, D, m, E, D, H, R, D;
          return F(this, function(L) {
            switch (L.label) {
              case 0:
                if (oA(r.element.container.flags, 16)) debugger;
                return [4, this.renderNodeBackgroundAndBorders(r.element)];
              case 1:
                L.sent(), t = 0, n = r.negativeZIndex, L.label = 2;
              case 2:
                return t < n.length ? (D = n[t], [4, this.renderStack(D)]) : [3, 5];
              case 3:
                L.sent(), L.label = 4;
              case 4:
                return t++, [3, 2];
              case 5:
                return [4, this.renderNodeContent(r.element)];
              case 6:
                L.sent(), s = 0, i = r.nonInlineLevel, L.label = 7;
              case 7:
                return s < i.length ? (D = i[s], [4, this.renderNode(D)]) : [3, 10];
              case 8:
                L.sent(), L.label = 9;
              case 9:
                return s++, [3, 7];
              case 10:
                o = 0, l = r.nonPositionedFloats, L.label = 11;
              case 11:
                return o < l.length ? (D = l[o], [4, this.renderStack(D)]) : [3, 14];
              case 12:
                L.sent(), L.label = 13;
              case 13:
                return o++, [3, 11];
              case 14:
                g = 0, Q = r.nonPositionedInlineLevel, L.label = 15;
              case 15:
                return g < Q.length ? (D = Q[g], [4, this.renderStack(D)]) : [3, 18];
              case 16:
                L.sent(), L.label = 17;
              case 17:
                return g++, [3, 15];
              case 18:
                f = 0, h = r.inlineLevel, L.label = 19;
              case 19:
                return f < h.length ? (D = h[f], [4, this.renderNode(D)]) : [3, 22];
              case 20:
                L.sent(), L.label = 21;
              case 21:
                return f++, [3, 19];
              case 22:
                m = 0, E = r.zeroOrAutoZIndexOrTransformedOrOpacity, L.label = 23;
              case 23:
                return m < E.length ? (D = E[m], [4, this.renderStack(D)]) : [3, 26];
              case 24:
                L.sent(), L.label = 25;
              case 25:
                return m++, [3, 23];
              case 26:
                H = 0, R = r.positiveZIndex, L.label = 27;
              case 27:
                return H < R.length ? (D = R[H], [4, this.renderStack(D)]) : [3, 30];
              case 28:
                L.sent(), L.label = 29;
              case 29:
                return H++, [3, 27];
              case 30:
                return [2];
            }
          });
        });
      }, A.prototype.mask = function(r) {
        this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(r.slice(0).reverse()), this.ctx.closePath();
      }, A.prototype.path = function(r) {
        this.ctx.beginPath(), this.formatPath(r), this.ctx.closePath();
      }, A.prototype.formatPath = function(r) {
        var t = this;
        r.forEach(function(n, s) {
          var i = SA(n) ? n.start : n;
          s === 0 ? t.ctx.moveTo(i.x, i.y) : t.ctx.lineTo(i.x, i.y), SA(n) && t.ctx.bezierCurveTo(n.startControl.x, n.startControl.y, n.endControl.x, n.endControl.y, n.end.x, n.end.y);
        });
      }, A.prototype.renderRepeat = function(r, t, n, s) {
        this.path(r), this.ctx.fillStyle = t, this.ctx.translate(n, s), this.ctx.fill(), this.ctx.translate(-n, -s);
      }, A.prototype.resizeImage = function(r, t, n) {
        var s;
        if (r.width === t && r.height === n) return r;
        var i = ((s = this.canvas.ownerDocument) !== null && s !== void 0 ? s : document).createElement("canvas");
        return i.width = Math.max(1, t), i.height = Math.max(1, n), i.getContext("2d").drawImage(r, 0, 0, r.width, r.height, 0, 0, t, n), i;
      }, A.prototype.renderBackgroundImage = function(r) {
        return w(this, void 0, void 0, function() {
          var t, n, s, i, o, l;
          return F(this, function(g) {
            switch (g.label) {
              case 0:
                t = r.styles.backgroundImage.length - 1, n = function(Q) {
                  var f, h, m, iA, pA, EA, j, QA, k, E, iA, pA, EA, j, QA, H, R, D, L, eA, X, T, b, V, k, O, iA, dA, mA, j, QA, ae, pA, EA, Ce, JA, oe, fe, Ue, qA, he, jA;
                  return F(this, function(Te) {
                    switch (Te.label) {
                      case 0:
                        if (Q.type !== 0) return [3, 5];
                        f = void 0, h = Q.url, Te.label = 1;
                      case 1:
                        return Te.trys.push([
                          1,
                          3,
                          ,
                          4
                        ]), [4, s.context.cache.match(h)];
                      case 2:
                        return f = Te.sent(), [3, 4];
                      case 3:
                        return Te.sent(), s.context.logger.error("Error loading background-image " + h), [3, 4];
                      case 4:
                        return f && (m = an(r, t, [
                          f.width,
                          f.height,
                          f.width / f.height
                        ]), iA = m[0], pA = m[1], EA = m[2], j = m[3], QA = m[4], k = s.ctx.createPattern(s.resizeImage(f, j, QA), "repeat"), s.renderRepeat(iA, k, pA, EA)), [3, 6];
                      case 5:
                        Ea(Q) ? (E = an(r, t, [
                          null,
                          null,
                          null
                        ]), iA = E[0], pA = E[1], EA = E[2], j = E[3], QA = E[4], H = Ua(Q.angle, j, QA), R = H[0], D = H[1], L = H[2], eA = H[3], X = H[4], T = document.createElement("canvas"), T.width = j, T.height = QA, b = T.getContext("2d"), V = b.createLinearGradient(D, eA, L, X), zn(Q.stops, R).forEach(function(st) {
                          return V.addColorStop(st.stop, lA(st.color));
                        }), b.fillStyle = V, b.fillRect(0, 0, j, QA), j > 0 && QA > 0 && (k = s.ctx.createPattern(T, "repeat"), s.renderRepeat(iA, k, pA, EA))) : va(Q) && (O = an(r, t, [
                          null,
                          null,
                          null
                        ]), iA = O[0], dA = O[1], mA = O[2], j = O[3], QA = O[4], ae = Q.position.length === 0 ? [Dr] : Q.position, pA = AA(ae[0], j), EA = AA(ae[ae.length - 1], QA), Ce = ha(Q, pA, EA, j, QA), JA = Ce[0], oe = Ce[1], JA > 0 && oe > 0 && (fe = s.ctx.createRadialGradient(dA + pA, mA + EA, 0, dA + pA, mA + EA, JA), zn(Q.stops, JA * 2).forEach(function(st) {
                          return fe.addColorStop(st.stop, lA(st.color));
                        }), s.path(iA), s.ctx.fillStyle = fe, JA !== oe ? (Ue = r.bounds.left + 0.5 * r.bounds.width, qA = r.bounds.top + 0.5 * r.bounds.height, he = oe / JA, jA = 1 / he, s.ctx.save(), s.ctx.translate(Ue, qA), s.ctx.transform(1, 0, 0, he, 0, 0), s.ctx.translate(-Ue, -qA), s.ctx.fillRect(dA, jA * (mA - qA) + qA, j, QA * jA), s.ctx.restore()) : s.ctx.fill())), Te.label = 6;
                      case 6:
                        return t--, [2];
                    }
                  });
                }, s = this, i = 0, o = r.styles.backgroundImage.slice(0).reverse(), g.label = 1;
              case 1:
                return i < o.length ? (l = o[i], [5, n(l)]) : [3, 4];
              case 2:
                g.sent(), g.label = 3;
              case 3:
                return i++, [3, 1];
              case 4:
                return [2];
            }
          });
        });
      }, A.prototype.renderSolidBorder = function(r, t, n) {
        return w(this, void 0, void 0, function() {
          return F(this, function(s) {
            return this.path(iB(n, t)), this.ctx.fillStyle = lA(r), this.ctx.fill(), [2];
          });
        });
      }, A.prototype.renderDoubleBorder = function(r, t, n, s) {
        return w(this, void 0, void 0, function() {
          var i, o;
          return F(this, function(l) {
            switch (l.label) {
              case 0:
                return t < 3 ? [4, this.renderSolidBorder(r, n, s)] : [3, 2];
              case 1:
                return l.sent(), [2];
              case 2:
                return i = pc(s, n), this.path(i), this.ctx.fillStyle = lA(r), this.ctx.fill(), o = Ec(s, n), this.path(o), this.ctx.fill(), [2];
            }
          });
        });
      }, A.prototype.renderNodeBackgroundAndBorders = function(r) {
        return w(this, void 0, void 0, function() {
          var t, n, s, i, o, l, g, Q, f = this;
          return F(this, function(h) {
            switch (h.label) {
              case 0:
                return this.applyEffects(r.getEffects(2)), t = r.container.styles, n = !ne(t.backgroundColor) || t.backgroundImage.length, s = [
                  {
                    style: t.borderTopStyle,
                    color: t.borderTopColor,
                    width: t.borderTopWidth
                  },
                  {
                    style: t.borderRightStyle,
                    color: t.borderRightColor,
                    width: t.borderRightWidth
                  },
                  {
                    style: t.borderBottomStyle,
                    color: t.borderBottomColor,
                    width: t.borderBottomWidth
                  },
                  {
                    style: t.borderLeftStyle,
                    color: t.borderLeftColor,
                    width: t.borderLeftWidth
                  }
                ], i = Sc(Se(t.backgroundClip, 0), r.curves), n || t.boxShadow.length ? (this.ctx.save(), this.path(i), this.ctx.clip(), ne(t.backgroundColor) || (this.ctx.fillStyle = lA(t.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(r.container)]) : [3, 2];
              case 1:
                h.sent(), this.ctx.restore(), t.boxShadow.slice(0).reverse().forEach(function(m) {
                  f.ctx.save();
                  var E = Zt(r.curves), H = m.inset ? 0 : Lc, R = Fc(E, -H + (m.inset ? 1 : -1) * m.spread.number, (m.inset ? 1 : -1) * m.spread.number, m.spread.number * (m.inset ? -2 : 2), m.spread.number * (m.inset ? -2 : 2));
                  m.inset ? (f.path(E), f.ctx.clip(), f.mask(R)) : (f.mask(E), f.ctx.clip(), f.path(R)), f.ctx.shadowOffsetX = m.offsetX.number + H, f.ctx.shadowOffsetY = m.offsetY.number, f.ctx.shadowColor = lA(m.color), f.ctx.shadowBlur = m.blur.number, f.ctx.fillStyle = m.inset ? lA(m.color) : "rgba(0,0,0,1)", f.ctx.fill(), f.ctx.restore();
                }), h.label = 2;
              case 2:
                o = 0, l = 0, g = s, h.label = 3;
              case 3:
                return l < g.length ? (Q = g[l], Q.style !== 0 && !ne(Q.color) && Q.width > 0 ? Q.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(Q.color, Q.width, o, r.curves, 2)] : [3, 11]) : [3, 13];
              case 4:
                return h.sent(), [3, 11];
              case 5:
                return Q.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(Q.color, Q.width, o, r.curves, 3)];
              case 6:
                return h.sent(), [3, 11];
              case 7:
                return Q.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(Q.color, Q.width, o, r.curves)];
              case 8:
                return h.sent(), [3, 11];
              case 9:
                return [4, this.renderSolidBorder(Q.color, o, r.curves)];
              case 10:
                h.sent(), h.label = 11;
              case 11:
                o++, h.label = 12;
              case 12:
                return l++, [3, 3];
              case 13:
                return [2];
            }
          });
        });
      }, A.prototype.renderDashedDottedBorder = function(r, t, n, s, i) {
        return w(this, void 0, void 0, function() {
          var o, l, g, Q, f, h, m, E, H, R, D, L, eA, X, T, b, T, b;
          return F(this, function(V) {
            return this.ctx.save(), o = vc(s, n), l = iB(s, n), i === 2 && (this.path(l), this.ctx.clip()), SA(l[0]) ? (g = l[0].start.x, Q = l[0].start.y) : (g = l[0].x, Q = l[0].y), SA(l[1]) ? (f = l[1].end.x, h = l[1].end.y) : (f = l[1].x, h = l[1].y), n === 0 || n === 2 ? m = Math.abs(g - f) : m = Math.abs(Q - h), this.ctx.beginPath(), i === 3 ? this.formatPath(o) : this.formatPath(l.slice(0, 2)), E = t < 3 ? t * 3 : t * 2, H = t < 3 ? t * 2 : t, i === 3 && (E = t, H = t), R = !0, m <= E * 2 ? R = !1 : m <= E * 2 + H ? (D = m / (2 * E + H), E *= D, H *= D) : (L = Math.floor((m + H) / (E + H)), eA = (m - L * E) / (L - 1), X = (m - (L + 1) * E) / L, H = X <= 0 || Math.abs(H - eA) < Math.abs(H - X) ? eA : X), R && (i === 3 ? this.ctx.setLineDash([0, E + H]) : this.ctx.setLineDash([E, H])), i === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = t) : this.ctx.lineWidth = t * 2 + 1.1, this.ctx.strokeStyle = lA(r), this.ctx.stroke(), this.ctx.setLineDash([]), i === 2 && (SA(l[0]) && (T = l[3], b = l[0], this.ctx.beginPath(), this.formatPath([new y(T.end.x, T.end.y), new y(b.start.x, b.start.y)]), this.ctx.stroke()), SA(l[1]) && (T = l[1], b = l[2], this.ctx.beginPath(), this.formatPath([new y(T.end.x, T.end.y), new y(b.start.x, b.start.y)]), this.ctx.stroke())), this.ctx.restore(), [2];
          });
        });
      }, A.prototype.render = function(r) {
        return w(this, void 0, void 0, function() {
          var t;
          return F(this, function(n) {
            switch (n.label) {
              case 0:
                return this.options.backgroundColor && (this.ctx.fillStyle = lA(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), t = dc(r), [4, this.renderStack(t)];
              case 1:
                return n.sent(), this.applyEffects([]), [2, this.canvas];
            }
          });
        });
      }, A;
    })(lB), Dc = function(e) {
      return e instanceof Ss || e instanceof Ds ? !0 : e instanceof qr && e.type !== kt && e.type !== Vt;
    }, Sc = function(e, A) {
      switch (e) {
        case 0:
          return Zt(A);
        case 2:
          return wc(A);
        default:
          return qt(A);
      }
    }, Tc = function(e) {
      switch (e) {
        case 1:
          return "center";
        case 2:
          return "right";
        default:
          return "left";
      }
    }, Oc = ["-apple-system", "system-ui"], Nc = function(e) {
      return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? e.filter(function(A) {
        return Oc.indexOf(A) === -1;
      }) : e;
    }, Mc = (function(e) {
      u(A, e);
      function A(r, t) {
        var n = e.call(this, r, t) || this;
        return n.canvas = t.canvas ? t.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), n.options = t, n.canvas.width = Math.floor(t.width * t.scale), n.canvas.height = Math.floor(t.height * t.scale), n.canvas.style.width = t.width + "px", n.canvas.style.height = t.height + "px", n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-t.x, -t.y), n.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + t.width + "x" + t.height + " at " + t.x + "," + t.y + ") with scale " + t.scale), n;
      }
      return A.prototype.render = function(r) {
        return w(this, void 0, void 0, function() {
          var t, n;
          return F(this, function(s) {
            switch (s.label) {
              case 0:
                return t = Wr(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, r), [4, xc(t)];
              case 1:
                return n = s.sent(), this.options.backgroundColor && (this.ctx.fillStyle = lA(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(n, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
            }
          });
        });
      }, A;
    })(lB), xc = function(e) {
      return new Promise(function(A, r) {
        var t = new Image();
        t.onload = function() {
          A(t);
        }, t.onerror = r, t.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
      });
    }, Rc = (function() {
      function e(A) {
        var r = A.id, t = A.enabled;
        this.id = r, this.enabled = t, this.start = Date.now();
      }
      return e.prototype.debug = function() {
        for (var A = [], r = 0; r < arguments.length; r++) A[r] = arguments[r];
        this.enabled && (typeof window != "undefined" && window.console && typeof console.debug == "function" ? console.debug.apply(console, p([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
      }, e.prototype.getTime = function() {
        return Date.now() - this.start;
      }, e.prototype.info = function() {
        for (var A = [], r = 0; r < arguments.length; r++) A[r] = arguments[r];
        this.enabled && typeof window != "undefined" && window.console && typeof console.info == "function" && console.info.apply(console, p([this.id, this.getTime() + "ms"], A));
      }, e.prototype.warn = function() {
        for (var A = [], r = 0; r < arguments.length; r++) A[r] = arguments[r];
        this.enabled && (typeof window != "undefined" && window.console && typeof console.warn == "function" ? console.warn.apply(console, p([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
      }, e.prototype.error = function() {
        for (var A = [], r = 0; r < arguments.length; r++) A[r] = arguments[r];
        this.enabled && (typeof window != "undefined" && window.console && typeof console.error == "function" ? console.error.apply(console, p([this.id, this.getTime() + "ms"], A)) : this.info.apply(this, A));
      }, e.instances = {}, e;
    })(), Gc = (function() {
      function e(A, r) {
        var t;
        this.windowBounds = r, this.instanceName = "#" + e.instanceCount++, this.logger = new Rc({
          id: this.instanceName,
          enabled: A.logging
        }), this.cache = (t = A.cache) !== null && t !== void 0 ? t : new ic(this, A);
      }
      return e.instanceCount = 1, e;
    })(), Vc = function(e, A) {
      return A === void 0 && (A = {}), kc(e, A);
    };
    typeof window != "undefined" && eB.setContext(window);
    var kc = function(e, A) {
      return w(void 0, void 0, void 0, function() {
        var r, t, n, s, i, o, l, g, Q, f, h, m, E, H, R, D, L, eA, X, T, V, b, V, k, O, iA, dA, mA, j, QA, ae, pA, EA, Ce, JA, oe, fe, Ue, qA, he;
        return F(this, function(jA) {
          switch (jA.label) {
            case 0:
              if (!e || typeof e != "object") return [2, Promise.reject("Invalid element provided as first argument")];
              if (r = e.ownerDocument, !r) throw new Error("Element is not attached to a Document");
              if (t = r.defaultView, !t) throw new Error("Document is not attached to a Window");
              return n = {
                allowTaint: (k = A.allowTaint) !== null && k !== void 0 ? k : !1,
                imageTimeout: (O = A.imageTimeout) !== null && O !== void 0 ? O : 15e3,
                proxy: A.proxy,
                useCORS: (iA = A.useCORS) !== null && iA !== void 0 ? iA : !1
              }, s = U({
                logging: (dA = A.logging) !== null && dA !== void 0 ? dA : !0,
                cache: A.cache
              }, n), i = {
                windowWidth: (mA = A.windowWidth) !== null && mA !== void 0 ? mA : t.innerWidth,
                windowHeight: (j = A.windowHeight) !== null && j !== void 0 ? j : t.innerHeight,
                scrollX: (QA = A.scrollX) !== null && QA !== void 0 ? QA : t.pageXOffset,
                scrollY: (ae = A.scrollY) !== null && ae !== void 0 ? ae : t.pageYOffset
              }, o = new v(i.scrollX, i.scrollY, i.windowWidth, i.windowHeight), l = new Gc(s, o), g = (pA = A.foreignObjectRendering) !== null && pA !== void 0 ? pA : !1, Q = {
                allowTaint: (EA = A.allowTaint) !== null && EA !== void 0 ? EA : !1,
                onclone: A.onclone,
                ignoreElements: A.ignoreElements,
                inlineImages: g,
                copyStyles: g
              }, l.logger.debug("Starting document clone with size " + o.width + "x" + o.height + " scrolled to " + -o.left + "," + -o.top), f = new $s(l, e, Q), h = f.clonedReferenceElement, h ? [4, f.toIFrame(r, o)] : [2, Promise.reject("Unable to find element in cloned iframe")];
            case 1:
              return m = jA.sent(), E = zr(h) || Pl(h) ? _(h.ownerDocument) : d(l, h), H = E.width, R = E.height, D = E.left, L = E.top, eA = Pc(l, h, A.backgroundColor), X = {
                canvas: A.canvas,
                backgroundColor: eA,
                scale: (JA = (Ce = A.scale) !== null && Ce !== void 0 ? Ce : t.devicePixelRatio) !== null && JA !== void 0 ? JA : 1,
                x: ((oe = A.x) !== null && oe !== void 0 ? oe : 0) + D,
                y: ((fe = A.y) !== null && fe !== void 0 ? fe : 0) + L,
                width: (Ue = A.width) !== null && Ue !== void 0 ? Ue : Math.ceil(H),
                height: (qA = A.height) !== null && qA !== void 0 ? qA : Math.ceil(R)
              }, g ? (l.logger.debug("Document cloned, using foreign object rendering"), V = new Mc(l, X), [4, V.render(h)]) : [3, 3];
            case 2:
              return T = jA.sent(), [3, 5];
            case 3:
              return l.logger.debug("Document cloned, element located at " + D + "," + L + " with size " + H + "x" + R + " using computed rendering"), l.logger.debug("Starting DOM parsing"), b = Ns(l, h), eA === b.styles.backgroundColor && (b.styles.backgroundColor = YA.TRANSPARENT), l.logger.debug("Starting renderer for element at " + X.x + "," + X.y + " with size " + X.width + "x" + X.height), V = new _c(l, X), [4, V.render(b)];
            case 4:
              T = jA.sent(), jA.label = 5;
            case 5:
              return (!((he = A.removeContainer) !== null && he !== void 0) || he) && ($s.destroy(m) || l.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), l.logger.debug("Finished rendering"), [2, T];
          }
        });
      });
    }, Pc = function(e, A, r) {
      var t = A.ownerDocument, n = t.documentElement ? ze(e, getComputedStyle(t.documentElement).backgroundColor) : YA.TRANSPARENT, s = t.body ? ze(e, getComputedStyle(t.body).backgroundColor) : YA.TRANSPARENT, i = typeof r == "string" ? ze(e, r) : r === null ? YA.TRANSPARENT : 4294967295;
      return A === t.documentElement ? ne(n) ? ne(s) ? i : s : n : i;
    };
    return Vc;
  }));
})), wu = /* @__PURE__ */ jc(Qu(), 1), Cu = wu.default;
function fu(B, a) {
  let c;
  try {
    c = new URL(B, a != null ? a : void 0);
  } catch {
    return !1;
  }
  if (c.protocol === "data:" || c.protocol === "blob:") return !1;
  if (!a) return c.protocol === "http:" || c.protocol === "https:";
  let u;
  try {
    u = new URL(a);
  } catch {
    return !1;
  }
  return c.host !== u.host;
}
function Uu(B, a) {
  return `${B.replace(/\/$/, "")}/api/public/proxy-image?url=${encodeURIComponent(a)}`;
}
async function hu(B) {
  const a = typeof location != "undefined" ? location.origin : void 0, c = Array.from(document.images);
  await Promise.all(c.map(async (u) => {
    const U = u.currentSrc || u.src;
    if (!U || !fu(U, a) || U.includes("/api/public/proxy-image")) return;
    const w = Uu(B, U);
    try {
      u.src = w, u.decode && await u.decode();
    } catch {
    }
  }));
}
async function Fu(B, a) {
  try {
    await hu(B);
    const c = a != null ? a : document.documentElement;
    return (await Cu(c, {
      useCORS: !0,
      allowTaint: !1,
      backgroundColor: "#ffffff",
      logging: !1,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    })).toDataURL("image/png");
  } catch {
    return null;
  }
}
function du(B) {
  if (!(B instanceof Element)) throw new Error("generateSelector expects a DOM Element");
  if (B.id) return `${HB(B)}#${B.id}`;
  const a = [];
  let c = B;
  for (; c && c.nodeType === 1 && c !== document.documentElement && c !== document.body; ) {
    let u = HB(c);
    if (c.id) u += `#${c.id}`;
    else {
      const U = c.parentElement;
      if (U && Array.from(U.children).filter((w) => w.tagName === c.tagName).length > 1) {
        const w = Array.from(U.children).indexOf(c) + 1;
        u += `:nth-child(${w})`;
      }
    }
    a.unshift(u), c = c.parentElement;
  }
  return a.join(" > ");
}
function HB(B) {
  return B.tagName.toLowerCase();
}
function pu(B) {
  let a = null;
  const c = (U) => {
    const w = U.target;
    !w || !(w instanceof Element) || (a && a !== w && a.classList.remove("tb-highlight"), a = w, a.classList.add("tb-highlight"));
  }, u = (U) => {
    const w = U.target;
    !w || !(w instanceof Element) || (U.preventDefault(), U.stopPropagation(), B(w, du(w)));
  };
  return document.addEventListener("mousemove", c, !0), document.addEventListener("click", u, !0), () => {
    document.removeEventListener("mousemove", c, !0), document.removeEventListener("click", u, !0), a && a.classList.remove("tb-highlight");
  };
}
var Eu = 0;
function S(B, a, c, u, U, w) {
  a || (a = {});
  var F, p, v = a;
  if ("ref" in v) for (p in v = {}, a) p == "ref" ? F = a[p] : v[p] = a[p];
  var d = {
    type: B,
    props: v,
    key: c,
    ref: F,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: void 0,
    __v: --Eu,
    __i: -1,
    __u: 0,
    __source: U,
    __self: w
  };
  if (typeof B == "function" && (F = B.defaultProps)) for (p in F) v[p] === void 0 && (v[p] = F[p]);
  return $.vnode && $.vnode(d), d;
}
var rA = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/fields.tsx";
function Oe(B) {
  return B == null ? "" : String(B);
}
function vu(B) {
  return B === !0 || B === "true" || B === "on";
}
function Hu(B) {
  var a;
  const { field: c, value: u, error: U, onChange: w } = B, F = (a = c.options) !== null && a !== void 0 ? a : {}, p = /* @__PURE__ */ S("label", {
    class: "tb-label",
    for: `tb-${c.key}`,
    children: [c.label, c.isRequired && /* @__PURE__ */ S("span", {
      class: "tb-req",
      children: " *"
    }, void 0, !1, {
      fileName: rA,
      lineNumber: 24,
      columnNumber: 28
    }, this)]
  }, void 0, !0, {
    fileName: rA,
    lineNumber: 22,
    columnNumber: 5
  }, this);
  let v;
  switch (c.type) {
    case "textarea":
      v = /* @__PURE__ */ S("textarea", {
        id: `tb-${c.key}`,
        class: "tb-textarea",
        placeholder: F.placeholder,
        maxLength: F.maxLength,
        value: Oe(u),
        onInput: (C) => w(C.target.value)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 33,
        columnNumber: 9
      }, this);
      break;
    case "select": {
      var d;
      const C = (d = F.choices) !== null && d !== void 0 ? d : [];
      v = /* @__PURE__ */ S("select", {
        id: `tb-${c.key}`,
        class: "tb-select",
        value: Oe(u),
        onChange: (I) => w(I.target.value),
        children: [/* @__PURE__ */ S("option", {
          value: "",
          children: "—"
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 53,
          columnNumber: 11
        }, this), C.map((I) => /* @__PURE__ */ S("option", {
          value: I,
          selected: I === Oe(u),
          children: I
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 55,
          columnNumber: 13
        }, this))]
      }, void 0, !0, {
        fileName: rA,
        lineNumber: 47,
        columnNumber: 9
      }, this);
      break;
    }
    case "radio": {
      var _;
      const C = (_ = F.choices) !== null && _ !== void 0 ? _ : [];
      v = /* @__PURE__ */ S("div", { children: C.map((I) => /* @__PURE__ */ S("div", {
        class: "tb-radio",
        children: [/* @__PURE__ */ S("input", {
          type: "radio",
          id: `tb-${c.key}-${I}`,
          name: `tb-${c.key}`,
          value: I,
          checked: Oe(u) === I,
          onChange: () => w(I)
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 69,
          columnNumber: 15
        }, this), /* @__PURE__ */ S("label", {
          for: `tb-${c.key}-${I}`,
          children: I
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 77,
          columnNumber: 15
        }, this)]
      }, void 0, !0, {
        fileName: rA,
        lineNumber: 68,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: rA,
        lineNumber: 66,
        columnNumber: 9
      }, this);
      break;
    }
    case "checkbox": {
      var N;
      const C = (N = F.choices) !== null && N !== void 0 ? N : [];
      if (C.length > 0) {
        const I = Array.isArray(u) ? u : [];
        v = /* @__PURE__ */ S("div", { children: C.map((M) => /* @__PURE__ */ S("div", {
          class: "tb-check",
          children: [/* @__PURE__ */ S("input", {
            type: "checkbox",
            id: `tb-${c.key}-${M}`,
            value: M,
            checked: I.includes(M),
            onChange: (J) => {
              const Z = J.target.checked ? [...I, M] : I.filter((W) => W !== M);
              w(Z);
            }
          }, void 0, !1, {
            fileName: rA,
            lineNumber: 92,
            columnNumber: 17
          }, this), /* @__PURE__ */ S("label", {
            for: `tb-${c.key}-${M}`,
            children: M
          }, void 0, !1, {
            fileName: rA,
            lineNumber: 103,
            columnNumber: 17
          }, this)]
        }, void 0, !0, {
          fileName: rA,
          lineNumber: 91,
          columnNumber: 15
        }, this)) }, void 0, !1, {
          fileName: rA,
          lineNumber: 89,
          columnNumber: 11
        }, this);
      } else v = /* @__PURE__ */ S("div", {
        class: "tb-check",
        children: /* @__PURE__ */ S("input", {
          type: "checkbox",
          id: `tb-${c.key}`,
          checked: vu(u),
          onChange: (I) => w(I.target.checked)
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 111,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 110,
        columnNumber: 11
      }, this);
      break;
    }
    case "number":
      v = /* @__PURE__ */ S("input", {
        id: `tb-${c.key}`,
        class: "tb-input",
        type: "number",
        min: F.min,
        max: F.max,
        value: u == null ? "" : Number(u),
        onInput: (C) => w(C.target.valueAsNumber)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 124,
        columnNumber: 9
      }, this);
      break;
    case "date":
      v = /* @__PURE__ */ S("input", {
        id: `tb-${c.key}`,
        class: "tb-input",
        type: "date",
        value: Oe(u),
        onChange: (C) => w(C.target.value)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 138,
        columnNumber: 9
      }, this);
      break;
    case "file":
      v = /* @__PURE__ */ S("input", {
        id: `tb-${c.key}`,
        class: "tb-input",
        type: "file",
        accept: F.accept,
        onChange: (C) => w(C.target.value)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 150,
        columnNumber: 9
      }, this);
      break;
    case "severity-scale": {
      const C = typeof F.scaleMin == "number" ? F.scaleMin : 1, I = typeof F.scaleMax == "number" ? F.scaleMax : 5, M = [];
      for (let J = C; J <= I; J++) M.push(J);
      v = /* @__PURE__ */ S("div", {
        class: "tb-scale",
        children: M.map((J) => /* @__PURE__ */ S("button", {
          type: "button",
          class: Number(u) === J ? "active" : "",
          onClick: () => w(J),
          children: J
        }, void 0, !1, {
          fileName: rA,
          lineNumber: 168,
          columnNumber: 13
        }, this))
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 166,
        columnNumber: 9
      }, this);
      break;
    }
    default:
      v = /* @__PURE__ */ S("input", {
        id: `tb-${c.key}`,
        class: "tb-input",
        type: "text",
        placeholder: F.placeholder,
        maxLength: F.maxLength,
        value: Oe(u),
        onInput: (C) => w(C.target.value)
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 183,
        columnNumber: 9
      }, this);
  }
  return /* @__PURE__ */ S("div", {
    class: "tb-field",
    children: [
      p,
      v,
      U && /* @__PURE__ */ S("div", {
        class: "tb-error",
        children: U
      }, void 0, !1, {
        fileName: rA,
        lineNumber: 201,
        columnNumber: 17
      }, this)
    ]
  }, void 0, !0, {
    fileName: rA,
    lineNumber: 198,
    columnNumber: 5
  }, this);
}
var mB = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/form.tsx";
function JB(B, a) {
  const c = B.showIf;
  if (!c || !c.fieldKey) return !0;
  const u = a[c.fieldKey];
  return "equals" in c ? u === c.equals : "notEquals" in c ? u !== c.notEquals : "in" in c && Array.isArray(c.in) ? c.in.includes(u) : !0;
}
function mu(B) {
  const a = B.fields.filter((c) => JB(c, B.values));
  return /* @__PURE__ */ S("div", { children: a.map((c) => /* @__PURE__ */ S(Hu, {
    field: c,
    value: B.values[c.key],
    error: B.errors[c.key],
    onChange: (u) => B.onChange(c.key, u)
  }, c.key, !1, {
    fileName: mB,
    lineNumber: 38,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: mB,
    lineNumber: 36,
    columnNumber: 5
  }, this);
}
var WB = "trackboard:offline-queue";
function Iu() {
  return typeof navigator == "undefined" ? !0 : navigator.onLine !== !1;
}
function yu() {
  try {
    const B = localStorage.getItem(WB);
    if (!B) return [];
    const a = JSON.parse(B);
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}
function bu(B) {
  try {
    localStorage.setItem(WB, JSON.stringify(B));
  } catch {
  }
}
function Ku(B) {
  const a = yu();
  return a.push({
    payload: B,
    queuedAt: Date.now(),
    attempts: 0
  }), bu(a), a;
}
async function Lu(B, a, c) {
  const u = `${B.replace(/\/$/, "")}/api/public/reports?key=${encodeURIComponent(a)}`, U = await fetch(u, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(c)
  });
  if (!U.ok) {
    let w;
    try {
      w = await U.json();
    } catch {
      w = null;
    }
    const F = /* @__PURE__ */ new Error(`Report submit failed with status ${U.status}`);
    throw F.status = U.status, F.errors = w, F;
  }
  return U.json();
}
var z = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/app.tsx";
function _u(B, a) {
  return B == null || B === "" ? !0 : Array.isArray(B) ? B.length === 0 : a === "checkbox" && typeof B == "boolean" ? B === !1 : !1;
}
function Du(B) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(B);
}
function Su(B) {
  const { apiBase: a, projectKey: c, i18n: u } = B, [U, w] = IA(!1), [F, p] = IA("idle"), [v, d] = IA(null), [_, N] = IA(null), [C, I] = IA({}), [M, J] = IA({}), [Z, W] = IA(""), [x, UA] = IA(""), [MA, yA] = IA(null), [wA, xA] = IA(null), [vA, ce] = IA(null), [CA, hA] = IA(!1), [lt, $A] = IA(null), RA = EB(null), GA = EB(null);
  pB(() => {
    RA.current || (RA.current = gu()), v === null && F !== "loading" && F !== "error" && (async () => {
      p("loading");
      try {
        const P = await cu(a, c);
        d(P), p("ready");
      } catch (P) {
        N(P instanceof Error ? P.message : "config error"), p("error");
      }
    })();
  }, []), pB(() => () => {
    var P, cA;
    (P = RA.current) === null || P === void 0 || P.stop(), (cA = GA.current) === null || cA === void 0 || cA.call(GA);
  }, []);
  const ct = () => w((P) => !P), gr = (P, cA) => {
    I((bA) => ({
      ...bA,
      [P]: cA
    }));
  }, Qr = () => {
    if (CA) {
      var P;
      (P = GA.current) === null || P === void 0 || P.call(GA), GA.current = null, hA(!1), $A(null);
      return;
    }
    $A(u.t("widget.pinHint"));
    const cA = pu((bA, KA) => {
      ce(KA), GA.current = null, hA(!1), $A(null);
    });
    GA.current = cA, hA(!0);
  }, ut = () => {
    var P, cA;
    const bA = {};
    let KA = !0;
    Z.trim() ? yA(null) : (yA(u.t("widget.fieldRequired")), KA = !1), x.trim() ? Du(x.trim()) ? xA(null) : (xA(u.t("widget.fieldRequired")), KA = !1) : (xA(u.t("widget.emailRequired")), KA = !1);
    for (const OA of (P = v == null || (cA = v.template) === null || cA === void 0 ? void 0 : cA.fields) !== null && P !== void 0 ? P : [])
      OA.isRequired && JB(OA, C) && _u(C[OA.key], OA.type) && (bA[OA.key] = u.t("widget.fieldRequired"), KA = !1);
    return J(bA), KA;
  }, wr = async () => {
    var P, cA, bA;
    if (!ut()) return;
    p("submitting");
    const KA = (P = (cA = RA.current) === null || cA === void 0 ? void 0 : cA.getErrors()) !== null && P !== void 0 ? P : [], OA = KA.filter((LA) => LA.kind === "console").map((LA) => LA.message), Ne = KA.filter((LA) => LA.kind === "network").map((LA) => LA.message), Me = await Fu(a), gt = {
      title: Z.trim(),
      reporterEmail: x.trim(),
      pageUrl: typeof location != "undefined" ? location.href : void 0,
      templateId: v == null || (bA = v.template) === null || bA === void 0 ? void 0 : bA.id,
      fieldValues: C,
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: {
          width: screen.width,
          height: screen.height
        }
      },
      consoleErrors: OA.length ? OA : void 0,
      networkErrors: Ne.length ? Ne : void 0,
      screenshotUrl: Me != null ? Me : void 0
    };
    try {
      var de;
      await Lu(a, c, gt), p("success"), $A(null), (de = RA.current) === null || de === void 0 || de.stop(), RA.current = null;
    } catch (LA) {
      if (!Iu()) {
        var pe;
        Ku(gt), p("success"), $A(u.t("widget.error")), (pe = RA.current) === null || pe === void 0 || pe.stop(), RA.current = null;
        return;
      }
      const VA = LA;
      p("error"), $A(VA.status === 422 ? u.t("widget.fieldRequired") : u.t("widget.error"));
    }
  };
  return U ? /* @__PURE__ */ S("div", {
    class: `tb-root${CA ? " tb-pin-active" : ""}`,
    children: /* @__PURE__ */ S("div", {
      class: "tb-panel",
      children: [
        /* @__PURE__ */ S("div", {
          class: "tb-header",
          children: [/* @__PURE__ */ S("span", {
            class: "tb-title",
            children: u.t("widget.title")
          }, void 0, !1, {
            fileName: z,
            lineNumber: 195,
            columnNumber: 11
          }, this), /* @__PURE__ */ S("button", {
            class: "tb-close",
            "aria-label": u.t("widget.close"),
            onClick: ct,
            children: "×"
          }, void 0, !1, {
            fileName: z,
            lineNumber: 196,
            columnNumber: 11
          }, this)]
        }, void 0, !0, {
          fileName: z,
          lineNumber: 194,
          columnNumber: 9
        }, this),
        lt && /* @__PURE__ */ S("div", {
          class: "tb-banner",
          children: lt
        }, void 0, !1, {
          fileName: z,
          lineNumber: 201,
          columnNumber: 20
        }, this),
        F === "loading" && /* @__PURE__ */ S("div", { children: u.t("widget.sending") }, void 0, !1, {
          fileName: z,
          lineNumber: 203,
          columnNumber: 34
        }, this),
        F === "error" && _ && /* @__PURE__ */ S("div", {
          class: "tb-error",
          children: _
        }, void 0, !1, {
          fileName: z,
          lineNumber: 204,
          columnNumber: 47
        }, this),
        F === "success" && /* @__PURE__ */ S("div", {
          class: "tb-success",
          children: u.t("widget.success")
        }, void 0, !1, {
          fileName: z,
          lineNumber: 206,
          columnNumber: 34
        }, this),
        (F === "ready" || F === "submitting" || F === "error") && v && /* @__PURE__ */ S("div", { children: [
          /* @__PURE__ */ S("div", {
            class: "tb-field",
            children: [
              /* @__PURE__ */ S("label", {
                class: "tb-label",
                for: "tb-title",
                children: [u.t("widget.titleLabel"), /* @__PURE__ */ S("span", {
                  class: "tb-req",
                  children: " *"
                }, void 0, !1, {
                  fileName: z,
                  lineNumber: 213,
                  columnNumber: 17
                }, this)]
              }, void 0, !0, {
                fileName: z,
                lineNumber: 211,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ S("input", {
                id: "tb-title",
                class: "tb-input",
                type: "text",
                placeholder: u.t("widget.titlePlaceholder"),
                value: Z,
                onInput: (P) => W(P.target.value)
              }, void 0, !1, {
                fileName: z,
                lineNumber: 215,
                columnNumber: 15
              }, this),
              MA && /* @__PURE__ */ S("div", {
                class: "tb-error",
                children: MA
              }, void 0, !1, {
                fileName: z,
                lineNumber: 223,
                columnNumber: 30
              }, this)
            ]
          }, void 0, !0, {
            fileName: z,
            lineNumber: 210,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ S("div", {
            class: "tb-field",
            children: [
              /* @__PURE__ */ S("label", {
                class: "tb-label",
                for: "tb-email",
                children: [u.t("widget.emailLabel"), /* @__PURE__ */ S("span", {
                  class: "tb-req",
                  children: " *"
                }, void 0, !1, {
                  fileName: z,
                  lineNumber: 229,
                  columnNumber: 17
                }, this)]
              }, void 0, !0, {
                fileName: z,
                lineNumber: 227,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ S("input", {
                id: "tb-email",
                class: "tb-input",
                type: "email",
                placeholder: u.t("widget.emailPlaceholder"),
                value: x,
                onInput: (P) => UA(P.target.value)
              }, void 0, !1, {
                fileName: z,
                lineNumber: 231,
                columnNumber: 15
              }, this),
              wA && /* @__PURE__ */ S("div", {
                class: "tb-error",
                children: wA
              }, void 0, !1, {
                fileName: z,
                lineNumber: 239,
                columnNumber: 30
              }, this),
              v.project.requireEmailVerification && /* @__PURE__ */ S("div", {
                class: "tb-hint",
                children: u.t("widget.emailRequired")
              }, void 0, !1, {
                fileName: z,
                lineNumber: 241,
                columnNumber: 17
              }, this)
            ]
          }, void 0, !0, {
            fileName: z,
            lineNumber: 226,
            columnNumber: 13
          }, this),
          v.template && /* @__PURE__ */ S(mu, {
            fields: v.template.fields,
            values: C,
            errors: M,
            i18n: u,
            onChange: gr
          }, void 0, !1, {
            fileName: z,
            lineNumber: 246,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ S("div", {
            class: "tb-hint",
            children: u.t("widget.screenshot")
          }, void 0, !1, {
            fileName: z,
            lineNumber: 255,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ S("button", {
            type: "button",
            class: "tb-submit",
            onClick: Qr,
            children: vA ? u.t("widget.pinned", { selector: vA }) : u.t("widget.pin")
          }, void 0, !1, {
            fileName: z,
            lineNumber: 256,
            columnNumber: 13
          }, this),
          vA && /* @__PURE__ */ S("div", {
            class: "tb-pinned",
            children: vA
          }, void 0, !1, {
            fileName: z,
            lineNumber: 259,
            columnNumber: 24
          }, this),
          /* @__PURE__ */ S("button", {
            id: "tb-submit-btn",
            class: "tb-submit",
            disabled: F === "submitting",
            onClick: () => {
              wr();
            },
            children: F === "submitting" ? u.t("widget.sending") : u.t("widget.submit")
          }, void 0, !1, {
            fileName: z,
            lineNumber: 261,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: z,
          lineNumber: 209,
          columnNumber: 11
        }, this)
      ]
    }, void 0, !0, {
      fileName: z,
      lineNumber: 193,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: z,
    lineNumber: 192,
    columnNumber: 5
  }, this) : /* @__PURE__ */ S("div", {
    class: "tb-root",
    children: /* @__PURE__ */ S("button", {
      class: "tb-fab",
      "aria-label": u.t("widget.open"),
      onClick: ct,
      children: "!"
    }, void 0, !1, {
      fileName: z,
      lineNumber: 184,
      columnNumber: 9
    }, this)
  }, void 0, !1, {
    fileName: z,
    lineNumber: 183,
    columnNumber: 7
  }, this);
}
function Tu() {
  return `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .tb-root {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #1f2933;
    line-height: 1.4;
  }
  .tb-fab {
    width: 56px; height: 56px; border-radius: 50%;
    background: #2563eb; color: #fff; border: none; cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,.25); font-size: 22px;
    display: flex; align-items: center; justify-content: center;
  }
  .tb-panel {
    width: 360px; max-width: calc(100vw - 32px); max-height: calc(100vh - 40px);
    overflow: auto; background: #fff; border-radius: 12px; padding: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.28); border: 1px solid #e5e7eb;
  }
  .tb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
  .tb-title { font-weight: 600; font-size: 16px; }
  .tb-close { background: none; border: none; cursor: pointer; font-size: 18px; color: #6b7280; }
  .tb-field { margin-bottom: 12px; display: block; }
  .tb-label { display: block; margin-bottom: 4px; font-weight: 500; }
  .tb-req { color: #dc2626; }
  .tb-input, .tb-select, .tb-textarea {
    width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px;
    font: inherit; background: #fff; color: inherit;
  }
  .tb-textarea { min-height: 72px; resize: vertical; }
  .tb-radio, .tb-check { display: flex; gap: 6px; align-items: center; margin: 4px 0; }
  .tb-scale { display: flex; gap: 6px; }
  .tb-scale button {
    flex: 1; padding: 8px 0; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer;
  }
  .tb-scale button.active { background: #2563eb; color: #fff; border-color: #2563eb; }
  .tb-error { color: #dc2626; font-size: 12px; margin-top: 4px; }
  .tb-hint { color: #6b7280; font-size: 12px; margin: 6px 0; }
  .tb-pinned { color: #047857; font-size: 12px; margin-top: 4px; word-break: break-all; }
  .tb-submit {
    width: 100%; padding: 10px; border: none; border-radius: 8px; background: #2563eb; color: #fff;
    font-weight: 600; cursor: pointer; margin-top: 4px;
  }
  .tb-submit:disabled { opacity: .6; cursor: default; }
  .tb-success { color: #047857; font-weight: 600; }
  .tb-banner { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 8px; border-radius: 8px; margin-bottom: 10px; }
  .tb-pin-active .tb-highlight {
    outline: 2px dashed #2563eb !important; outline-offset: 2px;
    background: rgba(37,99,235,.08); cursor: crosshair;
  }
  `;
}
function ot(B) {
  "@babel/helpers - typeof";
  return ot = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(a) {
    return typeof a;
  } : function(a) {
    return a && typeof Symbol == "function" && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
  }, ot(B);
}
function Ou(B, a) {
  if (ot(B) != "object" || !B) return B;
  var c = B[Symbol.toPrimitive];
  if (c !== void 0) {
    var u = c.call(B, a || "default");
    if (ot(u) != "object") return u;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (a === "string" ? String : Number)(B);
}
function Nu(B) {
  var a = Ou(B, "string");
  return ot(a) == "symbol" ? a : a + "";
}
function IB(B, a, c) {
  return (a = Nu(a)) in B ? Object.defineProperty(B, a, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : B[a] = c, B;
}
var it = {
  en: {
    "widget.title": "Report a problem",
    "widget.open": "Report a bug",
    "widget.close": "Close",
    "widget.submit": "Send report",
    "widget.sending": "Sending…",
    "widget.success": "Thanks! Your report was sent.",
    "widget.error": "Something went wrong. We will retry when you are back online.",
    "widget.emailLabel": "Your email",
    "widget.emailPlaceholder": "you@example.com",
    "widget.emailRequired": "Email is required so we can follow up.",
    "widget.titleLabel": "Summary",
    "widget.titlePlaceholder": "Short summary of the issue",
    "widget.pinHint": "Pin an element to highlight what is wrong",
    "widget.pin": "Pick element",
    "widget.pinned": "Pinned: {selector}",
    "widget.screenshot": "Attach a screenshot",
    "widget.retry": "Retry now",
    "widget.fieldRequired": "This field is required"
  },
  es: {
    "widget.title": "Reportar un problema",
    "widget.open": "Reportar un error",
    "widget.close": "Cerrar",
    "widget.submit": "Enviar reporte",
    "widget.sending": "Enviando…",
    "widget.success": "¡Gracias! Tu reporte fue enviado.",
    "widget.error": "Algo salió mal. Reintentaremos cuando recuperes la conexión.",
    "widget.emailLabel": "Tu correo",
    "widget.emailPlaceholder": "tu@ejemplo.com",
    "widget.emailRequired": "El correo es obligatorio para dar seguimiento.",
    "widget.titleLabel": "Resumen",
    "widget.titlePlaceholder": "Breve resumen del problema",
    "widget.pinHint": "Fija un elemento para resaltar qué está mal",
    "widget.pin": "Elegir elemento",
    "widget.pinned": "Fijado: {selector}",
    "widget.screenshot": "Adjuntar una captura",
    "widget.retry": "Reintentar ahora",
    "widget.fieldRequired": "Este campo es obligatorio"
  },
  de: {
    "widget.title": "Problem melden",
    "widget.open": "Fehler melden",
    "widget.close": "Schließen",
    "widget.submit": "Bericht senden",
    "widget.sending": "Wird gesendet…",
    "widget.success": "Danke! Dein Bericht wurde gesendet.",
    "widget.error": "Etwas ist schiefgelaufen. Wir versuchen es erneut, sobald du online bist.",
    "widget.emailLabel": "Deine E-Mail",
    "widget.emailPlaceholder": "du@beispiel.com",
    "widget.emailRequired": "E-Mail ist nötig, um zu antworten.",
    "widget.titleLabel": "Zusammenfassung",
    "widget.titlePlaceholder": "Kurze Beschreibung des Problems",
    "widget.pinHint": "Element markieren, um das Problem hervorzuheben",
    "widget.pin": "Element wählen",
    "widget.pinned": "Markiert: {selector}",
    "widget.screenshot": "Screenshot anhängen",
    "widget.retry": "Jetzt erneut versuchen",
    "widget.fieldRequired": "Dieses Feld ist erforderlich"
  }
}, Mu = class {
  constructor(B = "en") {
    var a;
    IB(this, "dict", void 0), IB(this, "locale", void 0), this.locale = B, this.dict = (a = it[B]) !== null && a !== void 0 ? a : it.en;
  }
  t(B, a) {
    var c, u;
    let U = (c = (u = this.dict[B]) !== null && u !== void 0 ? u : it.en[B]) !== null && c !== void 0 ? c : B;
    if (a) for (const [w, F] of Object.entries(a)) U = U.replace(new RegExp(`\\{${w}\\}`, "g"), String(F));
    return U;
  }
};
function xu(B) {
  if (B && it[B]) return B;
  if (typeof navigator != "undefined" && navigator.language) {
    const a = navigator.language.slice(0, 2).toLowerCase();
    if (it[a]) return a;
  }
  return "en";
}
function Ru() {
  var B;
  return document.currentScript instanceof HTMLScriptElement ? document.currentScript : (B = Array.from(document.querySelectorAll("script[src]")).find((a) => a.src.includes("/widget/v1/widget.js"))) !== null && B !== void 0 ? B : null;
}
function yB() {
  const B = Ru();
  if (!B) {
    console.warn("[trackboard] widget: could not locate own <script> tag");
    return;
  }
  const a = B.dataset.projectKey;
  if (!a) {
    console.warn("[trackboard] widget: missing data-project-key attribute");
    return;
  }
  const c = B.src ? new URL(B.src).origin : location.origin, u = new Mu(xu(B.dataset.locale)), U = document.createElement("div");
  U.id = "trackboard-widget", document.body.appendChild(U);
  const w = B.dataset.shadowMode === "open" ? "open" : "closed", F = U.attachShadow({ mode: w }), p = document.createElement("style");
  p.textContent = Tu(), F.appendChild(p);
  const v = document.createElement("style");
  v.textContent = ".tb-highlight{outline:2px dashed #2563eb!important;outline-offset:2px;background:rgba(37,99,235,.08);}", document.head.appendChild(v), Bu(TB(Su, {
    apiBase: c,
    projectKey: a,
    i18n: u
  }), F);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", yB) : yB();
