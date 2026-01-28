import { runer as T, merge as B, isArray as at, each as C, picker as O, isEmpty as dt, isSimplyType as Q, isString as St } from "@soei/util";
import { openBlock as N, createElementBlock as M, normalizeClass as ct, normalizeStyle as P, createElementVNode as W, Fragment as ut, renderList as ft, renderSlot as g, mergeProps as I, createCommentVNode as pt, createTextVNode as gt, toDisplayString as G, createBlock as $t, resolveDynamicComponent as Nt, withCtx as zt } from "vue";
import { runer as p, isNil as kt, each as Z } from "@soei/tools";
import Tt from "@soei/picker";
let Mt = /(\d+|[+\-\*/]|%)/g, tt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, et = (t, e) => {
  let i;
  if (i = T("match", t, Mt)) {
    let r = i.length, n, l = 0, s, h = [];
    for (; r--; )
      l = i.shift(), l in tt ? (n && h.push(n), l === "%" && (h.length = 2), s = l) : +l && h.push(+l), h.length == 2 && (h.push(e), n = tt[s].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), t = n >> 0;
  }
  return t;
}, it = {}, b = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  it[e] || (it[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const j = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, n] of e)
    i[r] = n;
  return i;
};
let st = (t) => t == null || t == null, Et = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ht = {
  name: "Flyweight",
  props: {
    flys: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 100
    },
    w: {
      type: [Number, String]
    },
    h: {
      type: [Number, String]
    },
    offset: {
      type: Array,
      default: () => [0, 0]
    },
    lazy: {
      type: Number,
      default: 100
    },
    view: {
      type: Object,
      default: () => ({ id: 0 })
    },
    index: {
      type: Number,
      default: 0
    },
    top: {
      type: [String, Number],
      default: 0
    },
    left: {
      type: [String, Number],
      default: 0
    },
    auto: {
      type: [Boolean, String],
      default: !1
    },
    space: {
      type: Object,
      default: () => null
    },
    padding: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, r = {};
      return B(r, {
        "--width": b(this.realW),
        "--height": b(this.realH),
        "--flyweight-content": b(i)
      }, e && {
        "--flyweight-h": b(e)
      }, t && r, {
        "--flyweight-w": b(t)
      }, "mix"), r;
    }
  },
  data() {
    return {
      flyweights: [],
      actice: !1,
      Size: null,
      column: 1,
      row: 1,
      expand: 10,
      count: 0,
      task: [],
      realW: 0,
      realH: 0
    };
  },
  watch: {
    flys(t) {
      this.count = t.length, this.rebuild();
      let e = this.task.shift();
      e && this.$nextTick(() => {
        this.setview(e);
      });
    },
    view: {
      handler(t) {
        this.setview(t);
      },
      immediate: !0,
      deep: !0
    },
    index(t) {
      this.setindex(t);
    },
    top(t) {
      this.flyweight.scrollTop = t;
    },
    left(t) {
      this.flyweight.scrollLeft = t;
    }
  },
  mounted() {
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Et(t);
    }
    this.scrollx = T("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: b,
    trigger(t, e) {
      at(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        C(t, (i, r) => {
          this.$emit(r[0], st(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      T([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || C(this.flys, (r, n, l, s) => {
          if (n[l] == s)
            return r;
        }, e.picker, e.id);
        st(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      T([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * r, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        T(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = T(this.direction, t.target), r = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      B(r, this.space), t.from || e.push(["onscroll", r]);
      let n = !1;
      C(
        this.flyweights,
        (l, s, h, o, d, c, u, f, a) => {
          if (h = l / d >> 0, f = h + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < c % o) + (c / o >> 0)), a = f * d + l % d, a >= this.count) {
            n || (e.push(["onend"]), n = !0);
            return;
          }
          s.index = f, s.i = a, s.data = this.flys[a];
          let v = [
            /* top */
            f * this.expand + s.x,
            /* left */
            s.space
          ];
          u && v.reverse(), s.top = v[0], s.left = v[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        r.index,
        this.scrollx
      ), this.trigger(e), e = null;
    },
    scroll(t) {
      this.run(t || { target: this.flyweight, from: "space" });
    },
    rebuild() {
      let t = this.count || this.flys.length, e = this.flyweights;
      if (!t)
        return e.length = t;
      this.count = t;
      let i = this.scrollx, r = this.flyweight, n = O(r, this.BoxRule);
      this.$nextTick(() => {
        let l = /true/.test(this.auto), [s, h] = this.offset, o = n.width, d = n.height, c = (et(this.width, o) || o) + s, u = et(this.height, d) + h, f = [o / c >> 0 || 1, d / u >> 0 || 1];
        i && f.reverse();
        let [a, v] = f, x = this.padding, E, S = 0, y, _;
        i ? (y = c, c -= s, _ = ($) => (
          /* 计算top偏移量 */
          $ * (u - h) + ($ + 1) * h
        )) : (l ? (c = (o - s * (a + 2 * x - 1)) / a, E = !x * s, S = x * s) : (E = 0, S = (o % c + s * a) / (a + 1) >> 0, c -= s), _ = ($) => $ * (c + E) + ($ + 1) * S, y = u), this.row = v + 2, this.column = a, this.realH = u - h, this.realW = c, this.expand = y, this.Size = Math.ceil(t / a) * y;
        let w = Math.min(t, a * this.row), m = w - 1, z;
        for (; w-- > 0; )
          z = m - w, this.$set(e, z, {
            x: s,
            y: h,
            width: c,
            height: u - h,
            space: _(z % a),
            data: {}
          });
        e.length = m + 1;
        let k = [];
        d / y > m / a && k.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), k.push(["update:space", {
          row: (m / a >> 0) + 1,
          column: a,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(k);
      });
    }
  }
}, Lt = { class: "flyweight-all" };
function Ct(t, e, i, r, n, l) {
  return N(), M("div", {
    ref: "flyweight",
    class: ct(["flyweight", {
      "flyweight-active": n.actice
    }]),
    style: P(l.style),
    onScroll: e[0] || (e[0] = (...s) => l.scroll && l.scroll(...s))
  }, [
    W("div", Lt, [
      (N(!0), M(ut, null, ft(n.flyweights, (s, h) => (N(), M("div", {
        key: h,
        style: P({
          top: s.top + "px",
          left: s.left + "px"
        })
      }, [
        g(t.$slots, "default", I({ ref_for: !0 }, s), void 0, !0)
      ], 4))), 128))
    ]),
    n.flyweights.length ? g(t.$slots, "end", { key: 0 }, void 0, !0) : pt("", !0)
  ], 38);
}
const Wt = /* @__PURE__ */ j(Ht, [["render", Ct], ["__scopeId", "data-v-35b94e9b"]]);
function U(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let yt = {
  close: {
    handler(t) {
      this.change(t);
    },
    deep: !0
  },
  offset: {
    handler(t) {
      this.margin(t);
    },
    deep: !0
  }
}, Bt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], mt = {};
C(
  Bt,
  (t, e, i) => {
    t = U(e), mt["--" + U(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  yt
);
const Rt = {
  name: "Card",
  // inheritAttrs: false,
  props: {
    offset: {
      type: [String, Array],
      default: () => [0, 0, 0, 0]
    },
    background: {
      type: String,
      default: ""
    },
    border: {
      type: String,
      default: "1px"
    },
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String,
      default: "100%"
    },
    show: {
      type: String,
      default: ""
    },
    close: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      closecss: {},
      // style: {},
      trigger: 0,
      default: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        height: "100%",
        width: "100%",
        background: "",
        border: "1px"
      }
    };
  },
  computed: {
    style() {
      return this.tr();
    }
  },
  watch: yt,
  methods: {
    exec: b,
    isEmpty: dt,
    isSimplyType: Q,
    tr() {
      let t = {};
      return this.margin(this.offset), C(mt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: U,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = b(r));
    },
    change(t) {
      Q(t) || (this.closecss = O(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      B(
        this,
        O(
          St(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
          "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
          !0
        ),
        !0
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, At = { class: "card-title" }, Ot = ["title"], Pt = { class: "card-content" };
function It(t, e, i, r, n, l) {
  return N(), M("div", {
    class: "card",
    key: n.trigger,
    style: P(l.isEmpty(l.style) ? l.tr() : l.style)
  }, [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => {
        var s;
        return [
          W("div", At, [
            gt(G(i.show || i.title) + " ", 1),
            W("div", {
              class: ct(["card-close", { hide: l.isSimplyType(i.close) ? !i.close : !1 }]),
              style: P(n.closecss),
              onClick: e[0] || (e[0] = (h) => t.$emit("close")),
              title: (s = i.close) == null ? void 0 : s.tips
            }, null, 14, Ot)
          ])
        ];
      }, !0),
      g(t.$slots, "content", {}, () => [
        W("div", Pt, [
          g(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const jt = /* @__PURE__ */ j(Rt, [["render", It], ["__scopeId", "data-v-85bce7b7"]]), Ft = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return dt(i) ? [] : at(i) ? i : [i];
    }
  },
  props: {
    /* 桥接 指定数据字段为插槽名称 */
    bridge: {
      type: String,
      default: "slot"
    },
    type: {
      type: String,
      default: "div"
    },
    columns: {
      type: [Object, Array],
      default: () => null
    },
    T: {
      type: [Array, Object],
      default: () => null
    }
  },
  mounted() {
    this.$.vnode.ref && B(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Dt(t, e, i, r, n, l) {
  return N(), $t(Nt(i.type), I({ ref: "component" }, t.$attrs), {
    default: zt(() => [
      (N(!0), M(ut, null, ft(l.column, (s) => g(t.$slots, l.__trigger(s), I({
        key: s.type
      }, { ref_for: !0 }, s))), 128))
    ]),
    _: 3
  }, 16);
}
const Gt = /* @__PURE__ */ j(Ft, [["render", Dt]]), rt = /(?:\,|\|{2})/, lt = "px", nt = "";
let _t = document.documentElement, ot, ht = ["s-left", "s-top", "s-right", "s-bottom"], Ut = { left: 0, top: 1, right: 2, bottom: 3 };
const V = [];
var Vt = Tt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let q = {}, wt = null;
Vt(q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    wt = qt(() => {
      p(V);
    }, t), this._delay = t;
  }
});
q.delay = 60;
function qt(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, p(t, this, arguments));
  };
}
const A = () => {
  wt();
};
function Xt(t) {
  V.push(t);
}
const L = new ResizeObserver(A);
L.observe(_t);
function bt(t) {
  t.onresize || (V.push([bt, null, t]), t.onresize = !0);
  var e = _t, i = e.clientHeight, r = kt(t.offset) ? 15 : t.offset, n = t.target, l = t.room, s = t.index, h = t.position, o = n.getBoundingClientRect(), d = l.offsetHeight + r, c = l.offsetWidth + r, u = "3,0,2,1".split(rt), f, a = (o.height == ot ? o.bottom - o.top : o.height) >> 0, v = (o.width == ot ? o.right - o.left : o.width) >> 0, x = e.clientWidth - c, E = i - d, S = [
    /* left: 0 */
    o.left - c,
    /* top: 1 */
    o.top - d,
    /* right: 2 */
    x - o.right,
    /* bottom: 3 */
    E - o.bottom
  ];
  h && (Z(
    h.split(rt),
    function(vt, R, F, xt) {
      xt.push(F[R]);
    },
    Ut,
    f = []
  ), u.unshift.apply(u, f)), s = Z(
    u,
    function(vt, R, F) {
      if (F[R] > 0)
        return R;
    },
    S
  );
  var y = 0, _ = 0, w = 0;
  if (s != null) {
    var m = s == 0 || s == 2, z = s == 3 || s == 1;
    y = z ? Math.min(o.left, x) : s == 2 ? o.right + r : S[0], d -= r * +m;
    var k = Math.max(o.top, 0), $ = Math.min(
      o.bottom,
      i
    ), X = ($ - d + Math.min(i - d, k)) / 2;
    _ = Math.max(
      m ? X : s == 3 ? o.top + a + r : Math.min(X, S[1]),
      0
    ), z && o.left > x && (w = o.left - y - r + v / 2);
  }
  let Y = l.classList, H = t.css;
  Y.remove(...ht), Y.add(ht[s]), t.index = s, H.left = y + lt, H.top = _ + lt;
  let J = H["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(_, k) - _,
    d - r
  ) : nt, K = c - 3 * r;
  H["--tips-arrow"] = w > K - 10 || m && (J + (d > 50 ? 15 : 0) > d || !J) ? "hidden" : "visible", H["--tips-arrow-left"] = w ? Math.min(w, K) : nt;
}
const D = "data-tips-scroll", Yt = {
  name: "Tips",
  props: {
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !0
    },
    /* 提示内容 */
    content: {
      type: String,
      default: ""
    },
    /* 提示标题 */
    title: {
      type: [String, Number],
      default: ""
    },
    /* 显示位置 */
    position: {
      type: String,
      default: "top"
    },
    /* tips容器的偏移量 */
    offset: {
      type: [String, Number],
      default: void 0
    },
    /* 字体大小 */
    fontSize: {
      type: [String, Number],
      default: void 0
    },
    /* 边框宽度 */
    border: {
      type: [String, Number],
      default: void 0
    },
    /* 边框和颜色 */
    color: {
      type: [String, Number],
      default: void 0
    },
    /* 背景色 */
    background: {
      type: [String, Number],
      default: void 0
    },
    /* 静态显示 */
    static: {
      type: Boolean,
      default: !1
    },
    delay: {
      type: [String, Number],
      default: 10
    },
    /* 显示箭头 */
    borderRadius: {
      type: [String, Number],
      default: 10
    }
  },
  watch: {
    visible: function(t) {
      t && this.$nextTick(() => {
        this.init();
      });
    }
  },
  data() {
    return {
      css: {}
    };
  },
  methods: {
    parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), p(t, null, e, i), !i); )
        ;
    },
    attr(t, e, i) {
      return p(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      this.$el.nodeName != "#comment" && bt({
        onresize: !1,
        /* 监控的目标 */
        target: this.$el.parentNode,
        /* 显示的元素 */
        room: this.$el,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      });
    },
    scrollListener() {
      this.static || this.parent((t, e, i) => {
        e ? p(t.addEventListener, t, "scroll", A) : (p(L.observe, L, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, D), i || (p(t.addEventListener, t, "scroll", A), this.attr(t, D, "true"))));
      });
    }
  },
  mounted() {
    B(
      this.css,
      O(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      )
    ), this.css["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0, this.init(), q.delay = +this.delay, Xt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      p(t.removeEventListener, t, "scroll", A), p(t.removeAttribute, t, D, void 0), e || p(L.unobserve, L, t);
    });
  }
}, Jt = ["static"], Kt = { class: "tips-title" };
function Qt(t, e, i, r, n, l) {
  return i.visible ? (N(), M("div", I({
    key: 0,
    class: "tips",
    style: i.static ? null : n.css,
    static: i.static ? "" : null
  }, t.$attrs), [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => [
        W("div", Kt, G(i.title), 1)
      ], !0),
      g(t.$slots, "content", {}, () => [
        gt(G(i.content), 1)
      ], !0)
    ], !0)
  ], 16, Jt)) : pt("", !0);
}
const Zt = /* @__PURE__ */ j(Yt, [["render", Qt], ["__scopeId", "data-v-e7d22ab3"]]), te = [Wt, jt, Gt, Zt], le = {
  install(t) {
    te.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  jt as Card,
  Wt as Flyweight,
  Gt as Stream,
  Zt as Tips,
  le as default
};
