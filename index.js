import { runer as g, each as T, merge as U, picker as C, isEmpty as Ut, isSimplyType as Nt, isString as oe, format as gt, isArray as it, array2Json as ae } from "@soei/util";
import { openBlock as $, createElementBlock as P, normalizeClass as ft, normalizeStyle as et, renderSlot as h, createElementVNode as b, toDisplayString as L, normalizeProps as S, guardReactiveProps as B, resolveComponent as N, createBlock as j, mergeProps as y, withCtx as m, createTextVNode as R, createCommentVNode as yt, createSlots as rt, renderList as G, resolveDynamicComponent as he, Fragment as Gt, createVNode as k, withModifiers as zt } from "vue";
import { runer as f, each as pt, isArray as ue, isNil as st, isString as de, isFunction as ce } from "@soei/tools";
import fe from "@soei/picker";
let pe = /(\d+|[+\-\*/]|%)/g, At = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Bt = (t, e) => {
  let s;
  if (s = g("match", t, pe)) {
    let i = s.length, n, r = 0, l, o = [];
    for (; i--; )
      r = s.shift(), r in At ? (n && o.push(n), r === "%" && (o.length = 2), l = r) : +r && o.push(+r), o.length == 2 && (o.push(e), n = At[l].apply(null, o), o.length = 0);
    +n || (n = +o.pop()), t = n >> 0;
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
const W = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, n] of e)
    s[i] = n;
  return s;
};
let me = /^(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border)$/i;
function mt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let qt = {
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
      U(e, this.$data, this.$props, this.$attrs, "mix"), this._style = C(e, t, (s, i, n, r) => (this.$nextTick(() => {
        g("removeAttribute", this.$el, s.replace(/\..*/, ""));
      }), me.test(r) ? A(i) : i));
    },
    immediate: !0
  }
}, _e = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Xt = {};
T(
  _e,
  (t, e, s) => {
    t = mt(e), Xt["--" + mt(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  qt
);
const ge = {
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
      return g("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: qt,
  methods: {
    exec: A,
    isEmpty: Ut,
    picker: C,
    runer: g,
    isSimplyType: Nt,
    tr() {
      let t = {};
      return this.margin(this.offset), this.css(Xt, t), U(t, this._style, this.$attrs.style, !0, "mix"), t;
    },
    tolower: mt,
    css(t, e) {
      T(t, (s, i) => {
        let n = i in this ? this[i] : this.default[i];
        !n || this.default[i] == n || (e[s] = A(n));
      });
    },
    change(t) {
      Nt(t) || (this.closecss = C(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,bg=>--s-card-close-background-color,:bg=>--s-card-close-hover-background-color,:color=>--s-card-close-hover-color,shadow=>--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      C(
        oe(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (e, s, i, n) => {
          let r = A(s);
          !r || this.default[n] == r || (this[n] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ye = {
  class: "card-title",
  space: ""
}, be = {
  class: "card-ico-items",
  vcenter: ""
}, $e = ["title"], we = { class: "card-content" };
function ve(t, e, s, i, n, r) {
  return $(), P("div", {
    class: ft({
      card: t.$attrs.use === void 0
    }),
    key: n.trigger,
    style: et(r.tr())
  }, [
    h(t.$slots, "default", {}, () => [
      h(t.$slots, "title", {}, () => [
        b("div", ye, [
          h(t.$slots, "subtitle", {}, () => [
            b("span", null, L(r.sub), 1)
          ], !0),
          h(t.$slots, "icons", {}, () => [
            b("div", be, [
              h(t.$slots, "icon", S(B({ el: t.$el, picker: r.picker, runer: r.runer })), void 0, !0),
              b("div", {
                class: ft(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
                style: et(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: r.tips
              }, null, 14, $e)
            ])
          ], !0)
        ])
      ], !0),
      h(t.$slots, "content", {}, () => [
        b("div", we, [
          h(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const H = /* @__PURE__ */ W(ge, [["render", ve], ["__scopeId", "data-v-f2fc47c3"]]);
const xe = {
  name: "Boom",
  emits: ["click"],
  components: { Card: H },
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
      T("disabled visible tips".split(/\s+/g), (t, e) => {
        g("removeAttribute", this.$el, e);
      });
    }
  }
}, ke = ["disabled"];
function Se(t, e, s, i, n, r) {
  const l = N("tips"), o = N("Card");
  return $(), j(o, y({
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
      b("button", {
        disabled: t.$attrs.disabled,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (a) => t.$emit("click", a))
      }, [
        h(t.$slots, "inner", {}, () => [
          b("span", null, [
            h(t.$slots, "default", {}, () => [
              e[1] || (e[1] = R("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, ke),
      h(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? ($(), j(l, S(y({ key: 0 }, t.$attrs.tips)), null, 16)) : yt("", !0)
      ], !0)
    ]),
    _: 3
  }, 16, ["mix"]);
}
const bt = /* @__PURE__ */ W(xe, [["render", Se], ["__scopeId", "data-v-984a282f"]]), Et = /(?:\,|\|{2})/, _t = "px", Lt = "";
let Z = document.documentElement, Rt, Wt = ["s-left", "s-top", "s-right", "s-bottom"], Te = { left: 0, top: 1, right: 2, bottom: 3 };
const Y = [];
var Ce = fe(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let $t = {}, Yt = null;
Ce($t, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Yt = Ne(() => {
      f(Y);
    }, t), this._delay = t;
  }
});
$t.delay = 60;
function Ne(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, f(t, this, arguments));
  };
}
const tt = () => {
  Yt();
};
function ze(t) {
  Jt(t), Y.push(t);
}
function Jt(t) {
  let e = pt(Y, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || Y.splice(e, 1);
}
const q = new ResizeObserver(tt);
q.observe(Z);
function Ht(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const dt = [], X = (t) => {
  if (ue(t))
    dt.push(t);
  else
    return +t < 0 ? f(t, dt) : dt.pop();
}, Mt = {};
var Ot = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, n) {
    n = this.aWH[i], t[this.aLT[i]] = (e[n] - s[n]) / 2 + _t;
  },
  trigger: function(t, e, s, i) {
    var n = this.CENTER;
    t || (t = n), s || (s = {}), i || (i = {});
    for (var r, l, o = this.rWidth, a, u = t.match(this.rPosition), d = 0, _ = u.length; d < _; d++)
      a = u[d], a != n ? i[a] = 0 : (l = u[(d + 1) % _], r = +!o.test(l), this.css(i, s, e, r), l == a && this.css(i, s, e, +!r));
    return i;
  }
};
function Kt(t) {
  t.onresize || (Y.push([Kt, null, t]), t.onresize = !0);
  var e = Z, s = e.clientHeight, i = e.clientWidth, n = t.target, r = t.room, l = t.index, o = t.position, a = t.edge || 7, u = t.arrow || 0, d = t.css, _ = t.space || (t.space = []), p = n.getBoundingClientRect(), c = r.offsetHeight, v = r.offsetWidth, w = st(t.offset) ? 7 : t.offset;
  if (/\s+|center/.test(o)) {
    Ot.trigger(o, r, Z, d);
    return;
  }
  var O = "3,0,2,1".split(Et), F, x = p.left, E = p.top, I = Math.max(E, a), z = (p.height == Rt ? p.bottom - E : p.height) >> 0, V = (p.width == Rt ? p.right - x : p.width) >> 0, D = i - v - w, M = s - c - w, xt = x < 0 || x + V / 2 > i, kt = E < 0 || E + z > s, nt = [
    /* left: 0 */
    kt ? -1 : x - v,
    /* top: 1 */
    xt ? -1 : I - c,
    /* right: 2 */
    kt ? -1 : D - p.right,
    /* bottom: 3 */
    xt ? -1 : M - p.bottom
  ];
  o && (pt(
    o.split(Et),
    function(ne, J, ut, le) {
      le.push(ut[J]);
    },
    Te,
    F = []
  ), O.unshift.apply(O, F)), l = pt(
    O,
    function(ne, J, ut) {
      if (ut[J] - a > 0)
        return J;
    },
    nt
  );
  var lt = 0, ot = 0, St = 0, Tt = 0;
  if (l == null)
    Ot.trigger("center", r, Z, d);
  else {
    var at = l == 0 || l == 2;
    lt = Ht(
      at ? l == 2 ? p.right + w : nt[0] - w : (
        /* 目标对象的 left */
        x - u
      ),
      a,
      D
    ), ot = Ht(
      at ? (
        /* 左右 */
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          I - (c - z) / 2,
          w
        )
      ) : l == 3 ? E + z + u + w : nt[1] - w,
      a,
      M
    ), at ? Tt = Math.max(
      I - ot + (z - u) / 2 - u,
      u
    ) : St = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - lt + (V - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    ), d.left = lt + _t, d.top = ot + _t, d["--tips-arrow-top"] = (z > c ? 0 : Tt) || Lt, d["--tips-arrow-left"] = St || Lt;
  }
  let Ct = r.classList, re = Wt[l], ht = _[0];
  (st(ht) || ht != l) && f([
    [
      /* 移除旧值 */
      ["remove", Ct, Wt[ht]],
      /* 添加新值 */
      ["add", Ct, re]
    ],
    () => {
      _.shift(), _.push(l), t.index = l;
    }
  ]);
}
const K = document.documentElement, Q = (t) => (f("stopPropagation", t), t), It = (t) => {
  let e = X(t);
  return {
    task: e,
    host: f(1, e || ""),
    mark: f(3, e || "")
  };
}, ct = "data-tips-scroll", Pt = -1e4, jt = 3, Ft = {
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
        gt(
          "0.?.$el|0.$el|0=>el",
          C(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      e && (this._event_mark = !1, this._target__ = e, this.__trigger(this.visible));
    }
  }
}, Ae = {
  name: "Tips",
  components: {
    Card: H
  },
  emit: ["update:visible"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Pt
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
      default: jt
    }
  },
  watch: Ft,
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
      _mark: gt("s-tips-{100-999}-{100-999}-{100-999}")
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
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), f(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return f(
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
      U(e, this.__css(), !0), Kt({
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
        offset: st(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this._arrow__,
        edge: this.edge
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (t.nodeName == "#comment" || this.static || this.isSimply)
        return;
      let s = this.before;
      f([
        [
          e ? "removeChild" : s ? "insertBefore" : "appendChild",
          K,
          t,
          s ? document.body : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? f(t.addEventListener, t, "scroll", tt) : (f(q.observe, q, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, ct), s || (f(t.addEventListener, t, "scroll", tt), this.__attr(t, ct, "true"))));
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
      st(this.static) || (this.init(), $t.delay = +this.delay, ze(this.__2listener), this.__2listener(), this.__toggle_append(this.$el));
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(t, this, arguments);
        },
        this.delay === jt ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        Q(t), this.$emit("toggle", this.proxy = !0);
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
      Q(t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    __close(t) {
      this.__click(({ task: e, host: s, mark: i }) => {
        if (e === void 0)
          return t;
        if (!s.proxy) {
          X();
          let n = It(-1);
          e = n.task, s = n.host, i = n.mark;
        }
        return (
          /* 判断上次的是不是模式窗口 */
          s && s.$attrs.modal !== void 0 || /* 判断是不是自己 */
          this.$el === t.currentTarget && i == this._mark || (f([e || []]), X()), !0
        );
      }, t);
    },
    __click(t, e) {
      let s = It(-1);
      if (f(t, null, s) != t)
        return Q(e || {});
      let { task: i, mark: n, host: r } = s;
      i && r.$attrs.modal !== void 0 && (i = null);
      let l = n == this._mark;
      this.$attrs.clear === void 0 || (i && f([i]), X()), l || X(["__hide", this, t, this._mark]), Q(t), this.__toggle(t);
    },
    /* 触发事件 */
    __trigger(t) {
      if (de(t)) {
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
            ["click", this.__close, K, !0]
          ],
          enter: [
            ["mouseenter", this.__click],
            ["click", this.__close, K]
          ]
        }[t], this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      it(s) || (s = [s]);
      let i = [];
      T(s, (n, r) => {
        let l = 0;
        r[2] === K && ++l && Mt.__tipsmark_ || (l && (Mt.__tipsmark_ = !0), i.push([
          t,
          r[2] || e,
          r[0],
          r[1] || this.__toggle
          // true
        ]));
      }), f(i);
    }
  },
  mounted() {
    Ft.target.handler.call(this, this.target), (Pt === this.target || this.isSimply) && (this._target__ = f("parentNode", this.$el));
  },
  unmounted() {
    this._try("removeEventListener"), this.__toggle_append(this.$el, !0), Jt(this.__2listener), this.__parent(function(t, e) {
      f(t.removeEventListener, t, "scroll", tt), f(t.removeAttribute, t, ct, void 0), e || f(q.unobserve, q, t);
    });
  }
};
function Be(t, e, s, i, n, r) {
  const l = N("Card");
  return n.proxy ? ($(), j(l, y({ key: 0 }, t.$attrs, {
    class: ["tips", {
      "tips-fly": s.before
    }],
    [n._mark || ""]: "",
    style: s.static ? null : n.css,
    static: s.static ? "" : null,
    onClick: r.__close,
    mix: "c|color=>--tips-color,bg|background=>--tips-background-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>min-width,minh|min.1=>min-height,maxw|max.0=>max-width,maxh|max.1=>max-height"
  }), rt({ _: 2 }, [
    G(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, S(B(u)), void 0, !0)
      ])
    }))
  ]), 1040, ["class", "style", "static", "onClick"])) : yt("", !0);
}
const wt = /* @__PURE__ */ W(Ae, [["render", Be], ["__scopeId", "data-v-992bce20"]]), Ee = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return Ut(s) ? [] : it(s) ? s : [s];
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
        if (g("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let n in e)
            /^\$/.test(n) && U(this.Ref, e[n]);
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
function Le(t, e, s, i, n, r) {
  return $(), j(he(r.tag), y({ ref: "component" }, t.$attrs), {
    default: m(() => [
      ($(!0), P(Gt, null, G(r.column, (l) => h(t.$slots, r.__trigger(l), y({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const vt = /* @__PURE__ */ W(Ee, [["render", Le]]);
const Re = {
  name: "Confirm",
  components: {
    Card: H,
    Tips: wt,
    Boom: bt
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
    },
    type: {
      type: String,
      default: ""
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
      this.proxy = this.visible, this.mark = 1;
    },
    emitcancel(t) {
      this.close(), this.$emit("cancel-click", t);
    },
    close() {
      this.proxy = ++this.mark;
    },
    emitsubmit(t) {
      this.$emit("submit-click", this.close);
    }
  }
}, We = { class: "s-confirm-warp" }, He = { flex: "" };
function Me(t, e, s, i, n, r) {
  const l = N("Card"), o = N("Boom"), a = N("Stream");
  return $(), P("span", We, [
    h(t.$slots, "default", {}, () => [
      h(t.$slots, "ref", {}, void 0, !0),
      h(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    k(a, y({
      is: "Tips",
      columns: { type: s.type },
      visible: t.proxy,
      min: ["auto"],
      class: "s-confirm",
      height: "auto"
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: m(() => [
        h(t.$slots, "el", {}, () => [
          k(l, null, {
            title: m(() => [
              k(l, { class: "s-confirm-title" }, {
                default: m(() => [
                  h(t.$slots, "title", {}, () => [
                    R(L(s.title), 1)
                  ], !0)
                ]),
                _: 3
              })
            ]),
            content: m(() => [
              h(t.$slots, "content", {}, () => [
                R(L(s.content), 1)
              ], !0),
              h(t.$slots, "bottom", {}, () => [
                k(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: ""
                }, {
                  default: m(() => [
                    e[1] || (e[1] = b("span", null, null, -1)),
                    b("span", He, [
                      h(t.$slots, "boom", S(B({
                        close: r.close,
                        submit: s.submit
                      })), () => [
                        h(t.$slots, "cancel", S(B({ click: r.emitcancel, text: s.cancel })), () => [
                          k(o, y({ cancel: "" }, s.cancelAttrs, {
                            onClick: zt(r.emitcancel, ["stop"])
                          }), {
                            default: m(() => [
                              R(L(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 1
                          }, 16, ["onClick"])
                        ], !0),
                        h(t.$slots, "submit", S(B({
                          click: r.close,
                          text: s.submit
                        })), () => [
                          k(o, y({
                            class: "simply",
                            onClick: zt(r.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: m(() => [
                              R(L(s.submitAttrs.text || s.submit), 1)
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
      card: m(() => [
        k(l, y(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? r.close(u) : "")
        }), rt({ _: 2 }, [
          G(t.$slots, (u, d) => ({
            name: d,
            fn: m((_) => [
              h(t.$slots, d, S(B(_)), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const Qt = /* @__PURE__ */ W(Re, [["render", Me], ["__scopeId", "data-v-2dc5d067"]]);
const Oe = {
  name: "Div",
  components: {
    Card: H
  }
};
function Ie(t, e, s, i, n, r) {
  const l = N("Card");
  return $(), j(l, y({ class: "s-div" }, t.$attrs, { height: "auto" }), rt({ _: 2 }, [
    G(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, S(B(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const Zt = /* @__PURE__ */ W(Oe, [["render", Ie], ["__scopeId", "data-v-5a663869"]]);
const Pe = {
  name: "Flex",
  components: {
    Card: H
  }
};
function je(t, e, s, i, n, r) {
  const l = N("Card");
  return $(), j(l, y({
    class: "s-flex",
    flex: ""
  }, t.$attrs, { height: "auto" }), rt({ _: 2 }, [
    G(t.$slots, (o, a) => ({
      name: a,
      fn: m((u) => [
        h(t.$slots, a, S(B(u)), void 0, !0)
      ])
    }))
  ]), 1040);
}
const te = /* @__PURE__ */ W(Pe, [["render", je], ["__scopeId", "data-v-80afacb2"]]);
let Vt = (t) => t == null || t == null, Fe = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ve = {
  name: "Flyweight",
  components: {
    Card: H
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
      return U(
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
      Fe(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: A,
    trigger(t, e) {
      it(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        T(t, (s, i) => {
          this.$emit(i[0], Vt(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      g(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let s = e.index || T(
              this.flys,
              (i, n, r, l) => {
                if (n[r] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            Vt(s) || this.setindex(s);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      g(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let s = e / this.column >> 0, i = this.expand, n = this.flyweight[this.direction] / i >> 0;
              s > n && s < n + this.row - 2 || (this.flyweight[this.direction] = s * i - i / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = g(this.direction, t.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      U(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let n = !1;
      this.end = !1, this.__index = i.index, T(
        this.flyweights,
        (r, l, o, a, u, d, _, p, c) => {
          if (o = r / u >> 0, p = o + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % a) + /* 计算轮数, row的倍数 */
          (d / a >> 0)), c = p * u + r % u, c >= this.count) {
            n || (this.end = !0, e.push(["onend"]), n = !0);
            return;
          }
          l.index = p, l.i = c, l.data = this.flys[c];
          let v = [
            /* top */
            p * this.expand + l.x,
            /* left */
            l.space
          ];
          _ && v.reverse(), l.top = v[0], l.left = v[1];
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
      let s = this.scrollx, i = this.flyweight, n = C(i, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [l, o] = this.offset, a = n.width, u = n.height, d = (Bt(this.width, a) || a) + l, _ = Bt(this.height, u) + o, p = [a / d >> 0 || 1, u / _ >> 0 || 1];
        s && p.reverse();
        let [c, v] = p, w = this.padding, O, F = 0, x, E;
        s ? (x = d, d -= l, E = (M) => (
          /* 计算top偏移量 */
          M * (_ - o) + (M + 1) * o
        )) : (r ? (d = (a - l * (c + 2 * w - 1)) / c, O = !w * l, F = w * l) : (O = 0, F = a < d ? 0 : (a % d + l * c) / (c + 1) >> 0, d -= l), E = (M) => M * (d + O) + (M + 1) * F, x = _), this.row = v + 2, this.column = c, this.realH = _ - o, this.realW = d, this.expand = x, this.Size = Math.ceil(t / c) * x;
        let I = Math.min(t, c * this.row), z = I - 1, V;
        for (; I-- > 0; )
          V = z - I, this.$set(e, V, {
            x: l,
            y: o,
            width: d,
            height: _ - o,
            space: E(V % c),
            data: {}
          });
        e.length = z + 1;
        let D = [];
        u / x > z / c && D.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), D.push([
          "update:space",
          {
            row: (z / c >> 0) + 1,
            column: c,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(D);
      });
    }
  }
}, De = { class: "flyweight-all" };
function Ue(t, e, s, i, n, r) {
  const l = N("Card");
  return $(), P("div", {
    ref: "flyweight",
    class: ft(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: s.line && n.__top !== 0
    }]),
    style: et(r.style),
    onScroll: e[0] || (e[0] = (...o) => r.scroll && r.scroll(...o))
  }, [
    h(t.$slots, "title", S(B(r.bridge)), void 0, !0),
    b("div", De, [
      ($(!0), P(Gt, null, G(n.flyweights, (o, a) => ($(), P("div", {
        key: a,
        style: et({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        h(t.$slots, "default", y({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    h(t.$slots, "mix", S(B(r.bridge)), () => [
      n.flyweights.length ? h(t.$slots, "end", S(y({ key: 0 }, r.bridge)), void 0, !0) : h(t.$slots, "empty", { key: 1 }, () => [
        k(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: m(() => [...e[1] || (e[1] = [
            R(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const ee = /* @__PURE__ */ W(Ve, [["render", Ue], ["__scopeId", "data-v-1c021354"]]);
let Ge;
const Dt = {
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  required: (t, e) => !e
};
let qe = "slow,static,fast,hide-limit|limit-hide=>hide-limit,maxlength,style,disabled,tips-hide|hide-tips=>tips-hide,transparent,br,radius,half,auto,";
const Xe = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: H, Stream: vt },
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
      id: gt("input-{1000-9999}-{1000-9999}"),
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
          g([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: t }]]
          ]).value = t || "";
        });
      }
    }), T(["left", "right", "rm"], (t, e, s) => {
      s = g([
        ["$el", this.$refs[e] || ""],
        [e, this.$refs]
      ]), this[e] = g("offsetWidth", s || "") || null;
    }), this.attrs = C(this.$attrs, qe + this.mix), T(
      this.$attrs,
      (t, e, s) => {
        ce(e) && (this.inputAttrs[t] = e), t in s && this.$watch(
          "$attrs." + t,
          (i) => {
            this.inputAttrs[t] = i;
          },
          { immediate: !0 }
        );
      },
      ae("maxlength,type,disabled,readonly")
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
      T(it(t) ? t : [t], (s, i, n) => {
        T(Dt, (r, l) => {
          r in i && (n = [
            function(o, a, u, d, _, p, c) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let w = a(u, c, p);
              return _.error = w ? d : Ge;
            },
            this,
            i,
            Dt[r],
            i[r],
            i.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(n);
      }), this.RULE.push(e);
    },
    __runer(t, e) {
      g([this.RULE], null, t, e);
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
}, Ye = ["for"], Je = {
  class: "placeholder",
  flex: ""
}, Ke = {
  class: "s-wrap-tips",
  flex: ""
}, Qe = {
  key: 0,
  class: "s-wrap-limit"
};
function Ze(t, e, s, i, n, r) {
  const l = N("Stream"), o = N("Card");
  return $(), j(o, y({
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
      k(l, y({
        ref: "input",
        id: t.id
      }, t.inputAttrs, {
        class: "s-wrap-input",
        placeholder: "",
        autocomplete: "off",
        onFocus: e[0] || (e[0] = (a) => t.$emit("focus", a)),
        onChange: r.__change,
        onInput: r.__input,
        onBlur: r.__blur,
        type: t.$attrs.type,
        is: t.$attrs.type === "textarea" ? "textarea" : "input"
      }), null, 16, ["id", "onChange", "onInput", "onBlur", "type", "is"]),
      b("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        h(t.$slots, "default", {}, () => [
          b("span", Je, [
            h(t.$slots, "placeholder", {}, () => [
              h(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              R(" " + L(s.placeholder), 1)
            ], !0)
          ]),
          b("span", Ke, [
            h(t.$slots, "tips", { limit: r.limit }, () => [
              h(t.$slots, "icon", { type: "tips" }, void 0, !0),
              R(" " + L(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, Ye),
      k(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: m(() => [
          h(t.$slots, "right", {}, () => [
            h(t.$slots, "limit", { limit: r.limit }, () => [
              t.$attrs.maxlength ? ($(), P("span", Qe, L(r.limit), 1)) : yt("", !0)
            ], !0),
            b("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...a) => r.close && r.close(...a))
            }, "×", 512)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
        ref: "left",
        class: "s-wrap-left",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: m(() => [
          h(t.$slots, "left", {}, () => [
            h(t.$slots, "icon", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: m(() => [
          h(t.$slots, "error", {}, () => [
            R(L(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const se = /* @__PURE__ */ W(Xe, [["render", Ze], ["__scopeId", "data-v-acf70ba2"]]), ts = {}, ie = [];
ie.push(bt, H, Qt, Zt, te, ee, se, vt, wt);
const ns = { Boom: bt, Card: H, Confirm: Qt, Div: Zt, Flex: te, Flyweight: ee, Input: se, Stream: vt, Tips: wt };
ts.install = function(t, e = {}) {
  ie.forEach((s) => {
    let { global: i, name: n } = s;
    i === !1 || t.component(n, s), t.component("S" + n, s);
  });
};
export {
  bt as Boom,
  H as Card,
  Qt as Confirm,
  Zt as Div,
  te as Flex,
  ee as Flyweight,
  se as Input,
  vt as Stream,
  wt as Tips,
  ns as components,
  ts as default
};
