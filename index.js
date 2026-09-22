import { runer as _, each as v, isEmpty as tt, take as Q, merge as K, picker as P, isSimplyType as Lt, isString as de, format as wt, isArray as ot, array2Json as ce } from "@soei/util";
import { openBlock as g, createElementBlock as V, normalizeClass as nt, normalizeStyle as J, renderSlot as a, createElementVNode as b, toDisplayString as M, normalizeProps as N, guardReactiveProps as H, withModifiers as yt, resolveComponent as x, createBlock as W, createSlots as at, renderList as X, withCtx as p, mergeProps as y, createCommentVNode as vt, createTextVNode as R, KeepAlive as fe, resolveDynamicComponent as pe, Fragment as Jt, createVNode as w } from "vue";
import { runer as d, isArray as _e, each as bt, isNil as lt, take as me, isString as ge, Event as ye, isFunction as be } from "@soei/tools";
import $e from "@soei/picker";
let we = /(\d+|[+\-\*/]|%)/g, Et = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Mt = (t, e) => {
  let s;
  if (s = _("match", t, we)) {
    let i = s.length, r, n = 0, l, o = [];
    for (; i--; )
      n = s.shift(), n in Et ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(e), r = Et[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), t = r >> 0;
  }
  return t;
}, C = (t, e) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
const B = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, r] of e)
    s[i] = r;
  return s;
};
let Kt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function ve(t, e, s) {
  return this.$nextTick(() => {
    this.rm(t.replace(/\..*/, ""));
  }), Kt.test(s) ? C(e) : e;
}
function $t(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
function xe(t) {
  _("removeAttribute", this.$el, t);
}
let Xt = {
  close: {
    handler(t) {
      this.change(t);
    },
    deep: !0
  },
  title: {
    deep: !0,
    immediate: !0,
    handler(t) {
      if (tt(t))
        return;
      let e = [], s = this.$attrs;
      Q(
        [t, s],
        "0.text|0.txt|0.label:label,0.css|1.title-*:tcss.*,1.title-font.*:tcss.font-*",
        this,
        (i, r, n) => (e.push([
          (l, o) => {
            this.rm(o);
          },
          null,
          this,
          i
        ]), Kt.test(n) ? C(r) : r),
        this.tcss
      ), this.$nextTick(() => {
        _(e);
      });
    }
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
      K(e, this.$data, this.$props, this.$attrs, "mix"), this._style = Q(e, t, (s, i, r) => (this.$watch("$attrs." + s, (n) => {
        this._style[r] = this.set(s, n, r);
      }), this.set(s, i, r)));
    },
    immediate: !0
  }
}, ke = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Qt = {};
v(
  ke,
  (t, e, s) => {
    t = $t(e), Qt["--" + $t(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Xt
);
const Se = {
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
      type: [String, Object],
      default: ""
    },
    mix: {
      type: String,
      default: "m=>offset,p|padding=>padding,bg|bgc=>background,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>border-radius,overflow"
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
      },
      tcss: {},
      label: ""
    };
  },
  computed: {
    // style() {
    //   return this.tr();
    // },
    sub() {
      return this.label || this.show || this.title;
    },
    tips() {
      return _("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Xt,
  methods: {
    rm: xe,
    set: ve,
    exec: C,
    isEmpty: tt,
    picker: P,
    runer: _,
    isSimplyType: Lt,
    tr() {
      let t = {}, e = this.offset, s = this.$attrs;
      return this.margin(e), this.css(Qt, t), K(t, this._style, s.style, !0, "mix"), t;
    },
    tolower: $t,
    css(t, e) {
      v(t, (s, i) => {
        let r = i in this ? this[i] : this.default[i];
        !r || this.default[i] == r || (e[s] = C(r));
      });
    },
    change(t) {
      Lt(t) || (this.closecss = Q(
        t,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      t = de(t) ? t.split(/\s*(?:,|\s+)\s*/) : t, Q(this.$attrs, "l:3,t:0,r:1,b:2", t, (e) => this.rm(e)), !tt(t) && Q(
        t,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (e, s, i) => {
          if (s == 0)
            return;
          let r = C(s);
          !r || this.default[i] == r || (this[i] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, Te = {
  class: "card-title",
  space: "",
  vc: ""
}, Ce = {
  class: "card-ico-items",
  vcenter: ""
}, Ne = { class: "card-content" };
function Ae(t, e, s, i, r, n) {
  return g(), V("div", {
    class: nt({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: J(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        b("div", Te, [
          a(t.$slots, "subtitle", {}, () => [
            b("span", {
              style: J(r.tcss)
            }, M(n.sub), 5)
          ], !0),
          a(t.$slots, "icons", N(H({ el: t.$el, picker: n.picker, runer: n.runer })), () => [
            b("div", Ce, [
              a(t.$slots, "icon", N(H({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              b("div", {
                class: nt(["card-close", { hide: n.isSimplyType(s.close) ? !s.close : !1 }]),
                style: J(r.closecss),
                onClick: e[0] || (e[0] = yt((l) => t.$emit("close"), ["stop", "prevent"]))
              }, [
                a(t.$slots, "close", {}, void 0, !0)
              ], 6)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        b("div", Ne, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const O = /* @__PURE__ */ B(Se, [["render", Ae], ["__scopeId", "data-v-6bdae450"]]), Rt = /(?:\,|\|{2})/, Ht = "";
let U = document.documentElement, Wt, Ot = ["s-left", "s-top", "s-right", "s-bottom"], ze = { left: 0, top: 1, right: 2, bottom: 3 };
const et = [];
var Be = $e(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let xt = {}, Zt = null;
Be(xt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Zt = Le(() => {
      d(et);
    }, t), this._delay = t;
  }
});
xt.delay = 60;
function Le(t, e) {
  let s = 0, i = null;
  return function() {
    let r = Array.apply(null, arguments);
    const n = Date.now(), l = this;
    n - s >= e ? (i && (clearTimeout(i), i = null), s = n, t.apply(l, r)) : i || (i = setTimeout(() => {
      s = Date.now(), i = null, t.apply(l, r);
    }, e - (n - s)));
  };
}
U.clientHeight, U.clientWidth;
const Z = () => {
  U.clientHeight, U.clientWidth, Zt();
};
function It(t) {
  te(t), et.push(t);
}
function Ee(t, e) {
  if (!d(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), i = e.x, r = e.y;
  return i > s.left && i < s.left + s.width && r > s.top && r < s.top + s.height;
}
function te(t) {
  let e = bt(et, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || et.splice(e, 1);
}
const G = new ResizeObserver(Z);
G.observe(U);
function Pt(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const mt = [], D = (t) => {
  if (_e(t))
    mt.push(t);
  else
    return +t < 0 ? d(t, mt) : mt.pop();
};
d([
  [
    "addEventListener",
    window,
    "keydown",
    function(t) {
      if (t.keyCode === 27) {
        d(["stopPropagation", "preventDefault"], t);
        let e = D(-1);
        e && d([[e[4]]]) === void 0 && d([D()]);
      }
    },
    !0
  ]
]);
const jt = {};
var Ft = {
  CENTER: "center",
  rWidth: /top|bottom/,
  // 计算方向
  aLT: ["left", "top"],
  aLTM: ["--l", "--t"],
  // 获取计算属性
  aWH: ["offsetWidth", "offsetHeight"],
  // 获取配置方向所需
  rPosition: /(?:(center)|(left|top|right|bottom))/g,
  css: function(t, e, s, i, r) {
    r = this.aWH[i], t[this.aLTM[i]] = (e[r] - s[r]) / 2;
  },
  trigger: function(t, e, s, i) {
    var r = this.CENTER;
    t || (t = r), s || (s = {}), i || (i = {});
    for (var n, l, o = this.rWidth, h, u = t.match(this.rPosition), f = 0, m = u.length; f < m; f++)
      h = u[f], h != r ? i[h] = 0 : (l = u[(f + 1) % m], n = +!o.test(l), this.css(i, s, e, n), l == h && this.css(i, s, e, +!n));
    return i;
  }
};
function ee(t) {
  t.onresize || (et.push([ee, null, t]), t.onresize = !0);
  var e = U, s = e.clientHeight, i = e.clientWidth, r = t.target, n = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, f = t.css, m = t.space || (t.space = []), $ = /\s+|center/.test(o);
  f["--tips-h--"] = s;
  var c = r.getBoundingClientRect(), k = c.width && c.height || $;
  if (f.display = k ? "" : "none", !k)
    return;
  var S = n.offsetHeight, j = n.offsetWidth, T = lt(t.offset) ? 7 : t.offset, L = "3,0,2,1".split(Rt), q, A = c.left, z = c.top, F = Math.max(z, h), E = (c.height == Wt ? c.bottom - z : c.height) >> 0, I = (c.width == Wt ? c.right - A : c.width) >> 0, Tt = i - j - T, Ct = s - S - T, Nt = A < 0 || A + I / 2 > i, At = z < 0 || z + E > s, ht = [
    /* left: 0 */
    At ? -1 : A - j,
    /* top: 1 */
    Nt ? -1 : F - S,
    /* right: 2 */
    At ? -1 : Tt - c.right,
    /* bottom: 3 */
    Nt ? -1 : Ct - c.bottom
  ];
  o && (bt(
    o.split(Rt),
    function(it, rt, _t, ue) {
      ue.push(_t[rt]);
    },
    ze,
    q = []
  ), L.unshift.apply(L, q)), l = bt(
    L,
    function(it, rt, _t) {
      if (_t[rt] - h > 0)
        return rt;
    },
    ht
  ), $ && (l = void 0);
  var ut = 0, dt = 0, zt = 0, ct = 0;
  if (l == null)
    Ft.trigger("center", n, U, f);
  else {
    var ft = l == 0 || l == 2;
    ut = Pt(
      ft ? l == 2 ? c.right + T : ht[0] - T : (
        /* 目标对象的 left */
        A - u
      ),
      h,
      Tt
    ), dt = Pt(
      ft ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          F - (S - E) / 2,
          T
        )
      ) : (
        // )
        l == 3 ? z + E + u + T : ht[1] - T
      ),
      h,
      Ct
    ), ft ? ct = Math.max(
      F - dt + (E - u) / 2 - u,
      u
    ) : zt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        A - ut + (I - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        j - 4 * u
      ),
      u
    );
    let it = Ft.aLTM;
    f[it[0]] = ut, f[it[1]] = dt, f["--tips-arrow-top"] = (E > S, ct || Ht), f["--tips-arrow-left"] = zt || Ht;
  }
  let Bt = n.classList, he = Ot[l], pt = m[0];
  (lt(pt) || pt != l) && d([
    [
      /* 移除旧值 */
      ["remove", Bt, Ot[pt]],
      /* 添加新值 */
      ["add", Bt, he]
    ],
    () => {
      m.shift(), m.push(l), t.index = l;
    }
  ]);
}
const Dt = document.documentElement, Y = (t) => (d(["stopPropagation", "preventDefault"], t), t), Vt = (t) => {
  let e = D(t), s = P(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, gt = "data-tips-scroll", Me = -1e4, Ut = 3, qt = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let e = 1e3, s = 0, i = +this.timer;
    t === !0 && i && (this.t = i / e, this._timer__ = setInterval(() => {
      this.t = Math.max(i - ++s * e, 0) / e, s * e >= i && (this.proxy = !1, clearInterval(this._timer__));
    }, e)), this.$emit("update:visible", t), d([["visible", this.on, t]]);
  },
  visible: {
    handler: function(t) {
      t === "modal" && (this.proxy_before = !0), this.$nextTick(() => {
        this.__trigger(t);
      });
    },
    immediate: !0
  },
  proxy_before: {
    handler(t) {
      this.$nextTick(() => {
        this.__toggle_append(this.$el);
      });
    },
    immediate: !0
  },
  target: {
    handler(t) {
      let e = P(
        [t],
        wt(
          "0.?.$el|0.$el|0=>el",
          P(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (d(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof ye && (s = e.currentTarget, Y(e)), this._event_mark = !1, this._target__ = s, s.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), s.mark = !0;
        });
      }
    }
  },
  position(t) {
    Z();
  }
}, Re = {
  name: "Tips",
  components: {
    Card: O
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Me
    },
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !1
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
      default: Ut
    },
    timer: {
      type: [String, Number]
    },
    on: {
      type: [Object]
    }
  },
  watch: qt,
  data() {
    return {
      css: {
        opacity: 0
      },
      _event_mark: !1,
      _event__: null,
      _timeout__: null,
      _target__: null,
      _timer__: null,
      _rank__: null,
      _t__: 0,
      _task__: !1,
      t: 0,
      proxy: !1,
      arrow: 0,
      proxy_before: !1,
      completed: void 0,
      sign: wt("s-tips-{1-9}-{10-99}-{1-9}")
    };
  },
  computed: {
    isSimply: function() {
      return this.target === "";
    },
    isModal() {
      return this.before || this.proxy_before;
    }
  },
  methods: {
    __parent(t) {
      let e = this._target__, s;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), d(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return d(
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
      K(e, this.__css(), !0), d([["before", this.on, e]]), ee({
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
        offset: lt(this.offset) ? void 0 : +this.offset >> 0,
        arrow: this.arrow,
        edge: this.edge
      }), d([["after", this.on, e]]), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (this.static || this.isSimply || t.nodeName == "#comment")
        return;
      let s = this.isModal, i = me(this.$attrs, "append-to-*|append-to=>*", (l) => {
        d("removeAttribute", t, l);
      }), r;
      for (let l in i) {
        r = (i[l] || l).replace(/_/, ".");
        break;
      }
      if (e)
        return d([["removeChild", t.parentNode, t]]);
      let n = document;
      r = r && n.querySelector(r + " :nth-child(1)") || n.body, d([
        [
          s ? "insertBefore" : "appendChild",
          r.parentNode,
          t,
          s ? r : void 0
        ]
      ]);
    },
    __2listener() {
      this.static || /* 监听滚动, 动态添加监测 */
      this.__parent((t, e, s) => {
        e ? d(t.addEventListener, t, "scroll", Z) : (d(G.observe, G, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, gt), s || (d(t.addEventListener, t, "scroll", Z), this.__attr(t, gt, "true"))));
      });
    },
    __css() {
      let t = {};
      return this.arrow = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, P(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      if (lt(this.static))
        return;
      this.init(), It(this.init), xt.delay = +this.delay, It(this.__2listener), this.__toggle_append(this.$el);
      let t = this._rank__ = [[["observe", G]], null, this.$el];
      d.apply(null, t), t[0][0][0] = "unobserve";
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(t, this, arguments);
        },
        this.delay === Ut ? 100 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        Y(t), this.__Task(t), this.$emit("toggle", this.proxy = !0);
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
      Y(t);
      let e;
      this.$emit("toggle", e = this.proxy = !this.proxy), e || this.__close(t);
    },
    __close(t) {
      let { task: e, host: s, sign: i, modal: r } = Vt(-1);
      if (e !== void 0) {
        if (Ee(s.$el, t))
          return Y(t);
        if (!s.proxy)
          return D(), s._task__ = !1, i === this.sign ? void 0 : this.__close(t);
        if (d(r) !== void 0)
          return Y(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && i == this.sign || (d([e || []]), D(), s._task__ = !1);
      }
    },
    __click(t) {
      Y(t);
      let e = tt(t), { task: s, sign: i, host: r, modal: n } = Vt(-1);
      d(n) !== void 0 && (s = null);
      let l = i == this.sign;
      this.$attrs.clear === void 0 || (s && d([s]), D()), l || this.__Task(
        t,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), e || this.__toggle(t);
    },
    __Task(t, e, s) {
      this._task__ || (this._task__ = !0, D(["__hide", this, t, this.sign, e, s]));
    },
    // __nextTick(back) {
    //   let re = () => {
    //     let el = this.$el;
    //     if (el.nodeType == 8) {
    //       return requestAnimationFrame(re);
    //     }
    //     /* 鼠标离开 */
    //     runer([
    //       [back],
    //       [
    //         "addEventListener",
    //         el,
    //         "mouseenter",
    //         () => {
    //           clearTimeout(this._t__);
    //         },
    //       ],
    //       ["addEventListener", el, "mouseleave", this.__hide],
    //     ]);
    //   };
    //   requestAnimationFrame(re);
    // },
    /* 触发事件 */
    __trigger(t) {
      if (ge(t)) {
        if (this._event_mark || !this._target__)
          return;
        this._event_mark = !0;
        let e = !1;
        (this._event__ = {
          over: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            ["mouseleave", this.__hide]
          ],
          hover: [
            /* 鼠标进入 */
            [
              "mouseenter",
              (i) => {
                e !== !0 && (e = !0, this.__visible(i));
              }
            ],
            [
              "mouseleave",
              (i) => {
                e = !1, this._t__ = setTimeout(() => {
                  this.__hide(i);
                }, 0.1 * 1e3);
              }
            ],
            [
              "mouseenter",
              () => {
                clearTimeout(this._t__);
              }
            ]
          ],
          click: [["click", this.__click]],
          modal: [
            [
              "click",
              (i) => {
                this.__close(i), this.__toggle(i), this.__Task(i, () => !0);
              }
            ]
          ],
          enter: [
            ["mouseenter", this.__visible]
            // ["click", this.__close, ROOM],
          ]
        }[t]).push(["click", this.__close, Dt, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      ot(s) || (s = [s]);
      let i = [];
      v(s, (r, n) => {
        let l = 0;
        n[2] === Dt && ++l && jt.__tipsmark_ || (l && (jt.__tipsmark_ = !0), i.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), d(i);
    }
  },
  mounted() {
    qt.target.handler.call(this, this.target), this._target__ = this._target__ || d("parentNode", this.$el);
  },
  beforeUnmount() {
    d.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), te(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      d(t.removeEventListener, t, "scroll", Z), d(t.removeAttribute, t, gt, void 0), e || d(G.unobserve, G, t);
    });
  }
};
function He(t, e, s, i, r, n) {
  const l = x("Card");
  return r.proxy ? (g(), W(l, {
    key: 0,
    class: nt(["tips", {
      "tips-fly": n.isModal
    }]),
    "s-tips-completed": r.completed,
    style: J(s.static ? null : r.css),
    static: s.static ? "" : null,
    onClick: n.__close,
    mix: "bg|c|color=>--tips-background-color,c|color=>--tips-color,cc=>--tips-text-color,b=>--tips-border-width,fs|fontSize=>--tips-font-size,br|borderRadius=>border-radius,z=>z-index,offset=>--tips-offset,minw|min.0=>--w-,minh|min.1=>--h-,maxw|max.0=>--w--,maxh|max.1=>--h--,m=>margin"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, y(u, { t: r.t }), void 0, !0)
      ])
    }))
  ]), 1032, ["class", "s-tips-completed", "style", "static", "onClick"])) : vt("", !0);
}
const st = /* @__PURE__ */ B(Re, [["render", He], ["__scopeId", "data-v-4ed56d6f"]]);
const We = {
  name: "Boom",
  emits: ["click"],
  components: { Card: O, Tips: st },
  props: {
    loading: {
      type: [Boolean, String]
    }
  },
  data: function() {
    return {
      mix: "p,h,w,c|color=>--s-button-text-color,fs=>font-size,lh=>line-height,miw|minw=>min-width,mih|minh=>min-height,mw|maxw=>max-width,mh|maxh=>max-height,br=>--s-button-border-radius,bg=>--s-button-color,bg=>--s-button-shadow-color,offset,m=>--2-m,padding:--d-padding"
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
      v("disabled visible tips".split(/\s+/g), (t, e) => {
        _("removeAttribute", this.$el, e);
      });
    }
  }
}, Oe = ["disabled"];
function Ie(t, e, s, i, r, n) {
  const l = x("Tips"), o = x("Card");
  return g(), W(o, {
    class: "s-button",
    use: "",
    mix: t.mix,
    loading: s.loading ? "" : void 0,
    center: "",
    space: "",
    vc: ""
  }, {
    default: p(() => [
      b("button", {
        disabled: t.$attrs.disabled || s.loading,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          b("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = R("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, Oe),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (g(), W(l, N(y({ key: 0 }, t.$attrs.tips)), null, 16)) : vt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix", "loading"]);
}
const kt = /* @__PURE__ */ B(We, [["render", Ie], ["__scopeId", "data-v-24023677"]]), Pe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return tt(s) ? [] : ot(s) ? s : [s];
    },
    tag() {
      return this.is || this.$attrs.type || "span";
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
    P(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, i) => {
        if (_("nodeType", e) === 1)
          this.Ref = e;
        else
          for (let r in e)
            /^\$/.test(r) && K(this.Ref, e[r]);
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
function je(t, e, s, i, r, n) {
  return g(), W(fe, null, [
    (g(), W(pe(n.tag), y({ ref: "component" }, t.$attrs), {
      default: p(() => [
        (g(!0), V(Jt, null, X(n.column, (l) => a(t.$slots, n.__trigger(l), y({ ref_for: !0 }, l, { _: t.$attrs }))), 256))
      ]),
      _: 3
    }, 16))
  ], 1024);
}
const St = /* @__PURE__ */ B(Pe, [["render", je]]);
const Fe = {
  name: "Confirm",
  components: {
    Card: O,
    Tips: st,
    Boom: kt
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
    titleAttrs: {
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
  watch: {
    visible: {
      handler(t) {
        this.proxy = t;
      }
      // immediate: true,
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
      this.mark = 1, this.proxy = this.visible;
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
}, De = { class: "s-confirm-warp" }, Ve = { flex: "" };
function Ue(t, e, s, i, r, n) {
  const l = x("Card"), o = x("Boom"), h = x("Stream");
  return g(), V("span", De, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "ref", {}, void 0, !0),
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    w(h, y({
      is: "Tips",
      columns: { type: s.type },
      visible: t.proxy,
      min: ["auto"],
      class: "s-confirm",
      height: "auto"
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: p(() => [
        a(t.$slots, "el", {}, () => [
          w(l, {
            flex: "",
            column: "",
            inherit: ""
          }, {
            title: p(() => [
              w(l, y({
                class: "s-confirm-title",
                height: "auto"
              }, s.titleAttrs), {
                default: p(() => [
                  a(t.$slots, "title", {}, () => [
                    R(M(s.title), 1)
                  ], !0)
                ]),
                _: 3
              }, 16)
            ]),
            content: p(() => [
              a(t.$slots, "content", {}, () => [
                R(M(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                w(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: "",
                  height: "auto"
                }, {
                  default: p(() => [
                    e[1] || (e[1] = b("span", null, null, -1)),
                    b("span", Ve, [
                      a(t.$slots, "boom", N(H({
                        close: n.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", N(H({ click: n.emitcancel, text: s.cancel })), () => [
                          w(o, y({ cancel: "" }, s.cancelAttrs, {
                            onClick: yt(n.emitcancel, ["stop"])
                          }), {
                            default: p(() => [
                              a(t.$slots, "can", { text: s.cancel }, void 0, !0),
                              R(" " + M(s.cancelAttrs.txt || s.cancel), 1)
                            ]),
                            _: 3
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", N(H({
                          click: n.close,
                          text: s.submit
                        })), () => [
                          w(o, y({
                            class: "simply",
                            onClick: yt(n.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: p(() => [
                              a(t.$slots, "sub", { text: s.submit }, void 0, !0),
                              R(" " + M(s.submitAttrs.txt || s.submit), 1)
                            ]),
                            _: 3
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
      card: p(() => [
        w(l, y(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? n.close(u) : "")
        }), at({ _: 2 }, [
          X(t.$slots, (u, f) => ({
            name: f,
            fn: p((m) => [
              a(t.$slots, f, y(m, { close: n.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const se = /* @__PURE__ */ B(Fe, [["render", Ue], ["__scopeId", "data-v-7cbba803"]]);
const qe = {
  name: "Div",
  components: {
    Card: O
  }
};
function Ge(t, e, s, i, r, n) {
  const l = x("Card");
  return g(), W(l, {
    class: "s-div",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, N(H(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const ie = /* @__PURE__ */ B(qe, [["render", Ge], ["__scopeId", "data-v-90c20b5d"]]);
const Ye = {
  name: "Flex",
  components: {
    Card: O
  }
};
function Je(t, e, s, i, r, n) {
  const l = x("Card");
  return g(), W(l, {
    class: "s-flex",
    flex: "",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, N(H(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const re = /* @__PURE__ */ B(Ye, [["render", Je], ["__scopeId", "data-v-13b2463f"]]);
let Gt = (t) => t == null || t == null, Ke = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Xe = {
  name: "Flyweight",
  components: {
    Card: O
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
      return K(
        i,
        {
          "--width": C(this.realW),
          "--height": C(this.realH),
          "--flyweight-content": C(s)
        },
        e && {
          "--flyweight-h": C(e)
        },
        t && {
          "--flyweight-w": C(t)
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
      Ke(t);
    }
    this.scrollx = _("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: C,
    trigger(t, e) {
      ot(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        v(t, (s, i) => {
          this.$emit(i[0], Gt(i[1]) ? !0 : i[1]);
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
            let s = e.index || v(
              this.flys,
              (i, r, n, l) => {
                if (r[n] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            Gt(s) || this.setindex(s);
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
      K(i, this.space), t.from || (!this.line || (this.__top = s), e.push(["onscroll", i]));
      let r = !1;
      this.end = !1, this.__index = i.index, v(
        this.flyweights,
        (n, l, o, h, u, f, m, $, c) => {
          if (o = n / u >> 0, $ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < f % h) + /* 计算轮数, row的倍数 */
          (f / h >> 0)), c = $ * u + n % u, c >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = $, l.i = c, l.data = this.flys[c];
          let k = [
            /* top */
            $ * this.expand + l.x,
            /* left */
            l.space
          ];
          m && k.reverse(), l.top = k[0], l.left = k[1];
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
      let s = this.scrollx, i = this.flyweight, r = P(i, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, u = r.height, f = (Mt(this.width, h) || h) + l, m = Mt(this.height, u) + o, $ = [h / f >> 0 || 1, u / m >> 0 || 1];
        s && $.reverse();
        let [c, k] = $, S = this.padding, j, T = 0, L, q;
        s ? (L = f, f -= l, q = (I) => (
          /* 计算top偏移量 */
          I * (m - o) + (I + 1) * o
        )) : (n ? (f = (h - l * (c + 2 * S - 1)) / c, j = !S * l, T = S * l) : (j = 0, T = h < f ? 0 : (h % f + l * c) / (c + 1) >> 0, f -= l), q = (I) => I * (f + j) + (I + 1) * T, L = m), this.row = k + 2, this.column = c, this.realH = m - o, this.realW = f, this.expand = L, this.Size = Math.ceil(t / c) * L;
        let A = Math.min(t, c * this.row), z = A - 1, F;
        for (; A-- > 0; )
          F = z - A, this.$set(e, F, {
            x: l,
            y: o,
            width: f,
            height: m - o,
            space: q(F % c),
            data: {}
          });
        e.length = z + 1;
        let E = [];
        u / L > z / c && E.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), E.push([
          "update:space",
          {
            row: (z / c >> 0) + 1,
            column: c,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(E);
      });
    }
  }
}, Qe = { class: "flyweight-all" };
function Ze(t, e, s, i, r, n) {
  const l = x("Card");
  return g(), V("div", {
    ref: "flyweight",
    class: nt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: s.line && r.__top !== 0
    }]),
    style: J(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", N(H(n.bridge)), void 0, !0),
    b("div", Qe, [
      (g(!0), V(Jt, null, X(r.flyweights, (o, h) => (g(), V("div", {
        key: h,
        style: J({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", y({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", N(H(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", N(y({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        w(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: p(() => [...e[1] || (e[1] = [
            R(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const ne = /* @__PURE__ */ B(Xe, [["render", Ze], ["__scopeId", "data-v-1c021354"]]);
let ts;
const Yt = {
  /* 自己动手 */
  diy: !1,
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  is: (t, e) => t.test(e),
  required: (t, e) => !e
}, es = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: O, Stream: St },
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
      id: wt("input-{1000-9999}-{1000-9999}"),
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
    P(this.$attrs, "value|modelValue=>value", (e, s) => {
      this.trigger = e, this.__emit(s);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          _([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: e }]]
          ]).value = e || "";
        });
      }
    }), v(["left", "right", "rm"], (e, s, i) => {
      i = _([
        ["$el", this.$refs[s] || ""],
        [s, this.$refs]
      ]), this[s] = _("offsetWidth", i || "") || null;
    });
    let t = _([
      ["assign", Object, {}, this.$attrs],
      [
        function() {
          let e = {};
          return v(this.$attrs, (s, i) => {
            e[s] = this.$attrs[s];
          }), e;
        },
        this
      ]
    ]);
    t[this.trigger] = void 0, this.attrs = t, v(
      this.$attrs,
      (e, s, i) => {
        be(s) && (this.inputAttrs[e] = s), e in i && (_("removeAttribute", this.$el, e), this.$watch(
          "$attrs." + e,
          (r) => {
            this.inputAttrs[e] = r;
          },
          { immediate: !0 }
        ));
      },
      ce("maxlength,type,disabled,readonly")
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
      v(ot(t) ? t : [t], (s, i, r) => {
        v(Yt, (n, l) => {
          n in i && (r = [
            function(o, h, u, f, m, $, c) {
              let k = o.trigger;
              if (!o.required && k && this !== k)
                return;
              let S = _([h, u], o, u, c, $);
              return m.error = S ? f || S : ts;
            },
            this,
            i,
            Yt[n],
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
}, ss = ["for"], is = {
  class: "placeholder",
  flex: ""
}, rs = {
  class: "s-wrap-tips",
  flex: ""
}, ns = {
  key: 0,
  class: "s-wrap-limit"
};
function ls(t, e, s, i, r, n) {
  const l = x("Stream"), o = x("Card");
  return g(), W(o, y({
    class: ["s-wrap", {
      [t.$attrs.class || ""]: !0,
      error: t.error
    }],
    "s-completed": t.completed
  }, t.attrs, {
    use: "",
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: p(() => [
      w(l, y({
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
      b("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          b("span", is, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              R(" " + M(s.placeholder), 1)
            ], !0)
          ]),
          b("span", rs, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              R(" " + M(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, ss),
      w(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: p(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: n.limit }, () => [
              t.$attrs.maxlength ? (g(), V("span", ns, M(n.limit), 1)) : vt("", !0)
            ], !0),
            b("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512),
            a(t.$slots, "r", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      w(o, {
        ref: "left",
        class: "s-wrap-left",
        height: "100%",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: p(() => [
          a(t.$slots, "left", {}, () => [
            a(t.$slots, "icon", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      w(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: p(() => [
          a(t.$slots, "error", { error: t.error }, () => [
            R(M(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const le = /* @__PURE__ */ B(es, [["render", ls], ["__scopeId", "data-v-bf0c8b26"]]), os = {
  name: "Loading",
  components: {
    Tips: st
  },
  props: {
    visible: {
      type: Boolean,
      default: !0
    }
  }
};
function as(t, e, s, i, r, n) {
  const l = x("Tips");
  return g(), W(l, {
    loading: "",
    visible: s.visible,
    position: "right top"
  }, {
    default: p(() => [
      a(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["visible"]);
}
const oe = /* @__PURE__ */ B(os, [["render", as]]), hs = {}, ae = [];
ae.push(kt, O, se, ie, re, ne, le, oe, St, st);
const ps = { Boom: kt, Card: O, Confirm: se, Div: ie, Flex: re, Flyweight: ne, Input: le, Loading: oe, Stream: St, Tips: st };
hs.install = function(t, e = {}) {
  ae.forEach((s) => {
    let { global: i, name: r } = s;
    i === !1 || t.component(r, s), t.component("S" + r, s);
  });
};
export {
  kt as Boom,
  O as Card,
  se as Confirm,
  ie as Div,
  re as Flex,
  ne as Flyweight,
  le as Input,
  oe as Loading,
  St as Stream,
  st as Tips,
  ps as components,
  hs as default
};
