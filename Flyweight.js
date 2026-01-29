import { runer as v, merge as W, isArray as at, each as P, picker as R, isEmpty as ut, isSimplyType as Q, isString as St } from "@soei/util";
import { openBlock as N, createElementBlock as E, normalizeClass as ct, normalizeStyle as O, createElementVNode as M, Fragment as dt, renderList as ft, renderSlot as d, mergeProps as I, createCommentVNode as pt, createTextVNode as gt, toDisplayString as G, normalizeProps as $t, guardReactiveProps as zt, createBlock as Nt, resolveDynamicComponent as kt, withCtx as Tt } from "vue";
import { runer as g, isNil as Mt, each as Z } from "@soei/tools";
import Et from "@soei/picker";
let Ht = /(\d+|[+\-\*/]|%)/g, tt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, et = (t, e) => {
  let i;
  if (i = v("match", t, Ht)) {
    let r = i.length, l, n = 0, s, h = [];
    for (; r--; )
      n = i.shift(), n in tt ? (l && h.push(l), n === "%" && (h.length = 2), s = n) : +n && h.push(+n), h.length == 2 && (h.push(e), l = tt[s].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
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
  for (const [r, l] of e)
    i[r] = l;
  return i;
};
let st = (t) => t == null || t == null, Ct = (...t) => {
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
      return W(r, {
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
      Ct(t);
    }
    this.scrollx = v("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: b,
    trigger(t, e) {
      at(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        P(t, (i, r) => {
          this.$emit(r[0], st(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      v([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || P(this.flys, (r, l, n, s) => {
          if (l[n] == s)
            return r;
        }, e.picker, e.id);
        st(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      v([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * r, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        v(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = v(this.direction, t.target), r = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      W(r, this.space), t.from || e.push(["onscroll", r]);
      let l = !1;
      P(
        this.flyweights,
        (n, s, h, o, u, c, f, p, a) => {
          if (h = n / u >> 0, p = h + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < c % o) + (c / o >> 0)), a = p * u + n % u, a >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          s.index = p, s.i = a, s.data = this.flys[a];
          let x = [
            /* top */
            p * this.expand + s.x,
            /* left */
            s.space
          ];
          f && x.reverse(), s.top = x[0], s.left = x[1];
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
      let i = this.scrollx, r = this.flyweight, l = R(r, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [s, h] = this.offset, o = l.width, u = l.height, c = (et(this.width, o) || o) + s, f = et(this.height, u) + h, p = [o / c >> 0 || 1, u / f >> 0 || 1];
        i && p.reverse();
        let [a, x] = p, S = this.padding, H, $ = 0, y, _;
        i ? (y = c, c -= s, _ = (z) => (
          /* 计算top偏移量 */
          z * (f - h) + (z + 1) * h
        )) : (n ? (c = (o - s * (a + 2 * S - 1)) / a, H = !S * s, $ = S * s) : (H = 0, $ = (o % c + s * a) / (a + 1) >> 0, c -= s), _ = (z) => z * (c + H) + (z + 1) * $, y = f), this.row = x + 2, this.column = a, this.realH = f - h, this.realW = c, this.expand = y, this.Size = Math.ceil(t / a) * y;
        let w = Math.min(t, a * this.row), m = w - 1, k;
        for (; w-- > 0; )
          k = m - w, this.$set(e, k, {
            x: s,
            y: h,
            width: c,
            height: f - h,
            space: _(k % a),
            data: {}
          });
        e.length = m + 1;
        let T = [];
        u / y > m / a && T.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), T.push(["update:space", {
          row: (m / a >> 0) + 1,
          column: a,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(T);
      });
    }
  }
}, Pt = { class: "flyweight-all" };
function Rt(t, e, i, r, l, n) {
  return N(), E("div", {
    ref: "flyweight",
    class: ct(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: O(n.style),
    onScroll: e[0] || (e[0] = (...s) => n.scroll && n.scroll(...s))
  }, [
    M("div", Pt, [
      (N(!0), E(dt, null, ft(l.flyweights, (s, h) => (N(), E("div", {
        key: h,
        style: O({
          top: s.top + "px",
          left: s.left + "px"
        })
      }, [
        d(t.$slots, "default", I({ ref_for: !0 }, s), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? d(t.$slots, "end", { key: 0 }, void 0, !0) : pt("", !0)
  ], 38);
}
const Wt = /* @__PURE__ */ j(Lt, [["render", Rt], ["__scopeId", "data-v-35b94e9b"]]);
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
P(
  Bt,
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
      return v("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: yt,
  methods: {
    exec: b,
    isEmpty: ut,
    picker: R,
    runer: v,
    isSimplyType: Q,
    tr() {
      let t = {};
      return this.margin(this.offset), P(mt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: U,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = b(r));
    },
    change(t) {
      Q(t) || (this.closecss = R(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      W(
        this,
        R(
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
}, Ot = {
  class: "card-title",
  space: ""
}, It = {
  class: "card-ico-items",
  flex: "",
  vcenter: ""
}, jt = ["title"], Ft = { class: "card-content" };
function Dt(t, e, i, r, l, n) {
  return N(), E("div", {
    class: "card",
    key: l.trigger,
    style: O(n.isEmpty(n.style) ? n.tr() : n.style)
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        M("div", Ot, [
          gt(G(n.sub) + " ", 1),
          d(t.$slots, "icons", {}, () => [
            M("div", It, [
              d(t.$slots, "icon", $t(zt({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              M("div", {
                class: ct(["card-close", { hide: n.isSimplyType(i.close) ? !i.close : !1 }]),
                style: O(l.closecss),
                onClick: e[0] || (e[0] = (s) => t.$emit("close")),
                title: n.tips
              }, null, 14, jt)
            ])
          ], !0)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        M("div", Ft, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const Gt = /* @__PURE__ */ j(At, [["render", Dt], ["__scopeId", "data-v-7fa6225c"]]), Ut = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return ut(i) ? [] : at(i) ? i : [i];
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
    this.$.vnode.ref && W(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Vt(t, e, i, r, l, n) {
  return N(), Nt(kt(i.type), I({ ref: "component" }, t.$attrs), {
    default: Tt(() => [
      (N(!0), E(dt, null, ft(n.column, (s) => d(t.$slots, n.__trigger(s), I({
        key: s.type
      }, { ref_for: !0 }, s))), 128))
    ]),
    _: 3
  }, 16);
}
const qt = /* @__PURE__ */ j(Ut, [["render", Vt]]), rt = /(?:\,|\|{2})/, nt = "px", lt = "";
let _t = document.documentElement, ot, ht = ["s-left", "s-top", "s-right", "s-bottom"], Xt = { left: 0, top: 1, right: 2, bottom: 3 };
const V = [];
var Yt = Et(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let q = {}, wt = null;
Yt(q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    wt = Jt(() => {
      g(V);
    }, t), this._delay = t;
  }
});
q.delay = 60;
function Jt(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, g(t, this, arguments));
  };
}
const A = () => {
  wt();
};
function Kt(t) {
  V.push(t);
}
const L = new ResizeObserver(A);
L.observe(_t);
function bt(t) {
  t.onresize || (V.push([bt, null, t]), t.onresize = !0);
  var e = _t, i = e.clientHeight, r = Mt(t.offset) ? 15 : t.offset, l = t.target, n = t.room, s = t.index, h = t.position, o = l.getBoundingClientRect(), u = n.offsetHeight + r, c = n.offsetWidth + r, f = "3,0,2,1".split(rt), p, a = (o.height == ot ? o.bottom - o.top : o.height) >> 0, x = (o.width == ot ? o.right - o.left : o.width) >> 0, S = e.clientWidth - c, H = i - u, $ = [
    /* left: 0 */
    o.left - c,
    /* top: 1 */
    o.top - u,
    /* right: 2 */
    S - o.right,
    /* bottom: 3 */
    H - o.bottom
  ];
  h && (Z(
    h.split(rt),
    function(vt, B, F, xt) {
      xt.push(F[B]);
    },
    Xt,
    p = []
  ), f.unshift.apply(f, p)), s = Z(
    f,
    function(vt, B, F) {
      if (F[B] > 0)
        return B;
    },
    $
  );
  var y = 0, _ = 0, w = 0;
  if (s != null) {
    var m = s == 0 || s == 2, k = s == 3 || s == 1;
    y = k ? Math.min(o.left, S) : s == 2 ? o.right + r : $[0], u -= r * +m;
    var T = Math.max(o.top, 0), z = Math.min(
      o.bottom,
      i
    ), X = (z - u + Math.min(i - u, T)) / 2;
    _ = Math.max(
      m ? X : s == 3 ? o.top + a + r : Math.min(X, $[1]),
      0
    ), k && o.left > S && (w = o.left - y - r + x / 2);
  }
  let Y = n.classList, C = t.css;
  Y.remove(...ht), Y.add(ht[s]), t.index = s, C.left = y + nt, C.top = _ + nt;
  let J = C["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(_, T) - _,
    u - r
  ) : lt, K = c - 3 * r;
  C["--tips-arrow"] = w > K - 10 || m && (J + (u > 50 ? 15 : 0) > u || !J) ? "hidden" : "visible", C["--tips-arrow-left"] = w ? Math.min(w, K) : lt;
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
      css: {}
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), g(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return g(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && bt({
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
      });
    },
    __2listener() {
      this.static || this.__parent((t, e, i) => {
        e ? g(t.addEventListener, t, "scroll", A) : (g(L.observe, L, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, D), i || (g(t.addEventListener, t, "scroll", A), this.__attr(t, D, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = R(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), W(t, e), t;
    },
    __2next() {
      this.target || (this.init(), q.delay = +this.delay, Kt((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", A), g(t.removeAttribute, t, D, void 0), e || g(L.unobserve, L, t);
    });
  }
}, Zt = ["static"], te = { class: "tips-title" };
function ee(t, e, i, r, l, n) {
  return i.visible ? (N(), E("div", I({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : l.css,
    static: i.static ? "" : null
  }), [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        M("div", te, G(i.title), 1)
      ], !0),
      d(t.$slots, "content", {}, () => [
        gt(G(i.content), 1)
      ], !0)
    ], !0)
  ], 16, Zt)) : pt("", !0);
}
const ie = /* @__PURE__ */ j(Qt, [["render", ee], ["__scopeId", "data-v-45afe77c"]]), se = [Wt, Gt, qt, ie], he = {
  install(t) {
    se.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Gt as Card,
  Wt as Flyweight,
  qt as Stream,
  ie as Tips,
  he as default
};
