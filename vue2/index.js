import { take as At, runer as p, each as b, merge as W, isEmpty as it, picker as T, isSimplyType as ht, isString as Ut, format as st, isArray as j, array2Json as Dt } from "@soei/util";
import { runer as h, isArray as qt, each as Q, isNil as P, isString as Vt, isFunction as Gt } from "@soei/tools";
import Xt from "@soei/picker";
let Yt = /(\d+|[+\-\*/]|%)/g, _t = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ft = (e, t) => {
  let i;
  if (i = p("match", e, Yt)) {
    let s = i.length, r, n = 0, l, u = [];
    for (; s--; )
      n = i.shift(), n in _t ? (r && u.push(r), n === "%" && (u.length = 2), l = n) : +n && u.push(+n), u.length == 2 && (u.push(t), r = _t[l].apply(null, u), u.length = 0);
    +r || (r = +u.pop()), e = r >> 0;
  }
  return e;
}, x = (e, t) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
), Z = (() => At)();
function w(e, t, i, s, r, n, l, u) {
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
      var _ = o.render;
      o.render = function(f, m) {
        return a.call(m), _(f, m);
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
let Jt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function tt(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let Rt = {
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
      W(t, this.$data, this.$props, this.$attrs, "mix"), this._style = Z(t, e, (i, s, r) => (this.$nextTick(() => {
        p("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Jt.test(r) ? x(s) : s));
    },
    immediate: !0
  }
}, Kt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Nt = {};
b(
  Kt,
  (e, t, i) => {
    e = tt(t), Nt["--" + tt(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  Rt
);
const Qt = {
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
      return p("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Rt,
  methods: {
    exec: x,
    isEmpty: it,
    picker: T,
    runer: p,
    isSimplyType: ht,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(Nt, e), W(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: tt,
    css(e, t) {
      b(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = x(r));
      });
    },
    change(e) {
      ht(e) || (this.closecss = Z(
        e,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(e) {
      Z(
        Ut(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (t, i, s) => {
          let r = x(i);
          !r || this.default[s] == r || (this[s] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Zt = function() {
  var t = this, i = t._self._c;
  return i("div", { key: t.trigger, class: {
    card: t.$attrs.use === void 0
  }, style: t.tr() }, [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "", vc: "" } }, [t._t("subtitle", function() {
        return [i("span", [t._v(t._s(t.sub))])];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, on: { click: function(s) {
          return t.$emit("close");
        } } }, [t._t("close")], 2)], 2)];
      })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, te = [], ee = /* @__PURE__ */ w(
  Qt,
  Zt,
  te,
  !1,
  null,
  "e8a39336",
  null,
  null
);
const k = ee.exports, dt = /(?:\,|\|{2})/, et = "px", pt = "";
let O = document.documentElement, mt, gt = ["s-left", "s-top", "s-right", "s-bottom"], ie = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var se = Xt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let rt = {}, zt = null;
se(rt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    zt = re(() => {
      h(F);
    }, e), this._delay = e;
  }
});
rt.delay = 60;
function re(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, h(e, this, arguments));
  };
}
const H = () => {
  zt();
};
function yt(e) {
  Et(e), F.push(e);
}
function ne(e, t) {
  if (!h(["getBoundingClientRect"], e))
    return;
  let i = e.getBoundingClientRect(), s = t.x, r = t.y;
  return s > i.left && s < i.left + i.width && r > i.top && r < i.top + i.height;
}
function Et(e) {
  let t = Q(F, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || F.splice(t, 1);
}
const L = new ResizeObserver(H);
L.observe(O);
function bt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const J = [], R = (e) => {
  if (qt(e))
    J.push(e);
  else
    return +e < 0 ? h(e, J) : J.pop();
};
h([
  [
    "addEventListener",
    window,
    "keydown",
    function(e) {
      if (e.keyCode === 27) {
        h(["stopPropagation", "preventDefault"], e);
        let t = R(-1);
        t && h([[t[4]]]) === void 0 && h([R()]);
      }
    },
    !0
  ]
]);
const vt = {};
var xt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLT[s]] = (t[r] - i[r]) / 2 + et;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var n, l, u = this.rWidth, o, a = e.match(this.rPosition), _ = 0, d = a.length; _ < d; _++)
      o = a[_], o != r ? s[o] = 0 : (l = a[(_ + 1) % d], n = +!u.test(l), this.css(s, i, t, n), l == o && this.css(s, i, t, +!n));
    return s;
  }
};
function Lt(e) {
  e.onresize || (F.push([Lt, null, e]), e.onresize = !0);
  var t = O, i = t.clientHeight, s = t.clientWidth, r = e.target, n = e.room, l = e.index, u = e.position, o = e.edge || 7, a = e.arrow || 0, _ = e.css, d = e.space || (e.space = []);
  if (_["--tips-h--"] = i, /\s+|center/.test(u)) {
    xt.trigger(u, n, O, _);
    return;
  }
  var c = r.getBoundingClientRect(), f = n.offsetHeight, m = n.offsetWidth, g = P(e.offset) ? 7 : e.offset, C = "3,0,2,1".split(dt), N, y = c.left, $ = c.top, A = Math.max($, o), v = (c.height == mt ? c.bottom - $ : c.height) >> 0, z = (c.width == mt ? c.right - y : c.width) >> 0, E = s - m - g, S = i - f - g, ot = y < 0 || y + z / 2 > s, at = $ < 0 || $ + v > i, U = [
    /* left: 0 */
    at ? -1 : y - m,
    /* top: 1 */
    ot ? -1 : A - f,
    /* right: 2 */
    at ? -1 : E - c.right,
    /* bottom: 3 */
    ot ? -1 : S - c.bottom
  ];
  u && (Q(
    u.split(dt),
    function(jt, M, Y, It) {
      It.push(Y[M]);
    },
    ie,
    N = []
  ), C.unshift.apply(C, N)), l = Q(
    C,
    function(jt, M, Y) {
      if (Y[M] - o > 0)
        return M;
    },
    U
  );
  var D = 0, q = 0, ut = 0, V = 0;
  if (l == null)
    xt.trigger("center", n, O, _);
  else {
    var G = l == 0 || l == 2;
    D = bt(
      G ? l == 2 ? c.right + g : U[0] - g : (
        /* 目标对象的 left */
        y - a
      ),
      o,
      E
    ), q = bt(
      G ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          A - (f - v) / 2,
          g
        )
      ) : (
        // )
        l == 3 ? $ + v + a + g : U[1] - g
      ),
      o,
      S
    ), G ? V = Math.max(
      A - q + (v - a) / 2 - a,
      a
    ) : ut = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - D + (z - a) / 2 - a,
        /* 目标宽 - 两倍的箭头 */
        m - 4 * a
      ),
      a
    ), _.left = D + et, _.top = q + et, _["--tips-arrow-top"] = (v > f, V || pt), _["--tips-arrow-left"] = ut || pt;
  }
  let ct = n.classList, Pt = gt[l], X = d[0];
  (P(X) || X != l) && h([
    [
      /* 移除旧值 */
      ["remove", ct, gt[X]],
      /* 添加新值 */
      ["add", ct, Pt]
    ],
    () => {
      d.shift(), d.push(l), e.index = l;
    }
  ]);
}
const $t = document.documentElement, B = (e) => (h(["stopPropagation", "preventDefault"], e), e), wt = (e) => {
  let t = R(e), i = T(t, "1=>host,3=>sign,4=>modal", !0);
  return i.task = t, i;
}, K = "data-tips-scroll", le = -1e4, kt = 3, St = {
  proxy: function(e) {
    e && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let t = 1e3, i = 0, s = +this.timer;
    e === !0 && s && (this.t = s / t, this._timer__ = setInterval(() => {
      this.t = Math.max(s - ++i * t, 0) / t, i * t >= s && (this.proxy = !1, clearInterval(this._timer__));
    }, t)), this.$emit("update:visible", e);
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
      this.$nextTick(() => {
        this.__toggle_append(this.$el);
      });
    },
    immediate: !0
  },
  target: {
    handler(e) {
      let t = T(
        [e],
        st(
          "0.?.$el|0.$el|0=>el",
          T(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (h(["currentTarget", "nodeType"], t || "")) {
        let i = t;
        t instanceof Event && (i = t.currentTarget, B(t)), this._event_mark = !1, this._target__ = i, i.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), i.mark = !0;
        });
      }
    }
  }
}, oe = {
  name: "Tips",
  components: {
    Card: k
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: le
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
      default: kt
    },
    timer: {
      type: [String, Number]
    }
  },
  watch: St,
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
      sign: st("s-tips-{1-9}-{10-99}-{1-9}")
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
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), h(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return h(
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
      W(t, this.__css(), !0), Lt({
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
      let i = this.isModal, s = At(this.$attrs, "append-to-*|append-to=>*", (n) => {
        h("removeAttribute", e, n);
      }), r;
      for (let n in s) {
        r = (s[n] || n).replace(/_/g, ".");
        break;
      }
      r = r && document.querySelector(r + " :nth-child(1)") || document.body, h([
        [
          t ? "removeChild" : i ? "insertBefore" : "appendChild",
          r.parentNode,
          e,
          i ? r : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? h(e.addEventListener, e, "scroll", H) : (h(L.observe, L, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, K), i || (h(e.addEventListener, e, "scroll", H), this.__attr(e, K, "true"))));
      });
    },
    __css() {
      let e = {};
      return this.arrow = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, T(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      if (P(this.static))
        return;
      this.init(), yt(this.init), rt.delay = +this.delay, yt(this.__2listener), this.__toggle_append(this.$el);
      let e = this._rank__ = [[["observe", L]], null, this.$el];
      h.apply(null, e), e[0][0][0] = "unobserve";
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          h(e, this, arguments);
        },
        this.delay === kt ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        B(e), this.__Task(e), this.$emit("toggle", this.proxy = !0);
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
      let { task: t, host: i, sign: s, modal: r } = wt(-1);
      if (t !== void 0) {
        if (ne(i.$el, e))
          return B(e);
        if (!i.proxy)
          return R(), i._task__ = !1, s === this.sign ? void 0 : this.__close(e);
        if (h(r) !== void 0)
          return B(e);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === e.currentTarget && s == this.sign || (h([t || []]), R(), i._task__ = !1);
      }
    },
    __click(e) {
      B(e);
      let t = it(e), { task: i, sign: s, host: r, modal: n } = wt(-1);
      h(n) !== void 0 && (i = null);
      let l = s == this.sign;
      this.$attrs.clear === void 0 || (i && h([i]), R()), l || this.__Task(
        e,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), t || this.__toggle(e);
    },
    __Task(e, t, i) {
      this._task__ || (this._task__ = !0, R(["__hide", this, e, this.sign, t, i]));
    },
    __nextTick(e) {
      let t = () => {
        let i = this.$el;
        if (i.nodeType == 8)
          return requestAnimationFrame(t);
        h([
          [e],
          [
            "addEventListener",
            i,
            "mouseenter",
            () => {
              clearTimeout(this._t__);
            }
          ],
          ["addEventListener", i, "mouseleave", this.__hide]
        ]);
      };
      requestAnimationFrame(t);
    },
    /* 触发事件 */
    __trigger(e) {
      if (Vt(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, (this._event__ = {
          hover: [
            /* 鼠标进入 */
            [
              "mouseenter",
              (i) => {
                this.__visible(i), this.__nextTick();
              }
            ],
            [
              "mouseleave",
              (i) => {
                this._t__ = setTimeout(() => {
                  this.__hide(i);
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
              (i) => {
                this.__close(i), this.__toggle(i), this.__Task(i, () => !0);
              }
            ]
          ],
          enter: [
            ["mouseenter", this.__visible]
            // ["click", this.__close, ROOM],
          ]
        }[e]).push(["click", this.__close, $t, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(e) ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      j(i) || (i = [i]);
      let s = [];
      b(i, (r, n) => {
        let l = 0;
        n[2] === $t && ++l && vt.__tipsmark_ || (l && (vt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), h(s);
    }
  },
  mounted() {
    St.target.handler.call(this, this.target), this._target__ = this._target__ || h("parentNode", this.$el);
  },
  beforeUnmount() {
  },
  unmounted() {
    h.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Et(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(e, t) {
      h(e.removeEventListener, e, "scroll", H), h(e.removeAttribute, e, K, void 0), t || h(L.unobserve, L, e);
    });
  }
};
var ae = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", { staticClass: "tips", class: {
    "tips-fly": t.isModal
  }, style: t.static ? null : t.css, attrs: { "s-tips-completed": t.completed, static: t.static ? "" : null, mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>--w-,minh|min.1=>--h-,maxw|max.0=>--w--,maxh|max.1=>--h--,m=>margin" }, on: { click: t.__close }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, { t: t.t }, n)];
    } };
  })], null, !0) }) : t._e();
}, ue = [], ce = /* @__PURE__ */ w(
  oe,
  ae,
  ue,
  !1,
  null,
  "01146e95",
  null,
  null
);
const I = ce.exports;
const he = {
  name: "Boom",
  emits: ["click"],
  components: { Card: k, Tips: I },
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
      b("disabled visible tips".split(/\s+/g), (e, t) => {
        p("removeAttribute", this.$el, t);
      });
    }
  }
};
var _e = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-button", attrs: { use: "", mix: t.mix, center: "", space: "", vc: "" } }, [i("button", { attrs: { disabled: t.$attrs.disabled, center: "", vc: "" }, on: { click: function(s) {
    return t.$emit("click", s);
  } } }, [t._t("inner", function() {
    return [i("span", [t._t("default", function() {
      return [t._v("提示")];
    })], 2)];
  })], 2), t._t("tips", function() {
    return [t.$attrs.tips ? i("Tips", t._b({}, "Tips", t.$attrs.tips, !1)) : t._e()];
  })], 2);
}, fe = [], de = /* @__PURE__ */ w(
  he,
  _e,
  fe,
  !1,
  null,
  "45018d57",
  null,
  null
);
const nt = de.exports, pe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return it(i) ? [] : j(i) ? i : [i];
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
    T(
      this.$refs,
      "component._.provides|component=>component",
      (e, t, i, s) => {
        if (p("nodeType", t) === 1)
          this.Ref = t;
        else
          for (let r in t)
            /^\$/.test(r) && W(this.Ref, t[r]);
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
var me = function() {
  var t = this, i = t._self._c;
  return i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, ge = [], ye = /* @__PURE__ */ w(
  pe,
  me,
  ge,
  !1,
  null,
  null,
  null,
  null
);
const lt = ye.exports;
const be = {
  name: "Confirm",
  components: {
    Card: k,
    Tips: I,
    Boom: nt
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
var ve = function() {
  var t = this, i = t._self._c;
  return i("span", { staticClass: "s-confirm-warp" }, [t._t("default", function() {
    return [t._t("ref"), t._t("reference")];
  }), i("Tips", t._b({ tag: "Stream", staticClass: "s-confirm", attrs: { columns: { type: t.type }, visible: t.proxy, min: ["auto"], height: "auto", arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : "" }, scopedSlots: t._u([{ key: "default", fn: function() {
    return [t._t("el", function() {
      return [i("Card", { attrs: { flex: "", column: "" }, scopedSlots: t._u([{ key: "title", fn: function() {
        return [i("Card", t._b({ staticClass: "s-confirm-title", attrs: { height: "auto" } }, "Card", t.titleAttrs, !1), [t._t("title", function() {
          return [t._v(t._s(t.title))];
        })], 2)];
      }, proxy: !0 }, { key: "content", fn: function() {
        return [t._t("content", function() {
          return [t._v(t._s(t.content))];
        }), t._t("bottom", function() {
          return [i("Card", { staticClass: "s-confirm-booms", attrs: { flex: "", space: "", height: "auto" } }, [i("span"), i("span", { attrs: { flex: "" } }, [t._t("boom", function() {
            return [t._t("cancel", function() {
              return [i("Boom", t._b({ attrs: { cancel: "" }, on: { click: function(s) {
                return s.stopPropagation(), t.emitcancel.apply(null, arguments);
              } } }, "Boom", t.cancelAttrs, !1), [t._t("can", null, { text: t.cancel }), t._v(" " + t._s(t.cancelAttrs.text || t.cancel) + " ")], 2)];
            }, null, { click: t.emitcancel, text: t.cancel }), t._t("submit", function() {
              return [i("Boom", t._b({ staticClass: "simply", attrs: { submit: "" }, on: { click: function(s) {
                return s.stopPropagation(), t.emitsubmit.apply(null, arguments);
              } } }, "Boom", t.submitAttrs, !1), [t._t("sub", null, { text: t.submit }), t._v(" " + t._s(t.submitAttrs.text || t.submit) + " ")], 2)];
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
}, xe = [], $e = /* @__PURE__ */ w(
  be,
  ve,
  xe,
  !1,
  null,
  "13c825c6",
  null,
  null
);
const Bt = $e.exports;
const we = {
  name: "Div",
  components: {
    Card: k
  }
};
var ke = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) });
}, Se = [], Te = /* @__PURE__ */ w(
  we,
  ke,
  Se,
  !1,
  null,
  "ccdfcf38",
  null,
  null
);
const Wt = Te.exports;
const Ce = {
  name: "Flex",
  components: {
    Card: k
  }
};
var Ae = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) });
}, Re = [], Ne = /* @__PURE__ */ w(
  Ce,
  Ae,
  Re,
  !1,
  null,
  "a43059bb",
  null,
  null
);
const Ft = Ne.exports;
let Tt = (e) => e == null || e == null, ze = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const Ee = {
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
      return W(
        s,
        {
          "--width": x(this.realW),
          "--height": x(this.realH),
          "--flyweight-content": x(i)
        },
        t && {
          "--flyweight-h": x(t)
        },
        e && {
          "--flyweight-w": x(e)
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
      ze(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: x,
    trigger(e, t) {
      j(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        b(e, (i, s) => {
          this.$emit(s[0], Tt(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      p(
        [
          this.cheackflys,
          (t) => {
            t = t || {};
            let i = t.index || b(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              t.picker,
              t.id
            );
            Tt(i) || this.setindex(i);
          }
        ],
        this,
        e
      );
    },
    setindex(e) {
      p(
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
        p(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], i = p(this.direction, e.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      W(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, b(
        this.flyweights,
        (n, l, u, o, a, _, d, c, f) => {
          if (u = n / a >> 0, c = u + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(u < _ % o) + /* 计算轮数, row的倍数 */
          (_ / o >> 0)), f = c * a + n % a, f >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = c, l.i = f, l.data = this.flys[f];
          let m = [
            /* top */
            c * this.expand + l.x,
            /* left */
            l.space
          ];
          d && m.reverse(), l.top = m[0], l.left = m[1];
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
      let i = this.scrollx, s = this.flyweight, r = T(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, u] = this.offset, o = r.width, a = r.height, _ = (ft(this.width, o) || o) + l, d = ft(this.height, a) + u, c = [o / _ >> 0 || 1, a / d >> 0 || 1];
        i && c.reverse();
        let [f, m] = c, g = this.padding, C, N = 0, y, $;
        i ? (y = _, _ -= l, $ = (S) => (
          /* 计算top偏移量 */
          S * (d - u) + (S + 1) * u
        )) : (n ? (_ = (o - l * (f + 2 * g - 1)) / f, C = !g * l, N = g * l) : (C = 0, N = o < _ ? 0 : (o % _ + l * f) / (f + 1) >> 0, _ -= l), $ = (S) => S * (_ + C) + (S + 1) * N, y = d), this.row = m + 2, this.column = f, this.realH = d - u, this.realW = _, this.expand = y, this.Size = Math.ceil(e / f) * y;
        let A = Math.min(e, f * this.row), v = A - 1, z;
        for (; A-- > 0; )
          z = v - A, this.$set(t, z, {
            x: l,
            y: u,
            width: _,
            height: d - u,
            space: $(z % f),
            data: {}
          });
        t.length = v + 1;
        let E = [];
        a / y > v / f && E.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), E.push([
          "update:space",
          {
            row: (v / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(E);
      });
    }
  }
};
var Le = function() {
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
}, Be = [], We = /* @__PURE__ */ w(
  Ee,
  Le,
  Be,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Mt = We.exports;
let Fe;
const Ct = {
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  required: (e, t) => !t
}, Me = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: k, Stream: lt },
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
      id: st("input-{1000-9999}-{1000-9999}"),
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
    T(this.$attrs, "value|modelValue=>value", (t, i) => {
      this.trigger = t, this.__emit(i);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          p([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), b(["left", "right", "rm"], (t, i, s) => {
      s = p([
        ["$el", this.$refs[i] || ""],
        [i, this.$refs]
      ]), this[i] = p("offsetWidth", s || "") || null;
    });
    let e = p([
      ["assign", Object, {}, this.$attrs],
      [
        function() {
          let t = {};
          return b(this.$attrs, (i, s) => {
            t[i] = this.$attrs[i];
          }), t;
        },
        this
      ]
    ]);
    e[this.trigger] = void 0, this.attrs = e, b(
      this.$attrs,
      (t, i, s) => {
        Gt(i) && (this.inputAttrs[t] = i), t in s && (p("removeAttribute", this.$el, t), this.$watch(
          "$attrs." + t,
          (r) => {
            this.inputAttrs[t] = r;
          },
          { immediate: !0 }
        ));
      },
      Dt("maxlength,type,disabled,readonly")
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
      b(j(e) ? e : [e], (i, s, r) => {
        b(Ct, (n, l) => {
          n in s && (r = [
            function(u, o, a, _, d, c, f) {
              let m = u.trigger;
              if (!u.required && m && this !== m)
                return;
              let g = o(a, f, c);
              return d.error = g ? _ : Fe;
            },
            this,
            s,
            Ct[n],
            s[n],
            s.message,
            this,
            /number/.test(this.type)
          ]);
        }), t.push(r);
      }), this.RULE.push(t);
    },
    __runer(e, t) {
      p([this.RULE], null, e, t);
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
var Oe = function() {
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
  })], 2), i("Card", { ref: "left", staticClass: "s-wrap-left", attrs: { height: "100%", nothing: "", width: "auto", bg: "transparent", vc: "", center: "" } }, [t._t("left", function() {
    return [t._t("icon")];
  })], 2), i("Card", { staticClass: "input-error", attrs: { nothing: "", height: "auto" } }, [t._t("error", function() {
    return [t._v(t._s(t.error))];
  })], 2)], 1);
}, He = [], Pe = /* @__PURE__ */ w(
  Me,
  Oe,
  He,
  !1,
  null,
  "59fb6448",
  null,
  null
);
const Ot = Pe.exports, je = {}, Ht = [];
Ht.push(nt, k, Bt, Wt, Ft, Mt, Ot, lt, I);
const qe = { Boom: nt, Card: k, Confirm: Bt, Div: Wt, Flex: Ft, Flyweight: Mt, Input: Ot, Stream: lt, Tips: I };
je.install = function(e, t = {}) {
  Ht.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  nt as Boom,
  k as Card,
  Bt as Confirm,
  Wt as Div,
  Ft as Flex,
  Mt as Flyweight,
  Ot as Input,
  lt as Stream,
  I as Tips,
  qe as components,
  je as default
};
