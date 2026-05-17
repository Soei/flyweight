import { runer as b, each as N, merge as B, picker as v, isEmpty as ft, isSimplyType as et, isString as zt, isArray as X, format as Nt } from "@soei/util";
import { runer as d, isNil as z, each as it, isString as Rt } from "@soei/tools";
import At from "@soei/picker";
let Mt = /(\d+|[+\-\*/]|%)/g, st = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, nt = (e, t) => {
  let i;
  if (i = b("match", e, Mt)) {
    let s = i.length, n, o = 0, a, r = [];
    for (; s--; )
      o = i.shift(), o in st ? (n && r.push(n), o === "%" && (r.length = 2), a = o) : +o && r.push(+o), r.length == 2 && (r.push(t), n = st[a].apply(null, r), r.length = 0);
    +n || (n = +r.pop()), e = n >> 0;
  }
  return e;
}, rt = {}, y = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  rt[t] || (rt[t] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function R(e, t, i, s, n, o, a, r) {
  var h = typeof e == "function" ? e.options : e;
  t && (h.render = t, h.staticRenderFns = i, h._compiled = !0), s && (h.functional = !0), o && (h._scopeId = "data-v-" + o);
  var _;
  if (a ? (_ = function(l) {
    l = l || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), n && n.call(this, l), l && l._registeredComponents && l._registeredComponents.add(a);
  }, h._ssrRegister = _) : n && (_ = r ? function() {
    n.call(
      this,
      (h.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), _)
    if (h.functional) {
      h._injectStyles = _;
      var c = h.render;
      h.render = function(u, p) {
        return _.call(p), c(u, p);
      };
    } else {
      var f = h.beforeCreate;
      h.beforeCreate = f ? [].concat(f, _) : [_];
    }
  return {
    exports: e,
    options: h
  };
}
let Bt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function D(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let pt = {
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
      B(t, this.$data, this.$props, this.$attrs, "mix"), this._style = v(t, e, (i, s, n, o) => (this.$nextTick(() => {
        b("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Bt.test(o) ? y(s) : s));
    },
    immediate: !0
  }
}, Et = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], mt = {};
N(
  Et,
  (e, t, i) => {
    e = D(t), mt["--" + D(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  pt
);
const Lt = {
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
      default: "m=>margin,p|padding=>padding,bg|bgc=>background,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height"
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
      return b("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: pt,
  methods: {
    exec: y,
    isEmpty: ft,
    picker: v,
    runer: b,
    isSimplyType: et,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(mt, e), B(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: D,
    css(e, t) {
      N(e, (i, s) => {
        let n = s in this ? this[s] : this.default[s];
        !n || this.default[s] == n || (t[i] = y(n));
      });
    },
    change(e) {
      et(e) || (this.closecss = v(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      v(
        zt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, n) => {
          let o = y(i);
          !o || this.default[n] == o || (this[n] = o);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Ht = function() {
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
}, Ot = [], Wt = /* @__PURE__ */ R(
  Lt,
  Ht,
  Ot,
  !1,
  null,
  "1cfa1e36",
  null,
  null
);
const A = Wt.exports;
const Pt = {
  name: "Boom",
  emits: ["click"],
  components: { Card: A },
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
      N("disabled visible tips".split(/\s+/g), (e, t) => {
        b("removeAttribute", this.$el, t);
      });
    }
  }
};
var Ft = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-button", attrs: { use: "", mix: t.mix, center: "", space: "", vc: "", inline: "" } }, [i("button", { attrs: { disabled: t.$attrs.disabled, center: "", vc: "" }, on: { click: function(s) {
    return t.$emit("click", s);
  } } }, [t._t("inner", function() {
    return [i("span", [t._t("default", function() {
      return [t._v("提示")];
    })], 2)];
  })], 2), t._t("tips", function() {
    return [t.$attrs.tips ? i("tips", t._b({}, "tips", t.$attrs.tips, !1)) : t._e()];
  })], 2);
}, jt = [], It = /* @__PURE__ */ R(
  Pt,
  Ft,
  jt,
  !1,
  null,
  "34f675eb",
  null,
  null
);
const G = It.exports, lt = /(?:\,|\|{2})/, ot = "px", at = "";
let gt = document.documentElement, ht, ct = ["s-left", "s-top", "s-right", "s-bottom"], Vt = { left: 0, top: 1, right: 2, bottom: 3 };
const Y = [];
var Ut = At(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let q = {}, yt = null;
Ut(q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    yt = Dt(() => {
      d(Y);
    }, e), this._delay = e;
  }
});
q.delay = 60;
function Dt(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, d(e, this, arguments));
  };
}
const O = () => {
  yt();
};
function Xt(e) {
  Y.push(e);
}
const E = new ResizeObserver(O);
E.observe(gt);
function ut(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
function bt(e) {
  e.onresize || (Y.push([bt, null, e]), e.onresize = !0);
  var t = gt, i = t.clientHeight, s = t.clientWidth, n = z(e.offset) ? 7 : e.offset, o = e.target, a = e.room, r = e.index, h = e.position, _ = e.edge || 7, c = e.arrow || 0, f = e.space || (e.space = []), l = o.getBoundingClientRect(), u = a.offsetHeight, p = a.offsetWidth, S = "3,0,2,1".split(lt), M, g = l.left, m = l.top, x = Math.max(m, _), w = (l.height == ht ? l.bottom - m : l.height) >> 0, C = (l.width == ht ? l.right - g : l.width) >> 0, k = s - p - n, T = i - u - n, $ = g < 0 || g + C / 2 > s, K = m < 0 || m + w > i, W = [
    /* left: 0 */
    K ? -1 : g - p,
    /* top: 1 */
    $ ? -1 : x - u,
    /* right: 2 */
    K ? -1 : k - l.right,
    /* bottom: 3 */
    $ ? -1 : T - l.bottom
  ];
  h && (it(
    h.split(lt),
    function(kt, H, V, Tt) {
      Tt.push(V[H]);
    },
    Vt,
    M = []
  ), S.unshift.apply(S, M)), r = it(
    S,
    function(kt, H, V) {
      if (V[H] > 0)
        return H;
    },
    W
  );
  let L = e.css;
  var P = 0, F = 0, Q = 0, Z = 0;
  if (r != null) {
    var j = r == 0 || r == 2;
    P = Math.max(
      n,
      j ? r == 2 ? l.right + n : W[0] - n : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        k,
        /* 目标对象的 left */
        g - c
      )
    ), F = Math.max(
      n,
      j ? Math.min(
        x,
        T,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          x - (u - w) / 2,
          n
        )
      ) : r == 3 ? m + w + c + n : W[1] - n
    ), j ? Z = Math.max(x - F + (w - c) / 2 - c, c) : Q = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        g - P + (C - c) / 2 - c,
        /* 目标宽 - 两倍的箭头 */
        p - 4 * c
        /* 半径 */
      ),
      c
    ), L.left = ut(P, 0, k) + ot, L.top = ut(F, 0, T) + ot, L["--tips-arrow-top"] = Z || at, L["--tips-arrow-left"] = Q || at;
  }
  let tt = a.classList, Ct = ct[r], I = f[0];
  (z(I) || I != r) && d([
    [
      /* 移除旧值 */
      ["remove", tt, ct[I]],
      /* 添加新值 */
      ["add", tt, Ct]
    ],
    () => {
      f.shift(), f.push(r), e.index = r;
    }
  ]);
}
const U = "data-tips-scroll", _t = 3, Gt = {
  name: "Tips",
  components: {
    Card: A
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [HTMLElement, String]
    },
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !0
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
      default: _t
    }
  },
  watch: {
    proxy: function(e) {
      e && this.$nextTick(this.__2next), this.$emit("update:visible", e);
    },
    visible: function(e) {
      this.__trigger(e);
    }
  },
  data() {
    return {
      css: {
        opacity: 0
      },
      proxy: !1,
      _event_mark: !1,
      _el__: null,
      _event__: null,
      _timeout__: null,
      _target__: null,
      _arrow__: 0
    };
  },
  methods: {
    __parent(e) {
      let t = this.$el, i;
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), d(e, null, t, i), !i); )
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
      B(t, this.__css(), !0), bt({
        onresize: !1,
        /* 监控的目标 */
        target: this._target__ || (this._target__ = e.parentNode),
        /* 显示的元素 */
        room: e,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: t,
        /* 偏移量 */
        offset: z(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      e.nodeName == "#comment" || this.static || !z(this.target) || d([
        [t ? "removeChild" : "appendChild", document.documentElement, e]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? d(e.addEventListener, e, "scroll", O) : (d(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, U), i || (d(e.addEventListener, e, "scroll", O), this.__attr(e, U, "true"))));
      });
    },
    __css() {
      let e = {};
      return z(this.target) ? this._arrow__ = e["--arrow-size"] = Math.sqrt(2 * Math.pow(Math.min(10, v(this.$attrs, "b|border=>b").b || 3) * 2 + 2, 2)) / 2 >> 0 : (this.position + "", this.offset + ""), e;
    },
    __2next() {
      z(this.static) || (this.init(), q.delay = +this.delay, Xt(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(e, this, arguments);
        },
        this.delay === _t ? 600 : this.delay
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
      if (Rt(e)) {
        if (this._event_mark)
          return;
        this._event_mark = !0, this._el__ = d("parentNode", this.$el), this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [["click"], ["click", this.__hide, window]]
        }[e], this._try("addEventListener");
      } else
        e === 0 ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._el__, i = this._event__;
      if (!i)
        return;
      X(i) || (i = [i]);
      let s = [];
      N(i, (n, o) => {
        s.push([
          e,
          o[2] || t,
          o[0],
          o[1] || this.__toggle
        ]);
      }), d(s);
    }
  },
  mounted() {
    z(this.target) || this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), this.__parent(function(e, t) {
      d(e.removeEventListener, e, "scroll", O), d(e.removeAttribute, e, U, void 0), t || d(E.unobserve, E, e);
    });
  }
};
var Yt = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: t.target ? "tips-" + t.position : "", style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "Card", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, qt = [], Jt = /* @__PURE__ */ R(
  Gt,
  Yt,
  qt,
  !1,
  null,
  "6529bce4",
  null,
  null
);
const J = Jt.exports;
const Kt = {
  name: "Confirm",
  components: {
    Card: A,
    Tips: J,
    Boom: G
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
      type: Object
    },
    submitAttrs: {
      type: Object
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
  updated() {
    this.init();
  },
  methods: {
    init() {
      this.proxy = this.visible;
    },
    emitcancel(e) {
      this.proxy = !1, this.$emit("cancel-click", e);
    },
    emitsubmit(e) {
      this.$emit("submit-click", () => {
        this.proxy = !1;
      });
    }
  }
};
var Qt = function() {
  var t = this, i = t._self._c;
  return i("span", [t._t("default", function() {
    return [t._t("reference")];
  }), i("Tips", t._b({ ref: "stips", staticClass: "s-confirm", attrs: { visible: t.proxy, arrow: "", min: ["auto"] } }, "Tips", t.$attrs, !1), [i("Card", { scopedSlots: t._u([{ key: "title", fn: function() {
    return [i("Card", { staticClass: "s-confirm-title" }, [t._t("title", function() {
      return [t._v(t._s(t.title))];
    })], 2)];
  }, proxy: !0 }, { key: "content", fn: function() {
    return [t._t("content", function() {
      return [t._v(t._s(t.content))];
    }), t._t("bottom", function() {
      return [i("Card", { staticClass: "s-confirm-booms", attrs: { flex: "", space: "" } }, [i("span"), i("span", { attrs: { flex: "" } }, [t._t("boom", function() {
        return [i("Boom", t._b({ attrs: { cancel: "" }, on: { click: function(s) {
          return s.stopPropagation(), t.emitcancel.apply(null, arguments);
        } } }, "Boom", t.cancelAttrs, !1), [t._v(" " + t._s(t.cancel) + " ")]), i("Boom", t._b({ staticClass: "simply", attrs: { submit: "" }, on: { click: function(s) {
          return s.stopPropagation(), t.emitsubmit.apply(null, arguments);
        } } }, "Boom", t.submitAttrs, !1), [t._v(" " + t._s(t.submit) + " ")])];
      })], 2)])];
    })];
  }, proxy: !0 }], null, !0) })], 1)], 2);
}, Zt = [], te = /* @__PURE__ */ R(
  Kt,
  Qt,
  Zt,
  !1,
  null,
  "26d88559",
  null,
  null
);
const vt = te.exports;
let dt = (e) => e == null || e == null, ee = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const ie = {
  name: "Flyweight",
  components: {
    Card: A
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
          "--width": y(this.realW),
          "--height": y(this.realH),
          "--flyweight-content": y(i)
        },
        t && {
          "--flyweight-h": y(t)
        },
        e && {
          "--flyweight-w": y(e)
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
      ee(e);
    }
    this.scrollx = b("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: y,
    trigger(e, t) {
      X(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        N(e, (i, s) => {
          this.$emit(s[0], dt(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      b(
        [
          this.cheackflys,
          (t) => {
            t = t || {};
            let i = t.index || N(
              this.flys,
              (s, n, o, a) => {
                if (n[o] == a)
                  return s;
              },
              t.picker,
              t.id
            );
            dt(i) || this.setindex(i);
          }
        ],
        this,
        e
      );
    },
    setindex(e) {
      b(
        [
          this.cheackflys,
          ({ index: t }) => {
            this.selectIndex = t, this.$nextTick(() => {
              if (t < 0)
                return;
              let i = t / this.column >> 0, s = this.expand, n = this.flyweight[this.direction] / s >> 0;
              i > n && i < n + this.row - 2 || (this.flyweight[this.direction] = i * s - s / 2, this.scroll());
            });
          }
        ],
        this,
        { index: e }
      );
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        b(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], i = b(this.direction, e.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      B(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let n = !1;
      this.end = !1, this.__index = s.index, N(
        this.flyweights,
        (o, a, r, h, _, c, f, l, u) => {
          if (r = o / _ >> 0, l = r + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(r < c % h) + /* 计算轮数, row的倍数 */
          (c / h >> 0)), u = l * _ + o % _, u >= this.count) {
            n || (this.end = !0, t.push(["onend"]), n = !0);
            return;
          }
          a.index = l, a.i = u, a.data = this.flys[u];
          let p = [
            /* top */
            l * this.expand + a.x,
            /* left */
            a.space
          ];
          f && p.reverse(), a.top = p[0], a.left = p[1];
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
      let i = this.scrollx, s = this.flyweight, n = v(s, this.BoxRule);
      this.$nextTick(() => {
        let o = /true/.test(this.auto), [a, r] = this.offset, h = n.width, _ = n.height, c = (nt(this.width, h) || h) + a, f = nt(this.height, _) + r, l = [h / c >> 0 || 1, _ / f >> 0 || 1];
        i && l.reverse();
        let [u, p] = l, S = this.padding, M, g = 0, m, x;
        i ? (m = c, c -= a, x = ($) => (
          /* 计算top偏移量 */
          $ * (f - r) + ($ + 1) * r
        )) : (o ? (c = (h - a * (u + 2 * S - 1)) / u, M = !S * a, g = S * a) : (M = 0, g = h < c ? 0 : (h % c + a * u) / (u + 1) >> 0, c -= a), x = ($) => $ * (c + M) + ($ + 1) * g, m = f), this.row = p + 2, this.column = u, this.realH = f - r, this.realW = c, this.expand = m, this.Size = Math.ceil(e / u) * m;
        let w = Math.min(e, u * this.row), C = w - 1, k;
        for (; w-- > 0; )
          k = C - w, this.$set(t, k, {
            x: a,
            y: r,
            width: c,
            height: f - r,
            space: x(k % u),
            data: {}
          });
        t.length = C + 1;
        let T = [];
        _ / m > C / u && T.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), T.push([
          "update:space",
          {
            row: (C / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(T);
      });
    }
  }
};
var se = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    //   'flyweight-active': actice,
    "flyweight-empty": t.Size === 0,
    line: t.line && t.__top !== 0
  }, style: t.style, on: { scroll: t.scroll } }, [t._t("title", null, null, t.bridge), i("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(s, n) {
    return i("div", { key: n, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [t._t("default", null, null, s)], 2);
  }), 0), t._t("mix", function() {
    return [t.flyweights.length ? t._t("end", null, null, t.bridge) : t._t("empty", function() {
      return [i("Card", { attrs: { height: "100% - 10px", width: "100%", center: "", nothing: "", vcenter: "" } }, [t._v(" 空~ ")])];
    })];
  }, null, t.bridge)], 2);
}, ne = [], re = /* @__PURE__ */ R(
  ie,
  se,
  ne,
  !1,
  null,
  "906493ea",
  null,
  null
);
const xt = re.exports;
const le = {
  inheritAttrs: !1,
  name: "Input",
  components: { Card: A },
  emits: ["update:modelValue", "update:value", "change", "focus"],
  data: function() {
    return {
      id: Nt("input-{1000-9999}-{1000-9999}"),
      inputAttrs: {},
      trigger: "modelValue",
      attrs: {}
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
          this.$refs.input.value = e || "";
        });
      }
    }), this.attrs = v(
      this.$attrs,
      "slow,static,fast,hide-limit,maxlength,style,disabled,tips-hide,mix"
    ), this.inputAttrs = v(
      this.$attrs,
      "maxlength,type,disabled,readonly"
    );
  },
  props: {
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    tips: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.$nextTick(() => {
        this.__emit("");
      });
    },
    __change(e) {
      this.$emit("change", e.target.value);
    },
    __input(e) {
      this.__emit(e.target.value);
    },
    __emit(e) {
      this.$emit("update:" + this.trigger, e);
    }
  }
};
var oe = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-wrap", class: t.$attrs.class, attrs: { use: "" } }, "Card", t.attrs, !1), [i("input", t._b({ ref: "input", staticClass: "s-wrap-input", attrs: { placeholder: "", autocomplete: "off", id: t.id }, on: { focus: function(s) {
    return t.$emit("focus", s);
  }, change: t.__change, input: t.__input } }, "input", t.inputAttrs, !1)), i("label", { staticClass: "s-wrap-label", attrs: { for: t.id } }, [t._t("default", function() {
    return [i("span", { staticClass: "placeholder", attrs: { flex: "" } }, [t._t("placeholder", function() {
      return [t._t("icon", null, { type: "placeholder" }), t._v(" " + t._s(t.placeholder) + " ")];
    })], 2), i("span", { staticClass: "s-wrap-tips", attrs: { flex: "" } }, [t._t("tips", function() {
      return [t._t("icon", null, { type: "tips" }), t._v(" " + t._s(t.tips || t.placeholder) + " ")];
    }, { limit: t.limit })], 2)];
  })], 2), i("Card", { staticClass: "s-wrap-right", attrs: { nothing: "", width: "auto", bg: "transparent", vcenter: "" } }, [t._t("right", function() {
    return [t._t("limit", function() {
      return [t.$attrs.maxlength ? i("span", { staticClass: "s-wrap-limit" }, [t._v(t._s(t.limit))]) : t._e()];
    }, { limit: t.limit }), i("span", { staticClass: "s-wrap-close", on: { click: t.close } }, [t._v("×")])];
  })], 2)], 1);
}, ae = [], he = /* @__PURE__ */ R(
  le,
  oe,
  ae,
  !1,
  null,
  "9450e87e",
  null,
  null
);
const wt = he.exports, ce = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return ft(i) ? [] : X(i) ? i : [i];
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
    type: {
      type: String,
      default: "div"
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
        for (let n in t)
          /^\$/.test(n) && B(this.Ref, t[n]);
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
var ue = function() {
  var t = this, i = t._self._c;
  return i(t.type, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, _e = [], de = /* @__PURE__ */ R(
  ce,
  ue,
  _e,
  !1,
  null,
  null,
  null,
  null
);
const $t = de.exports, fe = {}, St = [];
St.push(G, A, vt, xt, wt, $t, J);
const ye = { Boom: G, Card: A, Confirm: vt, Flyweight: xt, Input: wt, Stream: $t, Tips: J };
fe.install = function(e, t = {}) {
  St.forEach((i) => {
    e.component(i.name, i), e.component("S" + i.name, i), e.component(i.name + "S", i);
  });
};
export {
  G as Boom,
  A as Card,
  vt as Confirm,
  xt as Flyweight,
  wt as Input,
  $t as Stream,
  J as Tips,
  ye as components,
  fe as default
};
