import { runer as p, each as b, merge as E, picker as v, isEmpty as St, isSimplyType as ot, isString as Pt, isArray as I, format as Ct, array2Json as jt } from "@soei/util";
import { runer as f, each as J, isNil as j, isString as It, isFunction as Ut } from "@soei/tools";
import Vt from "@soei/picker";
let Dt = /(\d+|[+\-\*/]|%)/g, ut = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, ht = (e, t) => {
  let i;
  if (i = p("match", e, Dt)) {
    let s = i.length, r, n = 0, l, u = [];
    for (; s--; )
      n = i.shift(), n in ut ? (r && u.push(r), n === "%" && (u.length = 2), l = n) : +n && u.push(+n), u.length == 2 && (u.push(t), r = ut[l].apply(null, u), u.length = 0);
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
let Xt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function K(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let kt = {
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
      E(t, this.$data, this.$props, this.$attrs, "mix"), this._style = v(t, e, (i, s, r, n) => (this.$nextTick(() => {
        p("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Xt.test(n) ? $(s) : s));
    },
    immediate: !0
  }
}, qt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Tt = {};
b(
  qt,
  (e, t, i) => {
    e = K(t), Tt["--" + K(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  kt
);
const Gt = {
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
  watch: kt,
  methods: {
    exec: $,
    isEmpty: St,
    picker: v,
    runer: p,
    isSimplyType: ot,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(Tt, e), E(e, this._style, this.$attrs.style, !0, "mix"), e;
    },
    tolower: K,
    css(e, t) {
      b(e, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (t[i] = $(r));
      });
    },
    change(e) {
      ot(e) || (this.closecss = v(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      v(
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
var Yt = function() {
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
}, Jt = [], Kt = /* @__PURE__ */ S(
  Gt,
  Yt,
  Jt,
  !1,
  null,
  "2345bf85",
  null,
  null
);
const C = Kt.exports;
const Qt = {
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
var Zt = function() {
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
}, te = [], ee = /* @__PURE__ */ S(
  Qt,
  Zt,
  te,
  !1,
  null,
  "30c6130b",
  null,
  null
);
const Z = ee.exports, ct = /(?:\,|\|{2})/, Q = "px", _t = "";
let F = document.documentElement, ft, dt = ["s-left", "s-top", "s-right", "s-bottom"], ie = { left: 0, top: 1, right: 2, bottom: 3 };
const W = [];
var se = Vt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let tt = {}, Rt = null;
se(tt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    Rt = re(() => {
      f(W);
    }, e), this._delay = e;
  }
});
tt.delay = 60;
function re(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, f(e, this, arguments));
  };
}
const P = () => {
  Rt();
};
function ne(e) {
  Nt(e), W.push(e);
}
function Nt(e) {
  let t = J(W, function(i, s) {
    if (e == s)
      return i;
  });
  t === void 0 || W.splice(t, 1);
}
const L = new ResizeObserver(P);
L.observe(F);
function pt(e, t, i) {
  return Math.max(t, Math.min(e, i));
}
const mt = [], B = (e) => {
  if (e)
    mt.push(e);
  else
    return mt.pop();
}, gt = {};
var yt = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(e, t, i, s, r) {
    r = this.aWH[s], e[this.aLT[s]] = (t[r] - i[r]) / 2 + Q;
  },
  trigger: function(e, t, i, s) {
    var r = this.CENTER;
    e || (e = r), i || (i = {}), s || (s = {});
    for (var n, l, u = this.rWidth, a, o = e.match(this.rPosition), c = 0, d = o.length; c < d; c++)
      a = o[c], a != r ? s[a] = 0 : (l = o[(c + 1) % d], n = +!u.test(l), this.css(s, i, t, n), l == a && this.css(s, i, t, +!n));
    return s;
  }
};
function zt(e) {
  e.onresize || (W.push([zt, null, e]), e.onresize = !0);
  var t = F, i = t.clientHeight, s = t.clientWidth, r = e.target, n = e.room, l = e.index, u = e.position, a = e.edge || 7, o = e.arrow || 0, c = e.css, d = e.space || (e.space = []), h = r.getBoundingClientRect(), _ = n.offsetHeight, m = n.offsetWidth, g = j(e.offset) ? 7 : e.offset;
  if (/\s+|center/.test(u)) {
    yt.trigger(u, n, F, c);
    return;
  }
  var T = "3,0,2,1".split(ct), N, y = h.left, w = h.top, R = Math.max(w, a), x = (h.height == ft ? h.bottom - w : h.height) >> 0, z = (h.width == ft ? h.right - y : h.width) >> 0, A = s - m - g, k = i - _ - g, st = y < 0 || y + z / 2 > s, rt = w < 0 || w + x > i, U = [
    /* left: 0 */
    rt ? -1 : y - m,
    /* top: 1 */
    st ? -1 : R - _,
    /* right: 2 */
    rt ? -1 : A - h.right,
    /* bottom: 3 */
    st ? -1 : k - h.bottom
  ];
  u && (J(
    u.split(ct),
    function(Ot, H, G, Ft) {
      Ft.push(G[H]);
    },
    ie,
    N = []
  ), T.unshift.apply(T, N)), l = J(
    T,
    function(Ot, H, G) {
      if (G[H] - a > 0)
        return H;
    },
    U
  );
  var V = 0, D = 0, nt = 0, lt = 0;
  if (l == null)
    yt.trigger("center", n, F, c);
  else {
    var X = l == 0 || l == 2;
    V = pt(
      X ? l == 2 ? h.right + g : U[0] - g : (
        /* 目标对象的 left */
        y - o
      ),
      a,
      A
    ), D = pt(
      X ? (
        /* 左右 */
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          R - (_ - x) / 2,
          g
        )
      ) : l == 3 ? w + x + o + g : U[1] - g,
      a,
      k
    ), X ? lt = Math.max(
      R - D + (x - o) / 2 - o,
      o
    ) : nt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        y - V + (z - o) / 2 - o,
        /* 目标宽 - 两倍的箭头 */
        m - 4 * o
      ),
      o
    ), c.left = V + Q, c.top = D + Q, c["--tips-arrow-top"] = (x > _ ? 0 : lt) || _t, c["--tips-arrow-left"] = nt || _t;
  }
  let at = n.classList, Mt = dt[l], q = d[0];
  (j(q) || q != l) && f([
    [
      /* 移除旧值 */
      ["remove", at, dt[q]],
      /* 添加新值 */
      ["add", at, Mt]
    ],
    () => {
      d.shift(), d.push(l), e.index = l;
    }
  ]);
}
const M = document.documentElement, O = (e) => (f("stopPropagation", e), e), le = (e, t) => f(e, t || {}) || {}, Y = "data-tips-scroll", bt = -1e4, vt = 3, xt = {
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
        Ct(
          "0.?.$el|0.$el|0=>el",
          v(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      t && (this._event_mark = !1, this._target__ = t, this.__trigger(this.visible));
    }
  }
}, ae = {
  name: "Tips",
  components: {
    Card: C
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: bt
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
      default: vt
    }
  },
  watch: xt,
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
      E(t, this.__css(), !0), zt({
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
        offset: j(this.offset) ? void 0 : +this.offset >> 0,
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
          M,
          e,
          i ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((e, t, i) => {
        t ? f(e.addEventListener, e, "scroll", P) : (f(L.observe, L, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, Y), i || (f(e.addEventListener, e, "scroll", P), this.__attr(e, Y, "true"))));
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
      j(this.static) || (this.init(), tt.delay = +this.delay, ne(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(e, this, arguments);
        },
        this.delay === vt ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        O(e), this.$emit("toggle", this.proxy = !0);
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
      O(e), this.$emit("toggle", this.proxy = !this.proxy);
    },
    __close(e) {
      this.__click((t, i) => t === void 0 ? e : (
        /* 判断上次的是不是模式窗口 */
        le(1, t).$attrs.modal !== void 0 || /* 判断是不是自己 */
        this.$el === e.currentTarget && i == this._mark ? (B(t), !0) : (f([t || []]), !0)
      ), e);
    },
    __click(e, t) {
      let i = B(), s = f(3, i || "");
      if (f(e, null, i, s) != e)
        return O(t);
      this.$attrs.clear === void 0 || i && f([i]), s != this._mark && (B(i), B(["__toggle", this, e, this._mark])), O(e), this.__toggle(e);
    },
    /* 触发事件 */
    __trigger(e) {
      if (It(e)) {
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
            ["click", this.__click],
            ["click", this.__close, M, !0]
          ],
          enter: [
            ["mouseenter", this.__click],
            ["click", this.__close, M]
          ]
        }[e], this._try("addEventListener");
      } else
        e === 0 ? this.__toggle({}) : this.proxy = e;
    },
    _try(e) {
      let t = this._target__, i = this._event__;
      if (!i)
        return;
      I(i) || (i = [i]);
      let s = [];
      b(i, (r, n) => {
        let l = 0;
        n[2] === M && ++l && gt.__tipsmark_ || (l && (gt.__tipsmark_ = !0), s.push([
          e,
          n[2] || t,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), f(s);
    }
  },
  mounted() {
    xt.target.handler.call(this, this.target), (bt === this.target || this.isSimply) && (this._target__ = f("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Nt(this.__2listener), this.__parent(function(e, t) {
      f(e.removeEventListener, e, "scroll", P), f(e.removeAttribute, e, Y, void 0), t || f(L.unobserve, L, e);
    });
  }
};
var oe = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("Card", t._b({ staticClass: "tips", class: {
    "tips-fly": t.before
  }, style: t.static ? null : t.css, attrs: { static: t.static ? "" : null, mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height" }, on: { click: t.__close } }, "Card", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, ue = [], he = /* @__PURE__ */ S(
  ae,
  oe,
  ue,
  !1,
  null,
  "2016d1a6",
  null,
  null
);
const et = he.exports;
const ce = {
  name: "Confirm",
  components: {
    Card: C,
    Tips: et,
    Boom: Z
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
var _e = function() {
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
}, fe = [], de = /* @__PURE__ */ S(
  ce,
  _e,
  fe,
  !1,
  null,
  "135fee27",
  null,
  null
);
const At = de.exports;
const pe = {
  name: "Div",
  components: {
    Card: C
  }
};
var me = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-div", attrs: { height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
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
  "a7a3e455",
  null,
  null
);
const Et = ye.exports;
const be = {
  name: "Flex",
  components: {
    Card: C
  }
};
var ve = function() {
  var t = this, i = t._self._c;
  return i("Card", t._b({ staticClass: "s-flex", attrs: { flex: "", height: "auto" }, scopedSlots: t._u([t._l(t.$slots, function(s, r) {
    return { key: r, fn: function(n) {
      return [t._t(r, null, null, n)];
    } };
  })], null, !0) }, "Card", t.$attrs, !1));
}, xe = [], $e = /* @__PURE__ */ S(
  be,
  ve,
  xe,
  !1,
  null,
  "e24d1dff",
  null,
  null
);
const Lt = $e.exports;
let $t = (e) => e == null || e == null, we = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const Se = {
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
      we(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: $,
    trigger(e, t) {
      I(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        b(e, (i, s) => {
          this.$emit(s[0], $t(s[1]) ? !0 : s[1]);
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
            $t(i) || this.setindex(i);
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
        let n = /true/.test(this.auto), [l, u] = this.offset, a = r.width, o = r.height, c = (ht(this.width, a) || a) + l, d = ht(this.height, o) + u, h = [a / c >> 0 || 1, o / d >> 0 || 1];
        i && h.reverse();
        let [_, m] = h, g = this.padding, T, N = 0, y, w;
        i ? (y = c, c -= l, w = (k) => (
          /* 计算top偏移量 */
          k * (d - u) + (k + 1) * u
        )) : (n ? (c = (a - l * (_ + 2 * g - 1)) / _, T = !g * l, N = g * l) : (T = 0, N = a < c ? 0 : (a % c + l * _) / (_ + 1) >> 0, c -= l), w = (k) => k * (c + T) + (k + 1) * N, y = d), this.row = m + 2, this.column = _, this.realH = d - u, this.realW = c, this.expand = y, this.Size = Math.ceil(e / _) * y;
        let R = Math.min(e, _ * this.row), x = R - 1, z;
        for (; R-- > 0; )
          z = x - R, this.$set(t, z, {
            x: l,
            y: u,
            width: c,
            height: d - u,
            space: w(z % _),
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
var Ce = function() {
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
}, ke = [], Te = /* @__PURE__ */ S(
  Se,
  Ce,
  ke,
  !1,
  null,
  "906493ea",
  null,
  null
);
const Bt = Te.exports, Re = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
      return St(i) ? [] : I(i) ? i : [i];
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
var Ne = function() {
  var t = this, i = t._self._c;
  return i(t.tag, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, ze = [], Ae = /* @__PURE__ */ S(
  Re,
  Ne,
  ze,
  !1,
  null,
  null,
  null,
  null
);
const it = Ae.exports;
let Ee;
const wt = {
  min: (e, t, i) => i ? e > t : t.length < e,
  max: (e, t, i) => i ? e < t : t.length > e,
  pattern: (e, t) => !e.test(t),
  required: (e, t) => !t
};
let Le = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Be = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: C, Stream: it },
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
      id: Ct("input-{1000-9999}-{1000-9999}"),
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
    }), this.attrs = v(this.$attrs, Le + this.mix), b(
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
      b(I(e) ? e : [e], (i, s, r) => {
        b(wt, (n, l) => {
          n in s && (r = [
            function(u, a, o, c, d, h, _) {
              let m = u.trigger;
              if (!u.required && m && this !== m)
                return;
              let g = a(o, _, h);
              return d.error = g ? c : Ee;
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
  })], 2), i("Card", { ref: "left", staticClass: "s-wrap-left", attrs: { nothing: "", width: "auto", bg: "transparent", vc: "", center: "" } }, [t._t("left", function() {
    return [t._t("icon")];
  })], 2), i("Card", { staticClass: "input-error", attrs: { nothing: "", height: "auto" } }, [t._t("error", function() {
    return [t._v(t._s(t.error))];
  })], 2)], 1);
}, He = [], Me = /* @__PURE__ */ S(
  Be,
  We,
  He,
  !1,
  null,
  "e0f7f9a6",
  null,
  null
);
const Wt = Me.exports, Oe = {}, Ht = [];
Ht.push(Z, C, At, Et, Lt, Bt, Wt, it, et);
const Ie = { Boom: Z, Card: C, Confirm: At, Div: Et, Flex: Lt, Flyweight: Bt, Input: Wt, Stream: it, Tips: et };
Oe.install = function(e, t = {}) {
  Ht.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || e.component(r, i), e.component("S" + r, i);
  });
};
export {
  Z as Boom,
  C as Card,
  At as Confirm,
  Et as Div,
  Lt as Flex,
  Bt as Flyweight,
  Wt as Input,
  it as Stream,
  et as Tips,
  Ie as components,
  Oe as default
};
