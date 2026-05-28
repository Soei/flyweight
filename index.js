import { runer as y, each as T, merge as G, picker as S, isEmpty as gt, isSimplyType as zt, isString as le, format as yt, isArray as st, array2Json as oe } from "@soei/util";
import { openBlock as $, createElementBlock as j, normalizeClass as ft, normalizeStyle as tt, renderSlot as h, createElementVNode as b, toDisplayString as B, normalizeProps as C, guardReactiveProps as R, resolveComponent as N, createBlock as F, mergeProps as g, withCtx as m, createTextVNode as L, createCommentVNode as bt, createSlots as it, renderList as X, resolveDynamicComponent as ae, Fragment as Ut, createVNode as k, withModifiers as At } from "vue";
import { runer as c, isArray as he, each as pt, isNil as et, isString as ue, isFunction as de } from "@soei/tools";
import ce from "@soei/picker";
let fe = /(\d+|[+\-\*/]|%)/g, Et = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Bt = (t, e) => {
  let s;
  if (s = y("match", t, fe)) {
    let r = s.length, n, i = 0, l, o = [];
    for (; r--; )
      i = s.shift(), i in Et ? (n && o.push(n), i === "%" && (o.length = 2), l = i) : +i && o.push(+i), o.length == 2 && (o.push(e), n = Et[l].apply(null, o), o.length = 0);
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
const M = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, n] of e)
    s[r] = n;
  return s;
};
let pe = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function mt(t, e) {
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
      G(e, this.$data, this.$props, this.$attrs, "mix"), this._style = S(e, t, (s, r, n, i) => (this.$nextTick(() => {
        y("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), pe.test(i) ? A(r) : r));
    },
    immediate: !0
  }
}, me = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Gt = {};
T(
  me,
  (t, e, s) => {
    t = mt(e), Gt["--" + mt(e, !0)] = t, s[t] = function() {
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
      return y("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: qt,
  methods: {
    exec: A,
    isEmpty: gt,
    picker: S,
    runer: y,
    isSimplyType: zt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Gt, t), G(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: mt,
    css(t, e) {
      T(t, (s, r) => {
        let n = r in this ? this[r] : this.default[r];
        !n || this.default[r] == n || (e[s] = A(n));
      });
    },
    change(t) {
      zt(t) || (this.closecss = S(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,bg=>--s-card-close-background-color,:bg=>--s-card-close-hover-background-color,:color=>--s-card-close-hover-color,shadow=>--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      S(
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
}, ge = {
  class: "card-title",
  space: ""
}, ye = {
  class: "card-ico-items",
  vcenter: ""
}, be = ["title"], $e = { class: "card-content" };
function we(t, e, s, r, n, i) {
  return $(), j("div", {
    class: ft({
      card: t.$attrs.use === void 0
    }),
    key: n.trigger,
    style: tt(i.tr())
  }, [
    h(t.$slots, "default", {}, () => [
      h(t.$slots, "title", {}, () => [
        b("div", ge, [
          h(t.$slots, "subtitle", {}, () => [
            b("span", null, B(i.sub), 1)
          ], !0),
          h(t.$slots, "icons", {}, () => [
            b("div", ye, [
              h(t.$slots, "icon", C(R({ el: t.$el, picker: i.picker, runer: i.runer })), void 0, !0),
              b("div", {
                class: ft(["card-close", { hide: i.isSimplyType(s.close) ? !s.close : !1 }]),
                style: tt(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: i.tips
              }, null, 14, be)
            ])
          ], !0)
        ])
      ], !0),
      h(t.$slots, "content", {}, () => [
        b("div", $e, [
          h(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ M(_e, [["render", we], ["__scopeId", "data-v-f2fc47c3"]]);
const ve = {
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
      T("disabled visible tips".split(/\s+/g), (t, e) => {
        y("removeAttribute", this.$el, e);
      });
    }
  }
}, xe = ["disabled"];
function ke(t, e, s, r, n, i) {
  const l = N("tips"), o = N("Card");
  return $(), F(o, g({
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
      b("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (a) => t.$emit("click", a))
      }, [
        h(t.$slots, "inner", {}, () => [
          b("span", null, [
            h(t.$slots, "default", {}, () => [
              e[1] || (e[1] = L("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, xe),
      h(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? ($(), F(l, C(g({ key: 0 }, t.$attrs.tips)), null, 16)) : bt("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const $t = /* @__PURE__ */ M(ve, [["render", ke], ["__scopeId", "data-v-984a282f"]]), Lt = /(?:\,|\|{2})/, _t = "px", Rt = "";
let Q = document.documentElement, Mt, Wt = ["s-left", "s-top", "s-right", "s-bottom"], Se = { left: 0, top: 1, right: 2, bottom: 3 };
const J = [];
var Te = ce(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let wt = {}, Xt = null;
Te(wt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Xt = Ce(() => {
      c(J);
    }, t), this._delay = t;
  }
});
wt.delay = 60;
function Ce(t, e) {
  let s = 0;
  return function() {
    const r = Date.now();
    r - s >= e && (s = r, c(t, this, arguments));
  };
}
const Z = () => {
  Xt();
};
function Ne(t) {
  Yt(t), J.push(t);
}
function ze(t, e) {
  if (!c(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), r = e.x, n = e.y;
  return r > s.left && r < s.left + s.width && n > s.top && n < s.top + s.height;
}
function Yt(t) {
  let e = pt(J, function(s, r) {
    if (t == r)
      return s;
  });
  e === void 0 || J.splice(e, 1);
}
const Y = new ResizeObserver(Z);
Y.observe(Q);
function Ht(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const ut = [], P = (t) => {
  if (he(t))
    ut.push(t);
  else
    return +t < 0 ? c(t, ut) : ut.pop();
};
c([
  [
    "addEventListener",
    window,
    "keydown",
    function(t) {
      if (t.keyCode === 27) {
        c(["stopPropagation", "preventDefault"], t);
        let e = P(-1);
        e && c([[e[4]]]) === void 0 && c([P()]);
      }
    },
    !0
  ]
]);
const It = {};
var Ot = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, r, n) {
    n = this.aWH[r], t[this.aLT[r]] = (e[n] - s[n]) / 2 + _t;
  },
  trigger: function(t, e, s, r) {
    var n = this.CENTER;
    t || (t = n), s || (s = {}), r || (r = {});
    for (var i, l, o = this.rWidth, a, u = t.match(this.rPosition), d = 0, _ = u.length; d < _; d++)
      a = u[d], a != n ? r[a] = 0 : (l = u[(d + 1) % _], i = +!o.test(l), this.css(r, s, e, i), l == a && this.css(r, s, e, +!i));
    return r;
  }
};
function Jt(t) {
  t.onresize || (J.push([Jt, null, t]), t.onresize = !0);
  var e = Q, s = e.clientHeight, r = e.clientWidth, n = t.target, i = t.room, l = t.index, o = t.position, a = t.edge || 7, u = t.arrow || 0, d = t.css, _ = t.space || (t.space = []), p = n.getBoundingClientRect(), f = i.offsetHeight, v = i.offsetWidth, w = et(t.offset) ? 7 : t.offset;
  if (/\s+|center/.test(o)) {
    Ot.trigger(o, i, Q, d);
    return;
  }
  var I = "3,0,2,1".split(Lt), D, x = p.left, E = p.top, O = Math.max(E, a), z = (p.height == Mt ? p.bottom - E : p.height) >> 0, V = (p.width == Mt ? p.right - x : p.width) >> 0, U = r - v - w, H = s - f - w, kt = x < 0 || x + V / 2 > r, St = E < 0 || E + z > s, rt = [
    /* left: 0 */
    St ? -1 : x - v,
    /* top: 1 */
    kt ? -1 : O - f,
    /* right: 2 */
    St ? -1 : U - p.right,
    /* bottom: 3 */
    kt ? -1 : H - p.bottom
  ];
  o && (pt(
    o.split(Lt),
    function(re, K, ht, ne) {
      ne.push(ht[K]);
    },
    Se,
    D = []
  ), I.unshift.apply(I, D)), l = pt(
    I,
    function(re, K, ht) {
      if (ht[K] - a > 0)
        return K;
    },
    rt
  );
  var nt = 0, lt = 0, Tt = 0, Ct = 0;
  if (l == null)
    Ot.trigger("center", i, Q, d);
  else {
    var ot = l == 0 || l == 2;
    nt = Ht(
      ot ? l == 2 ? p.right + w : rt[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      a,
      U
    ), lt = Ht(
      ot ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          O - (f - z) / 2,
          w
        )
      ) : (
        // )
        l == 3 ? E + z + u + w : rt[1] - w
      ),
      a,
      H
    ), ot ? Ct = Math.max(
      O - lt + (z - u) / 2 - u,
      u
    ) : Tt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - nt + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    ), d.left = nt + _t, d.top = lt + _t, d["--tips-arrow-top"] = (z > f ? 0 : Ct) || Rt, d["--tips-arrow-left"] = Tt || Rt;
  }
  let Nt = i.classList, ie = Wt[l], at = _[0];
  (et(at) || at != l) && c([
    [
      /* 移除旧值 */
      ["remove", Nt, Wt[at]],
      /* 添加新值 */
      ["add", Nt, ie]
    ],
    () => {
      _.shift(), _.push(l), t.index = l;
    }
  ]);
}
const dt = document.documentElement, q = (t) => (c(["stopPropagation", "preventDefault"], t), t), Pt = (t) => {
  let e = P(t), s = S(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, ct = "data-tips-scroll", Ae = -1e4, jt = 3, Ft = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), this.$emit("update:visible", t);
  },
  visible: {
    handler: function(t) {
      t === "modal" && (this.proxy_before = !0), this.$nextTick(() => {
        this.__trigger(t);
      });
    },
    immediate: !0
  },
  proxy_before: {
    handler(t) {
      this.$nextTick(() => {
        this.__toggle_append(this.$el);
      });
    },
    immediate: !0
  },
  target: {
    handler(t) {
      let e = S(
        [t],
        yt(
          "0.?.$el|0.$el|0=>el",
          S(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (c(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof Event && (s = e.currentTarget, q(e)), this._event_mark = !1, this._target__ = s, this.visible === !1 && !s.mark && (this.__trigger("click"), s.mark = !0, c([
          [
            "dispatchEvent",
            s,
            new Event("click", {
              bubbles: !1,
              // 允许冒泡
              cancelable: !0
              // 可取消默认行为
            })
          ]
        ]));
      }
    }
  }
}, Ee = {
  name: "Tips",
  components: {
    Card: W
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Ae
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
      default: jt
    }
  },
  watch: Ft,
  data() {
    return {
      css: {
        opacity: 0
      },
      _event_mark: !1,
      _event__: null,
      _timeout__: null,
      _target__: null,
      proxy: !1,
      arrow: 0,
      proxy_before: !1,
      completed: void 0,
      sign: yt("s-tips-{100-999}-{100-999}-{100-999}")
    };
  },
  computed: {
    isSimply: function() {
      return this.target === "";
    },
    isModal() {
      return this.before || this.proxy_before;
    }
  },
  methods: {
    __parent(t) {
      let e = this._target__, s;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), c(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return c(
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
      G(e, this.__css(), !0), Jt({
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
        arrow: this.arrow,
        edge: this.edge
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (this.static || this.isSimply)
        return;
      let s = this.isModal;
      c([
        [
          e ? "removeChild" : s ? "insertBefore" : "appendChild",
          dt,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? c(t.addEventListener, t, "scroll", Z) : (c(Y.observe, Y, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, ct), s || (c(t.addEventListener, t, "scroll", Z), this.__attr(t, ct, "true"))));
      });
    },
    __css() {
      let t = {};
      return this.arrow = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, S(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      et(this.static) || (this.init(), wt.delay = +this.delay, Ne(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          c(t, this, arguments);
        },
        this.delay === jt ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        q(t), this.$emit("toggle", this.proxy = !0);
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
      q(t);
      let e;
      this.$emit("toggle", e = this.proxy = !this.proxy), e || this.__close(t);
    },
    __close(t) {
      let { task: e, host: s, sign: r, modal: n } = Pt(-1);
      if (e !== void 0) {
        if (ze(s.$el, t))
          return q(t);
        if (!s.proxy)
          return P(), r === this.sign ? void 0 : this.__close(t);
        if (c(n) !== void 0)
          return q(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && r == this.sign || (c([e || []]), P());
      }
    },
    __click(t) {
      q(t);
      let e = gt(t), { task: s, sign: r, host: n, modal: i } = Pt(-1);
      c(i) !== void 0 && (s = null);
      let l = r == this.sign;
      this.$attrs.clear === void 0 || (s && c([s]), P()), l || this.__Task(
        t,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), e || this.__toggle(t);
    },
    __Task(t, e, s) {
      P(["__hide", this, t, this.sign, e, s]);
    },
    /* 触发事件 */
    __trigger(t) {
      if (ue(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, (this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [["click", this.__click]],
          modal: [
            [
              "click",
              (s) => {
                this.__close(s), this.__toggle(s), this.__Task(s, () => !0);
              }
            ]
          ],
          enter: [
            ["mouseenter", this.__click]
            // ["click", this.__close, ROOM],
          ]
        }[t]).push(["click", this.__close, dt, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      st(s) || (s = [s]);
      let r = [];
      T(s, (n, i) => {
        let l = 0;
        i[2] === dt && ++l && It.__tipsmark_ || (l && (It.__tipsmark_ = !0), r.push([
          t,
          i[2] || e,
          i[0],
          i[1] || this.__toggle
          // true
        ]));
      }), c(r);
    }
  },
  mounted() {
    Ft.target.handler.call(this, this.target), this._target__ = this._target__ || c("parentNode", this.$el);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Yt(this.__2listener), this.__parent(function(t, e) {
      c(t.removeEventListener, t, "scroll", Z), c(t.removeAttribute, t, ct, void 0), e || c(Y.unobserve, Y, t);
    });
  }
};
function Be(t, e, s, r, n, i) {
  const l = N("Card");
  return n.proxy ? ($(), F(l, g({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": i.isModal
    }],
    "s-tips-completed": n.completed,
    style: s.static ? null : n.css,
    static: s.static ? "" : null,
    onClick: i.__close,
    mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-content-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height,m=>margin"
  }), it({ _: 2 }, [
    X(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, C(R(u)), void 0, !0)
      ])
    }))
  ]), 1040, ["class", "s-tips-completed", "style", "static", "onClick"])) : bt("", !0);
}
const vt = /* @__PURE__ */ M(Ee, [["render", Be], ["__scopeId", "data-v-86a84da5"]]), Le = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return gt(s) ? [] : st(s) ? s : [s];
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
    S(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, r) => {
        if (y("nodeType", e) === 1)
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
function Re(t, e, s, r, n, i) {
  return $(), F(ae(i.tag), g({ ref: "component" }, t.$attrs), {
    default: m(() => [
      ($(!0), j(Ut, null, X(i.column, (l) => h(t.$slots, i.__trigger(l), g({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const xt = /* @__PURE__ */ M(Le, [["render", Re]]);
const Me = {
  name: "Confirm",
  components: {
    Card: W,
    Tips: vt,
    Boom: $t
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
    },
    type: {
      type: String,
      default: ""
    }
  },
  watch: {
    visible: {
      handler(t) {
        this.proxy = t;
      }
      // immediate: true,
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
      this.mark = 1, this.proxy = this.visible;
    },
    emitcancel(t) {
      this.close(), this.$emit("cancel-click", t);
    },
    close() {
      this.proxy = ++this.mark;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, We = { class: "s-confirm-warp" }, He = { flex: "" };
function Ie(t, e, s, r, n, i) {
  const l = N("Card"), o = N("Boom"), a = N("Stream");
  return $(), j("span", We, [
    h(t.$slots, "default", {}, () => [
      h(t.$slots, "ref", {}, void 0, !0),
      h(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    k(a, g({
      is: "Tips",
      columns: { type: s.type },
      visible: t.proxy,
      min: ["auto"],
      class: "s-confirm",
      height: "auto"
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: m(() => [
        h(t.$slots, "el", {}, () => [
          k(l, null, {
            title: m(() => [
              k(l, { class: "s-confirm-title" }, {
                default: m(() => [
                  h(t.$slots, "title", {}, () => [
                    L(B(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: m(() => [
              h(t.$slots, "content", {}, () => [
                L(B(s.content), 1)
              ], !0),
              h(t.$slots, "bottom", {}, () => [
                k(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: ""
                }, {
                  default: m(() => [
                    e[1] || (e[1] = b("span", null, null, -1)),
                    b("span", He, [
                      h(t.$slots, "boom", C(R({
                        close: i.close,
                        submit: s.submit
                      })), () => [
                        h(t.$slots, "cancel", C(R({ click: i.emitcancel, text: s.cancel })), () => [
                          k(o, g({ cancel: "" }, s.cancelAttrs, {
                            onClick: At(i.emitcancel, ["stop"])
                          }), {
                            default: m(() => [
                              L(B(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0),
                        h(t.$slots, "submit", C(R({
                          click: i.close,
                          text: s.submit
                        })), () => [
                          k(o, g({
                            class: "simply",
                            onClick: At(i.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: m(() => [
                              L(B(s.submitAttrs.text || s.submit), 1)
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
      card: m(() => [
        k(l, g(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? i.close(u) : "")
        }), it({ _: 2 }, [
          X(t.$slots, (u, d) => ({
            name: d,
            fn: m((_) => [
              h(t.$slots, d, g(_, { close: i.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const Kt = /* @__PURE__ */ M(Me, [["render", Ie], ["__scopeId", "data-v-1201a34d"]]);
const Oe = {
  name: "Div",
  components: {
    Card: W
  }
};
function Pe(t, e, s, r, n, i) {
  const l = N("Card");
  return $(), F(l, g({ class: "s-div" }, t.$attrs, { height: "auto" }), it({ _: 2 }, [
    X(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, C(R(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Qt = /* @__PURE__ */ M(Oe, [["render", Pe], ["__scopeId", "data-v-5a663869"]]);
const je = {
  name: "Flex",
  components: {
    Card: W
  }
};
function Fe(t, e, s, r, n, i) {
  const l = N("Card");
  return $(), F(l, g({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), it({ _: 2 }, [
    X(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, C(R(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Zt = /* @__PURE__ */ M(je, [["render", Fe], ["__scopeId", "data-v-80afacb2"]]);
let Dt = (t) => t == null || t == null, De = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ve = {
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
      return G(
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
      De(t);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: A,
    trigger(t, e) {
      st(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        T(t, (s, r) => {
          this.$emit(r[0], Dt(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      y(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let s = e.index || T(
              this.flys,
              (r, n, i, l) => {
                if (n[i] == l)
                  return r;
              },
              e.picker,
              e.id
            );
            Dt(s) || this.setindex(s);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      y(
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
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = y(this.direction, t.target), r = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      G(r, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", r]));
      let n = !1;
      this.end = !1, this.__index = r.index, T(
        this.flyweights,
        (i, l, o, a, u, d, _, p, f) => {
          if (o = i / u >> 0, p = o + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % a) + /* 计算轮数, row的倍数 */
          (d / a >> 0)), f = p * u + i % u, f >= this.count) {
            n || (this.end = !0, e.push(["onend"]), n = !0);
            return;
          }
          l.index = p, l.i = f, l.data = this.flys[f];
          let v = [
            /* top */
            p * this.expand + l.x,
            /* left */
            l.space
          ];
          _ && v.reverse(), l.top = v[0], l.left = v[1];
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
      let s = this.scrollx, r = this.flyweight, n = S(r, this.BoxRule);
      this.$nextTick(() => {
        let i = /true/.test(this.auto), [l, o] = this.offset, a = n.width, u = n.height, d = (Bt(this.width, a) || a) + l, _ = Bt(this.height, u) + o, p = [a / d >> 0 || 1, u / _ >> 0 || 1];
        s && p.reverse();
        let [f, v] = p, w = this.padding, I, D = 0, x, E;
        s ? (x = d, d -= l, E = (H) => (
          /* 计算top偏移量 */
          H * (_ - o) + (H + 1) * o
        )) : (i ? (d = (a - l * (f + 2 * w - 1)) / f, I = !w * l, D = w * l) : (I = 0, D = a < d ? 0 : (a % d + l * f) / (f + 1) >> 0, d -= l), E = (H) => H * (d + I) + (H + 1) * D, x = _), this.row = v + 2, this.column = f, this.realH = _ - o, this.realW = d, this.expand = x, this.Size = Math.ceil(t / f) * x;
        let O = Math.min(t, f * this.row), z = O - 1, V;
        for (; O-- > 0; )
          V = z - O, this.$set(e, V, {
            x: l,
            y: o,
            width: d,
            height: _ - o,
            space: E(V % f),
            data: {}
          });
        e.length = z + 1;
        let U = [];
        u / x > z / f && U.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), U.push([
          "update:space",
          {
            row: (z / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(U);
      });
    }
  }
}, Ue = { class: "flyweight-all" };
function qe(t, e, s, r, n, i) {
  const l = N("Card");
  return $(), j("div", {
    ref: "flyweight",
    class: ft(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: s.line && n.__top !== 0
    }]),
    style: tt(i.style),
    onScroll: e[0] || (e[0] = (...o) => i.scroll && i.scroll(...o))
  }, [
    h(t.$slots, "title", C(R(i.bridge)), void 0, !0),
    b("div", Ue, [
      ($(!0), j(Ut, null, X(n.flyweights, (o, a) => ($(), j("div", {
        key: a,
        style: tt({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        h(t.$slots, "default", g({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    h(t.$slots, "mix", C(R(i.bridge)), () => [
      n.flyweights.length ? h(t.$slots, "end", C(g({ key: 0 }, i.bridge)), void 0, !0) : h(t.$slots, "empty", { key: 1 }, () => [
        k(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: m(() => [...e[1] || (e[1] = [
            L(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const te = /* @__PURE__ */ M(Ve, [["render", qe], ["__scopeId", "data-v-1c021354"]]);
let Ge;
const Vt = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
};
let Xe = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Ye = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: W, Stream: xt },
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
      id: yt("input-{1000-9999}-{1000-9999}"),
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
    S(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          y([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), T(["left", "right", "rm"], (t, e, s) => {
      s = y([
        ["$el", this.$refs[e] || ""],
        [e, this.$refs]
      ]), this[e] = y("offsetWidth", s || "") || null;
    }), this.attrs = S(this.$attrs, Xe + this.mix), T(
      this.$attrs,
      (t, e, s) => {
        de(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
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
      T(st(t) ? t : [t], (s, r, n) => {
        T(Vt, (i, l) => {
          i in r && (n = [
            function(o, a, u, d, _, p, f) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = a(u, f, p);
              return _.error = w ? d : Ge;
            },
            this,
            r,
            Vt[i],
            r[i],
            r.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(n);
      }), this.RULE.push(e);
    },
    __runer(t, e) {
      y([this.RULE], null, t, e);
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
}, Je = ["for"], Ke = {
  class: "placeholder",
  flex: ""
}, Qe = {
  class: "s-wrap-tips",
  flex: ""
}, Ze = {
  key: 0,
  class: "s-wrap-limit"
};
function ts(t, e, s, r, n, i) {
  const l = N("Stream"), o = N("Card");
  return $(), F(o, g({
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
      k(l, g({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (a) => t.$emit("focus", a)),
        onChange: i.__change,
        onInput: i.__input,
        onBlur: i.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      b("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        h(t.$slots, "default", {}, () => [
          b("span", Ke, [
            h(t.$slots, "placeholder", {}, () => [
              h(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              L(" " + B(s.placeholder), 1)
            ], !0)
          ]),
          b("span", Qe, [
            h(t.$slots, "tips", { limit: i.limit }, () => [
              h(t.$slots, "icon", { type: "tips" }, void 0, !0),
              L(" " + B(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Je),
      k(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: m(() => [
          h(t.$slots, "right", {}, () => [
            h(t.$slots, "limit", { limit: i.limit }, () => [
              t.$attrs.maxlength ? ($(), j("span", Ze, B(i.limit), 1)) : bt("", !0)
            ], !0),
            b("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...a) => i.close && i.close(...a))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
        ref: "left",
        class: "s-wrap-left",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: m(() => [
          h(t.$slots, "left", {}, () => [
            h(t.$slots, "icon", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: m(() => [
          h(t.$slots, "error", {}, () => [
            L(B(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const ee = /* @__PURE__ */ M(Ye, [["render", ts], ["__scopeId", "data-v-acf70ba2"]]), es = {}, se = [];
se.push($t, W, Kt, Qt, Zt, te, ee, xt, vt);
const ls = { Boom: $t, Card: W, Confirm: Kt, Div: Qt, Flex: Zt, Flyweight: te, Input: ee, Stream: xt, Tips: vt };
es.install = function(t, e = {}) {
  se.forEach((s) => {
    let { global: r, name: n } = s;
    r === !1 || t.component(n, s), t.component("S" + n, s);
  });
};
export {
  $t as Boom,
  W as Card,
  Kt as Confirm,
  Qt as Div,
  Zt as Flex,
  te as Flyweight,
  ee as Input,
  xt as Stream,
  vt as Tips,
  ls as components,
  es as default
};
