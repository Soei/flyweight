import { runer as y, each as H, merge as U, picker as C, isEmpty as Mt, isSimplyType as bt, isString as Jt, isArray as ht, format as Kt } from "@soei/util";
import { openBlock as m, createElementBlock as j, normalizeClass as lt, normalizeStyle as K, renderSlot as a, createElementVNode as _, createTextVNode as S, toDisplayString as k, normalizeProps as F, guardReactiveProps as Y, resolveComponent as T, createBlock as D, withCtx as p, mergeProps as $, createCommentVNode as dt, withModifiers as ot, createVNode as N, createSlots as Et, renderList as Q, Fragment as Lt, resolveDynamicComponent as Qt } from "vue";
import { runer as f, isNil as P, each as wt, isString as Zt } from "@soei/tools";
import te from "@soei/picker";
let ee = /(\d+|[+\-\*/]|%)/g, $t = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, vt = (t, e) => {
  let i;
  if (i = y("match", t, ee)) {
    let n = i.length, r, s = 0, o, l = [];
    for (; n--; )
      s = i.shift(), s in $t ? (r && l.push(r), s === "%" && (l.length = 2), o = s) : +s && l.push(+s), l.length == 2 && (l.push(e), r = $t[o].apply(null, l), l.length = 0);
    +r || (r = +l.pop()), t = r >> 0;
  }
  return t;
}, xt = {}, x = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  xt[e] || (xt[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const A = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [n, r] of e)
    i[n] = r;
  return i;
};
let ie = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function at(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Ht = {
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
      U(e, this.$data, this.$props, this.$attrs, "mix"), this._style = C(e, t, (i, n, r, s) => (this.$nextTick(() => {
        y("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), ie.test(s) ? x(n) : n));
    },
    immediate: !0
  }
}, se = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Rt = {};
H(
  se,
  (t, e, i) => {
    t = at(e), Rt["--" + at(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  Ht
);
const re = {
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
      return y("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Ht,
  methods: {
    exec: x,
    isEmpty: Mt,
    picker: C,
    runer: y,
    isSimplyType: bt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Rt, t), U(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: at,
    css(t, e) {
      H(t, (i, n) => {
        let r = n in this ? this[n] : this.default[n];
        !r || this.default[n] == r || (e[i] = x(r));
      });
    },
    change(t) {
      bt(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      C(
        Jt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, i, n, r) => {
          let s = x(i);
          !s || this.default[r] == s || (this[r] = s);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ne = {
  class: "card-title",
  space: ""
}, le = {
  class: "card-ico-items",
  vcenter: ""
}, oe = ["title"], ae = { class: "card-content" };
function he(t, e, i, n, r, s) {
  return m(), j("div", {
    class: lt({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: K(s.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        _("div", ne, [
          a(t.$slots, "subtitle", {}, () => [
            S(k(s.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            _("div", le, [
              a(t.$slots, "icon", F(Y({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              _("div", {
                class: lt(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: K(r.closecss),
                onClick: e[0] || (e[0] = (o) => t.$emit("close")),
                title: s.tips
              }, null, 14, oe)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        _("div", ae, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const B = /* @__PURE__ */ A(re, [["render", he], ["__scopeId", "data-v-92201ce9"]]);
const de = {
  name: "Boom",
  emits: ["click"],
  components: { Card: B },
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
      H("disabled visible tips".split(/\s+/g), (t, e) => {
        y("removeAttribute", this.$el, e);
      });
    }
  }
}, ue = ["disabled"];
function ce(t, e, i, n, r, s) {
  const o = T("tips"), l = T("Card");
  return m(), D(l, {
    class: "s-button",
    use: "",
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    inline: ""
  }, {
    default: p(() => [
      _("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          _("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = S("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, ue),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (m(), D(o, F($({ key: 0 }, t.$attrs.tips)), null, 16)) : dt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix"]);
}
const ut = /* @__PURE__ */ A(de, [["render", ce], ["__scopeId", "data-v-6f0bad14"]]), St = /(?:\,|\|{2})/, kt = "px", Ct = "";
let It = document.documentElement, Tt, zt = ["s-left", "s-top", "s-right", "s-bottom"], fe = { left: 0, top: 1, right: 2, bottom: 3 };
const ct = [];
var pe = te(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let ft = {}, Wt = null;
pe(ft, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Wt = _e(() => {
      f(ct);
    }, t), this._delay = t;
  }
});
ft.delay = 60;
function _e(t, e) {
  let i = 0;
  return function() {
    const n = Date.now();
    n - i >= e && (i = n, f(t, this, arguments));
  };
}
const J = () => {
  Wt();
};
function me(t) {
  ct.push(t);
}
const G = new ResizeObserver(J);
G.observe(It);
function Nt(t, e, i) {
  return Math.max(e, Math.min(t, i));
}
function Ot(t) {
  t.onresize || (ct.push([Ot, null, t]), t.onresize = !0);
  var e = It, i = e.clientHeight, n = e.clientWidth, r = P(t.offset) ? 7 : t.offset, s = t.target, o = t.room, l = t.index, h = t.position, g = t.edge || 7, d = t.arrow || 0, b = t.space || (t.space = []), c = s.getBoundingClientRect(), u = o.offsetHeight, z = o.offsetWidth, R = "3,0,2,1".split(St), V, v = c.left, w = c.top, M = Math.max(w, g), E = (c.height == Tt ? c.bottom - w : c.height) >> 0, I = (c.width == Tt ? c.right - v : c.width) >> 0, W = n - z - r, O = i - u - r, L = v < 0 || v + I / 2 > n, _t = w < 0 || w + E > i, Z = [
    /* left: 0 */
    _t ? -1 : v - z,
    /* top: 1 */
    L ? -1 : M - u,
    /* right: 2 */
    _t ? -1 : W - c.right,
    /* bottom: 3 */
    L ? -1 : O - c.bottom
  ];
  h && (wt(
    h.split(St),
    function(qt, X, rt, Xt) {
      Xt.push(rt[X]);
    },
    fe,
    V = []
  ), R.unshift.apply(R, V)), l = wt(
    R,
    function(qt, X, rt) {
      if (rt[X] > 0)
        return X;
    },
    Z
  );
  let q = t.css;
  var tt = 0, et = 0, mt = 0, gt = 0;
  if (l != null) {
    var it = l == 0 || l == 2;
    tt = Math.max(
      r,
      it ? l == 2 ? c.right + r : Z[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        W,
        /* 目标对象的 left */
        v - d
      )
    ), et = Math.max(
      r,
      /* 打底最小 */
      it ? Math.min(
        M,
        O,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          M - (u - E) / 2,
          r
        )
      ) : l == 3 ? w + E + d + r : Z[1] - r
    ), it ? gt = Math.max(M - et + (E - d) / 2 - d, d) : mt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        v - tt + (I - d) / 2 - d,
        /* 目标宽 - 两倍的箭头 */
        z - 4 * d
        /* 半径 */
      ),
      d
    ), q.left = Nt(tt, 0, W) + kt, q.top = Nt(et, 0, O) + kt, q["--tips-arrow-top"] = gt || Ct, q["--tips-arrow-left"] = mt || Ct;
  }
  let yt = o.classList, Yt = zt[l], st = b[0];
  (P(st) || st != l) && f([
    [
      /* 移除旧值 */
      ["remove", yt, zt[st]],
      /* 添加新值 */
      ["add", yt, Yt]
    ],
    () => {
      b.shift(), b.push(l), t.index = l;
    }
  ]);
}
const nt = "data-tips-scroll", At = 3, ge = {
  name: "Tips",
  components: {
    Card: B
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
      default: At
    }
  },
  watch: {
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
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), f(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return f(
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
      U(e, this.__css(), !0), Ot({
        onresize: !1,
        /* 监控的目标 */
        target: this._target__ || (this._target__ = t.parentNode),
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: e,
        /* 偏移量 */
        offset: P(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (t.nodeName == "#comment" || this.static || !P(this.target))
        return;
      let i = this.before;
      f([
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
        e ? f(t.addEventListener, t, "scroll", J) : (f(G.observe, G, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, nt), i || (f(t.addEventListener, t, "scroll", J), this.__attr(t, nt, "true"))));
      });
    },
    __css() {
      let t = {};
      return P(this.target) ? this._arrow__ = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, C(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0 : (this.position + "", this.offset + ""), t;
    },
    __2next() {
      P(this.static) || (this.init(), ft.delay = +this.delay, me(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(t, this, arguments);
        },
        this.delay === At ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        f("stopPropagation", t), this.$emit("toggle", this.proxy = !0);
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
      f("stopPropagation", t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(t) {
      if (Zt(t)) {
        if (this._event_mark)
          return;
        this._event_mark = !0, this._el__ = f("parentNode", this.$el), this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [["click"], ["click", this.__hide, window]]
        }[t], this._try("addEventListener");
      } else
        t === 0 ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._el__, i = this._event__;
      if (!i)
        return;
      ht(i) || (i = [i]);
      let n = [];
      H(i, (r, s) => {
        n.push([
          t,
          s[2] || e,
          s[0],
          s[1] || this.__toggle
        ]);
      }), f(n);
    }
  },
  mounted() {
    P(this.target) || this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      f(t.removeEventListener, t, "scroll", J), f(t.removeAttribute, t, nt, void 0), e || f(G.unobserve, G, t);
    });
  }
}, ye = { class: "tips-title" };
function be(t, e, i, n, r, s) {
  const o = T("Card");
  return r.proxy ? (m(), D(o, $({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": i.before,
      ["tips-" + i.position]: i.target !== void 0
    }],
    style: i.static ? null : r.css,
    static: i.static ? "" : null,
    onClick: e[0] || (e[0] = ot(() => {
    }, ["stop"])),
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: p(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          _("div", ye, k(i.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          S(k(i.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["class", "style", "static"])) : dt("", !0);
}
const pt = /* @__PURE__ */ A(ge, [["render", be], ["__scopeId", "data-v-771e1bfd"]]);
const we = {
  name: "Confirm",
  components: {
    Card: B,
    Tips: pt,
    Boom: ut
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
    emitcancel(t) {
      this.proxy = !1, this.$emit("cancel-click", t);
    },
    emitsubmit(t) {
      this.$emit("submit-click", () => {
        this.proxy = !1;
      });
    }
  }
}, $e = { flex: "" };
function ve(t, e, i, n, r, s) {
  const o = T("Card"), l = T("Boom"), h = T("Tips");
  return m(), j("span", null, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    N(h, $({
      ref: "stips",
      class: "s-confirm",
      visible: t.proxy,
      min: ["auto"]
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: p(() => [
        N(o, null, {
          title: p(() => [
            N(o, { class: "s-confirm-title" }, {
              default: p(() => [
                a(t.$slots, "title", {}, () => [
                  S(k(i.title), 1)
                ], !0)
              ]),
              _: 3
            })
          ]),
          content: p(() => [
            a(t.$slots, "content", {}, () => [
              S(k(i.content), 1)
            ], !0),
            a(t.$slots, "bottom", {}, () => [
              N(o, {
                class: "s-confirm-booms",
                flex: "",
                space: ""
              }, {
                default: p(() => [
                  e[0] || (e[0] = _("span", null, null, -1)),
                  _("span", $e, [
                    a(t.$slots, "boom", {}, () => [
                      N(l, $({ cancel: "" }, i.cancelAttrs, {
                        onClick: ot(s.emitcancel, ["stop"])
                      }), {
                        default: p(() => [
                          S(k(i.cancel), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"]),
                      N(l, $({
                        class: "simply",
                        onClick: ot(s.emitsubmit, ["stop"]),
                        submit: ""
                      }, i.submitAttrs), {
                        default: p(() => [
                          S(k(i.submit), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"])
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
const Pt = /* @__PURE__ */ A(we, [["render", ve], ["__scopeId", "data-v-6d2e0c0f"]]);
const xe = {
  name: "Div",
  components: {
    Card: B
  }
};
function Se(t, e, i, n, r, s) {
  const o = T("Card");
  return m(), D(o, { class: "s-div" }, Et({ _: 2 }, [
    Q(t.$slots, (l, h) => ({
      name: h,
      fn: p((g) => [
        a(t.$slots, h, F(Y(g)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const jt = /* @__PURE__ */ A(xe, [["render", Se], ["__scopeId", "data-v-26f551b1"]]);
const ke = {
  name: "Flex",
  components: {
    Card: B
  }
};
function Ce(t, e, i, n, r, s) {
  const o = T("Card");
  return m(), D(o, {
    class: "s-flex",
    flex: ""
  }, Et({ _: 2 }, [
    Q(t.$slots, (l, h) => ({
      name: h,
      fn: p((g) => [
        a(t.$slots, h, F(Y(g)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const Ft = /* @__PURE__ */ A(ke, [["render", Ce], ["__scopeId", "data-v-d9d6cdb5"]]);
let Bt = (t) => t == null || t == null, Te = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const ze = {
  name: "Flyweight",
  components: {
    Card: B
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
      var t = this.w, e = this.h, i = this.Size, n = {};
      return U(
        n,
        {
          "--width": x(this.realW),
          "--height": x(this.realH),
          "--flyweight-content": x(i)
        },
        e && {
          "--flyweight-h": x(e)
        },
        t && {
          "--flyweight-w": x(t)
        },
        "mix"
      ), n;
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
      Te(t);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: x,
    trigger(t, e) {
      ht(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        H(t, (i, n) => {
          this.$emit(n[0], Bt(n[1]) ? !0 : n[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      y(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || H(
              this.flys,
              (n, r, s, o) => {
                if (r[s] == o)
                  return n;
              },
              e.picker,
              e.id
            );
            Bt(i) || this.setindex(i);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      y(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let i = e / this.column >> 0, n = this.expand, r = this.flyweight[this.direction] / n >> 0;
              i > r && i < r + this.row - 2 || (this.flyweight[this.direction] = i * n - n / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = y(this.direction, t.target), n = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      U(n, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", n]));
      let r = !1;
      this.end = !1, this.__index = n.index, H(
        this.flyweights,
        (s, o, l, h, g, d, b, c, u) => {
          if (l = s / g >> 0, c = l + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(l < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), u = c * g + s % g, u >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          o.index = c, o.i = u, o.data = this.flys[u];
          let z = [
            /* top */
            c * this.expand + o.x,
            /* left */
            o.space
          ];
          b && z.reverse(), o.top = z[0], o.left = z[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        n.index,
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
      let i = this.scrollx, n = this.flyweight, r = C(n, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [o, l] = this.offset, h = r.width, g = r.height, d = (vt(this.width, h) || h) + o, b = vt(this.height, g) + l, c = [h / d >> 0 || 1, g / b >> 0 || 1];
        i && c.reverse();
        let [u, z] = c, R = this.padding, V, v = 0, w, M;
        i ? (w = d, d -= o, M = (L) => (
          /* 计算top偏移量 */
          L * (b - l) + (L + 1) * l
        )) : (s ? (d = (h - o * (u + 2 * R - 1)) / u, V = !R * o, v = R * o) : (V = 0, v = h < d ? 0 : (h % d + o * u) / (u + 1) >> 0, d -= o), M = (L) => L * (d + V) + (L + 1) * v, w = b), this.row = z + 2, this.column = u, this.realH = b - l, this.realW = d, this.expand = w, this.Size = Math.ceil(t / u) * w;
        let E = Math.min(t, u * this.row), I = E - 1, W;
        for (; E-- > 0; )
          W = I - E, this.$set(e, W, {
            x: o,
            y: l,
            width: d,
            height: b - l,
            space: M(W % u),
            data: {}
          });
        e.length = I + 1;
        let O = [];
        g / w > I / u && O.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), O.push([
          "update:space",
          {
            row: (I / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(O);
      });
    }
  }
}, Ne = { class: "flyweight-all" };
function Ae(t, e, i, n, r, s) {
  const o = T("Card");
  return m(), j("div", {
    ref: "flyweight",
    class: lt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: i.line && r.__top !== 0
    }]),
    style: K(s.style),
    onScroll: e[0] || (e[0] = (...l) => s.scroll && s.scroll(...l))
  }, [
    a(t.$slots, "title", F(Y(s.bridge)), void 0, !0),
    _("div", Ne, [
      (m(!0), j(Lt, null, Q(r.flyweights, (l, h) => (m(), j("div", {
        key: h,
        style: K({
          top: l.top + "px",
          left: l.left + "px"
        })
      }, [
        a(t.$slots, "default", $({ ref_for: !0 }, l), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", F(Y(s.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", F($({ key: 0 }, s.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        N(o, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: p(() => [...e[1] || (e[1] = [
            S(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const Dt = /* @__PURE__ */ A(ze, [["render", Ae], ["__scopeId", "data-v-1c021354"]]);
const Be = {
  inheritAttrs: !1,
  name: "Input",
  components: { Card: B },
  emits: ["update:modelValue", "update:value", "change", "focus"],
  data: function() {
    return {
      id: Kt("input-{1000-9999}-{1000-9999}"),
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
    C(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), H(["left", "right", "rm"], (t, e, i) => {
      i = y([
        ["$el", this.$refs[e]],
        [e, this.$refs]
      ]), this[e] = y("offsetWidth", i) || null;
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          this.$refs.input.value = t || "";
        });
      }
    }), this.attrs = C(
      this.$attrs,
      "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half" + this.mix
    ), this.inputAttrs = C(this.$attrs, "maxlength,type,disabled,readonly");
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
    __change(t) {
      this.$emit("change", t.target.value);
    },
    __input(t) {
      this.__emit(t.target.value);
    },
    __emit(t) {
      this.$emit("update:" + this.trigger, t);
    }
  }
}, Me = ["id"], Ee = ["for"], Le = {
  class: "placeholder",
  flex: ""
}, He = {
  class: "s-wrap-tips",
  flex: ""
}, Re = {
  key: 0,
  class: "s-wrap-limit"
};
function Ie(t, e, i, n, r, s) {
  const o = T("Card");
  return m(), D(o, $({
    class: "s-wrap",
    use: ""
  }, t.attrs, {
    class: t.$attrs.class,
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: p(() => [
      _("input", $({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (l) => t.$emit("focus", l)),
        onChange: e[1] || (e[1] = (...l) => s.__change && s.__change(...l)),
        onInput: e[2] || (e[2] = (...l) => s.__input && s.__input(...l))
      }), null, 16, Me),
      _("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          _("span", Le, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              S(" " + k(i.placeholder), 1)
            ], !0)
          ]),
          _("span", He, [
            a(t.$slots, "tips", { limit: s.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              S(" " + k(i.tips || i.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Ee),
      N(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: p(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: s.limit }, () => [
              t.$attrs.maxlength ? (m(), j("span", Re, k(s.limit), 1)) : dt("", !0)
            ], !0),
            _("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[3] || (e[3] = (...l) => s.close && s.close(...l))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      N(o, {
        ref: "left",
        class: "s-wrap-left",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: p(() => [
          a(t.$slots, "icon", {}, void 0, !0)
        ]),
        _: 3
      }, 512)
    ]),
    _: 3
  }, 16, ["class", "style"]);
}
const Vt = /* @__PURE__ */ A(Be, [["render", Ie], ["__scopeId", "data-v-8f9880f6"]]), We = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return Mt(i) ? [] : ht(i) ? i : [i];
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
    C(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, i, n) => {
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
function Oe(t, e, i, n, r, s) {
  return m(), D(Qt(i.type), $({ ref: "component" }, t.$attrs), {
    default: p(() => [
      (m(!0), j(Lt, null, Q(s.column, (o) => a(t.$slots, s.__trigger(o), $({
        key: o.type
      }, { ref_for: !0 }, o))), 128))
    ]),
    _: 3
  }, 16);
}
const Ut = /* @__PURE__ */ A(We, [["render", Oe]]), Pe = {}, Gt = [];
Gt.push(ut, B, Pt, jt, Ft, Dt, Vt, Ut, pt);
const Ue = { Boom: ut, Card: B, Confirm: Pt, Div: jt, Flex: Ft, Flyweight: Dt, Input: Vt, Stream: Ut, Tips: pt };
Pe.install = function(t, e = {}) {
  Gt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  ut as Boom,
  B as Card,
  Pt as Confirm,
  jt as Div,
  Ft as Flex,
  Dt as Flyweight,
  Vt as Input,
  Ut as Stream,
  pt as Tips,
  Ue as components,
  Pe as default
};
