import { runer as m, each as k, merge as M, picker as b, isEmpty as ft, isSimplyType as et, isString as Rt, isArray as X, format as At } from "@soei/util";
import { runer as d, isNil as A, each as it, isString as Bt } from "@soei/tools";
import Mt from "@soei/picker";
let Et = /(\d+|[+\-\*/]|%)/g, st = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, nt = (e, t) => {
  let i;
  if (i = m("match", e, Et)) {
    let s = i.length, n, r = 0, a, l = [];
    for (; s--; )
      r = i.shift(), r in st ? (n && l.push(n), r === "%" && (l.length = 2), a = r) : +r && l.push(+r), l.length == 2 && (l.push(t), n = st[a].apply(null, l), l.length = 0);
    +n || (n = +l.pop()), e = n >> 0;
  }
  return e;
}, rt = {}, v = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  rt[t] || (rt[t] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function x(e, t, i, s, n, r, a, l) {
  var h = typeof e == "function" ? e.options : e;
  t && (h.render = t, h.staticRenderFns = i, h._compiled = !0), s && (h.functional = !0), r && (h._scopeId = "data-v-" + r);
  var _;
  if (a ? (_ = function(o) {
    o = o || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), n && n.call(this, o), o && o._registeredComponents && o._registeredComponents.add(a);
  }, h._ssrRegister = _) : n && (_ = l ? function() {
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
let Lt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function U(e, t) {
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
      M(t, this.$data, this.$props, this.$attrs, "mix"), this._style = b(t, e, (i, s, n, r) => (this.$nextTick(() => {
        m("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Lt.test(r) ? v(s) : s));
    },
    immediate: !0
  }
}, Ft = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], mt = {};
k(
  Ft,
  (e, t, i) => {
    e = U(t), mt["--" + U(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  pt
);
const Ht = {
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
      default: "m=>margin,p|padding=>padding,bg|bgc=>background,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>border-radius"
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
  watch: pt,
  methods: {
    exec: v,
    isEmpty: ft,
    picker: b,
    runer: m,
    isSimplyType: et,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(mt, e), M(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: U,
    css(e, t) {
      k(e, (i, s) => {
        let n = s in this ? this[s] : this.default[s];
        !n || this.default[s] == n || (t[i] = v(n));
      });
    },
    change(e) {
      et(e) || (this.closecss = b(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      b(
        Rt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, n) => {
          let r = v(i);
          !r || this.default[n] == r || (this[n] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Wt = function() {
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
}, Ot = [], Pt = /* @__PURE__ */ x(
  Ht,
  Wt,
  Ot,
  !1,
  null,
  "a61c4003",
  null,
  null
);
const w = Pt.exports;
const jt = {
  name: "Boom",
  emits: ["click"],
  components: { Card: w },
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
      k("disabled visible tips".split(/\s+/g), (e, t) => {
        m("removeAttribute", this.$el, t);
      });
    }
  }
};
var It = function() {
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
}, Dt = [], Vt = /* @__PURE__ */ x(
  jt,
  It,
  Dt,
  !1,
  null,
  "6b761d34",
  null,
  null
);
const G = Vt.exports, lt = /(?:\,|\|{2})/, ot = "px", at = "";
let gt = document.documentElement, ht, ct = ["s-left", "s-top", "s-right", "s-bottom"], Ut = { left: 0, top: 1, right: 2, bottom: 3 };
const Y = [];
var Xt = Mt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let q = {}, yt = null;
Xt(q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    yt = Gt(() => {
      d(Y);
    }, e), this._delay = e;
  }
});
q.delay = 60;
function Gt(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, d(e, this, arguments));
  };
}
const H = () => {
  yt();
};
function Yt(e) {
  Y.push(e);
}
const E = new ResizeObserver(H);
E.observe(gt);
function ut(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
function vt(e) {
  e.onresize || (Y.push([vt, null, e]), e.onresize = !0);
  var t = gt, i = t.clientHeight, s = t.clientWidth, n = A(e.offset) ? 7 : e.offset, r = e.target, a = e.room, l = e.index, h = e.position, _ = e.edge || 7, c = e.arrow || 0, f = e.space || (e.space = []), o = r.getBoundingClientRect(), u = a.offsetHeight, p = a.offsetWidth, T = "3,0,2,1".split(lt), B, y = o.left, g = o.top, $ = Math.max(g, _), S = (o.height == ht ? o.bottom - g : o.height) >> 0, z = (o.width == ht ? o.right - y : o.width) >> 0, N = s - p - n, R = i - u - n, C = y < 0 || y + z / 2 > s, K = g < 0 || g + S > i, W = [
    /* left: 0 */
    K ? -1 : y - p,
    /* top: 1 */
    C ? -1 : $ - u,
    /* right: 2 */
    K ? -1 : N - o.right,
    /* bottom: 3 */
    C ? -1 : R - o.bottom
  ];
  h && (it(
    h.split(lt),
    function(zt, F, D, Nt) {
      Nt.push(D[F]);
    },
    Ut,
    B = []
  ), T.unshift.apply(T, B)), l = it(
    T,
    function(zt, F, D) {
      if (D[F] > 0)
        return F;
    },
    W
  );
  let L = e.css;
  var O = 0, P = 0, Q = 0, Z = 0;
  if (l != null) {
    var j = l == 0 || l == 2;
    O = Math.max(
      n,
      j ? l == 2 ? o.right + n : W[0] - n : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        N,
        /* 目标对象的 left */
        y - c
      )
    ), P = Math.max(
      n,
      /* 打底最小 */
      j ? Math.min(
        $,
        R,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          $ - (u - S) / 2,
          n
        )
      ) : l == 3 ? g + S + c + n : W[1] - n
    ), j ? Z = Math.max($ - P + (S - c) / 2 - c, c) : Q = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - O + (z - c) / 2 - c,
        /* 目标宽 - 两倍的箭头 */
        p - 4 * c
        /* 半径 */
      ),
      c
    ), L.left = ut(O, 0, N) + ot, L.top = ut(P, 0, R) + ot, L["--tips-arrow-top"] = Z || at, L["--tips-arrow-left"] = Q || at;
  }
  let tt = a.classList, Tt = ct[l], I = f[0];
  (A(I) || I != l) && d([
    [
      /* 移除旧值 */
      ["remove", tt, ct[I]],
      /* 添加新值 */
      ["add", tt, Tt]
    ],
    () => {
      f.shift(), f.push(l), e.index = l;
    }
  ]);
}
const V = "data-tips-scroll", _t = 3, qt = {
  name: "Tips",
  components: {
    Card: w
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
      default: _t
    }
  },
  watch: {
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
      M(t, this.__css(), !0), vt({
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
        offset: A(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), t.opacity = 1, this.css = t;
    },
    __toggle_append(e, t) {
      if (e.nodeName == "#comment" || this.static || !A(this.target))
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
        t ? d(e.addEventListener, e, "scroll", H) : (d(E.observe, E, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, V), i || (d(e.addEventListener, e, "scroll", H), this.__attr(e, V, "true"))));
      });
    },
    __css() {
      let e = {};
      return A(this.target) ? this._arrow__ = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, b(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0 : (this.position + "", this.offset + ""), e;
    },
    __2next() {
      A(this.static) || (this.init(), q.delay = +this.delay, Yt(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
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
      if (Bt(e)) {
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
      k(i, (n, r) => {
        s.push([
          e,
          r[2] || t,
          r[0],
          r[1] || this.__toggle
        ]);
      }), d(s);
    }
  },
  mounted() {
    A(this.target) || this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), this.__parent(function(e, t) {
      d(e.removeEventListener, e, "scroll", H), d(e.removeAttribute, e, V, void 0), t || d(E.unobserve, E, e);
    });
  }
};
var Jt = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: {
    "tips-fly": t.before,
    ["tips-" + t.position]: t.target !== void 0
  }, style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "Card", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, Kt = [], Qt = /* @__PURE__ */ x(
  qt,
  Jt,
  Kt,
  !1,
  null,
  "c7bcf13a",
  null,
  null
);
const J = Qt.exports;
const Zt = {
  name: "Confirm",
  components: {
    Card: w,
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
var te = function() {
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
        return [i("Boom", t._b({ attrs: { cancel: "" }, on: { click: function(s) {
          return s.stopPropagation(), t.emitcancel.apply(null, arguments);
        } } }, "Boom", t.cancelAttrs, !1), [t._v(" " + t._s(t.cancel) + " ")]), i("Boom", t._b({ staticClass: "simply", attrs: { submit: "" }, on: { click: function(s) {
          return s.stopPropagation(), t.emitsubmit.apply(null, arguments);
        } } }, "Boom", t.submitAttrs, !1), [t._v(" " + t._s(t.submit) + " ")])];
      })], 2)])];
    })];
  }, proxy: !0 }], null, !0) })], 1)], 2);
}, ee = [], ie = /* @__PURE__ */ x(
  Zt,
  te,
  ee,
  !1,
  null,
  "e758afa6",
  null,
  null
);
const bt = ie.exports;
const se = {
  name: "Div",
  components: {
    Card: w
  }
};
var ne = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-div", scopedSlots: t._u([t._l(t.$slots, function(s, n) {
    return { key: n, fn: function(r) {
      return [t._t(n, null, null, r)];
    } };
  })], null, !0) });
}, re = [], le = /* @__PURE__ */ x(
  se,
  ne,
  re,
  !1,
  null,
  "7c3f454d",
  null,
  null
);
const xt = le.exports;
const oe = {
  name: "Flex",
  components: {
    Card: w
  }
};
var ae = function() {
  var t = this, i = t._self._c;
  return i("Card", { staticClass: "s-flex", attrs: { flex: "" }, scopedSlots: t._u([t._l(t.$slots, function(s, n) {
    return { key: n, fn: function(r) {
      return [t._t(n, null, null, r)];
    } };
  })], null, !0) });
}, he = [], ce = /* @__PURE__ */ x(
  oe,
  ae,
  he,
  !1,
  null,
  "960b1c91",
  null,
  null
);
const wt = ce.exports;
let dt = (e) => e == null || e == null, ue = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const _e = {
  name: "Flyweight",
  components: {
    Card: w
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
      ue(e);
    }
    this.scrollx = m("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: v,
    trigger(e, t) {
      X(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        k(e, (i, s) => {
          this.$emit(s[0], dt(s[1]) ? !0 : s[1]);
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
            let i = t.index || k(
              this.flys,
              (s, n, r, a) => {
                if (n[r] == a)
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
      m(
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
      M(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let n = !1;
      this.end = !1, this.__index = s.index, k(
        this.flyweights,
        (r, a, l, h, _, c, f, o, u) => {
          if (l = r / _ >> 0, o = l + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(l < c % h) + /* 计算轮数, row的倍数 */
          (c / h >> 0)), u = o * _ + r % _, u >= this.count) {
            n || (this.end = !0, t.push(["onend"]), n = !0);
            return;
          }
          a.index = o, a.i = u, a.data = this.flys[u];
          let p = [
            /* top */
            o * this.expand + a.x,
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
      let i = this.scrollx, s = this.flyweight, n = b(s, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [a, l] = this.offset, h = n.width, _ = n.height, c = (nt(this.width, h) || h) + a, f = nt(this.height, _) + l, o = [h / c >> 0 || 1, _ / f >> 0 || 1];
        i && o.reverse();
        let [u, p] = o, T = this.padding, B, y = 0, g, $;
        i ? (g = c, c -= a, $ = (C) => (
          /* 计算top偏移量 */
          C * (f - l) + (C + 1) * l
        )) : (r ? (c = (h - a * (u + 2 * T - 1)) / u, B = !T * a, y = T * a) : (B = 0, y = h < c ? 0 : (h % c + a * u) / (u + 1) >> 0, c -= a), $ = (C) => C * (c + B) + (C + 1) * y, g = f), this.row = p + 2, this.column = u, this.realH = f - l, this.realW = c, this.expand = g, this.Size = Math.ceil(e / u) * g;
        let S = Math.min(e, u * this.row), z = S - 1, N;
        for (; S-- > 0; )
          N = z - S, this.$set(t, N, {
            x: a,
            y: l,
            width: c,
            height: f - l,
            space: $(N % u),
            data: {}
          });
        t.length = z + 1;
        let R = [];
        _ / g > z / u && R.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), R.push([
          "update:space",
          {
            row: (z / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(R);
      });
    }
  }
};
var de = function() {
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
}, fe = [], pe = /* @__PURE__ */ x(
  _e,
  de,
  fe,
  !1,
  null,
  "906493ea",
  null,
  null
);
const $t = pe.exports;
const me = {
  inheritAttrs: !1,
  name: "Input",
  components: { Card: w },
  emits: ["update:modelValue", "update:value", "change", "focus"],
  data: function() {
    return {
      id: At("input-{1000-9999}-{1000-9999}"),
      inputAttrs: {},
      trigger: "modelValue",
      attrs: {},
      left: null,
      right: null,
      rm: null
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
    }), k(["left", "right", "rm"], (e, t, i) => {
      i = m([
        ["$el", this.$refs[t]],
        [t, this.$refs]
      ]), this[t] = m("offsetWidth", i) || null;
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          this.$refs.input.value = e || "";
        });
      }
    }), this.attrs = b(
      this.$attrs,
      "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half" + this.mix
    ), this.inputAttrs = b(this.$attrs, "maxlength,type,disabled,readonly");
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
var ge = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-wrap", class: t.$attrs.class, style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }, attrs: { use: "" } }, "Card", t.attrs, !1), [i("input", t._b({ ref: "input", staticClass: "s-wrap-input", attrs: { id: t.id, placeholder: "", autocomplete: "off" }, on: { focus: function(s) {
    return t.$emit("focus", s);
  }, change: t.__change, input: t.__input } }, "input", t.inputAttrs, !1)), i("label", { staticClass: "s-wrap-label", attrs: { for: t.id } }, [t._t("default", function() {
    return [i("span", { staticClass: "placeholder", attrs: { flex: "" } }, [t._t("placeholder", function() {
      return [t._t("icon", null, { type: "placeholder" }), t._v(" " + t._s(t.placeholder) + " ")];
    })], 2), i("span", { staticClass: "s-wrap-tips", attrs: { flex: "" } }, [t._t("tips", function() {
      return [t._t("icon", null, { type: "tips" }), t._v(" " + t._s(t.tips || t.placeholder) + " ")];
    }, { limit: t.limit })], 2)];
  })], 2), i("Card", { ref: "right", staticClass: "s-wrap-right", attrs: { nothing: "", width: "auto", bg: "transparent", vc: "" } }, [t._t("right", function() {
    return [t._t("limit", function() {
      return [t.$attrs.maxlength ? i("span", { staticClass: "s-wrap-limit" }, [t._v(t._s(t.limit))]) : t._e()];
    }, { limit: t.limit }), i("span", { ref: "rm", staticClass: "s-wrap-close", on: { click: t.close } }, [t._v("×")])];
  })], 2), i("Card", { ref: "left", staticClass: "s-wrap-left", attrs: { nothing: "", width: "auto", bg: "transparent", vc: "", center: "" } }, [t._t("icon")], 2)], 1);
}, ye = [], ve = /* @__PURE__ */ x(
  me,
  ge,
  ye,
  !1,
  null,
  "781b977b",
  null,
  null
);
const St = ve.exports, be = {
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
    b(
      this.$refs,
      "component._.provides|component=>component",
      (e, t, i, s) => {
        for (let n in t)
          /^\$/.test(n) && M(this.Ref, t[n]);
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
  return i(t.type, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, we = [], $e = /* @__PURE__ */ x(
  be,
  xe,
  we,
  !1,
  null,
  null,
  null,
  null
);
const Ct = $e.exports, Se = {}, kt = [];
kt.push(G, w, bt, xt, wt, $t, St, Ct, J);
const ze = { Boom: G, Card: w, Confirm: bt, Div: xt, Flex: wt, Flyweight: $t, Input: St, Stream: Ct, Tips: J };
Se.install = function(e, t = {}) {
  kt.forEach((i) => {
    e.component(i.name, i), e.component("S" + i.name, i), e.component(i.name + "S", i);
  });
};
export {
  G as Boom,
  w as Card,
  bt as Confirm,
  xt as Div,
  wt as Flex,
  $t as Flyweight,
  St as Input,
  Ct as Stream,
  J as Tips,
  ze as components,
  Se as default
};
