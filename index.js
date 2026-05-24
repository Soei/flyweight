import { runer as g, each as k, merge as U, picker as C, isEmpty as Ft, isSimplyType as kt, isString as le, isArray as st, format as Vt, array2Json as oe } from "@soei/util";
import { openBlock as b, createElementBlock as P, normalizeClass as dt, normalizeStyle as tt, renderSlot as a, createElementVNode as y, toDisplayString as T, normalizeProps as E, guardReactiveProps as M, resolveComponent as N, createBlock as j, mergeProps as $, withCtx as _, createTextVNode as B, createCommentVNode as _t, createVNode as S, withModifiers as Tt, createSlots as Dt, renderList as it, Fragment as Ut, resolveDynamicComponent as ae } from "vue";
import { runer as p, each as ct, isNil as et, isString as he, isFunction as ue } from "@soei/tools";
import de from "@soei/picker";
let ce = /(\d+|[+\-\*/]|%)/g, Ct = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Nt = (t, e) => {
  let s;
  if (s = g("match", t, ce)) {
    let r = s.length, n, i = 0, l, o = [];
    for (; r--; )
      i = s.shift(), i in Ct ? (n && o.push(n), i === "%" && (o.length = 2), l = i) : +i && o.push(+i), o.length == 2 && (o.push(e), n = Ct[l].apply(null, o), o.length = 0);
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
  for (const [r, n] of e)
    s[r] = n;
  return s;
};
let fe = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function ft(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let qt = {
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
      U(e, this.$data, this.$props, this.$attrs, "mix"), this._style = C(e, t, (s, r, n, i) => (this.$nextTick(() => {
        g("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), fe.test(i) ? A(r) : r));
    },
    immediate: !0
  }
}, pe = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Gt = {};
k(
  pe,
  (t, e, s) => {
    t = ft(e), Gt["--" + ft(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  qt
);
const _e = {
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
  watch: qt,
  methods: {
    exec: A,
    isEmpty: Ft,
    picker: C,
    runer: g,
    isSimplyType: kt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Gt, t), U(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: ft,
    css(t, e) {
      k(t, (s, r) => {
        let n = r in this ? this[r] : this.default[r];
        !n || this.default[r] == n || (e[s] = A(n));
      });
    },
    change(t) {
      kt(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      C(
        le(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, s, r, n) => {
          let i = A(s);
          !i || this.default[n] == i || (this[n] = i);
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
}, ge = {
  class: "card-ico-items",
  vcenter: ""
}, ye = ["title"], be = { class: "card-content" };
function $e(t, e, s, r, n, i) {
  return b(), P("div", {
    class: dt({
      card: t.$attrs.use === void 0
    }),
    key: n.trigger,
    style: tt(i.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        y("div", me, [
          a(t.$slots, "subtitle", {}, () => [
            y("span", null, T(i.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            y("div", ge, [
              a(t.$slots, "icon", E(M({ el: t.$el, picker: i.picker, runer: i.runer })), void 0, !0),
              y("div", {
                class: dt(["card-close", { hide: i.isSimplyType(s.close) ? !s.close : !1 }]),
                style: tt(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: i.tips
              }, null, 14, ye)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        y("div", be, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ R(_e, [["render", $e], ["__scopeId", "data-v-715ec8da"]]);
const we = {
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
}, ve = ["disabled"];
function xe(t, e, s, r, n, i) {
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
    default: _(() => [
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
      ], 8, ve),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (b(), j(l, E($({ key: 0 }, t.$attrs.tips)), null, 16)) : _t("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const mt = /* @__PURE__ */ R(we, [["render", xe], ["__scopeId", "data-v-984a282f"]]), zt = /(?:\,|\|{2})/, pt = "px", At = "";
let Q = document.documentElement, Bt, Et = ["s-left", "s-top", "s-right", "s-bottom"], Se = { left: 0, top: 1, right: 2, bottom: 3 };
const X = [];
var ke = de(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let gt = {}, Xt = null;
ke(gt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Xt = Te(() => {
      p(X);
    }, t), this._delay = t;
  }
});
gt.delay = 60;
function Te(t, e) {
  let s = 0;
  return function() {
    const r = Date.now();
    r - s >= e && (s = r, p(t, this, arguments));
  };
}
const Z = () => {
  Xt();
};
function Ce(t) {
  Yt(t), X.push(t);
}
function Yt(t) {
  let e = ct(X, function(s, r) {
    if (t == r)
      return s;
  });
  e === void 0 || X.splice(e, 1);
}
const q = new ResizeObserver(Z);
q.observe(Q);
function Lt(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const Rt = [], G = (t) => {
  if (t)
    Rt.push(t);
  else
    return Rt.pop();
}, Wt = {};
var Ht = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, r, n) {
    n = this.aWH[r], t[this.aLT[r]] = (e[n] - s[n]) / 2 + pt;
  },
  trigger: function(t, e, s, r) {
    var n = this.CENTER;
    t || (t = n), s || (s = {}), r || (r = {});
    for (var i, l, o = this.rWidth, h, u = t.match(this.rPosition), d = 0, m = u.length; d < m; d++)
      h = u[d], h != n ? r[h] = 0 : (l = u[(d + 1) % m], i = +!o.test(l), this.css(r, s, e, i), l == h && this.css(r, s, e, +!i));
    return r;
  }
};
function Jt(t) {
  t.onresize || (X.push([Jt, null, t]), t.onresize = !0);
  var e = Q, s = e.clientHeight, r = e.clientWidth, n = t.target, i = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, d = t.css, m = t.space || (t.space = []), f = n.getBoundingClientRect(), c = i.offsetHeight, v = i.offsetWidth, w = et(t.offset) ? 7 : t.offset;
  if (/\s+|center/.test(o)) {
    Ht.trigger(o, i, Q, d);
    return;
  }
  var O = "3,0,2,1".split(zt), F, x = f.left, L = f.top, I = Math.max(L, h), z = (f.height == Bt ? f.bottom - L : f.height) >> 0, V = (f.width == Bt ? f.right - x : f.width) >> 0, D = r - v - w, H = s - c - w, $t = x < 0 || x + V / 2 > r, wt = L < 0 || L + z > s, rt = [
    /* left: 0 */
    wt ? -1 : x - v,
    /* top: 1 */
    $t ? -1 : I - c,
    /* right: 2 */
    wt ? -1 : D - f.right,
    /* bottom: 3 */
    $t ? -1 : H - f.bottom
  ];
  o && (ct(
    o.split(zt),
    function(re, Y, ht, ne) {
      ne.push(ht[Y]);
    },
    Se,
    F = []
  ), O.unshift.apply(O, F)), l = ct(
    O,
    function(re, Y, ht) {
      if (ht[Y] - h > 0)
        return Y;
    },
    rt
  );
  var nt = 0, lt = 0, vt = 0, xt = 0;
  if (l == null)
    Ht.trigger("center", i, Q, d);
  else {
    var ot = l == 0 || l == 2;
    nt = Lt(
      ot ? l == 2 ? f.right + w : rt[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      h,
      D
    ), lt = Lt(
      ot ? (
        /* 左右 */
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          I - (c - z) / 2,
          w
        )
      ) : l == 3 ? L + z + u + w : rt[1] - w,
      h,
      H
    ), ot ? xt = Math.max(
      I - lt + (z - u) / 2 - u,
      u
    ) : vt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - nt + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    ), d.left = nt + pt, d.top = lt + pt, d["--tips-arrow-top"] = (z > c ? 0 : xt) || At, d["--tips-arrow-left"] = vt || At;
  }
  let St = i.classList, ie = Et[l], at = m[0];
  (et(at) || at != l) && p([
    [
      /* 移除旧值 */
      ["remove", St, Et[at]],
      /* 添加新值 */
      ["add", St, ie]
    ],
    () => {
      m.shift(), m.push(l), t.index = l;
    }
  ]);
}
const J = document.documentElement, K = (t) => (p("stopPropagation", t), t), Ne = (t, e) => p(t, e || {}) || {}, ut = "data-tips-scroll", Mt = -1e4, Ot = 3, It = {
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
        Vt(
          "0.?.$el|0.$el|0=>el",
          C(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      e && (this._event_mark = !1, this._target__ = e, this.__trigger(this.visible));
    }
  }
}, ze = {
  name: "Tips",
  components: {
    Card: W
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Mt
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
      default: Ot
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
      U(e, this.__css(), !0), Jt({
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
        offset: et(this.offset) ? void 0 : +this.offset >> 0,
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
          J,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? p(t.addEventListener, t, "scroll", Z) : (p(q.observe, q, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, ut), s || (p(t.addEventListener, t, "scroll", Z), this.__attr(t, ut, "true"))));
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
      et(this.static) || (this.init(), gt.delay = +this.delay, Ce(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          p(t, this, arguments);
        },
        this.delay === Ot ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        K(t), this.$emit("toggle", this.proxy = !0);
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
      K(t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    __close(t) {
      this.__click((e, s) => e === void 0 ? t : (
        /* 判断上次的是不是模式窗口 */
        Ne(1, e).$attrs.modal !== void 0 || /* 判断是不是自己 */
        this.$el === t.currentTarget && s == this._mark ? (G(e), !0) : (p([e || []]), !0)
      ), t);
    },
    __click(t, e) {
      let s = G(), r = p(3, s || "");
      if (p(t, null, s, r) != t)
        return K(e);
      this.$attrs.clear === void 0 || s && p([s]), r != this._mark && (G(s), G(["__toggle", this, t, this._mark])), K(t), this.__toggle(t);
    },
    /* 触发事件 */
    __trigger(t) {
      if (he(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [
            ["click", this.__click],
            ["click", this.__close, J, !0]
          ],
          enter: [
            ["mouseenter", this.__click],
            ["click", this.__close, J]
          ]
        }[t], this._try("addEventListener");
      } else
        t === 0 ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      st(s) || (s = [s]);
      let r = [];
      k(s, (n, i) => {
        let l = 0;
        i[2] === J && ++l && Wt.__tipsmark_ || (l && (Wt.__tipsmark_ = !0), r.push([
          t,
          i[2] || e,
          i[0],
          i[1] || this.__toggle
          // true
        ]));
      }), p(r);
    }
  },
  mounted() {
    It.target.handler.call(this, this.target), (Mt === this.target || this.isSimply) && (this._target__ = p("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Yt(this.__2listener), this.__parent(function(t, e) {
      p(t.removeEventListener, t, "scroll", Z), p(t.removeAttribute, t, ut, void 0), e || p(q.unobserve, q, t);
    });
  }
}, Ae = { class: "tips-title" };
function Be(t, e, s, r, n, i) {
  const l = N("Card");
  return n.proxy ? (b(), j(l, $({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": s.before
    }],
    style: s.static ? null : n.css,
    static: s.static ? "" : null,
    onClick: i.__close,
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: _(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          y("div", Ae, T(s.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          B(T(s.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["class", "style", "static", "onClick"])) : _t("", !0);
}
const yt = /* @__PURE__ */ R(ze, [["render", Be], ["__scopeId", "data-v-6a594dd0"]]);
const Ee = {
  name: "Confirm",
  components: {
    Card: W,
    Tips: yt,
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
      g([G() || []]), this.proxy = !1;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, Le = { class: "s-confirm-warp" }, Re = { flex: "" };
function We(t, e, s, r, n, i) {
  const l = N("Card"), o = N("Boom"), h = N("Tips");
  return b(), P("span", Le, [
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
      default: _(() => [
        a(t.$slots, "el", {}, () => [
          S(l, null, {
            title: _(() => [
              S(l, { class: "s-confirm-title" }, {
                default: _(() => [
                  a(t.$slots, "title", {}, () => [
                    B(T(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: _(() => [
              a(t.$slots, "content", {}, () => [
                B(T(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                S(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: ""
                }, {
                  default: _(() => [
                    e[0] || (e[0] = y("span", null, null, -1)),
                    y("span", Re, [
                      a(t.$slots, "boom", E(M({
                        close: i.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", E(M({ click: i.emitcancel, text: s.cancel })), () => [
                          S(o, $({ cancel: "" }, s.cancelAttrs, {
                            onClick: Tt(i.emitcancel, ["stop"])
                          }), {
                            default: _(() => [
                              B(T(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", E(M({
                          click: i.close,
                          text: s.submit
                        })), () => [
                          S(o, $({
                            class: "simply",
                            onClick: Tt(i.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: _(() => [
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
const Kt = /* @__PURE__ */ R(Ee, [["render", We], ["__scopeId", "data-v-09f1a82f"]]);
const He = {
  name: "Div",
  components: {
    Card: W
  }
};
function Me(t, e, s, r, n, i) {
  const l = N("Card");
  return b(), j(l, $({ class: "s-div" }, t.$attrs, { height: "auto" }), Dt({ _: 2 }, [
    it(t.$slots, (o, h) => ({
      name: h,
      fn: _((u) => [
        a(t.$slots, h, E(M(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Qt = /* @__PURE__ */ R(He, [["render", Me], ["__scopeId", "data-v-5a663869"]]);
const Oe = {
  name: "Flex",
  components: {
    Card: W
  }
};
function Ie(t, e, s, r, n, i) {
  const l = N("Card");
  return b(), j(l, $({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), Dt({ _: 2 }, [
    it(t.$slots, (o, h) => ({
      name: h,
      fn: _((u) => [
        a(t.$slots, h, E(M(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Zt = /* @__PURE__ */ R(Oe, [["render", Ie], ["__scopeId", "data-v-80afacb2"]]);
let Pt = (t) => t == null || t == null, Pe = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const je = {
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
      var t = this.w, e = this.h, s = this.Size, r = {};
      return U(
        r,
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
    this.flyweights = [], this.$set || (this.$set = (t, e, s) => {
      t[e] = s;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Pe(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: A,
    trigger(t, e) {
      st(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        k(t, (s, r) => {
          this.$emit(r[0], Pt(r[1]) ? !0 : r[1]);
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
              (r, n, i, l) => {
                if (n[i] == l)
                  return r;
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
              let s = e / this.column >> 0, r = this.expand, n = this.flyweight[this.direction] / r >> 0;
              s > n && s < n + this.row - 2 || (this.flyweight[this.direction] = s * r - r / 2, this.scroll());
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
      let e = [], s = g(this.direction, t.target), r = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      U(r, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", r]));
      let n = !1;
      this.end = !1, this.__index = r.index, k(
        this.flyweights,
        (i, l, o, h, u, d, m, f, c) => {
          if (o = i / u >> 0, f = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), c = f * u + i % u, c >= this.count) {
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
          m && v.reverse(), l.top = v[0], l.left = v[1];
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
      let s = this.scrollx, r = this.flyweight, n = C(r, this.BoxRule);
      this.$nextTick(() => {
        let i = /true/.test(this.auto), [l, o] = this.offset, h = n.width, u = n.height, d = (Nt(this.width, h) || h) + l, m = Nt(this.height, u) + o, f = [h / d >> 0 || 1, u / m >> 0 || 1];
        s && f.reverse();
        let [c, v] = f, w = this.padding, O, F = 0, x, L;
        s ? (x = d, d -= l, L = (H) => (
          /* 计算top偏移量 */
          H * (m - o) + (H + 1) * o
        )) : (i ? (d = (h - l * (c + 2 * w - 1)) / c, O = !w * l, F = w * l) : (O = 0, F = h < d ? 0 : (h % d + l * c) / (c + 1) >> 0, d -= l), L = (H) => H * (d + O) + (H + 1) * F, x = m), this.row = v + 2, this.column = c, this.realH = m - o, this.realW = d, this.expand = x, this.Size = Math.ceil(t / c) * x;
        let I = Math.min(t, c * this.row), z = I - 1, V;
        for (; I-- > 0; )
          V = z - I, this.$set(e, V, {
            x: l,
            y: o,
            width: d,
            height: m - o,
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
}, Fe = { class: "flyweight-all" };
function Ve(t, e, s, r, n, i) {
  const l = N("Card");
  return b(), P("div", {
    ref: "flyweight",
    class: dt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: s.line && n.__top !== 0
    }]),
    style: tt(i.style),
    onScroll: e[0] || (e[0] = (...o) => i.scroll && i.scroll(...o))
  }, [
    a(t.$slots, "title", E(M(i.bridge)), void 0, !0),
    y("div", Fe, [
      (b(!0), P(Ut, null, it(n.flyweights, (o, h) => (b(), P("div", {
        key: h,
        style: tt({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", $({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", E(M(i.bridge)), () => [
      n.flyweights.length ? a(t.$slots, "end", E($({ key: 0 }, i.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        S(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: _(() => [...e[1] || (e[1] = [
            B(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const te = /* @__PURE__ */ R(je, [["render", Ve], ["__scopeId", "data-v-1c021354"]]), De = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return Ft(s) ? [] : st(s) ? s : [s];
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
      (t, e, s, r) => {
        if (g("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let n in e)
            /^\$/.test(n) && U(this.Ref, e[n]);
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
function Ue(t, e, s, r, n, i) {
  return b(), j(ae(i.tag), $({ ref: "component" }, t.$attrs), {
    default: _(() => [
      (b(!0), P(Ut, null, it(i.column, (l) => a(t.$slots, i.__trigger(l), $({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const bt = /* @__PURE__ */ R(De, [["render", Ue]]);
let qe;
const jt = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
};
let Ge = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Xe = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: W, Stream: bt },
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
      id: Vt("input-{1000-9999}-{1000-9999}"),
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
    }), this.attrs = C(this.$attrs, Ge + this.mix), k(
      this.$attrs,
      (t, e, s) => {
        ue(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
          "$attrs." + t,
          (r) => {
            this.inputAttrs[t] = r;
          },
          { immediate: !0 }
        );
      },
      oe("maxlength,type,disabled,readonly")
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
      k(st(t) ? t : [t], (s, r, n) => {
        k(jt, (i, l) => {
          i in r && (n = [
            function(o, h, u, d, m, f, c) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = h(u, c, f);
              return m.error = w ? d : qe;
            },
            this,
            r,
            jt[i],
            r[i],
            r.message,
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
}, Ye = ["for"], Je = {
  class: "placeholder",
  flex: ""
}, Ke = {
  class: "s-wrap-tips",
  flex: ""
}, Qe = {
  key: 0,
  class: "s-wrap-limit"
};
function Ze(t, e, s, r, n, i) {
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
    default: _(() => [
      S(l, $({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (h) => t.$emit("focus", h)),
        onChange: i.__change,
        onInput: i.__input,
        onBlur: i.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      y("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          y("span", Je, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              B(" " + T(s.placeholder), 1)
            ], !0)
          ]),
          y("span", Ke, [
            a(t.$slots, "tips", { limit: i.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              B(" " + T(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Ye),
      S(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: _(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: i.limit }, () => [
              t.$attrs.maxlength ? (b(), P("span", Qe, T(i.limit), 1)) : _t("", !0)
            ], !0),
            y("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => i.close && i.close(...h))
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
        default: _(() => [
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
        default: _(() => [
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
const ee = /* @__PURE__ */ R(Xe, [["render", Ze], ["__scopeId", "data-v-acf70ba2"]]), ts = {}, se = [];
se.push(mt, W, Kt, Qt, Zt, te, ee, bt, yt);
const ns = { Boom: mt, Card: W, Confirm: Kt, Div: Qt, Flex: Zt, Flyweight: te, Input: ee, Stream: bt, Tips: yt };
ts.install = function(t, e = {}) {
  se.forEach((s) => {
    let { global: r, name: n } = s;
    r === !1 || t.component(n, s), t.component("S" + n, s);
  });
};
export {
  mt as Boom,
  W as Card,
  Kt as Confirm,
  Qt as Div,
  Zt as Flex,
  te as Flyweight,
  ee as Input,
  bt as Stream,
  yt as Tips,
  ns as components,
  ts as default
};
