import { runer as T, merge as B, isArray as nt, each as H, picker as O, isEmpty as ot, isSimplyType as J, isString as _t } from "@soei/util";
import { openBlock as z, createElementBlock as M, normalizeClass as ht, normalizeStyle as I, createElementVNode as P, Fragment as at, renderList as ct, renderSlot as m, mergeProps as U, createCommentVNode as ut, createTextVNode as dt, toDisplayString as D, createBlock as xt, resolveDynamicComponent as vt, normalizeProps as St, guardReactiveProps as $t, withCtx as zt } from "vue";
import { runer as p, each as K } from "@soei/tools";
import kt from "@soei/picker";
let Nt = /(\d+|[+\-\*/]|%)/g, Q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, Z = (t, e) => {
  let i;
  if (i = T("match", t, Nt)) {
    let r = i.length, n, l = 0, s, h = [];
    for (; r--; )
      l = i.shift(), l in Q ? (n && h.push(n), l === "%" && (h.length = 2), s = l) : +l && h.push(+l), h.length == 2 && (h.push(e), n = Q[s].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), t = n >> 0;
  }
  return t;
}, tt = {}, _ = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  tt[e] || (tt[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const j = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, n] of e)
    i[r] = n;
  return i;
};
let et = (t) => t == null || t == null, Tt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Mt = {
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
      Tt(t);
    }
    this.scrollx = T("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: _,
    trigger(t, e) {
      nt(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        H(t, (i, r) => {
          this.$emit(r[0], et(r[1]) ? !0 : r[1]);
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
        let i = e.index || H(this.flys, (r, n, l, s) => {
          if (n[l] == s)
            return r;
        }, e.picker, e.id);
        et(i) || this.setindex(i);
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
      H(
        this.flyweights,
        (l, s, h, o, u, c, d, f, a) => {
          if (h = l / u >> 0, f = h + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < c % o) + (c / o >> 0)), a = f * u + l % u, a >= this.count) {
            n || (e.push(["onend"]), n = !0);
            return;
          }
          s.index = f, s.i = a, s.data = this.flys[a];
          let x = [
            /* top */
            f * this.expand + s.x,
            /* left */
            s.space
          ];
          d && x.reverse(), s.top = x[0], s.left = x[1];
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
        let l = /true/.test(this.auto), [s, h] = this.offset, o = n.width, u = n.height, c = (Z(this.width, o) || o) + s, d = Z(this.height, u) + h, f = [o / c >> 0 || 1, u / d >> 0 || 1];
        i && f.reverse();
        let [a, x] = f, v = this.padding, L, S = 0, g, y;
        i ? (g = c, c -= s, y = (b) => (
          /* 计算top偏移量 */
          b * (d - h) + (b + 1) * h
        )) : (l ? (c = (o - s * (a + 2 * v - 1)) / a, L = !v * s, S = v * s) : (L = 0, S = (o % c + s * a) / (a + 1) >> 0, c -= s), y = (b) => b * (c + L) + (b + 1) * S, g = d), this.row = x + 2, this.column = a, this.realH = d - h, this.realW = c, this.expand = g, this.Size = Math.ceil(t / a) * g;
        let $ = Math.min(t, a * this.row), w = $ - 1, k;
        for (; $-- > 0; )
          k = w - $, this.$set(e, k, {
            x: s,
            y: h,
            width: c,
            height: d - h,
            space: y(k % a),
            data: {}
          });
        e.length = w + 1;
        let N = [];
        u / g > w / a && N.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), N.push(["update:space", {
          row: (w / a >> 0) + 1,
          column: a,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(N);
      });
    }
  }
}, Lt = { class: "flyweight-all" };
function Et(t, e, i, r, n, l) {
  return z(), M("div", {
    ref: "flyweight",
    class: ht(["flyweight", {
      "flyweight-active": n.actice
    }]),
    style: I(l.style),
    onScroll: e[0] || (e[0] = (...s) => l.scroll && l.scroll(...s))
  }, [
    P("div", Lt, [
      (z(!0), M(at, null, ct(n.flyweights, (s, h) => (z(), M("div", {
        key: h,
        style: I({
          top: s.top + "px",
          left: s.left + "px"
        })
      }, [
        m(t.$slots, "default", U({ ref_for: !0 }, s), void 0, !0)
      ], 4))), 128))
    ]),
    n.flyweights.length ? m(t.$slots, "end", { key: 0 }, void 0, !0) : ut("", !0)
  ], 38);
}
const Ht = /* @__PURE__ */ j(Mt, [["render", Et], ["__scopeId", "data-v-35b94e9b"]]);
function G(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let ft = {
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
}, Pt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], pt = {};
H(
  Pt,
  (t, e, i) => {
    t = G(e), pt["--" + G(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  ft
);
const Wt = {
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
  watch: ft,
  methods: {
    exec: _,
    isEmpty: ot,
    isSimplyType: J,
    tr() {
      let t = {};
      return this.margin(this.offset), H(pt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: G,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = _(r));
    },
    change(t) {
      J(t) || (this.closecss = O(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      B(
        this,
        O(
          _t(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, At = { class: "card-title" }, Ct = ["title"], Rt = { class: "card-content" };
function Bt(t, e, i, r, n, l) {
  return z(), M("div", {
    class: "card",
    key: n.trigger,
    style: I(l.isEmpty(l.style) ? l.tr() : l.style)
  }, [
    m(t.$slots, "default", {}, () => [
      m(t.$slots, "title", {}, () => {
        var s;
        return [
          P("div", At, [
            dt(D(i.show || i.title) + " ", 1),
            P("div", {
              class: ht(["card-close", { hide: l.isSimplyType(i.close) ? !i.close : !1 }]),
              style: I(n.closecss),
              onClick: e[0] || (e[0] = (h) => t.$emit("close")),
              title: (s = i.close) == null ? void 0 : s.tips
            }, null, 14, Ct)
          ])
        ];
      }, !0),
      m(t.$slots, "content", {}, () => [
        P("div", Rt, [
          m(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const Ot = /* @__PURE__ */ j(Wt, [["render", Bt], ["__scopeId", "data-v-2008eeb3"]]), It = {
  name: "Stream",
  computed: {
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return ot(i) ? [] : nt(i) ? i : [i];
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
function jt(t, e, i, r, n, l) {
  return z(), xt(vt(i.type), St($t(t.$attrs)), {
    default: zt(() => [
      (z(!0), M(at, null, ct(l.column, (s) => m(t.$slots, l.trigger(s), U({
        key: s.type
      }, { ref_for: !0 }, s))), 128))
    ]),
    _: 3
  }, 16);
}
const Ft = /* @__PURE__ */ j(It, [["render", jt]]), it = /(?:\,|\|{2})/, C = "px", st = "";
let gt = document.documentElement, rt, lt = ["s-left", "s-top", "s-right", "s-bottom"], Dt = { left: 0, top: 1, right: 2, bottom: 3 };
const V = [];
var Gt = kt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let X = {}, yt = null;
Gt(X, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    yt = Ut(() => {
      p(V);
    }, t), this._delay = t;
  }
});
X.delay = 60;
function Ut(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, p(t, this, arguments));
  };
}
const R = () => {
  yt();
};
function Vt(t) {
  V.push(t);
}
const E = new ResizeObserver(R);
E.observe(gt);
function mt(t) {
  t.onresize || (V.push([mt, null, t]), t.onresize = !0);
  var e = gt, i = e.clientHeight, r = t.offset || 15, n = t.target, l = t.room, s = t.index, h = t.position, o = n.getBoundingClientRect(), u = l.offsetHeight + r, c = l.offsetWidth + r, d = "3,0,2,1".split(it), f, a = (o.height == rt ? o.bottom - o.top : o.height) >> 0, x = (o.width == rt ? o.right - o.left : o.width) >> 0, v = e.clientWidth - c, L = i - u, S = [
    /* left: 0 */
    o.left - c,
    /* top: 1 */
    o.top - u,
    /* right: 2 */
    v - o.right,
    /* bottom: 3 */
    L - o.bottom
  ];
  h && (K(
    h.split(it),
    function(wt, A, F, bt) {
      bt.push(F[A]);
    },
    Dt,
    f = []
  ), d.unshift.apply(d, f)), s = K(
    d,
    function(wt, A, F) {
      if (F[A] > 0)
        return A;
    },
    S
  );
  var g = 0, y = 0, $ = 0;
  if (s != null) {
    var w = s == 0 || s == 2, k = s == 3 || s == 1;
    g = k ? Math.min(o.left, v) : s == 2 ? o.right + r : S[0], u -= r * +w;
    var N = Math.max(o.top, 0), b = Math.min(
      o.bottom,
      i
    ), Y = (b - u + Math.min(i - u, N)) / 2;
    y = Math.max(
      w ? Y : s == 3 ? o.top + a + r : Math.min(Y, S[1]),
      0
    ), k && o.left > v && ($ = o.left - g - r + x / 2);
  }
  let q = l.classList, W = t.css;
  q.remove(...lt), q.add(lt[s]), t.index = s, W.left = g + C, W.top = y + C, W["--tips-position-top"] = w ? Math.max(
    r,
    Math.min(
      /* 底边距 */
      (Math.min(y + u, b) + Math.max(y, N)) / 2 - y + r / 2,
      /* 容器高度 - offset / 2 */
      u - 0.5 * r
    )
  ) + C : st, W["--tips-position-left"] = $ ? Math.min($, c - 3 * r) + C : st;
}
const Xt = {
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
      this.$el.nodeName != "#comment" && mt({
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
        offset: +this.offset
      });
    },
    scrollListener() {
      this.static || this.parent((t, e, i) => {
        e ? p(t.addEventListener, t, "scroll", R) : (p(E.observe, E, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, "-tips-scroll"), i || (p(t.addEventListener, t, "scroll", R), this.attr(t, "-tips-scroll", "true"))));
      });
    }
  },
  mounted() {
    B(
      this.css,
      O(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size"
      )
    ), this.init(), X.delay = +this.delay, Vt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      p(t.removeEventListener, t, "scroll", R), p(t.removeAttribute, t, "-tips-scroll", void 0), e || p(E.unobserve, E, t);
    });
  }
}, Yt = ["static"], qt = { class: "tips-title" };
function Jt(t, e, i, r, n, l) {
  return i.visible ? (z(), M("div", U({
    key: 0,
    class: "tips",
    style: i.static ? null : n.css,
    static: i.static ? "" : null
  }, t.$attrs), [
    m(t.$slots, "title", {}, () => [
      P("div", qt, D(i.title), 1)
    ], !0),
    m(t.$slots, "content", {}, () => [
      dt(D(i.content), 1)
    ], !0)
  ], 16, Yt)) : ut("", !0);
}
const Kt = /* @__PURE__ */ j(Xt, [["render", Jt], ["__scopeId", "data-v-b1c3381c"]]), Qt = [Ht, Ot, Ft, Kt], se = {
  install(t) {
    Qt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Ot as Card,
  Ht as Flyweight,
  Ft as Stream,
  Kt as Tips,
  se as default
};
