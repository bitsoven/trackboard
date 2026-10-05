var xe,
  y,
  Ft,
  gn,
  V,
  ut,
  It,
  Ht,
  De,
  de,
  Q,
  Ut,
  Be,
  je,
  qe,
  bn,
  ge = {},
  be = [],
  _n = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  Ne = Array.isArray
function q(e, t) {
  for (var n in t) e[n] = t[n]
  return e
}
function Oe(e) {
  e && e.parentNode && e.parentNode.removeChild(e)
}
function jt(e, t, n) {
  var r,
    o,
    i,
    l = {}
  for (i in t) i == 'key' ? (r = t[i]) : i == 'ref' ? (o = t[i]) : (l[i] = t[i])
  if (
    (arguments.length > 2 && (l.children = arguments.length > 3 ? xe.call(arguments, 2) : n),
    typeof e == 'function' && e.defaultProps != null)
  )
    for (i in e.defaultProps) l[i] === void 0 && (l[i] = e.defaultProps[i])
  return fe(e, l, r, o, null)
}
function fe(e, t, n, r, o) {
  var i = {
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
    __v: o == null ? ++Ft : o,
    __i: -1,
    __u: 0,
  }
  return (o == null && y.vnode != null && y.vnode(i), i)
}
function ke(e) {
  return e.children
}
function me(e, t) {
  ;((this.props = e), (this.context = t))
}
function K(e, t) {
  if (t == null) return e.__ ? K(e.__, e.__i + 1) : null
  for (var n; t < e.__k.length; t++) if ((n = e.__k[t]) != null && n.__e != null) return n.__e
  return typeof e.type == 'function' ? K(e) : null
}
function vn(e) {
  if (e.__P && e.__d) {
    var t = e.__v,
      n = t.__e,
      r = [],
      o = [],
      i = q({}, t)
    ;((i.__v = t.__v + 1),
      y.vnode && y.vnode(i),
      Ge(
        e.__P,
        i,
        t,
        e.__n,
        e.__P.namespaceURI,
        32 & t.__u ? [n] : null,
        r,
        n == null ? K(t) : n,
        !!(32 & t.__u),
        o
      ),
      (i.__v = t.__v),
      (i.__.__k[i.__i] = i),
      Bt(r, i, o),
      (t.__e = t.__ = null),
      i.__e != n && qt(i))
  }
}
function qt(e) {
  if ((e = e.__) != null && e.__c != null)
    return (
      (e.__e = e.__c.base = null),
      e.__k.some(function (t) {
        if (t != null && t.__e != null) return (e.__e = e.__c.base = t.__e)
      }),
      qt(e)
    )
}
function dt(e) {
  ;((!e.__d && (e.__d = !0) && V.push(e) && !_e.__r++) || ut != y.debounceRendering) &&
    ((ut = y.debounceRendering) || It)(_e)
}
function _e() {
  try {
    for (var e, t = 1; V.length;)
      (V.length > t && V.sort(Ht), (e = V.shift()), (t = V.length), vn(e))
  } finally {
    V.length = _e.__r = 0
  }
}
function Wt(e, t, n, r, o, i, l, c, u, s, m) {
  var g,
    a,
    f,
    h,
    w,
    x,
    N = (r && r.__k) || be,
    _ = t.length
  for (u = yn(n, t, N, u, _), g = 0; g < _; g++)
    (f = n.__k[g]) != null &&
      ((a = (f.__i != -1 && N[f.__i]) || ge),
      (f.__i = g),
      (x = Ge(e, f, a, o, i, l, c, u, s, m)),
      (h = f.__e),
      f.ref && a.ref != f.ref && (a.ref && Ke(a.ref, null, f), m.push(f.ref, f.__c || h, f)),
      w == null && h != null && (w = h),
      4 & f.__u
        ? ((u = zt(f, u, e)), a.__e && (a.__e = null))
        : typeof f.type == 'function' && x !== void 0
          ? (u = x)
          : h && (u = h.nextSibling),
      (f.__u &= -7))
  return ((n.__e = w), u)
}
function yn(e, t, n, r, o) {
  var i,
    l,
    c,
    u,
    s,
    m = n.length,
    g = m,
    a = 0
  for (e.__k = new Array(o), i = 0; i < o; i++)
    (l = t[i]) != null && typeof l != 'boolean' && typeof l != 'function'
      ? (typeof l == 'string' ||
        typeof l == 'number' ||
        typeof l == 'bigint' ||
        l.constructor == String
          ? (l = e.__k[i] = fe(null, l, null, null, null))
          : Ne(l)
            ? (l = e.__k[i] = fe(ke, { children: l }, null, null, null))
            : l.constructor === void 0 && l.__b > 0
              ? (l = e.__k[i] = fe(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v))
              : (e.__k[i] = l),
        (u = i + a),
        (l.__ = e),
        (l.__b = e.__b + 1),
        (c = null),
        (s = l.__i = wn(l, n, u, g)) != -1 && (g--, (c = n[s]) && (c.__u |= 2)),
        c == null || c.__v == null
          ? (s == -1 && (o > m ? a-- : o < m && a++), typeof l.type != 'function' && (l.__u |= 4))
          : s != u && (s == u - 1 ? a-- : s == u + 1 ? a++ : (s > u ? a-- : a++, (l.__u |= 4))))
      : (e.__k[i] = null)
  if (g)
    for (i = 0; i < m; i++)
      (c = n[i]) != null && (2 & c.__u) == 0 && (c.__e == r && (r = K(c)), Gt(c, c))
  return r
}
function zt(e, t, n) {
  var r, o
  if (typeof e.type == 'function') {
    for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && ((r[o].__ = e), (t = zt(r[o], t, n)))
    return t
  }
  e.__e != t && (t && e.type && !t.parentNode && (t = K(e)), (t = n.insertBefore(e.__e, t || null)))
  do t = t && t.nextSibling
  while (t != null && t.nodeType == 8)
  return t
}
function wn(e, t, n, r) {
  var o,
    i,
    l,
    c = e.key,
    u = e.type,
    s = t[n],
    m = s != null && (2 & s.__u) == 0
  if ((s === null && c == null) || (m && c == s.key && u == s.type)) return n
  if (r > (m ? 1 : 0)) {
    for (o = n - 1, i = n + 1; o >= 0 || i < t.length;)
      if (
        (s = t[(l = o >= 0 ? o-- : i++)]) != null &&
        (2 & s.__u) == 0 &&
        c == s.key &&
        u == s.type
      )
        return l
  }
  return -1
}
function ft(e, t, n) {
  t[0] == '-'
    ? e.setProperty(t, n == null ? '' : n)
    : (e[t] = n == null ? '' : typeof n != 'number' || _n.test(t) ? n : n + 'px')
}
function ce(e, t, n, r, o) {
  var i, l
  e: if (t == 'style')
    if (typeof n == 'string') e.style.cssText = n
    else {
      if ((typeof r == 'string' && (e.style.cssText = r = ''), r))
        for (t in r) (n && t in n) || ft(e.style, t, '')
      if (n) for (t in n) (r && n[t] == r[t]) || ft(e.style, t, n[t])
    }
  else if (t[0] == 'o' && t[1] == 'n')
    ((i = t != (t = t.replace(Ut, '$1'))),
      (l = t.toLowerCase()),
      (t = l in e || t == 'onFocusOut' || t == 'onFocusIn' ? l.slice(2) : t.slice(2)),
      e.l || (e.l = {}),
      (e.l[t + i] = n),
      n
        ? r
          ? (n[Q] = r[Q])
          : ((n[Q] = Be), e.addEventListener(t, i ? qe : je, i))
        : e.removeEventListener(t, i ? qe : je, i))
  else {
    if (o == 'http://www.w3.org/2000/svg') t = t.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's')
    else if (
      t != 'width' &&
      t != 'height' &&
      t != 'href' &&
      t != 'list' &&
      t != 'form' &&
      t != 'tabIndex' &&
      t != 'download' &&
      t != 'rowSpan' &&
      t != 'colSpan' &&
      t != 'role' &&
      t != 'popover' &&
      t in e
    )
      try {
        e[t] = n == null ? '' : n
        break e
      } catch {}
    typeof n == 'function' ||
      (n == null || (n === !1 && t[4] != '-')
        ? e.removeAttribute(t)
        : e.setAttribute(t, t == 'popover' && n == 1 ? '' : n))
  }
}
function mt(e) {
  return function (t) {
    if (this.l) {
      var n = this.l[t.type + e]
      if (t[de] == null) t[de] = Be++
      else if (t[de] < n[Q]) return
      return n(y.event ? y.event(t) : t)
    }
  }
}
function Ge(e, t, n, r, o, i, l, c, u, s) {
  var m,
    g,
    a,
    f,
    h,
    w,
    x,
    N,
    _,
    L,
    B,
    F,
    H,
    re,
    I,
    J,
    A = t.type
  if (t.constructor !== void 0) return null
  ;(128 & n.__u && ((u = !!(32 & n.__u)), (i = [(c = t.__e = n.__e)])), (m = y.__b) && m(t))
  e: if (typeof A == 'function') {
    g = l.length
    try {
      if (
        ((_ = t.props),
        (L = A.prototype && A.prototype.render),
        (B = (m = A.contextType) && r[m.__c]),
        (F = m ? (B ? B.props.value : m.__) : r),
        n.__c
          ? (N = (a = t.__c = n.__c).__ = a.__E)
          : (L
              ? (t.__c = a = new A(_, F))
              : ((t.__c = a = new me(_, F)), (a.constructor = A), (a.render = Nn)),
            B && B.sub(a),
            a.state || (a.state = {}),
            (a.__n = r),
            (f = a.__d = !0),
            (a.__h = []),
            (a._sb = [])),
        L && a.__s == null && (a.__s = a.state),
        L &&
          A.getDerivedStateFromProps != null &&
          (a.__s == a.state && (a.__s = q({}, a.__s)),
          q(a.__s, A.getDerivedStateFromProps(_, a.__s))),
        (h = a.props),
        (w = a.state),
        (a.__v = t),
        f)
      )
        (L &&
          A.getDerivedStateFromProps == null &&
          a.componentWillMount != null &&
          a.componentWillMount(),
          L && a.componentDidMount != null && a.__h.push(a.componentDidMount))
      else {
        if (
          (L &&
            A.getDerivedStateFromProps == null &&
            _ !== h &&
            a.componentWillReceiveProps != null &&
            a.componentWillReceiveProps(_, F),
          t.__v == n.__v ||
            (!a.__e &&
              a.shouldComponentUpdate != null &&
              a.shouldComponentUpdate(_, a.__s, F) === !1))
        ) {
          ;(t.__v != n.__v && ((a.props = _), (a.state = a.__s), (a.__d = !1)),
            (t.__e = n.__e),
            (t.__k = n.__k),
            t.__k.some(function (U) {
              U && (U.__ = t)
            }),
            be.push.apply(a.__h, a._sb),
            (a._sb = []),
            a.__h.length && l.push(a),
            (c = K(n)))
          break e
        }
        ;(a.componentWillUpdate != null && a.componentWillUpdate(_, a.__s, F),
          L &&
            a.componentDidUpdate != null &&
            a.__h.push(function () {
              a.componentDidUpdate(h, w, x)
            }))
      }
      if (((a.context = F), (a.props = _), (a.__P = e), (a.__e = !1), (H = y.__r), (re = 0), L))
        ((a.state = a.__s),
          (a.__d = !1),
          H && H(t),
          (m = a.render(a.props, a.state, a.context)),
          be.push.apply(a.__h, a._sb),
          (a._sb = []))
      else
        do ((a.__d = !1), H && H(t), (m = a.render(a.props, a.state, a.context)), (a.state = a.__s))
        while (a.__d && ++re < 25)
      ;((a.state = a.__s),
        a.getChildContext != null && (r = q(q({}, r), a.getChildContext())),
        L && !f && a.getSnapshotBeforeUpdate != null && (x = a.getSnapshotBeforeUpdate(h, w)),
        (I = m != null && m.type === ke && m.key == null ? Ot(m.props.children) : m),
        (c = Wt(e, Ne(I) ? I : [I], t, n, r, o, i, l, c, u, s)),
        (a.base = t.__e),
        (t.__u &= -161),
        a.__h.length && l.push(a),
        N && (a.__E = a.__ = null))
    } catch (U) {
      if (((l.length = g), (t.__v = null), u || i != null)) {
        if (U.then) {
          for (t.__u |= u ? 160 : 128; c && c.nodeType == 8 && c.nextSibling;) c = c.nextSibling
          ;(i != null && (i[i.indexOf(c)] = null), (t.__e = c))
        } else if (i != null) for (J = i.length; J--;) Oe(i[J])
      } else t.__e = n.__e
      ;(t.__k == null && (t.__k = n.__k || []), U.then || Vt(t), y.__e(U, t, n))
    }
  } else
    i == null && t.__v == n.__v
      ? ((t.__k = n.__k), (t.__e = n.__e))
      : (c = t.__e = xn(n.__e, t, n, r, o, i, l, u, s))
  return ((m = y.diffed) && m(t), 128 & t.__u ? void 0 : c)
}
function Vt(e) {
  e && (e.__c && (e.__c.__e = !0), e.__k && e.__k.some(Vt))
}
function Bt(e, t, n) {
  for (var r = 0; r < n.length; r++) Ke(n[r], n[++r], n[++r])
  ;(y.__c && y.__c(t, e),
    e.some(function (o) {
      try {
        ;((e = o.__h),
          (o.__h = []),
          e.some(function (i) {
            i.call(o)
          }))
      } catch (i) {
        y.__e(i, o.__v)
      }
    }))
}
function Ot(e) {
  return typeof e != 'object' || e == null || e.__b > 0
    ? e
    : Ne(e)
      ? e.map(Ot)
      : e.constructor !== void 0
        ? null
        : q({}, e)
}
function xn(e, t, n, r, o, i, l, c, u) {
  var s,
    m,
    g,
    a,
    f,
    h,
    w,
    x = n.props || ge,
    N = t.props,
    _ = t.type
  if (
    (_ == 'svg'
      ? (o = 'http://www.w3.org/2000/svg')
      : _ == 'math'
        ? (o = 'http://www.w3.org/1998/Math/MathML')
        : o || (o = 'http://www.w3.org/1999/xhtml'),
    i != null)
  ) {
    for (s = 0; s < i.length; s++)
      if ((f = i[s]) && 'setAttribute' in f == !!_ && (_ ? f.localName == _ : f.nodeType == 3)) {
        ;((e = f), (i[s] = null))
        break
      }
  }
  if (e == null) {
    if (_ == null) return document.createTextNode(N)
    ;((e = document.createElementNS(o, _, N.is && N)),
      c && (y.__m && y.__m(t, i), (c = !1)),
      (i = null))
  }
  if (_ == null) x === N || (c && e.data == N) || (e.data = N)
  else {
    if (
      ((i = _ == 'textarea' && N.defaultValue != null ? null : i && xe.call(e.childNodes)),
      !c && i != null)
    )
      for (x = {}, s = 0; s < e.attributes.length; s++) x[(f = e.attributes[s]).name] = f.value
    for (s in x)
      ((f = x[s]),
        s == 'dangerouslySetInnerHTML'
          ? (g = f)
          : s == 'children' ||
            s in N ||
            (s == 'value' && 'defaultValue' in N) ||
            (s == 'checked' && 'defaultChecked' in N) ||
            ce(e, s, null, f, o))
    for (s in N)
      ((f = N[s]),
        s == 'children'
          ? (a = f)
          : s == 'dangerouslySetInnerHTML'
            ? (m = f)
            : s == 'value'
              ? (h = f)
              : s == 'checked'
                ? (w = f)
                : (c && typeof f != 'function') || x[s] === f || ce(e, s, f, x[s], o))
    if (m)
      (c || (g && (m.__html == g.__html || m.__html == e.innerHTML)) || (e.innerHTML = m.__html),
        (t.__k = []))
    else if (
      (g && (e.innerHTML = ''),
      Wt(
        t.type == 'template' ? e.content : e,
        Ne(a) ? a : [a],
        t,
        n,
        r,
        _ == 'foreignObject' ? 'http://www.w3.org/1999/xhtml' : o,
        i,
        l,
        i ? i[0] : n.__k && K(n, 0),
        c,
        u
      ),
      i != null)
    )
      for (s = i.length; s--;) Oe(i[s])
    ;(c && _ != 'textarea') ||
      ((s = 'value'),
      _ == 'progress' && h == null
        ? e.removeAttribute('value')
        : h != null &&
          (h !== e[s] || (_ == 'progress' && !h) || (_ == 'option' && h != x[s])) &&
          ce(e, s, h, x[s], o),
      (s = 'checked'),
      w != null && w != e[s] && ce(e, s, w, x[s], o))
  }
  return e
}
function Ke(e, t, n) {
  try {
    if (typeof e == 'function') {
      var r = typeof e.__u == 'function'
      ;(r && e.__u(), (r && t == null) || (e.__u = e(t)))
    } else e.current = t
  } catch (o) {
    y.__e(o, n)
  }
}
function Gt(e, t, n) {
  var r, o
  if (
    (y.unmount && y.unmount(e),
    (r = e.ref) && ((r.current && r.current != e.__e) || Ke(r, null, t)),
    (r = e.__c) != null)
  ) {
    if (r.componentWillUnmount)
      try {
        r.componentWillUnmount()
      } catch (i) {
        y.__e(i, t)
      }
    r.base = r.__P = r.__n = null
  }
  if ((r = e.__k))
    for (o = 0; o < r.length; o++) r[o] && Gt(r[o], t, n || typeof e.type != 'function')
  ;(n || Oe(e.__e), (e.__c = e.__ = e.__e = void 0))
}
function Nn(e, t, n) {
  return this.constructor(e, n)
}
function kn(e, t, n) {
  var r, o, i, l
  ;(t == document && (t = document.documentElement),
    y.__ && y.__(e, t),
    (o = (r = typeof n == 'function') ? null : (n && n.__k) || t.__k),
    (i = []),
    (l = []),
    Ge(
      t,
      (e = ((!r && n) || t).__k = jt(ke, null, [e])),
      o || ge,
      ge,
      t.namespaceURI,
      !r && n ? [n] : o ? null : t.firstChild ? xe.call(t.childNodes) : null,
      i,
      !r && n ? n : o ? o.__e : t.firstChild,
      r,
      l
    ),
    Bt(i, e, l),
    (e.props.children = null))
}
;((xe = be.slice),
  (y = {
    __e: function (e, t, n, r) {
      for (var o, i, l; (t = t.__);)
        if ((o = t.__c) && !o.__)
          try {
            if (
              ((i = o.constructor) &&
                i.getDerivedStateFromError != null &&
                (o.setState(i.getDerivedStateFromError(e)), (l = o.__d)),
              o.componentDidCatch != null && (o.componentDidCatch(e, r || {}), (l = o.__d)),
              l)
            )
              return (o.__E = o)
          } catch (c) {
            e = c
          }
      throw e
    },
  }),
  (Ft = 0),
  (gn = function (e) {
    return e != null && e.constructor === void 0
  }),
  (me.prototype.setState = function (e, t) {
    var n = this.__s != null && this.__s != this.state ? this.__s : (this.__s = q({}, this.state))
    ;(typeof e == 'function' && (e = e(q({}, n), this.props)),
      e && q(n, e),
      e != null && this.__v && (t && this._sb.push(t), dt(this)))
  }),
  (me.prototype.forceUpdate = function (e) {
    this.__v && ((this.__e = !0), e && this.__h.push(e), dt(this))
  }),
  (me.prototype.render = ke),
  (V = []),
  (It = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
  (Ht = function (e, t) {
    return e.__v.__b - t.__v.__b
  }),
  (_e.__r = 0),
  (De = Math.random().toString(8)),
  (de = '__d' + De),
  (Q = '__a' + De),
  (Ut = /(PointerCapture)$|Capture$/i),
  (Be = 0),
  (je = mt(!1)),
  (qe = mt(!0)),
  (bn = 0))
var te,
  E,
  Fe,
  ht,
  ve = 0,
  Kt = [],
  S = y,
  pt = S.__b,
  gt = S.__r,
  bt = S.diffed,
  _t = S.__c,
  vt = S.unmount,
  yt = S.__
function Xe(e, t) {
  ;(S.__h && S.__h(E, e, ve || t), (ve = 0))
  var n =
    E.__H ||
    (E.__H = {
      __: [],
      __h: [],
    })
  return (e >= n.__.length && n.__.push({}), n.__[e])
}
function C(e) {
  return ((ve = 1), En(Yt, e))
}
function En(e, t, n) {
  var r = Xe(te++, 2)
  if (
    ((r.t = e),
    !r.__c &&
      ((r.__ = [
        n ? n(t) : Yt(void 0, t),
        function (c) {
          var u = r.__N ? r.__N[0] : r.__[0],
            s = r.t(u, c)
          u !== s && ((r.__N = [s, r.__[1]]), r.__c.setState({}))
        },
      ]),
      (r.__c = E),
      !E.__f))
  ) {
    var o = function (c, u, s) {
      if (!r.__c.__H) return !0
      var m = !1,
        g = r.__c.props !== c
      if (
        (r.__c.__H.__.some(function (f) {
          if (f.__N) {
            m = !0
            var h = f.__[0]
            ;((f.__ = f.__N), (f.__N = void 0), h !== f.__[0] && (g = !0))
          }
        }),
        i)
      ) {
        var a = i.call(this, c, u, s)
        return m ? a || g : a
      }
      return !m || g
    }
    E.__f = !0
    var i = E.shouldComponentUpdate,
      l = E.componentWillUpdate
    ;((E.componentWillUpdate = function (c, u, s) {
      if (this.__e) {
        var m = i
        ;((i = void 0), o(c, u, s), (i = m))
      }
      l && l.call(this, c, u, s)
    }),
      (E.shouldComponentUpdate = o))
  }
  return r.__N || r.__
}
function Ie(e, t) {
  var n = Xe(te++, 3)
  !S.__s && Xt(n.__H, t) && ((n.__ = e), (n.u = t), E.__H.__h.push(n))
}
function wt(e) {
  return (
    (ve = 5),
    Sn(function () {
      return { current: e }
    }, [])
  )
}
function Sn(e, t) {
  var n = Xe(te++, 7)
  return (Xt(n.__H, t) && ((n.__ = e()), (n.__H = t), (n.__h = e)), n.__)
}
function Cn() {
  for (var e; (e = Kt.shift());) {
    var t = e.__H
    if (e.__P && t)
      try {
        ;(t.__h.some(he), t.__h.some(We), (t.__h = []))
      } catch (n) {
        ;((t.__h = []), S.__e(n, e.__v))
      }
  }
}
;((S.__b = function (e) {
  ;((E = null), pt && pt(e))
}),
  (S.__ = function (e, t) {
    ;(e && t.__k && t.__k.__m && (e.__m = t.__k.__m), yt && yt(e, t))
  }),
  (S.__r = function (e) {
    ;(gt && gt(e), (te = 0))
    var t = (E = e.__c).__H
    ;(t &&
      (Fe === E
        ? ((t.__h = []),
          (E.__h = []),
          t.__.some(function (n) {
            ;(n.__N && (n.__ = n.__N), (n.u = n.__N = void 0))
          }))
        : (t.__h.some(he), t.__h.some(We), (t.__h = []), (te = 0))),
      (Fe = E))
  }),
  (S.diffed = function (e) {
    bt && bt(e)
    var t = e.__c
    ;(t &&
      t.__H &&
      (t.__H.__h.length &&
        ((Kt.push(t) !== 1 && ht === S.requestAnimationFrame) ||
          ((ht = S.requestAnimationFrame) || Rn)(Cn)),
      t.__H.__.some(function (n) {
        n.u && ((n.__H = n.u), (n.u = void 0))
      })),
      (Fe = E = null))
  }),
  (S.__c = function (e, t) {
    ;(t.some(function (n) {
      try {
        ;(n.__h.some(he),
          (n.__h = n.__h.filter(function (r) {
            return !r.__ || We(r)
          })))
      } catch (r) {
        ;(t.some(function (o) {
          o.__h && (o.__h = [])
        }),
          (t = []),
          S.__e(r, n.__v))
      }
    }),
      _t && _t(e, t))
  }),
  (S.unmount = function (e) {
    vt && vt(e)
    var t,
      n = e.__c
    n &&
      n.__H &&
      (n.__H.__.some(function (r) {
        try {
          he(r)
        } catch (o) {
          t = o
        }
      }),
      (n.__H = void 0),
      t && S.__e(t, n.__v))
  }))
var xt = typeof requestAnimationFrame == 'function'
function Rn(e) {
  var t,
    n = function () {
      ;(clearTimeout(r), xt && cancelAnimationFrame(t), setTimeout(e))
    },
    r = setTimeout(n, 35)
  xt && (t = requestAnimationFrame(n))
}
function he(e) {
  var t = E,
    n = e.__c
  ;(typeof n == 'function' && ((e.__c = void 0), n()), (E = t))
}
function We(e) {
  var t = E
  ;((e.__c = e.__()), (E = t))
}
function Xt(e, t) {
  return (
    !e ||
    e.length !== t.length ||
    t.some(function (n, r) {
      return n !== e[r]
    })
  )
}
function Yt(e, t) {
  return typeof t == 'function' ? t(e) : t
}
async function Tn(e, t) {
  const n = `${e.replace(/\/$/, '')}/api/public/widget/config?key=${encodeURIComponent(t)}`,
    r = await fetch(n, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`Widget config request failed with status ${r.status}`)
  return (await r.json()).data
}
function He(e) {
  if (typeof e == 'string') return e
  if (e instanceof Error) return e.message
  try {
    return JSON.stringify(e)
  } catch {
    return String(e)
  }
}
function $n(e, t) {
  var n, r
  let o
  typeof e == 'string'
    ? (o = e)
    : e instanceof URL
      ? (o = e.toString())
      : e instanceof Request
        ? (o = e.url)
        : (o = String(e))
  const i = (
    (n =
      (r = t == null ? void 0 : t.method) !== null && r !== void 0
        ? r
        : e instanceof Request
          ? e.method
          : 'GET') !== null && n !== void 0
      ? n
      : 'GET'
  ).toUpperCase()
  return {
    url: o,
    method: i,
  }
}
function Pn() {
  const e = [],
    t = console.error,
    n = (...s) => {
      ;(e.push({
        kind: 'console',
        message: s.map(He).join(' '),
        timestamp: Date.now(),
      }),
        t.apply(console, s))
    },
    r = (s) => {
      e.push({
        kind: 'window',
        message: s.message,
        timestamp: Date.now(),
        detail: s.filename ? `${s.filename}:${s.lineno}` : void 0,
      })
    },
    o = (s) => {
      e.push({
        kind: 'unhandledrejection',
        message: He(s.reason),
        timestamp: Date.now(),
      })
    },
    i = window.fetch.bind(window),
    l = (s, m) => {
      const g = $n(s, m)
      return i(s, m).then(
        (a) => (
          a.ok ||
            e.push({
              kind: 'network',
              message: `HTTP ${a.status} for ${g.method} ${g.url}`,
              timestamp: Date.now(),
            }),
          a
        ),
        (a) => {
          throw (
            e.push({
              kind: 'network',
              message: `Failed ${g.method} ${g.url}: ${He(a)}`,
              timestamp: Date.now(),
            }),
            a
          )
        }
      )
    },
    c = XMLHttpRequest.prototype.open,
    u = function (s, m, ...g) {
      const a = typeof m == 'string' ? m : m.toString()
      ;(() => {
        const N = () => {
          this.readyState === 4 &&
            this.status >= 400 &&
            e.push({
              kind: 'network',
              message: `XHR ${s.toUpperCase()} ${a} -> ${this.status}`,
              timestamp: Date.now(),
            })
        }
        this.addEventListener('readystatechange', N)
      })()
      const h = g[0] === void 0 ? !0 : g[0],
        w = g[1],
        x = g[2]
      return c.call(this, s, m, h, w, x)
    }
  return (
    (console.error = n),
    (window.fetch = l),
    (XMLHttpRequest.prototype.open = u),
    window.addEventListener('error', r),
    window.addEventListener('unhandledrejection', o),
    {
      getErrors() {
        return e.slice()
      },
      stop() {
        ;((console.error = t),
          (window.fetch = i),
          (XMLHttpRequest.prototype.open = c),
          window.removeEventListener('error', r),
          window.removeEventListener('unhandledrejection', o))
      },
    }
  )
}
function Ln(e, t) {
  if (e.match(/^[a-z]+:\/\//i)) return e
  if (e.match(/^\/\//)) return window.location.protocol + e
  if (e.match(/^[a-z]+:/i)) return e
  const n = document.implementation.createHTMLDocument(),
    r = n.createElement('base'),
    o = n.createElement('a')
  return (n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), (o.href = e), o.href)
}
var An = /* @__PURE__ */ (() => {
  let e = 0
  const t = () => `0000${((Math.random() * 36 ** 4) << 0).toString(36)}`.slice(-4)
  return () => ((e += 1), `u${t()}${e}`)
})()
function W(e) {
  const t = []
  for (let n = 0, r = e.length; n < r; n++) t.push(e[n])
  return t
}
function ye(e, t) {
  const n = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t)
  return n ? parseFloat(n.replace('px', '')) : 0
}
function Mn(e) {
  const t = ye(e, 'border-left-width'),
    n = ye(e, 'border-right-width')
  return e.clientWidth + t + n
}
function Dn(e) {
  const t = ye(e, 'border-top-width'),
    n = ye(e, 'border-bottom-width')
  return e.clientHeight + t + n
}
function Jt(e, t = {}) {
  return {
    width: t.width || Mn(e),
    height: t.height || Dn(e),
  }
}
function Fn() {
  let e, t
  try {
    t = process
  } catch {}
  const n = t && t.env ? t.env.devicePixelRatio : null
  return (
    n && ((e = parseInt(n, 10)), Number.isNaN(e) && (e = 1)),
    e || window.devicePixelRatio || 1
  )
}
var M = 16384
function In(e) {
  ;(e.width > M || e.height > M) &&
    (e.width > M && e.height > M
      ? e.width > e.height
        ? ((e.height *= M / e.width), (e.width = M))
        : ((e.width *= M / e.height), (e.height = M))
      : e.width > M
        ? ((e.height *= M / e.width), (e.width = M))
        : ((e.width *= M / e.height), (e.height = M)))
}
function we(e) {
  return new Promise((t, n) => {
    const r = new Image()
    ;((r.decode = () => t(r)),
      (r.onload = () => t(r)),
      (r.onerror = n),
      (r.crossOrigin = 'anonymous'),
      (r.decoding = 'async'),
      (r.src = e))
  })
}
async function Hn(e) {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(e))
    .then(encodeURIComponent)
    .then((t) => `data:image/svg+xml;charset=utf-8,${t}`)
}
async function Un(e, t, n) {
  const r = 'http://www.w3.org/2000/svg',
    o = document.createElementNS(r, 'svg'),
    i = document.createElementNS(r, 'foreignObject')
  return (
    o.setAttribute('width', `${t}`),
    o.setAttribute('height', `${n}`),
    o.setAttribute('viewBox', `0 0 ${t} ${n}`),
    i.setAttribute('width', '100%'),
    i.setAttribute('height', '100%'),
    i.setAttribute('x', '0'),
    i.setAttribute('y', '0'),
    i.setAttribute('externalResourcesRequired', 'true'),
    o.appendChild(i),
    i.appendChild(e),
    Hn(o)
  )
}
var P = (e, t) => {
  if (e instanceof t) return !0
  const n = Object.getPrototypeOf(e)
  return n === null ? !1 : n.constructor.name === t.name || P(n, t)
}
function jn(e) {
  const t = e.getPropertyValue('content')
  return `${e.cssText} content: '${t.replace(/'|"/g, '')}';`
}
function qn(e) {
  return W(e)
    .map((t) => `${t}: ${e.getPropertyValue(t)}${e.getPropertyPriority(t) ? ' !important' : ''};`)
    .join(' ')
}
function Wn(e, t, n) {
  const r = `.${e}:${t}`,
    o = n.cssText ? jn(n) : qn(n)
  return document.createTextNode(`${r}{${o}}`)
}
function Nt(e, t, n) {
  const r = window.getComputedStyle(e, n),
    o = r.getPropertyValue('content')
  if (o === '' || o === 'none') return
  const i = An()
  try {
    t.className = `${t.className} ${i}`
  } catch {
    return
  }
  const l = document.createElement('style')
  ;(l.appendChild(Wn(i, n, r)), t.appendChild(l))
}
function zn(e, t) {
  ;(Nt(e, t, ':before'), Nt(e, t, ':after'))
}
var kt = 'application/font-woff',
  Et = 'image/jpeg',
  Vn = {
    woff: kt,
    woff2: kt,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: Et,
    jpeg: Et,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp',
  }
function Bn(e) {
  const t = /\.([^./]*?)$/g.exec(e)
  return t ? t[1] : ''
}
function Ye(e) {
  const t = Bn(e).toLowerCase()
  return Vn[t] || ''
}
function On(e) {
  return e.split(/,/)[1]
}
function ze(e) {
  return e.search(/^(data:)/) !== -1
}
function Qt(e, t) {
  return `data:${t};base64,${e}`
}
async function Zt(e, t, n) {
  const r = await fetch(e, t)
  if (r.status === 404) throw new Error(`Resource "${r.url}" not found`)
  const o = await r.blob()
  return new Promise((i, l) => {
    const c = new FileReader()
    ;((c.onerror = l),
      (c.onloadend = () => {
        try {
          i(
            n({
              res: r,
              result: c.result,
            })
          )
        } catch (u) {
          l(u)
        }
      }),
      c.readAsDataURL(o))
  })
}
var Ue = {}
function Gn(e, t, n) {
  let r = e.replace(/\?.*/, '')
  return (
    n && (r = e),
    /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, '')),
    t ? `[${t}]${r}` : r
  )
}
async function Je(e, t, n) {
  const r = Gn(e, t, n.includeQueryParams)
  if (Ue[r] != null) return Ue[r]
  n.cacheBust && (e += (/\?/.test(e) ? '&' : '?') + /* @__PURE__ */ new Date().getTime())
  let o
  try {
    o = Qt(
      await Zt(
        e,
        n.fetchRequestInit,
        ({ res: i, result: l }) => (t || (t = i.headers.get('Content-Type') || ''), On(l))
      ),
      t
    )
  } catch (i) {
    o = n.imagePlaceholder || ''
    let l = `Failed to fetch resource: ${e}`
    ;(i && (l = typeof i == 'string' ? i : i.message), l && console.warn(l))
  }
  return ((Ue[r] = o), o)
}
async function Kn(e) {
  const t = e.toDataURL()
  return t === 'data:,' ? e.cloneNode(!1) : we(t)
}
async function Xn(e, t) {
  if (e.currentSrc) {
    const i = document.createElement('canvas'),
      l = i.getContext('2d')
    ;((i.width = e.clientWidth),
      (i.height = e.clientHeight),
      l == null || l.drawImage(e, 0, 0, i.width, i.height))
    const c = i.toDataURL()
    return we(c)
  }
  const n = e.poster,
    r = Ye(n),
    o = await Je(n, r, t)
  return we(o)
}
async function Yn(e) {
  var t
  try {
    if (!((t = e == null ? void 0 : e.contentDocument) === null || t === void 0) && t.body)
      return await Ee(e.contentDocument.body, {}, !0)
  } catch {}
  return e.cloneNode(!1)
}
async function Jn(e, t) {
  return P(e, HTMLCanvasElement)
    ? Kn(e)
    : P(e, HTMLVideoElement)
      ? Xn(e, t)
      : P(e, HTMLIFrameElement)
        ? Yn(e)
        : e.cloneNode(!1)
}
var Qn = (e) => e.tagName != null && e.tagName.toUpperCase() === 'SLOT'
async function Zn(e, t, n) {
  var r, o
  let i = []
  return (
    Qn(e) && e.assignedNodes
      ? (i = W(e.assignedNodes()))
      : P(e, HTMLIFrameElement) && !((r = e.contentDocument) === null || r === void 0) && r.body
        ? (i = W(e.contentDocument.body.childNodes))
        : (i = W(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes)),
    i.length === 0 ||
      P(e, HTMLVideoElement) ||
      (await i.reduce(
        (l, c) =>
          l
            .then(() => Ee(c, n))
            .then((u) => {
              u && t.appendChild(u)
            }),
        Promise.resolve()
      )),
    t
  )
}
function er(e, t) {
  const n = t.style
  if (!n) return
  const r = window.getComputedStyle(e)
  r.cssText
    ? ((n.cssText = r.cssText), (n.transformOrigin = r.transformOrigin))
    : W(r).forEach((o) => {
        let i = r.getPropertyValue(o)
        ;(o === 'font-size' &&
          i.endsWith('px') &&
          (i = `${Math.floor(parseFloat(i.substring(0, i.length - 2))) - 0.1}px`),
          P(e, HTMLIFrameElement) && o === 'display' && i === 'inline' && (i = 'block'),
          o === 'd' && t.getAttribute('d') && (i = `path(${t.getAttribute('d')})`),
          n.setProperty(o, i, r.getPropertyPriority(o)))
      })
}
function tr(e, t) {
  ;(P(e, HTMLTextAreaElement) && (t.innerHTML = e.value),
    P(e, HTMLInputElement) && t.setAttribute('value', e.value))
}
function nr(e, t) {
  if (P(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((o) => e.value === o.getAttribute('value'))
    r && r.setAttribute('selected', '')
  }
}
function rr(e, t) {
  return (P(t, Element) && (er(e, t), zn(e, t), tr(e, t), nr(e, t)), t)
}
async function ir(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll('use') : []
  if (n.length === 0) return e
  const r = {}
  for (let i = 0; i < n.length; i++) {
    const l = n[i].getAttribute('xlink:href')
    if (l) {
      const c = e.querySelector(l),
        u = document.querySelector(l)
      !c && u && !r[l] && (r[l] = await Ee(u, t, !0))
    }
  }
  const o = Object.values(r)
  if (o.length) {
    const i = 'http://www.w3.org/1999/xhtml',
      l = document.createElementNS(i, 'svg')
    ;(l.setAttribute('xmlns', i),
      (l.style.position = 'absolute'),
      (l.style.width = '0'),
      (l.style.height = '0'),
      (l.style.overflow = 'hidden'),
      (l.style.display = 'none'))
    const c = document.createElementNS(i, 'defs')
    l.appendChild(c)
    for (let u = 0; u < o.length; u++) c.appendChild(o[u])
    e.appendChild(l)
  }
  return e
}
async function Ee(e, t, n) {
  return !n && t.filter && !t.filter(e)
    ? null
    : Promise.resolve(e)
        .then((r) => Jn(r, t))
        .then((r) => Zn(e, r, t))
        .then((r) => rr(e, r))
        .then((r) => ir(r, t))
}
var en = /url\((['"]?)([^'"]+?)\1\)/g,
  or = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,
  lr = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g
function ar(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1')
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, 'g')
}
function sr(e) {
  const t = []
  return (e.replace(en, (n, r, o) => (t.push(o), n)), t.filter((n) => !ze(n)))
}
async function cr(e, t, n, r, o) {
  try {
    const i = n ? Ln(t, n) : t,
      l = Ye(t)
    let c
    if (o) {
      const u = await o(i)
      c = Qt(u, l)
    } else c = await Je(i, l, r)
    return e.replace(ar(t), `$1${c}$3`)
  } catch {}
  return e
}
function ur(e, { preferredFontFormat: t }) {
  return t
    ? e.replace(lr, (n) => {
        for (;;) {
          const [r, , o] = or.exec(n) || []
          if (!o) return ''
          if (o === t) return `src: ${r};`
        }
      })
    : e
}
function tn(e) {
  return e.search(en) !== -1
}
async function nn(e, t, n) {
  if (!tn(e)) return e
  const r = ur(e, n)
  return sr(r).reduce((o, i) => o.then((l) => cr(l, i, t, n)), Promise.resolve(r))
}
async function ue(e, t, n) {
  var r
  const o = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e)
  if (o) {
    const i = await nn(o, null, n)
    return (t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0)
  }
  return !1
}
async function dr(e, t) {
  ;((await ue('background', e, t)) || (await ue('background-image', e, t)),
    (await ue('mask', e, t)) || (await ue('mask-image', e, t)))
}
async function fr(e, t) {
  const n = P(e, HTMLImageElement)
  if (!(n && !ze(e.src)) && !(P(e, SVGImageElement) && !ze(e.href.baseVal))) return
  const r = n ? e.src : e.href.baseVal,
    o = await Je(r, Ye(r), t)
  await new Promise((i, l) => {
    ;((e.onload = i), (e.onerror = l))
    const c = e
    ;(c.decode && (c.decode = i),
      c.loading === 'lazy' && (c.loading = 'eager'),
      n ? ((e.srcset = ''), (e.src = o)) : (e.href.baseVal = o))
  })
}
async function mr(e, t) {
  const n = W(e.childNodes).map((r) => rn(r, t))
  await Promise.all(n).then(() => e)
}
async function rn(e, t) {
  P(e, Element) && (await dr(e, t), await fr(e, t), await mr(e, t))
}
function hr(e, t) {
  const { style: n } = e
  ;(t.backgroundColor && (n.backgroundColor = t.backgroundColor),
    t.width && (n.width = `${t.width}px`),
    t.height && (n.height = `${t.height}px`))
  const r = t.style
  return (
    r != null &&
      Object.keys(r).forEach((o) => {
        n[o] = r[o]
      }),
    e
  )
}
var St = {}
async function Ct(e) {
  let t = St[e]
  return (
    t != null ||
      ((t = {
        url: e,
        cssText: await (await fetch(e)).text(),
      }),
      (St[e] = t)),
    t
  )
}
async function Rt(e, t) {
  let n = e.cssText
  const r = /url\(["']?([^"')]+)["']?\)/g,
    o = (n.match(/url\([^)]+\)/g) || []).map(async (i) => {
      let l = i.replace(r, '$1')
      return (
        l.startsWith('https://') || (l = new URL(l, e.url).href),
        Zt(l, t.fetchRequestInit, ({ result: c }) => ((n = n.replace(i, `url(${c})`)), [i, c]))
      )
    })
  return Promise.all(o).then(() => n)
}
function Tt(e) {
  if (e == null) return []
  const t = []
  let n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, '')
  const r = /* @__PURE__ */ new RegExp('((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi')
  for (;;) {
    const l = r.exec(n)
    if (l === null) break
    t.push(l[0])
  }
  n = n.replace(r, '')
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,
    i = /* @__PURE__ */ new RegExp(
      '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',
      'gi'
    )
  for (;;) {
    let l = o.exec(n)
    if (l === null) {
      if (((l = i.exec(n)), l === null)) break
      o.lastIndex = i.lastIndex
    } else i.lastIndex = o.lastIndex
    t.push(l[0])
  }
  return t
}
async function pr(e, t) {
  const n = [],
    r = []
  return (
    e.forEach((o) => {
      if ('cssRules' in o)
        try {
          W(o.cssRules || []).forEach((i, l) => {
            if (i.type === CSSRule.IMPORT_RULE) {
              let c = l + 1
              const u = i.href,
                s = Ct(u)
                  .then((m) => Rt(m, t))
                  .then((m) =>
                    Tt(m).forEach((g) => {
                      try {
                        o.insertRule(g, g.startsWith('@import') ? (c += 1) : o.cssRules.length)
                      } catch (a) {
                        console.error('Error inserting rule from remote css', {
                          rule: g,
                          error: a,
                        })
                      }
                    })
                  )
                  .catch((m) => {
                    console.error('Error loading remote css', m.toString())
                  })
              r.push(s)
            }
          })
        } catch (i) {
          const l = e.find((c) => c.href == null) || document.styleSheets[0]
          ;(o.href != null &&
            r.push(
              Ct(o.href)
                .then((c) => Rt(c, t))
                .then((c) =>
                  Tt(c).forEach((u) => {
                    l.insertRule(u, o.cssRules.length)
                  })
                )
                .catch((c) => {
                  console.error('Error loading remote stylesheet', c)
                })
            ),
            console.error('Error inlining remote css file', i))
        }
    }),
    Promise.all(r).then(
      () => (
        e.forEach((o) => {
          if ('cssRules' in o)
            try {
              W(o.cssRules || []).forEach((i) => {
                n.push(i)
              })
            } catch (i) {
              console.error(`Error while reading CSS rules from ${o.href}`, i)
            }
        }),
        n
      )
    )
  )
}
function gr(e) {
  return e
    .filter((t) => t.type === CSSRule.FONT_FACE_RULE)
    .filter((t) => tn(t.style.getPropertyValue('src')))
}
async function br(e, t) {
  if (e.ownerDocument == null) throw new Error('Provided element is not within a Document')
  return gr(await pr(W(e.ownerDocument.styleSheets), t))
}
async function _r(e, t) {
  const n = await br(e, t)
  return (
    await Promise.all(
      n.map((r) => {
        const o = r.parentStyleSheet ? r.parentStyleSheet.href : null
        return nn(r.cssText, o, t)
      })
    )
  ).join(`
`)
}
async function vr(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await _r(e, t)
  if (n) {
    const r = document.createElement('style'),
      o = document.createTextNode(n)
    ;(r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r))
  }
}
async function yr(e, t = {}) {
  const { width: n, height: r } = Jt(e, t),
    o = await Ee(e, t, !0)
  return (await vr(o, t), await rn(o, t), hr(o, t), await Un(o, n, r))
}
async function wr(e, t = {}) {
  const { width: n, height: r } = Jt(e, t),
    o = await yr(e, t),
    i = await we(o),
    l = document.createElement('canvas'),
    c = l.getContext('2d'),
    u = t.pixelRatio || Fn(),
    s = t.canvasWidth || n,
    m = t.canvasHeight || r
  return (
    (l.width = s * u),
    (l.height = m * u),
    t.skipAutoScale || In(l),
    (l.style.width = `${s}`),
    (l.style.height = `${m}`),
    t.backgroundColor && ((c.fillStyle = t.backgroundColor), c.fillRect(0, 0, l.width, l.height)),
    c.drawImage(i, 0, 0, l.width, l.height),
    l
  )
}
async function xr(e, t = {}) {
  return (await wr(e, t)).toDataURL()
}
var on = 'trackboard:high-fidelity-consent'
var Nr = 1e3,
  kr = xr
