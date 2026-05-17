import { runer as $, each as P, merge as F, picker as k, isEmpty as Mt, isSimplyType as yt, isString as Yt, isArray as at, format as qt } from "@soei/util";
import { openBlock as _, createElementBlock as W, normalizeClass as rt, normalizeStyle as J, renderSlot as a, createElementVNode as p, createTextVNode as x, toDisplayString as S, normalizeProps as U, guardReactiveProps as nt, resolveComponent as B, createBlock as G, withCtx as m, mergeProps as b, createCommentVNode as ht, withModifiers as lt, createVNode as M, Fragment as Bt, renderList as Et, resolveDynamicComponent as Xt } from "vue";
import { runer as f, isNil as O, each as bt, isString as Jt } from "@soei/tools";
import Kt from "@soei/picker";
let Qt = /(\d+|[+\-\*/]|%)/g, wt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, vt = (t, e) => {
  let i;
  if (i = $("match", t, Qt)) {
    let n = i.length, r, s = 0, o, l = [];
    for (; n--; )
      s = i.shift(), s in wt ? (r && l.push(r), s === "%" && (l.length = 2), o = s) : +s && l.push(+s), l.length == 2 && (l.push(e), r = wt[o].apply(null, l), l.length = 0);
    +r || (r = +l.pop()), t = r >> 0;
  }
  return t;
}, $t = {}, v = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  $t[e] || ($t[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const I = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [n, r] of e)
    i[n] = r;
  return i;
};
let Zt = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function ot(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Lt = {
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
      F(e, this.$data, this.$props, this.$attrs, "mix"), this._style = k(e, t, (i, n, r, s) => (this.$nextTick(() => {
        $("removeAttribute", this.$el, i.replace(/\..*/, ""));
      }), Zt.test(s) ? v(n) : n));
    },
    immediate: !0
  }
}, te = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Ht = {};
P(
  te,
  (t, e, i) => {
    t = ot(e), Ht["--" + ot(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  Lt
);
const ee = {
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
      return $("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: Lt,
  methods: {
    exec: v,
    isEmpty: Mt,
    picker: k,
    runer: $,
    isSimplyType: yt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Ht, t), F(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: ot,
    css(t, e) {
      P(t, (i, n) => {
        let r = n in this ? this[n] : this.default[n];
        !r || this.default[n] == r || (e[i] = v(r));
      });
    },
    change(t) {
      yt(t) || (this.closecss = k(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      k(
        Yt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, i, n, r) => {
          let s = v(i);
          !s || this.default[r] == s || (this[r] = s);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ie = {
  class: "card-title",
  space: ""
}, se = {
  class: "card-ico-items",
  vcenter: ""
}, re = ["title"], ne = { class: "card-content" };
function le(t, e, i, n, r, s) {
  return _(), W("div", {
    class: rt({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: J(s.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        p("div", ie, [
          a(t.$slots, "subtitle", {}, () => [
            x(S(s.sub), 1)
          ], !0),
          a(t.$slots, "icons", {}, () => [
            p("div", se, [
              a(t.$slots, "icon", U(nt({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              p("div", {
                class: rt(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: J(r.closecss),
                onClick: e[0] || (e[0] = (o) => t.$emit("close")),
                title: s.tips
              }, null, 14, re)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        p("div", ne, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const j = /* @__PURE__ */ I(ee, [["render", le], ["__scopeId", "data-v-2e8c4404"]]);
const oe = {
  name: "Boom",
  emits: ["click"],
  components: { Card: j },
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
      P("disabled visible tips".split(/\s+/g), (t, e) => {
        $("removeAttribute", this.$el, e);
      });
    }
  }
}, ae = ["disabled"];
function he(t, e, i, n, r, s) {
  const o = B("tips"), l = B("Card");
  return _(), G(l, {
    class: "s-button",
    use: "",
    mix: t.mix,
    center: "",
    space: "",
    vc: "",
    inline: ""
  }, {
    default: m(() => [
      p("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (d) => t.$emit("click", d))
      }, [
        a(t.$slots, "inner", {}, () => [
          p("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = x("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, ae),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (_(), G(o, U(b({ key: 0 }, t.$attrs.tips)), null, 16)) : ht("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix"]);
}
const ut = /* @__PURE__ */ I(oe, [["render", he], ["__scopeId", "data-v-fafdbc02"]]), xt = /(?:\,|\|{2})/, St = "px", kt = "";
let Rt = document.documentElement, Tt, Ct = ["s-left", "s-top", "s-right", "s-bottom"], ue = { left: 0, top: 1, right: 2, bottom: 3 };
const dt = [];
var de = Kt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let ct = {}, Ot = null;
de(ct, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Ot = ce(() => {
      f(dt);
    }, t), this._delay = t;
  }
});
ct.delay = 60;
function ce(t, e) {
  let i = 0;
  return function() {
    const n = Date.now();
    n - i >= e && (i = n, f(t, this, arguments));
  };
}
const X = () => {
  Ot();
};
function fe(t) {
  dt.push(t);
}
const D = new ResizeObserver(X);
D.observe(Rt);
function zt(t, e, i) {
  return Math.max(e, Math.min(t, i));
}
function Pt(t) {
  t.onresize || (dt.push([Pt, null, t]), t.onresize = !0);
  var e = Rt, i = e.clientHeight, n = e.clientWidth, r = O(t.offset) ? 7 : t.offset, s = t.target, o = t.room, l = t.index, d = t.position, T = t.edge || 7, h = t.arrow || 0, g = t.space || (t.space = []), c = s.getBoundingClientRect(), u = o.offsetHeight, C = o.offsetWidth, E = "3,0,2,1".split(xt), V, w = c.left, y = c.top, z = Math.max(y, T), N = (c.height == Tt ? c.bottom - y : c.height) >> 0, L = (c.width == Tt ? c.right - w : c.width) >> 0, H = n - C - r, R = i - u - r, A = w < 0 || w + L / 2 > n, pt = y < 0 || y + N > i, K = [
    /* left: 0 */
    pt ? -1 : w - C,
    /* top: 1 */
    A ? -1 : z - u,
    /* right: 2 */
    pt ? -1 : H - c.right,
    /* bottom: 3 */
    A ? -1 : R - c.bottom
  ];
  d && (bt(
    d.split(xt),
    function(Ut, q, it, Gt) {
      Gt.push(it[q]);
    },
    ue,
    V = []
  ), E.unshift.apply(E, V)), l = bt(
    E,
    function(Ut, q, it) {
      if (it[q] > 0)
        return q;
    },
    K
  );
  let Y = t.css;
  var Q = 0, Z = 0, mt = 0, _t = 0;
  if (l != null) {
    var tt = l == 0 || l == 2;
    Q = Math.max(
      r,
      tt ? l == 2 ? c.right + r : K[0] - r : Math.min(
        // tLeft,
        /* 显示区域的宽度 */
        H,
        /* 目标对象的 left */
        w - h
      )
    ), Z = Math.max(
      r,
      tt ? Math.min(
        z,
        R,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          z - (u - N) / 2,
          r
        )
      ) : l == 3 ? y + N + h + r : K[1] - r
    ), tt ? _t = Math.max(z - Z + (N - h) / 2 - h, h) : mt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        w - Q + (L - h) / 2 - h,
        /* 目标宽 - 两倍的箭头 */
        C - 4 * h
        /* 半径 */
      ),
      h
    ), Y.left = zt(Q, 0, H) + St, Y.top = zt(Z, 0, R) + St, Y["--tips-arrow-top"] = _t || kt, Y["--tips-arrow-left"] = mt || kt;
  }
  let gt = o.classList, Dt = Ct[l], et = g[0];
  (O(et) || et != l) && f([
    [
      /* 移除旧值 */
      ["remove", gt, Ct[et]],
      /* 添加新值 */
      ["add", gt, Dt]
    ],
    () => {
      g.shift(), g.push(l), t.index = l;
    }
  ]);
}
const st = "data-tips-scroll", Nt = 3, pe = {
  name: "Tips",
  components: {
    Card: j
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
      default: Nt
    }
  },
  watch: {
    proxy: function(t) {
      t && this.$nextTick(this.__2next), this.$emit("update:visible", t);
    },
    visible: function(t) {
      this.__trigger(t);
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
      F(e, this.__css(), !0), Pt({
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
        offset: O(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      t.nodeName == "#comment" || this.static || !O(this.target) || f([
        [e ? "removeChild" : "appendChild", document.documentElement, t]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, i) => {
        e ? f(t.addEventListener, t, "scroll", X) : (f(D.observe, D, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, st), i || (f(t.addEventListener, t, "scroll", X), this.__attr(t, st, "true"))));
      });
    },
    __css() {
      let t = {};
      return O(this.target) ? this._arrow__ = t["--arrow-size"] = Math.sqrt(2 * Math.pow(Math.min(10, k(this.$attrs, "b|border=>b").b || 3) * 2 + 2, 2)) / 2 >> 0 : (this.position + "", this.offset + ""), t;
    },
    __2next() {
      O(this.static) || (this.init(), ct.delay = +this.delay, fe(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(t, this, arguments);
        },
        this.delay === Nt ? 600 : this.delay
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
      if (Jt(t)) {
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
      at(i) || (i = [i]);
      let n = [];
      P(i, (r, s) => {
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
    O(this.target) || this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      f(t.removeEventListener, t, "scroll", X), f(t.removeAttribute, t, st, void 0), e || f(D.unobserve, D, t);
    });
  }
}, me = { class: "tips-title" };
function _e(t, e, i, n, r, s) {
  const o = B("Card");
  return r.proxy ? (_(), G(o, b({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : r.css,
    static: i.static ? "" : null,
    onClick: e[0] || (e[0] = lt(() => {
    }, ["stop"])),
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>--tips-border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), {
    default: m(() => [
      a(t.$slots, "default", {}, () => [
        a(t.$slots, "title", {}, () => [
          p("div", me, S(i.title), 1)
        ], !0),
        a(t.$slots, "content", {}, () => [
          x(S(i.content), 1)
        ], !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["style", "static", "class"])) : ht("", !0);
}
const ft = /* @__PURE__ */ I(pe, [["render", _e], ["__scopeId", "data-v-9b6c78df"]]);
const ge = {
  name: "Confirm",
  components: {
    Card: j,
    Tips: ft,
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
}, ye = { flex: "" };
function be(t, e, i, n, r, s) {
  const o = B("Card"), l = B("Boom"), d = B("Tips");
  return _(), W("span", null, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    M(d, b({
      ref: "stips",
      class: "s-confirm",
      visible: t.proxy,
      arrow: "",
      min: ["auto"]
    }, t.$attrs), {
      default: m(() => [
        M(o, null, {
          title: m(() => [
            M(o, { class: "s-confirm-title" }, {
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
              M(o, {
                class: "s-confirm-booms",
                flex: "",
                space: ""
              }, {
                default: m(() => [
                  e[0] || (e[0] = p("span", null, null, -1)),
                  p("span", ye, [
                    a(t.$slots, "boom", {}, () => [
                      M(l, b({ cancel: "" }, i.cancelAttrs, {
                        onClick: lt(s.emitcancel, ["stop"])
                      }), {
                        default: m(() => [
                          x(S(i.cancel), 1)
                        ]),
                        _: 1
                      }, 16, ["onClick"]),
                      M(l, b({
                        class: "simply",
                        onClick: lt(s.emitsubmit, ["stop"]),
                        submit: ""
                      }, i.submitAttrs), {
                        default: m(() => [
                          x(S(i.submit), 1)
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
    }, 16, ["visible"])
  ]);
}
const Wt = /* @__PURE__ */ I(ge, [["render", be], ["__scopeId", "data-v-98209af0"]]);
let At = (t) => t == null || t == null, we = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const ve = {
  name: "Flyweight",
  components: {
    Card: j
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
      return F(
        n,
        {
          "--width": v(this.realW),
          "--height": v(this.realH),
          "--flyweight-content": v(i)
        },
        e && {
          "--flyweight-h": v(e)
        },
        t && {
          "--flyweight-w": v(t)
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
      we(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: v,
    trigger(t, e) {
      at(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        P(t, (i, n) => {
          this.$emit(n[0], At(n[1]) ? !0 : n[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      $(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || P(
              this.flys,
              (n, r, s, o) => {
                if (r[s] == o)
                  return n;
              },
              e.picker,
              e.id
            );
            At(i) || this.setindex(i);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      $(
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
        $(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = $(this.direction, t.target), n = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      F(n, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", n]));
      let r = !1;
      this.end = !1, this.__index = n.index, P(
        this.flyweights,
        (s, o, l, d, T, h, g, c, u) => {
          if (l = s / T >> 0, c = l + d * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(l < h % d) + /* 计算轮数, row的倍数 */
          (h / d >> 0)), u = c * T + s % T, u >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          o.index = c, o.i = u, o.data = this.flys[u];
          let C = [
            /* top */
            c * this.expand + o.x,
            /* left */
            o.space
          ];
          g && C.reverse(), o.top = C[0], o.left = C[1];
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
      let i = this.scrollx, n = this.flyweight, r = k(n, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [o, l] = this.offset, d = r.width, T = r.height, h = (vt(this.width, d) || d) + o, g = vt(this.height, T) + l, c = [d / h >> 0 || 1, T / g >> 0 || 1];
        i && c.reverse();
        let [u, C] = c, E = this.padding, V, w = 0, y, z;
        i ? (y = h, h -= o, z = (A) => (
          /* 计算top偏移量 */
          A * (g - l) + (A + 1) * l
        )) : (s ? (h = (d - o * (u + 2 * E - 1)) / u, V = !E * o, w = E * o) : (V = 0, w = d < h ? 0 : (d % h + o * u) / (u + 1) >> 0, h -= o), z = (A) => A * (h + V) + (A + 1) * w, y = g), this.row = C + 2, this.column = u, this.realH = g - l, this.realW = h, this.expand = y, this.Size = Math.ceil(t / u) * y;
        let N = Math.min(t, u * this.row), L = N - 1, H;
        for (; N-- > 0; )
          H = L - N, this.$set(e, H, {
            x: o,
            y: l,
            width: h,
            height: g - l,
            space: z(H % u),
            data: {}
          });
        e.length = L + 1;
        let R = [];
        T / y > L / u && R.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), R.push([
          "update:space",
          {
            row: (L / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(R);
      });
    }
  }
}, $e = { class: "flyweight-all" };
function xe(t, e, i, n, r, s) {
  const o = B("Card");
  return _(), W("div", {
    ref: "flyweight",
    class: rt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: i.line && r.__top !== 0
    }]),
    style: J(s.style),
    onScroll: e[0] || (e[0] = (...l) => s.scroll && s.scroll(...l))
  }, [
    a(t.$slots, "title", U(nt(s.bridge)), void 0, !0),
    p("div", $e, [
      (_(!0), W(Bt, null, Et(r.flyweights, (l, d) => (_(), W("div", {
        key: d,
        style: J({
          top: l.top + "px",
          left: l.left + "px"
        })
      }, [
        a(t.$slots, "default", b({ ref_for: !0 }, l), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", U(nt(s.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", U(b({ key: 0 }, s.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        M(o, {
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
const It = /* @__PURE__ */ I(ve, [["render", xe], ["__scopeId", "data-v-1c021354"]]);
const Se = {
  inheritAttrs: !1,
  name: "Input",
  components: { Card: j },
  emits: ["update:modelValue", "update:value", "change", "focus"],
  data: function() {
    return {
      id: qt("input-{1000-9999}-{1000-9999}"),
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
    k(this.$attrs, "value|modelValue=>value", (t, e) => {
      this.trigger = t, this.__emit(e);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(t) {
        this.$nextTick(() => {
          this.$refs.input.value = t || "";
        });
      }
    }), this.attrs = k(
      this.$attrs,
      "slow,static,fast,hide-limit,maxlength,style,disabled,tips-hide,mix"
    ), this.inputAttrs = k(
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
}, ke = ["id"], Te = ["for"], Ce = {
  class: "placeholder",
  flex: ""
}, ze = {
  class: "s-wrap-tips",
  flex: ""
}, Ne = {
  key: 0,
  class: "s-wrap-limit"
};
function Ae(t, e, i, n, r, s) {
  const o = B("Card");
  return _(), G(o, b({
    class: "s-wrap",
    use: ""
  }, t.attrs, {
    class: t.$attrs.class
  }), {
    default: m(() => [
      p("input", b({
        ref: "input",
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        id: t.id
      }, t.inputAttrs, {
        onFocus: e[0] || (e[0] = (l) => t.$emit("focus", l)),
        onChange: e[1] || (e[1] = (...l) => s.__change && s.__change(...l)),
        onInput: e[2] || (e[2] = (...l) => s.__input && s.__input(...l))
      }), null, 16, ke),
      p("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          p("span", Ce, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              x(" " + S(i.placeholder), 1)
            ], !0)
          ]),
          p("span", ze, [
            a(t.$slots, "tips", { limit: s.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              x(" " + S(i.tips || i.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Te),
      M(o, {
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vcenter: ""
      }, {
        default: m(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: s.limit }, () => [
              t.$attrs.maxlength ? (_(), W("span", Ne, S(s.limit), 1)) : ht("", !0)
            ], !0),
            p("span", {
              class: "s-wrap-close",
              onClick: e[3] || (e[3] = (...l) => s.close && s.close(...l))
            }, "×")
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["class"]);
}
const jt = /* @__PURE__ */ I(Se, [["render", Ae], ["__scopeId", "data-v-ffaafb71"]]), Me = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return Mt(i) ? [] : at(i) ? i : [i];
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
    k(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, i, n) => {
        for (let r in e)
          /^\$/.test(r) && F(this.Ref, e[r]);
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
function Be(t, e, i, n, r, s) {
  return _(), G(Xt(i.type), b({ ref: "component" }, t.$attrs), {
    default: m(() => [
      (_(!0), W(Bt, null, Et(s.column, (o) => a(t.$slots, s.__trigger(o), b({
        key: o.type
      }, { ref_for: !0 }, o))), 128))
    ]),
    _: 3
  }, 16);
}
const Vt = /* @__PURE__ */ I(Me, [["render", Be]]), Ee = {}, Ft = [];
Ft.push(ut, j, Wt, It, jt, Vt, ft);
const Pe = { Boom: ut, Card: j, Confirm: Wt, Flyweight: It, Input: jt, Stream: Vt, Tips: ft };
Ee.install = function(t, e = {}) {
  Ft.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  ut as Boom,
  j as Card,
  Wt as Confirm,
  It as Flyweight,
  jt as Input,
  Vt as Stream,
  ft as Tips,
  Pe as components,
  Ee as default
};
