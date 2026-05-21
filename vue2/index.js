import { runer as m, each as y, merge as L, picker as b, isEmpty as $t, isSimplyType as lt, isString as Ft, isArray as O, format as wt, array2Json as Ot } from "@soei/util";
import { runer as d, each as q, isNil as F, isString as Pt, isFunction as jt } from "@soei/tools";
import It from "@soei/picker";
let Ut = /(\d+|[+\-\*/]|%)/g, at = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ot = (e, t) => {
  let i;
  if (i = m("match", e, Ut)) {
    let s = i.length, r, n = 0, l, a = [];
    for (; s--; )
      n = i.shift(), n in at ? (r && a.push(r), n === "%" && (a.length = 2), l = n) : +n && a.push(+n), a.length == 2 && (a.push(t), r = at[l].apply(null, a), a.length = 0);
    +r || (r = +a.pop()), e = r >> 0;
  }
  return e;
}, x = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
function C(e, t, i, s, r, n, l, a) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = i, o._compiled = !0), s && (o.functional = !0), n && (o._scopeId = "data-v-" + n);
  var h;
  if (l ? (h = function(_) {
    _ = _ || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !_ && typeof __VUE_SSR_CONTEXT__ < "u" && (_ = __VUE_SSR_CONTEXT__), r && r.call(this, _), _ && _._registeredComponents && _._registeredComponents.add(l);
  }, o._ssrRegister = h) : r && (h = a ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), h)
    if (o.functional) {
      o._injectStyles = h;
      var u = o.render;
      o.render = function(c, p) {
        return h.call(p), u(c, p);
      };
    } else {
      var f = o.beforeCreate;
      o.beforeCreate = f ? [].concat(f, h) : [h];
    }
  return {
    exports: e,
    options: o
  };
}
let Vt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function G(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let St = {
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
        m("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Vt.test(n) ? x(s) : s));
    },
    immediate: !0
  }
}, Dt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Ct = {};
y(
  Dt,
  (e, t, i) => {
    e = G(t), Ct["--" + G(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  St
);
const Xt = {
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
      return m("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: St,
  methods: {
    exec: x,
    isEmpty: $t,
    picker: b,
    runer: m,
    isSimplyType: lt,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(Ct, e), L(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: G,
    css(e, t) {
      y(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = x(r));
      });
    },
    change(e) {
      lt(e) || (this.closecss = b(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      b(
        Ft(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, r) => {
          let n = x(i);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var qt = function() {
  var t = this, i = t._self._c;
  return i("div", { key: t.trigger, class: {
    card: t.$attrs.use === void 0
  }, style: t.tr() }, [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [t._t("subtitle", function() {
        return [t._v(t._s(t.sub))];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, attrs: { title: t.tips }, on: { click: function(s) {
          return t.$emit("close");
        } } })], 2)];
      })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, Gt = [], Yt = /* @__PURE__ */ C(
  Xt,
  qt,
  Gt,
  !1,
  null,
  "0cc1c50c",
  null,
  null
);
const k = Yt.exports;
const Jt = {
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
      y("disabled visible tips".split(/\s+/g), (e, t) => {
        m("removeAttribute", this.$el, t);
      });
    }
  }
};
var Kt = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-button", attrs: { use: "", mix: t.mix, center: "", space: "", vc: "", inline: "" } }, "Card", t.$attrs, !1), [i("button", { attrs: { disabled: t.$attrs.disabled, center: "", vc: "" }, on: { click: function(s) {
    return t.$emit("click", s);
  } } }, [t._t("inner", function() {
    return [i("span", [t._t("default", function() {
      return [t._v("提示")];
    })], 2)];
  })], 2), t._t("tips", function() {
    return [t.$attrs.tips ? i("tips", t._b({}, "tips", t.$attrs.tips, !1)) : t._e()];
  })], 2);
}, Qt = [], Zt = /* @__PURE__ */ C(
  Jt,
  Kt,
  Qt,
  !1,
  null,
  "5d1351d8",
  null,
  null
);
const K = Zt.exports, ut = /(?:\,|\|{2})/, Y = "px", ct = "";
let J = document.documentElement, ht, _t = ["s-left", "s-top", "s-right", "s-bottom"], te = { left: 0, top: 1, right: 2, bottom: 3 };
const W = [];
var ee = It(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let Q = {}, kt = null;
ee(Q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    kt = ie(() => {
      d(W);
    }, e), this._delay = e;
  }
});
Q.delay = 60;
function ie(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, d(e, this, arguments));
  };
}
const H = () => {
  kt();
};
function ft(e) {
  Tt(e), W.push(e);
}
function Tt(e) {
  let t = q(W, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || W.splice(t, 1);
}
const E = new ResizeObserver(H);
E.observe(J);
function dt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const pt = [], B = (e) => {
  if (e)
    pt.push(e);
  else
    return pt.pop();
}, mt = {};
var se = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLT[s]] = (t[r] - i[r]) / 2 + Y;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var n, l, a = this.rWidth, o, h = e.match(this.rPosition), u = 0, f = h.length; u < f; u++)
      o = h[u], o != r ? s[o] = 0 : (l = h[(u + 1) % f], n = +!a.test(l), this.css(s, i, t, n), l == o && this.css(s, i, t, +!n));
    return s;
  }
};
function Rt(e) {
  e.onresize || (W.push([Rt, null, e]), e.onresize = !0);
  var t = J, i = t.clientHeight, s = t.clientWidth, r = F(e.offset) ? 7 : e.offset, n = e.target, l = e.room, a = e.index, o = e.position, h = e.edge || 7, u = e.arrow || 0, f = e.css, _ = e.space || (e.space = []), c = n.getBoundingClientRect(), p = l.offsetHeight, $ = l.offsetWidth;
  if (/\s+|center/.test(o)) {
    se.trigger(o, l, J, f);
    return;
  }
  var R = "3,0,2,1".split(ut), z, g = c.left, w = c.top, T = Math.max(w, h), v = (c.height == ht ? c.bottom - w : c.height) >> 0, A = (c.width == ht ? c.right - g : c.width) >> 0, N = s - $ - r, S = i - p - r, et = g < 0 || g + A / 2 > s, it = w < 0 || w + v > i, P = [
    /* left: 0 */
    it ? -1 : g - $,
    /* top: 1 */
    et ? -1 : T - p,
    /* right: 2 */
    it ? -1 : N - c.right,
    /* bottom: 3 */
    et ? -1 : S - c.bottom
  ];
  o && (q(
    o.split(ut),
    function(Mt, M, D, Ht) {
      Ht.push(D[M]);
    },
    te,
    z = []
  ), R.unshift.apply(R, z)), a = q(
    R,
    function(Mt, M, D) {
      if (D[M] > 0)
        return M;
    },
    P
  );
  var j = 0, I = 0, st = 0, rt = 0;
  if (a != null) {
    var U = a == 0 || a == 2;
    j = Math.max(
      r,
      U ? a == 2 ? c.right + r : P[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        N,
        /* 目标对象的 left */
        g - u
      )
    ), I = Math.max(
      r,
      /* 打底最小 */
      U ? Math.min(
        T,
        S,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          T - (p - v) / 2,
          r
        )
      ) : a == 3 ? w + v + u + r : P[1] - r
    ), U ? rt = Math.max(T - I + (v - u) / 2 - u, u) : st = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        g - j + (A - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        $ - 4 * u
        /* 半径 */
      ),
      u
    ), f.left = dt(j, 0, N) + Y, f.top = dt(I, 0, S) + Y, f["--tips-arrow-top"] = (v > p ? 0 : rt) || ct, f["--tips-arrow-left"] = st || ct;
  }
  let nt = l.classList, Wt = _t[a], V = _[0];
  (F(V) || V != a) && d([
    [
      /* 移除旧值 */
      ["remove", nt, _t[V]],
      /* 添加新值 */
      ["add", nt, Wt]
    ],
    () => {
      _.shift(), _.push(a), e.index = a;
    }
  ]);
}
const X = "data-tips-scroll", gt = -1e4, yt = 3, bt = {
  proxy: function(e) {
    e && this.$nextTick(this.__2next), this.$emit("update:visible", e);
  },
  visible: {
    handler: function(e) {
      this.$nextTick(() => {
        this.__trigger(e);
      });
    },
    immediate: !0
  },
  target: {
    handler(e) {
      let t = b(
        [e],
        wt(
          "0.?.$el|0.$el|0=>el",
          b(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      t && (this._event_mark = !1, this._target__ = t, this.__trigger(this.visible));
    }
  }
}, re = {
  name: "Tips",
  components: {
    Card: k
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: gt
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
      default: yt
    }
  },
  watch: bt,
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
      _arrow__: 0
    };
  },
  computed: {
    isSimply: function() {
      return this.target === "";
    }
  },
  methods: {
    __parent(e) {
      let t = this.$el, i;
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = document.body, i = !0), d(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return d(
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
      L(t, this.__css(), !0), Rt({
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
        offset: F(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (e.nodeName == "#comment" || this.static || this.isSimply)
        return;
      let i = this.before;
      d([
        [
          t ? "removeChild" : i ? "insertBefore" : "appendChild",
          document.documentElement,
          e,
          i ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? d(e.addEventListener, e, "scroll", H) : (d(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, X), i || (d(e.addEventListener, e, "scroll", H), this.__attr(e, X, "true"))));
      });
    },
    __css() {
      let e = {};
      return this._arrow__ = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, b(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      F(this.static) || (this.init(), Q.delay = +this.delay, ft(this.__2listener), this.__2listener(), this.__toggle_append(this.$el), ft(this.init), d([["observe", E]], null, this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(e, this, arguments);
        },
        this.delay === yt ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        d("stopPropagation", e), this.$emit("toggle", this.proxy = !0);
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
      d("stopPropagation", e), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(e) {
      if (Pt(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let t = {
          click: (i) => {
            this.$attrs.clear === void 0 || d([B() || []]), this.__toggle(i), B(["__toggle", this, i]);
          },
          close: () => {
            let i = B();
            if (i && i[1].$attrs.modal !== void 0) {
              B(i);
              return;
            }
            d([i || []]);
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
            ["click", t.click],
            ["click", t.close, document.body]
          ],
          enter: [
            ["mouseenter", t.click],
            ["click", t.close, document.body]
          ]
        }[e], this._try("addEventListener");
      } else
        e === 0 ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      O(i) || (i = [i]);
      let s = [];
      y(i, (r, n) => {
        let l = 0;
        n[2] === document.body && ++l && mt.__tipsmark_ || (l && (mt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
        ]));
      }), d(s);
    }
  },
  mounted() {
    bt.target.handler.call(this, this.target), (gt === this.target || this.isSimply) && (this._target__ = d("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Tt(this.__2listener), this.__parent(function(e, t) {
      d(e.removeEventListener, e, "scroll", H), d(e.removeAttribute, e, X, void 0), t || d(E.unobserve, E, e);
    });
  }
};
var ne = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: {
    "tips-fly": t.before
  }, style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "Card", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, le = [], ae = /* @__PURE__ */ C(
  re,
  ne,
  le,
  !1,
  null,
  "ab20c245",
  null,
  null
);
const Z = ae.exports;
const oe = {
  name: "Confirm",
  components: {
    Card: k,
    Tips: Z,
    Boom: K
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
    emitcancel(e) {
      this.close(), this.$emit("cancel-click", e);
    },
    close() {
      m([B() || []]), this.proxy = !1;
    },
    emitsubmit(e) {
      this.$emit("submit-click", this.close);
    }
  }
};
var ue = function() {
  var t = this, i = t._self._c;
  return i("span", [t._t("default", function() {
    return [t._t("reference")];
  }), i("Tips", t._b({ ref: "stips", staticClass: "s-confirm", attrs: { visible: t.proxy, min: ["auto"], arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : "" } }, "Tips", t.$attrs, !1), [i("Card", { scopedSlots: t._u([{ key: "title", fn: function() {
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
  }, proxy: !0 }], null, !0) })], 1)], 2);
}, ce = [], he = /* @__PURE__ */ C(
  oe,
  ue,
  ce,
  !1,
  null,
  "44a33905",
  null,
  null
);
const Nt = he.exports;
const _e = {
  name: "Div",
  components: {
    Card: k
  }
};
var fe = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, de = [], pe = /* @__PURE__ */ C(
  _e,
  fe,
  de,
  !1,
  null,
  "a7a3e455",
  null,
  null
);
const zt = pe.exports;
const me = {
  name: "Flex",
  components: {
    Card: k
  }
};
var ge = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, ye = [], be = /* @__PURE__ */ C(
  me,
  ge,
  ye,
  !1,
  null,
  "e24d1dff",
  null,
  null
);
const At = be.exports;
let vt = (e) => e == null || e == null, ve = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const xe = {
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
      ve(e);
    }
    this.scrollx = m("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: x,
    trigger(e, t) {
      O(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        y(e, (i, s) => {
          this.$emit(s[0], vt(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      m(
        [
          this.cheackflys,
          (t) => {
            t = t || {};
            let i = t.index || y(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              t.picker,
              t.id
            );
            vt(i) || this.setindex(i);
          }
        ],
        this,
        e
      );
    },
    setindex(e) {
      m(
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
        m(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], i = m(this.direction, e.target), s = {
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
      this.end = !1, this.__index = s.index, y(
        this.flyweights,
        (n, l, a, o, h, u, f, _, c) => {
          if (a = n / h >> 0, _ = a + o * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(a < u % o) + /* 计算轮数, row的倍数 */
          (u / o >> 0)), c = _ * h + n % h, c >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = _, l.i = c, l.data = this.flys[c];
          let p = [
            /* top */
            _ * this.expand + l.x,
            /* left */
            l.space
          ];
          f && p.reverse(), l.top = p[0], l.left = p[1];
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
        let n = /true/.test(this.auto), [l, a] = this.offset, o = r.width, h = r.height, u = (ot(this.width, o) || o) + l, f = ot(this.height, h) + a, _ = [o / u >> 0 || 1, h / f >> 0 || 1];
        i && _.reverse();
        let [c, p] = _, $ = this.padding, R, z = 0, g, w;
        i ? (g = u, u -= l, w = (S) => (
          /* 计算top偏移量 */
          S * (f - a) + (S + 1) * a
        )) : (n ? (u = (o - l * (c + 2 * $ - 1)) / c, R = !$ * l, z = $ * l) : (R = 0, z = o < u ? 0 : (o % u + l * c) / (c + 1) >> 0, u -= l), w = (S) => S * (u + R) + (S + 1) * z, g = f), this.row = p + 2, this.column = c, this.realH = f - a, this.realW = u, this.expand = g, this.Size = Math.ceil(e / c) * g;
        let T = Math.min(e, c * this.row), v = T - 1, A;
        for (; T-- > 0; )
          A = v - T, this.$set(t, A, {
            x: l,
            y: a,
            width: u,
            height: f - a,
            space: w(A % c),
            data: {}
          });
        t.length = v + 1;
        let N = [];
        h / g > v / c && N.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), N.push([
          "update:space",
          {
            row: (v / c >> 0) + 1,
            column: c,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(N);
      });
    }
  }
};
var $e = function() {
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
}, we = [], Se = /* @__PURE__ */ C(
  xe,
  $e,
  we,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Et = Se.exports, Ce = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return $t(i) ? [] : O(i) ? i : [i];
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
        if (m("nodeType", t) === 1)
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
var ke = function() {
  var t = this, i = t._self._c;
  return i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, Te = [], Re = /* @__PURE__ */ C(
  Ce,
  ke,
  Te,
  !1,
  null,
  null,
  null,
  null
);
const tt = Re.exports;
let Ne;
const xt = {
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  required: (e, t) => !t
};
let ze = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Ae = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: k, Stream: tt },
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
    b(this.$attrs, "value|modelValue=>value", (e, t) => {
      this.trigger = e, this.__emit(t);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          m([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: e }]]
          ]).value = e || "";
        });
      }
    }), y(["left", "right", "rm"], (e, t, i) => {
      i = m([
        ["$el", this.$refs[t] || ""],
        [t, this.$refs]
      ]), this[t] = m("offsetWidth", i || "") || null;
    }), this.attrs = b(this.$attrs, ze + this.mix), y(
      this.$attrs,
      (e, t, i) => {
        jt(t) && (this.inputAttrs[e] = t), e in i && this.$watch(
          "$attrs." + e,
          (s) => {
            this.inputAttrs[e] = s;
          },
          { immediate: !0 }
        );
      },
      Ot("maxlength,type,disabled,readonly")
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
      y(O(e) ? e : [e], (i, s, r) => {
        y(xt, (n, l) => {
          n in s && (r = [
            function(a, o, h, u, f, _, c) {
              let p = a.trigger;
              if (!a.required && p && this !== p)
                return;
              let $ = o(h, c, _);
              return f.error = $ ? u : Ne;
            },
            this,
            s,
            xt[n],
            s[n],
            s.message,
            this,
            /number/.test(this.type)
          ]);
        }), t.push(r);
      }), this.RULE.push(t);
    },
    __runer(e, t) {
      m([this.RULE], null, e, t);
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
var Ee = function() {
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
}, Le = [], Be = /* @__PURE__ */ C(
  Ae,
  Ee,
  Le,
  !1,
  null,
  "e0f7f9a6",
  null,
  null
);
const Lt = Be.exports, We = {}, Bt = [];
Bt.push(K, k, Nt, zt, At, Et, Lt, tt, Z);
const Oe = { Boom: K, Card: k, Confirm: Nt, Div: zt, Flex: At, Flyweight: Et, Input: Lt, Stream: tt, Tips: Z };
We.install = function(e, t = {}) {
  Bt.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  K as Boom,
  k as Card,
  Nt as Confirm,
  zt as Div,
  At as Flex,
  Et as Flyweight,
  Lt as Input,
  tt as Stream,
  Z as Tips,
  Oe as components,
  We as default
};
