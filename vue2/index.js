import { runer as g, each as v, merge as L, picker as b, isEmpty as tt, isSimplyType as ht, isString as Pt, format as et, isArray as j, array2Json as jt } from "@soei/util";
import { runer as _, isArray as It, each as K, isNil as P, isString as Dt, isFunction as Ut } from "@soei/tools";
import Vt from "@soei/picker";
let Xt = /(\d+|[+\-\*/]|%)/g, _t = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ft = (e, t) => {
  let i;
  if (i = g("match", e, Xt)) {
    let s = i.length, r, n = 0, l, u = [];
    for (; s--; )
      n = i.shift(), n in _t ? (r && u.push(r), n === "%" && (u.length = 2), l = n) : +n && u.push(+n), u.length == 2 && (u.push(t), r = _t[l].apply(null, u), u.length = 0);
    +r || (r = +u.pop()), e = r >> 0;
  }
  return e;
}, $ = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
function S(e, t, i, s, r, n, l, u) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = i, o._compiled = !0), s && (o.functional = !0), n && (o._scopeId = "data-v-" + n);
  var a;
  if (l ? (a = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), r && r.call(this, c), c && c._registeredComponents && c._registeredComponents.add(l);
  }, o._ssrRegister = a) : r && (a = u ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), a)
    if (o.functional) {
      o._injectStyles = a;
      var h = o.render;
      o.render = function(f, p) {
        return a.call(p), h(f, p);
      };
    } else {
      var d = o.beforeCreate;
      o.beforeCreate = d ? [].concat(d, a) : [a];
    }
  return {
    exports: e,
    options: o
  };
}
let qt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function Q(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let Ct = {
  close: {
    handler(e) {
      this.change(e);
    },
    deep: !0
  },
  offset: {
    handler(e) {
      this.margin(e);
    },
    deep: !0
  },
  /* 混合样式 */
  mix: {
    handler(e) {
      if (!e)
        return;
      let t = {};
      L(t, this.$data, this.$props, this.$attrs, "mix"), this._style = b(t, e, (i, s, r, n) => (this.$nextTick(() => {
        g("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), qt.test(n) ? $(s) : s));
    },
    immediate: !0
  }
}, Gt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Tt = {};
v(
  Gt,
  (e, t, i) => {
    e = Q(t), Tt["--" + Q(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  Ct
);
const Yt = {
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
  watch: Ct,
  methods: {
    exec: $,
    isEmpty: tt,
    picker: b,
    runer: g,
    isSimplyType: ht,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(Tt, e), L(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: Q,
    css(e, t) {
      v(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = $(r));
      });
    },
    change(e) {
      ht(e) || (this.closecss = b(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,bg=>--s-card-close-background-color,:bg=>--s-card-close-hover-background-color,:color=>--s-card-close-hover-color,shadow=>--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(e) {
      b(
        Pt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, r) => {
          let n = $(i);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Jt = function() {
  var t = this, i = t._self._c;
  return i("div", { key: t.trigger, class: {
    card: t.$attrs.use === void 0
  }, style: t.tr() }, [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [t._t("subtitle", function() {
        return [i("span", [t._v(t._s(t.sub))])];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, attrs: { title: t.tips }, on: { click: function(s) {
          return t.$emit("close");
        } } })], 2)];
      })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, Kt = [], Qt = /* @__PURE__ */ S(
  Yt,
  Jt,
  Kt,
  !1,
  null,
  "75e5c8a6",
  null,
  null
);
const k = Qt.exports;
const Zt = {
  name: "Boom",
  emits: ["click"],
  components: { Card: k },
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
      v("disabled visible tips".split(/\s+/g), (e, t) => {
        g("removeAttribute", this.$el, t);
      });
    }
  }
};
var te = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-button", attrs: { use: "", mix: t.mix, center: "", space: "", vc: "", "inline-block": "" } }, "Card", t.$attrs, !1), [i("button", { attrs: { disabled: t.$attrs.disabled, center: "", vc: "" }, on: { click: function(s) {
    return t.$emit("click", s);
  } } }, [t._t("inner", function() {
    return [i("span", [t._t("default", function() {
      return [t._v("提示")];
    })], 2)];
  })], 2), t._t("tips", function() {
    return [t.$attrs.tips ? i("tips", t._b({}, "tips", t.$attrs.tips, !1)) : t._e()];
  })], 2);
}, ee = [], ie = /* @__PURE__ */ S(
  Zt,
  te,
  ee,
  !1,
  null,
  "30c6130b",
  null,
  null
);
const it = ie.exports, dt = /(?:\,|\|{2})/, Z = "px", pt = "";
let O = document.documentElement, gt, mt = ["s-left", "s-top", "s-right", "s-bottom"], se = { left: 0, top: 1, right: 2, bottom: 3 };
const M = [];
var re = Vt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let st = {}, Rt = null;
re(st, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    Rt = ne(() => {
      _(M);
    }, e), this._delay = e;
  }
});
st.delay = 60;
function ne(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, _(e, this, arguments));
  };
}
const F = () => {
  Rt();
};
function le(e) {
  Nt(e), M.push(e);
}
function oe(e, t) {
  if (!_(["getBoundingClientRect"], e))
    return;
  let i = e.getBoundingClientRect(), s = t.x, r = t.y;
  return s > i.left && s < i.left + i.width && r > i.top && r < i.top + i.height;
}
function Nt(e) {
  let t = K(M, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || M.splice(t, 1);
}
const W = new ResizeObserver(F);
W.observe(O);
function yt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const G = [], N = (e) => {
  if (It(e))
    G.push(e);
  else
    return +e < 0 ? _(e, G) : G.pop();
};
_([
  [
    "addEventListener",
    window,
    "keydown",
    function(e) {
      if (e.keyCode === 27) {
        _(["stopPropagation", "preventDefault"], e);
        let t = N(-1);
        t && _([[t[4]]]) === void 0 && _([N()]);
      }
    },
    !0
  ]
]);
const bt = {};
var vt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLT[s]] = (t[r] - i[r]) / 2 + Z;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var n, l, u = this.rWidth, o, a = e.match(this.rPosition), h = 0, d = a.length; h < d; h++)
      o = a[h], o != r ? s[o] = 0 : (l = a[(h + 1) % d], n = +!u.test(l), this.css(s, i, t, n), l == o && this.css(s, i, t, +!n));
    return s;
  }
};
function zt(e) {
  e.onresize || (M.push([zt, null, e]), e.onresize = !0);
  var t = O, i = t.clientHeight, s = t.clientWidth, r = e.target, n = e.room, l = e.index, u = e.position, o = e.edge || 7, a = e.arrow || 0, h = e.css, d = e.space || (e.space = []), c = r.getBoundingClientRect(), f = n.offsetHeight, p = n.offsetWidth, m = P(e.offset) ? 7 : e.offset;
  if (/\s+|center/.test(u)) {
    vt.trigger(u, n, O, h);
    return;
  }
  var T = "3,0,2,1".split(dt), z, y = c.left, w = c.top, R = Math.max(w, o), x = (c.height == gt ? c.bottom - w : c.height) >> 0, A = (c.width == gt ? c.right - y : c.width) >> 0, E = s - p - m, C = i - f - m, lt = y < 0 || y + A / 2 > s, ot = w < 0 || w + x > i, I = [
    /* left: 0 */
    ot ? -1 : y - p,
    /* top: 1 */
    lt ? -1 : R - f,
    /* right: 2 */
    ot ? -1 : E - c.right,
    /* bottom: 3 */
    lt ? -1 : C - c.bottom
  ];
  u && (K(
    u.split(dt),
    function(Ot, H, q, Ft) {
      Ft.push(q[H]);
    },
    se,
    z = []
  ), T.unshift.apply(T, z)), l = K(
    T,
    function(Ot, H, q) {
      if (q[H] - o > 0)
        return H;
    },
    I
  );
  var D = 0, U = 0, at = 0, ut = 0;
  if (l == null)
    vt.trigger("center", n, O, h);
  else {
    var V = l == 0 || l == 2;
    D = yt(
      V ? l == 2 ? c.right + m : I[0] - m : (
        /* 目标对象的 left */
        y - a
      ),
      o,
      E
    ), U = yt(
      V ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          R - (f - x) / 2,
          m
        )
      ) : (
        // )
        l == 3 ? w + x + a + m : I[1] - m
      ),
      o,
      C
    ), V ? ut = Math.max(
      R - U + (x - a) / 2 - a,
      a
    ) : at = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - D + (A - a) / 2 - a,
        /* 目标宽 - 两倍的箭头 */
        p - 4 * a
      ),
      a
    ), h.left = D + Z, h.top = U + Z, h["--tips-arrow-top"] = (x > f ? 0 : ut) || pt, h["--tips-arrow-left"] = at || pt;
  }
  let ct = n.classList, Ht = mt[l], X = d[0];
  (P(X) || X != l) && _([
    [
      /* 移除旧值 */
      ["remove", ct, mt[X]],
      /* 添加新值 */
      ["add", ct, Ht]
    ],
    () => {
      d.shift(), d.push(l), e.index = l;
    }
  ]);
}
const Y = document.documentElement, B = (e) => (_(["stopPropagation", "preventDefault"], e), e), xt = (e) => {
  let t = N(e), i = b(t, "1=>host,3=>sign,4=>modal", !0);
  return i.task = t, i;
}, J = "data-tips-scroll", ae = -1e4, $t = 3, wt = {
  proxy: function(e) {
    e && this.$nextTick(this.__2next), this.$emit("update:visible", e);
  },
  visible: {
    handler: function(e) {
      e === "modal" && (this.proxy_before = !0), this.$nextTick(() => {
        this.__trigger(e);
      });
    },
    immediate: !0
  },
  proxy_before: {
    handler(e) {
      console.log("before", e), this.$nextTick(() => {
        this.__toggle_append(this.$el);
      });
    },
    immediate: !0
  },
  target: {
    handler(e) {
      let t = b(
        [e],
        et(
          "0.?.$el|0.$el|0=>el",
          b(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (_(["currentTarget", "nodeType"], t || "")) {
        let i = t;
        t instanceof Event && (i = t.currentTarget, B(t)), this._event_mark = !1, this._target__ = i, this.visible === !1 && !i.mark && (this.__trigger("click"), i.mark = !0, _([
          [
            "dispatchEvent",
            i,
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
}, ue = {
  name: "Tips",
  components: {
    Card: k
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: ae
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
      default: $t
    }
  },
  watch: wt,
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
      sign: et("s-tips-{100-999}-{100-999}-{100-999}")
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
    __parent(e) {
      let t = this._target__, i;
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), _(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return _(
        e[i === void 0 ? "getAttribute" : "setAttribute"],
        e,
        t,
        i
      );
    },
    /* 初始化 */
    init() {
      let e = this.$el;
      if (e.nodeName == "#comment")
        return;
      let t = this.$set ? Object.assign({}, this.css) : this.css;
      L(t, this.__css(), !0), zt({
        onresize: !1,
        /* 监控的目标 */
        target: this._target__,
        /* 显示的元素 */
        room: e,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: t,
        /* 偏移量 */
        offset: P(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this.arrow,
        edge: this.edge
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (this.static || this.isSimply)
        return;
      let i = this.isModal;
      _([
        [
          t ? "removeChild" : i ? "insertBefore" : "appendChild",
          Y,
          e,
          i ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? _(e.addEventListener, e, "scroll", F) : (_(W.observe, W, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, J), i || (_(e.addEventListener, e, "scroll", F), this.__attr(e, J, "true"))));
      });
    },
    __css() {
      let e = {};
      return this.arrow = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, b(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      P(this.static) || (this.init(), st.delay = +this.delay, le(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          _(e, this, arguments);
        },
        this.delay === $t ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        B(e), this.$emit("toggle", this.proxy = !0);
      });
    },
    /* 隐藏 */
    __hide(e) {
      this.__debounce(() => {
        this.proxy && this.$emit("toggle", this.proxy = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(e) {
      B(e);
      let t;
      this.$emit("toggle", t = this.proxy = !this.proxy), t || this.__close(e);
    },
    __close(e) {
      let { task: t, host: i, sign: s, modal: r } = xt(-1);
      if (t !== void 0) {
        if (oe(i.$el, e))
          return B(e);
        if (!i.proxy)
          return N(), s === this.sign ? void 0 : this.__close(e);
        if (_(r) !== void 0)
          return B(e);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === e.currentTarget && s == this.sign || (_([t || []]), N());
      }
    },
    __click(e) {
      B(e);
      let t = tt(e), { task: i, sign: s, host: r, modal: n } = xt(-1);
      _(n) !== void 0 && (i = null);
      let l = s == this.sign;
      this.$attrs.clear === void 0 || t || (i && _([i]), N()), l || this.__Task(
        e,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), t || this.__toggle(e);
    },
    __Task(e, t, i) {
      N(["__hide", this, e, this.sign, t, i]);
    },
    /* 触发事件 */
    __trigger(e) {
      if (Dt(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, (this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible]
            /* 鼠标离开 */
            // ["mouseleave", this.__hide],
          ],
          click: [["click", this.__click]],
          modal: [
            [
              "click",
              (i) => {
                this.__toggle(i), this.__Task(i, () => !0);
              }
            ]
          ],
          enter: [
            ["mouseenter", this.__click]
            // ["click", this.__close, ROOM],
          ]
        }[e]).push(["click", this.__close, Y]), this._try("addEventListener");
      } else
        /^\d+$/.test(e) ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      j(i) || (i = [i]);
      let s = [];
      v(i, (r, n) => {
        let l = 0;
        n[2] === Y && ++l && bt.__tipsmark_ || (l && (bt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), _(s);
    }
  },
  mounted() {
    wt.target.handler.call(this, this.target), this._target__ = this._target__ || _("parentNode", this.$el);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Nt(this.__2listener), this.__parent(function(e, t) {
      _(e.removeEventListener, e, "scroll", F), _(e.removeAttribute, e, J, void 0), t || _(W.unobserve, W, e);
    });
  }
};
var ce = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: {
    "tips-fly": t.isModal
  }, style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: t.__close }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1)) : t._e();
}, he = [], _e = /* @__PURE__ */ S(
  ue,
  ce,
  he,
  !1,
  null,
  "c42f4d04",
  null,
  null
);
const rt = _e.exports, fe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return tt(i) ? [] : j(i) ? i : [i];
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
    b(
      this.$refs,
      "component._.provides|component=>component",
      (e, t, i, s) => {
        if (g("nodeType", t) === 1)
          this.Ref = t;
        else
          for (let r in t)
            /^\$/.test(r) && L(this.Ref, t[r]);
      }
    );
  },
  methods: {
    __trigger(e) {
      let t = e[this.bridge] || e.type;
      return (this.$slots || this.$scopedSlots)[t] ? t : "default";
    }
  }
};
var de = function() {
  var t = this, i = t._self._c;
  return i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, pe = [], ge = /* @__PURE__ */ S(
  fe,
  de,
  pe,
  !1,
  null,
  null,
  null,
  null
);
const nt = ge.exports;
const me = {
  name: "Confirm",
  components: {
    Card: k,
    Tips: rt,
    Boom: it
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
      handler(e) {
        this.proxy = e;
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
    emitcancel(e) {
      this.close(), this.$emit("cancel-click", e);
    },
    close() {
      this.proxy = ++this.mark;
    },
    emitsubmit(e) {
      this.$emit("submit-click", this.close);
    }
  }
};
var ye = function() {
  var t = this, i = t._self._c;
  return i("span", { staticClass: "s-confirm-warp" }, [t._t("default", function() {
    return [t._t("ref"), t._t("reference")];
  }), i("Tips", t._b({ tag: "Stream", staticClass: "s-confirm", attrs: { columns: { type: t.type }, visible: t.proxy, min: ["auto"], height: "auto", arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : "" }, scopedSlots: t._u([{ key: "default", fn: function() {
    return [t._t("el", function() {
      return [i("Card", { scopedSlots: t._u([{ key: "title", fn: function() {
        return [i("Card", { staticClass: "s-confirm-title" }, [t._t("title", function() {
          return [t._v(t._s(t.title))];
        })], 2)];
      }, proxy: !0 }, { key: "content", fn: function() {
        return [t._t("content", function() {
          return [t._v(t._s(t.content))];
        }), t._t("bottom", function() {
          return [i("Card", { staticClass: "s-confirm-booms", attrs: { flex: "", space: "" } }, [i("span"), i("span", { attrs: { flex: "" } }, [t._t("boom", function() {
            return [t._t("cancel", function() {
              return [i("Boom", t._b({ attrs: { cancel: "" }, on: { click: function(s) {
                return s.stopPropagation(), t.emitcancel.apply(null, arguments);
              } } }, "Boom", t.cancelAttrs, !1), [t._v(" " + t._s(t.cancelAttrs.text || t.cancel) + " ")])];
            }, null, { click: t.emitcancel, text: t.cancel }), t._t("submit", function() {
              return [i("Boom", t._b({ staticClass: "simply", attrs: { submit: "" }, on: { click: function(s) {
                return s.stopPropagation(), t.emitsubmit.apply(null, arguments);
              } } }, "Boom", t.submitAttrs, !1), [t._v(" " + t._s(t.submitAttrs.text || t.submit) + " ")])];
            }, null, {
              click: t.close,
              text: t.submit
            })];
          }, null, {
            close: t.close,
            submit: t.submit
          })], 2)])];
        })];
      }, proxy: !0 }], null, !0) })];
    })];
  }, proxy: !0 }, { key: "card", fn: function() {
    return [i("Card", t._b({ attrs: { width: "100%", nothing: "", height: "100%" }, on: { close: function(s) {
      t.$attrs.close && t.close(s);
    } }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
      return { key: r, fn: function(n) {
        return [t._t(r, null, { close: t.close }, n)];
      } };
    })], null, !0) }, "Card", t.$attrs, !1))];
  }, proxy: !0 }], null, !0) }, "Stream", t.$attrs, !1))], 2);
}, be = [], ve = /* @__PURE__ */ S(
  me,
  ye,
  be,
  !1,
  null,
  "73ba28e8",
  null,
  null
);
const At = ve.exports;
const xe = {
  name: "Div",
  components: {
    Card: k
  }
};
var $e = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, we = [], Se = /* @__PURE__ */ S(
  xe,
  $e,
  we,
  !1,
  null,
  "a7a3e455",
  null,
  null
);
const Et = Se.exports;
const ke = {
  name: "Flex",
  components: {
    Card: k
  }
};
var Ce = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, Te = [], Re = /* @__PURE__ */ S(
  ke,
  Ce,
  Te,
  !1,
  null,
  "e24d1dff",
  null,
  null
);
const Bt = Re.exports;
let St = (e) => e == null || e == null, Ne = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const ze = {
  name: "Flyweight",
  components: {
    Card: k
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
      var e = this.w, t = this.h, i = this.Size, s = {};
      return L(
        s,
        {
          "--width": $(this.realW),
          "--height": $(this.realH),
          "--flyweight-content": $(i)
        },
        t && {
          "--flyweight-h": $(t)
        },
        e && {
          "--flyweight-w": $(e)
        },
        "mix"
      ), s;
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
    flys(e) {
      this.count = e.length, this.rebuild();
      let t = this.task.shift();
      t && this.$nextTick(() => {
        this.setview(t);
      });
    },
    view: {
      handler(e) {
        this.setview(e);
      },
      immediate: !0,
      deep: !0
    },
    index(e) {
      this.setindex(e);
    },
    top(e) {
      this.flyweight.scrollTop = e;
    },
    left(e) {
      this.flyweight.scrollLeft = e;
    }
  },
  mounted() {
    this.flyweights = [], this.$set || (this.$set = (e, t, i) => {
      e[t] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (e) {
      Ne(e);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: $,
    trigger(e, t) {
      j(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        v(e, (i, s) => {
          this.$emit(s[0], St(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      g(
        [
          this.cheackflys,
          (t) => {
            t = t || {};
            let i = t.index || v(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              t.picker,
              t.id
            );
            St(i) || this.setindex(i);
          }
        ],
        this,
        e
      );
    },
    setindex(e) {
      g(
        [
          this.cheackflys,
          ({ index: t }) => {
            this.selectIndex = t, this.$nextTick(() => {
              if (t < 0)
                return;
              let i = t / this.column >> 0, s = this.expand, r = this.flyweight[this.direction] / s >> 0;
              i > r && i < r + this.row - 2 || (this.flyweight[this.direction] = i * s - s / 2, this.scroll());
            });
          }
        ],
        this,
        { index: e }
      );
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], i = g(this.direction, e.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      L(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, v(
        this.flyweights,
        (n, l, u, o, a, h, d, c, f) => {
          if (u = n / a >> 0, c = u + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(u < h % o) + /* 计算轮数, row的倍数 */
          (h / o >> 0)), f = c * a + n % a, f >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = c, l.i = f, l.data = this.flys[f];
          let p = [
            /* top */
            c * this.expand + l.x,
            /* left */
            l.space
          ];
          d && p.reverse(), l.top = p[0], l.left = p[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index,
        this.scrollx
      ), this.trigger(t), t = null;
    },
    scroll(e) {
      this.run(e || { target: this.flyweight, from: "space" });
    },
    rebuild() {
      let e = this.count || this.flys.length, t = this.flyweights;
      if (!e)
        return t.length = e;
      this.count = e;
      let i = this.scrollx, s = this.flyweight, r = b(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, u] = this.offset, o = r.width, a = r.height, h = (ft(this.width, o) || o) + l, d = ft(this.height, a) + u, c = [o / h >> 0 || 1, a / d >> 0 || 1];
        i && c.reverse();
        let [f, p] = c, m = this.padding, T, z = 0, y, w;
        i ? (y = h, h -= l, w = (C) => (
          /* 计算top偏移量 */
          C * (d - u) + (C + 1) * u
        )) : (n ? (h = (o - l * (f + 2 * m - 1)) / f, T = !m * l, z = m * l) : (T = 0, z = o < h ? 0 : (o % h + l * f) / (f + 1) >> 0, h -= l), w = (C) => C * (h + T) + (C + 1) * z, y = d), this.row = p + 2, this.column = f, this.realH = d - u, this.realW = h, this.expand = y, this.Size = Math.ceil(e / f) * y;
        let R = Math.min(e, f * this.row), x = R - 1, A;
        for (; R-- > 0; )
          A = x - R, this.$set(t, A, {
            x: l,
            y: u,
            width: h,
            height: d - u,
            space: w(A % f),
            data: {}
          });
        t.length = x + 1;
        let E = [];
        a / y > x / f && E.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), E.push([
          "update:space",
          {
            row: (x / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(E);
      });
    }
  }
};
var Ae = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    //   'flyweight-active': actice,
    "flyweight-empty": t.Size === 0,
    line: t.line && t.__top !== 0
  }, style: t.style, on: { scroll: t.scroll } }, [t._t("title", null, null, t.bridge), i("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(s, r) {
    return i("div", { key: r, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [t._t("default", null, null, s)], 2);
  }), 0), t._t("mix", function() {
    return [t.flyweights.length ? t._t("end", null, null, t.bridge) : t._t("empty", function() {
      return [i("Card", { attrs: { height: "100% - 10px", width: "100%", center: "", nothing: "", vcenter: "" } }, [t._v(" 空~ ")])];
    })];
  }, null, t.bridge)], 2);
}, Ee = [], Be = /* @__PURE__ */ S(
  ze,
  Ae,
  Ee,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Lt = Be.exports;
let Le;
const kt = {
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  required: (e, t) => !t
};
let We = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Me = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: k, Stream: nt },
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
      id: et("input-{1000-9999}-{1000-9999}"),
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
    b(this.$attrs, "value|modelValue=>value", (e, t) => {
      this.trigger = e, this.__emit(t);
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
    }), v(["left", "right", "rm"], (e, t, i) => {
      i = g([
        ["$el", this.$refs[t] || ""],
        [t, this.$refs]
      ]), this[t] = g("offsetWidth", i || "") || null;
    }), this.attrs = b(this.$attrs, We + this.mix), v(
      this.$attrs,
      (e, t, i) => {
        Ut(t) && (this.inputAttrs[e] = t), e in i && this.$watch(
          "$attrs." + e,
          (s) => {
            this.inputAttrs[e] = s;
          },
          { immediate: !0 }
        );
      },
      jt("maxlength,type,disabled,readonly")
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
    error(e) {
      let t = this.hasSuccess;
      e || (t = 1);
      let i;
      t && e ? (t = 0, i = -1) : i = t * (2 * +!e - 1), this.hasSuccess = t, this.$emit("update:sum", +this.sum + i), this.$emit("update:state", i);
    }
  },
  methods: {
    storage() {
      let e = this.rules, t = [];
      v(j(e) ? e : [e], (i, s, r) => {
        v(kt, (n, l) => {
          n in s && (r = [
            function(u, o, a, h, d, c, f) {
              let p = u.trigger;
              if (!u.required && p && this !== p)
                return;
              let m = o(a, f, c);
              return d.error = m ? h : Le;
            },
            this,
            s,
            kt[n],
            s[n],
            s.message,
            this,
            /number/.test(this.type)
          ]);
        }), t.push(r);
      }), this.RULE.push(t);
    },
    __runer(e, t) {
      g([this.RULE], null, e, t);
    },
    close() {
      this.$nextTick(() => {
        this.__emit(""), this.__runer("clear", "");
      });
    },
    __change(e) {
      this.__runer("change", e.target.value), this.$emit("change", e.target.value);
    },
    __blur(e) {
      this.__runer("blur", e.target.value), this.__emit(e.target.value);
    },
    __input(e) {
      this.__runer("input", e.target.value), this.__emit(e.target.value);
    },
    __emit(e) {
      this.$emit("update:" + this.trigger, e);
    }
  }
};
var He = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-wrap", class: {
    [t.$attrs.class || ""]: !0,
    error: t.error
  }, style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }, attrs: { "s-completed": t.completed, use: "" } }, "Card", t.attrs, !1), [i(t.$attrs.type === "textarea" ? "textarea" : "input", t._b({ ref: "input", tag: "Stream", staticClass: "s-wrap-input", attrs: { id: t.id, placeholder: "", autocomplete: "off", type: t.$attrs.type }, on: { focus: function(s) {
    return t.$emit("focus", s);
  }, change: t.__change, input: t.__input, blur: t.__blur } }, "Stream", t.inputAttrs, !1)), i("label", { staticClass: "s-wrap-label", attrs: { for: t.id } }, [t._t("default", function() {
    return [i("span", { staticClass: "placeholder", attrs: { flex: "" } }, [t._t("placeholder", function() {
      return [t._t("icon", null, { type: "placeholder" }), t._v(" " + t._s(t.placeholder) + " ")];
    })], 2), i("span", { staticClass: "s-wrap-tips", attrs: { flex: "" } }, [t._t("tips", function() {
      return [t._t("icon", null, { type: "tips" }), t._v(" " + t._s(t.error || t.tips || t.placeholder) + " ")];
    }, { limit: t.limit })], 2)];
  })], 2), i("Card", { ref: "right", staticClass: "s-wrap-right", attrs: { nothing: "", width: "auto", bg: "transparent", vc: "" } }, [t._t("right", function() {
    return [t._t("limit", function() {
      return [t.$attrs.maxlength ? i("span", { staticClass: "s-wrap-limit" }, [t._v(t._s(t.limit))]) : t._e()];
    }, { limit: t.limit }), i("span", { ref: "rm", staticClass: "s-wrap-close", on: { click: t.close } }, [t._v("×")])];
  })], 2), i("Card", { ref: "left", staticClass: "s-wrap-left", attrs: { nothing: "", width: "auto", bg: "transparent", vc: "", center: "" } }, [t._t("left", function() {
    return [t._t("icon")];
  })], 2), i("Card", { staticClass: "input-error", attrs: { nothing: "", height: "auto" } }, [t._t("error", function() {
    return [t._v(t._s(t.error))];
  })], 2)], 1);
}, Oe = [], Fe = /* @__PURE__ */ S(
  Me,
  He,
  Oe,
  !1,
  null,
  "e0f7f9a6",
  null,
  null
);
const Wt = Fe.exports, Pe = {}, Mt = [];
Mt.push(it, k, At, Et, Bt, Lt, Wt, nt, rt);
const Ue = { Boom: it, Card: k, Confirm: At, Div: Et, Flex: Bt, Flyweight: Lt, Input: Wt, Stream: nt, Tips: rt };
Pe.install = function(e, t = {}) {
  Mt.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  it as Boom,
  k as Card,
  At as Confirm,
  Et as Div,
  Bt as Flex,
  Lt as Flyweight,
  Wt as Input,
  nt as Stream,
  rt as Tips,
  Ue as components,
  Pe as default
};
