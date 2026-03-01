import { runer as v, each as H, isEmpty as at, picker as C, isSimplyType as Q, merge as L, isString as zt, isArray as ut } from "@soei/util";
import { openBlock as T, createElementBlock as O, normalizeStyle as A, renderSlot as d, createElementVNode as M, createTextVNode as ct, toDisplayString as G, normalizeProps as Tt, guardReactiveProps as Nt, normalizeClass as dt, Fragment as ft, renderList as pt, mergeProps as B, createCommentVNode as gt, createBlock as kt, resolveDynamicComponent as Mt, withCtx as Ot } from "vue";
import { runer as g, isNil as Pt, each as Z } from "@soei/tools";
import jt from "@soei/picker";
let Et = /(\d+|[+\-\*/]|%)/g, tt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, et = (t, e) => {
  let i;
  if (i = v("match", t, Et)) {
    let r = i.length, l, n = 0, s, h = [];
    for (; r--; )
      n = i.shift(), n in tt ? (l && h.push(l), n === "%" && (h.length = 2), s = n) : +n && h.push(+n), h.length == 2 && (h.push(e), l = tt[s].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, it = {}, w = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  it[e] || (it[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const F = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, l] of e)
    i[r] = l;
  return i;
};
function V(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let _t = {
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
}, Ht = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], yt = {};
H(
  Ht,
  (t, e, i) => {
    t = V(e), yt["--" + V(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  _t
);
const Ct = {
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
  watch: _t,
  methods: {
    exec: w,
    isEmpty: at,
    picker: C,
    runer: v,
    isSimplyType: Q,
    tr() {
      let t = {};
      return this.margin(this.offset), H(yt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: V,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = w(r));
    },
    change(t) {
      Q(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      L(
        this,
        C(
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
}, Lt = {
  class: "card-title",
  space: ""
}, Rt = {
  class: "card-ico-items",
  flex: "",
  vcenter: ""
}, Wt = ["title"], At = { class: "card-content" };
function Bt(t, e, i, r, l, n) {
  return T(), O("div", {
    class: "card",
    key: l.trigger,
    style: A(n.isEmpty(n.style) ? n.tr() : n.style)
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        M("div", Lt, [
          ct(G(n.sub) + " ", 1),
          d(t.$slots, "icons", {}, () => [
            M("div", Rt, [
              d(t.$slots, "icon", Tt(Nt({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              M("div", {
                class: dt(["card-close", { hide: n.isSimplyType(i.close) ? !i.close : !1 }]),
                style: A(l.closecss),
                onClick: e[0] || (e[0] = (s) => t.$emit("close")),
                title: n.tips
              }, null, 14, Wt)
            ])
          ], !0)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        M("div", At, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const Ft = /* @__PURE__ */ F(Ct, [["render", Bt], ["__scopeId", "data-v-7fa6225c"]]), It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ft
}, Symbol.toStringTag, { value: "Module" }));
let st = (t) => t == null || t == null, Dt = (...t) => {
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
    }
  },
  computed: {
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, r = {};
      return L(r, {
        "--width": w(this.realW),
        "--height": w(this.realH),
        "--flyweight-content": w(i)
      }, e && {
        "--flyweight-h": w(e)
      }, t && r, {
        "--flyweight-w": w(t)
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
      Dt(t);
    }
    this.scrollx = v("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(t, e) {
      ut(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        H(t, (i, r) => {
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
        let i = e.index || H(this.flys, (r, l, n, s) => {
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
      L(r, this.space), t.from || e.push(["onscroll", r]);
      let l = !1;
      H(
        this.flyweights,
        (n, s, h, o, u, c, f, p, a) => {
          if (h = n / u >> 0, p = h + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < c % o) + (c / o >> 0)), a = p * u + n % u, a >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          s.index = p, s.i = a, s.data = this.flys[a];
          let S = [
            /* top */
            p * this.expand + s.x,
            /* left */
            s.space
          ];
          f && S.reverse(), s.top = S[0], s.left = S[1];
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
      let i = this.scrollx, r = this.flyweight, l = C(r, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [s, h] = this.offset, o = l.width, u = l.height, c = (et(this.width, o) || o) + s, f = et(this.height, u) + h, p = [o / c >> 0 || 1, u / f >> 0 || 1];
        i && p.reverse();
        let [a, S] = p, x = this.padding, P, $ = 0, _, m;
        i ? (_ = c, c -= s, m = (z) => (
          /* 计算top偏移量 */
          z * (f - h) + (z + 1) * h
        )) : (n ? (c = (o - s * (a + 2 * x - 1)) / a, P = !x * s, $ = x * s) : (P = 0, $ = (o % c + s * a) / (a + 1) >> 0, c -= s), m = (z) => z * (c + P) + (z + 1) * $, _ = f), this.row = S + 2, this.column = a, this.realH = f - h, this.realW = c, this.expand = _, this.Size = Math.ceil(t / a) * _;
        let b = Math.min(t, a * this.row), y = b - 1, N;
        for (; b-- > 0; )
          N = y - b, this.$set(e, N, {
            x: s,
            y: h,
            width: c,
            height: f - h,
            space: m(N % a),
            data: {}
          });
        e.length = y + 1;
        let k = [];
        u / _ > y / a && k.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), k.push(["update:space", {
          row: (y / a >> 0) + 1,
          column: a,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(k);
      });
    }
  }
}, Vt = { class: "flyweight-all" };
function qt(t, e, i, r, l, n) {
  return T(), O("div", {
    ref: "flyweight",
    class: dt(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: A(n.style),
    onScroll: e[0] || (e[0] = (...s) => n.scroll && n.scroll(...s))
  }, [
    M("div", Vt, [
      (T(!0), O(ft, null, pt(l.flyweights, (s, h) => (T(), O("div", {
        key: h,
        style: A({
          top: s.top + "px",
          left: s.left + "px"
        })
      }, [
        d(t.$slots, "default", B({ ref_for: !0 }, s), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? d(t.$slots, "end", { key: 0 }, void 0, !0) : gt("", !0)
  ], 38);
}
const Ut = /* @__PURE__ */ F(Gt, [["render", qt], ["__scopeId", "data-v-35b94e9b"]]), Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ut
}, Symbol.toStringTag, { value: "Module" })), Yt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return at(i) ? [] : ut(i) ? i : [i];
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
    this.$.vnode.ref && L(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Jt(t, e, i, r, l, n) {
  return T(), kt(Mt(i.type), B({ ref: "component" }, t.$attrs), {
    default: Ot(() => [
      (T(!0), O(ft, null, pt(n.column, (s) => d(t.$slots, n.__trigger(s), B({
        key: s.type
      }, { ref_for: !0 }, s))), 128))
    ]),
    _: 3
  }, 16);
}
const Kt = /* @__PURE__ */ F(Yt, [["render", Jt]]), Qt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kt
}, Symbol.toStringTag, { value: "Module" })), rt = /(?:\,|\|{2})/, nt = "px", lt = "";
let mt = document.documentElement, ot, ht = ["s-left", "s-top", "s-right", "s-bottom"], Zt = { left: 0, top: 1, right: 2, bottom: 3 };
const q = [];
var te = jt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let U = {}, bt = null;
te(U, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    bt = ee(() => {
      g(q);
    }, t), this._delay = t;
  }
});
U.delay = 60;
function ee(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, g(t, this, arguments));
  };
}
const W = () => {
  bt();
};
function ie(t) {
  q.push(t);
}
const E = new ResizeObserver(W);
E.observe(mt);
function wt(t) {
  t.onresize || (q.push([wt, null, t]), t.onresize = !0);
  var e = mt, i = e.clientHeight, r = Pt(t.offset) ? 15 : t.offset, l = t.target, n = t.room, s = t.index, h = t.position, o = l.getBoundingClientRect(), u = n.offsetHeight + r, c = n.offsetWidth + r, f = "3,0,2,1".split(rt), p, a = (o.height == ot ? o.bottom - o.top : o.height) >> 0, S = (o.width == ot ? o.right - o.left : o.width) >> 0, x = e.clientWidth - c, P = i - u, $ = [
    /* left: 0 */
    o.left - c,
    /* top: 1 */
    o.top - u,
    /* right: 2 */
    x - o.right,
    /* bottom: 3 */
    P - o.bottom
  ];
  h && (Z(
    h.split(rt),
    function(xt, R, I, $t) {
      $t.push(I[R]);
    },
    Zt,
    p = []
  ), f.unshift.apply(f, p)), s = Z(
    f,
    function(xt, R, I) {
      if (I[R] > 0)
        return R;
    },
    $
  );
  var _ = 0, m = 0, b = 0;
  if (s != null) {
    var y = s == 0 || s == 2, N = s == 3 || s == 1;
    _ = N ? Math.min(o.left, x) : s == 2 ? o.right + r : $[0], u -= r * +y;
    var k = Math.max(o.top, 0), z = Math.min(
      o.bottom,
      i
    ), X = (z - u + Math.min(i - u, k)) / 2;
    m = Math.max(
      y ? X : s == 3 ? o.top + a + r : Math.min(X, $[1]),
      0
    ), N && o.left > x && (b = o.left - _ - r + S / 2);
  }
  let Y = n.classList, j = t.css;
  Y.remove(...ht), Y.add(ht[s]), t.index = s, j.left = _ + nt, j.top = m + nt;
  let J = j["--tips-arrow-top"] = y ? Math.min(
    /* 底边距 */
    Math.max(m, k) - m,
    u - r
  ) : lt, K = c - 3 * r;
  j["--tips-arrow"] = b > K - 10 || y && (J + (u > 50 ? 15 : 0) > u || !J) ? "hidden" : "visible", j["--tips-arrow-left"] = b ? Math.min(b, K) : lt;
}
const D = "data-tips-scroll", se = {
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
      t.nodeName != "#comment" && wt({
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
        e ? g(t.addEventListener, t, "scroll", W) : (g(E.observe, E, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, D), i || (g(t.addEventListener, t, "scroll", W), this.__attr(t, D, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = C(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), L(t, e), t;
    },
    __2next() {
      this.target || (this.init(), U.delay = +this.delay, ie((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", W), g(t.removeAttribute, t, D, void 0), e || g(E.unobserve, E, t);
    });
  }
}, re = ["static"], ne = { class: "tips-title" };
function le(t, e, i, r, l, n) {
  return i.visible ? (T(), O("div", B({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : l.css,
    static: i.static ? "" : null
  }), [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        M("div", ne, G(i.title), 1)
      ], !0),
      d(t.$slots, "content", {}, () => [
        ct(G(i.content), 1)
      ], !0)
    ], !0)
  ], 16, re)) : gt("", !0);
}
const oe = /* @__PURE__ */ F(se, [["render", le], ["__scopeId", "data-v-9b313627"]]), he = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oe
}, Symbol.toStringTag, { value: "Module" })), ae = /* @__PURE__ */ Object.assign({ "./components/Card.vue": It, "./components/Flyweight.vue": Xt, "./components/Stream.vue": Qt, "./components/Tips.vue": he }), vt = [], St = {};
for (const [t, e] of Object.entries(ae)) {
  const i = t.split("/").pop().replace(/\.vue$/, "");
  St[i] = e.default, vt.push(e.default);
}
St.install = function(t, e = {}) {
  vt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  St as components,
  St as default
};