function Er(e) {
  const t = {
    cacheBust: !0,
    pixelRatio: Math.min((typeof window != 'undefined' && window.devicePixelRatio) || 1, 2),
    backgroundColor: null,
    preferredFontFormat: 'woff2',
    fontEmbedCSS: $r(),
  }
  if (e === 'visible') {
    const o = typeof window != 'undefined' ? window.innerWidth : 1024,
      i = typeof window != 'undefined' ? window.innerHeight : 768,
      l = typeof window != 'undefined' ? window.scrollX : 0,
      c = typeof window != 'undefined' ? window.scrollY : 0
    return {
      ...t,
      width: o,
      height: i,
      style: {
        transform: `translate(${-l}px, ${-c}px)`,
        transformOrigin: 'top left',
      },
    }
  }
  if (e === 'element') return { ...t }
  const n = typeof document != 'undefined' ? document.documentElement.scrollWidth : 1024,
    r = typeof document != 'undefined' ? document.documentElement.scrollHeight : 768
  return {
    ...t,
    width: n,
    height: r,
  }
}
function Sr(e, t) {
  let n
  try {
    n = new URL(e, t != null ? t : void 0)
  } catch {
    return !1
  }
  if (n.protocol === 'data:' || n.protocol === 'blob:') return !1
  if (!t) return n.protocol === 'http:' || n.protocol === 'https:'
  let r
  try {
    r = new URL(t)
  } catch {
    return !1
  }
  return n.host !== r.host
}
function Cr(e, t) {
  return `${e.replace(/\/$/, '')}/api/public/proxy-image?url=${encodeURIComponent(t)}`
}
async function Rr(e) {
  const t = typeof location != 'undefined' ? location.origin : void 0,
    n = Array.from(document.images)
  await Promise.all(
    n.map(async (r) => {
      const o = r.currentSrc || r.src
      if (!o || !Sr(o, t) || o.includes('/api/public/proxy-image')) return
      const i = Cr(e, o)
      try {
        ;((r.src = i), r.decode && (await r.decode()))
      } catch {}
    })
  )
}
function Z() {
  var e
  return (
    typeof navigator != 'undefined' &&
    !!(!((e = navigator.mediaDevices) === null || e === void 0) && e.getDisplayMedia)
  )
}
function pe() {
  try {
    return localStorage.getItem(on) === 'granted'
  } catch {
    return !1
  }
}
function $t(e) {
  try {
    localStorage.setItem(on, e ? 'granted' : 'denied')
  } catch {}
}
async function Tr() {
  if (!Z()) return null
  let e = null,
    t = null
  try {
    if (
      ((e = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: !1,
      })),
      !e.getVideoTracks()[0])
    )
      return null
    ;((t = document.createElement('video')),
      (t.srcObject = e),
      (t.muted = !0),
      await t.play().catch(() => {}),
      await new Promise((i) => {
        if (t.readyState >= 2) return i()
        const l = () => {
          ;(t.removeEventListener('loadeddata', l), i())
        }
        ;(t.addEventListener('loadeddata', l, { once: !0 }), setTimeout(i, 500))
      }))
    const r = document.createElement('canvas')
    ;((r.width = t.videoWidth || 1920), (r.height = t.videoHeight || 1080))
    const o = r.getContext('2d')
    return o ? (o.drawImage(t, 0, 0, r.width, r.height), await Ve(r.toDataURL('image/png'))) : null
  } catch (r) {
    var n
    const o = (n = r == null ? void 0 : r.name) !== null && n !== void 0 ? n : ''
    return null
  } finally {
    if (e)
      for (const r of e.getTracks())
        try {
          r.stop()
        } catch {}
    if (t)
      try {
        ;(t.pause(), (t.srcObject = null), t.remove())
      } catch {}
  }
}
function $r() {
  if (typeof document == 'undefined') return
  let e = '',
    t = !1
  for (const n of Array.from(document.styleSheets)) {
    let r = null
    try {
      r = n.cssRules
    } catch {
      continue
    }
    if (r) {
      for (const o of Array.from(r))
        if (o instanceof CSSFontFaceRule) {
          const i = o.style.getPropertyValue('font-family')
          if (!i || !i.trim() || i.trim() === '""' || i.trim() === "''") continue
          ;((t = !0),
            (e +=
              o.cssText +
              `
`))
        }
    }
  }
  return t ? e : void 0
}
async function Ve(e) {
  if (e.length <= 10485760) return e
  for (const t of [0.7, 0.5, 0.3])
    try {
      const n = await Pr(e, t)
      if (n.length <= 10485760) return n
      e = n
    } catch {
      break
    }
  return e
}
function Pr(e, t) {
  return new Promise((n, r) => {
    const o = new Image()
    ;((o.onload = () => {
      try {
        const i = document.createElement('canvas')
        ;((i.width = o.naturalWidth), (i.height = o.naturalHeight))
        const l = i.getContext('2d')
        if (!l) return r(/* @__PURE__ */ new Error('no context'))
        ;((l.fillStyle = '#ffffff'),
          l.fillRect(0, 0, i.width, i.height),
          l.drawImage(o, 0, 0),
          n(i.toDataURL('image/jpeg', t)))
      } catch (i) {
        r(i)
      }
    }),
      (o.onerror = () => r(/* @__PURE__ */ new Error('image load failed'))),
      (o.src = e))
  })
}
async function Lr(e, t) {
  try {
    const n = Er(t)
    return await kr(e, n)
  } catch {
    return null
  }
}
async function Pt(e, t) {
  let n,
    r = 'fullpage',
    o = !1
  if (
    ((u) =>
      (typeof HTMLElement != 'undefined' && u instanceof HTMLElement) ||
      (typeof Element != 'undefined' && u instanceof Element) ||
      (u && typeof u == 'object' && u.nodeType === 1 && typeof u.tagName == 'string'))(t)
  )
    ((n = t), (r = 'element'))
  else if (t && typeof t == 'object') {
    var l, c
    ;((n = t.target),
      (r = (l = t.mode) !== null && l !== void 0 ? l : n ? 'element' : 'fullpage'),
      (o = (c = t.highFidelity) !== null && c !== void 0 ? c : !1))
  }
  return Dr(Mr(e, r, n, o), Ar)
}
var Ar = 6500
async function Mr(e, t, n, r) {
  try {
    if (r && Z() && pe()) {
      const c = await Tr()
      if (c) return await Ve(c)
    }
    try {
      var o, i
      await Promise.race([
        (o = (i = document.fonts) === null || i === void 0 ? void 0 : i.ready) !== null &&
        o !== void 0
          ? o
          : Promise.resolve(),
        new Promise((c) => setTimeout(c, Nr)),
      ])
    } catch {}
    await Rr(e)
    const l = await Lr(
      t === 'element' && n ? n : document.documentElement,
      t === 'element' && !n ? 'fullpage' : t
    )
    return l ? await Ve(l) : null
  } catch {
    return null
  }
}
function Dr(e, t) {
  return new Promise((n) => {
    let r = !1
    const o = (l) => {
        r || ((r = !0), clearTimeout(i), n(l))
      },
      i = setTimeout(() => o(null), t)
    e.then(
      (l) => o(l),
      () => o(null)
    )
  })
}
function Fr(e) {
  if (!(e instanceof Element)) throw new Error('generateSelector expects a DOM Element')
  if (e.id) return `${Lt(e)}#${e.id}`
  const t = []
  let n = e
  for (; n && n.nodeType === 1 && n !== document.documentElement && n !== document.body;) {
    let r = Lt(n)
    if (n.id) r += `#${n.id}`
    else {
      const o = n.parentElement
      if (o && Array.from(o.children).filter((i) => i.tagName === n.tagName).length > 1) {
        const i = Array.from(o.children).indexOf(n) + 1
        r += `:nth-child(${i})`
      }
    }
    ;(t.unshift(r), (n = n.parentElement))
  }
  return t.join(' > ')
}
function Lt(e) {
  return e.tagName.toLowerCase()
}
function Ir(e) {
  let t = null
  const n = (o) => {
      const i = o.target
      !i ||
        !(i instanceof Element) ||
        (t && t !== i && t.classList.remove('tb-highlight'),
        (t = i),
        t.classList.add('tb-highlight'))
    },
    r = (o) => {
      const i = o.target
      !i || !(i instanceof Element) || (o.preventDefault(), o.stopPropagation(), e(i, Fr(i)))
    }
  return (
    document.addEventListener('mousemove', n, !0),
    document.addEventListener('click', r, !0),
    () => {
      ;(document.removeEventListener('mousemove', n, !0),
        document.removeEventListener('click', r, !0),
        t && t.classList.remove('tb-highlight'))
    }
  )
}
var Hr = 0
function d(e, t, n, r, o, i) {
  t || (t = {})
  var l,
    c,
    u = t
  if ('ref' in u) for (c in ((u = {}), t)) c == 'ref' ? (l = t[c]) : (u[c] = t[c])
  var s = {
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
    __v: --Hr,
    __i: -1,
    __u: 0,
    __source: o,
    __self: i,
  }
  if (typeof e == 'function' && (l = e.defaultProps)) for (c in l) u[c] === void 0 && (u[c] = l[c])
  return (y.vnode && y.vnode(s), s)
}
var k = '/Users/hexacker/Work/bitsoven/trackboard/src/widget/fields.tsx'
function Y(e) {
  return e == null ? '' : String(e)
}
function Ur(e) {
  return e === !0 || e === 'true' || e === 'on'
}
function jr(e) {
  var t
  const { field: n, value: r, error: o, onChange: i } = e,
    l = (t = n.options) !== null && t !== void 0 ? t : {},
    c = /* @__PURE__ */ d(
      'label',
      {
        class: 'tb-label',
        for: `tb-${n.key}`,
        children: [
          n.label,
          n.isRequired &&
            /* @__PURE__ */ d(
              'span',
              {
                class: 'tb-req',
                children: ' *',
              },
              void 0,
              !1,
              {
                fileName: k,
                lineNumber: 24,
                columnNumber: 28,
              },
              this
            ),
        ],
      },
      void 0,
      !0,
      {
        fileName: k,
        lineNumber: 22,
        columnNumber: 5,
      },
      this
    )
  let u
  switch (n.type) {
    case 'textarea':
      u = /* @__PURE__ */ d(
        'textarea',
        {
          id: `tb-${n.key}`,
          class: 'tb-textarea',
          placeholder: l.placeholder,
          maxLength: l.maxLength,
          value: Y(r),
          onInput: (a) => i(a.target.value),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 33,
          columnNumber: 9,
        },
        this
      )
      break
    case 'select': {
      var s
      const a = (s = l.choices) !== null && s !== void 0 ? s : []
      u = /* @__PURE__ */ d(
        'select',
        {
          id: `tb-${n.key}`,
          class: 'tb-select',
          value: Y(r),
          onChange: (f) => i(f.target.value),
          children: [
            /* @__PURE__ */ d(
              'option',
              {
                value: '',
                children: '—',
              },
              void 0,
              !1,
              {
                fileName: k,
                lineNumber: 53,
                columnNumber: 11,
              },
              this
            ),
            a.map((f) =>
              /* @__PURE__ */ d(
                'option',
                {
                  value: f,
                  selected: f === Y(r),
                  children: f,
                },
                void 0,
                !1,
                {
                  fileName: k,
                  lineNumber: 55,
                  columnNumber: 13,
                },
                this
              )
            ),
          ],
        },
        void 0,
        !0,
        {
          fileName: k,
          lineNumber: 47,
          columnNumber: 9,
        },
        this
      )
      break
    }
    case 'radio': {
      var m
      const a = (m = l.choices) !== null && m !== void 0 ? m : []
      u = /* @__PURE__ */ d(
        'div',
        {
          children: a.map((f) =>
            /* @__PURE__ */ d(
              'div',
              {
                class: 'tb-radio',
                children: [
                  /* @__PURE__ */ d(
                    'input',
                    {
                      type: 'radio',
                      id: `tb-${n.key}-${f}`,
                      name: `tb-${n.key}`,
                      value: f,
                      checked: Y(r) === f,
                      onChange: () => i(f),
                    },
                    void 0,
                    !1,
                    {
                      fileName: k,
                      lineNumber: 69,
                      columnNumber: 15,
                    },
                    this
                  ),
                  /* @__PURE__ */ d(
                    'label',
                    {
                      for: `tb-${n.key}-${f}`,
                      children: f,
                    },
                    void 0,
                    !1,
                    {
                      fileName: k,
                      lineNumber: 77,
                      columnNumber: 15,
                    },
                    this
                  ),
                ],
              },
              void 0,
              !0,
              {
                fileName: k,
                lineNumber: 68,
                columnNumber: 13,
              },
              this
            )
          ),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 66,
          columnNumber: 9,
        },
        this
      )
      break
    }
    case 'checkbox': {
      var g
      const a = (g = l.choices) !== null && g !== void 0 ? g : []
      if (a.length > 0) {
        const f = Array.isArray(r) ? r : []
        u = /* @__PURE__ */ d(
          'div',
          {
            children: a.map((h) =>
              /* @__PURE__ */ d(
                'div',
                {
                  class: 'tb-check',
                  children: [
                    /* @__PURE__ */ d(
                      'input',
                      {
                        type: 'checkbox',
                        id: `tb-${n.key}-${h}`,
                        value: h,
                        checked: f.includes(h),
                        onChange: (w) => {
                          const x = w.target.checked ? [...f, h] : f.filter((N) => N !== h)
                          i(x)
                        },
                      },
                      void 0,
                      !1,
                      {
                        fileName: k,
                        lineNumber: 92,
                        columnNumber: 17,
                      },
                      this
                    ),
                    /* @__PURE__ */ d(
                      'label',
                      {
                        for: `tb-${n.key}-${h}`,
                        children: h,
                      },
                      void 0,
                      !1,
                      {
                        fileName: k,
                        lineNumber: 103,
                        columnNumber: 17,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                !0,
                {
                  fileName: k,
                  lineNumber: 91,
                  columnNumber: 15,
                },
                this
              )
            ),
          },
          void 0,
          !1,
          {
            fileName: k,
            lineNumber: 89,
            columnNumber: 11,
          },
          this
        )
      } else
        u = /* @__PURE__ */ d(
          'div',
          {
            class: 'tb-check',
            children: /* @__PURE__ */ d(
              'input',
              {
                type: 'checkbox',
                id: `tb-${n.key}`,
                checked: Ur(r),
                onChange: (f) => i(f.target.checked),
              },
              void 0,
              !1,
              {
                fileName: k,
                lineNumber: 111,
                columnNumber: 13,
              },
              this
            ),
          },
          void 0,
          !1,
          {
            fileName: k,
            lineNumber: 110,
            columnNumber: 11,
          },
          this
        )
      break
    }
    case 'number':
      u = /* @__PURE__ */ d(
        'input',
        {
          id: `tb-${n.key}`,
          class: 'tb-input',
          type: 'number',
          min: l.min,
          max: l.max,
          value: r == null ? '' : Number(r),
          onInput: (a) => i(a.target.valueAsNumber),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 124,
          columnNumber: 9,
        },
        this
      )
      break
    case 'date':
      u = /* @__PURE__ */ d(
        'input',
        {
          id: `tb-${n.key}`,
          class: 'tb-input',
          type: 'date',
          value: Y(r),
          onChange: (a) => i(a.target.value),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 138,
          columnNumber: 9,
        },
        this
      )
      break
    case 'file':
      u = /* @__PURE__ */ d(
        'input',
        {
          id: `tb-${n.key}`,
          class: 'tb-input',
          type: 'file',
          accept: l.accept,
          onChange: (a) => i(a.target.value),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 150,
          columnNumber: 9,
        },
        this
      )
      break
    case 'severity-scale': {
      const a = typeof l.scaleMin == 'number' ? l.scaleMin : 1,
        f = typeof l.scaleMax == 'number' ? l.scaleMax : 5,
        h = []
      for (let w = a; w <= f; w++) h.push(w)
      u = /* @__PURE__ */ d(
        'div',
        {
          class: 'tb-scale',
          children: h.map((w) =>
            /* @__PURE__ */ d(
              'button',
              {
                type: 'button',
                class: Number(r) === w ? 'active' : '',
                onClick: () => i(w),
                children: w,
              },
              void 0,
              !1,
              {
                fileName: k,
                lineNumber: 168,
                columnNumber: 13,
              },
              this
            )
          ),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 166,
          columnNumber: 9,
        },
        this
      )
      break
    }
    default:
      u = /* @__PURE__ */ d(
        'input',
        {
          id: `tb-${n.key}`,
          class: 'tb-input',
          type: 'text',
          placeholder: l.placeholder,
          maxLength: l.maxLength,
          value: Y(r),
          onInput: (a) => i(a.target.value),
        },
        void 0,
        !1,
        {
          fileName: k,
          lineNumber: 183,
          columnNumber: 9,
        },
        this
      )
  }
  return /* @__PURE__ */ d(
    'div',
    {
      class: 'tb-field',
      children: [
        c,
        u,
        o &&
          /* @__PURE__ */ d(
            'div',
            {
              class: 'tb-error',
              children: o,
            },
            void 0,
            !1,
            {
              fileName: k,
              lineNumber: 201,
              columnNumber: 17,
            },
            this
          ),
      ],
    },
    void 0,
    !0,
    {
      fileName: k,
      lineNumber: 198,
      columnNumber: 5,
    },
    this
  )
}
var At = '/Users/hexacker/Work/bitsoven/trackboard/src/widget/form.tsx',
  qr = ['title', 'reporterEmail']
function ln(e, t) {
  const n = e.showIf
  if (!n || !n.fieldKey) return !0
  const r = t[n.fieldKey]
  return 'equals' in n
    ? r === n.equals
    : 'notEquals' in n
      ? r !== n.notEquals
      : 'in' in n && Array.isArray(n.in)
        ? n.in.includes(r)
        : !0
}
function Wr(e) {
  const t = e.fields.filter((n) => !qr.includes(n.key) && ln(n, e.values))
  return /* @__PURE__ */ d(
    'div',
    {
      children: t.map((n) =>
        /* @__PURE__ */ d(
          jr,
          {
            field: n,
            value: e.values[n.key],
            error: e.errors[n.key],
            onChange: (r) => e.onChange(n.key, r),
          },
          n.key,
          !1,
          {
            fileName: At,
            lineNumber: 47,
            columnNumber: 9,
          },
          this
        )
      ),
    },
    void 0,
    !1,
    {
      fileName: At,
      lineNumber: 45,
      columnNumber: 5,
    },
    this
  )
}
var an = 'trackboard:offline-queue'
function zr() {
  return typeof navigator == 'undefined' ? !0 : navigator.onLine !== !1
}
function Vr() {
  try {
    const e = localStorage.getItem(an)
    if (!e) return []
    const t = JSON.parse(e)
    return Array.isArray(t) ? t : []
  } catch {
    return []
  }
}
function Br(e) {
  try {
    localStorage.setItem(an, JSON.stringify(e))
  } catch {}
}
function Or(e) {
  const t = Vr()
  return (
    t.push({
      payload: e,
      queuedAt: Date.now(),
      attempts: 0,
    }),
    Br(t),
    t
  )
}
async function Gr(e, t, n) {
  const r = `${e.replace(/\/$/, '')}/api/public/reports?key=${encodeURIComponent(t)}`,
    o = await fetch(r, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(n),
    })
  if (!o.ok) {
    let i
    try {
      i = await o.json()
    } catch {
      i = null
    }
    const l = /* @__PURE__ */ new Error(`Report submit failed with status ${o.status}`)
    throw ((l.status = o.status), (l.errors = i), l)
  }
  return o.json()
}
var p = '/Users/hexacker/Work/bitsoven/trackboard/src/widget/app.tsx'
function Kr(e, t) {
  return e == null || e === ''
    ? !0
    : Array.isArray(e)
      ? e.length === 0
      : t === 'checkbox' && typeof e == 'boolean'
        ? e === !1
        : !1
}
function Xr(e) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)
}
function Yr(e) {
  var t, n, r, o, i, l
  const { apiBase: c, projectKey: u, i18n: s } = e,
    [m, g] = C(!1),
    [a, f] = C('idle'),
    [h, w] = C(null),
    [x, N] = C(null),
    [_, L] = C({}),
    [B, F] = C({}),
    [H, re] = C(''),
    [I, J] = C(''),
    [A, U] = C(null),
    [Qe, Se] = C(null),
    [X, Ze] = C(null),
    [et, Ce] = C(!1),
    [tt, O] = C(null),
    [nt, ie] = C(null),
    [sn, oe] = C(null),
    Re = (t = e.captureMode) !== null && t !== void 0 ? t : 'fullpage',
    le = !!e.highFidelity,
    [rt, ae] = C(!1),
    se =
      (n = h == null ? void 0 : h.templates) !== null && n !== void 0
        ? n
        : h != null && h.template
          ? [h.template]
          : [],
    D =
      (r =
        (o =
          (i = se.find((b) => b.id === sn)) !== null && i !== void 0
            ? i
            : h == null
              ? void 0
              : h.template) !== null && o !== void 0
          ? o
          : se[0]) !== null && r !== void 0
        ? r
        : null,
    z = wt(null),
    j = wt(null)
  ;(Ie(() => {
    ;(z.current || (z.current = Pn()),
      h === null &&
        a !== 'loading' &&
        a !== 'error' &&
        (async () => {
          f('loading')
          try {
            const v = await Tn(c, u)
            if ((w(v), v.templates && v.templates.length > 0)) {
              var b
              const R =
                (b = v.templates.find((T) => T.isDefault)) !== null && b !== void 0
                  ? b
                  : v.templates[0]
              R ? oe(R.id) : v.template && oe(v.template.id)
            } else v.template && oe(v.template.id)
            f('ready')
          } catch (v) {
            ;(N(v instanceof Error ? v.message : 'config error'), f('error'))
          }
        })())
  }, []),
    Ie(
      () => () => {
        var b, v
        ;((b = z.current) === null || b === void 0 || b.stop(),
          (v = j.current) === null || v === void 0 || v.call(j))
      },
      []
    ),
    Ie(() => {
      if (m && le && Z() && !pe())
        try {
          localStorage.getItem('trackboard:high-fidelity-consent') === null && ae(!0)
        } catch {}
    }, [m, le]))
  const cn = () => {
      ;($t(!0), ae(!1))
    },
    un = () => {
      ;($t(!1), ae(!1))
    },
    it = () => g((b) => !b),
    dn = (b, v) => {
      L((R) => ({
        ...R,
        [b]: v,
      }))
    },
    fn = () => {
      if (et) {
        var b
        ;((b = j.current) === null || b === void 0 || b.call(j),
          (j.current = null),
          Ce(!1),
          O(null))
        return
      }
      O(s.t('widget.pinHint'))
      const v = Ir((R, T) => {
        var G
        ;(Ze(T),
          (G = j.current) === null || G === void 0 || G.call(j),
          (j.current = null),
          Ce(!1),
          O(null))
      })
      ;((j.current = v), Ce(!0))
    },
    mn = () => {
      var b
      const v = {}
      let R = !0
      ;(H.trim() ? U(null) : (U(s.t('widget.fieldRequired')), (R = !1)),
        I.trim()
          ? Xr(I.trim())
            ? Se(null)
            : (Se(s.t('widget.fieldRequired')), (R = !1))
          : (Se(s.t('widget.emailRequired')), (R = !1)))
      for (const T of (b = D == null ? void 0 : D.fields) !== null && b !== void 0 ? b : [])
        T.isRequired &&
          (T.key === 'title' ||
            T.key === 'reporterEmail' ||
            (ln(T, _) &&
              Kr(_[T.key], T.type) &&
              ((v[T.key] = s.t('widget.fieldRequired')), (R = !1))))
      return (F(v), R)
    },
    hn = async () => {
      var b, v, R, T, G
      if (le && Z() && !pe())
        try {
          if (localStorage.getItem('trackboard:high-fidelity-consent') === null) {
            ae(!0)
            return
          }
        } catch {}
      if (rt || !mn()) return
      f('submitting')
      const ot =
          (b = (v = z.current) === null || v === void 0 ? void 0 : v.getErrors()) !== null &&
          b !== void 0
            ? b
            : [],
        lt = ot.filter(($) => $.kind === 'console').map(($) => $.message),
        at = ot.filter(($) => $.kind === 'network').map(($) => $.message)
      let Te
      if (Re === 'element' && X)
        try {
          var $e
          Te = ($e = document.querySelector(X)) !== null && $e !== void 0 ? $e : void 0
        } catch {}
      const pn = le && Z() && pe()
      let Pe = null
      pn
        ? (Pe = await Pt(c, {
            target: Te,
            mode: Re,
            highFidelity: !0,
          }))
        : (Pe = await Promise.race([
            Pt(c, {
              target: Te,
              mode: Re,
              highFidelity: !1,
            }),
            new Promise(($) => setTimeout(() => $(null), 1500)),
          ]))
      const st = {
        title: H.trim(),
        reporterEmail: I.trim(),
        pageUrl: typeof location != 'undefined' ? location.href : void 0,
        templateId:
          (R = D == null ? void 0 : D.id) !== null && R !== void 0
            ? R
            : h == null || (T = h.template) === null || T === void 0
              ? void 0
              : T.id,
        fieldValues: _,
        browserInfo: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          screen: {
            width: screen.width,
            height: screen.height,
          },
        },
        consoleErrors: lt.length ? lt : void 0,
        networkErrors: at.length ? at : void 0,
        screenshotUrl: (G = Pe) !== null && G !== void 0 ? G : void 0,
      }
      try {
        var Le, Ae
        const $ = await Gr(c, u, st)
        ;(($ == null || (Le = $.data) === null || Le === void 0 ? void 0 : Le.status) ===
        'pending_verification'
          ? (ie(s.t('widget.verifySent', { email: I.trim() })), O(null))
          : (ie(null), O(null)),
          f('success'),
          (Ae = z.current) === null || Ae === void 0 || Ae.stop(),
          (z.current = null))
      } catch ($) {
        if (!zr()) {
          var Me
          ;(Or(st),
            f('success'),
            O(s.t('widget.error')),
            ie(null),
            (Me = z.current) === null || Me === void 0 || Me.stop(),
            (z.current = null))
          return
        }
        const ct = $
        ;(console.error('[trackboard] report submit failed', ct),
          f('error'),
          ie(null),
          O(ct.status === 422 ? s.t('widget.fieldRequired') : s.t('widget.error')))
      }
    }
  return m
    ? /* @__PURE__ */ d(
        'div',
        {
          class: `tb-root${et ? ' tb-pin-active' : ''}`,
          children: /* @__PURE__ */ d(
            'div',
            {
              class: 'tb-panel',
              children: [
                /* @__PURE__ */ d(
                  'div',
                  {
                    class: 'tb-header',
                    children: [
                      /* @__PURE__ */ d(
                        'span',
                        {
                          class: 'tb-title',
                          children: s.t('widget.title'),
                        },
                        void 0,
                        !1,
                        {
                          fileName: p,
                          lineNumber: 289,
                          columnNumber: 11,
                        },
                        this
                      ),
                      /* @__PURE__ */ d(
                        'button',
                        {
                          'class': 'tb-close',
                          'aria-label': s.t('widget.close'),
                          'onClick': it,
                          'children': '×',
                        },
                        void 0,
                        !1,
                        {
                          fileName: p,
                          lineNumber: 290,
                          columnNumber: 11,
                        },
                        this
                      ),
                    ],
                  },
                  void 0,
                  !0,
                  {
                    fileName: p,
                    lineNumber: 288,
                    columnNumber: 9,
                  },
                  this
                ),
                tt &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      class: 'tb-banner',
                      children: tt,
                    },
                    void 0,
                    !1,
                    {
                      fileName: p,
                      lineNumber: 295,
                      columnNumber: 20,
                    },
                    this
                  ),
                nt &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      class: 'tb-verify',
                      children: nt,
                    },
                    void 0,
                    !1,
                    {
                      fileName: p,
                      lineNumber: 296,
                      columnNumber: 26,
                    },
                    this
                  ),
                rt &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      class: 'tb-consent',
                      children: [
                        /* @__PURE__ */ d(
                          'h4',
                          {
                            class: 'tb-consent-title',
                            children: s.t('widget.consentTitle'),
                          },
                          void 0,
                          !1,
                          {
                            fileName: p,
                            lineNumber: 300,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'p',
                          {
                            class: 'tb-consent-body',
                            children: s.t('widget.consentBody'),
                          },
                          void 0,
                          !1,
                          {
                            fileName: p,
                            lineNumber: 301,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'div',
                          {
                            class: 'tb-consent-actions',
                            children: [
                              /* @__PURE__ */ d(
                                'button',
                                {
                                  class: 'tb-btn tb-btn-primary',
                                  onClick: cn,
                                  children: s.t('widget.consentAllow'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 303,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ d(
                                'button',
                                {
                                  class: 'tb-btn tb-btn-secondary',
                                  onClick: un,
                                  children: s.t('widget.consentDeny'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 306,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          {
                            fileName: p,
                            lineNumber: 302,
                            columnNumber: 13,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: p,
                      lineNumber: 299,
                      columnNumber: 11,
                    },
                    this
                  ),
                a === 'loading' &&
                  /* @__PURE__ */ d(
                    'div',
                    { children: s.t('widget.sending') },
                    void 0,
                    !1,
                    {
                      fileName: p,
                      lineNumber: 313,
                      columnNumber: 34,
                    },
                    this
                  ),
                a === 'error' &&
                  x &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      class: 'tb-error',
                      children: x,
                    },
                    void 0,
                    !1,
                    {
                      fileName: p,
                      lineNumber: 314,
                      columnNumber: 47,
                    },
                    this
                  ),
                a === 'success' &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      class: 'tb-success',
                      children: s.t('widget.success'),
                    },
                    void 0,
                    !1,
                    {
                      fileName: p,
                      lineNumber: 316,
                      columnNumber: 34,
                    },
                    this
                  ),
                (a === 'ready' || a === 'submitting' || a === 'error') &&
                  h &&
                  /* @__PURE__ */ d(
                    'div',
                    {
                      children: [
                        se.length > 1 &&
                          /* @__PURE__ */ d(
                            'div',
                            {
                              class: 'tb-section',
                              children: /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-field',
                                  children: [
                                    /* @__PURE__ */ d(
                                      'label',
                                      {
                                        class: 'tb-label',
                                        for: 'tb-report-type',
                                        children: [
                                          s.t('widget.reportTypeLabel'),
                                          /* @__PURE__ */ d(
                                            'span',
                                            {
                                              class: 'tb-req',
                                              children: ' *',
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: p,
                                              lineNumber: 325,
                                              columnNumber: 21,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      !0,
                                      {
                                        fileName: p,
                                        lineNumber: 323,
                                        columnNumber: 19,
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ d(
                                      'select',
                                      {
                                        id: 'tb-report-type',
                                        class: 'tb-input',
                                        value: String(
                                          (l = D == null ? void 0 : D.id) !== null && l !== void 0
                                            ? l
                                            : ''
                                        ),
                                        onChange: (b) => {
                                          const v = b.target.value
                                          ;(oe(v ? Number(v) : null), L({}), F({}))
                                        },
                                        children: se.map((b) =>
                                          /* @__PURE__ */ d(
                                            'option',
                                            {
                                              value: String(b.id),
                                              children: b.name,
                                            },
                                            b.id,
                                            !1,
                                            {
                                              fileName: p,
                                              lineNumber: 339,
                                              columnNumber: 23,
                                            },
                                            this
                                          )
                                        ),
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: p,
                                        lineNumber: 327,
                                        columnNumber: 19,
                                      },
                                      this
                                    ),
                                  ],
                                },
                                void 0,
                                !0,
                                {
                                  fileName: p,
                                  lineNumber: 322,
                                  columnNumber: 17,
                                },
                                this
                              ),
                            },
                            void 0,
                            !1,
                            {
                              fileName: p,
                              lineNumber: 321,
                              columnNumber: 15,
                            },
                            this
                          ),
                        /* @__PURE__ */ d(
                          'div',
                          {
                            class: 'tb-section',
                            children: [
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-section-title',
                                  children: s.t('widget.sectionDetails'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 348,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-field',
                                  children: [
                                    /* @__PURE__ */ d(
                                      'label',
                                      {
                                        class: 'tb-label',
                                        for: 'tb-title',
                                        children: [
                                          s.t('widget.titleLabel'),
                                          /* @__PURE__ */ d(
                                            'span',
                                            {
                                              class: 'tb-req',
                                              children: ' *',
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: p,
                                              lineNumber: 352,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      !0,
                                      {
                                        fileName: p,
                                        lineNumber: 350,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ d(
                                      'input',
                                      {
                                        id: 'tb-title',
                                        class: 'tb-input',
                                        type: 'text',
                                        placeholder: s.t('widget.titlePlaceholder'),
                                        value: H,
                                        onInput: (b) => re(b.target.value),
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: p,
                                        lineNumber: 354,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    A &&
                                      /* @__PURE__ */ d(
                                        'div',
                                        {
                                          class: 'tb-error',
                                          children: A,
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: p,
                                          lineNumber: 362,
                                          columnNumber: 32,
                                        },
                                        this
                                      ),
                                  ],
                                },
                                void 0,
                                !0,
                                {
                                  fileName: p,
                                  lineNumber: 349,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-field',
                                  children: [
                                    /* @__PURE__ */ d(
                                      'label',
                                      {
                                        class: 'tb-label',
                                        for: 'tb-email',
                                        children: [
                                          s.t('widget.emailLabel'),
                                          /* @__PURE__ */ d(
                                            'span',
                                            {
                                              class: 'tb-req',
                                              children: ' *',
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: p,
                                              lineNumber: 368,
                                              columnNumber: 19,
                                            },
                                            this
                                          ),
                                        ],
                                      },
                                      void 0,
                                      !0,
                                      {
                                        fileName: p,
                                        lineNumber: 366,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    /* @__PURE__ */ d(
                                      'input',
                                      {
                                        id: 'tb-email',
                                        class: 'tb-input',
                                        type: 'email',
                                        placeholder: s.t('widget.emailPlaceholder'),
                                        value: I,
                                        onInput: (b) => J(b.target.value),
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: p,
                                        lineNumber: 370,
                                        columnNumber: 17,
                                      },
                                      this
                                    ),
                                    Qe &&
                                      /* @__PURE__ */ d(
                                        'div',
                                        {
                                          class: 'tb-error',
                                          children: Qe,
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: p,
                                          lineNumber: 378,
                                          columnNumber: 32,
                                        },
                                        this
                                      ),
                                    h.project.requireEmailVerification &&
                                      /* @__PURE__ */ d(
                                        'div',
                                        {
                                          class: 'tb-hint',
                                          children: s.t('widget.emailRequired'),
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: p,
                                          lineNumber: 380,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                  ],
                                },
                                void 0,
                                !0,
                                {
                                  fileName: p,
                                  lineNumber: 365,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              D &&
                                /* @__PURE__ */ d(
                                  Wr,
                                  {
                                    fields: D.fields,
                                    values: _,
                                    errors: B,
                                    i18n: s,
                                    onChange: dn,
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: p,
                                    lineNumber: 385,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                            ],
                          },
                          void 0,
                          !0,
                          {
                            fileName: p,
                            lineNumber: 347,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'div',
                          {
                            class: 'tb-section',
                            children: [
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-section-title',
                                  children: s.t('widget.sectionContext'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 396,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ d(
                                'button',
                                {
                                  type: 'button',
                                  class: 'tb-pin-btn',
                                  onClick: fn,
                                  children: X
                                    ? s.t('widget.pinned', { selector: X })
                                    : s.t('widget.pin'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 397,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              X &&
                                /* @__PURE__ */ d(
                                  'div',
                                  {
                                    class: 'tb-pinned',
                                    children: [
                                      /* @__PURE__ */ d(
                                        'span',
                                        {
                                          class: 'tb-pinned-selector',
                                          children: X,
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: p,
                                          lineNumber: 402,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                      /* @__PURE__ */ d(
                                        'button',
                                        {
                                          'type': 'button',
                                          'class': 'tb-pinned-clear',
                                          'aria-label': s.t('widget.pinClear'),
                                          'onClick': () => Ze(null),
                                          'children': '×',
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: p,
                                          lineNumber: 403,
                                          columnNumber: 19,
                                        },
                                        this
                                      ),
                                    ],
                                  },
                                  void 0,
                                  !0,
                                  {
                                    fileName: p,
                                    lineNumber: 401,
                                    columnNumber: 17,
                                  },
                                  this
                                ),
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-hint',
                                  children: s.t('widget.pinHint'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 414,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          {
                            fileName: p,
                            lineNumber: 395,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'div',
                          {
                            class: 'tb-section',
                            children: [
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-section-title',
                                  children: s.t('widget.sectionScreenshot'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 418,
                                  columnNumber: 15,
                                },
                                this
                              ),
                              /* @__PURE__ */ d(
                                'div',
                                {
                                  class: 'tb-hint',
                                  children: s.t('widget.screenshotNote'),
                                },
                                void 0,
                                !1,
                                {
                                  fileName: p,
                                  lineNumber: 419,
                                  columnNumber: 15,
                                },
                                this
                              ),
                            ],
                          },
                          void 0,
                          !0,
                          {
                            fileName: p,
                            lineNumber: 417,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'button',
                          {
                            id: 'tb-submit-btn',
                            class: 'tb-submit',
                            disabled: a === 'submitting',
                            onClick: () => {
                              hn()
                            },
                            children:
                              a === 'submitting' ? s.t('widget.sending') : s.t('widget.submit'),
                          },
                          void 0,
                          !1,
                          {
                            fileName: p,
                            lineNumber: 422,
                            columnNumber: 13,
                          },
                          this
                        ),
                        /* @__PURE__ */ d(
                          'div',
                          {
                            class: 'tb-screenshot-note',
                            children: s.t('widget.screenshotHint'),
                          },
                          void 0,
                          !1,
                          {
                            fileName: p,
                            lineNumber: 430,
                            columnNumber: 13,
                          },
                          this
                        ),
                      ],
                    },
                    void 0,
                    !0,
                    {
                      fileName: p,
                      lineNumber: 319,
                      columnNumber: 11,
                    },
                    this
                  ),
              ],
            },
            void 0,
            !0,
            {
              fileName: p,
              lineNumber: 287,
              columnNumber: 7,
            },
            this
          ),
        },
        void 0,
        !1,
        {
          fileName: p,
          lineNumber: 286,
          columnNumber: 5,
        },
        this
      )
    : /* @__PURE__ */ d(
        'div',
        {
          class: 'tb-root',
          children: /* @__PURE__ */ d(
            'button',
            {
              'class': 'tb-fab',
              'aria-label': s.t('widget.open'),
              'onClick': it,
              'children': '!',
            },
            void 0,
            !1,
            {
              fileName: p,
              lineNumber: 278,
              columnNumber: 9,
            },
            this
          ),
        },
        void 0,
        !1,
        {
          fileName: p,
          lineNumber: 277,
          columnNumber: 7,
        },
        this
      )
}
function Jr() {
  return `
  :host { all: initial; }
  * { box-sizing: border-box; }
  .tb-root {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    color: #1f2933;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  .tb-fab {
    width: 56px; height: 56px; border-radius: 50%;
    background: #4338ca; color: #fff; border: none; cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,.25); font-size: 22px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    transition: background .15s;
  }
  .tb-fab:hover { background: #6366f1; }
  .tb-panel {
    width: 360px; max-width: calc(100vw - 32px); max-height: calc(100vh - 40px);
    overflow: auto; background: #fff; border-radius: 12px; padding: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,.28); border: 1px solid #e5e7eb;
  }
  .tb-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
  .tb-title { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; font-weight: 700; font-size: 16px; color: #1e293b; letter-spacing: -0.01em; }
  .tb-close { background: #f8fafc; border: 1px solid #e2e8f0; cursor: pointer; font-size: 18px; color: #64748b; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; }
  .tb-close:hover { background: #f1f5f9; color: #334155; }
  .tb-section { margin-bottom: 14px; }
  .tb-section-title { font-size: 12px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; margin-bottom: 8px; }
  .tb-field { margin-bottom: 12px; display: block; }
  .tb-label { display: block; margin-bottom: 4px; font-weight: 500; font-size: 13px; color: #334155; }
  .tb-req { color: #dc2626; }
  .tb-input, .tb-select, .tb-textarea {
    width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px;
    font: inherit; background: #fff; color: inherit; font-size: 13px;
  }
  .tb-input:focus, .tb-select:focus, .tb-textarea:focus { outline: none; border-color: #4338ca; box-shadow: 0 0 0 2px rgba(67,56,202,.12); }
  .tb-textarea { min-height: 72px; resize: vertical; }
  .tb-radio, .tb-check { display: flex; gap: 6px; align-items: center; margin: 4px 0; }
  .tb-scale { display: flex; gap: 6px; }
  .tb-scale button {
    flex: 1; padding: 8px 0; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer;
  }
  .tb-scale button.active { background: #4338ca; color: #fff; border-color: #4338ca; }
  .tb-error { color: #dc2626; font-size: 12px; margin-top: 4px; }
  .tb-hint { color: #64748b; font-size: 12px; margin: 6px 0; line-height: 1.4; }
  .tb-pinned { color: #0d9488; font-size: 12px; margin-top: 4px; word-break: break-all; background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 6px; padding: 6px 8px; }
  .tb-pin-btn {
    width: 100%; padding: 8px 10px; border: 1px dashed #cbd5e1; border-radius: 8px; background: #f8fafc; color: #475569; font-weight: 500; cursor: pointer; font-size: 13px;
  }
  .tb-pin-btn:hover { border-color: #4338ca; color: #4338ca; background: #eef2ff; }
  .tb-submit {
    width: 100%; padding: 10px; border: none; border-radius: 8px; background: #4338ca; color: #fff;
    font-weight: 600; cursor: pointer; margin-top: 8px; font-family: inherit; font-size: 14px;
  }
  .tb-submit:hover { background: #6366f1; }
  .tb-submit:disabled { opacity: .6; cursor: default; }
  .tb-screenshot-note { color: #64748b; font-size: 11px; margin-top: 8px; text-align: center; line-height: 1.4; }
  .tb-success { color: #0d9488; font-weight: 600; background: #f0fdfa; border: 1px solid #ccfbf1; border-radius: 8px; padding: 12px; text-align: center; }
  .tb-banner { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 8px; border-radius: 8px; margin-bottom: 10px; }
  .tb-verify { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 8px; border-radius: 8px; margin-bottom: 10px; font-size: 13px; line-height: 1.5; }
  .tb-consent { background: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 8px; margin-bottom: 12px; }
  .tb-consent-title { font-weight: 600; font-size: 13px; margin-bottom: 6px; color: #1e3a8a; }
  .tb-consent-body { font-size: 12px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
  .tb-consent-actions { display: flex; gap: 8px; }
  .tb-btn { padding: 6px 12px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; border: 1px solid transparent; }
  .tb-btn-primary { background: #4338ca; color: #fff; border-color: #4338ca; }
  .tb-btn-primary:hover { background: #6366f1; }
  .tb-btn-secondary { background: #fff; color: #334155; border-color: #cbd5e1; }
  .tb-pin-active .tb-highlight {
    outline: 2px dashed #4338ca !important; outline-offset: 2px;
    background: rgba(67,56,202,.08); cursor: crosshair;
  }
  `
}
function ne(e) {
  '@babel/helpers - typeof'
  return (
    (ne =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t
          }),
    ne(e)
  )
}
function Qr(e, t) {
  if (ne(e) != 'object' || !e) return e
  var n = e[Symbol.toPrimitive]
  if (n !== void 0) {
    var r = n.call(e, t || 'default')
    if (ne(r) != 'object') return r
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (t === 'string' ? String : Number)(e)
}
function Zr(e) {
  var t = Qr(e, 'string')
  return ne(t) == 'symbol' ? t : t + ''
}
function Mt(e, t, n) {
  return (
    (t = Zr(t)) in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  )
}
var ee = {
    en: {
      'widget.title': 'Fill a report',
      'widget.open': 'Fill a report',
      'widget.close': 'Close',
      'widget.submit': 'Send report',
      'widget.sending': 'Sending…',
      'widget.success': 'Thanks! Your report was sent.',
      'widget.error': 'Something went wrong. We will retry when you are back online.',
      'widget.emailLabel': 'Your email',
      'widget.emailPlaceholder': 'you@example.com',
      'widget.emailRequired': 'Email is required so we can follow up.',
      'widget.titleLabel': 'Summary',
      'widget.titlePlaceholder': 'Short summary of the issue',
      'widget.pinHint': 'Click to select an element on the page that shows the problem',
      'widget.pin': 'Pick element on page',
      'widget.pinned': 'Pinned: {selector}',
      'widget.screenshot': 'Attach a screenshot',
      'widget.screenshotNote': 'A screenshot helps us see the issue in context.',
      'widget.screenshotHint': 'A screenshot of this page will be attached automatically.',
      'widget.sectionDetails': 'Details',
      'widget.sectionContext': 'Context',
      'widget.sectionScreenshot': 'Screenshot',
      'widget.retry': 'Retry now',
      'widget.fieldRequired': 'This field is required',
      'widget.consentTitle': 'High-fidelity screenshot',
      'widget.consentBody':
        'Trackboard will ask to share your screen for a pixel-perfect capture. You can deny and we will use a standard capture instead.',
      'widget.consentAllow': 'Allow screen share',
      'widget.consentDeny': 'Use standard capture',
      'widget.captureModeLabel': 'Capture area',
      'widget.captureModeVisible': 'Visible area',
      'widget.captureModeFullpage': 'Full page',
      'widget.captureModeElement': 'Pinned element',
      'widget.screenshotTooLarge': 'Screenshot too large, recompressing…',
      'widget.reportTypeLabel': 'Report type',
      'widget.verifySent':
        'We sent a confirmation email to {email}. Please check your inbox and click the link to verify your report.',
    },
    es: {
      'widget.title': 'Rellenar un informe',
      'widget.open': 'Rellenar un informe',
      'widget.close': 'Cerrar',
      'widget.submit': 'Enviar reporte',
      'widget.sending': 'Enviando…',
      'widget.success': '¡Gracias! Tu reporte fue enviado.',
      'widget.error': 'Algo salió mal. Reintentaremos cuando recuperes la conexión.',
      'widget.emailLabel': 'Tu correo',
      'widget.emailPlaceholder': 'tu@ejemplo.com',
      'widget.emailRequired': 'El correo es obligatorio para dar seguimiento.',
      'widget.titleLabel': 'Resumen',
      'widget.titlePlaceholder': 'Breve resumen del problema',
      'widget.pinHint': 'Fija un elemento para resaltar qué está mal',
      'widget.pin': 'Elegir elemento',
      'widget.pinned': 'Fijado: {selector}',
      'widget.screenshot': 'Adjuntar una captura',
      'widget.retry': 'Reintentar ahora',
      'widget.fieldRequired': 'Este campo es obligatorio',
      'widget.consentTitle': 'Captura de alta fidelidad',
      'widget.consentBody':
        'Trackboard pedirá compartir tu pantalla para una captura perfecta. Puedes denegar y usaremos una captura estándar.',
      'widget.consentAllow': 'Permitir compartir pantalla',
      'widget.consentDeny': 'Usar captura estándar',
      'widget.captureModeLabel': 'Área de captura',
      'widget.captureModeVisible': 'Área visible',
      'widget.captureModeFullpage': 'Página completa',
      'widget.captureModeElement': 'Elemento fijado',
      'widget.screenshotTooLarge': 'Captura muy grande, recomprimiendo…',
      'widget.reportTypeLabel': 'Tipo de informe',
      'widget.verifySent':
        'Enviamos un correo de confirmación a {email}. Revisa tu bandeja y haz clic en el enlace para verificar tu reporte.',
    },
    de: {
      'widget.title': 'Bericht erstellen',
      'widget.open': 'Bericht erstellen',
      'widget.close': 'Schließen',
      'widget.submit': 'Bericht senden',
      'widget.sending': 'Wird gesendet…',
      'widget.success': 'Danke! Dein Bericht wurde gesendet.',
      'widget.error': 'Etwas ist schiefgelaufen. Wir versuchen es erneut, sobald du online bist.',
      'widget.emailLabel': 'Deine E-Mail',
      'widget.emailPlaceholder': 'du@beispiel.com',
      'widget.emailRequired': 'E-Mail ist nötig, um zu antworten.',
      'widget.titleLabel': 'Zusammenfassung',
      'widget.titlePlaceholder': 'Kurze Beschreibung des Problems',
      'widget.pinHint': 'Element markieren, um das Problem hervorzuheben',
      'widget.pin': 'Element wählen',
      'widget.pinned': 'Markiert: {selector}',
      'widget.screenshot': 'Screenshot anhängen',
      'widget.retry': 'Jetzt erneut versuchen',
      'widget.fieldRequired': 'Dieses Feld ist erforderlich',
      'widget.consentTitle': 'Hochauflösende Aufnahme',
      'widget.consentBody':
        'Trackboard wird um Bildschirmfreigabe bitten für eine pixelgenaue Aufnahme. Du kannst ablehnen und wir nutzen eine Standardaufnahme.',
      'widget.consentAllow': 'Bildschirmfreigabe erlauben',
      'widget.consentDeny': 'Standardaufnahme verwenden',
      'widget.captureModeLabel': 'Aufnahmebereich',
      'widget.captureModeVisible': 'Sichtbarer Bereich',
      'widget.captureModeFullpage': 'Gesamte Seite',
      'widget.captureModeElement': 'Angeheftetes Element',
      'widget.screenshotTooLarge': 'Screenshot zu groß, wird neu kodiert…',
      'widget.reportTypeLabel': 'Berichtsart',
      'widget.verifySent':
        'Wir haben eine Bestätigungs-E-Mail an {email} gesendet. Bitte prüfe dein Postfach und klicke auf den Link, um deinen Bericht zu bestätigen.',
    },
  },
  ei = class {
    constructor(e = 'en') {
      var t
      ;(Mt(this, 'dict', void 0),
        Mt(this, 'locale', void 0),
        (this.locale = e),
        (this.dict = (t = ee[e]) !== null && t !== void 0 ? t : ee.en))
    }
    t(e, t) {
      var n, r
      let o =
        (n = (r = this.dict[e]) !== null && r !== void 0 ? r : ee.en[e]) !== null && n !== void 0
          ? n
          : e
      if (t)
        for (const [i, l] of Object.entries(t))
          o = o.replace(new RegExp(`\\{${i}\\}`, 'g'), String(l))
      return o
    }
  }
function ti(e) {
  if (e && ee[e]) return e
  if (typeof navigator != 'undefined' && navigator.language) {
    const t = navigator.language.slice(0, 2).toLowerCase()
    if (ee[t]) return t
  }
  return 'en'
}
function ni() {
  var e
  return document.currentScript instanceof HTMLScriptElement
    ? document.currentScript
    : (e = Array.from(document.querySelectorAll('script[src]')).find((t) =>
          t.src.includes('/widget/v1/widget.js')
        )) !== null && e !== void 0
      ? e
      : null
}
function Dt() {
  var e
  const t = ni()
  if (!t) {
    console.warn('[trackboard] widget: could not locate own <script> tag')
    return
  }
  const n = t.dataset.projectKey
  if (!n) {
    console.warn('[trackboard] widget: missing data-project-key attribute')
    return
  }
  const r = t.src ? new URL(t.src).origin : location.origin,
    o = new ei(ti(t.dataset.locale)),
    i = (e = t.dataset.captureMode) !== null && e !== void 0 ? e : 'fullpage',
    l = t.dataset.highFidelity === 'true',
    c = document.createElement('div')
  ;((c.id = 'trackboard-widget'), document.body.appendChild(c))
  const u = t.dataset.shadowMode === 'open' ? 'open' : 'closed',
    s = c.attachShadow({ mode: u }),
    m = document.createElement('style')
  ;((m.textContent = Jr()), s.appendChild(m))
  const g = document.createElement('style')
  ;((g.textContent =
    '.tb-highlight{outline:2px dashed #2563eb!important;outline-offset:2px;background:rgba(37,99,235,.08);}'),
    document.head.appendChild(g),
    kn(
      jt(Yr, {
        apiBase: r,
        projectKey: n,
        i18n: o,
        captureMode: i,
        highFidelity: l,
      }),
      s
    ))
}
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', Dt) : Dt()
