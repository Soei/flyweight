import { runer as g, take as Gt, each as S, merge as Y, isEmpty as $t, picker as H, isSimplyType as zt, isString as ae, format as wt, isArray as rt, array2Json as he } from "@soei/util";
import { openBlock as $, createElementBlock as j, normalizeClass as st, normalizeStyle as X, renderSlot as a, createElementVNode as b, toDisplayString as E, normalizeProps as A, guardReactiveProps as W, resolveComponent as T, createBlock as F, createSlots as nt, renderList as J, withCtx as p, mergeProps as y, createCommentVNode as vt, createTextVNode as L, resolveDynamicComponent as ue, Fragment as Yt, createVNode as k, withModifiers as Et } from "vue";
import { runer as d, isArray as de, each as gt, isNil as it, isString as ce, isFunction as fe } from "@soei/tools";
import _e from "@soei/picker";
let pe = /(\d+|[+\-\*/]|%)/g, Lt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Bt = (t, e) => {
  let s;
  if (s = g("match", t, pe)) {
    let i = s.length, r, n = 0, l, o = [];
    for (; i--; )
      n = s.shift(), n in Lt ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(e), r = Lt[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), t = r >> 0;
  }
  return t;
}, N = (t, e) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
), yt = (() => Gt)();
const B = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, r] of e)
    s[i] = r;
  return s;
};
let me = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function bt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Jt = {
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
      Y(e, this.$data, this.$props, this.$attrs, "mix"), this._style = yt(e, t, (s, i, r) => (this.$nextTick(() => {
        g("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), me.test(r) ? N(i) : i));
    },
    immediate: !0
  }
}, ge = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Xt = {};
S(
  ge,
  (t, e, s) => {
    t = bt(e), Xt["--" + bt(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Jt
);
const ye = {
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
      default: "m=>offset,p|padding=>padding,bg|bgc=>background,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>border-radius,overflow"
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
      return g("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Jt,
  methods: {
    exec: N,
    isEmpty: $t,
    picker: H,
    runer: g,
    isSimplyType: zt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Xt, t), Y(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: bt,
    css(t, e) {
      S(t, (s, i) => {
        let r = i in this ? this[i] : this.default[i];
        !r || this.default[i] == r || (e[s] = N(r));
      });
    },
    change(t) {
      zt(t) || (this.closecss = yt(
        t,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      yt(
        ae(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (e, s, i) => {
          let r = N(s);
          !r || this.default[i] == r || (this[i] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, be = {
  class: "card-title",
  space: "",
  vc: ""
}, $e = {
  class: "card-ico-items",
  vcenter: ""
}, we = { class: "card-content" };
function ve(t, e, s, i, r, n) {
  return $(), j("div", {
    class: st({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: X(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        b("div", be, [
          a(t.$slots, "subtitle", {}, () => [
            b("span", null, E(n.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            b("div", $e, [
              a(t.$slots, "icon", A(W({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              b("div", {
                class: st(["card-close", { hide: n.isSimplyType(s.close) ? !s.close : !1 }]),
                style: X(r.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close"))
              }, [
                a(t.$slots, "close", {}, void 0, !0)
              ], 6)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        b("div", we, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const M = /* @__PURE__ */ B(ye, [["render", ve], ["__scopeId", "data-v-4fe6147b"]]), Mt = /(?:\,|\|{2})/, Rt = "";
let tt = document.documentElement, Wt, Ht = ["s-left", "s-top", "s-right", "s-bottom"], xe = { left: 0, top: 1, right: 2, bottom: 3 };
const K = [];
var ke = _e(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let xt = {}, Kt = null;
ke(xt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Kt = Se(() => {
      d(K);
    }, t), this._delay = t;
  }
});
xt.delay = 60;
function Se(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, d(t, this, arguments));
  };
}
const et = () => {
  Kt();
};
function It(t) {
  Qt(t), K.push(t);
}
function Te(t, e) {
  if (!d(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), i = e.x, r = e.y;
  return i > s.left && i < s.left + s.width && r > s.top && r < s.top + s.height;
}
function Qt(t) {
  let e = gt(K, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || K.splice(e, 1);
}
const U = new ResizeObserver(et);
U.observe(tt);
function Ot(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const _t = [], P = (t) => {
  if (de(t))
    _t.push(t);
  else
    return +t < 0 ? d(t, _t) : _t.pop();
};
d([
  [
    "addEventListener",
    window,
    "keydown",
    function(t) {
      if (t.keyCode === 27) {
        d(["stopPropagation", "preventDefault"], t);
        let e = P(-1);
        e && d([[e[4]]]) === void 0 && d([P()]);
      }
    },
    !0
  ]
]);
const Pt = {};
var pt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  aLTM: ["--l", "--t"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, r) {
    r = this.aWH[i], t[this.aLTM[i]] = (e[r] - s[r]) / 2;
  },
  trigger: function(t, e, s, i) {
    var r = this.CENTER;
    t || (t = r), s || (s = {}), i || (i = {});
    for (var n, l, o = this.rWidth, h, u = t.match(this.rPosition), c = 0, m = u.length; c < m; c++)
      h = u[c], h != r ? i[h] = 0 : (l = u[(c + 1) % m], n = +!o.test(l), this.css(i, s, e, n), l == h && this.css(i, s, e, +!n));
    return i;
  }
};
function Zt(t) {
  t.onresize || (K.push([Zt, null, t]), t.onresize = !0);
  var e = tt, s = e.clientHeight, i = e.clientWidth, r = t.target, n = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, c = t.css, m = t.space || (t.space = []);
  if (c["--tips-h--"] = s, /\s+|center/.test(o)) {
    pt.trigger(o, n, tt, c);
    return;
  }
  var _ = r.getBoundingClientRect(), f = n.offsetHeight, v = n.offsetWidth, w = it(t.offset) ? 7 : t.offset, I = "3,0,2,1".split(Mt), D, x = _.left, z = _.top, O = Math.max(z, h), C = (_.height == Wt ? _.bottom - z : _.height) >> 0, V = (_.width == Wt ? _.right - x : _.width) >> 0, q = i - v - w, R = s - f - w, Tt = x < 0 || x + V / 2 > i, Ct = z < 0 || z + C > s, ot = [
    /* left: 0 */
    Ct ? -1 : x - v,
    /* top: 1 */
    Tt ? -1 : O - f,
    /* right: 2 */
    Ct ? -1 : q - _.right,
    /* bottom: 3 */
    Tt ? -1 : R - _.bottom
  ];
  o && (gt(
    o.split(Mt),
    function(Q, Z, ft, oe) {
      oe.push(ft[Z]);
    },
    xe,
    D = []
  ), I.unshift.apply(I, D)), l = gt(
    I,
    function(Q, Z, ft) {
      if (ft[Z] - h > 0)
        return Z;
    },
    ot
  );
  var at = 0, ht = 0, Nt = 0, ut = 0;
  if (l == null)
    pt.trigger("center", n, tt, c);
  else {
    var dt = l == 0 || l == 2;
    at = Ot(
      dt ? l == 2 ? _.right + w : ot[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      h,
      q
    ), ht = Ot(
      dt ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          O - (f - C) / 2,
          w
        )
      ) : (
        // )
        l == 3 ? z + C + u + w : ot[1] - w
      ),
      h,
      R
    ), dt ? ut = Math.max(
      O - ht + (C - u) / 2 - u,
      u
    ) : Nt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - at + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    );
    let Q = pt.aLTM;
    c[Q[0]] = at, c[Q[1]] = ht, c["--tips-arrow-top"] = (C > f, ut || Rt), c["--tips-arrow-left"] = Nt || Rt;
  }
  let At = n.classList, le = Ht[l], ct = m[0];
  (it(ct) || ct != l) && d([
    [
      /* 移除旧值 */
      ["remove", At, Ht[ct]],
      /* 添加新值 */
      ["add", At, le]
    ],
    () => {
      m.shift(), m.push(l), t.index = l;
    }
  ]);
}
const jt = document.documentElement, G = (t) => (d(["stopPropagation", "preventDefault"], t), t), Ft = (t) => {
  let e = P(t), s = H(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, mt = "data-tips-scroll", Ce = -1e4, Dt = 3, Vt = {
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
      let e = H(
        [t],
        wt(
          "0.?.$el|0.$el|0=>el",
          H(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (d(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof Event && (s = e.currentTarget, G(e)), this._event_mark = !1, this._target__ = s, s.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), s.mark = !0;
        });
      }
    }
  }
}, Ne = {
  name: "Tips",
  components: {
    Card: M
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Ce
    },
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !1
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
      default: Dt
    },
    timer: {
      type: [String, Number]
    }
  },
  watch: Vt,
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
      _t__: 0,
      _task__: !1,
      t: 0,
      proxy: !1,
      arrow: 0,
      proxy_before: !1,
      completed: void 0,
      sign: wt("s-tips-{1-9}-{10-99}-{1-9}")
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
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), d(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return d(
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
      Y(e, this.__css(), !0), Zt({
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
        offset: it(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this.arrow,
        edge: this.edge
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (this.static || this.isSimply)
        return;
      let s = this.isModal, i = Gt(this.$attrs, "append-to-*|append-to=>*", (l) => {
        d("removeAttribute", t, l);
      }), r;
      for (let l in i) {
        r = (i[l] || l).replace(/_/, ".");
        break;
      }
      if (e)
        return d([["removeChild", t.parentNode, t]]);
      let n = document;
      r = r && n.querySelector(r + " :nth-child(1)") || n.body, d([
        [
          s ? "insertBefore" : "appendChild",
          r.parentNode,
          t,
          s ? r : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? d(t.addEventListener, t, "scroll", et) : (d(U.observe, U, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, mt), s || (d(t.addEventListener, t, "scroll", et), this.__attr(t, mt, "true"))));
      });
    },
    __css() {
      let t = {};
      return this.arrow = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, H(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      if (it(this.static))
        return;
      this.init(), It(this.init), xt.delay = +this.delay, It(this.__2listener), this.__toggle_append(this.$el);
      let t = this._rank__ = [[["observe", U]], null, this.$el];
      d.apply(null, t), t[0][0][0] = "unobserve";
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(t, this, arguments);
        },
        this.delay === Dt ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        G(t), this.__Task(t), this.$emit("toggle", this.proxy = !0);
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
      let { task: e, host: s, sign: i, modal: r } = Ft(-1);
      if (e !== void 0) {
        if (Te(s.$el, t))
          return G(t);
        if (!s.proxy)
          return P(), s._task__ = !1, i === this.sign ? void 0 : this.__close(t);
        if (d(r) !== void 0)
          return G(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && i == this.sign || (d([e || []]), P(), s._task__ = !1);
      }
    },
    __click(t) {
      G(t);
      let e = $t(t), { task: s, sign: i, host: r, modal: n } = Ft(-1);
      d(n) !== void 0 && (s = null);
      let l = i == this.sign;
      this.$attrs.clear === void 0 || (s && d([s]), P()), l || this.__Task(
        t,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), e || this.__toggle(t);
    },
    __Task(t, e, s) {
      this._task__ || (this._task__ = !0, P(["__hide", this, t, this.sign, e, s]));
    },
    __nextTick(t) {
      let e = () => {
        let s = this.$el;
        if (s.nodeType == 8)
          return requestAnimationFrame(e);
        d([
          [t],
          [
            "addEventListener",
            s,
            "mouseenter",
            () => {
              clearTimeout(this._t__);
            }
          ],
          ["addEventListener", s, "mouseleave", this.__hide]
        ]);
      };
      requestAnimationFrame(e);
    },
    /* 触发事件 */
    __trigger(t) {
      if (ce(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, (this._event__ = {
          hover: [
            /* 鼠标进入 */
            [
              "mouseenter",
              (s) => {
                this.__visible(s), this.__nextTick();
              }
            ],
            [
              "mouseleave",
              (s) => {
                this._t__ = setTimeout(() => {
                  this.__hide(s);
                }, 0.1 * 1e3);
              }
            ],
            [
              "mouseenter",
              () => {
                clearTimeout(this._t__);
              }
            ]
          ],
          // hover: [
          //   /* 鼠标进入 */
          //   ["mouseenter", this.__visible],
          //   /* 鼠标离开 */
          //   ["mouseleave", this.__hide],
          // ],
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
            ["mouseenter", this.__visible]
            // ["click", this.__close, ROOM],
          ]
        }[t]).push(["click", this.__close, jt, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      rt(s) || (s = [s]);
      let i = [];
      S(s, (r, n) => {
        let l = 0;
        n[2] === jt && ++l && Pt.__tipsmark_ || (l && (Pt.__tipsmark_ = !0), i.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), d(i);
    }
  },
  mounted() {
    Vt.target.handler.call(this, this.target), this._target__ = this._target__ || d("parentNode", this.$el);
  },
  beforeUnmount() {
    d.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Qt(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      d(t.removeEventListener, t, "scroll", et), d(t.removeAttribute, t, mt, void 0), e || d(U.unobserve, U, t);
    });
  }
};
function Ae(t, e, s, i, r, n) {
  const l = T("Card");
  return r.proxy ? ($(), F(l, {
    key: 0,
    class: st(["tips", {
      "tips-fly": n.isModal
    }]),
    "s-tips-completed": r.completed,
    style: X(s.static ? null : r.css),
    static: s.static ? "" : null,
    onClick: n.__close,
    mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>--w-,minh|min.1=>--h-,maxw|max.0=>--w--,maxh|max.1=>--h--,m=>margin"
  }, nt({ _: 2 }, [
    J(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, y(u, { t: r.t }), void 0, !0)
      ])
    }))
  ]), 1032, ["class", "s-tips-completed", "style", "static", "onClick"])) : vt("", !0);
}
const lt = /* @__PURE__ */ B(Ne, [["render", Ae], ["__scopeId", "data-v-4f47906d"]]);
const ze = {
  name: "Boom",
  emits: ["click"],
  components: { Card: M, Tips: lt },
  data: function() {
    return {
      mix: "p,h,w,c|color=>--s-button-text-color,fs=>font-size,lh=>line-height,miw|minw=>min-width,mih|minh=>min-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>--s-button-border-radius,bg=>--s-button-color,bg=>--s-button-shadow-color,offset,m=>--2-m,padding:--d-padding"
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
      S("disabled visible tips".split(/\s+/g), (t, e) => {
        g("removeAttribute", this.$el, e);
      });
    }
  }
}, Ee = ["disabled"];
function Le(t, e, s, i, r, n) {
  const l = T("Tips"), o = T("Card");
  return $(), F(o, {
    class: "s-button",
    use: "",
    mix: t.mix,
    center: "",
    space: "",
    vc: ""
  }, {
    default: p(() => [
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
      ], 8, Ee),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? ($(), F(l, A(y({ key: 0 }, t.$attrs.tips)), null, 16)) : vt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix"]);
}
const kt = /* @__PURE__ */ B(ze, [["render", Le], ["__scopeId", "data-v-e76a6880"]]), Be = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return $t(s) ? [] : rt(s) ? s : [s];
    },
    tag() {
      return this.is || this.$attrs.type || "span";
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
    H(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, i) => {
        if (g("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let r in e)
            /^\$/.test(r) && Y(this.Ref, e[r]);
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
function Me(t, e, s, i, r, n) {
  return $(), F(ue(n.tag), y({ ref: "component" }, t.$attrs), {
    default: p(() => [
      ($(!0), j(Yt, null, J(n.column, (l) => a(t.$slots, n.__trigger(l), y({ ref_for: !0 }, l))), 256))
    ]),
    _: 3
  }, 16);
}
const St = /* @__PURE__ */ B(Be, [["render", Me]]);
const Re = {
  name: "Confirm",
  components: {
    Card: M,
    Tips: lt,
    Boom: kt
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
    titleAttrs: {
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
function Ie(t, e, s, i, r, n) {
  const l = T("Card"), o = T("Boom"), h = T("Stream");
  return $(), j("span", We, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "ref", {}, void 0, !0),
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    k(h, y({
      is: "Tips",
      columns: { type: s.type },
      visible: t.proxy,
      min: ["auto"],
      class: "s-confirm",
      height: "auto"
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: p(() => [
        a(t.$slots, "el", {}, () => [
          k(l, {
            flex: "",
            column: ""
          }, {
            title: p(() => [
              k(l, y({
                class: "s-confirm-title",
                height: "auto"
              }, s.titleAttrs), {
                default: p(() => [
                  a(t.$slots, "title", {}, () => [
                    L(E(s.title), 1)
                  ], !0)
                ]),
                _: 3
              }, 16)
            ]),
            content: p(() => [
              a(t.$slots, "content", {}, () => [
                L(E(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                k(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: "",
                  height: "auto"
                }, {
                  default: p(() => [
                    e[1] || (e[1] = b("span", null, null, -1)),
                    b("span", He, [
                      a(t.$slots, "boom", A(W({
                        close: n.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", A(W({ click: n.emitcancel, text: s.cancel })), () => [
                          k(o, y({ cancel: "" }, s.cancelAttrs, {
                            onClick: Et(n.emitcancel, ["stop"])
                          }), {
                            default: p(() => [
                              a(t.$slots, "can", { text: s.cancel }, void 0, !0),
                              L(" " + E(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 3
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", A(W({
                          click: n.close,
                          text: s.submit
                        })), () => [
                          k(o, y({
                            class: "simply",
                            onClick: Et(n.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: p(() => [
                              a(t.$slots, "sub", { text: s.submit }, void 0, !0),
                              L(" " + E(s.submitAttrs.text || s.submit), 1)
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
      card: p(() => [
        k(l, y(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? n.close(u) : "")
        }), nt({ _: 2 }, [
          J(t.$slots, (u, c) => ({
            name: c,
            fn: p((m) => [
              a(t.$slots, c, y(m, { close: n.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const te = /* @__PURE__ */ B(Re, [["render", Ie], ["__scopeId", "data-v-de1fbaff"]]);
const Oe = {
  name: "Div",
  components: {
    Card: M
  }
};
function Pe(t, e, s, i, r, n) {
  const l = T("Card");
  return $(), F(l, {
    class: "s-div",
    height: "auto"
  }, nt({ _: 2 }, [
    J(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, A(W(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const ee = /* @__PURE__ */ B(Oe, [["render", Pe], ["__scopeId", "data-v-90c20b5d"]]);
const je = {
  name: "Flex",
  components: {
    Card: M
  }
};
function Fe(t, e, s, i, r, n) {
  const l = T("Card");
  return $(), F(l, {
    class: "s-flex",
    flex: "",
    height: "auto"
  }, nt({ _: 2 }, [
    J(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, A(W(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const se = /* @__PURE__ */ B(je, [["render", Fe], ["__scopeId", "data-v-13b2463f"]]);
let qt = (t) => t == null || t == null, De = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ve = {
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
      return Y(
        i,
        {
          "--width": N(this.realW),
          "--height": N(this.realH),
          "--flyweight-content": N(s)
        },
        e && {
          "--flyweight-h": N(e)
        },
        t && {
          "--flyweight-w": N(t)
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
      De(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: N,
    trigger(t, e) {
      rt(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        S(t, (s, i) => {
          this.$emit(i[0], qt(i[1]) ? !0 : i[1]);
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
            let s = e.index || S(
              this.flys,
              (i, r, n, l) => {
                if (r[n] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            qt(s) || this.setindex(s);
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
              let s = e / this.column >> 0, i = this.expand, r = this.flyweight[this.direction] / i >> 0;
              s > r && s < r + this.row - 2 || (this.flyweight[this.direction] = s * i - i / 2, this.scroll());
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
      Y(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let r = !1;
      this.end = !1, this.__index = i.index, S(
        this.flyweights,
        (n, l, o, h, u, c, m, _, f) => {
          if (o = n / u >> 0, _ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < c % h) + /* 计算轮数, row的倍数 */
          (c / h >> 0)), f = _ * u + n % u, f >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = _, l.i = f, l.data = this.flys[f];
          let v = [
            /* top */
            _ * this.expand + l.x,
            /* left */
            l.space
          ];
          m && v.reverse(), l.top = v[0], l.left = v[1];
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
      let s = this.scrollx, i = this.flyweight, r = H(i, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, u = r.height, c = (Bt(this.width, h) || h) + l, m = Bt(this.height, u) + o, _ = [h / c >> 0 || 1, u / m >> 0 || 1];
        s && _.reverse();
        let [f, v] = _, w = this.padding, I, D = 0, x, z;
        s ? (x = c, c -= l, z = (R) => (
          /* 计算top偏移量 */
          R * (m - o) + (R + 1) * o
        )) : (n ? (c = (h - l * (f + 2 * w - 1)) / f, I = !w * l, D = w * l) : (I = 0, D = h < c ? 0 : (h % c + l * f) / (f + 1) >> 0, c -= l), z = (R) => R * (c + I) + (R + 1) * D, x = m), this.row = v + 2, this.column = f, this.realH = m - o, this.realW = c, this.expand = x, this.Size = Math.ceil(t / f) * x;
        let O = Math.min(t, f * this.row), C = O - 1, V;
        for (; O-- > 0; )
          V = C - O, this.$set(e, V, {
            x: l,
            y: o,
            width: c,
            height: m - o,
            space: z(V % f),
            data: {}
          });
        e.length = C + 1;
        let q = [];
        u / x > C / f && q.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), q.push([
          "update:space",
          {
            row: (C / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(q);
      });
    }
  }
}, qe = { class: "flyweight-all" };
function Ue(t, e, s, i, r, n) {
  const l = T("Card");
  return $(), j("div", {
    ref: "flyweight",
    class: st(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: s.line && r.__top !== 0
    }]),
    style: X(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", A(W(n.bridge)), void 0, !0),
    b("div", qe, [
      ($(!0), j(Yt, null, J(r.flyweights, (o, h) => ($(), j("div", {
        key: h,
        style: X({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", y({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", A(W(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", A(y({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        k(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: p(() => [...e[1] || (e[1] = [
            L(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const ie = /* @__PURE__ */ B(Ve, [["render", Ue], ["__scopeId", "data-v-1c021354"]]);
let Ge;
const Ut = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
}, Ye = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: M, Stream: St },
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
      id: wt("input-{1000-9999}-{1000-9999}"),
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
    H(this.$attrs, "value|modelValue=>value", (e, s) => {
      this.trigger = e, this.__emit(s);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          g([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: e }]]
          ]).value = e || "";
        });
      }
    }), S(["left", "right", "rm"], (e, s, i) => {
      i = g([
        ["$el", this.$refs[s] || ""],
        [s, this.$refs]
      ]), this[s] = g("offsetWidth", i || "") || null;
    });
    let t = g([
      ["assign", Object, {}, this.$attrs],
      [
        function() {
          let e = {};
          return S(this.$attrs, (s, i) => {
            e[s] = this.$attrs[s];
          }), e;
        },
        this
      ]
    ]);
    t[this.trigger] = void 0, this.attrs = t, S(
      this.$attrs,
      (e, s, i) => {
        fe(s) && (this.inputAttrs[e] = s), e in i && (g("removeAttribute", this.$el, e), this.$watch(
          "$attrs." + e,
          (r) => {
            this.inputAttrs[e] = r;
          },
          { immediate: !0 }
        ));
      },
      he("maxlength,type,disabled,readonly")
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
      S(rt(t) ? t : [t], (s, i, r) => {
        S(Ut, (n, l) => {
          n in i && (r = [
            function(o, h, u, c, m, _, f) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = h(u, f, _);
              return m.error = w ? c : Ge;
            },
            this,
            i,
            Ut[n],
            i[n],
            i.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(r);
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
}, Je = ["for"], Xe = {
  class: "placeholder",
  flex: ""
}, Ke = {
  class: "s-wrap-tips",
  flex: ""
}, Qe = {
  key: 0,
  class: "s-wrap-limit"
};
function Ze(t, e, s, i, r, n) {
  const l = T("Stream"), o = T("Card");
  return $(), F(o, y({
    class: ["s-wrap", {
      [t.$attrs.class || ""]: !0,
      error: t.error
    }],
    "s-completed": t.completed
  }, t.attrs, {
    use: "",
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: p(() => [
      k(l, y({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (h) => t.$emit("focus", h)),
        onChange: n.__change,
        onInput: n.__input,
        onBlur: n.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      b("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          b("span", Xe, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              L(" " + E(s.placeholder), 1)
            ], !0)
          ]),
          b("span", Ke, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              L(" " + E(t.error || s.tips || s.placeholder), 1)
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
        default: p(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: n.limit }, () => [
              t.$attrs.maxlength ? ($(), j("span", Qe, E(n.limit), 1)) : vt("", !0)
            ], !0),
            b("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
        ref: "left",
        class: "s-wrap-left",
        height: "100%",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: p(() => [
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
        default: p(() => [
          a(t.$slots, "error", {}, () => [
            L(E(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const re = /* @__PURE__ */ B(Ye, [["render", Ze], ["__scopeId", "data-v-fcd23c2c"]]), ts = {}, ne = [];
ne.push(kt, M, te, ee, se, ie, re, St, lt);
const ns = { Boom: kt, Card: M, Confirm: te, Div: ee, Flex: se, Flyweight: ie, Input: re, Stream: St, Tips: lt };
ts.install = function(t, e = {}) {
  ne.forEach((s) => {
    let { global: i, name: r } = s;
    i === !1 || t.component(r, s), t.component("S" + r, s);
  });
};
export {
  kt as Boom,
  M as Card,
  te as Confirm,
  ee as Div,
  se as Flex,
  ie as Flyweight,
  re as Input,
  St as Stream,
  lt as Tips,
  ns as components,
  ts as default
};
