import { runer as p, each as g, isEmpty as F, take as H, merge as W, picker as R, isSimplyType as ft, isString as Vt, format as st, isArray as V, array2Json as qt } from "@soei/util";
import { runer as h, isArray as Gt, each as et, isNil as U, take as Xt, isString as Yt, Event as Jt, isFunction as Kt } from "@soei/tools";
import Qt from "@soei/picker";
let Zt = /(\d+|[+\-\*/]|%)/g, dt = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, pt = (e, t) => {
  let i;
  if (i = p("match", e, Zt)) {
    let s = i.length, r, n = 0, l, u = [];
    for (; s--; )
      n = i.shift(), n in dt ? (r && u.push(r), n === "%" && (u.length = 2), l = n) : +n && u.push(+n), u.length == 2 && (u.push(t), r = dt[l].apply(null, u), u.length = 0);
    +r || (r = +u.pop()), e = r >> 0;
  }
  return e;
}, v = (e, t) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
function w(e, t, i, s, r, n, l, u) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = i, o._compiled = !0), s && (o.functional = !0), n && (o._scopeId = "data-v-" + n);
  var c;
  if (l ? (c = function(f) {
    f = f || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !f && typeof __VUE_SSR_CONTEXT__ < "u" && (f = __VUE_SSR_CONTEXT__), r && r.call(this, f), f && f._registeredComponents && f._registeredComponents.add(l);
  }, o._ssrRegister = c) : r && (c = u ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), c)
    if (o.functional) {
      o._injectStyles = c;
      var _ = o.render;
      o.render = function(a, m) {
        return c.call(m), _(a, m);
      };
    } else {
      var d = o.beforeCreate;
      o.beforeCreate = d ? [].concat(d, c) : [c];
    }
  return {
    exports: e,
    options: o
  };
}
let Nt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function te(e, t, i) {
  return this.$nextTick(() => {
    this.rm(e.replace(/\..*/, ""));
  }), Nt.test(i) ? v(t) : t;
}
function it(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
function ee(e) {
  p("removeAttribute", this.$el, e);
}
let zt = {
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
      if (F(e))
        return;
      let t = [], i = this.$attrs;
      H(
        [e, i],
        "0.text|0.txt|0.label:label,0.css|1.title-*:tcss.*,1.title-font.*:tcss.font-*",
        this,
        (s, r, n) => (t.push([
          (l, u) => {
            this.rm(u);
          },
          null,
          this,
          s
        ]), Nt.test(n) ? v(r) : r),
        this.tcss
      ), this.$nextTick(() => {
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
      W(t, this.$data, this.$props, this.$attrs, "mix"), this._style = H(t, e, (i, s, r) => (this.$watch("$attrs." + i, (n) => {
        this._style[r] = this.set(i, n, r);
      }), this.set(i, s, r)));
    },
    immediate: !0
  }
}, ie = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Lt = {};
g(
  ie,
  (e, t, i) => {
    e = it(t), Lt["--" + it(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  zt
);
const se = {
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
  watch: zt,
  methods: {
    rm: ee,
    set: te,
    exec: v,
    isEmpty: F,
    picker: R,
    runer: p,
    isSimplyType: ft,
    tr() {
      let e = {}, t = this.offset, i = this.$attrs;
      return this.margin(t), this.css(Lt, e), W(e, this._style, i.style, !0, "mix"), e;
    },
    tolower: it,
    css(e, t) {
      g(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = v(r));
      });
    },
    change(e) {
      ft(e) || (this.closecss = H(
        e,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(e) {
      e = Vt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e, H(this.$attrs, "l:3,t:0,r:1,b:2", e, (t) => this.rm(t)), !F(e) && H(
        e,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (t, i, s) => {
          if (i == 0)
            return;
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
var re = function() {
  var t = this, i = t._self._c;
  return i("div", { key: t.trigger, class: {
    card: t.$attrs.use === void 0
  }, style: t.tr() }, [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "", vc: "" } }, [t._t("subtitle", function() {
        return [i("span", { style: t.tcss }, [t._v(t._s(t.sub))])];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, on: { click: function(s) {
          return s.stopPropagation(), s.preventDefault(), t.$emit("close");
        } } }, [t._t("close")], 2)], 2)];
      }, null, { el: t.$el, picker: t.picker, runer: t.runer })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, ne = [], le = /* @__PURE__ */ w(
  se,
  re,
  ne,
  !1,
  null,
  "213c498b",
  null,
  null
);
const T = le.exports, mt = /(?:\,|\|{2})/, gt = "";
let L = document.documentElement, yt, bt = ["s-left", "s-top", "s-right", "s-bottom"], oe = { left: 0, top: 1, right: 2, bottom: 3 };
const P = [];
var ae = Qt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let rt = {}, Bt = null;
ae(rt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    Bt = ue(() => {
      h(P);
    }, e), this._delay = e;
  }
});
rt.delay = 60;
function ue(e, t) {
  let i = 0, s = null;
  return function() {
    let r = Array.apply(null, arguments);
    const n = Date.now(), l = this;
    n - i >= t ? (s && (clearTimeout(s), s = null), i = n, e.apply(l, r)) : s || (s = setTimeout(() => {
      i = Date.now(), s = null, e.apply(l, r);
    }, t - (n - i)));
  };
}
L.clientHeight, L.clientWidth;
const O = () => {
  L.clientHeight, L.clientWidth, Bt();
};
function vt(e) {
  Et(e), P.push(e);
}
function ce(e, t) {
  if (!h(["getBoundingClientRect"], e))
    return;
  let i = e.getBoundingClientRect(), s = t.x, r = t.y;
  return s > i.left && s < i.left + i.width && r > i.top && r < i.top + i.height;
}
function Et(e) {
  let t = et(P, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || P.splice(t, 1);
}
const E = new ResizeObserver(O);
E.observe(L);
function xt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const Z = [], z = (e) => {
  if (Gt(e))
    Z.push(e);
  else
    return +e < 0 ? h(e, Z) : Z.pop();
};
h([
  [
    "addEventListener",
    window,
    "keydown",
    function(e) {
      if (e.keyCode === 27) {
        h(["stopPropagation", "preventDefault"], e);
        let t = z(-1);
        t && h([[t[4]]]) === void 0 && h([z()]);
      }
    },
    !0
  ]
]);
const $t = {};
var wt = {
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
    for (var n, l, u = this.rWidth, o, c = e.match(this.rPosition), _ = 0, d = c.length; _ < d; _++)
      o = c[_], o != r ? s[o] = 0 : (l = c[(_ + 1) % d], n = +!u.test(l), this.css(s, i, t, n), l == o && this.css(s, i, t, +!n));
    return s;
  }
};
function Mt(e) {
  e.onresize || (P.push([Mt, null, e]), e.onresize = !0);
  var t = L, i = t.clientHeight, s = t.clientWidth, r = e.target, n = e.room, l = e.index, u = e.position, o = e.edge || 7, c = e.arrow || 0, _ = e.css, d = e.space || (e.space = []), f = /\s+|center/.test(u);
  _["--tips-h--"] = i;
  var a = r.getBoundingClientRect(), m = a.width && a.height || f;
  if (_.display = m ? "" : "none", !m)
    return;
  var y = n.offsetHeight, A = n.offsetWidth, b = U(e.offset) ? 7 : e.offset, k = "3,0,2,1".split(mt), B, x = a.left, $ = a.top, N = Math.max($, o), S = (a.height == yt ? a.bottom - $ : a.height) >> 0, C = (a.width == yt ? a.right - x : a.width) >> 0, ot = s - A - b, at = i - y - b, ut = x < 0 || x + C / 2 > s, ct = $ < 0 || $ + S > i, q = [
    /* left: 0 */
    ct ? -1 : x - A,
    /* top: 1 */
    ut ? -1 : N - y,
    /* right: 2 */
    ct ? -1 : ot - a.right,
    /* bottom: 3 */
    ut ? -1 : at - a.bottom
  ];
  u && (et(
    u.split(mt),
    function(I, D, Q, Ut) {
      Ut.push(Q[D]);
    },
    oe,
    B = []
  ), k.unshift.apply(k, B)), l = et(
    k,
    function(I, D, Q) {
      if (Q[D] - o > 0)
        return D;
    },
    q
  ), f && (l = void 0);
  var G = 0, X = 0, ht = 0, Y = 0;
  if (l == null)
    wt.trigger("center", n, L, _);
  else {
    var J = l == 0 || l == 2;
    G = xt(
      J ? l == 2 ? a.right + b : q[0] - b : (
        /* 目标对象的 left */
        x - c
      ),
      o,
      ot
    ), X = xt(
      J ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          N - (y - S) / 2,
          b
        )
      ) : (
        // )
        l == 3 ? $ + S + c + b : q[1] - b
      ),
      o,
      at
    ), J ? Y = Math.max(
      N - X + (S - c) / 2 - c,
      c
    ) : ht = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - G + (C - c) / 2 - c,
        /* 目标宽 - 两倍的箭头 */
        A - 4 * c
      ),
      c
    );
    let I = wt.aLTM;
    _[I[0]] = G, _[I[1]] = X, _["--tips-arrow-top"] = (S > y, Y || gt), _["--tips-arrow-left"] = ht || gt;
  }
  let _t = n.classList, Dt = bt[l], K = d[0];
  (U(K) || K != l) && h([
    [
      /* 移除旧值 */
      ["remove", _t, bt[K]],
      /* 添加新值 */
      ["add", _t, Dt]
    ],
    () => {
      d.shift(), d.push(l), e.index = l;
    }
  ]);
}
const kt = document.documentElement, M = (e) => (h(["stopPropagation", "preventDefault"], e), e), St = (e) => {
  let t = z(e), i = R(t, "1=>host,3=>sign,4=>modal", !0);
  return i.task = t, i;
}, tt = "data-tips-scroll", he = -1e4, Tt = 3, Ct = {
  proxy: function(e) {
    e && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let t = 1e3, i = 0, s = +this.timer;
    e === !0 && s && (this.t = s / t, this._timer__ = setInterval(() => {
      this.t = Math.max(s - ++i * t, 0) / t, i * t >= s && (this.proxy = !1, clearInterval(this._timer__));
    }, t)), this.$emit("update:visible", e), h([["visible", this.on, e]]);
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
      let t = R(
        [e],
        st(
          "0.?.$el|0.$el|0=>el",
          R(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (h(["currentTarget", "nodeType"], t || "")) {
        let i = t;
        t instanceof Jt && (i = t.currentTarget, M(t)), this._event_mark = !1, this._target__ = i, i.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), i.mark = !0;
        });
      }
    }
  },
  position(e) {
    O();
  }
}, _e = {
  name: "Tips",
  components: {
    Card: T
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: he
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
      default: Tt
    },
    timer: {
      type: [String, Number]
    },
    on: {
      type: [Object]
    }
  },
  watch: Ct,
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
      W(t, this.__css(), !0), h([["before", this.on, t]]), Mt({
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
        offset: U(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this.arrow,
        edge: this.edge
      }), h([["after", this.on, t]]), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (this.static || this.isSimply || e.nodeName == "#comment")
        return;
      let i = this.isModal, s = Xt(this.$attrs, "append-to-*|append-to=>*", (l) => {
        h("removeAttribute", e, l);
      }), r;
      for (let l in s) {
        r = (s[l] || l).replace(/_/, ".");
        break;
      }
      if (t)
        return h([["removeChild", e.parentNode, e]]);
      let n = document;
      r = r && n.querySelector(r + " :nth-child(1)") || n.body, h([
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
        t ? h(e.addEventListener, e, "scroll", O) : (h(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, tt), i || (h(e.addEventListener, e, "scroll", O), this.__attr(e, tt, "true"))));
      });
    },
    __css() {
      let e = {};
      return this.arrow = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, R(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      if (U(this.static))
        return;
      this.init(), vt(this.init), rt.delay = +this.delay, vt(this.__2listener), this.__toggle_append(this.$el);
      let e = this._rank__ = [[["observe", E]], null, this.$el];
      h.apply(null, e), e[0][0][0] = "unobserve";
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          h(e, this, arguments);
        },
        this.delay === Tt ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        M(e), this.__Task(e), this.$emit("toggle", this.proxy = !0);
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
      M(e);
      let t;
      this.$emit("toggle", t = this.proxy = !this.proxy), t || this.__close(e);
    },
    __close(e) {
      let { task: t, host: i, sign: s, modal: r } = St(-1);
      if (t !== void 0) {
        if (ce(i.$el, e))
          return M(e);
        if (!i.proxy)
          return z(), i._task__ = !1, s === this.sign ? void 0 : this.__close(e);
        if (h(r) !== void 0)
          return M(e);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === e.currentTarget && s == this.sign || (h([t || []]), z(), i._task__ = !1);
      }
    },
    __click(e) {
      M(e);
      let t = F(e), { task: i, sign: s, host: r, modal: n } = St(-1);
      h(n) !== void 0 && (i = null);
      let l = s == this.sign;
      this.$attrs.clear === void 0 || (i && h([i]), z()), l || this.__Task(
        e,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), t || this.__toggle(e);
    },
    __Task(e, t, i) {
      this._task__ || (this._task__ = !0, z(["__hide", this, e, this.sign, t, i]));
    },
    // __nextTick(back) {
    //   let re = () => {
    //     let el = this.$el;
    //     if (el.nodeType == 8) {
    //       return requestAnimationFrame(re);
    //     }
    //     /* 鼠标离开 */
    //     runer([
    //       [back],
    //       [
    //         "addEventListener",
    //         el,
    //         "mouseenter",
    //         () => {
    //           clearTimeout(this._t__);
    //         },
    //       ],
    //       ["addEventListener", el, "mouseleave", this.__hide],
    //     ]);
    //   };
    //   requestAnimationFrame(re);
    // },
    /* 触发事件 */
    __trigger(e) {
      if (Yt(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let t = !1;
        (this._event__ = {
          over: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            ["mouseleave", this.__hide]
          ],
          hover: [
            /* 鼠标进入 */
            [
              "mouseenter",
              (s) => {
                t !== !0 && (t = !0, this.__visible(s));
              }
            ],
            [
              "mouseleave",
              (s) => {
                t = !1, this._t__ = setTimeout(() => {
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
        }[e]).push(["click", this.__close, kt, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(e) ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      V(i) || (i = [i]);
      let s = [];
      g(i, (r, n) => {
        let l = 0;
        n[2] === kt && ++l && $t.__tipsmark_ || (l && ($t.__tipsmark_ = !0), s.push([
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
    Ct.target.handler.call(this, this.target), this._target__ = this._target__ || h("parentNode", this.$el);
  },
  beforeUnmount() {
    h.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Et(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(e, t) {
      h(e.removeEventListener, e, "scroll", O), h(e.removeAttribute, e, tt, void 0), t || h(E.unobserve, E, e);
    });
  }
};
var fe = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", { staticClass: "tips", class: {
    "tips-fly": t.isModal
  }, style: t.static ? null : t.css, attrs: { inherit: "", "s-tips-completed": t.completed, static: t.static ? "" : null, mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>--w-,minh|min.1=>--h-,maxw|max.0=>--w--,maxh|max.1=>--h--,m=>margin" }, on: { click: t.__close }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, { t: t.t }, n)];
    } };
  })], null, !0) }) : t._e();
}, de = [], pe = /* @__PURE__ */ w(
  _e,
  fe,
  de,
  !1,
  null,
  "071d1fcb",
  null,
  null
);
const j = pe.exports;
const me = {
  name: "Boom",
  emits: ["click"],
  components: { Card: T, Tips: j },
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
      g("disabled visible tips".split(/\s+/g), (e, t) => {
        p("removeAttribute", this.$el, t);
      });
    }
  }
};
var ge = function() {
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
}, ye = [], be = /* @__PURE__ */ w(
  me,
  ge,
  ye,
  !1,
  null,
  "5f36c601",
  null,
  null
);
const nt = be.exports, ve = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return F(i) ? [] : V(i) ? i : [i];
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
    R(
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
var xe = function() {
  var t = this, i = t._self._c;
  return i("KeepAlive", [i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, { _: t.$attrs }, s);
  })], 2)], 1);
}, $e = [], we = /* @__PURE__ */ w(
  ve,
  xe,
  $e,
  !1,
  null,
  null,
  null,
  null
);
const lt = we.exports;
const ke = {
  name: "Confirm",
  components: {
    Card: T,
    Tips: j,
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
var Se = function() {
  var t = this, i = t._self._c;
  return i("span", { staticClass: "s-confirm-warp" }, [t._t("default", function() {
    return [t._t("ref"), t._t("reference")];
  }), i("Tips", t._b({ tag: "Stream", staticClass: "s-confirm", attrs: { columns: { type: t.type }, visible: t.proxy, min: ["auto"], height: "auto", arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : "" }, scopedSlots: t._u([{ key: "default", fn: function() {
    return [t._t("el", function() {
      return [i("Card", { attrs: { flex: "", column: "", inherit: "" }, scopedSlots: t._u([{ key: "title", fn: function() {
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
              } } }, "Boom", t.cancelAttrs, !1), [t._t("can", null, { text: t.cancel }), t._v(" " + t._s(t.cancelAttrs.txt || t.cancel) + " ")], 2)];
            }, null, { click: t.emitcancel, text: t.cancel }), t._t("submit", function() {
              return [i("Boom", t._b({ staticClass: "simply", attrs: { submit: "" }, on: { click: function(s) {
                return s.stopPropagation(), t.emitsubmit.apply(null, arguments);
              } } }, "Boom", t.submitAttrs, !1), [t._t("sub", null, { text: t.submit }), t._v(" " + t._s(t.submitAttrs.txt || t.submit) + " ")], 2)];
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
}, Te = [], Ce = /* @__PURE__ */ w(
  ke,
  Se,
  Te,
  !1,
  null,
  "840c0b69",
  null,
  null
);
const Wt = Ce.exports;
const Re = {
  name: "Div",
  components: {
    Card: T
  }
};
var Ae = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) });
}, Ne = [], ze = /* @__PURE__ */ w(
  Re,
  Ae,
  Ne,
  !1,
  null,
  "ccdfcf38",
  null,
  null
);
const Ht = ze.exports;
const Le = {
  name: "Flex",
  components: {
    Card: T
  }
};
var Be = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) });
}, Ee = [], Me = /* @__PURE__ */ w(
  Le,
  Be,
  Ee,
  !1,
  null,
  "a43059bb",
  null,
  null
);
const Ot = Me.exports;
let Rt = (e) => e == null || e == null, We = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const He = {
  name: "Flyweight",
  components: {
    Card: T
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
      We(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: v,
    trigger(e, t) {
      V(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        g(e, (i, s) => {
          this.$emit(s[0], Rt(s[1]) ? !0 : s[1]);
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
            let i = t.index || g(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              t.picker,
              t.id
            );
            Rt(i) || this.setindex(i);
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
      this.end = !1, this.__index = s.index, g(
        this.flyweights,
        (n, l, u, o, c, _, d, f, a) => {
          if (u = n / c >> 0, f = u + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(u < _ % o) + /* 计算轮数, row的倍数 */
          (_ / o >> 0)), a = f * c + n % c, a >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = f, l.i = a, l.data = this.flys[a];
          let m = [
            /* top */
            f * this.expand + l.x,
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
      let i = this.scrollx, s = this.flyweight, r = R(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, u] = this.offset, o = r.width, c = r.height, _ = (pt(this.width, o) || o) + l, d = pt(this.height, c) + u, f = [o / _ >> 0 || 1, c / d >> 0 || 1];
        i && f.reverse();
        let [a, m] = f, y = this.padding, A, b = 0, k, B;
        i ? (k = _, _ -= l, B = (C) => (
          /* 计算top偏移量 */
          C * (d - u) + (C + 1) * u
        )) : (n ? (_ = (o - l * (a + 2 * y - 1)) / a, A = !y * l, b = y * l) : (A = 0, b = o < _ ? 0 : (o % _ + l * a) / (a + 1) >> 0, _ -= l), B = (C) => C * (_ + A) + (C + 1) * b, k = d), this.row = m + 2, this.column = a, this.realH = d - u, this.realW = _, this.expand = k, this.Size = Math.ceil(e / a) * k;
        let x = Math.min(e, a * this.row), $ = x - 1, N;
        for (; x-- > 0; )
          N = $ - x, this.$set(t, N, {
            x: l,
            y: u,
            width: _,
            height: d - u,
            space: B(N % a),
            data: {}
          });
        t.length = $ + 1;
        let S = [];
        c / k > $ / a && S.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), S.push([
          "update:space",
          {
            row: ($ / a >> 0) + 1,
            column: a,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(S);
      });
    }
  }
};
var Oe = function() {
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
}, Fe = [], Pe = /* @__PURE__ */ w(
  He,
  Oe,
  Fe,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Ft = Pe.exports;
let je;
const At = {
  /* 自己动手 */
  diy: !1,
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  is: (e, t) => e.test(t),
  required: (e, t) => !t
}, Ie = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: T, Stream: lt },
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
    R(this.$attrs, "value|modelValue=>value", (t, i) => {
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
    }), g(["left", "right", "rm"], (t, i, s) => {
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
          return g(this.$attrs, (i, s) => {
            t[i] = this.$attrs[i];
          }), t;
        },
        this
      ]
    ]);
    e[this.trigger] = void 0, this.attrs = e, g(
      this.$attrs,
      (t, i, s) => {
        Kt(i) && (this.inputAttrs[t] = i), t in s && (p("removeAttribute", this.$el, t), this.$watch(
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
      g(V(e) ? e : [e], (i, s, r) => {
        g(At, (n, l) => {
          n in s && (r = [
            function(u, o, c, _, d, f, a) {
              let m = u.trigger;
              if (!u.required && m && this !== m)
                return;
              let y = p([o, c], u, c, a, f);
              return d.error = y ? _ || y : je;
            },
            this,
            s,
            At[n],
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
var De = function() {
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
    }, { limit: t.limit }), i("span", { ref: "rm", staticClass: "s-wrap-close", on: { click: t.close } }, [t._v("×")]), t._t("r")];
  })], 2), i("Card", { ref: "left", staticClass: "s-wrap-left", attrs: { height: "100%", nothing: "", width: "auto", bg: "transparent", vc: "", center: "" } }, [t._t("left", function() {
    return [t._t("icon")];
  })], 2), i("Card", { staticClass: "input-error", attrs: { nothing: "", height: "auto" } }, [t._t("error", function() {
    return [t._v(t._s(t.error))];
  }, { error: t.error })], 2)], 1);
}, Ue = [], Ve = /* @__PURE__ */ w(
  Ie,
  De,
  Ue,
  !1,
  null,
  "26ce91ef",
  null,
  null
);
const Pt = Ve.exports, qe = {
  name: "Loading",
  components: {
    Tips: j
  },
  props: {
    visible: {
      type: Boolean,
      default: !0
    }
  }
};
var Ge = function() {
  var t = this, i = t._self._c;
  return i("Tips", { attrs: { loading: "", visible: t.visible, position: "right top" } }, [t._t("default")], 2);
}, Xe = [], Ye = /* @__PURE__ */ w(
  qe,
  Ge,
  Xe,
  !1,
  null,
  null,
  null,
  null
);
const jt = Ye.exports, Je = {}, It = [];
It.push(nt, T, Wt, Ht, Ot, Ft, Pt, jt, lt, j);
const ti = { Boom: nt, Card: T, Confirm: Wt, Div: Ht, Flex: Ot, Flyweight: Ft, Input: Pt, Loading: jt, Stream: lt, Tips: j };
Je.install = function(e, t = {}) {
  It.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  nt as Boom,
  T as Card,
  Wt as Confirm,
  Ht as Div,
  Ot as Flex,
  Ft as Flyweight,
  Pt as Input,
  jt as Loading,
  lt as Stream,
  j as Tips,
  ti as components,
  Je as default
};
