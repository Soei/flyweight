import { runer as y, each as T, merge as X, picker as S, isEmpty as bt, isSimplyType as zt, isString as oe, format as $t, isArray as st, array2Json as ae } from "@soei/util";
import { openBlock as $, createElementBlock as j, normalizeClass as mt, normalizeStyle as tt, renderSlot as a, createElementVNode as b, toDisplayString as B, normalizeProps as A, guardReactiveProps as W, resolveComponent as C, createBlock as F, mergeProps as g, createSlots as it, renderList as Y, withCtx as m, createCommentVNode as wt, createTextVNode as L, resolveDynamicComponent as he, Fragment as qt, createVNode as k, withModifiers as At } from "vue";
import { runer as c, isArray as ue, each as _t, isNil as et, isString as de, isFunction as ce } from "@soei/tools";
import fe from "@soei/picker";
let pe = /(\d+|[+\-\*/]|%)/g, Et = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Bt = (t, e) => {
  let s;
  if (s = y("match", t, pe)) {
    let i = s.length, n, r = 0, l, o = [];
    for (; i--; )
      r = s.shift(), r in Et ? (n && o.push(n), r === "%" && (o.length = 2), l = r) : +r && o.push(+r), o.length == 2 && (o.push(e), n = Et[l].apply(null, o), o.length = 0);
    +n || (n = +o.pop()), t = n >> 0;
  }
  return t;
}, z = (t, e) => (t + "").replace(
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
let me = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function gt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Gt = {
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
      X(e, this.$data, this.$props, this.$attrs, "mix"), this._style = S(e, t, (s, i, n, r) => (this.$nextTick(() => {
        y("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), me.test(r) ? z(i) : i));
    },
    immediate: !0
  }
}, _e = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Xt = {};
T(
  _e,
  (t, e, s) => {
    t = gt(e), Xt["--" + gt(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Gt
);
const ge = {
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
      return y("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Gt,
  methods: {
    exec: z,
    isEmpty: bt,
    picker: S,
    runer: y,
    isSimplyType: zt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Xt, t), X(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: gt,
    css(t, e) {
      T(t, (s, i) => {
        let n = i in this ? this[i] : this.default[i];
        !n || this.default[i] == n || (e[s] = z(n));
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
        oe(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, s, i, n) => {
          let r = z(s);
          !r || this.default[n] == r || (this[n] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ye = {
  class: "card-title",
  space: ""
}, be = {
  class: "card-ico-items",
  vcenter: ""
}, $e = { class: "card-content" };
function we(t, e, s, i, n, r) {
  return $(), j("div", {
    class: mt({
      card: t.$attrs.use === void 0
    }),
    key: n.trigger,
    style: tt(r.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        b("div", ye, [
          a(t.$slots, "subtitle", {}, () => [
            b("span", null, B(r.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            b("div", be, [
              a(t.$slots, "icon", A(W({ el: t.$el, picker: r.picker, runer: r.runer })), void 0, !0),
              b("div", {
                class: mt(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
                style: tt(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close"))
              }, [
                a(t.$slots, "close", {}, void 0, !0)
              ], 6)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        b("div", $e, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const M = /* @__PURE__ */ R(ge, [["render", we], ["__scopeId", "data-v-ffe5bdca"]]), Lt = /(?:\,|\|{2})/, yt = "px", Rt = "";
let Q = document.documentElement, Mt, It = ["s-left", "s-top", "s-right", "s-bottom"], ve = { left: 0, top: 1, right: 2, bottom: 3 };
const J = [];
var xe = fe(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let vt = {}, Yt = null;
xe(vt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Yt = ke(() => {
      c(J);
    }, t), this._delay = t;
  }
});
vt.delay = 60;
function ke(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, c(t, this, arguments));
  };
}
const Z = () => {
  Yt();
};
function Wt(t) {
  Jt(t), J.push(t);
}
function Se(t, e) {
  if (!c(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), i = e.x, n = e.y;
  return i > s.left && i < s.left + s.width && n > s.top && n < s.top + s.height;
}
function Jt(t) {
  let e = _t(J, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || J.splice(e, 1);
}
const q = new ResizeObserver(Z);
q.observe(Q);
function Ht(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const ct = [], P = (t) => {
  if (ue(t))
    ct.push(t);
  else
    return +t < 0 ? c(t, ct) : ct.pop();
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
const Ot = {};
var Pt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, n) {
    n = this.aWH[i], t[this.aLT[i]] = (e[n] - s[n]) / 2 + yt;
  },
  trigger: function(t, e, s, i) {
    var n = this.CENTER;
    t || (t = n), s || (s = {}), i || (i = {});
    for (var r, l, o = this.rWidth, h, u = t.match(this.rPosition), d = 0, _ = u.length; d < _; d++)
      h = u[d], h != n ? i[h] = 0 : (l = u[(d + 1) % _], r = +!o.test(l), this.css(i, s, e, r), l == h && this.css(i, s, e, +!r));
    return i;
  }
};
function Kt(t) {
  t.onresize || (J.push([Kt, null, t]), t.onresize = !0);
  var e = Q, s = e.clientHeight, i = e.clientWidth, n = t.target, r = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, d = t.css, _ = t.space || (t.space = []), p = n.getBoundingClientRect(), f = r.offsetHeight, v = r.offsetWidth, w = et(t.offset) ? 7 : t.offset;
  if (/\s+|center/.test(o)) {
    Pt.trigger(o, r, Q, d);
    return;
  }
  var H = "3,0,2,1".split(Lt), D, x = p.left, E = p.top, O = Math.max(E, h), N = (p.height == Mt ? p.bottom - E : p.height) >> 0, V = (p.width == Mt ? p.right - x : p.width) >> 0, U = i - v - w, I = s - f - w, St = x < 0 || x + V / 2 > i, Tt = E < 0 || E + N > s, nt = [
    /* left: 0 */
    Tt ? -1 : x - v,
    /* top: 1 */
    St ? -1 : O - f,
    /* right: 2 */
    Tt ? -1 : U - p.right,
    /* bottom: 3 */
    St ? -1 : I - p.bottom
  ];
  o && (_t(
    o.split(Lt),
    function(ne, K, dt, le) {
      le.push(dt[K]);
    },
    ve,
    D = []
  ), H.unshift.apply(H, D)), l = _t(
    H,
    function(ne, K, dt) {
      if (dt[K] - h > 0)
        return K;
    },
    nt
  );
  var lt = 0, ot = 0, Ct = 0, at = 0;
  if (l == null)
    Pt.trigger("center", r, Q, d);
  else {
    var ht = l == 0 || l == 2;
    lt = Ht(
      ht ? l == 2 ? p.right + w : nt[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      h,
      U
    ), ot = Ht(
      ht ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          O - (f - N) / 2,
          w
        )
      ) : (
        // )
        l == 3 ? E + N + u + w : nt[1] - w
      ),
      h,
      I
    ), ht ? at = Math.max(
      O - ot + (N - u) / 2 - u,
      u
    ) : Ct = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - lt + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    ), d.left = lt + yt, d.top = ot + yt, d["--tips-arrow-top"] = (N > f, at || Rt), d["--tips-arrow-left"] = Ct || Rt;
  }
  let Nt = r.classList, re = It[l], ut = _[0];
  (et(ut) || ut != l) && c([
    [
      /* 移除旧值 */
      ["remove", Nt, It[ut]],
      /* 添加新值 */
      ["add", Nt, re]
    ],
    () => {
      _.shift(), _.push(l), t.index = l;
    }
  ]);
}
const ft = document.documentElement, G = (t) => (c(["stopPropagation", "preventDefault"], t), t), jt = (t) => {
  let e = P(t), s = S(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, pt = "data-tips-scroll", Te = -1e4, Ft = 3, Dt = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let e = 1e3, s = 0, i = +this.timer;
    t === !0 && i && (this.t = i / e, this._timer__ = setInterval(() => {
      this.t = Math.max(i - ++s * e, 0) / e, s * e >= i && (this.proxy = !1, clearInterval(this._timer__));
    }, e)), this.$emit("update:visible", t);
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
        $t(
          "0.?.$el|0.$el|0=>el",
          S(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (c(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof Event && (s = e.currentTarget, G(e)), this._event_mark = !1, this._target__ = s, this.visible === !1 && !s.mark && (this.__trigger("click"), s.mark = !0, c([
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
}, Ce = {
  name: "Tips",
  components: {
    Card: M
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Te
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
      default: Ft
    },
    timer: {
      type: [String, Number]
    }
  },
  watch: Dt,
  data() {
    return {
      css: {
        opacity: 0
      },
      _event_mark: !1,
      _event__: null,
      _timeout__: null,
      _target__: null,
      _timer__: null,
      _rank__: null,
      t: 0,
      proxy: !1,
      arrow: 0,
      proxy_before: !1,
      completed: void 0,
      sign: $t("s-tips-{100-999}-{100-999}-{100-999}")
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
      X(e, this.__css(), !0), Kt({
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
          ft,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? c(t.addEventListener, t, "scroll", Z) : (c(q.observe, q, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, pt), s || (c(t.addEventListener, t, "scroll", Z), this.__attr(t, pt, "true"))));
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
      if (et(this.static))
        return;
      Wt(this.init), vt.delay = +this.delay, Wt(this.__2listener), this.__toggle_append(this.$el);
      let t = this._rank__ = [[["observe", q]], null, this.$el];
      c.apply(null, t), t[0][0][0] = "unobserve";
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          c(t, this, arguments);
        },
        this.delay === Ft ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        G(t), this.$emit("toggle", this.proxy = !0);
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
      G(t);
      let e;
      this.$emit("toggle", e = this.proxy = !this.proxy), e || this.__close(t);
    },
    __close(t) {
      let { task: e, host: s, sign: i, modal: n } = jt(-1);
      if (e !== void 0) {
        if (Se(s.$el, t))
          return G(t);
        if (!s.proxy)
          return P(), i === this.sign ? void 0 : this.__close(t);
        if (c(n) !== void 0)
          return G(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && i == this.sign || (c([e || []]), P());
      }
    },
    __click(t) {
      G(t);
      let e = bt(t), { task: s, sign: i, host: n, modal: r } = jt(-1);
      c(r) !== void 0 && (s = null);
      let l = i == this.sign;
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
      if (de(t)) {
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
        }[t]).push(["click", this.__close, ft, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      st(s) || (s = [s]);
      let i = [];
      T(s, (n, r) => {
        let l = 0;
        r[2] === ft && ++l && Ot.__tipsmark_ || (l && (Ot.__tipsmark_ = !0), i.push([
          t,
          r[2] || e,
          r[0],
          r[1] || this.__toggle
          // true
        ]));
      }), c(i);
    }
  },
  mounted() {
    Dt.target.handler.call(this, this.target), this._target__ = this._target__ || c("parentNode", this.$el);
  },
  beforeUnmount() {
  },
  unmounted() {
    c.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Jt(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      c(t.removeEventListener, t, "scroll", Z), c(t.removeAttribute, t, pt, void 0), e || c(q.unobserve, q, t);
    });
  }
};
function Ne(t, e, s, i, n, r) {
  const l = C("Card");
  return n.proxy ? ($(), F(l, g({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": r.isModal
    }],
    "s-tips-completed": n.completed,
    style: s.static ? null : n.css,
    static: s.static ? "" : null,
    onClick: r.__close,
    mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height,m=>margin"
  }), it({ _: 2 }, [
    Y(t.$slots, (o, h) => ({
      name: h,
      fn: m((u) => [
        a(t.$slots, h, g(u, { t: n.t }), void 0, !0)
      ])
    }))
  ]), 1040, ["class", "s-tips-completed", "style", "static", "onClick"])) : wt("", !0);
}
const rt = /* @__PURE__ */ R(Ce, [["render", Ne], ["__scopeId", "data-v-0a909072"]]);
const ze = {
  name: "Boom",
  emits: ["click"],
  components: { Card: M, Tips: rt },
  data: function() {
    return {
      mix: "m=>margin,c|color=>--s-button-text-color,fs=>font-size,lh=>line-height,miw|minw=>min-width,mih|minh=>min-height,mw|maxw=>max-width,mh|maxh=>max-height,h=>height,w=>width,p=>padding,br=>--s-button-border-radius,bg=>--s-button-color,bg=>--s-button-shadow-color"
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
}, Ae = ["disabled"];
function Ee(t, e, s, i, n, r) {
  const l = C("Tips"), o = C("Card");
  return $(), F(o, {
    class: "s-button",
    use: "",
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    "inline-block": ""
  }, {
    default: m(() => [
      b("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          b("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = L("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, Ae),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? ($(), F(l, A(g({ key: 0 }, t.$attrs.tips)), null, 16)) : wt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix"]);
}
const xt = /* @__PURE__ */ R(ze, [["render", Ee], ["__scopeId", "data-v-7752eaef"]]), Be = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return bt(s) ? [] : st(s) ? s : [s];
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
      (t, e, s, i) => {
        if (y("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let n in e)
            /^\$/.test(n) && X(this.Ref, e[n]);
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
function Le(t, e, s, i, n, r) {
  return $(), F(he(r.tag), g({ ref: "component" }, t.$attrs), {
    default: m(() => [
      ($(!0), j(qt, null, Y(r.column, (l) => a(t.$slots, r.__trigger(l), g({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const kt = /* @__PURE__ */ R(Be, [["render", Le]]);
const Re = {
  name: "Confirm",
  components: {
    Card: M,
    Tips: rt,
    Boom: xt
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
}, Me = { class: "s-confirm-warp" }, Ie = { flex: "" };
function We(t, e, s, i, n, r) {
  const l = C("Card"), o = C("Boom"), h = C("Stream");
  return $(), j("span", Me, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "ref", {}, void 0, !0),
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    k(h, g({
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
        a(t.$slots, "el", {}, () => [
          k(l, {
            flex: "",
            column: ""
          }, {
            title: m(() => [
              k(l, {
                class: "s-confirm-title",
                height: "auto"
              }, {
                default: m(() => [
                  a(t.$slots, "title", {}, () => [
                    L(B(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: m(() => [
              a(t.$slots, "content", {}, () => [
                L(B(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                k(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: "",
                  height: "auto"
                }, {
                  default: m(() => [
                    e[1] || (e[1] = b("span", null, null, -1)),
                    b("span", Ie, [
                      a(t.$slots, "boom", A(W({
                        close: r.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", A(W({ click: r.emitcancel, text: s.cancel })), () => [
                          k(o, g({ cancel: "" }, s.cancelAttrs, {
                            onClick: At(r.emitcancel, ["stop"])
                          }), {
                            default: m(() => [
                              a(t.$slots, "can", { text: s.cancel }, void 0, !0),
                              L(" " + B(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 3
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", A(W({
                          click: r.close,
                          text: s.submit
                        })), () => [
                          k(o, g({
                            class: "simply",
                            onClick: At(r.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: m(() => [
                              a(t.$slots, "sub", { text: s.submit }, void 0, !0),
                              L(" " + B(s.submitAttrs.text || s.submit), 1)
                            ]),
                            _: 3
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
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? r.close(u) : "")
        }), it({ _: 2 }, [
          Y(t.$slots, (u, d) => ({
            name: d,
            fn: m((_) => [
              a(t.$slots, d, g(_, { close: r.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const Qt = /* @__PURE__ */ R(Re, [["render", We], ["__scopeId", "data-v-ec9d97ab"]]);
const He = {
  name: "Div",
  components: {
    Card: M
  }
};
function Oe(t, e, s, i, n, r) {
  const l = C("Card");
  return $(), F(l, g({ class: "s-div" }, t.$attrs, { height: "auto" }), it({ _: 2 }, [
    Y(t.$slots, (o, h) => ({
      name: h,
      fn: m((u) => [
        a(t.$slots, h, A(W(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Zt = /* @__PURE__ */ R(He, [["render", Oe], ["__scopeId", "data-v-5a663869"]]);
const Pe = {
  name: "Flex",
  components: {
    Card: M
  }
};
function je(t, e, s, i, n, r) {
  const l = C("Card");
  return $(), F(l, g({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), it({ _: 2 }, [
    Y(t.$slots, (o, h) => ({
      name: h,
      fn: m((u) => [
        a(t.$slots, h, A(W(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const te = /* @__PURE__ */ R(Pe, [["render", je], ["__scopeId", "data-v-80afacb2"]]);
let Vt = (t) => t == null || t == null, Fe = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const De = {
  name: "Flyweight",
  components: {
    Card: M
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
      return X(
        i,
        {
          "--width": z(this.realW),
          "--height": z(this.realH),
          "--flyweight-content": z(s)
        },
        e && {
          "--flyweight-h": z(e)
        },
        t && {
          "--flyweight-w": z(t)
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
      Fe(t);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: z,
    trigger(t, e) {
      st(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        T(t, (s, i) => {
          this.$emit(i[0], Vt(i[1]) ? !0 : i[1]);
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
              (i, n, r, l) => {
                if (n[r] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            Vt(s) || this.setindex(s);
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
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = y(this.direction, t.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      X(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let n = !1;
      this.end = !1, this.__index = i.index, T(
        this.flyweights,
        (r, l, o, h, u, d, _, p, f) => {
          if (o = r / u >> 0, p = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), f = p * u + r % u, f >= this.count) {
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
      let s = this.scrollx, i = this.flyweight, n = S(i, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [l, o] = this.offset, h = n.width, u = n.height, d = (Bt(this.width, h) || h) + l, _ = Bt(this.height, u) + o, p = [h / d >> 0 || 1, u / _ >> 0 || 1];
        s && p.reverse();
        let [f, v] = p, w = this.padding, H, D = 0, x, E;
        s ? (x = d, d -= l, E = (I) => (
          /* 计算top偏移量 */
          I * (_ - o) + (I + 1) * o
        )) : (r ? (d = (h - l * (f + 2 * w - 1)) / f, H = !w * l, D = w * l) : (H = 0, D = h < d ? 0 : (h % d + l * f) / (f + 1) >> 0, d -= l), E = (I) => I * (d + H) + (I + 1) * D, x = _), this.row = v + 2, this.column = f, this.realH = _ - o, this.realW = d, this.expand = x, this.Size = Math.ceil(t / f) * x;
        let O = Math.min(t, f * this.row), N = O - 1, V;
        for (; O-- > 0; )
          V = N - O, this.$set(e, V, {
            x: l,
            y: o,
            width: d,
            height: _ - o,
            space: E(V % f),
            data: {}
          });
        e.length = N + 1;
        let U = [];
        u / x > N / f && U.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), U.push([
          "update:space",
          {
            row: (N / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(U);
      });
    }
  }
}, Ve = { class: "flyweight-all" };
function Ue(t, e, s, i, n, r) {
  const l = C("Card");
  return $(), j("div", {
    ref: "flyweight",
    class: mt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: s.line && n.__top !== 0
    }]),
    style: tt(r.style),
    onScroll: e[0] || (e[0] = (...o) => r.scroll && r.scroll(...o))
  }, [
    a(t.$slots, "title", A(W(r.bridge)), void 0, !0),
    b("div", Ve, [
      ($(!0), j(qt, null, Y(n.flyweights, (o, h) => ($(), j("div", {
        key: h,
        style: tt({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", g({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", A(W(r.bridge)), () => [
      n.flyweights.length ? a(t.$slots, "end", A(g({ key: 0 }, r.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
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
const ee = /* @__PURE__ */ R(De, [["render", Ue], ["__scopeId", "data-v-1c021354"]]);
let qe;
const Ut = {
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
  components: { Card: M, Stream: kt },
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
      id: $t("input-{1000-9999}-{1000-9999}"),
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
    }), this.attrs = S(this.$attrs, Ge + this.mix), T(
      this.$attrs,
      (t, e, s) => {
        ce(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
          "$attrs." + t,
          (i) => {
            this.inputAttrs[t] = i;
          },
          { immediate: !0 }
        );
      },
      ae("maxlength,type,disabled,readonly")
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
      T(st(t) ? t : [t], (s, i, n) => {
        T(Ut, (r, l) => {
          r in i && (n = [
            function(o, h, u, d, _, p, f) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = h(u, f, p);
              return _.error = w ? d : qe;
            },
            this,
            i,
            Ut[r],
            i[r],
            i.message,
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
function Ze(t, e, s, i, n, r) {
  const l = C("Stream"), o = C("Card");
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
        onFocus: e[0] || (e[0] = (h) => t.$emit("focus", h)),
        onChange: r.__change,
        onInput: r.__input,
        onBlur: r.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      b("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          b("span", Je, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              L(" " + B(s.placeholder), 1)
            ], !0)
          ]),
          b("span", Ke, [
            a(t.$slots, "tips", { limit: r.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              L(" " + B(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Ye),
      k(o, {
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
              t.$attrs.maxlength ? ($(), j("span", Qe, B(r.limit), 1)) : wt("", !0)
            ], !0),
            b("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => r.close && r.close(...h))
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
          a(t.$slots, "left", {}, () => [
            a(t.$slots, "icon", {}, void 0, !0)
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
          a(t.$slots, "error", {}, () => [
            L(B(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const se = /* @__PURE__ */ R(Xe, [["render", Ze], ["__scopeId", "data-v-8ca5d9dd"]]), ts = {}, ie = [];
ie.push(xt, M, Qt, Zt, te, ee, se, kt, rt);
const ns = { Boom: xt, Card: M, Confirm: Qt, Div: Zt, Flex: te, Flyweight: ee, Input: se, Stream: kt, Tips: rt };
ts.install = function(t, e = {}) {
  ie.forEach((s) => {
    let { global: i, name: n } = s;
    i === !1 || t.component(n, s), t.component("S" + n, s);
  });
};
export {
  xt as Boom,
  M as Card,
  Qt as Confirm,
  Zt as Div,
  te as Flex,
  ee as Flyweight,
  se as Input,
  kt as Stream,
  rt as Tips,
  ns as components,
  ts as default
};
