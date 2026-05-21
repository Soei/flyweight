import { runer as _, each as S, merge as q, picker as C, isEmpty as Ot, isSimplyType as St, isString as re, isArray as Z, format as jt, array2Json as ne } from "@soei/util";
import { openBlock as y, createElementBlock as j, normalizeClass as at, normalizeStyle as K, renderSlot as a, createElementVNode as g, createTextVNode as k, toDisplayString as T, normalizeProps as B, guardReactiveProps as I, resolveComponent as N, createBlock as F, mergeProps as b, withCtx as m, createCommentVNode as pt, withModifiers as ht, createVNode as x, createSlots as Ft, renderList as tt, Fragment as Vt, resolveDynamicComponent as le } from "vue";
import { runer as c, each as ut, isNil as Q, isString as oe, isFunction as ae } from "@soei/tools";
import he from "@soei/picker";
let ue = /(\d+|[+\-\*/]|%)/g, kt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Tt = (t, e) => {
  let s;
  if (s = _("match", t, ue)) {
    let i = s.length, r, n = 0, l, o = [];
    for (; i--; )
      n = s.shift(), n in kt ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(e), r = kt[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), t = r >> 0;
  }
  return t;
}, A = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
const R = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, r] of e)
    s[i] = r;
  return s;
};
let de = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function dt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Dt = {
  close: {
    handler(t) {
      this.change(t);
    },
    deep: !0
  },
  offset: {
    handler(t) {
      this.margin(t);
    },
    deep: !0
  },
  /* 混合样式 */
  mix: {
    handler(t) {
      if (!t)
        return;
      let e = {};
      q(e, this.$data, this.$props, this.$attrs, "mix"), this._style = C(e, t, (s, i, r, n) => (this.$nextTick(() => {
        _("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), de.test(n) ? A(i) : i));
    },
    immediate: !0
  }
}, ce = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Ut = {};
S(
  ce,
  (t, e, s) => {
    t = dt(e), Ut["--" + dt(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Dt
);
const fe = {
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
      return _("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Dt,
  methods: {
    exec: A,
    isEmpty: Ot,
    picker: C,
    runer: _,
    isSimplyType: St,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Ut, t), q(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: dt,
    css(t, e) {
      S(t, (s, i) => {
        let r = i in this ? this[i] : this.default[i];
        !r || this.default[i] == r || (e[s] = A(r));
      });
    },
    change(t) {
      St(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      C(
        re(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, s, i, r) => {
          let n = A(s);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, pe = {
  class: "card-title",
  space: ""
}, me = {
  class: "card-ico-items",
  vcenter: ""
}, _e = ["title"], ge = { class: "card-content" };
function ye(t, e, s, i, r, n) {
  return y(), j("div", {
    class: at({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: K(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        g("div", pe, [
          a(t.$slots, "subtitle", {}, () => [
            k(T(n.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            g("div", me, [
              a(t.$slots, "icon", B(I({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              g("div", {
                class: at(["card-close", { hide: n.isSimplyType(s.close) ? !s.close : !1 }]),
                style: K(r.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: n.tips
              }, null, 14, _e)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        g("div", ge, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ R(fe, [["render", ye], ["__scopeId", "data-v-8fab5a23"]]);
const be = {
  name: "Boom",
  emits: ["click"],
  components: { Card: W },
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
      S("disabled visible tips".split(/\s+/g), (t, e) => {
        _("removeAttribute", this.$el, e);
      });
    }
  }
}, $e = ["disabled"];
function we(t, e, s, i, r, n) {
  const l = N("tips"), o = N("Card");
  return y(), F(o, b({
    class: "s-button",
    use: ""
  }, t.$attrs, {
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    "inline-block": ""
  }), {
    default: m(() => [
      g("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          g("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = k("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, $e),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (y(), F(l, B(b({ key: 0 }, t.$attrs.tips)), null, 16)) : pt("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const mt = /* @__PURE__ */ R(be, [["render", we], ["__scopeId", "data-v-984a282f"]]), Ct = /(?:\,|\|{2})/, ct = "px", Nt = "";
let ft = document.documentElement, zt, At = ["s-left", "s-top", "s-right", "s-bottom"], ve = { left: 0, top: 1, right: 2, bottom: 3 };
const X = [];
var xe = he(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let _t = {}, qt = null;
xe(_t, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    qt = Se(() => {
      c(X);
    }, t), this._delay = t;
  }
});
_t.delay = 60;
function Se(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, c(t, this, arguments));
  };
}
const J = () => {
  qt();
};
function Bt(t) {
  Gt(t), X.push(t);
}
function Gt(t) {
  let e = ut(X, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || X.splice(e, 1);
}
const U = new ResizeObserver(J);
U.observe(ft);
function Et(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const Lt = [], G = (t) => {
  if (t)
    Lt.push(t);
  else
    return Lt.pop();
}, Mt = {};
var ke = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, r) {
    r = this.aWH[i], t[this.aLT[i]] = (e[r] - s[r]) / 2 + ct;
  },
  trigger: function(t, e, s, i) {
    var r = this.CENTER;
    t || (t = r), s || (s = {}), i || (i = {});
    for (var n, l, o = this.rWidth, h, f = t.match(this.rPosition), u = 0, p = f.length; u < p; u++)
      h = f[u], h != r ? i[h] = 0 : (l = f[(u + 1) % p], n = +!o.test(l), this.css(i, s, e, n), l == h && this.css(i, s, e, +!n));
    return i;
  }
};
function Xt(t) {
  t.onresize || (X.push([Xt, null, t]), t.onresize = !0);
  var e = ft, s = e.clientHeight, i = e.clientWidth, r = Q(t.offset) ? 7 : t.offset, n = t.target, l = t.room, o = t.index, h = t.position, f = t.edge || 7, u = t.arrow || 0, p = t.css, $ = t.space || (t.space = []), d = n.getBoundingClientRect(), w = l.offsetHeight, E = l.offsetWidth;
  if (/\s+|center/.test(h)) {
    ke.trigger(h, l, ft, p);
    return;
  }
  var P = "3,0,2,1".split(Ct), V, v = d.left, L = d.top, H = Math.max(L, f), z = (d.height == zt ? d.bottom - L : d.height) >> 0, D = (d.width == zt ? d.right - v : d.width) >> 0, O = i - E - r, M = s - w - r, bt = v < 0 || v + D / 2 > i, $t = L < 0 || L + z > s, et = [
    /* left: 0 */
    $t ? -1 : v - E,
    /* top: 1 */
    bt ? -1 : H - w,
    /* right: 2 */
    $t ? -1 : O - d.right,
    /* bottom: 3 */
    bt ? -1 : M - d.bottom
  ];
  h && (ut(
    h.split(Ct),
    function(se, Y, lt, ie) {
      ie.push(lt[Y]);
    },
    ve,
    V = []
  ), P.unshift.apply(P, V)), o = ut(
    P,
    function(se, Y, lt) {
      if (lt[Y] > 0)
        return Y;
    },
    et
  );
  var st = 0, it = 0, wt = 0, vt = 0;
  if (o != null) {
    var rt = o == 0 || o == 2;
    st = Math.max(
      r,
      rt ? o == 2 ? d.right + r : et[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        O,
        /* 目标对象的 left */
        v - u
      )
    ), it = Math.max(
      r,
      /* 打底最小 */
      rt ? Math.min(
        H,
        M,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          H - (w - z) / 2,
          r
        )
      ) : o == 3 ? L + z + u + r : et[1] - r
    ), rt ? vt = Math.max(H - it + (z - u) / 2 - u, u) : wt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        v - st + (D - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        E - 4 * u
        /* 半径 */
      ),
      u
    ), p.left = Et(st, 0, O) + ct, p.top = Et(it, 0, M) + ct, p["--tips-arrow-top"] = (z > w ? 0 : vt) || Nt, p["--tips-arrow-left"] = wt || Nt;
  }
  let xt = l.classList, ee = At[o], nt = $[0];
  (Q(nt) || nt != o) && c([
    [
      /* 移除旧值 */
      ["remove", xt, At[nt]],
      /* 添加新值 */
      ["add", xt, ee]
    ],
    () => {
      $.shift(), $.push(o), t.index = o;
    }
  ]);
}
const ot = "data-tips-scroll", Rt = -1e4, Wt = 3, Ht = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), this.$emit("update:visible", t);
  },
  visible: {
    handler: function(t) {
      this.$nextTick(() => {
        this.__trigger(t);
      });
    },
    immediate: !0
  },
  target: {
    handler(t) {
      let e = C(
        [t],
        jt(
          "0.?.$el|0.$el|0=>el",
          C(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      e && (this._event_mark = !1, this._target__ = e, this.__trigger(this.visible));
    }
  }
}, Te = {
  name: "Tips",
  components: {
    Card: W
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Rt
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
      default: Wt
    }
  },
  watch: Ht,
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
    __parent(t) {
      let e = this.$el, s;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = document.body, s = !0), c(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return c(
        t[s === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        s
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      if (t.nodeName == "#comment")
        return;
      let e = this.$set ? Object.assign({}, this.css) : this.css;
      q(e, this.__css(), !0), Xt({
        onresize: !1,
        /* 监控的目标 */
        target: this._target__,
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: e,
        /* 偏移量 */
        offset: Q(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (t.nodeName == "#comment" || this.static || this.isSimply)
        return;
      let s = this.before;
      c([
        [
          e ? "removeChild" : s ? "insertBefore" : "appendChild",
          document.documentElement,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? c(t.addEventListener, t, "scroll", J) : (c(U.observe, U, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, ot), s || (c(t.addEventListener, t, "scroll", J), this.__attr(t, ot, "true"))));
      });
    },
    __css() {
      let t = {};
      return this._arrow__ = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, C(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      Q(this.static) || (this.init(), _t.delay = +this.delay, Bt(this.__2listener), this.__2listener(), this.__toggle_append(this.$el), Bt(this.init), c([["observe", U]], null, this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          c(t, this, arguments);
        },
        this.delay === Wt ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        c("stopPropagation", t), this.$emit("toggle", this.proxy = !0);
      });
    },
    /* 隐藏 */
    __hide(t) {
      this.__debounce(() => {
        this.proxy && this.$emit("toggle", this.proxy = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(t) {
      c("stopPropagation", t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(t) {
      if (oe(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let e = {
          click: (s) => {
            this.$attrs.clear === void 0 || c([G() || []]), this.__toggle(s), G(["__toggle", this, s]);
          },
          close: () => {
            let s = G();
            if (s && s[1].$attrs.modal !== void 0) {
              G(s);
              return;
            }
            c([s || []]);
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
            ["click", e.click],
            ["click", e.close, document.body]
          ],
          enter: [
            ["mouseenter", e.click],
            ["click", e.close, document.body]
          ]
        }[t], this._try("addEventListener");
      } else
        t === 0 ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      Z(s) || (s = [s]);
      let i = [];
      S(s, (r, n) => {
        let l = 0;
        n[2] === document.body && ++l && Mt.__tipsmark_ || (l && (Mt.__tipsmark_ = !0), i.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
        ]));
      }), c(i);
    }
  },
  mounted() {
    Ht.target.handler.call(this, this.target), (Rt === this.target || this.isSimply) && (this._target__ = c("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Gt(this.__2listener), this.__parent(function(t, e) {
      c(t.removeEventListener, t, "scroll", J), c(t.removeAttribute, t, ot, void 0), e || c(U.unobserve, U, t);
    });
  }
}, Ce = { class: "tips-title" };
function Ne(t, e, s, i, r, n) {
  const l = N("Card");
  return r.proxy ? (y(), F(l, b({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": s.before
    }],
    style: s.static ? null : r.css,
    static: s.static ? "" : null,
    onClick: e[0] || (e[0] = ht(() => {
    }, ["stop"])),
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: m(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          g("div", Ce, T(s.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          k(T(s.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["class", "style", "static"])) : pt("", !0);
}
const gt = /* @__PURE__ */ R(Te, [["render", Ne], ["__scopeId", "data-v-fe07cf05"]]);
const ze = {
  name: "Confirm",
  components: {
    Card: W,
    Tips: gt,
    Boom: mt
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
    emitcancel(t) {
      this.close(), this.$emit("cancel-click", t);
    },
    close() {
      _([G() || []]), this.proxy = !1;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, Ae = { class: "s-confirm-warp" }, Be = { flex: "" };
function Ee(t, e, s, i, r, n) {
  const l = N("Card"), o = N("Boom"), h = N("Tips");
  return y(), j("span", Ae, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    x(h, b({
      ref: "stips",
      class: "s-confirm",
      visible: t.proxy,
      height: "auto",
      min: ["auto"]
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: m(() => [
        a(t.$slots, "el", {}, () => [
          x(l, null, {
            title: m(() => [
              x(l, { class: "s-confirm-title" }, {
                default: m(() => [
                  a(t.$slots, "title", {}, () => [
                    k(T(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: m(() => [
              a(t.$slots, "content", {}, () => [
                k(T(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                x(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: ""
                }, {
                  default: m(() => [
                    e[0] || (e[0] = g("span", null, null, -1)),
                    g("span", Be, [
                      a(t.$slots, "boom", B(I({
                        close: n.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", B(I({ click: n.emitcancel, text: s.cancel })), () => [
                          x(o, b({ cancel: "" }, s.cancelAttrs, {
                            onClick: ht(n.emitcancel, ["stop"])
                          }), {
                            default: m(() => [
                              k(T(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", B(I({
                          click: n.close,
                          text: s.submit
                        })), () => [
                          x(o, b({
                            class: "simply",
                            onClick: ht(n.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: m(() => [
                              k(T(s.submitAttrs.text || s.submit), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0)
                      ], !0)
                    ])
                  ]),
                  _: 3
                })
              ], !0)
            ]),
            _: 3
          })
        ], !0)
      ]),
      _: 3
    }, 16, ["visible", "arrow"])
  ]);
}
const Yt = /* @__PURE__ */ R(ze, [["render", Ee], ["__scopeId", "data-v-09f1a82f"]]);
const Le = {
  name: "Div",
  components: {
    Card: W
  }
};
function Me(t, e, s, i, r, n) {
  const l = N("Card");
  return y(), F(l, b({ class: "s-div" }, t.$attrs, { height: "auto" }), Ft({ _: 2 }, [
    tt(t.$slots, (o, h) => ({
      name: h,
      fn: m((f) => [
        a(t.$slots, h, B(I(f)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Jt = /* @__PURE__ */ R(Le, [["render", Me], ["__scopeId", "data-v-5a663869"]]);
const Re = {
  name: "Flex",
  components: {
    Card: W
  }
};
function We(t, e, s, i, r, n) {
  const l = N("Card");
  return y(), F(l, b({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), Ft({ _: 2 }, [
    tt(t.$slots, (o, h) => ({
      name: h,
      fn: m((f) => [
        a(t.$slots, h, B(I(f)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Kt = /* @__PURE__ */ R(Re, [["render", We], ["__scopeId", "data-v-80afacb2"]]);
let It = (t) => t == null || t == null, He = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ie = {
  name: "Flyweight",
  components: {
    Card: W
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
      var t = this.w, e = this.h, s = this.Size, i = {};
      return q(
        i,
        {
          "--width": A(this.realW),
          "--height": A(this.realH),
          "--flyweight-content": A(s)
        },
        e && {
          "--flyweight-h": A(e)
        },
        t && {
          "--flyweight-w": A(t)
        },
        "mix"
      ), i;
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
    flys(t) {
      this.count = t.length, this.rebuild();
      let e = this.task.shift();
      e && this.$nextTick(() => {
        this.setview(e);
      });
    },
    view: {
      handler(t) {
        this.setview(t);
      },
      immediate: !0,
      deep: !0
    },
    index(t) {
      this.setindex(t);
    },
    top(t) {
      this.flyweight.scrollTop = t;
    },
    left(t) {
      this.flyweight.scrollLeft = t;
    }
  },
  mounted() {
    this.flyweights = [], this.$set || (this.$set = (t, e, s) => {
      t[e] = s;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      He(t);
    }
    this.scrollx = _("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: A,
    trigger(t, e) {
      Z(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        S(t, (s, i) => {
          this.$emit(i[0], It(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      _(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let s = e.index || S(
              this.flys,
              (i, r, n, l) => {
                if (r[n] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            It(s) || this.setindex(s);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      _(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let s = e / this.column >> 0, i = this.expand, r = this.flyweight[this.direction] / i >> 0;
              s > r && s < r + this.row - 2 || (this.flyweight[this.direction] = s * i - i / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        _(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = _(this.direction, t.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      q(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let r = !1;
      this.end = !1, this.__index = i.index, S(
        this.flyweights,
        (n, l, o, h, f, u, p, $, d) => {
          if (o = n / f >> 0, $ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < u % h) + /* 计算轮数, row的倍数 */
          (u / h >> 0)), d = $ * f + n % f, d >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = $, l.i = d, l.data = this.flys[d];
          let w = [
            /* top */
            $ * this.expand + l.x,
            /* left */
            l.space
          ];
          p && w.reverse(), l.top = w[0], l.left = w[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        i.index,
        this.scrollx
      ), this.trigger(e), e = null;
    },
    scroll(t) {
      this.run(t || { target: this.flyweight, from: "space" });
    },
    rebuild() {
      let t = this.count || this.flys.length, e = this.flyweights;
      if (!t)
        return e.length = t;
      this.count = t;
      let s = this.scrollx, i = this.flyweight, r = C(i, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, f = r.height, u = (Tt(this.width, h) || h) + l, p = Tt(this.height, f) + o, $ = [h / u >> 0 || 1, f / p >> 0 || 1];
        s && $.reverse();
        let [d, w] = $, E = this.padding, P, V = 0, v, L;
        s ? (v = u, u -= l, L = (M) => (
          /* 计算top偏移量 */
          M * (p - o) + (M + 1) * o
        )) : (n ? (u = (h - l * (d + 2 * E - 1)) / d, P = !E * l, V = E * l) : (P = 0, V = h < u ? 0 : (h % u + l * d) / (d + 1) >> 0, u -= l), L = (M) => M * (u + P) + (M + 1) * V, v = p), this.row = w + 2, this.column = d, this.realH = p - o, this.realW = u, this.expand = v, this.Size = Math.ceil(t / d) * v;
        let H = Math.min(t, d * this.row), z = H - 1, D;
        for (; H-- > 0; )
          D = z - H, this.$set(e, D, {
            x: l,
            y: o,
            width: u,
            height: p - o,
            space: L(D % d),
            data: {}
          });
        e.length = z + 1;
        let O = [];
        f / v > z / d && O.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), O.push([
          "update:space",
          {
            row: (z / d >> 0) + 1,
            column: d,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(O);
      });
    }
  }
}, Pe = { class: "flyweight-all" };
function Oe(t, e, s, i, r, n) {
  const l = N("Card");
  return y(), j("div", {
    ref: "flyweight",
    class: at(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: s.line && r.__top !== 0
    }]),
    style: K(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", B(I(n.bridge)), void 0, !0),
    g("div", Pe, [
      (y(!0), j(Vt, null, tt(r.flyweights, (o, h) => (y(), j("div", {
        key: h,
        style: K({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", b({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", B(I(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", B(b({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        x(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: m(() => [...e[1] || (e[1] = [
            k(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const Qt = /* @__PURE__ */ R(Ie, [["render", Oe], ["__scopeId", "data-v-1c021354"]]), je = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return Ot(s) ? [] : Z(s) ? s : [s];
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
    C(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, i) => {
        if (_("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let r in e)
            /^\$/.test(r) && q(this.Ref, e[r]);
      }
    );
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Fe(t, e, s, i, r, n) {
  return y(), F(le(n.tag), b({ ref: "component" }, t.$attrs), {
    default: m(() => [
      (y(!0), j(Vt, null, tt(n.column, (l) => a(t.$slots, n.__trigger(l), b({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const yt = /* @__PURE__ */ R(je, [["render", Fe]]);
let Ve;
const Pt = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
};
let De = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Ue = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: W, Stream: yt },
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
      id: jt("input-{1000-9999}-{1000-9999}"),
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
    C(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          _([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), S(["left", "right", "rm"], (t, e, s) => {
      s = _([
        ["$el", this.$refs[e] || ""],
        [e, this.$refs]
      ]), this[e] = _("offsetWidth", s || "") || null;
    }), this.attrs = C(this.$attrs, De + this.mix), S(
      this.$attrs,
      (t, e, s) => {
        ae(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
          "$attrs." + t,
          (i) => {
            this.inputAttrs[t] = i;
          },
          { immediate: !0 }
        );
      },
      ne("maxlength,type,disabled,readonly")
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
    error(t) {
      let e = this.hasSuccess;
      t || (e = 1);
      let s;
      e && t ? (e = 0, s = -1) : s = e * (2 * +!t - 1), this.hasSuccess = e, this.$emit("update:sum", +this.sum + s), this.$emit("update:state", s);
    }
  },
  methods: {
    storage() {
      let t = this.rules, e = [];
      S(Z(t) ? t : [t], (s, i, r) => {
        S(Pt, (n, l) => {
          n in i && (r = [
            function(o, h, f, u, p, $, d) {
              let w = o.trigger;
              if (!o.required && w && this !== w)
                return;
              let E = h(f, d, $);
              return p.error = E ? u : Ve;
            },
            this,
            i,
            Pt[n],
            i[n],
            i.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(r);
      }), this.RULE.push(e);
    },
    __runer(t, e) {
      _([this.RULE], null, t, e);
    },
    close() {
      this.$nextTick(() => {
        this.__emit(""), this.__runer("clear", "");
      });
    },
    __change(t) {
      this.__runer("change", t.target.value), this.$emit("change", t.target.value);
    },
    __blur(t) {
      this.__runer("blur", t.target.value), this.__emit(t.target.value);
    },
    __input(t) {
      this.__runer("input", t.target.value), this.__emit(t.target.value);
    },
    __emit(t) {
      this.$emit("update:" + this.trigger, t);
    }
  }
}, qe = ["for"], Ge = {
  class: "placeholder",
  flex: ""
}, Xe = {
  class: "s-wrap-tips",
  flex: ""
}, Ye = {
  key: 0,
  class: "s-wrap-limit"
};
function Je(t, e, s, i, r, n) {
  const l = N("Stream"), o = N("Card");
  return y(), F(o, b({
    class: "s-wrap",
    "s-completed": t.completed,
    use: ""
  }, t.attrs, {
    class: {
      [t.$attrs.class || ""]: !0,
      error: t.error
    },
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: m(() => [
      x(l, b({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (h) => t.$emit("focus", h)),
        onChange: n.__change,
        onInput: n.__input,
        onBlur: n.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      g("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          g("span", Ge, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              k(" " + T(s.placeholder), 1)
            ], !0)
          ]),
          g("span", Xe, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              k(" " + T(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, qe),
      x(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: m(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: n.limit }, () => [
              t.$attrs.maxlength ? (y(), j("span", Ye, T(n.limit), 1)) : pt("", !0)
            ], !0),
            g("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      x(o, {
        ref: "left",
        class: "s-wrap-left",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: m(() => [
          a(t.$slots, "left", {}, () => [
            a(t.$slots, "icon", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      x(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: m(() => [
          a(t.$slots, "error", {}, () => [
            k(T(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const Zt = /* @__PURE__ */ R(Ue, [["render", Je], ["__scopeId", "data-v-acf70ba2"]]), Ke = {}, te = [];
te.push(mt, W, Yt, Jt, Kt, Qt, Zt, yt, gt);
const ss = { Boom: mt, Card: W, Confirm: Yt, Div: Jt, Flex: Kt, Flyweight: Qt, Input: Zt, Stream: yt, Tips: gt };
Ke.install = function(t, e = {}) {
  te.forEach((s) => {
    let { global: i, name: r } = s;
    i === !1 || t.component(r, s), t.component("S" + r, s);
  });
};
export {
  mt as Boom,
  W as Card,
  Yt as Confirm,
  Jt as Div,
  Kt as Flex,
  Qt as Flyweight,
  Zt as Input,
  yt as Stream,
  gt as Tips,
  ss as components,
  Ke as default
};
