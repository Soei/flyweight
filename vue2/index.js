import { take as Rt, runer as p, each as b, isEmpty as D, merge as M, picker as T, isSimplyType as _t, isString as Dt, format as rt, isArray as q, array2Json as qt } from "@soei/util";
import { runer as c, isArray as Vt, each as it, isNil as I, isString as Gt, isFunction as Xt } from "@soei/tools";
import Yt from "@soei/picker";
let Jt = /(\d+|[+\-\*/]|%)/g, ft = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, dt = (e, t) => {
  let i;
  if (i = p("match", e, Jt)) {
    let s = i.length, r, l = 0, n, a = [];
    for (; s--; )
      l = i.shift(), l in ft ? (r && a.push(r), l === "%" && (a.length = 2), n = l) : +l && a.push(+l), a.length == 2 && (a.push(t), r = ft[n].apply(null, a), a.length = 0);
    +r || (r = +a.pop()), e = r >> 0;
  }
  return e;
}, v = (e, t) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
), U = (() => Rt)();
function $(e, t, i, s, r, l, n, a) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = i, o._compiled = !0), s && (o.functional = !0), l && (o._scopeId = "data-v-" + l);
  var u;
  if (n ? (u = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), r && r.call(this, h), h && h._registeredComponents && h._registeredComponents.add(n);
  }, o._ssrRegister = u) : r && (u = a ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), u)
    if (o.functional) {
      o._injectStyles = u;
      var _ = o.render;
      o.render = function(f, m) {
        return u.call(m), _(f, m);
      };
    } else {
      var d = o.beforeCreate;
      o.beforeCreate = d ? [].concat(d, u) : [u];
    }
  return {
    exports: e,
    options: o
  };
}
let pt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function st(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let Nt = {
  close: {
    handler(e) {
      this.change(e);
    },
    deep: !0
  },
  title: {
    deep: !0,
    immediate: !0,
    handler(e) {
      if (D(e))
        return;
      let t = [], i = this.$attrs;
      U([e, i], "0.text|0.txt|0.label:label,0.css|1.title-*:tcss.*,1.title-font.*:tcss.font-*", this, (s, r, l) => (t.push([(n, a) => {
        p("removeAttribute", this.$el, a);
      }, null, this, s]), pt.test(l) ? v(r) : r), this.tcss), this.$nextTick(() => {
        p(t);
      });
    }
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
      M(t, this.$data, this.$props, this.$attrs, "mix"), this._style = U(t, e, (i, s, r) => (this.$nextTick(() => {
        p("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), pt.test(r) ? v(s) : s));
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
], zt = {};
b(
  Kt,
  (e, t, i) => {
    e = st(t), zt["--" + st(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  Nt
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
      type: [String, Object],
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
      },
      tcss: {},
      label: ""
    };
  },
  computed: {
    // style() {
    //   return this.tr();
    // },
    sub() {
      return this.label || this.show || this.title;
    },
    tips() {
      return p("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Nt,
  methods: {
    exec: v,
    isEmpty: D,
    picker: T,
    runer: p,
    isSimplyType: _t,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(zt, e), M(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: st,
    css(e, t) {
      b(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = v(r));
      });
    },
    change(e) {
      _t(e) || (this.closecss = U(
        e,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(e) {
      U(
        Dt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (t, i, s) => {
          let r = v(i);
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
        return [i("span", { style: t.tcss }, [t._v(t._s(t.sub))])];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, on: { click: function(s) {
          return t.$emit("close");
        } } }, [t._t("close")], 2)], 2)];
      }, null, { el: t.$el, picker: t.picker, runer: t.runer })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, te = [], ee = /* @__PURE__ */ $(
  Qt,
  Zt,
  te,
  !1,
  null,
  "214111be",
  null,
  null
);
const k = ee.exports, mt = /(?:\,|\|{2})/, gt = "";
let P = document.documentElement, yt, bt = ["s-left", "s-top", "s-right", "s-bottom"], ie = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var se = Yt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let nt = {}, Lt = null;
se(nt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    Lt = re(() => {
      c(F);
    }, e), this._delay = e;
  }
});
nt.delay = 60;
function re(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, c(e, this, arguments));
  };
}
const j = () => {
  Lt();
};
function vt(e) {
  Et(e), F.push(e);
}
function ne(e, t) {
  if (!c(["getBoundingClientRect"], e))
    return;
  let i = e.getBoundingClientRect(), s = t.x, r = t.y;
  return s > i.left && s < i.left + i.width && r > i.top && r < i.top + i.height;
}
function Et(e) {
  let t = it(F, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || F.splice(t, 1);
}
const E = new ResizeObserver(j);
E.observe(P);
function xt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const Z = [], R = (e) => {
  if (Vt(e))
    Z.push(e);
  else
    return +e < 0 ? c(e, Z) : Z.pop();
};
c([
  [
    "addEventListener",
    window,
    "keydown",
    function(e) {
      if (e.keyCode === 27) {
        c(["stopPropagation", "preventDefault"], e);
        let t = R(-1);
        t && c([[t[4]]]) === void 0 && c([R()]);
      }
    },
    !0
  ]
]);
const $t = {};
var tt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  aLTM: ["--l", "--t"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLTM[s]] = (t[r] - i[r]) / 2;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var l, n, a = this.rWidth, o, u = e.match(this.rPosition), _ = 0, d = u.length; _ < d; _++)
      o = u[_], o != r ? s[o] = 0 : (n = u[(_ + 1) % d], l = +!a.test(n), this.css(s, i, t, l), n == o && this.css(s, i, t, +!l));
    return s;
  }
};
function Bt(e) {
  e.onresize || (F.push([Bt, null, e]), e.onresize = !0);
  var t = P, i = t.clientHeight, s = t.clientWidth, r = e.target, l = e.room, n = e.index, a = e.position, o = e.edge || 7, u = e.arrow || 0, _ = e.css, d = e.space || (e.space = []);
  if (_["--tips-h--"] = i, /\s+|center/.test(a)) {
    tt.trigger(a, l, P, _);
    return;
  }
  var h = r.getBoundingClientRect(), f = l.offsetHeight, m = l.offsetWidth, g = I(e.offset) ? 7 : e.offset, C = "3,0,2,1".split(mt), N, y = h.left, w = h.top, A = Math.max(w, o), x = (h.height == yt ? h.bottom - w : h.height) >> 0, z = (h.width == yt ? h.right - y : h.width) >> 0, L = s - m - g, S = i - f - g, at = y < 0 || y + z / 2 > s, ut = w < 0 || w + x > i, V = [
    /* left: 0 */
    ut ? -1 : y - m,
    /* top: 1 */
    at ? -1 : A - f,
    /* right: 2 */
    ut ? -1 : L - h.right,
    /* bottom: 3 */
    at ? -1 : S - h.bottom
  ];
  a && (it(
    a.split(mt),
    function(W, H, Q, Ut) {
      Ut.push(Q[H]);
    },
    ie,
    N = []
  ), C.unshift.apply(C, N)), n = it(
    C,
    function(W, H, Q) {
      if (Q[H] - o > 0)
        return H;
    },
    V
  );
  var G = 0, X = 0, ct = 0, Y = 0;
  if (n == null)
    tt.trigger("center", l, P, _);
  else {
    var J = n == 0 || n == 2;
    G = xt(
      J ? n == 2 ? h.right + g : V[0] - g : (
        /* 目标对象的 left */
        y - u
      ),
      o,
      L
    ), X = xt(
      J ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          A - (f - x) / 2,
          g
        )
      ) : (
        // )
        n == 3 ? w + x + u + g : V[1] - g
      ),
      o,
      S
    ), J ? Y = Math.max(
      A - X + (x - u) / 2 - u,
      u
    ) : ct = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - G + (z - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        m - 4 * u
      ),
      u
    );
    let W = tt.aLTM;
    _[W[0]] = G, _[W[1]] = X, _["--tips-arrow-top"] = (x > f, Y || gt), _["--tips-arrow-left"] = ct || gt;
  }
  let ht = l.classList, It = bt[n], K = d[0];
  (I(K) || K != n) && c([
    [
      /* 移除旧值 */
      ["remove", ht, bt[K]],
      /* 添加新值 */
      ["add", ht, It]
    ],
    () => {
      d.shift(), d.push(n), e.index = n;
    }
  ]);
}
const wt = document.documentElement, B = (e) => (c(["stopPropagation", "preventDefault"], e), e), kt = (e) => {
  let t = R(e), i = T(t, "1=>host,3=>sign,4=>modal", !0);
  return i.task = t, i;
}, et = "data-tips-scroll", le = -1e4, St = 3, Tt = {
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
        rt(
          "0.?.$el|0.$el|0=>el",
          T(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (c(["currentTarget", "nodeType"], t || "")) {
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
      default: St
    },
    timer: {
      type: [String, Number]
    }
  },
  watch: Tt,
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
      sign: rt("s-tips-{1-9}-{10-99}-{1-9}")
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
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), c(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return c(
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
      M(t, this.__css(), !0), Bt({
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
        offset: I(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this.arrow,
        edge: this.edge
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (this.static || this.isSimply || e.nodeName == "#comment")
        return;
      let i = this.isModal, s = Rt(this.$attrs, "append-to-*|append-to=>*", (n) => {
        c("removeAttribute", e, n);
      }), r;
      for (let n in s) {
        r = (s[n] || n).replace(/_/, ".");
        break;
      }
      if (t)
        return c([["removeChild", e.parentNode, e]]);
      let l = document;
      r = r && l.querySelector(r + " :nth-child(1)") || l.body, c([
        [
          i ? "insertBefore" : "appendChild",
          r.parentNode,
          e,
          i ? r : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? c(e.addEventListener, e, "scroll", j) : (c(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, et), i || (c(e.addEventListener, e, "scroll", j), this.__attr(e, et, "true"))));
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
      if (I(this.static))
        return;
      this.init(), vt(this.init), nt.delay = +this.delay, vt(this.__2listener), this.__toggle_append(this.$el);
      let e = this._rank__ = [[["observe", E]], null, this.$el];
      c.apply(null, e), e[0][0][0] = "unobserve";
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          c(e, this, arguments);
        },
        this.delay === St ? 100 : this.delay
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
      let { task: t, host: i, sign: s, modal: r } = kt(-1);
      if (t !== void 0) {
        if (ne(i.$el, e))
          return B(e);
        if (!i.proxy)
          return R(), i._task__ = !1, s === this.sign ? void 0 : this.__close(e);
        if (c(r) !== void 0)
          return B(e);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === e.currentTarget && s == this.sign || (c([t || []]), R(), i._task__ = !1);
      }
    },
    __click(e) {
      B(e);
      let t = D(e), { task: i, sign: s, host: r, modal: l } = kt(-1);
      c(l) !== void 0 && (i = null);
      let n = s == this.sign;
      this.$attrs.clear === void 0 || (i && c([i]), R()), n || this.__Task(
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
        c([
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
      if (Gt(e)) {
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
        }[e]).push(["click", this.__close, wt, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(e) ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      q(i) || (i = [i]);
      let s = [];
      b(i, (r, l) => {
        let n = 0;
        l[2] === wt && ++n && $t.__tipsmark_ || (n && ($t.__tipsmark_ = !0), s.push([
          e,
          l[2] || t,
          l[0],
          l[1] || this.__toggle
          // true
        ]));
      }), c(s);
    }
  },
  mounted() {
    Tt.target.handler.call(this, this.target), this._target__ = this._target__ || c("parentNode", this.$el);
  },
  beforeUnmount() {
    c.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Et(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(e, t) {
      c(e.removeEventListener, e, "scroll", j), c(e.removeAttribute, e, et, void 0), t || c(E.unobserve, E, e);
    });
  }
};
var ae = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", { staticClass: "tips", class: {
    "tips-fly": t.isModal
  }, style: t.static ? null : t.css, attrs: { "s-tips-completed": t.completed, static: t.static ? "" : null, mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>--w-,minh|min.1=>--h-,maxw|max.0=>--w--,maxh|max.1=>--h--,m=>margin" }, on: { click: t.__close }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(l) {
      return [t._t(r, null, { t: t.t }, l)];
    } };
  })], null, !0) }) : t._e();
}, ue = [], ce = /* @__PURE__ */ $(
  oe,
  ae,
  ue,
  !1,
  null,
  "4a19ce2e",
  null,
  null
);
const O = ce.exports;
const he = {
  name: "Boom",
  emits: ["click"],
  components: { Card: k, Tips: O },
  props: {
    loading: {
      type: [Boolean, String]
    }
  },
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
  return i("Card", { staticClass: "s-button", attrs: { use: "", mix: t.mix, loading: t.loading ? "" : void 0, center: "", space: "", vc: "" } }, [i("button", { attrs: { disabled: t.$attrs.disabled || t.loading, center: "", vc: "" }, on: { click: function(s) {
    return t.$emit("click", s);
  } } }, [t._t("inner", function() {
    return [i("span", [t._t("default", function() {
      return [t._v("提示")];
    })], 2)];
  })], 2), t._t("tips", function() {
    return [t.$attrs.tips ? i("Tips", t._b({}, "Tips", t.$attrs.tips, !1)) : t._e()];
  })], 2);
}, fe = [], de = /* @__PURE__ */ $(
  he,
  _e,
  fe,
  !1,
  null,
  "4498c832",
  null,
  null
);
const lt = de.exports, pe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return D(i) ? [] : q(i) ? i : [i];
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
            /^\$/.test(r) && M(this.Ref, t[r]);
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
    return t._t(t.__trigger(s), null, { _: t.$attrs }, s);
  })], 2);
}, ge = [], ye = /* @__PURE__ */ $(
  pe,
  me,
  ge,
  !1,
  null,
  null,
  null,
  null
);
const ot = ye.exports;
const be = {
  name: "Confirm",
  components: {
    Card: k,
    Tips: O,
    Boom: lt
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
      return { key: r, fn: function(l) {
        return [t._t(r, null, { close: t.close }, l)];
      } };
    })], null, !0) }, "Card", t.$attrs, !1))];
  }, proxy: !0 }], null, !0) }, "Stream", t.$attrs, !1))], 2);
}, xe = [], $e = /* @__PURE__ */ $(
  be,
  ve,
  xe,
  !1,
  null,
  "13c825c6",
  null,
  null
);
const Mt = $e.exports;
const we = {
  name: "Div",
  components: {
    Card: k
  }
};
var ke = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(l) {
      return [t._t(r, null, null, l)];
    } };
  })], null, !0) });
}, Se = [], Te = /* @__PURE__ */ $(
  we,
  ke,
  Se,
  !1,
  null,
  "ccdfcf38",
  null,
  null
);
const Ft = Te.exports;
const Ce = {
  name: "Flex",
  components: {
    Card: k
  }
};
var Ae = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(l) {
      return [t._t(r, null, null, l)];
    } };
  })], null, !0) });
}, Re = [], Ne = /* @__PURE__ */ $(
  Ce,
  Ae,
  Re,
  !1,
  null,
  "a43059bb",
  null,
  null
);
const Ot = Ne.exports;
let Ct = (e) => e == null || e == null, ze = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const Le = {
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
      return M(
        s,
        {
          "--width": v(this.realW),
          "--height": v(this.realH),
          "--flyweight-content": v(i)
        },
        t && {
          "--flyweight-h": v(t)
        },
        e && {
          "--flyweight-w": v(e)
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
    exec: v,
    trigger(e, t) {
      q(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        b(e, (i, s) => {
          this.$emit(s[0], Ct(s[1]) ? !0 : s[1]);
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
              (s, r, l, n) => {
                if (r[l] == n)
                  return s;
              },
              t.picker,
              t.id
            );
            Ct(i) || this.setindex(i);
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
      M(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, b(
        this.flyweights,
        (l, n, a, o, u, _, d, h, f) => {
          if (a = l / u >> 0, h = a + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(a < _ % o) + /* 计算轮数, row的倍数 */
          (_ / o >> 0)), f = h * u + l % u, f >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          n.index = h, n.i = f, n.data = this.flys[f];
          let m = [
            /* top */
            h * this.expand + n.x,
            /* left */
            n.space
          ];
          d && m.reverse(), n.top = m[0], n.left = m[1];
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
        let l = /true/.test(this.auto), [n, a] = this.offset, o = r.width, u = r.height, _ = (dt(this.width, o) || o) + n, d = dt(this.height, u) + a, h = [o / _ >> 0 || 1, u / d >> 0 || 1];
        i && h.reverse();
        let [f, m] = h, g = this.padding, C, N = 0, y, w;
        i ? (y = _, _ -= n, w = (S) => (
          /* 计算top偏移量 */
          S * (d - a) + (S + 1) * a
        )) : (l ? (_ = (o - n * (f + 2 * g - 1)) / f, C = !g * n, N = g * n) : (C = 0, N = o < _ ? 0 : (o % _ + n * f) / (f + 1) >> 0, _ -= n), w = (S) => S * (_ + C) + (S + 1) * N, y = d), this.row = m + 2, this.column = f, this.realH = d - a, this.realW = _, this.expand = y, this.Size = Math.ceil(e / f) * y;
        let A = Math.min(e, f * this.row), x = A - 1, z;
        for (; A-- > 0; )
          z = x - A, this.$set(t, z, {
            x: n,
            y: a,
            width: _,
            height: d - a,
            space: w(z % f),
            data: {}
          });
        t.length = x + 1;
        let L = [];
        u / y > x / f && L.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), L.push([
          "update:space",
          {
            row: (x / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(L);
      });
    }
  }
};
var Ee = function() {
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
}, Be = [], Me = /* @__PURE__ */ $(
  Le,
  Ee,
  Be,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Wt = Me.exports;
let Fe;
const At = {
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  required: (e, t) => !t
}, Oe = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: k, Stream: ot },
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
      id: rt("input-{1000-9999}-{1000-9999}"),
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
        Xt(i) && (this.inputAttrs[t] = i), t in s && (p("removeAttribute", this.$el, t), this.$watch(
          "$attrs." + t,
          (r) => {
            this.inputAttrs[t] = r;
          },
          { immediate: !0 }
        ));
      },
      qt("maxlength,type,disabled,readonly")
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
      b(q(e) ? e : [e], (i, s, r) => {
        b(At, (l, n) => {
          l in s && (r = [
            function(a, o, u, _, d, h, f) {
              let m = a.trigger;
              if (!a.required && m && this !== m)
                return;
              let g = o(u, f, h);
              return d.error = g ? _ : Fe;
            },
            this,
            s,
            At[l],
            s[l],
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
var We = function() {
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
}, He = [], Pe = /* @__PURE__ */ $(
  Oe,
  We,
  He,
  !1,
  null,
  "710c52f7",
  null,
  null
);
const Ht = Pe.exports, je = {
  name: "Loading",
  components: {
    Tips: O
  },
  props: {
    visible: {
      type: Boolean,
      default: !0
    }
  }
};
var Ie = function() {
  var t = this, i = t._self._c;
  return i("Tips", { attrs: { loading: "", visible: t.visible, position: "right top" } }, [t._t("default")], 2);
}, Ue = [], De = /* @__PURE__ */ $(
  je,
  Ie,
  Ue,
  !1,
  null,
  null,
  null,
  null
);
const Pt = De.exports, qe = {}, jt = [];
jt.push(lt, k, Mt, Ft, Ot, Wt, Ht, Pt, ot, O);
const Ye = { Boom: lt, Card: k, Confirm: Mt, Div: Ft, Flex: Ot, Flyweight: Wt, Input: Ht, Loading: Pt, Stream: ot, Tips: O };
qe.install = function(e, t = {}) {
  jt.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  lt as Boom,
  k as Card,
  Mt as Confirm,
  Ft as Div,
  Ot as Flex,
  Wt as Flyweight,
  Ht as Input,
  Pt as Loading,
  ot as Stream,
  O as Tips,
  Ye as components,
  qe as default
};
