import { runer as f, each as A, merge as U, picker as k, isEmpty as It, isSimplyType as St, isString as ie, isArray as Z, format as Pt, array2Json as se } from "@soei/util";
import { openBlock as y, createElementBlock as j, normalizeClass as at, normalizeStyle as K, renderSlot as a, createElementVNode as _, createTextVNode as x, toDisplayString as S, normalizeProps as E, guardReactiveProps as H, resolveComponent as T, createBlock as F, mergeProps as b, withCtx as m, createCommentVNode as pt, withModifiers as ht, createVNode as v, createSlots as Ot, renderList as tt, Fragment as jt, resolveDynamicComponent as re } from "vue";
import { runer as c, each as ut, isNil as Q, isString as ne, isFunction as le } from "@soei/tools";
import oe from "@soei/picker";
let ae = /(\d+|[+\-\*/]|%)/g, kt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, Tt = (t, e) => {
  let i;
  if (i = f("match", t, ae)) {
    let s = i.length, r, n = 0, l, o = [];
    for (; s--; )
      n = i.shift(), n in kt ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(e), r = kt[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), t = r >> 0;
  }
  return t;
}, N = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
const R = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [s, r] of e)
    i[s] = r;
  return i;
};
let he = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function dt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Ft = {
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
      U(e, this.$data, this.$props, this.$attrs, "mix"), this._style = k(e, t, (i, s, r, n) => (this.$nextTick(() => {
        f("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), he.test(n) ? N(s) : s));
    },
    immediate: !0
  }
}, ue = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Vt = {};
A(
  ue,
  (t, e, i) => {
    t = dt(e), Vt["--" + dt(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  Ft
);
const de = {
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
      return f("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Ft,
  methods: {
    exec: N,
    isEmpty: It,
    picker: k,
    runer: f,
    isSimplyType: St,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Vt, t), U(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: dt,
    css(t, e) {
      A(t, (i, s) => {
        let r = s in this ? this[s] : this.default[s];
        !r || this.default[s] == r || (e[i] = N(r));
      });
    },
    change(t) {
      St(t) || (this.closecss = k(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      k(
        ie(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, i, s, r) => {
          let n = N(i);
          !n || this.default[r] == n || (this[r] = n);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ce = {
  class: "card-title",
  space: ""
}, fe = {
  class: "card-ico-items",
  vcenter: ""
}, pe = ["title"], me = { class: "card-content" };
function ge(t, e, i, s, r, n) {
  return y(), j("div", {
    class: at({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: K(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        _("div", ce, [
          a(t.$slots, "subtitle", {}, () => [
            x(S(n.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            _("div", fe, [
              a(t.$slots, "icon", E(H({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              _("div", {
                class: at(["card-close", { hide: n.isSimplyType(i.close) ? !i.close : !1 }]),
                style: K(r.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: n.tips
              }, null, 14, pe)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        _("div", me, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const M = /* @__PURE__ */ R(de, [["render", ge], ["__scopeId", "data-v-8fab5a23"]]);
const _e = {
  name: "Boom",
  emits: ["click"],
  components: { Card: M },
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
      A("disabled visible tips".split(/\s+/g), (t, e) => {
        f("removeAttribute", this.$el, e);
      });
    }
  }
}, ye = ["disabled"];
function be(t, e, i, s, r, n) {
  const l = T("tips"), o = T("Card");
  return y(), F(o, b({
    class: "s-button",
    use: ""
  }, t.$attrs, {
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    inline: ""
  }), {
    default: m(() => [
      _("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          _("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = x("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, ye),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (y(), F(l, E(b({ key: 0 }, t.$attrs.tips)), null, 16)) : pt("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const mt = /* @__PURE__ */ R(_e, [["render", be], ["__scopeId", "data-v-6c149412"]]), Ct = /(?:\,|\|{2})/, ct = "px", zt = "";
let ft = document.documentElement, Nt, At = ["s-left", "s-top", "s-right", "s-bottom"], we = { left: 0, top: 1, right: 2, bottom: 3 };
const X = [];
var $e = oe(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let gt = {}, Dt = null;
$e(gt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Dt = ve(() => {
      c(X);
    }, t), this._delay = t;
  }
});
gt.delay = 60;
function ve(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, c(t, this, arguments));
  };
}
const J = () => {
  Dt();
};
function xe(t) {
  Ut(t), X.push(t);
}
function Ut(t) {
  let e = ut(X, function(i, s) {
    if (t == s)
      return i;
  });
  e === void 0 || X.splice(e, 1);
}
const q = new ResizeObserver(J);
q.observe(ft);
function Et(t, e, i) {
  return Math.max(e, Math.min(t, i));
}
const Lt = [], G = (t) => {
  if (t)
    Lt.push(t);
  else
    return Lt.pop();
}, Bt = {};
var Se = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, i, s, r) {
    r = this.aWH[s], t[this.aLT[s]] = (e[r] - i[r]) / 2 + ct;
  },
  trigger: function(t, e, i, s) {
    var r = this.CENTER;
    t || (t = r), i || (i = {}), s || (s = {});
    for (var n, l, o = this.rWidth, h, p = t.match(this.rPosition), u = 0, g = p.length; u < g; u++)
      h = p[u], h != r ? s[h] = 0 : (l = p[(u + 1) % g], n = +!o.test(l), this.css(s, i, e, n), l == h && this.css(s, i, e, +!n));
    return s;
  }
};
function qt(t) {
  t.onresize || (X.push([qt, null, t]), t.onresize = !0);
  var e = ft, i = e.clientHeight, s = e.clientWidth, r = Q(t.offset) ? 7 : t.offset, n = t.target, l = t.room, o = t.index, h = t.position, p = t.edge || 7, u = t.arrow || 0, g = t.css, $ = t.space || (t.space = []), d = n.getBoundingClientRect(), C = l.offsetHeight, I = l.offsetWidth;
  if (/\s+|center/.test(h)) {
    Se.trigger(h, l, ft, g);
    return;
  }
  var P = "3,0,2,1".split(Ct), V, w = d.left, L = d.top, W = Math.max(L, p), z = (d.height == Nt ? d.bottom - L : d.height) >> 0, D = (d.width == Nt ? d.right - w : d.width) >> 0, O = s - I - r, B = i - C - r, bt = w < 0 || w + D / 2 > s, wt = L < 0 || L + z > i;
  if (h == "center")
    return;
  var et = [
    /* left: 0 */
    wt ? -1 : w - I,
    /* top: 1 */
    bt ? -1 : W - C,
    /* right: 2 */
    wt ? -1 : O - d.right,
    /* bottom: 3 */
    bt ? -1 : B - d.bottom
  ];
  h && (ut(
    h.split(Ct),
    function(te, Y, lt, ee) {
      ee.push(lt[Y]);
    },
    we,
    V = []
  ), P.unshift.apply(P, V)), o = ut(
    P,
    function(te, Y, lt) {
      if (lt[Y] > 0)
        return Y;
    },
    et
  );
  var it = 0, st = 0, $t = 0, vt = 0;
  if (o != null) {
    var rt = o == 0 || o == 2;
    it = Math.max(
      r,
      rt ? o == 2 ? d.right + r : et[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        O,
        /* 目标对象的 left */
        w - u
      )
    ), st = Math.max(
      r,
      /* 打底最小 */
      rt ? Math.min(
        W,
        B,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          W - (C - z) / 2,
          r
        )
      ) : o == 3 ? L + z + u + r : et[1] - r
    ), rt ? vt = Math.max(W - st + (z - u) / 2 - u, u) : $t = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        w - it + (D - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        I - 4 * u
        /* 半径 */
      ),
      u
    ), g.left = Et(it, 0, O) + ct, g.top = Et(st, 0, B) + ct, g["--tips-arrow-top"] = (z > C ? 0 : vt) || zt, g["--tips-arrow-left"] = $t || zt;
  }
  let xt = l.classList, Zt = At[o], nt = $[0];
  (Q(nt) || nt != o) && c([
    [
      /* 移除旧值 */
      ["remove", xt, At[nt]],
      /* 添加新值 */
      ["add", xt, Zt]
    ],
    () => {
      $.shift(), $.push(o), t.index = o;
    }
  ]);
}
const ot = "data-tips-scroll", Rt = -1e4, Mt = 3, Wt = {
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
      let e = k(
        [t],
        Pt(
          "0.?.$el|0.$el|0=>el",
          k(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      e && (this._event_mark = !1, this._target__ = e, this.__trigger(this.visible));
    }
  }
}, ke = {
  name: "Tips",
  components: {
    Card: M
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
      default: Mt
    }
  },
  watch: Wt,
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
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), c(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return c(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      if (t.nodeName == "#comment")
        return;
      let e = this.$set ? Object.assign({}, this.css) : this.css;
      U(e, this.__css(), !0), qt({
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
      let i = this.before;
      c([
        [
          e ? "removeChild" : i ? "insertBefore" : "appendChild",
          document.documentElement,
          t,
          i ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, i) => {
        e ? c(t.addEventListener, t, "scroll", J) : (c(q.observe, q, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, ot), i || (c(t.addEventListener, t, "scroll", J), this.__attr(t, ot, "true"))));
      });
    },
    __css() {
      let t = {};
      return this._arrow__ = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, k(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      Q(this.static) || (this.init(), gt.delay = +this.delay, xe(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          c(t, this, arguments);
        },
        this.delay === Mt ? 600 : this.delay
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
      if (ne(t)) {
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
              (e) => {
                this.$attrs.clear === void 0 || c([G() || []]), this.__toggle(e), G(["__toggle", this, e]);
              }
            ],
            [
              "click",
              () => {
                let e = G();
                if (e && e[1].$attrs.modal !== void 0) {
                  G(e);
                  return;
                }
                c([e || []]);
              },
              window
            ]
          ]
        }[t], this._try("addEventListener");
      } else
        t === 0 ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, i = this._event__;
      if (!i)
        return;
      Z(i) || (i = [i]);
      let s = [];
      A(i, (r, n) => {
        let l = 0;
        n[2] === window && ++l && Bt.__tipsmark_ || (l && (Bt.__tipsmark_ = !0), s.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
        ]));
      }), c(s);
    }
  },
  mounted() {
    Wt.target.handler.call(this, this.target), (Rt === this.target || this.isSimply) && (this._target__ = c("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Ut(this.__2listener), this.__parent(function(t, e) {
      c(t.removeEventListener, t, "scroll", J), c(t.removeAttribute, t, ot, void 0), e || c(q.unobserve, q, t);
    });
  }
}, Te = { class: "tips-title" };
function Ce(t, e, i, s, r, n) {
  const l = T("Card");
  return r.proxy ? (y(), F(l, b({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": i.before
    }],
    style: i.static ? null : r.css,
    static: i.static ? "" : null,
    onClick: e[0] || (e[0] = ht(() => {
    }, ["stop"])),
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: m(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          _("div", Te, S(i.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          x(S(i.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["class", "style", "static"])) : pt("", !0);
}
const _t = /* @__PURE__ */ R(ke, [["render", Ce], ["__scopeId", "data-v-989d8d7a"]]);
const ze = {
  name: "Confirm",
  components: {
    Card: M,
    Tips: _t,
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
      f([G() || []]), this.proxy = !1;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, Ne = { flex: "" };
function Ae(t, e, i, s, r, n) {
  const l = T("Card"), o = T("Boom"), h = T("Tips");
  return y(), j("span", null, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    v(h, b({
      ref: "stips",
      class: "s-confirm",
      visible: t.proxy,
      min: ["auto"]
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: m(() => [
        v(l, null, {
          title: m(() => [
            v(l, { class: "s-confirm-title" }, {
              default: m(() => [
                a(t.$slots, "title", {}, () => [
                  x(S(i.title), 1)
                ], !0)
              ]),
              _: 3
            })
          ]),
          content: m(() => [
            a(t.$slots, "content", {}, () => [
              x(S(i.content), 1)
            ], !0),
            a(t.$slots, "bottom", {}, () => [
              v(l, {
                class: "s-confirm-booms",
                flex: "",
                space: ""
              }, {
                default: m(() => [
                  e[0] || (e[0] = _("span", null, null, -1)),
                  _("span", Ne, [
                    a(t.$slots, "boom", E(H({
                      close: n.close,
                      submit: i.submit
                    })), () => [
                      a(t.$slots, "cancel", E(H({ click: n.emitcancel, text: i.cancel })), () => [
                        v(o, b({ cancel: "" }, i.cancelAttrs, {
                          onClick: ht(n.emitcancel, ["stop"])
                        }), {
                          default: m(() => [
                            x(S(i.cancelAttrs.text || i.cancel), 1)
                          ]),
                          _: 1
                        }, 16, ["onClick"])
                      ], !0),
                      a(t.$slots, "submit", E(H({
                        click: n.close,
                        text: i.submit
                      })), () => [
                        v(o, b({
                          class: "simply",
                          onClick: ht(n.emitsubmit, ["stop"]),
                          submit: ""
                        }, i.submitAttrs), {
                          default: m(() => [
                            x(S(i.submitAttrs.text || i.submit), 1)
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
      ]),
      _: 3
    }, 16, ["visible", "arrow"])
  ]);
}
const Gt = /* @__PURE__ */ R(ze, [["render", Ae], ["__scopeId", "data-v-0fe1089c"]]);
const Ee = {
  name: "Div",
  components: {
    Card: M
  }
};
function Le(t, e, i, s, r, n) {
  const l = T("Card");
  return y(), F(l, b({ class: "s-div" }, t.$attrs, { height: "auto" }), Ot({ _: 2 }, [
    tt(t.$slots, (o, h) => ({
      name: h,
      fn: m((p) => [
        a(t.$slots, h, E(H(p)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Xt = /* @__PURE__ */ R(Ee, [["render", Le], ["__scopeId", "data-v-5a663869"]]);
const Be = {
  name: "Flex",
  components: {
    Card: M
  }
};
function Re(t, e, i, s, r, n) {
  const l = T("Card");
  return y(), F(l, b({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), Ot({ _: 2 }, [
    tt(t.$slots, (o, h) => ({
      name: h,
      fn: m((p) => [
        a(t.$slots, h, E(H(p)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Yt = /* @__PURE__ */ R(Be, [["render", Re], ["__scopeId", "data-v-80afacb2"]]);
let Ht = (t) => t == null || t == null, Me = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const We = {
  name: "Flyweight",
  components: {
    Card: M
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
      var t = this.w, e = this.h, i = this.Size, s = {};
      return U(
        s,
        {
          "--width": N(this.realW),
          "--height": N(this.realH),
          "--flyweight-content": N(i)
        },
        e && {
          "--flyweight-h": N(e)
        },
        t && {
          "--flyweight-w": N(t)
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Me(t);
    }
    this.scrollx = f("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: N,
    trigger(t, e) {
      Z(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        A(t, (i, s) => {
          this.$emit(s[0], Ht(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      f(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || A(
              this.flys,
              (s, r, n, l) => {
                if (r[n] == l)
                  return s;
              },
              e.picker,
              e.id
            );
            Ht(i) || this.setindex(i);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      f(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let i = e / this.column >> 0, s = this.expand, r = this.flyweight[this.direction] / s >> 0;
              i > r && i < r + this.row - 2 || (this.flyweight[this.direction] = i * s - s / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        f(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = f(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      U(s, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", s]));
      let r = !1;
      this.end = !1, this.__index = s.index, A(
        this.flyweights,
        (n, l, o, h, p, u, g, $, d) => {
          if (o = n / p >> 0, $ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < u % h) + /* 计算轮数, row的倍数 */
          (u / h >> 0)), d = $ * p + n % p, d >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = $, l.i = d, l.data = this.flys[d];
          let C = [
            /* top */
            $ * this.expand + l.x,
            /* left */
            l.space
          ];
          g && C.reverse(), l.top = C[0], l.left = C[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index,
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
      let i = this.scrollx, s = this.flyweight, r = k(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, p = r.height, u = (Tt(this.width, h) || h) + l, g = Tt(this.height, p) + o, $ = [h / u >> 0 || 1, p / g >> 0 || 1];
        i && $.reverse();
        let [d, C] = $, I = this.padding, P, V = 0, w, L;
        i ? (w = u, u -= l, L = (B) => (
          /* 计算top偏移量 */
          B * (g - o) + (B + 1) * o
        )) : (n ? (u = (h - l * (d + 2 * I - 1)) / d, P = !I * l, V = I * l) : (P = 0, V = h < u ? 0 : (h % u + l * d) / (d + 1) >> 0, u -= l), L = (B) => B * (u + P) + (B + 1) * V, w = g), this.row = C + 2, this.column = d, this.realH = g - o, this.realW = u, this.expand = w, this.Size = Math.ceil(t / d) * w;
        let W = Math.min(t, d * this.row), z = W - 1, D;
        for (; W-- > 0; )
          D = z - W, this.$set(e, D, {
            x: l,
            y: o,
            width: u,
            height: g - o,
            space: L(D % d),
            data: {}
          });
        e.length = z + 1;
        let O = [];
        p / w > z / d && O.push(["onend"]), this.$nextTick(() => {
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
}, He = { class: "flyweight-all" };
function Ie(t, e, i, s, r, n) {
  const l = T("Card");
  return y(), j("div", {
    ref: "flyweight",
    class: at(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: i.line && r.__top !== 0
    }]),
    style: K(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", E(H(n.bridge)), void 0, !0),
    _("div", He, [
      (y(!0), j(jt, null, tt(r.flyweights, (o, h) => (y(), j("div", {
        key: h,
        style: K({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", b({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", E(H(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", E(b({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        v(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: m(() => [...e[1] || (e[1] = [
            x(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const Jt = /* @__PURE__ */ R(We, [["render", Ie], ["__scopeId", "data-v-1c021354"]]), Pe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return It(i) ? [] : Z(i) ? i : [i];
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
    k(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, i, s) => {
        if (f("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let r in e)
            /^\$/.test(r) && U(this.Ref, e[r]);
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
function Oe(t, e, i, s, r, n) {
  return y(), F(re(n.tag), b({ ref: "component" }, t.$attrs), {
    default: m(() => [
      (y(!0), j(jt, null, tt(n.column, (l) => a(t.$slots, n.__trigger(l), b({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const yt = /* @__PURE__ */ R(Pe, [["render", Oe]]);
let je = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Fe = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: M, Stream: yt },
  emits: ["update:modelValue", "update:value", "update:state", "change", "focus"],
  data: function() {
    return {
      id: Pt("input-{1000-9999}-{1000-9999}"),
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
    k(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          f([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), A(["left", "right", "rm"], (t, e, i) => {
      i = f([
        ["$el", this.$refs[e] || ""],
        [e, this.$refs]
      ]), this[e] = f("offsetWidth", i || "") || null;
    }), this.attrs = k(this.$attrs, je + this.mix), A(
      this.$attrs,
      (t, e, i) => {
        le(e) && (this.inputAttrs[t] = e), t in i && this.$watch(
          "$attrs." + t,
          (s) => {
            this.inputAttrs[t] = s;
          },
          { immediate: !0 }
        );
      },
      se("maxlength,type,disabled,readonly")
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
    error(t) {
      this.$emit("update:state", !!t);
    }
  },
  methods: {
    storage() {
      let t = this.rule;
      Z(t) || (t = [t]), A(t, (e, i) => {
        this.RULE.push([this.__trigger, this, i]);
      });
    },
    /* 
    { required: true, message: '必填' },
    { min: 3, max: 20, message: '3~20字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能字母数字下划线' }
    */
    __trigger(t, e, i, s) {
      if (!(!t.required && t.trigger && e !== t.trigger))
        return t.pattern instanceof RegExp && !t.pattern.test(i) && (s = !0), t.min && t < t.min && (s = !0), t.max && t > t.max && (s = !0), t.required && !i && (s = !0), this.error = s ? t.message : void 0;
    },
    close() {
      this.$nextTick(() => {
        this.__emit("");
      });
    },
    __change(t) {
      f(this.RULE, null, "change", t.target.value), this.$emit("change", t.target.value);
    },
    __blur(t) {
      f(this.RULE, null, "blur", t.target.value), this.__emit(t.target.value);
    },
    __input(t) {
      f(this.RULE, null, "input", t.target.value), this.__emit(t.target.value);
    },
    __emit(t) {
      this.$emit("update:" + this.trigger, t);
    }
  }
}, Ve = ["for"], De = {
  class: "placeholder",
  flex: ""
}, Ue = {
  class: "s-wrap-tips",
  flex: ""
}, qe = {
  key: 0,
  class: "s-wrap-limit"
};
function Ge(t, e, i, s, r, n) {
  const l = T("Stream"), o = T("Card");
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
      v(l, b({
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
      _("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          _("span", De, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              x(" " + S(i.placeholder), 1)
            ], !0)
          ]),
          _("span", Ue, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              x(" " + S(t.error || i.tips || i.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Ve),
      v(o, {
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
              t.$attrs.maxlength ? (y(), j("span", qe, S(n.limit), 1)) : pt("", !0)
            ], !0),
            _("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      v(o, {
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
      v(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: m(() => [
          a(t.$slots, "error", {}, () => [
            x(S(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const Kt = /* @__PURE__ */ R(Fe, [["render", Ge], ["__scopeId", "data-v-9bfeb4c0"]]), Xe = {}, Qt = [];
Qt.push(mt, M, Gt, Xt, Yt, Jt, Kt, yt, _t);
const Ze = { Boom: mt, Card: M, Confirm: Gt, Div: Xt, Flex: Yt, Flyweight: Jt, Input: Kt, Stream: yt, Tips: _t };
Xe.install = function(t, e = {}) {
  Qt.forEach((i) => {
    let { global: s, name: r } = i;
    s === !1 || t.component(r, i), t.component("S" + r, i);
  });
};
export {
  mt as Boom,
  M as Card,
  Gt as Confirm,
  Xt as Div,
  Yt as Flex,
  Jt as Flyweight,
  Kt as Input,
  yt as Stream,
  _t as Tips,
  Ze as components,
  Xe as default
};
