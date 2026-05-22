import { runer as g, each as k, merge as G, picker as C, isEmpty as jt, isSimplyType as St, isString as ne, isArray as tt, format as Ft, array2Json as le } from "@soei/util";
import { openBlock as b, createElementBlock as O, normalizeClass as ht, normalizeStyle as Q, renderSlot as a, createElementVNode as y, toDisplayString as T, normalizeProps as E, guardReactiveProps as M, resolveComponent as N, createBlock as j, mergeProps as $, withCtx as m, createTextVNode as B, createCommentVNode as pt, withModifiers as ut, createVNode as S, createSlots as Vt, renderList as et, Fragment as Dt, resolveDynamicComponent as oe } from "vue";
import { runer as p, each as dt, isNil as Z, isString as ae, isFunction as he } from "@soei/tools";
import ue from "@soei/picker";
let de = /(\d+|[+\-\*/]|%)/g, kt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Tt = (t, e) => {
  let s;
  if (s = g("match", t, de)) {
    let i = s.length, n, r = 0, l, o = [];
    for (; i--; )
      r = s.shift(), r in kt ? (n && o.push(n), r === "%" && (o.length = 2), l = r) : +r && o.push(+r), o.length == 2 && (o.push(e), n = kt[l].apply(null, o), o.length = 0);
    +n || (n = +o.pop()), t = n >> 0;
  }
  return t;
}, A = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
const R = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, n] of e)
    s[i] = n;
  return s;
};
let ce = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function ct(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Ut = {
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
  },
  /* 混合样式 */
  mix: {
    handler(t) {
      if (!t)
        return;
      let e = {};
      G(e, this.$data, this.$props, this.$attrs, "mix"), this._style = C(e, t, (s, i, n, r) => (this.$nextTick(() => {
        g("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), ce.test(r) ? A(i) : i));
    },
    immediate: !0
  }
}, fe = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], qt = {};
k(
  fe,
  (t, e, s) => {
    t = ct(e), qt["--" + ct(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Ut
);
const pe = {
  name: "Card",
  // inheritAttrs: false,
  props: {
    offset: {
      type: [String, Array],
      default: () => []
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
    },
    mix: {
      type: String,
      default: "m=>margin,p|padding=>padding,bg|bgc=>background,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>border-radius,overflow"
    }
  },
  data() {
    return {
      closecss: {},
      _style: {},
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
    // style() {
    //   return this.tr();
    // },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return g("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Ut,
  methods: {
    exec: A,
    isEmpty: jt,
    picker: C,
    runer: g,
    isSimplyType: St,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(qt, t), G(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: ct,
    css(t, e) {
      k(t, (s, i) => {
        let n = i in this ? this[i] : this.default[i];
        !n || this.default[i] == n || (e[s] = A(n));
      });
    },
    change(t) {
      St(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      C(
        ne(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, s, i, n) => {
          let r = A(s);
          !r || this.default[n] == r || (this[n] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, me = {
  class: "card-title",
  space: ""
}, _e = {
  class: "card-ico-items",
  vcenter: ""
}, ge = ["title"], ye = { class: "card-content" };
function be(t, e, s, i, n, r) {
  return b(), O("div", {
    class: ht({
      card: t.$attrs.use === void 0
    }),
    key: n.trigger,
    style: Q(r.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        y("div", me, [
          a(t.$slots, "subtitle", {}, () => [
            y("span", null, T(r.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            y("div", _e, [
              a(t.$slots, "icon", E(M({ el: t.$el, picker: r.picker, runer: r.runer })), void 0, !0),
              y("div", {
                class: ht(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
                style: Q(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: r.tips
              }, null, 14, ge)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        y("div", ye, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ R(pe, [["render", be], ["__scopeId", "data-v-715ec8da"]]);
const $e = {
  name: "Boom",
  emits: ["click"],
  components: { Card: W },
  data: function() {
    return {
      mix: "m=>margin,c|color=>--s-button-color,fs=>font-size,lh=>line-height,miw|minw=>min-width,mih|minh=>min-height,mw|maxw=>max-width,mh|maxh=>max-height,h=>height,w=>width,p=>padding,br=>--s-button-border-radius,bg=>--s-button-background-color,bg=>--s-button-shadow-color"
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.init();
  },
  methods: {
    init() {
      k("disabled visible tips".split(/\s+/g), (t, e) => {
        g("removeAttribute", this.$el, e);
      });
    }
  }
}, we = ["disabled"];
function ve(t, e, s, i, n, r) {
  const l = N("tips"), o = N("Card");
  return b(), j(o, $({
    class: "s-button",
    use: ""
  }, t.$attrs, {
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    "inline-block": ""
  }), {
    default: m(() => [
      y("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          y("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = B("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, we),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (b(), j(l, E($({ key: 0 }, t.$attrs.tips)), null, 16)) : pt("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const mt = /* @__PURE__ */ R($e, [["render", ve], ["__scopeId", "data-v-984a282f"]]), Ct = /(?:\,|\|{2})/, ft = "px", Nt = "";
let J = document.documentElement, zt, At = ["s-left", "s-top", "s-right", "s-bottom"], xe = { left: 0, top: 1, right: 2, bottom: 3 };
const X = [];
var Se = ue(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let _t = {}, Gt = null;
Se(_t, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Gt = ke(() => {
      p(X);
    }, t), this._delay = t;
  }
});
_t.delay = 60;
function ke(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, p(t, this, arguments));
  };
}
const K = () => {
  Gt();
};
function Bt(t) {
  Xt(t), X.push(t);
}
function Xt(t) {
  let e = dt(X, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || X.splice(e, 1);
}
const U = new ResizeObserver(K);
U.observe(J);
function Et(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const Lt = [], q = (t) => {
  if (t)
    Lt.push(t);
  else
    return Lt.pop();
}, Rt = {};
var Wt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, n) {
    n = this.aWH[i], t[this.aLT[i]] = (e[n] - s[n]) / 2 + ft;
  },
  trigger: function(t, e, s, i) {
    var n = this.CENTER;
    t || (t = n), s || (s = {}), i || (i = {});
    for (var r, l, o = this.rWidth, h, u = t.match(this.rPosition), d = 0, _ = u.length; d < _; d++)
      h = u[d], h != n ? i[h] = 0 : (l = u[(d + 1) % _], r = +!o.test(l), this.css(i, s, e, r), l == h && this.css(i, s, e, +!r));
    return i;
  }
};
function Yt(t) {
  t.onresize || (X.push([Yt, null, t]), t.onresize = !0);
  var e = J, s = e.clientHeight, i = e.clientWidth, n = t.target, r = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, d = t.css, _ = t.space || (t.space = []), f = n.getBoundingClientRect(), c = r.offsetHeight, v = r.offsetWidth, w = Z(t.offset) ? 7 : t.offset;
  if (/\s+|center/.test(o)) {
    Wt.trigger(o, r, J, d);
    return;
  }
  var I = "3,0,2,1".split(Ct), F, x = f.left, L = f.top, P = Math.max(L, h), z = (f.height == zt ? f.bottom - L : f.height) >> 0, V = (f.width == zt ? f.right - x : f.width) >> 0, D = i - v - w, H = s - c - w, bt = x < 0 || x + V / 2 > i, $t = L < 0 || L + z > s, st = [
    /* left: 0 */
    $t ? -1 : x - v,
    /* top: 1 */
    bt ? -1 : P - c,
    /* right: 2 */
    $t ? -1 : D - f.right,
    /* bottom: 3 */
    bt ? -1 : H - f.bottom
  ];
  o && (dt(
    o.split(Ct),
    function(ie, Y, ot, re) {
      re.push(ot[Y]);
    },
    xe,
    F = []
  ), I.unshift.apply(I, F)), l = dt(
    I,
    function(ie, Y, ot) {
      if (ot[Y] - h > 0)
        return Y;
    },
    st
  );
  var it = 0, rt = 0, wt = 0, vt = 0;
  if (l == null)
    Wt.trigger("center", r, J, d);
  else {
    var nt = l == 0 || l == 2;
    it = Et(
      nt ? l == 2 ? f.right + w : st[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      h,
      D
    ), rt = Et(
      nt ? (
        /* 左右 */
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          P - (c - z) / 2,
          w
        )
      ) : l == 3 ? L + z + u + w : st[1] - w,
      h,
      H
    ), nt ? vt = Math.max(
      P - rt + (z - u) / 2 - u,
      u
    ) : wt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - it + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    ), d.left = it + ft, d.top = rt + ft, d["--tips-arrow-top"] = (z > c ? 0 : vt) || Nt, d["--tips-arrow-left"] = wt || Nt;
  }
  let xt = r.classList, se = At[l], lt = _[0];
  (Z(lt) || lt != l) && p([
    [
      /* 移除旧值 */
      ["remove", xt, At[lt]],
      /* 添加新值 */
      ["add", xt, se]
    ],
    () => {
      _.shift(), _.push(l), t.index = l;
    }
  ]);
}
const at = "data-tips-scroll", Ht = -1e4, Mt = 3, It = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), this.$emit("update:visible", t);
  },
  visible: {
    handler: function(t) {
      this.$nextTick(() => {
        this.__trigger(t);
      });
    },
    immediate: !0
  },
  target: {
    handler(t) {
      let e = C(
        [t],
        Ft(
          "0.?.$el|0.$el|0=>el",
          C(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      e && (this._event_mark = !1, this._target__ = e, this.__trigger(this.visible));
    }
  }
}, Te = {
  name: "Tips",
  components: {
    Card: W
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Ht
    },
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !0
    },
    before: {
      type: [Boolean, String, Number],
      default: !1
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
    /* tips容器距离边缘偏移量 */
    edge: {
      type: [String, Number],
      default: void 0
    },
    /* tips容器的偏移量 */
    offset: {
      type: [String, Number],
      default: void 0
    },
    /* 边框宽度 */
    border: {
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
      default: Mt
    }
  },
  watch: It,
  data() {
    return {
      css: {
        opacity: 0
      },
      proxy: !1,
      _event_mark: !1,
      _event__: null,
      _timeout__: null,
      _target__: null,
      _arrow__: 0,
      _mark: Math.random()
    };
  },
  computed: {
    isSimply: function() {
      return this.target === "";
    }
  },
  methods: {
    __parent(t) {
      let e = this.$el, s;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), p(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return p(
        t[s === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        s
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      if (t.nodeName == "#comment")
        return;
      let e = this.$set ? Object.assign({}, this.css) : this.css;
      G(e, this.__css(), !0), Yt({
        onresize: !1,
        /* 监控的目标 */
        target: this._target__,
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: e,
        /* 偏移量 */
        offset: Z(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__,
        edge: this.edge
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (t.nodeName == "#comment" || this.static || this.isSimply)
        return;
      let s = this.before;
      p([
        [
          e ? "removeChild" : s ? "insertBefore" : "appendChild",
          document.documentElement,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? p(t.addEventListener, t, "scroll", K) : (p(U.observe, U, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, at), s || (p(t.addEventListener, t, "scroll", K), this.__attr(t, at, "true"))));
      });
    },
    __css() {
      let t = {};
      return this._arrow__ = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, C(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      Z(this.static) || (this.init(), _t.delay = +this.delay, Bt(this.__2listener), this.__2listener(), this.__toggle_append(this.$el), Bt(this.init), p([["observe", U]], null, this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          p(t, this, arguments);
        },
        this.delay === Mt ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        p("stopPropagation", t), this.$emit("toggle", this.proxy = !0);
      });
    },
    /* 隐藏 */
    __hide(t) {
      this.__debounce(() => {
        this.proxy && this.$emit("toggle", this.proxy = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(t) {
      p("stopPropagation", t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(t) {
      if (ae(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let e = {
          click: (s) => {
            let i = q();
            this.$attrs.clear === void 0 || p([i]), this.__toggle(s), console.log(this);
            let n = p(3, i || "");
            n != this._mark && (n && q(i), q(["__toggle", this, s, this._mark]));
          },
          close: () => {
            let s = q();
            if (s && s[1].$attrs.modal !== void 0) {
              q(s);
              return;
            }
            p([s || []]);
          }
        };
        this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [
            ["click", e.click],
            ["click", e.close, window]
          ],
          enter: [
            ["mouseenter", e.click],
            ["click", e.close, window]
          ]
        }[t], this._try("addEventListener");
      } else
        t === 0 ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      tt(s) || (s = [s]);
      let i = [];
      k(s, (n, r) => {
        let l = 0;
        r[2] === window && ++l && Rt.__tipsmark_ || (l && (Rt.__tipsmark_ = !0), i.push([
          t,
          r[2] || e,
          r[0],
          r[1] || this.__toggle
        ]));
      }), p(i);
    }
  },
  mounted() {
    It.target.handler.call(this, this.target), (Ht === this.target || this.isSimply) && (this._target__ = p("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Xt(this.__2listener), this.__parent(function(t, e) {
      p(t.removeEventListener, t, "scroll", K), p(t.removeAttribute, t, at, void 0), e || p(U.unobserve, U, t);
    });
  }
}, Ce = { class: "tips-title" };
function Ne(t, e, s, i, n, r) {
  const l = N("Card");
  return n.proxy ? (b(), j(l, $({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": s.before
    }],
    style: s.static ? null : n.css,
    static: s.static ? "" : null,
    onClick: e[0] || (e[0] = ut(() => {
    }, ["stop"])),
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: m(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          y("div", Ce, T(s.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          B(T(s.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["class", "style", "static"])) : pt("", !0);
}
const gt = /* @__PURE__ */ R(Te, [["render", Ne], ["__scopeId", "data-v-c081c43d"]]);
const ze = {
  name: "Confirm",
  components: {
    Card: W,
    Tips: gt,
    Boom: mt
  },
  inheritAttrs: !1,
  emits: ["submit-click", "cancel-click"],
  props: {
    visible: {
      type: [Boolean, String, Number],
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    cancelAttrs: {
      type: Object,
      default: () => ({})
    },
    submitAttrs: {
      type: Object,
      default: () => ({})
    },
    cancel: {
      type: String,
      default: "取消"
    },
    submit: {
      type: String,
      default: "确定"
    }
  },
  data: function() {
    return {
      proxy: null,
      mark: 0
    };
  },
  mounted() {
    this.init();
  },
  // updated() {
  //   this.init();
  // },
  methods: {
    init() {
      this.proxy = this.visible;
    },
    emitcancel(t) {
      this.close(), this.$emit("cancel-click", t);
    },
    close() {
      g([q() || []]), this.proxy = !1;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, Ae = { class: "s-confirm-warp" }, Be = { flex: "" };
function Ee(t, e, s, i, n, r) {
  const l = N("Card"), o = N("Boom"), h = N("Tips");
  return b(), O("span", Ae, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    S(h, $({
      ref: "stips",
      class: "s-confirm",
      visible: t.proxy,
      height: "auto",
      min: ["auto"]
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: m(() => [
        a(t.$slots, "el", {}, () => [
          S(l, null, {
            title: m(() => [
              S(l, { class: "s-confirm-title" }, {
                default: m(() => [
                  a(t.$slots, "title", {}, () => [
                    B(T(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: m(() => [
              a(t.$slots, "content", {}, () => [
                B(T(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                S(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: ""
                }, {
                  default: m(() => [
                    e[0] || (e[0] = y("span", null, null, -1)),
                    y("span", Be, [
                      a(t.$slots, "boom", E(M({
                        close: r.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", E(M({ click: r.emitcancel, text: s.cancel })), () => [
                          S(o, $({ cancel: "" }, s.cancelAttrs, {
                            onClick: ut(r.emitcancel, ["stop"])
                          }), {
                            default: m(() => [
                              B(T(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", E(M({
                          click: r.close,
                          text: s.submit
                        })), () => [
                          S(o, $({
                            class: "simply",
                            onClick: ut(r.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: m(() => [
                              B(T(s.submitAttrs.text || s.submit), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0)
                      ], !0)
                    ])
                  ]),
                  _: 3
                })
              ], !0)
            ]),
            _: 3
          })
        ], !0)
      ]),
      _: 3
    }, 16, ["visible", "arrow"])
  ]);
}
const Jt = /* @__PURE__ */ R(ze, [["render", Ee], ["__scopeId", "data-v-09f1a82f"]]);
const Le = {
  name: "Div",
  components: {
    Card: W
  }
};
function Re(t, e, s, i, n, r) {
  const l = N("Card");
  return b(), j(l, $({ class: "s-div" }, t.$attrs, { height: "auto" }), Vt({ _: 2 }, [
    et(t.$slots, (o, h) => ({
      name: h,
      fn: m((u) => [
        a(t.$slots, h, E(M(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Kt = /* @__PURE__ */ R(Le, [["render", Re], ["__scopeId", "data-v-5a663869"]]);
const We = {
  name: "Flex",
  components: {
    Card: W
  }
};
function He(t, e, s, i, n, r) {
  const l = N("Card");
  return b(), j(l, $({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), Vt({ _: 2 }, [
    et(t.$slots, (o, h) => ({
      name: h,
      fn: m((u) => [
        a(t.$slots, h, E(M(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Qt = /* @__PURE__ */ R(We, [["render", He], ["__scopeId", "data-v-80afacb2"]]);
let Pt = (t) => t == null || t == null, Me = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ie = {
  name: "Flyweight",
  components: {
    Card: W
  },
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
      var t = this.w, e = this.h, s = this.Size, i = {};
      return G(
        i,
        {
          "--width": A(this.realW),
          "--height": A(this.realH),
          "--flyweight-content": A(s)
        },
        e && {
          "--flyweight-h": A(e)
        },
        t && {
          "--flyweight-w": A(t)
        },
        "mix"
      ), i;
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
    this.flyweights = [], this.$set || (this.$set = (t, e, s) => {
      t[e] = s;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Me(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: A,
    trigger(t, e) {
      tt(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        k(t, (s, i) => {
          this.$emit(i[0], Pt(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      g(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let s = e.index || k(
              this.flys,
              (i, n, r, l) => {
                if (n[r] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            Pt(s) || this.setindex(s);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      g(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let s = e / this.column >> 0, i = this.expand, n = this.flyweight[this.direction] / i >> 0;
              s > n && s < n + this.row - 2 || (this.flyweight[this.direction] = s * i - i / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = g(this.direction, t.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      G(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let n = !1;
      this.end = !1, this.__index = i.index, k(
        this.flyweights,
        (r, l, o, h, u, d, _, f, c) => {
          if (o = r / u >> 0, f = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), c = f * u + r % u, c >= this.count) {
            n || (this.end = !0, e.push(["onend"]), n = !0);
            return;
          }
          l.index = f, l.i = c, l.data = this.flys[c];
          let v = [
            /* top */
            f * this.expand + l.x,
            /* left */
            l.space
          ];
          _ && v.reverse(), l.top = v[0], l.left = v[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        i.index,
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
      let s = this.scrollx, i = this.flyweight, n = C(i, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [l, o] = this.offset, h = n.width, u = n.height, d = (Tt(this.width, h) || h) + l, _ = Tt(this.height, u) + o, f = [h / d >> 0 || 1, u / _ >> 0 || 1];
        s && f.reverse();
        let [c, v] = f, w = this.padding, I, F = 0, x, L;
        s ? (x = d, d -= l, L = (H) => (
          /* 计算top偏移量 */
          H * (_ - o) + (H + 1) * o
        )) : (r ? (d = (h - l * (c + 2 * w - 1)) / c, I = !w * l, F = w * l) : (I = 0, F = h < d ? 0 : (h % d + l * c) / (c + 1) >> 0, d -= l), L = (H) => H * (d + I) + (H + 1) * F, x = _), this.row = v + 2, this.column = c, this.realH = _ - o, this.realW = d, this.expand = x, this.Size = Math.ceil(t / c) * x;
        let P = Math.min(t, c * this.row), z = P - 1, V;
        for (; P-- > 0; )
          V = z - P, this.$set(e, V, {
            x: l,
            y: o,
            width: d,
            height: _ - o,
            space: L(V % c),
            data: {}
          });
        e.length = z + 1;
        let D = [];
        u / x > z / c && D.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), D.push([
          "update:space",
          {
            row: (z / c >> 0) + 1,
            column: c,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(D);
      });
    }
  }
}, Pe = { class: "flyweight-all" };
function Oe(t, e, s, i, n, r) {
  const l = N("Card");
  return b(), O("div", {
    ref: "flyweight",
    class: ht(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: s.line && n.__top !== 0
    }]),
    style: Q(r.style),
    onScroll: e[0] || (e[0] = (...o) => r.scroll && r.scroll(...o))
  }, [
    a(t.$slots, "title", E(M(r.bridge)), void 0, !0),
    y("div", Pe, [
      (b(!0), O(Dt, null, et(n.flyweights, (o, h) => (b(), O("div", {
        key: h,
        style: Q({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", $({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", E(M(r.bridge)), () => [
      n.flyweights.length ? a(t.$slots, "end", E($({ key: 0 }, r.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        S(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: m(() => [...e[1] || (e[1] = [
            B(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const Zt = /* @__PURE__ */ R(Ie, [["render", Oe], ["__scopeId", "data-v-1c021354"]]), je = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return jt(s) ? [] : tt(s) ? s : [s];
    },
    tag() {
      return this.is || this.$attrs.type;
    }
  },
  data() {
    return {
      Ref: {}
    };
  },
  props: {
    /* 桥接 指定数据字段为插槽名称 */
    bridge: {
      type: String,
      default: "slot"
    },
    is: {
      type: String
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
    C(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, i) => {
        if (g("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let n in e)
            /^\$/.test(n) && G(this.Ref, e[n]);
      }
    );
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Fe(t, e, s, i, n, r) {
  return b(), j(oe(r.tag), $({ ref: "component" }, t.$attrs), {
    default: m(() => [
      (b(!0), O(Dt, null, et(r.column, (l) => a(t.$slots, r.__trigger(l), $({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const yt = /* @__PURE__ */ R(je, [["render", Fe]]);
let Ve;
const Ot = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
};
let De = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Ue = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: W, Stream: yt },
  emits: [
    "update:modelValue",
    "update:value",
    "update:sum",
    "update:state",
    "change",
    "focus"
  ],
  data: function() {
    return {
      id: Ft("input-{1000-9999}-{1000-9999}"),
      inputAttrs: {},
      trigger: "modelValue",
      attrs: {},
      left: null,
      right: null,
      rm: null,
      completed: null,
      error: "",
      RULE: [],
      hasSuccess: 0
    };
  },
  computed: {
    _value() {
      return this.$attrs[this.trigger] || "";
    },
    limit() {
      return this.$attrs.maxlength - this._value.length >> 0;
    }
  },
  mounted() {
    C(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          g([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), k(["left", "right", "rm"], (t, e, s) => {
      s = g([
        ["$el", this.$refs[e] || ""],
        [e, this.$refs]
      ]), this[e] = g("offsetWidth", s || "") || null;
    }), this.attrs = C(this.$attrs, De + this.mix), k(
      this.$attrs,
      (t, e, s) => {
        he(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
          "$attrs." + t,
          (i) => {
            this.inputAttrs[t] = i;
          },
          { immediate: !0 }
        );
      },
      le("maxlength,type,disabled,readonly")
    ), this.$nextTick(() => {
      this.completed = "";
    }), this.storage();
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    tips: {
      type: String,
      default: ""
    },
    mix: {
      type: String,
      default: ""
    },
    rules: {
      type: [Array, Object],
      default: () => []
    },
    sum: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    error(t) {
      let e = this.hasSuccess;
      t || (e = 1);
      let s;
      e && t ? (e = 0, s = -1) : s = e * (2 * +!t - 1), this.hasSuccess = e, this.$emit("update:sum", +this.sum + s), this.$emit("update:state", s);
    }
  },
  methods: {
    storage() {
      let t = this.rules, e = [];
      k(tt(t) ? t : [t], (s, i, n) => {
        k(Ot, (r, l) => {
          r in i && (n = [
            function(o, h, u, d, _, f, c) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = h(u, c, f);
              return _.error = w ? d : Ve;
            },
            this,
            i,
            Ot[r],
            i[r],
            i.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(n);
      }), this.RULE.push(e);
    },
    __runer(t, e) {
      g([this.RULE], null, t, e);
    },
    close() {
      this.$nextTick(() => {
        this.__emit(""), this.__runer("clear", "");
      });
    },
    __change(t) {
      this.__runer("change", t.target.value), this.$emit("change", t.target.value);
    },
    __blur(t) {
      this.__runer("blur", t.target.value), this.__emit(t.target.value);
    },
    __input(t) {
      this.__runer("input", t.target.value), this.__emit(t.target.value);
    },
    __emit(t) {
      this.$emit("update:" + this.trigger, t);
    }
  }
}, qe = ["for"], Ge = {
  class: "placeholder",
  flex: ""
}, Xe = {
  class: "s-wrap-tips",
  flex: ""
}, Ye = {
  key: 0,
  class: "s-wrap-limit"
};
function Je(t, e, s, i, n, r) {
  const l = N("Stream"), o = N("Card");
  return b(), j(o, $({
    class: "s-wrap",
    "s-completed": t.completed,
    use: ""
  }, t.attrs, {
    class: {
      [t.$attrs.class || ""]: !0,
      error: t.error
    },
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: m(() => [
      S(l, $({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (h) => t.$emit("focus", h)),
        onChange: r.__change,
        onInput: r.__input,
        onBlur: r.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      y("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          y("span", Ge, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              B(" " + T(s.placeholder), 1)
            ], !0)
          ]),
          y("span", Xe, [
            a(t.$slots, "tips", { limit: r.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              B(" " + T(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, qe),
      S(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: m(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: r.limit }, () => [
              t.$attrs.maxlength ? (b(), O("span", Ye, T(r.limit), 1)) : pt("", !0)
            ], !0),
            y("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => r.close && r.close(...h))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      S(o, {
        ref: "left",
        class: "s-wrap-left",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: m(() => [
          a(t.$slots, "left", {}, () => [
            a(t.$slots, "icon", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      S(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: m(() => [
          a(t.$slots, "error", {}, () => [
            B(T(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const te = /* @__PURE__ */ R(Ue, [["render", Je], ["__scopeId", "data-v-acf70ba2"]]), Ke = {}, ee = [];
ee.push(mt, W, Jt, Kt, Qt, Zt, te, yt, gt);
const ss = { Boom: mt, Card: W, Confirm: Jt, Div: Kt, Flex: Qt, Flyweight: Zt, Input: te, Stream: yt, Tips: gt };
Ke.install = function(t, e = {}) {
  ee.forEach((s) => {
    let { global: i, name: n } = s;
    i === !1 || t.component(n, s), t.component("S" + n, s);
  });
};
export {
  mt as Boom,
  W as Card,
  Jt as Confirm,
  Kt as Div,
  Qt as Flex,
  Zt as Flyweight,
  te as Input,
  yt as Stream,
  gt as Tips,
  ss as components,
  Ke as default
};
