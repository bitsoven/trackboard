var be, v, Ct, ln, B, tt, Rt, $t, Pe, ae, J, Pt, je, Fe, De, an, fe = {}, me = [], sn = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ve = Array.isArray;
function U(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function qe(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Tt(e, t, n) {
  var r, i, o, l = {};
  for (o in t) o == "key" ? r = t[o] : o == "ref" ? i = t[o] : l[o] = t[o];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? be.call(arguments, 2) : n), typeof e == "function" && e.defaultProps != null) for (o in e.defaultProps) l[o] === void 0 && (l[o] = e.defaultProps[o]);
  return se(e, l, r, i, null);
}
function se(e, t, n, r, i) {
  var o = {
    type: e,
    props: t,
    key: n,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: void 0,
    __v: i == null ? ++Ct : i,
    __i: -1,
    __u: 0
  };
  return i == null && v.vnode != null && v.vnode(o), o;
}
function ye(e) {
  return e.children;
}
function ce(e, t) {
  this.props = e, this.context = t;
}
function G(e, t) {
  if (t == null) return e.__ ? G(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? G(e) : null;
}
function cn(e) {
  if (e.__P && e.__d) {
    var t = e.__v, n = t.__e, r = [], i = [], o = U({}, t);
    o.__v = t.__v + 1, v.vnode && v.vnode(o), We(e.__P, o, t, e.__n, e.__P.namespaceURI, 32 & t.__u ? [n] : null, r, n == null ? G(t) : n, !!(32 & t.__u), i), o.__v = t.__v, o.__.__k[o.__i] = o, Dt(r, o, i), t.__e = t.__ = null, o.__e != n && Lt(o);
  }
}
function Lt(e) {
  if ((e = e.__) != null && e.__c != null) return e.__e = e.__c.base = null, e.__k.some(function(t) {
    if (t != null && t.__e != null) return e.__e = e.__c.base = t.__e;
  }), Lt(e);
}
function nt(e) {
  (!e.__d && (e.__d = !0) && B.push(e) && !he.__r++ || tt != v.debounceRendering) && ((tt = v.debounceRendering) || Rt)(he);
}
function he() {
  try {
    for (var e, t = 1; B.length; ) B.length > t && B.sort($t), e = B.shift(), t = B.length, cn(e);
  } finally {
    B.length = he.__r = 0;
  }
}
function At(e, t, n, r, i, o, l, s, u, c, f) {
  var h, a, d, p, y, k, w = r && r.__k || me, g = t.length;
  for (u = un(n, t, w, u, g), h = 0; h < g; h++) (d = n.__k[h]) != null && (a = d.__i != -1 && w[d.__i] || fe, d.__i = h, k = We(e, d, a, i, o, l, s, u, c, f), p = d.__e, d.ref && a.ref != d.ref && (a.ref && Ve(a.ref, null, d), f.push(d.ref, d.__c || p, d)), y == null && p != null && (y = p), 4 & d.__u ? (u = Mt(d, u, e), a.__e && (a.__e = null)) : typeof d.type == "function" && k !== void 0 ? u = k : p && (u = p.nextSibling), d.__u &= -7);
  return n.__e = y, u;
}
function un(e, t, n, r, i) {
  var o, l, s, u, c, f = n.length, h = f, a = 0;
  for (e.__k = new Array(i), o = 0; o < i; o++) (l = t[o]) != null && typeof l != "boolean" && typeof l != "function" ? (typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? l = e.__k[o] = se(null, l, null, null, null) : ve(l) ? l = e.__k[o] = se(ye, { children: l }, null, null, null) : l.constructor === void 0 && l.__b > 0 ? l = e.__k[o] = se(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : e.__k[o] = l, u = o + a, l.__ = e, l.__b = e.__b + 1, s = null, (c = l.__i = dn(l, n, u, h)) != -1 && (h--, (s = n[c]) && (s.__u |= 2)), s == null || s.__v == null ? (c == -1 && (i > f ? a-- : i < f && a++), typeof l.type != "function" && (l.__u |= 4)) : c != u && (c == u - 1 ? a-- : c == u + 1 ? a++ : (c > u ? a-- : a++, l.__u |= 4))) : e.__k[o] = null;
  if (h) for (o = 0; o < f; o++) (s = n[o]) != null && (2 & s.__u) == 0 && (s.__e == r && (r = G(s)), Ht(s, s));
  return r;
}
function Mt(e, t, n) {
  var r, i;
  if (typeof e.type == "function") {
    for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = Mt(r[i], t, n));
    return t;
  }
  e.__e != t && (t && e.type && !t.parentNode && (t = G(e)), t = n.insertBefore(e.__e, t || null));
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType == 8);
  return t;
}
function dn(e, t, n, r) {
  var i, o, l, s = e.key, u = e.type, c = t[n], f = c != null && (2 & c.__u) == 0;
  if (c === null && s == null || f && s == c.key && u == c.type) return n;
  if (r > (f ? 1 : 0)) {
    for (i = n - 1, o = n + 1; i >= 0 || o < t.length; ) if ((c = t[l = i >= 0 ? i-- : o++]) != null && (2 & c.__u) == 0 && s == c.key && u == c.type) return l;
  }
  return -1;
}
function rt(e, t, n) {
  t[0] == "-" ? e.setProperty(t, n == null ? "" : n) : e[t] = n == null ? "" : typeof n != "number" || sn.test(t) ? n : n + "px";
}
function oe(e, t, n, r, i) {
  var o, l;
  e: if (t == "style") if (typeof n == "string") e.style.cssText = n;
  else {
    if (typeof r == "string" && (e.style.cssText = r = ""), r) for (t in r) n && t in n || rt(e.style, t, "");
    if (n) for (t in n) r && n[t] == r[t] || rt(e.style, t, n[t]);
  }
  else if (t[0] == "o" && t[1] == "n") o = t != (t = t.replace(Pt, "$1")), l = t.toLowerCase(), t = l in e || t == "onFocusOut" || t == "onFocusIn" ? l.slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = n, n ? r ? n[J] = r[J] : (n[J] = je, e.addEventListener(t, o ? De : Fe, o)) : e.removeEventListener(t, o ? De : Fe, o);
  else {
    if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = n == null ? "" : n;
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && t[4] != "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function it(e) {
  return function(t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t[ae] == null) t[ae] = je++;
      else if (t[ae] < n[J]) return;
      return n(v.event ? v.event(t) : t);
    }
  };
}
function We(e, t, n, r, i, o, l, s, u, c) {
  var f, h, a, d, p, y, k, w, g, S, z, M, q, Y, W, F, L = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && (u = !!(32 & n.__u), o = [s = t.__e = n.__e]), (f = v.__b) && f(t);
  e: if (typeof L == "function") {
    h = l.length;
    try {
      if (g = t.props, S = L.prototype && L.prototype.render, z = (f = L.contextType) && r[f.__c], M = f ? z ? z.props.value : f.__ : r, n.__c ? w = (a = t.__c = n.__c).__ = a.__E : (S ? t.__c = a = new L(g, M) : (t.__c = a = new ce(g, M), a.constructor = L, a.render = mn), z && z.sub(a), a.state || (a.state = {}), a.__n = r, d = a.__d = !0, a.__h = [], a._sb = []), S && a.__s == null && (a.__s = a.state), S && L.getDerivedStateFromProps != null && (a.__s == a.state && (a.__s = U({}, a.__s)), U(a.__s, L.getDerivedStateFromProps(g, a.__s))), p = a.props, y = a.state, a.__v = t, d) S && L.getDerivedStateFromProps == null && a.componentWillMount != null && a.componentWillMount(), S && a.componentDidMount != null && a.__h.push(a.componentDidMount);
      else {
        if (S && L.getDerivedStateFromProps == null && g !== p && a.componentWillReceiveProps != null && a.componentWillReceiveProps(g, M), t.__v == n.__v || !a.__e && a.shouldComponentUpdate != null && a.shouldComponentUpdate(g, a.__s, M) === !1) {
          t.__v != n.__v && (a.props = g, a.state = a.__s, a.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.some(function(I) {
            I && (I.__ = t);
          }), me.push.apply(a.__h, a._sb), a._sb = [], a.__h.length && l.push(a), s = G(n);
          break e;
        }
        a.componentWillUpdate != null && a.componentWillUpdate(g, a.__s, M), S && a.componentDidUpdate != null && a.__h.push(function() {
          a.componentDidUpdate(p, y, k);
        });
      }
      if (a.context = M, a.props = g, a.__P = e, a.__e = !1, q = v.__r, Y = 0, S) a.state = a.__s, a.__d = !1, q && q(t), f = a.render(a.props, a.state, a.context), me.push.apply(a.__h, a._sb), a._sb = [];
      else do
        a.__d = !1, q && q(t), f = a.render(a.props, a.state, a.context), a.state = a.__s;
      while (a.__d && ++Y < 25);
      a.state = a.__s, a.getChildContext != null && (r = U(U({}, r), a.getChildContext())), S && !d && a.getSnapshotBeforeUpdate != null && (k = a.getSnapshotBeforeUpdate(p, y)), W = f != null && f.type === ye && f.key == null ? It(f.props.children) : f, s = At(e, ve(W) ? W : [W], t, n, r, i, o, l, s, u, c), a.base = t.__e, t.__u &= -161, a.__h.length && l.push(a), w && (a.__E = a.__ = null);
    } catch (I) {
      if (l.length = h, t.__v = null, u || o != null) {
        if (I.then) {
          for (t.__u |= u ? 160 : 128; s && s.nodeType == 8 && s.nextSibling; ) s = s.nextSibling;
          o != null && (o[o.indexOf(s)] = null), t.__e = s;
        } else if (o != null) for (F = o.length; F--; ) qe(o[F]);
      } else t.__e = n.__e;
      t.__k == null && (t.__k = n.__k || []), I.then || Ft(t), v.__e(I, t, n);
    }
  } else o == null && t.__v == n.__v ? (t.__k = n.__k, t.__e = n.__e) : s = t.__e = fn(n.__e, t, n, r, i, o, l, u, c);
  return (f = v.diffed) && f(t), 128 & t.__u ? void 0 : s;
}
function Ft(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Ft));
}
function Dt(e, t, n) {
  for (var r = 0; r < n.length; r++) Ve(n[r], n[++r], n[++r]);
  v.__c && v.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(o) {
        o.call(i);
      });
    } catch (o) {
      v.__e(o, i.__v);
    }
  });
}
function It(e) {
  return typeof e != "object" || e == null || e.__b > 0 ? e : ve(e) ? e.map(It) : e.constructor !== void 0 ? null : U({}, e);
}
function fn(e, t, n, r, i, o, l, s, u) {
  var c, f, h, a, d, p, y, k = n.props || fe, w = t.props, g = t.type;
  if (g == "svg" ? i = "http://www.w3.org/2000/svg" : g == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
    for (c = 0; c < o.length; c++) if ((d = o[c]) && "setAttribute" in d == !!g && (g ? d.localName == g : d.nodeType == 3)) {
      e = d, o[c] = null;
      break;
    }
  }
  if (e == null) {
    if (g == null) return document.createTextNode(w);
    e = document.createElementNS(i, g, w.is && w), s && (v.__m && v.__m(t, o), s = !1), o = null;
  }
  if (g == null) k === w || s && e.data == w || (e.data = w);
  else {
    if (o = g == "textarea" && w.defaultValue != null ? null : o && be.call(e.childNodes), !s && o != null) for (k = {}, c = 0; c < e.attributes.length; c++) k[(d = e.attributes[c]).name] = d.value;
    for (c in k) d = k[c], c == "dangerouslySetInnerHTML" ? h = d : c == "children" || c in w || c == "value" && "defaultValue" in w || c == "checked" && "defaultChecked" in w || oe(e, c, null, d, i);
    for (c in w) d = w[c], c == "children" ? a = d : c == "dangerouslySetInnerHTML" ? f = d : c == "value" ? p = d : c == "checked" ? y = d : s && typeof d != "function" || k[c] === d || oe(e, c, d, k[c], i);
    if (f) s || h && (f.__html == h.__html || f.__html == e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
    else if (h && (e.innerHTML = ""), At(t.type == "template" ? e.content : e, ve(a) ? a : [a], t, n, r, g == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, l, o ? o[0] : n.__k && G(n, 0), s, u), o != null) for (c = o.length; c--; ) qe(o[c]);
    s && g != "textarea" || (c = "value", g == "progress" && p == null ? e.removeAttribute("value") : p != null && (p !== e[c] || g == "progress" && !p || g == "option" && p != k[c]) && oe(e, c, p, k[c], i), c = "checked", y != null && y != e[c] && oe(e, c, y, k[c], i));
  }
  return e;
}
function Ve(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), r && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (i) {
    v.__e(i, n);
  }
}
function Ht(e, t, n) {
  var r, i;
  if (v.unmount && v.unmount(e), (r = e.ref) && (r.current && r.current != e.__e || Ve(r, null, t)), (r = e.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (o) {
      v.__e(o, t);
    }
    r.base = r.__P = r.__n = null;
  }
  if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && Ht(r[i], t, n || typeof e.type != "function");
  n || qe(e.__e), e.__c = e.__ = e.__e = void 0;
}
function mn(e, t, n) {
  return this.constructor(e, n);
}
function hn(e, t, n) {
  var r, i, o, l;
  t == document && (t = document.documentElement), v.__ && v.__(e, t), i = (r = typeof n == "function") ? null : n && n.__k || t.__k, o = [], l = [], We(t, e = (!r && n || t).__k = Tt(ye, null, [e]), i || fe, fe, t.namespaceURI, !r && n ? [n] : i ? null : t.firstChild ? be.call(t.childNodes) : null, o, !r && n ? n : i ? i.__e : t.firstChild, r, l), Dt(o, e, l), e.props.children = null;
}
be = me.slice, v = { __e: function(e, t, n, r) {
  for (var i, o, l; t = t.__; ) if ((i = t.__c) && !i.__) try {
    if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(e)), l = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, r || {}), l = i.__d), l) return i.__E = i;
  } catch (s) {
    e = s;
  }
  throw e;
} }, Ct = 0, ln = function(e) {
  return e != null && e.constructor === void 0;
}, ce.prototype.setState = function(e, t) {
  var n = this.__s != null && this.__s != this.state ? this.__s : this.__s = U({}, this.state);
  typeof e == "function" && (e = e(U({}, n), this.props)), e && U(n, e), e != null && this.__v && (t && this._sb.push(t), nt(this));
}, ce.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), nt(this));
}, ce.prototype.render = ye, B = [], Rt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $t = function(e, t) {
  return e.__v.__b - t.__v.__b;
}, he.__r = 0, Pe = Math.random().toString(8), ae = "__d" + Pe, J = "__a" + Pe, Pt = /(PointerCapture)$|Capture$/i, je = 0, Fe = it(!1), De = it(!0), an = 0;
var ee, N, Te, ot, pe = 0, Ut = [], E = v, lt = E.__b, at = E.__r, st = E.diffed, ct = E.__c, ut = E.unmount, dt = E.__;
function Be(e, t) {
  E.__h && E.__h(N, e, pe || t), pe = 0;
  var n = N.__H || (N.__H = {
    __: [],
    __h: []
  });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function $(e) {
  return pe = 1, pn(qt, e);
}
function pn(e, t, n) {
  var r = Be(ee++, 2);
  if (r.t = e, !r.__c && (r.__ = [n ? n(t) : qt(void 0, t), function(s) {
    var u = r.__N ? r.__N[0] : r.__[0], c = r.t(u, s);
    u !== c && (r.__N = [c, r.__[1]], r.__c.setState({}));
  }], r.__c = N, !N.__f)) {
    var i = function(s, u, c) {
      if (!r.__c.__H) return !0;
      var f = !1, h = r.__c.props !== s;
      if (r.__c.__H.__.some(function(d) {
        if (d.__N) {
          f = !0;
          var p = d.__[0];
          d.__ = d.__N, d.__N = void 0, p !== d.__[0] && (h = !0);
        }
      }), o) {
        var a = o.call(this, s, u, c);
        return f ? a || h : a;
      }
      return !f || h;
    };
    N.__f = !0;
    var o = N.shouldComponentUpdate, l = N.componentWillUpdate;
    N.componentWillUpdate = function(s, u, c) {
      if (this.__e) {
        var f = o;
        o = void 0, i(s, u, c), o = f;
      }
      l && l.call(this, s, u, c);
    }, N.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function Le(e, t) {
  var n = Be(ee++, 3);
  !E.__s && jt(n.__H, t) && (n.__ = e, n.u = t, N.__H.__h.push(n));
}
function ft(e) {
  return pe = 5, _n(function() {
    return { current: e };
  }, []);
}
function _n(e, t) {
  var n = Be(ee++, 7);
  return jt(n.__H, t) && (n.__ = e(), n.__H = t, n.__h = e), n.__;
}
function gn() {
  for (var e; e = Ut.shift(); ) {
    var t = e.__H;
    if (e.__P && t) try {
      t.__h.some(ue), t.__h.some(Ie), t.__h = [];
    } catch (n) {
      t.__h = [], E.__e(n, e.__v);
    }
  }
}
E.__b = function(e) {
  N = null, lt && lt(e);
}, E.__ = function(e, t) {
  e && t.__k && t.__k.__m && (e.__m = t.__k.__m), dt && dt(e, t);
}, E.__r = function(e) {
  at && at(e), ee = 0;
  var t = (N = e.__c).__H;
  t && (Te === N ? (t.__h = [], N.__h = [], t.__.some(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (t.__h.some(ue), t.__h.some(Ie), t.__h = [], ee = 0)), Te = N;
}, E.diffed = function(e) {
  st && st(e);
  var t = e.__c;
  t && t.__H && (t.__H.__h.length && (Ut.push(t) !== 1 && ot === E.requestAnimationFrame || ((ot = E.requestAnimationFrame) || bn)(gn)), t.__H.__.some(function(n) {
    n.u && (n.__H = n.u, n.u = void 0);
  })), Te = N = null;
}, E.__c = function(e, t) {
  t.some(function(n) {
    try {
      n.__h.some(ue), n.__h = n.__h.filter(function(r) {
        return !r.__ || Ie(r);
      });
    } catch (r) {
      t.some(function(i) {
        i.__h && (i.__h = []);
      }), t = [], E.__e(r, n.__v);
    }
  }), ct && ct(e, t);
}, E.unmount = function(e) {
  ut && ut(e);
  var t, n = e.__c;
  n && n.__H && (n.__H.__.some(function(r) {
    try {
      ue(r);
    } catch (i) {
      t = i;
    }
  }), n.__H = void 0, t && E.__e(t, n.__v));
};
var mt = typeof requestAnimationFrame == "function";
function bn(e) {
  var t, n = function() {
    clearTimeout(r), mt && cancelAnimationFrame(t), setTimeout(e);
  }, r = setTimeout(n, 35);
  mt && (t = requestAnimationFrame(n));
}
function ue(e) {
  var t = N, n = e.__c;
  typeof n == "function" && (e.__c = void 0, n()), N = t;
}
function Ie(e) {
  var t = N;
  e.__c = e.__(), N = t;
}
function jt(e, t) {
  return !e || e.length !== t.length || t.some(function(n, r) {
    return n !== e[r];
  });
}
function qt(e, t) {
  return typeof t == "function" ? t(e) : t;
}
async function vn(e, t) {
  const n = `${e.replace(/\/$/, "")}/api/public/widget/config?key=${encodeURIComponent(t)}`, r = await fetch(n, { headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(`Widget config request failed with status ${r.status}`);
  return (await r.json()).data;
}
function Ae(e) {
  if (typeof e == "string") return e;
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
function yn(e, t) {
  var n, r;
  let i;
  typeof e == "string" ? i = e : e instanceof URL ? i = e.toString() : e instanceof Request ? i = e.url : i = String(e);
  const o = ((n = (r = t == null ? void 0 : t.method) !== null && r !== void 0 ? r : e instanceof Request ? e.method : "GET") !== null && n !== void 0 ? n : "GET").toUpperCase();
  return {
    url: i,
    method: o
  };
}
function wn() {
  const e = [], t = console.error, n = (...c) => {
    e.push({
      kind: "console",
      message: c.map(Ae).join(" "),
      timestamp: Date.now()
    }), t.apply(console, c);
  }, r = (c) => {
    e.push({
      kind: "window",
      message: c.message,
      timestamp: Date.now(),
      detail: c.filename ? `${c.filename}:${c.lineno}` : void 0
    });
  }, i = (c) => {
    e.push({
      kind: "unhandledrejection",
      message: Ae(c.reason),
      timestamp: Date.now()
    });
  }, o = window.fetch.bind(window), l = (c, f) => {
    const h = yn(c, f);
    return o(c, f).then((a) => (a.ok || e.push({
      kind: "network",
      message: `HTTP ${a.status} for ${h.method} ${h.url}`,
      timestamp: Date.now()
    }), a), (a) => {
      throw e.push({
        kind: "network",
        message: `Failed ${h.method} ${h.url}: ${Ae(a)}`,
        timestamp: Date.now()
      }), a;
    });
  }, s = XMLHttpRequest.prototype.open, u = function(c, f, ...h) {
    const a = typeof f == "string" ? f : f.toString();
    (() => {
      const w = () => {
        this.readyState === 4 && this.status >= 400 && e.push({
          kind: "network",
          message: `XHR ${c.toUpperCase()} ${a} -> ${this.status}`,
          timestamp: Date.now()
        });
      };
      this.addEventListener("readystatechange", w);
    })();
    const p = h[0] === void 0 ? !0 : h[0], y = h[1], k = h[2];
    return s.call(this, c, f, p, y, k);
  };
  return console.error = n, window.fetch = l, XMLHttpRequest.prototype.open = u, window.addEventListener("error", r), window.addEventListener("unhandledrejection", i), {
    getErrors() {
      return e.slice();
    },
    stop() {
      console.error = t, window.fetch = o, XMLHttpRequest.prototype.open = s, window.removeEventListener("error", r), window.removeEventListener("unhandledrejection", i);
    }
  };
}
function xn(e, t) {
  if (e.match(/^[a-z]+:\/\//i)) return e;
  if (e.match(/^\/\//)) return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i)) return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), i = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(i), t && (r.href = t), i.href = e, i.href;
}
var kn = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4);
  return () => (e += 1, `u${t()}${e}`);
})();
function j(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++) t.push(e[n]);
  return t;
}
function _e(e, t) {
  const n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return n ? parseFloat(n.replace("px", "")) : 0;
}
function Nn(e) {
  const t = _e(e, "border-left-width"), n = _e(e, "border-right-width");
  return e.clientWidth + t + n;
}
function En(e) {
  const t = _e(e, "border-top-width"), n = _e(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Wt(e, t = {}) {
  return {
    width: t.width || Nn(e),
    height: t.height || En(e)
  };
}
function Sn() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
var T = 16384;
function Cn(e) {
  (e.width > T || e.height > T) && (e.width > T && e.height > T ? e.width > e.height ? (e.height *= T / e.width, e.width = T) : (e.width *= T / e.height, e.height = T) : e.width > T ? (e.height *= T / e.width, e.width = T) : (e.width *= T / e.height, e.height = T));
}
function ge(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.decode = () => t(r), r.onload = () => t(r), r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Rn(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function $n(e, t, n) {
  const r = "http://www.w3.org/2000/svg", i = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return i.setAttribute("width", `${t}`), i.setAttribute("height", `${n}`), i.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), i.appendChild(o), o.appendChild(e), Rn(i);
}
var P = (e, t) => {
  if (e instanceof t) return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || P(n, t);
};
function Pn(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Tn(e) {
  return j(e).map((t) => `${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t) ? " !important" : ""};`).join(" ");
}
function Ln(e, t, n) {
  const r = `.${e}:${t}`, i = n.cssText ? Pn(n) : Tn(n);
  return document.createTextNode(`${r}{${i}}`);
}
function ht(e, t, n) {
  const r = window.getComputedStyle(e, n), i = r.getPropertyValue("content");
  if (i === "" || i === "none") return;
  const o = kn();
  try {
    t.className = `${t.className} ${o}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(Ln(o, n, r)), t.appendChild(l);
}
function An(e, t) {
  ht(e, t, ":before"), ht(e, t, ":after");
}
var pt = "application/font-woff", _t = "image/jpeg", Mn = {
  woff: pt,
  woff2: pt,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: _t,
  jpeg: _t,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Fn(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ze(e) {
  const t = Fn(e).toLowerCase();
  return Mn[t] || "";
}
function Dn(e) {
  return e.split(/,/)[1];
}
function He(e) {
  return e.search(/^(data:)/) !== -1;
}
function Vt(e, t) {
  return `data:${t};base64,${e}`;
}
async function Bt(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404) throw new Error(`Resource "${r.url}" not found`);
  const i = await r.blob();
  return new Promise((o, l) => {
    const s = new FileReader();
    s.onerror = l, s.onloadend = () => {
      try {
        o(n({
          res: r,
          result: s.result
        }));
      } catch (u) {
        l(u);
      }
    }, s.readAsDataURL(i);
  });
}
var Me = {};
function In(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Oe(e, t, n) {
  const r = In(e, t, n.includeQueryParams);
  if (Me[r] != null) return Me[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let i;
  try {
    i = Vt(await Bt(e, n.fetchRequestInit, ({ res: o, result: l }) => (t || (t = o.headers.get("Content-Type") || ""), Dn(l))), t);
  } catch (o) {
    i = n.imagePlaceholder || "";
    let l = `Failed to fetch resource: ${e}`;
    o && (l = typeof o == "string" ? o : o.message), l && console.warn(l);
  }
  return Me[r] = i, i;
}
async function Hn(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : ge(t);
}
async function Un(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), l = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, l == null || l.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return ge(s);
  }
  const n = e.poster, r = ze(n), i = await Oe(n, r, t);
  return ge(i);
}
async function jn(e) {
  var t;
  try {
    if (!((t = e == null ? void 0 : e.contentDocument) === null || t === void 0) && t.body) return await we(e.contentDocument.body, {}, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function qn(e, t) {
  return P(e, HTMLCanvasElement) ? Hn(e) : P(e, HTMLVideoElement) ? Un(e, t) : P(e, HTMLIFrameElement) ? jn(e) : e.cloneNode(!1);
}
var Wn = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT";
async function Vn(e, t, n) {
  var r, i;
  let o = [];
  return Wn(e) && e.assignedNodes ? o = j(e.assignedNodes()) : P(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = j(e.contentDocument.body.childNodes) : o = j(((i = e.shadowRoot) !== null && i !== void 0 ? i : e).childNodes), o.length === 0 || P(e, HTMLVideoElement) || await o.reduce((l, s) => l.then(() => we(s, n)).then((u) => {
    u && t.appendChild(u);
  }), Promise.resolve()), t;
}
function Bn(e, t) {
  const n = t.style;
  if (!n) return;
  const r = window.getComputedStyle(e);
  r.cssText ? (n.cssText = r.cssText, n.transformOrigin = r.transformOrigin) : j(r).forEach((i) => {
    let o = r.getPropertyValue(i);
    i === "font-size" && o.endsWith("px") && (o = `${Math.floor(parseFloat(o.substring(0, o.length - 2))) - 0.1}px`), P(e, HTMLIFrameElement) && i === "display" && o === "inline" && (o = "block"), i === "d" && t.getAttribute("d") && (o = `path(${t.getAttribute("d")})`), n.setProperty(i, o, r.getPropertyPriority(i));
  });
}
function zn(e, t) {
  P(e, HTMLTextAreaElement) && (t.innerHTML = e.value), P(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function On(e, t) {
  if (P(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((i) => e.value === i.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Kn(e, t) {
  return P(t, Element) && (Bn(e, t), An(e, t), zn(e, t), On(e, t)), t;
}
async function Gn(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0) return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const l = n[o].getAttribute("xlink:href");
    if (l) {
      const s = e.querySelector(l), u = document.querySelector(l);
      !s && u && !r[l] && (r[l] = await we(u, t, !0));
    }
  }
  const i = Object.values(r);
  if (i.length) {
    const o = "http://www.w3.org/1999/xhtml", l = document.createElementNS(o, "svg");
    l.setAttribute("xmlns", o), l.style.position = "absolute", l.style.width = "0", l.style.height = "0", l.style.overflow = "hidden", l.style.display = "none";
    const s = document.createElementNS(o, "defs");
    l.appendChild(s);
    for (let u = 0; u < i.length; u++) s.appendChild(i[u]);
    e.appendChild(l);
  }
  return e;
}
async function we(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => qn(r, t)).then((r) => Vn(e, r, t)).then((r) => Kn(e, r)).then((r) => Gn(r, t));
}
var zt = /url\((['"]?)([^'"]+?)\1\)/g, Xn = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Yn = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Jn(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Qn(e) {
  const t = [];
  return e.replace(zt, (n, r, i) => (t.push(i), n)), t.filter((n) => !He(n));
}
async function Zn(e, t, n, r, i) {
  try {
    const o = n ? xn(t, n) : t, l = ze(t);
    let s;
    if (i) {
      const u = await i(o);
      s = Vt(u, l);
    } else s = await Oe(o, l, r);
    return e.replace(Jn(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function er(e, { preferredFontFormat: t }) {
  return t ? e.replace(Yn, (n) => {
    for (; ; ) {
      const [r, , i] = Xn.exec(n) || [];
      if (!i) return "";
      if (i === t) return `src: ${r};`;
    }
  }) : e;
}
function Ot(e) {
  return e.search(zt) !== -1;
}
async function Kt(e, t, n) {
  if (!Ot(e)) return e;
  const r = er(e, n);
  return Qn(r).reduce((i, o) => i.then((l) => Zn(l, o, t, n)), Promise.resolve(r));
}
async function le(e, t, n) {
  var r;
  const i = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (i) {
    const o = await Kt(i, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function tr(e, t) {
  await le("background", e, t) || await le("background-image", e, t), await le("mask", e, t) || await le("mask-image", e, t);
}
async function nr(e, t) {
  const n = P(e, HTMLImageElement);
  if (!(n && !He(e.src)) && !(P(e, SVGImageElement) && !He(e.href.baseVal))) return;
  const r = n ? e.src : e.href.baseVal, i = await Oe(r, ze(r), t);
  await new Promise((o, l) => {
    e.onload = o, e.onerror = l;
    const s = e;
    s.decode && (s.decode = o), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = i) : e.href.baseVal = i;
  });
}
async function rr(e, t) {
  const n = j(e.childNodes).map((r) => Gt(r, t));
  await Promise.all(n).then(() => e);
}
async function Gt(e, t) {
  P(e, Element) && (await tr(e, t), await nr(e, t), await rr(e, t));
}
function ir(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((i) => {
    n[i] = r[i];
  }), e;
}
var gt = {};
async function bt(e) {
  let t = gt[e];
  return t != null || (t = {
    url: e,
    cssText: await (await fetch(e)).text()
  }, gt[e] = t), t;
}
async function vt(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (o) => {
    let l = o.replace(r, "$1");
    return l.startsWith("https://") || (l = new URL(l, e.url).href), Bt(l, t.fetchRequestInit, ({ result: s }) => (n = n.replace(o, `url(${s})`), [o, s]));
  });
  return Promise.all(i).then(() => n);
}
function yt(e) {
  if (e == null) return [];
  const t = [];
  let n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, "");
  const r = /* @__PURE__ */ new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = r.exec(n);
    if (l === null) break;
    t.push(l[0]);
  }
  n = n.replace(r, "");
  const i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, o = /* @__PURE__ */ new RegExp("((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", "gi");
  for (; ; ) {
    let l = i.exec(n);
    if (l === null) {
      if (l = o.exec(n), l === null) break;
      i.lastIndex = o.lastIndex;
    } else o.lastIndex = i.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function or(e, t) {
  const n = [], r = [];
  return e.forEach((i) => {
    if ("cssRules" in i) try {
      j(i.cssRules || []).forEach((o, l) => {
        if (o.type === CSSRule.IMPORT_RULE) {
          let s = l + 1;
          const u = o.href, c = bt(u).then((f) => vt(f, t)).then((f) => yt(f).forEach((h) => {
            try {
              i.insertRule(h, h.startsWith("@import") ? s += 1 : i.cssRules.length);
            } catch (a) {
              console.error("Error inserting rule from remote css", {
                rule: h,
                error: a
              });
            }
          })).catch((f) => {
            console.error("Error loading remote css", f.toString());
          });
          r.push(c);
        }
      });
    } catch (o) {
      const l = e.find((s) => s.href == null) || document.styleSheets[0];
      i.href != null && r.push(bt(i.href).then((s) => vt(s, t)).then((s) => yt(s).forEach((u) => {
        l.insertRule(u, i.cssRules.length);
      })).catch((s) => {
        console.error("Error loading remote stylesheet", s);
      })), console.error("Error inlining remote css file", o);
    }
  }), Promise.all(r).then(() => (e.forEach((i) => {
    if ("cssRules" in i) try {
      j(i.cssRules || []).forEach((o) => {
        n.push(o);
      });
    } catch (o) {
      console.error(`Error while reading CSS rules from ${i.href}`, o);
    }
  }), n));
}
function lr(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Ot(t.style.getPropertyValue("src")));
}
async function ar(e, t) {
  if (e.ownerDocument == null) throw new Error("Provided element is not within a Document");
  return lr(await or(j(e.ownerDocument.styleSheets), t));
}
async function sr(e, t) {
  const n = await ar(e, t);
  return (await Promise.all(n.map((r) => {
    const i = r.parentStyleSheet ? r.parentStyleSheet.href : null;
    return Kt(r.cssText, i, t);
  }))).join(`
`);
}
async function cr(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await sr(e, t);
  if (n) {
    const r = document.createElement("style"), i = document.createTextNode(n);
    r.appendChild(i), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function ur(e, t = {}) {
  const { width: n, height: r } = Wt(e, t), i = await we(e, t, !0);
  return await cr(i, t), await Gt(i, t), ir(i, t), await $n(i, n, r);
}
async function dr(e, t = {}) {
  const { width: n, height: r } = Wt(e, t), i = await ur(e, t), o = await ge(i), l = document.createElement("canvas"), s = l.getContext("2d"), u = t.pixelRatio || Sn(), c = t.canvasWidth || n, f = t.canvasHeight || r;
  return l.width = c * u, l.height = f * u, t.skipAutoScale || Cn(l), l.style.width = `${c}`, l.style.height = `${f}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, l.width, l.height)), s.drawImage(o, 0, 0, l.width, l.height), l;
}
async function fr(e, t = {}) {
  return (await dr(e, t)).toDataURL();
}
var Xt = "trackboard:high-fidelity-consent";
var mr = 1e3, hr = fr;
function pr(e) {
  const t = {
    cacheBust: !0,
    pixelRatio: Math.min(typeof window != "undefined" && window.devicePixelRatio || 1, 2),
    backgroundColor: null,
    preferredFontFormat: "woff2",
    fontEmbedCSS: yr()
  };
  if (e === "visible") {
    const i = typeof window != "undefined" ? window.innerWidth : 1024, o = typeof window != "undefined" ? window.innerHeight : 768, l = typeof window != "undefined" ? window.scrollX : 0, s = typeof window != "undefined" ? window.scrollY : 0;
    return {
      ...t,
      width: i,
      height: o,
      style: {
        transform: `translate(${-l}px, ${-s}px)`,
        transformOrigin: "top left"
      }
    };
  }
  if (e === "element") return { ...t };
  const n = typeof document != "undefined" ? document.documentElement.scrollWidth : 1024, r = typeof document != "undefined" ? document.documentElement.scrollHeight : 768;
  return {
    ...t,
    width: n,
    height: r
  };
}
function _r(e, t) {
  let n;
  try {
    n = new URL(e, t != null ? t : void 0);
  } catch {
    return !1;
  }
  if (n.protocol === "data:" || n.protocol === "blob:") return !1;
  if (!t) return n.protocol === "http:" || n.protocol === "https:";
  let r;
  try {
    r = new URL(t);
  } catch {
    return !1;
  }
  return n.host !== r.host;
}
function gr(e, t) {
  return `${e.replace(/\/$/, "")}/api/public/proxy-image?url=${encodeURIComponent(t)}`;
}
async function br(e) {
  const t = typeof location != "undefined" ? location.origin : void 0, n = Array.from(document.images);
  await Promise.all(n.map(async (r) => {
    const i = r.currentSrc || r.src;
    if (!i || !_r(i, t) || i.includes("/api/public/proxy-image")) return;
    const o = gr(e, i);
    try {
      r.src = o, r.decode && await r.decode();
    } catch {
    }
  }));
}
function Q() {
  var e;
  return typeof navigator != "undefined" && !!(!((e = navigator.mediaDevices) === null || e === void 0) && e.getDisplayMedia);
}
function de() {
  try {
    return localStorage.getItem(Xt) === "granted";
  } catch {
    return !1;
  }
}
function wt(e) {
  try {
    localStorage.setItem(Xt, e ? "granted" : "denied");
  } catch {
  }
}
async function vr() {
  if (!Q()) return null;
  let e = null, t = null;
  try {
    if (e = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: "browser" },
      audio: !1
    }), !e.getVideoTracks()[0]) return null;
    t = document.createElement("video"), t.srcObject = e, t.muted = !0, await t.play().catch(() => {
    }), await new Promise((o) => {
      if (t.readyState >= 2) return o();
      const l = () => {
        t.removeEventListener("loadeddata", l), o();
      };
      t.addEventListener("loadeddata", l, { once: !0 }), setTimeout(o, 500);
    });
    const r = document.createElement("canvas");
    r.width = t.videoWidth || 1920, r.height = t.videoHeight || 1080;
    const i = r.getContext("2d");
    return i ? (i.drawImage(t, 0, 0, r.width, r.height), await Ue(r.toDataURL("image/png"))) : null;
  } catch (r) {
    var n;
    const i = (n = r == null ? void 0 : r.name) !== null && n !== void 0 ? n : "";
    return null;
  } finally {
    if (e) for (const r of e.getTracks()) try {
      r.stop();
    } catch {
    }
    if (t) try {
      t.pause(), t.srcObject = null, t.remove();
    } catch {
    }
  }
}
function yr() {
  if (typeof document == "undefined") return;
  let e = "", t = !1;
  for (const n of Array.from(document.styleSheets)) {
    let r = null;
    try {
      r = n.cssRules;
    } catch {
      continue;
    }
    if (r) {
      for (const i of Array.from(r)) if (i instanceof CSSFontFaceRule) {
        const o = i.style.getPropertyValue("font-family");
        if (!o || !o.trim() || o.trim() === '""' || o.trim() === "''") continue;
        t = !0, e += i.cssText + `
`;
      }
    }
  }
  return t ? e : void 0;
}
async function Ue(e) {
  if (e.length <= 10485760) return e;
  for (const t of [
    0.7,
    0.5,
    0.3
  ]) try {
    const n = await wr(e, t);
    if (n.length <= 10485760) return n;
    e = n;
  } catch {
    break;
  }
  return e;
}
function wr(e, t) {
  return new Promise((n, r) => {
    const i = new Image();
    i.onload = () => {
      try {
        const o = document.createElement("canvas");
        o.width = i.naturalWidth, o.height = i.naturalHeight;
        const l = o.getContext("2d");
        if (!l) return r(/* @__PURE__ */ new Error("no context"));
        l.fillStyle = "#ffffff", l.fillRect(0, 0, o.width, o.height), l.drawImage(i, 0, 0), n(o.toDataURL("image/jpeg", t));
      } catch (o) {
        r(o);
      }
    }, i.onerror = () => r(/* @__PURE__ */ new Error("image load failed")), i.src = e;
  });
}
async function xr(e, t) {
  try {
    const n = pr(t);
    return await hr(e, n);
  } catch {
    return null;
  }
}
async function xt(e, t) {
  let n, r = "fullpage", i = !1;
  if (((u) => typeof HTMLElement != "undefined" && u instanceof HTMLElement || typeof Element != "undefined" && u instanceof Element || u && typeof u == "object" && u.nodeType === 1 && typeof u.tagName == "string")(t))
    n = t, r = "element";
  else if (t && typeof t == "object") {
    var l, s;
    n = t.target, r = (l = t.mode) !== null && l !== void 0 ? l : n ? "element" : "fullpage", i = (s = t.highFidelity) !== null && s !== void 0 ? s : !1;
  }
  return Er(Nr(e, r, n, i), kr);
}
var kr = 6500;
async function Nr(e, t, n, r) {
  try {
    if (r && Q() && de()) {
      const s = await vr();
      if (s) return await Ue(s);
    }
    try {
      var i, o;
      await Promise.race([(i = (o = document.fonts) === null || o === void 0 ? void 0 : o.ready) !== null && i !== void 0 ? i : Promise.resolve(), new Promise((s) => setTimeout(s, mr))]);
    } catch {
    }
    await br(e);
    const l = await xr(t === "element" && n ? n : document.documentElement, t === "element" && !n ? "fullpage" : t);
    return l ? await Ue(l) : null;
  } catch {
    return null;
  }
}
function Er(e, t) {
  return new Promise((n) => {
    let r = !1;
    const i = (l) => {
      r || (r = !0, clearTimeout(o), n(l));
    }, o = setTimeout(() => i(null), t);
    e.then((l) => i(l), () => i(null));
  });
}
function Sr(e) {
  if (!(e instanceof Element)) throw new Error("generateSelector expects a DOM Element");
  if (e.id) return `${kt(e)}#${e.id}`;
  const t = [];
  let n = e;
  for (; n && n.nodeType === 1 && n !== document.documentElement && n !== document.body; ) {
    let r = kt(n);
    if (n.id) r += `#${n.id}`;
    else {
      const i = n.parentElement;
      if (i && Array.from(i.children).filter((o) => o.tagName === n.tagName).length > 1) {
        const o = Array.from(i.children).indexOf(n) + 1;
        r += `:nth-child(${o})`;
      }
    }
    t.unshift(r), n = n.parentElement;
  }
  return t.join(" > ");
}
function kt(e) {
  return e.tagName.toLowerCase();
}
function Cr(e) {
  let t = null;
  const n = (i) => {
    const o = i.target;
    !o || !(o instanceof Element) || (t && t !== o && t.classList.remove("tb-highlight"), t = o, t.classList.add("tb-highlight"));
  }, r = (i) => {
    const o = i.target;
    !o || !(o instanceof Element) || (i.preventDefault(), i.stopPropagation(), e(o, Sr(o)));
  };
  return document.addEventListener("mousemove", n, !0), document.addEventListener("click", r, !0), () => {
    document.removeEventListener("mousemove", n, !0), document.removeEventListener("click", r, !0), t && t.classList.remove("tb-highlight");
  };
}
var Rr = 0;
function m(e, t, n, r, i, o) {
  t || (t = {});
  var l, s, u = t;
  if ("ref" in u) for (s in u = {}, t) s == "ref" ? l = t[s] : u[s] = t[s];
  var c = {
    type: e,
    props: u,
    key: n,
    ref: l,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __c: null,
    constructor: void 0,
    __v: --Rr,
    __i: -1,
    __u: 0,
    __source: i,
    __self: o
  };
  if (typeof e == "function" && (l = e.defaultProps)) for (s in l) u[s] === void 0 && (u[s] = l[s]);
  return v.vnode && v.vnode(c), c;
}
var x = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/fields.tsx";
function X(e) {
  return e == null ? "" : String(e);
}
function $r(e) {
  return e === !0 || e === "true" || e === "on";
}
function Pr(e) {
  var t;
  const { field: n, value: r, error: i, onChange: o } = e, l = (t = n.options) !== null && t !== void 0 ? t : {}, s = /* @__PURE__ */ m("label", {
    class: "tb-label",
    for: `tb-${n.key}`,
    children: [n.label, n.isRequired && /* @__PURE__ */ m("span", {
      class: "tb-req",
      children: " *"
    }, void 0, !1, {
      fileName: x,
      lineNumber: 24,
      columnNumber: 28
    }, this)]
  }, void 0, !0, {
    fileName: x,
    lineNumber: 22,
    columnNumber: 5
  }, this);
  let u;
  switch (n.type) {
    case "textarea":
      u = /* @__PURE__ */ m("textarea", {
        id: `tb-${n.key}`,
        class: "tb-textarea",
        placeholder: l.placeholder,
        maxLength: l.maxLength,
        value: X(r),
        onInput: (a) => o(a.target.value)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 33,
        columnNumber: 9
      }, this);
      break;
    case "select": {
      var c;
      const a = (c = l.choices) !== null && c !== void 0 ? c : [];
      u = /* @__PURE__ */ m("select", {
        id: `tb-${n.key}`,
        class: "tb-select",
        value: X(r),
        onChange: (d) => o(d.target.value),
        children: [/* @__PURE__ */ m("option", {
          value: "",
          children: "—"
        }, void 0, !1, {
          fileName: x,
          lineNumber: 53,
          columnNumber: 11
        }, this), a.map((d) => /* @__PURE__ */ m("option", {
          value: d,
          selected: d === X(r),
          children: d
        }, void 0, !1, {
          fileName: x,
          lineNumber: 55,
          columnNumber: 13
        }, this))]
      }, void 0, !0, {
        fileName: x,
        lineNumber: 47,
        columnNumber: 9
      }, this);
      break;
    }
    case "radio": {
      var f;
      const a = (f = l.choices) !== null && f !== void 0 ? f : [];
      u = /* @__PURE__ */ m("div", { children: a.map((d) => /* @__PURE__ */ m("div", {
        class: "tb-radio",
        children: [/* @__PURE__ */ m("input", {
          type: "radio",
          id: `tb-${n.key}-${d}`,
          name: `tb-${n.key}`,
          value: d,
          checked: X(r) === d,
          onChange: () => o(d)
        }, void 0, !1, {
          fileName: x,
          lineNumber: 69,
          columnNumber: 15
        }, this), /* @__PURE__ */ m("label", {
          for: `tb-${n.key}-${d}`,
          children: d
        }, void 0, !1, {
          fileName: x,
          lineNumber: 77,
          columnNumber: 15
        }, this)]
      }, void 0, !0, {
        fileName: x,
        lineNumber: 68,
        columnNumber: 13
      }, this)) }, void 0, !1, {
        fileName: x,
        lineNumber: 66,
        columnNumber: 9
      }, this);
      break;
    }
    case "checkbox": {
      var h;
      const a = (h = l.choices) !== null && h !== void 0 ? h : [];
      if (a.length > 0) {
        const d = Array.isArray(r) ? r : [];
        u = /* @__PURE__ */ m("div", { children: a.map((p) => /* @__PURE__ */ m("div", {
          class: "tb-check",
          children: [/* @__PURE__ */ m("input", {
            type: "checkbox",
            id: `tb-${n.key}-${p}`,
            value: p,
            checked: d.includes(p),
            onChange: (y) => {
              const k = y.target.checked ? [...d, p] : d.filter((w) => w !== p);
              o(k);
            }
          }, void 0, !1, {
            fileName: x,
            lineNumber: 92,
            columnNumber: 17
          }, this), /* @__PURE__ */ m("label", {
            for: `tb-${n.key}-${p}`,
            children: p
          }, void 0, !1, {
            fileName: x,
            lineNumber: 103,
            columnNumber: 17
          }, this)]
        }, void 0, !0, {
          fileName: x,
          lineNumber: 91,
          columnNumber: 15
        }, this)) }, void 0, !1, {
          fileName: x,
          lineNumber: 89,
          columnNumber: 11
        }, this);
      } else u = /* @__PURE__ */ m("div", {
        class: "tb-check",
        children: /* @__PURE__ */ m("input", {
          type: "checkbox",
          id: `tb-${n.key}`,
          checked: $r(r),
          onChange: (d) => o(d.target.checked)
        }, void 0, !1, {
          fileName: x,
          lineNumber: 111,
          columnNumber: 13
        }, this)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 110,
        columnNumber: 11
      }, this);
      break;
    }
    case "number":
      u = /* @__PURE__ */ m("input", {
        id: `tb-${n.key}`,
        class: "tb-input",
        type: "number",
        min: l.min,
        max: l.max,
        value: r == null ? "" : Number(r),
        onInput: (a) => o(a.target.valueAsNumber)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 124,
        columnNumber: 9
      }, this);
      break;
    case "date":
      u = /* @__PURE__ */ m("input", {
        id: `tb-${n.key}`,
        class: "tb-input",
        type: "date",
        value: X(r),
        onChange: (a) => o(a.target.value)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 138,
        columnNumber: 9
      }, this);
      break;
    case "file":
      u = /* @__PURE__ */ m("input", {
        id: `tb-${n.key}`,
        class: "tb-input",
        type: "file",
        accept: l.accept,
        onChange: (a) => o(a.target.value)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 150,
        columnNumber: 9
      }, this);
      break;
    case "severity-scale": {
      const a = typeof l.scaleMin == "number" ? l.scaleMin : 1, d = typeof l.scaleMax == "number" ? l.scaleMax : 5, p = [];
      for (let y = a; y <= d; y++) p.push(y);
      u = /* @__PURE__ */ m("div", {
        class: "tb-scale",
        children: p.map((y) => /* @__PURE__ */ m("button", {
          type: "button",
          class: Number(r) === y ? "active" : "",
          onClick: () => o(y),
          children: y
        }, void 0, !1, {
          fileName: x,
          lineNumber: 168,
          columnNumber: 13
        }, this))
      }, void 0, !1, {
        fileName: x,
        lineNumber: 166,
        columnNumber: 9
      }, this);
      break;
    }
    default:
      u = /* @__PURE__ */ m("input", {
        id: `tb-${n.key}`,
        class: "tb-input",
        type: "text",
        placeholder: l.placeholder,
        maxLength: l.maxLength,
        value: X(r),
        onInput: (a) => o(a.target.value)
      }, void 0, !1, {
        fileName: x,
        lineNumber: 183,
        columnNumber: 9
      }, this);
  }
  return /* @__PURE__ */ m("div", {
    class: "tb-field",
    children: [
      s,
      u,
      i && /* @__PURE__ */ m("div", {
        class: "tb-error",
        children: i
      }, void 0, !1, {
        fileName: x,
        lineNumber: 201,
        columnNumber: 17
      }, this)
    ]
  }, void 0, !0, {
    fileName: x,
    lineNumber: 198,
    columnNumber: 5
  }, this);
}
var Nt = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/form.tsx", Tr = ["title", "reporterEmail"];
function Yt(e, t) {
  const n = e.showIf;
  if (!n || !n.fieldKey) return !0;
  const r = t[n.fieldKey];
  return "equals" in n ? r === n.equals : "notEquals" in n ? r !== n.notEquals : "in" in n && Array.isArray(n.in) ? n.in.includes(r) : !0;
}
function Lr(e) {
  const t = e.fields.filter((n) => !Tr.includes(n.key) && Yt(n, e.values));
  return /* @__PURE__ */ m("div", { children: t.map((n) => /* @__PURE__ */ m(Pr, {
    field: n,
    value: e.values[n.key],
    error: e.errors[n.key],
    onChange: (r) => e.onChange(n.key, r)
  }, n.key, !1, {
    fileName: Nt,
    lineNumber: 47,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: Nt,
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
var Jt = "trackboard:offline-queue";
function Ar() {
  return typeof navigator == "undefined" ? !0 : navigator.onLine !== !1;
}
function Mr() {
  try {
    const e = localStorage.getItem(Jt);
    if (!e) return [];
    const t = JSON.parse(e);
    return Array.isArray(t) ? t : [];
  } catch {
    return [];
  }
}
function Fr(e) {
  try {
    localStorage.setItem(Jt, JSON.stringify(e));
  } catch {
  }
}
function Dr(e) {
  const t = Mr();
  return t.push({
    payload: e,
    queuedAt: Date.now(),
    attempts: 0
  }), Fr(t), t;
}
async function Ir(e, t, n) {
  const r = `${e.replace(/\/$/, "")}/api/public/reports?key=${encodeURIComponent(t)}`, i = await fetch(r, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
  });
  if (!i.ok) {
    let o;
    try {
      o = await i.json();
    } catch {
      o = null;
    }
    const l = /* @__PURE__ */ new Error(`Report submit failed with status ${i.status}`);
    throw l.status = i.status, l.errors = o, l;
  }
  return i.json();
}
var _ = "/Users/hexacker/Work/bitsoven/trackboard/src/widget/app.tsx";
function Hr(e, t) {
  return e == null || e === "" ? !0 : Array.isArray(e) ? e.length === 0 : t === "checkbox" && typeof e == "boolean" ? e === !1 : !1;
}
function Ur(e) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
}
function jr(e) {
  var t;
  const { apiBase: n, projectKey: r, i18n: i } = e, [o, l] = $(!1), [s, u] = $("idle"), [c, f] = $(null), [h, a] = $(null), [d, p] = $({}), [y, k] = $({}), [w, g] = $(""), [S, z] = $(""), [M, q] = $(null), [Y, W] = $(null), [F, L] = $(null), [I, xe] = $(!1), [Ke, O] = $(null), [Ge, ne] = $(null), ke = (t = e.captureMode) !== null && t !== void 0 ? t : "fullpage", re = !!e.highFidelity, [Xe, ie] = $(!1), V = ft(null), K = ft(null);
  Le(() => {
    V.current || (V.current = wn()), c === null && s !== "loading" && s !== "error" && (async () => {
      u("loading");
      try {
        const b = await vn(n, r);
        f(b), u("ready");
      } catch (b) {
        a(b instanceof Error ? b.message : "config error"), u("error");
      }
    })();
  }, []), Le(() => () => {
    var b, C;
    (b = V.current) === null || b === void 0 || b.stop(), (C = K.current) === null || C === void 0 || C.call(K);
  }, []), Le(() => {
    if (o && re && Q() && !de()) try {
      localStorage.getItem("trackboard:high-fidelity-consent") === null && ie(!0);
    } catch {
    }
  }, [o, re]);
  const Qt = () => {
    wt(!0), ie(!1);
  }, Zt = () => {
    wt(!1), ie(!1);
  }, Ye = () => l((b) => !b), en = (b, C) => {
    p((H) => ({
      ...H,
      [b]: C
    }));
  }, tn = () => {
    if (I) {
      var b;
      (b = K.current) === null || b === void 0 || b.call(K), K.current = null, xe(!1), O(null);
      return;
    }
    O(i.t("widget.pinHint"));
    const C = Cr((H, A) => {
      L(A), K.current = null, xe(!1), O(null);
    });
    K.current = C, xe(!0);
  }, nn = () => {
    var b, C;
    const H = {};
    let A = !0;
    w.trim() ? q(null) : (q(i.t("widget.fieldRequired")), A = !1), S.trim() ? Ur(S.trim()) ? W(null) : (W(i.t("widget.fieldRequired")), A = !1) : (W(i.t("widget.emailRequired")), A = !1);
    for (const D of (b = c == null || (C = c.template) === null || C === void 0 ? void 0 : C.fields) !== null && b !== void 0 ? b : [])
      D.isRequired && (D.key === "title" || D.key === "reporterEmail" || Yt(D, d) && Hr(d[D.key], D.type) && (H[D.key] = i.t("widget.fieldRequired"), A = !1));
    return k(H), A;
  }, rn = async () => {
    var b, C, H, A;
    if (re && Q() && !de()) try {
      if (localStorage.getItem("trackboard:high-fidelity-consent") === null) {
        ie(!0);
        return;
      }
    } catch {
    }
    if (Xe || !nn()) return;
    u("submitting");
    const D = (b = (C = V.current) === null || C === void 0 ? void 0 : C.getErrors()) !== null && b !== void 0 ? b : [], Je = D.filter((R) => R.kind === "console").map((R) => R.message), Qe = D.filter((R) => R.kind === "network").map((R) => R.message);
    let Ne;
    if (ke === "element" && F) try {
      var Ee;
      Ne = (Ee = document.querySelector(F)) !== null && Ee !== void 0 ? Ee : void 0;
    } catch {
    }
    const on = re && Q() && de();
    let Se = null;
    on ? Se = await xt(n, {
      target: Ne,
      mode: ke,
      highFidelity: !0
    }) : Se = await Promise.race([xt(n, {
      target: Ne,
      mode: ke,
      highFidelity: !1
    }), new Promise((R) => setTimeout(() => R(null), 1500))]);
    const Ze = {
      title: w.trim(),
      reporterEmail: S.trim(),
      pageUrl: typeof location != "undefined" ? location.href : void 0,
      templateId: c == null || (H = c.template) === null || H === void 0 ? void 0 : H.id,
      fieldValues: d,
      browserInfo: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: {
          width: screen.width,
          height: screen.height
        }
      },
      consoleErrors: Je.length ? Je : void 0,
      networkErrors: Qe.length ? Qe : void 0,
      screenshotUrl: (A = Se) !== null && A !== void 0 ? A : void 0
    };
    try {
      var Ce, Re;
      const R = await Ir(n, r, Ze);
      (R == null || (Ce = R.data) === null || Ce === void 0 ? void 0 : Ce.status) === "pending_verification" ? (ne(i.t("widget.verifySent", { email: S.trim() })), O(null)) : (ne(null), O(null)), u("success"), (Re = V.current) === null || Re === void 0 || Re.stop(), V.current = null;
    } catch (R) {
      if (!Ar()) {
        var $e;
        Dr(Ze), u("success"), O(i.t("widget.error")), ne(null), ($e = V.current) === null || $e === void 0 || $e.stop(), V.current = null;
        return;
      }
      const et = R;
      console.error("[trackboard] report submit failed", et), u("error"), ne(null), O(et.status === 422 ? i.t("widget.fieldRequired") : i.t("widget.error"));
    }
  };
  return o ? /* @__PURE__ */ m("div", {
    class: `tb-root${I ? " tb-pin-active" : ""}`,
    children: /* @__PURE__ */ m("div", {
      class: "tb-panel",
      children: [
        /* @__PURE__ */ m("div", {
          class: "tb-header",
          children: [/* @__PURE__ */ m("span", {
            class: "tb-title",
            children: i.t("widget.title")
          }, void 0, !1, {
            fileName: _,
            lineNumber: 276,
            columnNumber: 11
          }, this), /* @__PURE__ */ m("button", {
            class: "tb-close",
            "aria-label": i.t("widget.close"),
            onClick: Ye,
            children: "×"
          }, void 0, !1, {
            fileName: _,
            lineNumber: 277,
            columnNumber: 11
          }, this)]
        }, void 0, !0, {
          fileName: _,
          lineNumber: 275,
          columnNumber: 9
        }, this),
        Ke && /* @__PURE__ */ m("div", {
          class: "tb-banner",
          children: Ke
        }, void 0, !1, {
          fileName: _,
          lineNumber: 282,
          columnNumber: 20
        }, this),
        Ge && /* @__PURE__ */ m("div", {
          class: "tb-verify",
          children: Ge
        }, void 0, !1, {
          fileName: _,
          lineNumber: 283,
          columnNumber: 26
        }, this),
        Xe && /* @__PURE__ */ m("div", {
          class: "tb-consent",
          children: [
            /* @__PURE__ */ m("h4", {
              class: "tb-consent-title",
              children: i.t("widget.consentTitle")
            }, void 0, !1, {
              fileName: _,
              lineNumber: 287,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("p", {
              class: "tb-consent-body",
              children: i.t("widget.consentBody")
            }, void 0, !1, {
              fileName: _,
              lineNumber: 288,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ m("div", {
              class: "tb-consent-actions",
              children: [/* @__PURE__ */ m("button", {
                class: "tb-btn tb-btn-primary",
                onClick: Qt,
                children: i.t("widget.consentAllow")
              }, void 0, !1, {
                fileName: _,
                lineNumber: 290,
                columnNumber: 15
              }, this), /* @__PURE__ */ m("button", {
                class: "tb-btn tb-btn-secondary",
                onClick: Zt,
                children: i.t("widget.consentDeny")
              }, void 0, !1, {
                fileName: _,
                lineNumber: 293,
                columnNumber: 15
              }, this)]
            }, void 0, !0, {
              fileName: _,
              lineNumber: 289,
              columnNumber: 13
            }, this)
          ]
        }, void 0, !0, {
          fileName: _,
          lineNumber: 286,
          columnNumber: 11
        }, this),
        s === "loading" && /* @__PURE__ */ m("div", { children: i.t("widget.sending") }, void 0, !1, {
          fileName: _,
          lineNumber: 300,
          columnNumber: 34
        }, this),
        s === "error" && h && /* @__PURE__ */ m("div", {
          class: "tb-error",
          children: h
        }, void 0, !1, {
          fileName: _,
          lineNumber: 301,
          columnNumber: 47
        }, this),
        s === "success" && /* @__PURE__ */ m("div", {
          class: "tb-success",
          children: i.t("widget.success")
        }, void 0, !1, {
          fileName: _,
          lineNumber: 303,
          columnNumber: 34
        }, this),
        (s === "ready" || s === "submitting" || s === "error") && c && /* @__PURE__ */ m("div", { children: [
          /* @__PURE__ */ m("div", {
            class: "tb-field",
            children: [
              /* @__PURE__ */ m("label", {
                class: "tb-label",
                for: "tb-title",
                children: [i.t("widget.titleLabel"), /* @__PURE__ */ m("span", {
                  class: "tb-req",
                  children: " *"
                }, void 0, !1, {
                  fileName: _,
                  lineNumber: 310,
                  columnNumber: 17
                }, this)]
              }, void 0, !0, {
                fileName: _,
                lineNumber: 308,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ m("input", {
                id: "tb-title",
                class: "tb-input",
                type: "text",
                placeholder: i.t("widget.titlePlaceholder"),
                value: w,
                onInput: (b) => g(b.target.value)
              }, void 0, !1, {
                fileName: _,
                lineNumber: 312,
                columnNumber: 15
              }, this),
              M && /* @__PURE__ */ m("div", {
                class: "tb-error",
                children: M
              }, void 0, !1, {
                fileName: _,
                lineNumber: 320,
                columnNumber: 30
              }, this)
            ]
          }, void 0, !0, {
            fileName: _,
            lineNumber: 307,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m("div", {
            class: "tb-field",
            children: [
              /* @__PURE__ */ m("label", {
                class: "tb-label",
                for: "tb-email",
                children: [i.t("widget.emailLabel"), /* @__PURE__ */ m("span", {
                  class: "tb-req",
                  children: " *"
                }, void 0, !1, {
                  fileName: _,
                  lineNumber: 326,
                  columnNumber: 17
                }, this)]
              }, void 0, !0, {
                fileName: _,
                lineNumber: 324,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ m("input", {
                id: "tb-email",
                class: "tb-input",
                type: "email",
                placeholder: i.t("widget.emailPlaceholder"),
                value: S,
                onInput: (b) => z(b.target.value)
              }, void 0, !1, {
                fileName: _,
                lineNumber: 328,
                columnNumber: 15
              }, this),
              Y && /* @__PURE__ */ m("div", {
                class: "tb-error",
                children: Y
              }, void 0, !1, {
                fileName: _,
                lineNumber: 336,
                columnNumber: 30
              }, this),
              c.project.requireEmailVerification && /* @__PURE__ */ m("div", {
                class: "tb-hint",
                children: i.t("widget.emailRequired")
              }, void 0, !1, {
                fileName: _,
                lineNumber: 338,
                columnNumber: 17
              }, this)
            ]
          }, void 0, !0, {
            fileName: _,
            lineNumber: 323,
            columnNumber: 13
          }, this),
          c.template && /* @__PURE__ */ m(Lr, {
            fields: c.template.fields,
            values: d,
            errors: y,
            i18n: i,
            onChange: en
          }, void 0, !1, {
            fileName: _,
            lineNumber: 343,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ m("div", {
            class: "tb-hint",
            children: i.t("widget.screenshot")
          }, void 0, !1, {
            fileName: _,
            lineNumber: 352,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ m("button", {
            type: "button",
            class: "tb-submit",
            onClick: tn,
            children: F ? i.t("widget.pinned", { selector: F }) : i.t("widget.pin")
          }, void 0, !1, {
            fileName: _,
            lineNumber: 353,
            columnNumber: 13
          }, this),
          F && /* @__PURE__ */ m("div", {
            class: "tb-pinned",
            children: F
          }, void 0, !1, {
            fileName: _,
            lineNumber: 356,
            columnNumber: 24
          }, this),
          /* @__PURE__ */ m("button", {
            id: "tb-submit-btn",
            class: "tb-submit",
            disabled: s === "submitting",
            onClick: () => {
              rn();
            },
            children: s === "submitting" ? i.t("widget.sending") : i.t("widget.submit")
          }, void 0, !1, {
            fileName: _,
            lineNumber: 358,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: _,
          lineNumber: 306,
          columnNumber: 11
        }, this)
      ]
    }, void 0, !0, {
      fileName: _,
      lineNumber: 274,
      columnNumber: 7
    }, this)
  }, void 0, !1, {
    fileName: _,
    lineNumber: 273,
    columnNumber: 5
  }, this) : /* @__PURE__ */ m("div", {
    class: "tb-root",
    children: /* @__PURE__ */ m("button", {
      class: "tb-fab",
      "aria-label": i.t("widget.open"),
      onClick: Ye,
      children: "!"
    }, void 0, !1, {
      fileName: _,
      lineNumber: 265,
      columnNumber: 9
    }, this)
  }, void 0, !1, {
    fileName: _,
    lineNumber: 264,
    columnNumber: 7
  }, this);
}
function qr() {
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
  .tb-verify { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 8px; border-radius: 8px; margin-bottom: 10px; font-size: 13px; line-height: 1.5; }
  .tb-consent { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 8px; margin-bottom: 12px; }
  .tb-consent-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #1e3a8a; }
  .tb-consent-body { font-size: 12px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
  .tb-consent-actions { display: flex; gap: 8px; }
  .tb-btn { padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; border: 1px solid transparent; }
  .tb-btn-primary { background: #2563eb; color: #fff; border-color: #2563eb; }
  .tb-btn-secondary { background: #fff; color: #334155; border-color: #cbd5e1; }
  .tb-pin-active .tb-highlight {
    outline: 2px dashed #2563eb !important; outline-offset: 2px;
    background: rgba(37,99,235,.08); cursor: crosshair;
  }
  `;
}
function te(e) {
  "@babel/helpers - typeof";
  return te = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, te(e);
}
function Wr(e, t) {
  if (te(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (te(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vr(e) {
  var t = Wr(e, "string");
  return te(t) == "symbol" ? t : t + "";
}
function Et(e, t, n) {
  return (t = Vr(t)) in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Z = {
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
    "widget.fieldRequired": "This field is required",
    "widget.consentTitle": "High-fidelity screenshot",
    "widget.consentBody": "Trackboard will ask to share your screen for a pixel-perfect capture. You can deny and we will use a standard capture instead.",
    "widget.consentAllow": "Allow screen share",
    "widget.consentDeny": "Use standard capture",
    "widget.captureModeLabel": "Capture area",
    "widget.captureModeVisible": "Visible area",
    "widget.captureModeFullpage": "Full page",
    "widget.captureModeElement": "Pinned element",
    "widget.screenshotTooLarge": "Screenshot too large, recompressing…",
    "widget.verifySent": "We sent a confirmation email to {email}. Please check your inbox and click the link to verify your report."
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
    "widget.fieldRequired": "Este campo es obligatorio",
    "widget.consentTitle": "Captura de alta fidelidad",
    "widget.consentBody": "Trackboard pedirá compartir tu pantalla para una captura perfecta. Puedes denegar y usaremos una captura estándar.",
    "widget.consentAllow": "Permitir compartir pantalla",
    "widget.consentDeny": "Usar captura estándar",
    "widget.captureModeLabel": "Área de captura",
    "widget.captureModeVisible": "Área visible",
    "widget.captureModeFullpage": "Página completa",
    "widget.captureModeElement": "Elemento fijado",
    "widget.screenshotTooLarge": "Captura muy grande, recomprimiendo…",
    "widget.verifySent": "Enviamos un correo de confirmación a {email}. Revisa tu bandeja y haz clic en el enlace para verificar tu reporte."
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
    "widget.fieldRequired": "Dieses Feld ist erforderlich",
    "widget.consentTitle": "Hochauflösende Aufnahme",
    "widget.consentBody": "Trackboard wird um Bildschirmfreigabe bitten für eine pixelgenaue Aufnahme. Du kannst ablehnen und wir nutzen eine Standardaufnahme.",
    "widget.consentAllow": "Bildschirmfreigabe erlauben",
    "widget.consentDeny": "Standardaufnahme verwenden",
    "widget.captureModeLabel": "Aufnahmebereich",
    "widget.captureModeVisible": "Sichtbarer Bereich",
    "widget.captureModeFullpage": "Gesamte Seite",
    "widget.captureModeElement": "Angeheftetes Element",
    "widget.screenshotTooLarge": "Screenshot zu groß, wird neu kodiert…",
    "widget.verifySent": "Wir haben eine Bestätigungs-E-Mail an {email} gesendet. Bitte prüfe dein Postfach und klicke auf den Link, um deinen Bericht zu bestätigen."
  }
}, Br = class {
  constructor(e = "en") {
    var t;
    Et(this, "dict", void 0), Et(this, "locale", void 0), this.locale = e, this.dict = (t = Z[e]) !== null && t !== void 0 ? t : Z.en;
  }
  t(e, t) {
    var n, r;
    let i = (n = (r = this.dict[e]) !== null && r !== void 0 ? r : Z.en[e]) !== null && n !== void 0 ? n : e;
    if (t) for (const [o, l] of Object.entries(t)) i = i.replace(new RegExp(`\\{${o}\\}`, "g"), String(l));
    return i;
  }
};
function zr(e) {
  if (e && Z[e]) return e;
  if (typeof navigator != "undefined" && navigator.language) {
    const t = navigator.language.slice(0, 2).toLowerCase();
    if (Z[t]) return t;
  }
  return "en";
}
function Or() {
  var e;
  return document.currentScript instanceof HTMLScriptElement ? document.currentScript : (e = Array.from(document.querySelectorAll("script[src]")).find((t) => t.src.includes("/widget/v1/widget.js"))) !== null && e !== void 0 ? e : null;
}
function St() {
  var e;
  const t = Or();
  if (!t) {
    console.warn("[trackboard] widget: could not locate own <script> tag");
    return;
  }
  const n = t.dataset.projectKey;
  if (!n) {
    console.warn("[trackboard] widget: missing data-project-key attribute");
    return;
  }
  const r = t.src ? new URL(t.src).origin : location.origin, i = new Br(zr(t.dataset.locale)), o = (e = t.dataset.captureMode) !== null && e !== void 0 ? e : "fullpage", l = t.dataset.highFidelity === "true", s = document.createElement("div");
  s.id = "trackboard-widget", document.body.appendChild(s);
  const u = t.dataset.shadowMode === "open" ? "open" : "closed", c = s.attachShadow({ mode: u }), f = document.createElement("style");
  f.textContent = qr(), c.appendChild(f);
  const h = document.createElement("style");
  h.textContent = ".tb-highlight{outline:2px dashed #2563eb!important;outline-offset:2px;background:rgba(37,99,235,.08);}", document.head.appendChild(h), hn(Tt(jr, {
    apiBase: r,
    projectKey: n,
    i18n: i,
    captureMode: o,
    highFidelity: l
  }), c);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", St) : St();
