import { runer as p, each as x, merge as E, picker as y, isEmpty as vt, isSimplyType as lt, isString as Mt, isArray as O, format as xt, array2Json as Ht } from "@soei/util";
import { runer as d, each as q, isNil as F, isString as Ft, isFunction as Ot } from "@soei/tools";
import Pt from "@soei/picker";
let jt = /(\d+|[+\-\*/]|%)/g, at = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ot = (e, t) => {
  let i;
  if (i = p("match", e, jt)) {
    let s = i.length, r, n = 0, l, o = [];
    for (; s--; )
      n = i.shift(), n in at ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(t), r = at[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), e = r >> 0;
  }
  return e;
}, v = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
function S(e, t, i, s, r, n, l, o) {
  var a = typeof e == "function" ? e.options : e;
  t && (a.render = t, a.staticRenderFns = i, a._compiled = !0), s && (a.functional = !0), n && (a._scopeId = "data-v-" + n);
  var u;
  if (l ? (u = function(_) {
    _ = _ || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !_ && typeof __VUE_SSR_CONTEXT__ < "u" && (_ = __VUE_SSR_CONTEXT__), r && r.call(this, _), _ && _._registeredComponents && _._registeredComponents.add(l);
  }, a._ssrRegister = u) : r && (u = o ? function() {
    r.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), u)
    if (a.functional) {
      a._injectStyles = u;
      var h = a.render;
      a.render = function(c, m) {
        return u.call(m), h(c, m);
      };
    } else {
      var f = a.beforeCreate;
      a.beforeCreate = f ? [].concat(f, u) : [u];
    }
  return {
    exports: e,
    options: a
  };
}
let Ut = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function G(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let wt = {
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
      E(t, this.$data, this.$props, this.$attrs, "mix"), this._style = y(t, e, (i, s, r, n) => (this.$nextTick(() => {
        p("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Ut.test(n) ? v(s) : s));
    },
    immediate: !0
  }
}, It = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], $t = {};
x(
  It,
  (e, t, i) => {
    e = G(t), $t["--" + G(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  wt
);
const Vt = {
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
  watch: wt,
  methods: {
    exec: v,
    isEmpty: vt,
    picker: y,
    runer: p,
    isSimplyType: lt,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css($t, e), E(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: G,
    css(e, t) {
      x(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = v(r));
      });
    },
    change(e) {
      lt(e) || (this.closecss = y(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      y(
        Mt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, r) => {
          let n = v(i);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Dt = function() {
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
}, Xt = [], qt = /* @__PURE__ */ S(
  Vt,
  Dt,
  Xt,
  !1,
  null,
  "0cc1c50c",
  null,
  null
);
const C = qt.exports;
const Gt = {
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
      x("disabled visible tips".split(/\s+/g), (e, t) => {
        p("removeAttribute", this.$el, t);
      });
    }
  }
};
var Yt = function() {
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
}, Jt = [], Kt = /* @__PURE__ */ S(
  Gt,
  Yt,
  Jt,
  !1,
  null,
  "5d1351d8",
  null,
  null
);
const K = Kt.exports, ht = /(?:\,|\|{2})/, Y = "px", ct = "";
let J = document.documentElement, ut, _t = ["s-left", "s-top", "s-right", "s-bottom"], Qt = { left: 0, top: 1, right: 2, bottom: 3 };
const W = [];
var Zt = Pt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let Q = {}, St = null;
Zt(Q, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    St = te(() => {
      d(W);
    }, e), this._delay = e;
  }
});
Q.delay = 60;
function te(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, d(e, this, arguments));
  };
}
const H = () => {
  St();
};
function ee(e) {
  Ct(e), W.push(e);
}
function Ct(e) {
  let t = q(W, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || W.splice(t, 1);
}
const L = new ResizeObserver(H);
L.observe(J);
function ft(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const dt = [], B = (e) => {
  if (e)
    dt.push(e);
  else
    return dt.pop();
}, pt = {};
var ie = {
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
    for (var n, l, o = this.rWidth, a, u = e.match(this.rPosition), h = 0, f = u.length; h < f; h++)
      a = u[h], a != r ? s[a] = 0 : (l = u[(h + 1) % f], n = +!o.test(l), this.css(s, i, t, n), l == a && this.css(s, i, t, +!n));
    return s;
  }
};
function kt(e) {
  e.onresize || (W.push([kt, null, e]), e.onresize = !0);
  var t = J, i = t.clientHeight, s = t.clientWidth, r = F(e.offset) ? 7 : e.offset, n = e.target, l = e.room, o = e.index, a = e.position, u = e.edge || 7, h = e.arrow || 0, f = e.css, _ = e.space || (e.space = []), c = n.getBoundingClientRect(), m = l.offsetHeight, T = l.offsetWidth;
  if (/\s+|center/.test(a)) {
    ie.trigger(a, l, J, f);
    return;
  }
  var R = "3,0,2,1".split(ht), N, g = c.left, w = c.top, k = Math.max(w, u), b = (c.height == ut ? c.bottom - w : c.height) >> 0, A = (c.width == ut ? c.right - g : c.width) >> 0, z = s - T - r, $ = i - m - r, et = g < 0 || g + A / 2 > s, it = w < 0 || w + b > i;
  if (a == "center")
    return;
  var P = [
    /* left: 0 */
    it ? -1 : g - T,
    /* top: 1 */
    et ? -1 : k - m,
    /* right: 2 */
    it ? -1 : z - c.right,
    /* bottom: 3 */
    et ? -1 : $ - c.bottom
  ];
  a && (q(
    a.split(ht),
    function(Bt, M, D, Wt) {
      Wt.push(D[M]);
    },
    Qt,
    N = []
  ), R.unshift.apply(R, N)), o = q(
    R,
    function(Bt, M, D) {
      if (D[M] > 0)
        return M;
    },
    P
  );
  var j = 0, U = 0, st = 0, rt = 0;
  if (o != null) {
    var I = o == 0 || o == 2;
    j = Math.max(
      r,
      I ? o == 2 ? c.right + r : P[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        z,
        /* 目标对象的 left */
        g - h
      )
    ), U = Math.max(
      r,
      /* 打底最小 */
      I ? Math.min(
        k,
        $,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          k - (m - b) / 2,
          r
        )
      ) : o == 3 ? w + b + h + r : P[1] - r
    ), I ? rt = Math.max(k - U + (b - h) / 2 - h, h) : st = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        g - j + (A - h) / 2 - h,
        /* 目标宽 - 两倍的箭头 */
        T - 4 * h
        /* 半径 */
      ),
      h
    ), f.left = ft(j, 0, z) + Y, f.top = ft(U, 0, $) + Y, f["--tips-arrow-top"] = (b > m ? 0 : rt) || ct, f["--tips-arrow-left"] = st || ct;
  }
  let nt = l.classList, Lt = _t[o], V = _[0];
  (F(V) || V != o) && d([
    [
      /* 移除旧值 */
      ["remove", nt, _t[V]],
      /* 添加新值 */
      ["add", nt, Lt]
    ],
    () => {
      _.shift(), _.push(o), e.index = o;
    }
  ]);
}
const X = "data-tips-scroll", mt = -1e4, gt = 3, yt = {
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
      let t = y(
        [e],
        xt(
          "0.?.$el|0.$el|0=>el",
          y(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      t && (this._event_mark = !1, this._target__ = t, this.__trigger(this.visible));
    }
  }
}, se = {
  name: "Tips",
  components: {
    Card: C
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: mt
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
      default: gt
    }
  },
  watch: yt,
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
      E(t, this.__css(), !0), kt({
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
        t ? d(e.addEventListener, e, "scroll", H) : (d(L.observe, L, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, X), i || (d(e.addEventListener, e, "scroll", H), this.__attr(e, X, "true"))));
      });
    },
    __css() {
      let e = {};
      return this._arrow__ = e["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, y(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, e;
    },
    __2next() {
      F(this.static) || (this.init(), Q.delay = +this.delay, ee(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(e, this, arguments);
        },
        this.delay === gt ? 600 : this.delay
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
      if (Ft(e)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0, this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [
            [
              "click",
              (t) => {
                this.$attrs.clear === void 0 || d([B() || []]), this.__toggle(t), B(["__toggle", this, t]);
              }
            ],
            [
              "click",
              () => {
                let t = B();
                if (t && t[1].$attrs.modal !== void 0) {
                  B(t);
                  return;
                }
                d([t || []]);
              },
              window
            ]
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
      x(i, (r, n) => {
        let l = 0;
        n[2] === window && ++l && pt.__tipsmark_ || (l && (pt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
        ]));
      }), d(s);
    }
  },
  mounted() {
    yt.target.handler.call(this, this.target), (mt === this.target || this.isSimply) && (this._target__ = d("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Ct(this.__2listener), this.__parent(function(e, t) {
      d(e.removeEventListener, e, "scroll", H), d(e.removeAttribute, e, X, void 0), t || d(L.unobserve, L, e);
    });
  }
};
var re = function() {
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
}, ne = [], le = /* @__PURE__ */ S(
  se,
  re,
  ne,
  !1,
  null,
  "9bf62634",
  null,
  null
);
const Z = le.exports;
const ae = {
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
      p([B() || []]), this.proxy = !1;
    },
    emitsubmit(e) {
      this.$emit("submit-click", this.close);
    }
  }
};
var oe = function() {
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
}, he = [], ce = /* @__PURE__ */ S(
  ae,
  oe,
  he,
  !1,
  null,
  "44a33905",
  null,
  null
);
const Tt = ce.exports;
const ue = {
  name: "Div",
  components: {
    Card: C
  }
};
var _e = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, fe = [], de = /* @__PURE__ */ S(
  ue,
  _e,
  fe,
  !1,
  null,
  "a7a3e455",
  null,
  null
);
const Rt = de.exports;
const pe = {
  name: "Flex",
  components: {
    Card: C
  }
};
var me = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, ge = [], ye = /* @__PURE__ */ S(
  pe,
  me,
  ge,
  !1,
  null,
  "e24d1dff",
  null,
  null
);
const zt = ye.exports;
let bt = (e) => e == null || e == null, be = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const ve = {
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
      return E(
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
      be(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: v,
    trigger(e, t) {
      O(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        x(e, (i, s) => {
          this.$emit(s[0], bt(s[1]) ? !0 : s[1]);
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
            let i = t.index || x(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              t.picker,
              t.id
            );
            bt(i) || this.setindex(i);
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
      E(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, x(
        this.flyweights,
        (n, l, o, a, u, h, f, _, c) => {
          if (o = n / u >> 0, _ = o + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < h % a) + /* 计算轮数, row的倍数 */
          (h / a >> 0)), c = _ * u + n % u, c >= this.count) {
            r || (this.end = !0, t.push(["onend"]), r = !0);
            return;
          }
          l.index = _, l.i = c, l.data = this.flys[c];
          let m = [
            /* top */
            _ * this.expand + l.x,
            /* left */
            l.space
          ];
          f && m.reverse(), l.top = m[0], l.left = m[1];
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
      let i = this.scrollx, s = this.flyweight, r = y(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, a = r.width, u = r.height, h = (ot(this.width, a) || a) + l, f = ot(this.height, u) + o, _ = [a / h >> 0 || 1, u / f >> 0 || 1];
        i && _.reverse();
        let [c, m] = _, T = this.padding, R, N = 0, g, w;
        i ? (g = h, h -= l, w = ($) => (
          /* 计算top偏移量 */
          $ * (f - o) + ($ + 1) * o
        )) : (n ? (h = (a - l * (c + 2 * T - 1)) / c, R = !T * l, N = T * l) : (R = 0, N = a < h ? 0 : (a % h + l * c) / (c + 1) >> 0, h -= l), w = ($) => $ * (h + R) + ($ + 1) * N, g = f), this.row = m + 2, this.column = c, this.realH = f - o, this.realW = h, this.expand = g, this.Size = Math.ceil(e / c) * g;
        let k = Math.min(e, c * this.row), b = k - 1, A;
        for (; k-- > 0; )
          A = b - k, this.$set(t, A, {
            x: l,
            y: o,
            width: h,
            height: f - o,
            space: w(A % c),
            data: {}
          });
        t.length = b + 1;
        let z = [];
        u / g > b / c && z.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), z.push([
          "update:space",
          {
            row: (b / c >> 0) + 1,
            column: c,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(z);
      });
    }
  }
};
var xe = function() {
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
}, we = [], $e = /* @__PURE__ */ S(
  ve,
  xe,
  we,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Nt = $e.exports, Se = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return vt(i) ? [] : O(i) ? i : [i];
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
    y(
      this.$refs,
      "component._.provides|component=>component",
      (e, t, i, s) => {
        if (p("nodeType", t) === 1)
          this.Ref = t;
        else
          for (let r in t)
            /^\$/.test(r) && E(this.Ref, t[r]);
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
var Ce = function() {
  var t = this, i = t._self._c;
  return i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, ke = [], Te = /* @__PURE__ */ S(
  Se,
  Ce,
  ke,
  !1,
  null,
  null,
  null,
  null
);
const tt = Te.exports;
let Re = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const ze = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: C, Stream: tt },
  emits: ["update:modelValue", "update:value", "update:state", "change", "focus"],
  data: function() {
    return {
      id: xt("input-{1000-9999}-{1000-9999}"),
      inputAttrs: {},
      trigger: "modelValue",
      attrs: {},
      left: null,
      right: null,
      rm: null,
      completed: null,
      error: "",
      RULE: []
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
    y(this.$attrs, "value|modelValue=>value", (e, t) => {
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
    }), x(["left", "right", "rm"], (e, t, i) => {
      i = p([
        ["$el", this.$refs[t] || ""],
        [t, this.$refs]
      ]), this[t] = p("offsetWidth", i || "") || null;
    }), this.attrs = y(this.$attrs, Re + this.mix), x(
      this.$attrs,
      (e, t, i) => {
        Ot(t) && (this.inputAttrs[e] = t), e in i && this.$watch(
          "$attrs." + e,
          (s) => {
            this.inputAttrs[e] = s;
          },
          { immediate: !0 }
        );
      },
      Ht("maxlength,type,disabled,readonly")
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
    rule: {
      type: [Array, Object],
      default: () => []
    }
  },
  watch: {
    error(e) {
      this.$emit("update:state", !!e);
    }
  },
  methods: {
    storage() {
      let e = this.rule;
      O(e) || (e = [e]), x(e, (t, i) => {
        this.RULE.push([this.__trigger, this, i]);
      });
    },
    /* 
    { required: true, message: '必填' },
    { min: 3, max: 20, message: '3~20字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能字母数字下划线' }
    */
    __trigger(e, t, i, s) {
      if (!(!e.required && e.trigger && t !== e.trigger))
        return e.pattern instanceof RegExp && !e.pattern.test(i) && (s = !0), e.min && e < e.min && (s = !0), e.max && e > e.max && (s = !0), e.required && !i && (s = !0), this.error = s ? e.message : void 0;
    },
    close() {
      this.$nextTick(() => {
        this.__emit("");
      });
    },
    __change(e) {
      p(this.RULE, null, "change", e.target.value), this.$emit("change", e.target.value);
    },
    __blur(e) {
      p(this.RULE, null, "blur", e.target.value), this.__emit(e.target.value);
    },
    __input(e) {
      p(this.RULE, null, "input", e.target.value), this.__emit(e.target.value);
    },
    __emit(e) {
      this.$emit("update:" + this.trigger, e);
    }
  }
};
var Ne = function() {
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
}, Ae = [], Ee = /* @__PURE__ */ S(
  ze,
  Ne,
  Ae,
  !1,
  null,
  "aa614f9b",
  null,
  null
);
const At = Ee.exports, Le = {}, Et = [];
Et.push(K, C, Tt, Rt, zt, Nt, At, tt, Z);
const He = { Boom: K, Card: C, Confirm: Tt, Div: Rt, Flex: zt, Flyweight: Nt, Input: At, Stream: tt, Tips: Z };
Le.install = function(e, t = {}) {
  Et.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  K as Boom,
  C as Card,
  Tt as Confirm,
  Rt as Div,
  zt as Flex,
  Nt as Flyweight,
  At as Input,
  tt as Stream,
  Z as Tips,
  He as components,
  Le as default
};
