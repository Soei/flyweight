import { runer as $, each as R, isEmpty as ot, picker as B, isSimplyType as J, merge as C, isString as zt, isArray as ht } from "@soei/util";
import { openBlock as k, createElementBlock as E, normalizeStyle as O, renderSlot as d, createElementVNode as L, createTextVNode as at, toDisplayString as V, normalizeProps as Nt, guardReactiveProps as kt, normalizeClass as ut, Fragment as ct, renderList as dt, mergeProps as I, createCommentVNode as ft, createBlock as Lt, resolveDynamicComponent as Et, withCtx as Ht } from "vue";
import { runer as y, isNil as Mt, each as K } from "@soei/tools";
import Rt from "@soei/picker";
let Bt = /(\d+|[+\-\*/]|%)/g, Q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, Z = (t, e) => {
  let i;
  if (i = $("match", t, Bt)) {
    let r = i.length, l, s = 0, n, o = [];
    for (; r--; )
      s = i.shift(), s in Q ? (l && o.push(l), s === "%" && (o.length = 2), n = s) : +s && o.push(+s), o.length == 2 && (o.push(e), l = Q[n].apply(null, o), o.length = 0);
    +l || (l = +o.pop()), t = l >> 0;
  }
  return t;
}, tt = {}, S = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  tt[e] || (tt[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const j = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, l] of e)
    i[r] = l;
  return i;
};
function G(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let pt = {
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
}, Ct = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], gt = {};
R(
  Ct,
  (t, e, i) => {
    t = G(e), gt["--" + G(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  pt
);
const Pt = {
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
    },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return $("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: pt,
  methods: {
    exec: S,
    isEmpty: ot,
    picker: B,
    runer: $,
    isSimplyType: J,
    tr() {
      let t = {};
      return this.margin(this.offset), R(gt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: G,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = S(r));
    },
    change(t) {
      J(t) || (this.closecss = B(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      C(
        this,
        B(
          zt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, Wt = {
  class: "card-title",
  space: ""
}, At = {
  class: "card-ico-items",
  flex: "",
  vcenter: ""
}, Ot = ["title"], It = { class: "card-content" };
function jt(t, e, i, r, l, s) {
  return k(), E("div", {
    class: "card",
    key: l.trigger,
    style: O(s.isEmpty(s.style) ? s.tr() : s.style)
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        L("div", Wt, [
          at(V(s.sub) + " ", 1),
          d(t.$slots, "icons", {}, () => [
            L("div", At, [
              d(t.$slots, "icon", Nt(kt({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              L("div", {
                class: ut(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: O(l.closecss),
                onClick: e[0] || (e[0] = (n) => t.$emit("close")),
                title: s.tips
              }, null, 14, Ot)
            ])
          ], !0)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        L("div", It, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const yt = /* @__PURE__ */ j(Pt, [["render", jt], ["__scopeId", "data-v-7fa6225c"]]);
let et = (t) => t == null || t == null, Ft = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Dt = {
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
      return C(r, {
        "--width": S(this.realW),
        "--height": S(this.realH),
        "--flyweight-content": S(i)
      }, e && {
        "--flyweight-h": S(e)
      }, t && r, {
        "--flyweight-w": S(t)
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
      Ft(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: S,
    trigger(t, e) {
      ht(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        R(t, (i, r) => {
          this.$emit(r[0], et(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      $([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || R(this.flys, (r, l, s, n) => {
          if (l[s] == n)
            return r;
        }, e.picker, e.id);
        et(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      $([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * r, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        $(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = $(this.direction, t.target), r = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      C(r, this.space), t.from || e.push(["onscroll", r]);
      let l = !1;
      R(
        this.flyweights,
        (s, n, o, h, c, u, f, p, a) => {
          if (o = s / c >> 0, p = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < u % h) + (u / h >> 0)), a = p * c + s % c, a >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = p, n.i = a, n.data = this.flys[a];
          let T = [
            /* top */
            p * this.expand + n.x,
            /* left */
            n.space
          ];
          f && T.reverse(), n.top = T[0], n.left = T[1];
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
      let i = this.scrollx, r = this.flyweight, l = B(r, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [n, o] = this.offset, h = l.width, c = l.height, u = (Z(this.width, h) || h) + n, f = Z(this.height, c) + o, p = [h / u >> 0 || 1, c / f >> 0 || 1];
        i && p.reverse();
        let [a, T] = p, w = this.padding, b, H = 0, m, z;
        i ? (m = u, u -= n, z = (_) => (
          /* 计算top偏移量 */
          _ * (f - o) + (_ + 1) * o
        )) : (s ? (u = (h - n * (a + 2 * w - 1)) / a, b = !w * n, H = w * n) : (b = 0, H = (h % u + n * a) / (a + 1) >> 0, u -= n), z = (_) => _ * (u + b) + (_ + 1) * H, m = f), this.row = T + 2, this.column = a, this.realH = f - o, this.realW = u, this.expand = m, this.Size = Math.ceil(t / a) * m;
        let N = Math.min(t, a * this.row), g = N - 1, v;
        for (; N-- > 0; )
          v = g - N, this.$set(e, v, {
            x: n,
            y: o,
            width: u,
            height: f - o,
            space: z(v % a),
            data: {}
          });
        e.length = g + 1;
        let x = [];
        c / m > g / a && x.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), x.push(["update:space", {
          row: (g / a >> 0) + 1,
          column: a,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(x);
      });
    }
  }
}, Vt = { class: "flyweight-all" };
function Gt(t, e, i, r, l, s) {
  return k(), E("div", {
    ref: "flyweight",
    class: ut(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: O(s.style),
    onScroll: e[0] || (e[0] = (...n) => s.scroll && s.scroll(...n))
  }, [
    L("div", Vt, [
      (k(!0), E(ct, null, dt(l.flyweights, (n, o) => (k(), E("div", {
        key: o,
        style: O({
          top: n.top + "px",
          left: n.left + "px"
        })
      }, [
        d(t.$slots, "default", I({ ref_for: !0 }, n), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? d(t.$slots, "end", { key: 0 }, void 0, !0) : ft("", !0)
  ], 38);
}
const mt = /* @__PURE__ */ j(Dt, [["render", Gt], ["__scopeId", "data-v-35b94e9b"]]), qt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return ot(i) ? [] : ht(i) ? i : [i];
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
    this.$.vnode.ref && C(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Ut(t, e, i, r, l, s) {
  return k(), Lt(Et(i.type), I({ ref: "component" }, t.$attrs), {
    default: Ht(() => [
      (k(!0), E(ct, null, dt(s.column, (n) => d(t.$slots, s.__trigger(n), I({
        key: n.type
      }, { ref_for: !0 }, n))), 128))
    ]),
    _: 3
  }, 16);
}
const _t = /* @__PURE__ */ j(qt, [["render", Ut]]), it = /(?:\,|\|{2})/, st = "px", rt = "";
let wt = document.documentElement, nt, lt = ["s-left", "s-top", "s-right", "s-bottom"], Xt = { left: 0, top: 1, right: 2, bottom: 3 };
const q = [];
var Yt = Rt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let U = {}, bt = null;
Yt(U, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    bt = Jt(() => {
      y(q);
    }, t), this._delay = t;
  }
});
U.delay = 60;
function Jt(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, y(t, this, arguments));
  };
}
const A = () => {
  bt();
};
function Kt(t) {
  q.push(t);
}
const M = new ResizeObserver(A);
M.observe(wt);
function vt(t) {
  t.onresize || (q.push([vt, null, t]), t.onresize = !0);
  var e = wt, i = Mt(t.offset) ? 15 : t.offset, r = t.target, l = t.room, s = t.index, n = t.position, o = t.edge || 15, h = r.getBoundingClientRect(), c = l.offsetHeight + i, u = l.offsetWidth + i, f = "3,0,2,1".split(it), p, a = h.left, T = h.top, w = Math.max(T, 0), b = (h.height == nt ? h.bottom - h.top : h.height) >> 0, H = (h.width == nt ? h.right - a : h.width) >> 0, m = e.clientWidth - u, z = e.clientHeight - c, N = [
    /* left: 0 */
    a - u,
    /* top: 1 */
    h.top - c,
    /* right: 2 */
    m - h.right,
    /* bottom: 3 */
    z - h.bottom
  ];
  n && (K(
    n.split(it),
    function(P, W, F, Tt) {
      Tt.push(F[W]);
    },
    Xt,
    p = []
  ), f.unshift.apply(f, p)), s = K(
    f,
    function(P, W, F) {
      if (F[W] > 0)
        return W;
    },
    N
  );
  let g = t.css;
  var v = 0, x = 0, _ = 0, X = 0;
  if (s != null) {
    var $t = s == 0 || s == 2;
    s == 3 || s == 1 ? (v = Math.min(
      a,
      m,
      a - (u - H) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), _ = Math.max(a - v + i, 5), x = s == 3 ? w + b : N[1]) : (v = s == 2 ? h.right + i : N[0], x = Math.min(
      w,
      z,
      w - (c - b) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), X = b > c ? c / 4 - 1 : Math.max(w - x + b / 4, 4)), g.left = Math.min(v, m) + st, g.top = Math.min(x, z) + st;
    let P = g["--tips-arrow-top"] = X || rt;
    g["--tips-arrow-left"] = _ || rt, g["--tips-arrow"] = _ > u - o || $t && (P + (c > 50 ? o : 0) > c || !P) ? "hidden" : "visible";
  }
  let Y = l.classList;
  Y.remove(...lt), Y.add(lt[s]), t.index = s;
}
const D = "data-tips-scroll", Qt = {
  name: "Tips",
  props: {
    /* 目标对象 */
    target: {
      type: [HTMLElement]
    },
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
      css: {
        opacity: 0
      }
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), y(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return y(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && (vt({
        onresize: !1,
        /* 监控的目标 */
        target: t.parentNode,
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      }), this.css.opacity = 1);
    },
    __2listener() {
      this.static || this.__parent((t, e, i) => {
        e ? y(t.addEventListener, t, "scroll", A) : (y(M.observe, M, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, D), i || (y(t.addEventListener, t, "scroll", A), this.__attr(t, D, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = B(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), C(t, e), t;
    },
    __2next() {
      this.target || (this.init(), U.delay = +this.delay, Kt((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      y(t.removeEventListener, t, "scroll", A), y(t.removeAttribute, t, D, void 0), e || y(M.unobserve, M, t);
    });
  }
}, Zt = ["static"], te = { class: "tips-title" };
function ee(t, e, i, r, l, s) {
  return i.visible ? (k(), E("div", I({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : l.css,
    static: i.static ? "" : null
  }), [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        L("div", te, V(i.title), 1)
      ], !0),
      d(t.$slots, "content", {}, () => [
        at(V(i.content), 1)
      ], !0)
    ], !0)
  ], 16, Zt)) : ft("", !0);
}
const xt = /* @__PURE__ */ j(Qt, [["render", ee], ["__scopeId", "data-v-713e0018"]]), ie = {}, St = [];
St.push(yt, mt, _t, xt);
const oe = { Card: yt, Flyweight: mt, Stream: _t, Tips: xt };
ie.install = function(t, e = {}) {
  St.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  yt as Card,
  mt as Flyweight,
  _t as Stream,
  xt as Tips,
  oe as components,
  ie as default
};
