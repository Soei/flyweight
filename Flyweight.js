import { runer as T, merge as B, isArray as ht, each as P, picker as C, isEmpty as at, isSimplyType as K, isString as xt } from "@soei/util";
import { openBlock as z, createElementBlock as M, normalizeClass as dt, normalizeStyle as O, createElementVNode as R, Fragment as ut, renderList as ct, renderSlot as g, mergeProps as G, createCommentVNode as ft, createTextVNode as pt, toDisplayString as F, createBlock as St, resolveDynamicComponent as $t, normalizeProps as zt, guardReactiveProps as Nt, withCtx as kt } from "vue";
import { runer as p, isNil as Tt, each as Q } from "@soei/tools";
import Mt from "@soei/picker";
let Et = /(\d+|[+\-\*/]|%)/g, Z = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, tt = (t, e) => {
  let i;
  if (i = T("match", t, Et)) {
    let r = i.length, n, l = 0, s, h = [];
    for (; r--; )
      l = i.shift(), l in Z ? (n && h.push(n), l === "%" && (h.length = 2), s = l) : +l && h.push(+l), h.length == 2 && (h.push(e), n = Z[s].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), t = n >> 0;
  }
  return t;
}, et = {}, _ = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  et[e] || (et[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const I = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, n] of e)
    i[r] = n;
  return i;
};
let it = (t) => t == null || t == null, Ht = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Lt = {
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
        "--width": _(this.realW),
        "--height": _(this.realH),
        "--flyweight-content": _(i)
      }, e && {
        "--flyweight-h": _(e)
      }, t && r, {
        "--flyweight-w": _(t)
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
      Ht(t);
    }
    this.scrollx = T("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: _,
    trigger(t, e) {
      ht(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        P(t, (i, r) => {
          this.$emit(r[0], it(r[1]) ? !0 : r[1]);
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
        let i = e.index || P(this.flys, (r, n, l, s) => {
          if (n[l] == s)
            return r;
        }, e.picker, e.id);
        it(i) || this.setindex(i);
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
      P(
        this.flyweights,
        (l, s, h, o, d, u, c, f, a) => {
          if (h = l / d >> 0, f = h + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % o) + (u / o >> 0)), a = f * d + l % d, a >= this.count) {
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
          c && v.reverse(), s.top = v[0], s.left = v[1];
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
      let i = this.scrollx, r = this.flyweight, n = C(r, this.BoxRule);
      this.$nextTick(() => {
        let l = /true/.test(this.auto), [s, h] = this.offset, o = n.width, d = n.height, u = (tt(this.width, o) || o) + s, c = tt(this.height, d) + h, f = [o / u >> 0 || 1, d / c >> 0 || 1];
        i && f.reverse();
        let [a, v] = f, x = this.padding, E, S = 0, y, w;
        i ? (y = u, u -= s, w = ($) => (
          /* 计算top偏移量 */
          $ * (c - h) + ($ + 1) * h
        )) : (l ? (u = (o - s * (a + 2 * x - 1)) / a, E = !x * s, S = x * s) : (E = 0, S = (o % u + s * a) / (a + 1) >> 0, u -= s), w = ($) => $ * (u + E) + ($ + 1) * S, y = c), this.row = v + 2, this.column = a, this.realH = c - h, this.realW = u, this.expand = y, this.Size = Math.ceil(t / a) * y;
        let b = Math.min(t, a * this.row), m = b - 1, N;
        for (; b-- > 0; )
          N = m - b, this.$set(e, N, {
            x: s,
            y: h,
            width: u,
            height: c - h,
            space: w(N % a),
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
}, Pt = { class: "flyweight-all" };
function Rt(t, e, i, r, n, l) {
  return z(), M("div", {
    ref: "flyweight",
    class: dt(["flyweight", {
      "flyweight-active": n.actice
    }]),
    style: O(l.style),
    onScroll: e[0] || (e[0] = (...s) => l.scroll && l.scroll(...s))
  }, [
    R("div", Pt, [
      (z(!0), M(ut, null, ct(n.flyweights, (s, h) => (z(), M("div", {
        key: h,
        style: O({
          top: s.top + "px",
          left: s.left + "px"
        })
      }, [
        g(t.$slots, "default", G({ ref_for: !0 }, s), void 0, !0)
      ], 4))), 128))
    ]),
    n.flyweights.length ? g(t.$slots, "end", { key: 0 }, void 0, !0) : ft("", !0)
  ], 38);
}
const Wt = /* @__PURE__ */ I(Lt, [["render", Rt], ["__scopeId", "data-v-35b94e9b"]]);
function D(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let gt = {
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
}, At = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], yt = {};
P(
  At,
  (t, e, i) => {
    t = D(e), yt["--" + D(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  gt
);
const Bt = {
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
  watch: gt,
  methods: {
    exec: _,
    isEmpty: at,
    isSimplyType: K,
    tr() {
      let t = {};
      return this.margin(this.offset), P(yt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: D,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = _(r));
    },
    change(t) {
      K(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      B(
        this,
        C(
          xt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, Ct = { class: "card-title" }, Ot = ["title"], It = { class: "card-content" };
function jt(t, e, i, r, n, l) {
  return z(), M("div", {
    class: "card",
    key: n.trigger,
    style: O(l.isEmpty(l.style) ? l.tr() : l.style)
  }, [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => {
        var s;
        return [
          R("div", Ct, [
            pt(F(i.show || i.title) + " ", 1),
            R("div", {
              class: dt(["card-close", { hide: l.isSimplyType(i.close) ? !i.close : !1 }]),
              style: O(n.closecss),
              onClick: e[0] || (e[0] = (h) => t.$emit("close")),
              title: (s = i.close) == null ? void 0 : s.tips
            }, null, 14, Ot)
          ])
        ];
      }, !0),
      g(t.$slots, "content", {}, () => [
        R("div", It, [
          g(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const Ft = /* @__PURE__ */ I(Bt, [["render", jt], ["__scopeId", "data-v-2008eeb3"]]), Dt = {
  name: "Stream",
  computed: {
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return at(i) ? [] : ht(i) ? i : [i];
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
    data: {
      type: Array,
      default: () => []
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
  methods: {
    trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Gt(t, e, i, r, n, l) {
  return z(), St($t(i.type), zt(Nt(t.$attrs)), {
    default: kt(() => [
      (z(!0), M(ut, null, ct(l.column, (s) => g(t.$slots, l.trigger(s), G({
        key: s.type
      }, { ref_for: !0 }, s))), 128))
    ]),
    _: 3
  }, 16);
}
const Ut = /* @__PURE__ */ I(Dt, [["render", Gt]]), st = /(?:\,|\|{2})/, rt = "px", lt = "";
let mt = document.documentElement, nt, ot = ["s-left", "s-top", "s-right", "s-bottom"], Vt = { left: 0, top: 1, right: 2, bottom: 3 };
const U = [];
var qt = Mt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let V = {}, wt = null;
qt(V, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    wt = Xt(() => {
      p(U);
    }, t), this._delay = t;
  }
});
V.delay = 60;
function Xt(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, p(t, this, arguments));
  };
}
const A = () => {
  wt();
};
function Yt(t) {
  U.push(t);
}
const L = new ResizeObserver(A);
L.observe(mt);
function bt(t) {
  t.onresize || (U.push([bt, null, t]), t.onresize = !0);
  var e = mt, i = e.clientHeight, r = Tt(t.offset) ? 15 : t.offset, n = t.target, l = t.room, s = t.index, h = t.position, o = n.getBoundingClientRect(), d = l.offsetHeight + r, u = l.offsetWidth + r, c = "3,0,2,1".split(st), f, a = (o.height == nt ? o.bottom - o.top : o.height) >> 0, v = (o.width == nt ? o.right - o.left : o.width) >> 0, x = e.clientWidth - u, E = i - d, S = [
    /* left: 0 */
    o.left - u,
    /* top: 1 */
    o.top - d,
    /* right: 2 */
    x - o.right,
    /* bottom: 3 */
    E - o.bottom
  ];
  h && (Q(
    h.split(st),
    function(_t, W, j, vt) {
      vt.push(j[W]);
    },
    Vt,
    f = []
  ), c.unshift.apply(c, f)), s = Q(
    c,
    function(_t, W, j) {
      if (j[W] > 0)
        return W;
    },
    S
  );
  var y = 0, w = 0, b = 0;
  if (s != null) {
    var m = s == 0 || s == 2, N = s == 3 || s == 1;
    y = N ? Math.min(o.left, x) : s == 2 ? o.right + r : S[0], d -= r * +m;
    var k = Math.max(o.top, 0), $ = Math.min(
      o.bottom,
      i
    ), q = ($ - d + Math.min(i - d, k)) / 2;
    w = Math.max(
      m ? q : s == 3 ? o.top + a + r : Math.min(q, S[1]),
      0
    ), N && o.left > x && (b = o.left - y - r + v / 2);
  }
  let X = l.classList, H = t.css;
  X.remove(...ot), X.add(ot[s]), t.index = s, H.left = y + rt, H.top = w + rt;
  let Y = H["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(w, k) - w,
    d - r
  ) : lt, J = u - 3 * r;
  H["--tips-arrow"] = b > J - 10 || m && (Y + (d > 50 ? 15 : 0) > d || !Y) ? "hidden" : "visible", H["--tips-arrow-left"] = b ? Math.min(b, J) : lt;
}
const Jt = {
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
        e ? p(t.addEventListener, t, "scroll", A) : (p(L.observe, L, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, "-tips-scroll"), i || (p(t.addEventListener, t, "scroll", A), this.attr(t, "-tips-scroll", "true"))));
      });
    }
  },
  mounted() {
    B(
      this.css,
      C(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      )
    ), this.css["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0, this.init(), V.delay = +this.delay, Yt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      p(t.removeEventListener, t, "scroll", A), p(t.removeAttribute, t, "-tips-scroll", void 0), e || p(L.unobserve, L, t);
    });
  }
}, Kt = ["static"], Qt = { class: "tips-title" };
function Zt(t, e, i, r, n, l) {
  return i.visible ? (z(), M("div", G({
    key: 0,
    class: "tips",
    style: i.static ? null : n.css,
    static: i.static ? "" : null
  }, t.$attrs), [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => [
        R("div", Qt, F(i.title), 1)
      ], !0),
      g(t.$slots, "content", {}, () => [
        pt(F(i.content), 1)
      ], !0)
    ], !0)
  ], 16, Kt)) : ft("", !0);
}
const te = /* @__PURE__ */ I(Jt, [["render", Zt], ["__scopeId", "data-v-8c83dee3"]]), ee = [Wt, Ft, Ut, te], ne = {
  install(t) {
    ee.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Ft as Card,
  Wt as Flyweight,
  Ut as Stream,
  te as Tips,
  ne as default
};
