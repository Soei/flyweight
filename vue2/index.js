import { runer as p, each as b, merge as B, picker as v, isEmpty as $t, isSimplyType as lt, isString as Ot, isArray as P, format as St, array2Json as Pt } from "@soei/util";
import { runer as f, each as G, isNil as O, isString as jt, isFunction as It } from "@soei/tools";
import Ut from "@soei/picker";
let Vt = /(\d+|[+\-\*/]|%)/g, at = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ot = (e, t) => {
  let i;
  if (i = p("match", e, Vt)) {
    let s = i.length, r, n = 0, l, u = [];
    for (; s--; )
      n = i.shift(), n in at ? (r && u.push(r), n === "%" && (u.length = 2), l = n) : +n && u.push(+n), u.length == 2 && (u.push(t), r = at[l].apply(null, u), u.length = 0);
    +r || (r = +u.pop()), e = r >> 0;
  }
  return e;
}, w = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
function S(e, t, i, s, r, n, l, u) {
  var a = typeof e == "function" ? e.options : e;
  t && (a.render = t, a.staticRenderFns = i, a._compiled = !0), s && (a.functional = !0), n && (a._scopeId = "data-v-" + n);
  var o;
  if (l ? (o = function(h) {
    h = h || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !h && typeof __VUE_SSR_CONTEXT__ < "u" && (h = __VUE_SSR_CONTEXT__), r && r.call(this, h), h && h._registeredComponents && h._registeredComponents.add(l);
  }, a._ssrRegister = o) : r && (o = u ? function() {
    r.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), o)
    if (a.functional) {
      a._injectStyles = o;
      var c = a.render;
      a.render = function(_, m) {
        return o.call(m), c(_, m);
      };
    } else {
      var d = a.beforeCreate;
      a.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: e,
    options: a
  };
}
let Dt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function Y(e, t) {
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
      B(t, this.$data, this.$props, this.$attrs, "mix"), this._style = v(t, e, (i, s, r, n) => (this.$nextTick(() => {
        p("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Dt.test(n) ? w(s) : s));
    },
    immediate: !0
  }
}, Xt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], kt = {};
b(
  Xt,
  (e, t, i) => {
    e = Y(t), kt["--" + Y(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  Ct
);
const qt = {
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
      return p("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Ct,
  methods: {
    exec: w,
    isEmpty: $t,
    picker: v,
    runer: p,
    isSimplyType: lt,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(kt, e), B(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: Y,
    css(e, t) {
      b(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = w(r));
      });
    },
    change(e) {
      lt(e) || (this.closecss = v(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      v(
        Ot(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, r) => {
          let n = w(i);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Gt = function() {
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
}, Yt = [], Jt = /* @__PURE__ */ S(
  qt,
  Gt,
  Yt,
  !1,
  null,
  "2345bf85",
  null,
  null
);
const C = Jt.exports;
const Kt = {
  name: "Boom",
  emits: ["click"],
  components: { Card: C },
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
      b("disabled visible tips".split(/\s+/g), (e, t) => {
        p("removeAttribute", this.$el, t);
      });
    }
  }
};
var Qt = function() {
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
}, Zt = [], te = /* @__PURE__ */ S(
  Kt,
  Qt,
  Zt,
  !1,
  null,
  "30c6130b",
  null,
  null
);
const K = te.exports, ut = /(?:\,|\|{2})/, J = "px", ht = "";
let F = document.documentElement, ct, _t = ["s-left", "s-top", "s-right", "s-bottom"], ee = { left: 0, top: 1, right: 2, bottom: 3 };
const W = [];
var ie = Ut(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let Q = {}, Tt = null;
ie(Q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    Tt = se(() => {
      f(W);
    }, e), this._delay = e;
  }
});
Q.delay = 60;
function se(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, f(e, this, arguments));
  };
}
const M = () => {
  Tt();
};
function ft(e) {
  Rt(e), W.push(e);
}
function Rt(e) {
  let t = G(W, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || W.splice(t, 1);
}
const E = new ResizeObserver(M);
E.observe(F);
function dt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const pt = [], L = (e) => {
  if (e)
    pt.push(e);
  else
    return pt.pop();
}, mt = {};
var gt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLT[s]] = (t[r] - i[r]) / 2 + J;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var n, l, u = this.rWidth, a, o = e.match(this.rPosition), c = 0, d = o.length; c < d; c++)
      a = o[c], a != r ? s[a] = 0 : (l = o[(c + 1) % d], n = +!u.test(l), this.css(s, i, t, n), l == a && this.css(s, i, t, +!n));
    return s;
  }
};
function Nt(e) {
  e.onresize || (W.push([Nt, null, e]), e.onresize = !0);
  var t = F, i = t.clientHeight, s = t.clientWidth, r = e.target, n = e.room, l = e.index, u = e.position, a = e.edge || 7, o = e.arrow || 0, c = e.css, d = e.space || (e.space = []), h = r.getBoundingClientRect(), _ = n.offsetHeight, m = n.offsetWidth, g = O(e.offset) ? 7 : e.offset;
  if (/\s+|center/.test(u)) {
    gt.trigger(u, n, F, c);
    return;
  }
  var T = "3,0,2,1".split(ut), N, y = h.left, $ = h.top, R = Math.max($, a), x = (h.height == ct ? h.bottom - $ : h.height) >> 0, z = (h.width == ct ? h.right - y : h.width) >> 0, A = s - m - g, k = i - _ - g, et = y < 0 || y + z / 2 > s, it = $ < 0 || $ + x > i, j = [
    /* left: 0 */
    it ? -1 : y - m,
    /* top: 1 */
    et ? -1 : R - _,
    /* right: 2 */
    it ? -1 : A - h.right,
    /* bottom: 3 */
    et ? -1 : k - h.bottom
  ];
  u && (G(
    u.split(ut),
    function(Ft, H, X, Mt) {
      Mt.push(X[H]);
    },
    ee,
    N = []
  ), T.unshift.apply(T, N)), l = G(
    T,
    function(Ft, H, X) {
      if (X[H] - a > 0)
        return H;
    },
    j
  );
  var I = 0, U = 0, st = 0, rt = 0;
  if (l == null)
    gt.trigger("center", n, F, c);
  else {
    var V = l == 0 || l == 2;
    I = dt(
      V ? l == 2 ? h.right + g : j[0] - g : (
        /* 目标对象的 left */
        y - o
      ),
      a,
      A
    ), U = dt(
      V ? (
        /* 左右 */
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          R - (_ - x) / 2,
          g
        )
      ) : l == 3 ? $ + x + o + g : j[1] - g,
      a,
      k
    ), V ? rt = Math.max(
      R - U + (x - o) / 2 - o,
      o
    ) : st = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - I + (z - o) / 2 - o,
        /* 目标宽 - 两倍的箭头 */
        m - 4 * o
      ),
      o
    ), c.left = I + J, c.top = U + J, c["--tips-arrow-top"] = (x > _ ? 0 : rt) || ht, c["--tips-arrow-left"] = st || ht;
  }
  let nt = n.classList, Ht = _t[l], D = d[0];
  (O(D) || D != l) && f([
    [
      /* 移除旧值 */
      ["remove", nt, _t[D]],
      /* 添加新值 */
      ["add", nt, Ht]
    ],
    () => {
      d.shift(), d.push(l), e.index = l;
    }
  ]);
}
const q = "data-tips-scroll", yt = -1e4, bt = 3, vt = {
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
      let t = v(
        [e],
        St(
          "0.?.$el|0.$el|0=>el",
          v(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      t && (this._event_mark = !1, this._target__ = t, this.__trigger(this.visible));
    }
  }
}, re = {
  name: "Tips",
  components: {
    Card: C
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: yt
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
      default: bt
    }
  },
  watch: vt,
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
    __parent(e) {
      let t = this.$el, i;
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), f(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return f(
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
      B(t, this.__css(), !0), Nt({
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
        offset: O(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__,
        edge: this.edge
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (e.nodeName == "#comment" || this.static || this.isSimply)
        return;
      let i = this.before;
      f([
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
        t ? f(e.addEventListener, e, "scroll", M) : (f(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, q), i || (f(e.addEventListener, e, "scroll", M), this.__attr(e, q, "true"))));
      });
    },
    __css() {
      let e = {};
      return this._arrow__ = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, v(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      O(this.static) || (this.init(), Q.delay = +this.delay, ft(this.__2listener), this.__2listener(), this.__toggle_append(this.$el), ft(this.init), f([["observe", E]], null, this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(e, this, arguments);
        },
        this.delay === bt ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        f("stopPropagation", e), this.$emit("toggle", this.proxy = !0);
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
      f("stopPropagation", e), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(e) {
      if (jt(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let t = {
          click: (i) => {
            let s = L();
            this.$attrs.clear === void 0 || f([s]), this.__toggle(i), console.log(this);
            let r = f(3, s || "");
            r != this._mark && (r && L(s), L(["__toggle", this, i, this._mark]));
          },
          close: () => {
            let i = L();
            if (i && i[1].$attrs.modal !== void 0) {
              L(i);
              return;
            }
            f([i || []]);
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
            ["click", t.close, window]
          ],
          enter: [
            ["mouseenter", t.click],
            ["click", t.close, window]
          ]
        }[e], this._try("addEventListener");
      } else
        e === 0 ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      P(i) || (i = [i]);
      let s = [];
      b(i, (r, n) => {
        let l = 0;
        n[2] === window && ++l && mt.__tipsmark_ || (l && (mt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
        ]));
      }), f(s);
    }
  },
  mounted() {
    vt.target.handler.call(this, this.target), (yt === this.target || this.isSimply) && (this._target__ = f("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Rt(this.__2listener), this.__parent(function(e, t) {
      f(e.removeEventListener, e, "scroll", M), f(e.removeAttribute, e, q, void 0), t || f(E.unobserve, E, e);
    });
  }
};
var ne = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: {
    "tips-fly": t.before
  }, style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "Card", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, le = [], ae = /* @__PURE__ */ S(
  re,
  ne,
  le,
  !1,
  null,
  "e4eaf955",
  null,
  null
);
const Z = ae.exports;
const oe = {
  name: "Confirm",
  components: {
    Card: C,
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
      p([L() || []]), this.proxy = !1;
    },
    emitsubmit(e) {
      this.$emit("submit-click", this.close);
    }
  }
};
var ue = function() {
  var t = this, i = t._self._c;
  return i("span", { staticClass: "s-confirm-warp" }, [t._t("default", function() {
    return [t._t("reference")];
  }), i("Tips", t._b({ ref: "stips", staticClass: "s-confirm", attrs: { visible: t.proxy, height: "auto", min: ["auto"], arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : "" } }, "Tips", t.$attrs, !1), [t._t("el", function() {
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
  })], 2)], 2);
}, he = [], ce = /* @__PURE__ */ S(
  oe,
  ue,
  he,
  !1,
  null,
  "135fee27",
  null,
  null
);
const zt = ce.exports;
const _e = {
  name: "Div",
  components: {
    Card: C
  }
};
var fe = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, de = [], pe = /* @__PURE__ */ S(
  _e,
  fe,
  de,
  !1,
  null,
  "a7a3e455",
  null,
  null
);
const At = pe.exports;
const me = {
  name: "Flex",
  components: {
    Card: C
  }
};
var ge = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, ye = [], be = /* @__PURE__ */ S(
  me,
  ge,
  ye,
  !1,
  null,
  "e24d1dff",
  null,
  null
);
const Et = be.exports;
let xt = (e) => e == null || e == null, ve = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const xe = {
  name: "Flyweight",
  components: {
    Card: C
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
      return B(
        s,
        {
          "--width": w(this.realW),
          "--height": w(this.realH),
          "--flyweight-content": w(i)
        },
        t && {
          "--flyweight-h": w(t)
        },
        e && {
          "--flyweight-w": w(e)
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
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(e, t) {
      P(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        b(e, (i, s) => {
          this.$emit(s[0], xt(s[1]) ? !0 : s[1]);
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
            xt(i) || this.setindex(i);
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
      B(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, b(
        this.flyweights,
        (n, l, u, a, o, c, d, h, _) => {
          if (u = n / o >> 0, h = u + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(u < c % a) + /* 计算轮数, row的倍数 */
          (c / a >> 0)), _ = h * o + n % o, _ >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = h, l.i = _, l.data = this.flys[_];
          let m = [
            /* top */
            h * this.expand + l.x,
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
      let i = this.scrollx, s = this.flyweight, r = v(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, u] = this.offset, a = r.width, o = r.height, c = (ot(this.width, a) || a) + l, d = ot(this.height, o) + u, h = [a / c >> 0 || 1, o / d >> 0 || 1];
        i && h.reverse();
        let [_, m] = h, g = this.padding, T, N = 0, y, $;
        i ? (y = c, c -= l, $ = (k) => (
          /* 计算top偏移量 */
          k * (d - u) + (k + 1) * u
        )) : (n ? (c = (a - l * (_ + 2 * g - 1)) / _, T = !g * l, N = g * l) : (T = 0, N = a < c ? 0 : (a % c + l * _) / (_ + 1) >> 0, c -= l), $ = (k) => k * (c + T) + (k + 1) * N, y = d), this.row = m + 2, this.column = _, this.realH = d - u, this.realW = c, this.expand = y, this.Size = Math.ceil(e / _) * y;
        let R = Math.min(e, _ * this.row), x = R - 1, z;
        for (; R-- > 0; )
          z = x - R, this.$set(t, z, {
            x: l,
            y: u,
            width: c,
            height: d - u,
            space: $(z % _),
            data: {}
          });
        t.length = x + 1;
        let A = [];
        o / y > x / _ && A.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), A.push([
          "update:space",
          {
            row: (x / _ >> 0) + 1,
            column: _,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(A);
      });
    }
  }
};
var we = function() {
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
}, $e = [], Se = /* @__PURE__ */ S(
  xe,
  we,
  $e,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Lt = Se.exports, Ce = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return $t(i) ? [] : P(i) ? i : [i];
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
    v(
      this.$refs,
      "component._.provides|component=>component",
      (e, t, i, s) => {
        if (p("nodeType", t) === 1)
          this.Ref = t;
        else
          for (let r in t)
            /^\$/.test(r) && B(this.Ref, t[r]);
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
}, Te = [], Re = /* @__PURE__ */ S(
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
const wt = {
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
  components: { Card: C, Stream: tt },
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
      id: St("input-{1000-9999}-{1000-9999}"),
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
    v(this.$attrs, "value|modelValue=>value", (e, t) => {
      this.trigger = e, this.__emit(t);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          p([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: e }]]
          ]).value = e || "";
        });
      }
    }), b(["left", "right", "rm"], (e, t, i) => {
      i = p([
        ["$el", this.$refs[t] || ""],
        [t, this.$refs]
      ]), this[t] = p("offsetWidth", i || "") || null;
    }), this.attrs = v(this.$attrs, ze + this.mix), b(
      this.$attrs,
      (e, t, i) => {
        It(t) && (this.inputAttrs[e] = t), e in i && this.$watch(
          "$attrs." + e,
          (s) => {
            this.inputAttrs[e] = s;
          },
          { immediate: !0 }
        );
      },
      Pt("maxlength,type,disabled,readonly")
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
      b(P(e) ? e : [e], (i, s, r) => {
        b(wt, (n, l) => {
          n in s && (r = [
            function(u, a, o, c, d, h, _) {
              let m = u.trigger;
              if (!u.required && m && this !== m)
                return;
              let g = a(o, _, h);
              return d.error = g ? c : Ne;
            },
            this,
            s,
            wt[n],
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
}, Le = [], Be = /* @__PURE__ */ S(
  Ae,
  Ee,
  Le,
  !1,
  null,
  "e0f7f9a6",
  null,
  null
);
const Bt = Be.exports, We = {}, Wt = [];
Wt.push(K, C, zt, At, Et, Lt, Bt, tt, Z);
const Oe = { Boom: K, Card: C, Confirm: zt, Div: At, Flex: Et, Flyweight: Lt, Input: Bt, Stream: tt, Tips: Z };
We.install = function(e, t = {}) {
  Wt.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  K as Boom,
  C as Card,
  zt as Confirm,
  At as Div,
  Et as Flex,
  Lt as Flyweight,
  Bt as Input,
  tt as Stream,
  Z as Tips,
  Oe as components,
  We as default
};
