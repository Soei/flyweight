import { runer as $, each as M, isEmpty as dt, picker as R, isSimplyType as Z, merge as B, isString as kt, isArray as ut } from "@soei/util";
import { openBlock as k, createElementBlock as L, normalizeStyle as I, renderSlot as u, createElementVNode as H, createTextVNode as X, toDisplayString as G, normalizeProps as O, guardReactiveProps as q, normalizeClass as ct, resolveComponent as Ht, Fragment as ft, renderList as pt, mergeProps as W, createVNode as Lt, withCtx as gt, createBlock as Ct, resolveDynamicComponent as Et, createCommentVNode as Mt } from "vue";
import { runer as y, isNil as Rt, each as tt } from "@soei/tools";
import Bt from "@soei/picker";
let Wt = /(\d+|[+\-\*/]|%)/g, et = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, it = (t, e) => {
  let i;
  if (i = $("match", t, Wt)) {
    let r = i.length, n, s = 0, l, o = [];
    for (; r--; )
      s = i.shift(), s in et ? (n && o.push(n), s === "%" && (o.length = 2), l = s) : +s && o.push(+s), o.length == 2 && (o.push(e), n = et[l].apply(null, o), o.length = 0);
    +n || (n = +o.pop()), t = n >> 0;
  }
  return t;
}, st = {}, S = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  st[e] || (st[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const F = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, n] of e)
    i[r] = n;
  return i;
};
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
}, Pt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], mt = {};
M(
  Pt,
  (t, e, i) => {
    t = U(e), mt["--" + U(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  yt
);
const At = {
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
      type: [String, Number],
      default: "100%"
    },
    width: {
      type: [String, Number],
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
  watch: yt,
  methods: {
    exec: S,
    isEmpty: dt,
    picker: R,
    runer: $,
    isSimplyType: Z,
    tr() {
      let t = {};
      return this.margin(this.offset), M(mt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: U,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = S(r));
    },
    change(t) {
      Z(t) || (this.closecss = R(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      B(
        this,
        R(
          kt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, Ot = {
  class: "card-title",
  space: ""
}, jt = {
  class: "card-ico-items",
  vcenter: ""
}, It = ["title"], Ft = { class: "card-content" };
function Dt(t, e, i, r, n, s) {
  return k(), L("div", {
    class: "card",
    key: n.trigger,
    style: I(s.isEmpty(s.style) ? s.tr() : s.style)
  }, [
    u(t.$slots, "default", {}, () => [
      u(t.$slots, "title", {}, () => [
        H("div", Ot, [
          u(t.$slots, "subtitle", {}, () => [
            X(G(s.sub), 1)
          ], !0),
          u(t.$slots, "icons", {}, () => [
            H("div", jt, [
              u(t.$slots, "icon", O(q({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              H("div", {
                class: ct(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: I(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: s.tips
              }, null, 14, It)
            ])
          ], !0)
        ])
      ], !0),
      u(t.$slots, "content", {}, () => [
        H("div", Ft, [
          u(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const _t = /* @__PURE__ */ F(At, [["render", Dt], ["__scopeId", "data-v-1b917e35"]]);
let rt = (t) => t == null || t == null, Vt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Gt = {
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
    },
    line: {
      type: Boolean,
      default: !0
    },
    mix: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bridge() {
      return {
        /* 滚动方向 */
        scroll: this.scrollx ? "left" : "top",
        /* 数据量 */
        length: this.flys.length,
        // actice,
        column: this.column,
        expand: this.expand,
        width: this.realW,
        height: this.realH,
        /* 容器宽度或者高度 */
        content: this.Size,
        /* 当前顶部 */
        index: this.__index,
        row: this.row,
        /* 是否滚动到底部 */
        end: this.end
      };
    },
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, r = {};
      return B(
        r,
        {
          "--width": S(this.realW),
          "--height": S(this.realH),
          "--flyweight-content": S(i)
        },
        e && {
          "--flyweight-h": S(e)
        },
        t && {
          "--flyweight-w": S(t)
        },
        "mix"
      ), r;
    }
  },
  data() {
    return {
      flyweights: [],
      //   actice: false,
      Size: 0,
      column: 1,
      row: 1,
      expand: 10,
      count: 0,
      task: [],
      realW: 0,
      realH: 0,
      end: !1,
      __top: 0,
      __index: 0,
      scrollx: ""
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
      Vt(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: S,
    trigger(t, e) {
      ut(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        M(t, (i, r) => {
          this.$emit(r[0], rt(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      $(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || M(
              this.flys,
              (r, n, s, l) => {
                if (n[s] == l)
                  return r;
              },
              e.picker,
              e.id
            );
            rt(i) || this.setindex(i);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      $(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let i = e / this.column >> 0, r = this.expand, n = this.flyweight[this.direction] / r >> 0;
              i > n && i < n + this.row - 2 || (this.flyweight[this.direction] = i * r - r / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
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
      B(r, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", r]));
      let n = !1;
      this.end = !1, this.__index = r.index, M(
        this.flyweights,
        (s, l, o, h, c, d, f, p, a) => {
          if (o = s / c >> 0, p = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), a = p * c + s % c, a >= this.count) {
            n || (this.end = !0, e.push(["onend"]), n = !0);
            return;
          }
          l.index = p, l.i = a, l.data = this.flys[a];
          let N = [
            /* top */
            p * this.expand + l.x,
            /* left */
            l.space
          ];
          f && N.reverse(), l.top = N[0], l.left = N[1];
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
      let i = this.scrollx, r = this.flyweight, n = R(r, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [l, o] = this.offset, h = n.width, c = n.height, d = (it(this.width, h) || h) + l, f = it(this.height, c) + o, p = [h / d >> 0 || 1, c / f >> 0 || 1];
        i && p.reverse();
        let [a, N] = p, w = this.padding, b, C = 0, m, T;
        i ? (m = d, d -= l, T = (_) => (
          /* 计算top偏移量 */
          _ * (f - o) + (_ + 1) * o
        )) : (s ? (d = (h - l * (a + 2 * w - 1)) / a, b = !w * l, C = w * l) : (b = 0, C = h < d ? 0 : (h % d + l * a) / (a + 1) >> 0, d -= l), T = (_) => _ * (d + b) + (_ + 1) * C, m = f), this.row = N + 2, this.column = a, this.realH = f - o, this.realW = d, this.expand = m, this.Size = Math.ceil(t / a) * m;
        let z = Math.min(t, a * this.row), g = z - 1, x;
        for (; z-- > 0; )
          x = g - z, this.$set(e, x, {
            x: l,
            y: o,
            width: d,
            height: f - o,
            space: T(x % a),
            data: {}
          });
        e.length = g + 1;
        let v = [];
        c / m > g / a && v.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), v.push([
          "update:space",
          {
            row: (g / a >> 0) + 1,
            column: a,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(v);
      });
    }
  }
}, qt = { class: "flyweight-all" };
function Ut(t, e, i, r, n, s) {
  const l = Ht("Card");
  return k(), L("div", {
    ref: "flyweight",
    class: ct(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: i.line && n.__top !== 0
    }]),
    style: I(s.style),
    onScroll: e[0] || (e[0] = (...o) => s.scroll && s.scroll(...o))
  }, [
    u(t.$slots, "title", O(q(s.bridge)), void 0, !0),
    H("div", qt, [
      (k(!0), L(ft, null, pt(n.flyweights, (o, h) => (k(), L("div", {
        key: h,
        style: I({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        u(t.$slots, "default", W({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    u(t.$slots, "mix", O(q(s.bridge)), () => [
      n.flyweights.length ? u(t.$slots, "end", O(W({ key: 0 }, s.bridge)), void 0, !0) : u(t.$slots, "empty", { key: 1 }, () => [
        Lt(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: gt(() => [...e[1] || (e[1] = [
            X(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const wt = /* @__PURE__ */ F(Gt, [["render", Ut], ["__scopeId", "data-v-0e5d0d75"]]), Xt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return dt(i) ? [] : ut(i) ? i : [i];
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
function Yt(t, e, i, r, n, s) {
  return k(), Ct(Et(i.type), W({ ref: "component" }, t.$attrs), {
    default: gt(() => [
      (k(!0), L(ft, null, pt(s.column, (l) => u(t.$slots, s.__trigger(l), W({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const bt = /* @__PURE__ */ F(Xt, [["render", Yt]]), nt = /(?:\,|\|{2})/, lt = "px", ot = "";
let xt = document.documentElement, ht, at = ["s-left", "s-top", "s-right", "s-bottom"], Jt = { left: 0, top: 1, right: 2, bottom: 3 };
const Y = [];
var Kt = Bt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let J = {}, vt = null;
Kt(J, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    vt = Qt(() => {
      y(Y);
    }, t), this._delay = t;
  }
});
J.delay = 60;
function Qt(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, y(t, this, arguments));
  };
}
const j = () => {
  vt();
};
function Zt(t) {
  Y.push(t);
}
const E = new ResizeObserver(j);
E.observe(xt);
function St(t) {
  t.onresize || (Y.push([St, null, t]), t.onresize = !0);
  var e = xt, i = Rt(t.offset) ? 15 : t.offset, r = t.target, n = t.room, s = t.index, l = t.position, o = t.edge || 15, h = r.getBoundingClientRect(), c = n.offsetHeight + i, d = n.offsetWidth + i, f = "3,0,2,1".split(nt), p, a = h.left, N = h.top, w = Math.max(N, 0), b = (h.height == ht ? h.bottom - h.top : h.height) >> 0, C = (h.width == ht ? h.right - a : h.width) >> 0, m = e.clientWidth - d, T = e.clientHeight - c, z = [
    /* left: 0 */
    a - d,
    /* top: 1 */
    h.top - c,
    /* right: 2 */
    m - h.right,
    /* bottom: 3 */
    T - h.bottom
  ];
  l && (tt(
    l.split(nt),
    function(P, A, D, zt) {
      zt.push(D[A]);
    },
    Jt,
    p = []
  ), f.unshift.apply(f, p)), s = tt(
    f,
    function(P, A, D) {
      if (D[A] > 0)
        return A;
    },
    z
  );
  let g = t.css;
  var x = 0, v = 0, _ = 0, K = 0;
  if (s != null) {
    var Tt = s == 0 || s == 2;
    s == 3 || s == 1 ? (x = Math.min(
      a,
      m,
      a - (d - C) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), _ = Math.max(a - x + i, 5), v = s == 3 ? w + b : z[1]) : (x = s == 2 ? h.right + i : z[0], v = Math.min(
      w,
      T,
      w - (c - b) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), K = b > c ? c / 4 - 1 : Math.max(w - v + b / 4, 4)), g.left = Math.min(x, m) + lt, g.top = Math.min(v, T) + lt;
    let P = g["--tips-arrow-top"] = K || ot;
    g["--tips-arrow-left"] = _ || ot, g["--tips-arrow"] = _ > d - o || Tt && (P + (c > 50 ? o : 0) > c || !P) ? "hidden" : "visible";
  }
  let Q = n.classList;
  Q.remove(...at), Q.add(at[s]), t.index = s;
}
const V = "data-tips-scroll", te = {
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
      t.nodeName != "#comment" && (St({
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
        e ? y(t.addEventListener, t, "scroll", j) : (y(E.observe, E, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, V), i || (y(t.addEventListener, t, "scroll", j), this.__attr(t, V, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = R(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), B(t, e), t;
    },
    __2next() {
      this.target || (this.init(), J.delay = +this.delay, Zt((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      y(t.removeEventListener, t, "scroll", j), y(t.removeAttribute, t, V, void 0), e || y(E.unobserve, E, t);
    });
  }
}, ee = ["static"], ie = { class: "tips-title" };
function se(t, e, i, r, n, s) {
  return i.visible ? (k(), L("div", W({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : n.css,
    static: i.static ? "" : null
  }), [
    u(t.$slots, "default", {}, () => [
      u(t.$slots, "title", {}, () => [
        H("div", ie, G(i.title), 1)
      ], !0),
      u(t.$slots, "content", {}, () => [
        X(G(i.content), 1)
      ], !0)
    ], !0)
  ], 16, ee)) : Mt("", !0);
}
const $t = /* @__PURE__ */ F(te, [["render", se], ["__scopeId", "data-v-713e0018"]]), re = {}, Nt = [];
Nt.push(_t, wt, bt, $t);
const ae = { Card: _t, Flyweight: wt, Stream: bt, Tips: $t };
re.install = function(t, e = {}) {
  Nt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  _t as Card,
  wt as Flyweight,
  bt as Stream,
  $t as Tips,
  ae as components,
  re as default
};
