import { runer as m, each as x, isEmpty as tt, take as Q, merge as K, picker as j, isSimplyType as Bt, isString as ue, format as wt, isArray as ot, array2Json as de } from "@soei/util";
import { openBlock as y, createElementBlock as V, normalizeClass as nt, normalizeStyle as J, renderSlot as a, createElementVNode as $, toDisplayString as E, normalizeProps as C, guardReactiveProps as R, withModifiers as yt, resolveComponent as k, createBlock as H, createSlots as at, renderList as X, withCtx as _, mergeProps as b, createCommentVNode as vt, createTextVNode as M, KeepAlive as ce, resolveDynamicComponent as fe, Fragment as Yt, createVNode as v } from "vue";
import { runer as u, isArray as pe, each as bt, isNil as lt, take as _e, isString as me, Event as ge, isFunction as ye } from "@soei/tools";
import be from "@soei/picker";
let $e = /(\d+|[+\-\*/]|%)/g, Lt = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Et = (t, e) => {
  let s;
  if (s = m("match", t, $e)) {
    let i = s.length, r, n = 0, l, o = [];
    for (; i--; )
      n = s.shift(), n in Lt ? (r && o.push(r), n === "%" && (o.length = 2), l = n) : +n && o.push(+n), o.length == 2 && (o.push(e), r = Lt[l].apply(null, o), o.length = 0);
    +r || (r = +o.pop()), t = r >> 0;
  }
  return t;
}, T = (t, e) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(
  /((?:[\s]+|^)\d+(?:\.\d{1,})?(?!(?:\.)*\d|%|\w))/g,
  // decimalMap[decimal] || (decimalMap[decimal] = new RegExp('(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)', 'g')),
  "$1px"
);
const z = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, r] of e)
    s[i] = r;
  return s;
};
let Jt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function we(t, e, s) {
  return this.$nextTick(() => {
    this.rm(t.replace(/\..*/, ""));
  }), Jt.test(s) ? T(e) : e;
}
function $t(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
function ve(t) {
  m("removeAttribute", this.$el, t);
}
let Kt = {
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
        ]), Jt.test(n) ? T(r) : r),
        this.tcss
      ), this.$nextTick(() => {
        m(e);
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
}, xe = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Xt = {};
x(
  xe,
  (t, e, s) => {
    t = $t(e), Xt["--" + $t(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Kt
);
const ke = {
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
      return m("tips", this.close || {}) || "关闭" + (this.sub ? "[" + this.sub + "]" : "");
    }
  },
  watch: Kt,
  methods: {
    rm: ve,
    set: we,
    exec: T,
    isEmpty: tt,
    picker: j,
    runer: m,
    isSimplyType: Bt,
    tr() {
      let t = {}, e = this.offset, s = this.$attrs;
      return this.margin(e), this.css(Xt, t), K(t, this._style, s.style, !0, "mix"), t;
    },
    tolower: $t,
    css(t, e) {
      x(t, (s, i) => {
        let r = i in this ? this[i] : this.default[i];
        !r || this.default[i] == r || (e[s] = T(r));
      });
    },
    change(t) {
      Bt(t) || (this.closecss = Q(
        t,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      t = ue(t) ? t.split(/\s*(?:,|\s+)\s*/) : t, Q(this.$attrs, "l:3,t:0,r:1,b:2", t, (e) => this.rm(e)), !tt(t) && Q(
        t,
        "0:top,1|0:right,2|0:bottom,3|1|0:left",
        // true,
        (e, s, i) => {
          if (s == 0)
            return;
          let r = T(s);
          !r || this.default[i] == r || (this[i] = r);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, Se = {
  class: "card-title",
  space: "",
  vc: ""
}, Te = {
  class: "card-ico-items",
  vcenter: ""
}, Ce = { class: "card-content" };
function Ne(t, e, s, i, r, n) {
  return y(), V("div", {
    class: nt({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: J(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        $("div", Se, [
          a(t.$slots, "subtitle", {}, () => [
            $("span", {
              style: J(r.tcss)
            }, E(n.sub), 5)
          ], !0),
          a(t.$slots, "icons", C(R({ el: t.$el, picker: n.picker, runer: n.runer })), () => [
            $("div", Te, [
              a(t.$slots, "icon", C(R({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              $("div", {
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
        $("div", Ce, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ z(ke, [["render", Ne], ["__scopeId", "data-v-6bdae450"]]), Mt = /(?:\,|\|{2})/, Rt = "";
let U = document.documentElement, Ht, Wt = ["s-left", "s-top", "s-right", "s-bottom"], Ae = { left: 0, top: 1, right: 2, bottom: 3 };
const et = [];
var ze = be(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let xt = {}, Qt = null;
ze(xt, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Qt = Be(() => {
      u(et);
    }, t), this._delay = t;
  }
});
xt.delay = 60;
function Be(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, u(t, this, arguments));
  };
}
U.clientHeight, U.clientWidth;
const Z = () => {
  U.clientHeight, U.clientWidth, Qt();
};
function Ot(t) {
  Zt(t), et.push(t);
}
function Le(t, e) {
  if (!u(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), i = e.x, r = e.y;
  return i > s.left && i < s.left + s.width && r > s.top && r < s.top + s.height;
}
function Zt(t) {
  let e = bt(et, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || et.splice(e, 1);
}
const G = new ResizeObserver(Z);
G.observe(U);
function It(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const mt = [], D = (t) => {
  if (pe(t))
    mt.push(t);
  else
    return +t < 0 ? u(t, mt) : mt.pop();
};
u([
  [
    "addEventListener",
    window,
    "keydown",
    function(t) {
      if (t.keyCode === 27) {
        u(["stopPropagation", "preventDefault"], t);
        let e = D(-1);
        e && u([[e[4]]]) === void 0 && u([D()]);
      }
    },
    !0
  ]
]);
const Pt = {};
var jt = {
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
    for (var n, l, o = this.rWidth, h, d = t.match(this.rPosition), c = 0, g = d.length; c < g; c++)
      h = d[c], h != r ? i[h] = 0 : (l = d[(c + 1) % g], n = +!o.test(l), this.css(i, s, e, n), l == h && this.css(i, s, e, +!n));
    return i;
  }
};
function te(t) {
  t.onresize || (et.push([te, null, t]), t.onresize = !0);
  var e = U, s = e.clientHeight, i = e.clientWidth, r = t.target, n = t.room, l = t.index, o = t.position, h = t.edge || 7, d = t.arrow || 0, c = t.css, g = t.space || (t.space = []);
  c["--tips-h--"] = s;
  var f = r.getBoundingClientRect(), p = f.width && f.height;
  if (c.display = p ? "" : "none", !p)
    return;
  var w = n.offsetHeight, N = n.offsetWidth, S = lt(t.offset) ? 7 : t.offset, F = "3,0,2,1".split(Mt), O, A = f.left, B = f.top, I = Math.max(B, h), L = (f.height == Ht ? f.bottom - B : f.height) >> 0, q = (f.width == Ht ? f.right - A : f.width) >> 0, P = i - N - S, Tt = s - w - S, Ct = A < 0 || A + q / 2 > i, Nt = B < 0 || B + L > s, ht = [
    /* left: 0 */
    Nt ? -1 : A - N,
    /* top: 1 */
    Ct ? -1 : I - w,
    /* right: 2 */
    Nt ? -1 : P - f.right,
    /* bottom: 3 */
    Ct ? -1 : Tt - f.bottom
  ];
  o && (bt(
    o.split(Mt),
    function(it, rt, _t, he) {
      he.push(_t[rt]);
    },
    Ae,
    O = []
  ), F.unshift.apply(F, O)), l = bt(
    F,
    function(it, rt, _t) {
      if (_t[rt] - h > 0)
        return rt;
    },
    ht
  ), /\s+|center/.test(o) && (l = void 0);
  var ut = 0, dt = 0, At = 0, ct = 0;
  if (l == null)
    jt.trigger("center", n, U, c);
  else {
    var ft = l == 0 || l == 2;
    ut = It(
      ft ? l == 2 ? f.right + S : ht[0] - S : (
        /* 目标对象的 left */
        A - d
      ),
      h,
      P
    ), dt = It(
      ft ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          I - (w - L) / 2,
          S
        )
      ) : (
        // )
        l == 3 ? B + L + d + S : ht[1] - S
      ),
      h,
      Tt
    ), ft ? ct = Math.max(
      I - dt + (L - d) / 2 - d,
      d
    ) : At = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        A - ut + (q - d) / 2 - d,
        /* 目标宽 - 两倍的箭头 */
        N - 4 * d
      ),
      d
    );
    let it = jt.aLTM;
    c[it[0]] = ut, c[it[1]] = dt, c["--tips-arrow-top"] = (L > w, ct || Rt), c["--tips-arrow-left"] = At || Rt;
  }
  let zt = n.classList, ae = Wt[l], pt = g[0];
  (lt(pt) || pt != l) && u([
    [
      /* 移除旧值 */
      ["remove", zt, Wt[pt]],
      /* 添加新值 */
      ["add", zt, ae]
    ],
    () => {
      g.shift(), g.push(l), t.index = l;
    }
  ]);
}
const Ft = document.documentElement, Y = (t) => (u(["stopPropagation", "preventDefault"], t), t), Dt = (t) => {
  let e = D(t), s = j(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, gt = "data-tips-scroll", Ee = -1e4, Vt = 3, Ut = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let e = 1e3, s = 0, i = +this.timer;
    t === !0 && i && (this.t = i / e, this._timer__ = setInterval(() => {
      this.t = Math.max(i - ++s * e, 0) / e, s * e >= i && (this.proxy = !1, clearInterval(this._timer__));
    }, e)), this.$emit("update:visible", t), u([["visible", this.on, t]]);
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
      let e = j(
        [t],
        wt(
          "0.?.$el|0.$el|0=>el",
          j(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (u(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof ge && (s = e.currentTarget, Y(e)), this._event_mark = !1, this._target__ = s, s.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), s.mark = !0;
        });
      }
    }
  },
  position(t) {
    Z();
  }
}, Me = {
  name: "Tips",
  components: {
    Card: W
  },
  emit: ["update:visible", "update:before"],
  props: {
    /* 目标对象 */
    target: {
      type: [String, HTMLElement, Object, Number],
      default: Ee
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
      default: Vt
    },
    timer: {
      type: [String, Number]
    },
    on: {
      type: [Object]
    }
  },
  watch: Ut,
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
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, s = !0), u(t, null, e, s), !s); )
        ;
    },
    __attr(t, e, s) {
      return u(
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
      K(e, this.__css(), !0), u([["before", this.on, e]]), te({
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
      }), u([["after", this.on, e]]), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (this.static || this.isSimply || t.nodeName == "#comment")
        return;
      let s = this.isModal, i = _e(this.$attrs, "append-to-*|append-to=>*", (l) => {
        u("removeAttribute", t, l);
      }), r;
      for (let l in i) {
        r = (i[l] || l).replace(/_/, ".");
        break;
      }
      if (e)
        return u([["removeChild", t.parentNode, t]]);
      let n = document;
      r = r && n.querySelector(r + " :nth-child(1)") || n.body, u([
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
        e ? u(t.addEventListener, t, "scroll", Z) : (u(G.observe, G, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, gt), s || (u(t.addEventListener, t, "scroll", Z), this.__attr(t, gt, "true"))));
      });
    },
    __css() {
      let t = {};
      return this.arrow = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, j(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      if (lt(this.static))
        return;
      this.init(), Ot(this.init), xt.delay = +this.delay, Ot(this.__2listener), this.__toggle_append(this.$el);
      let t = this._rank__ = [[["observe", G]], null, this.$el];
      u.apply(null, t), t[0][0][0] = "unobserve";
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          u(t, this, arguments);
        },
        this.delay === Vt ? 100 : this.delay
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
      let { task: e, host: s, sign: i, modal: r } = Dt(-1);
      if (e !== void 0) {
        if (Le(s.$el, t))
          return Y(t);
        if (!s.proxy)
          return D(), s._task__ = !1, i === this.sign ? void 0 : this.__close(t);
        if (u(r) !== void 0)
          return Y(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && i == this.sign || (u([e || []]), D(), s._task__ = !1);
      }
    },
    __click(t) {
      Y(t);
      let e = tt(t), { task: s, sign: i, host: r, modal: n } = Dt(-1);
      u(n) !== void 0 && (s = null);
      let l = i == this.sign;
      this.$attrs.clear === void 0 || (s && u([s]), D()), l || this.__Task(
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
      if (me(t)) {
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
        }[t]).push(["click", this.__close, Ft, !0]), this._try("addEventListener");
      } else
        /^\d+$/.test(t) ? this.__toggle({}) : this.proxy = t;
    },
    _try(t) {
      let e = this._target__, s = this._event__;
      if (!s)
        return;
      ot(s) || (s = [s]);
      let i = [];
      x(s, (r, n) => {
        let l = 0;
        n[2] === Ft && ++l && Pt.__tipsmark_ || (l && (Pt.__tipsmark_ = !0), i.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
          // true
        ]));
      }), u(i);
    }
  },
  mounted() {
    Ut.target.handler.call(this, this.target), this._target__ = this._target__ || u("parentNode", this.$el);
  },
  beforeUnmount() {
    u.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), Zt(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      u(t.removeEventListener, t, "scroll", Z), u(t.removeAttribute, t, gt, void 0), e || u(G.unobserve, G, t);
    });
  }
};
function Re(t, e, s, i, r, n) {
  const l = k("Card");
  return r.proxy ? (y(), H(l, {
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
      fn: _((d) => [
        a(t.$slots, h, b(d, { t: r.t }), void 0, !0)
      ])
    }))
  ]), 1032, ["class", "s-tips-completed", "style", "static", "onClick"])) : vt("", !0);
}
const st = /* @__PURE__ */ z(Me, [["render", Re], ["__scopeId", "data-v-4ed56d6f"]]);
const He = {
  name: "Boom",
  emits: ["click"],
  components: { Card: W, Tips: st },
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
      x("disabled visible tips".split(/\s+/g), (t, e) => {
        m("removeAttribute", this.$el, e);
      });
    }
  }
}, We = ["disabled"];
function Oe(t, e, s, i, r, n) {
  const l = k("Tips"), o = k("Card");
  return y(), H(o, {
    class: "s-button",
    use: "",
    mix: t.mix,
    loading: s.loading ? "" : void 0,
    center: "",
    space: "",
    vc: ""
  }, {
    default: _(() => [
      $("button", {
        disabled: t.$attrs.disabled || s.loading,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          $("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = M("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, We),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (y(), H(l, C(b({ key: 0 }, t.$attrs.tips)), null, 16)) : vt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix", "loading"]);
}
const kt = /* @__PURE__ */ z(He, [["render", Oe], ["__scopeId", "data-v-24023677"]]), Ie = {
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
    j(
      this.$refs,
      "component._.provides|component=>component",
      (t, e, s, i) => {
        if (m("nodeType", e) === 1)
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
function Pe(t, e, s, i, r, n) {
  return y(), H(ce, null, [
    (y(), H(fe(n.tag), b({ ref: "component" }, t.$attrs), {
      default: _(() => [
        (y(!0), V(Yt, null, X(n.column, (l) => a(t.$slots, n.__trigger(l), b({ ref_for: !0 }, l, { _: t.$attrs }))), 256))
      ]),
      _: 3
    }, 16))
  ], 1024);
}
const St = /* @__PURE__ */ z(Ie, [["render", Pe]]);
const je = {
  name: "Confirm",
  components: {
    Card: W,
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
}, Fe = { class: "s-confirm-warp" }, De = { flex: "" };
function Ve(t, e, s, i, r, n) {
  const l = k("Card"), o = k("Boom"), h = k("Stream");
  return y(), V("span", Fe, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "ref", {}, void 0, !0),
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    v(h, b({
      is: "Tips",
      columns: { type: s.type },
      visible: t.proxy,
      min: ["auto"],
      class: "s-confirm",
      height: "auto"
    }, t.$attrs, {
      arrow: /^(false|null)$/.test(t.$attrs.arrow) ? void 0 : ""
    }), {
      default: _(() => [
        a(t.$slots, "el", {}, () => [
          v(l, {
            flex: "",
            column: "",
            inherit: ""
          }, {
            title: _(() => [
              v(l, b({
                class: "s-confirm-title",
                height: "auto"
              }, s.titleAttrs), {
                default: _(() => [
                  a(t.$slots, "title", {}, () => [
                    M(E(s.title), 1)
                  ], !0)
                ]),
                _: 3
              }, 16)
            ]),
            content: _(() => [
              a(t.$slots, "content", {}, () => [
                M(E(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                v(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: "",
                  height: "auto"
                }, {
                  default: _(() => [
                    e[1] || (e[1] = $("span", null, null, -1)),
                    $("span", De, [
                      a(t.$slots, "boom", C(R({
                        close: n.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", C(R({ click: n.emitcancel, text: s.cancel })), () => [
                          v(o, b({ cancel: "" }, s.cancelAttrs, {
                            onClick: yt(n.emitcancel, ["stop"])
                          }), {
                            default: _(() => [
                              a(t.$slots, "can", { text: s.cancel }, void 0, !0),
                              M(" " + E(s.cancelAttrs.txt || s.cancel), 1)
                            ]),
                            _: 3
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", C(R({
                          click: n.close,
                          text: s.submit
                        })), () => [
                          v(o, b({
                            class: "simply",
                            onClick: yt(n.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: _(() => [
                              a(t.$slots, "sub", { text: s.submit }, void 0, !0),
                              M(" " + E(s.submitAttrs.txt || s.submit), 1)
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
      card: _(() => [
        v(l, b(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (d) => t.$attrs.close ? n.close(d) : "")
        }), at({ _: 2 }, [
          X(t.$slots, (d, c) => ({
            name: c,
            fn: _((g) => [
              a(t.$slots, c, b(g, { close: n.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const ee = /* @__PURE__ */ z(je, [["render", Ve], ["__scopeId", "data-v-7cbba803"]]);
const Ue = {
  name: "Div",
  components: {
    Card: W
  }
};
function qe(t, e, s, i, r, n) {
  const l = k("Card");
  return y(), H(l, {
    class: "s-div",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: _((d) => [
        a(t.$slots, h, C(R(d)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const se = /* @__PURE__ */ z(Ue, [["render", qe], ["__scopeId", "data-v-90c20b5d"]]);
const Ge = {
  name: "Flex",
  components: {
    Card: W
  }
};
function Ye(t, e, s, i, r, n) {
  const l = k("Card");
  return y(), H(l, {
    class: "s-flex",
    flex: "",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: _((d) => [
        a(t.$slots, h, C(R(d)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const ie = /* @__PURE__ */ z(Ge, [["render", Ye], ["__scopeId", "data-v-13b2463f"]]);
let qt = (t) => t == null || t == null, Je = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Ke = {
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
      return K(
        i,
        {
          "--width": T(this.realW),
          "--height": T(this.realH),
          "--flyweight-content": T(s)
        },
        e && {
          "--flyweight-h": T(e)
        },
        t && {
          "--flyweight-w": T(t)
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
      Je(t);
    }
    this.scrollx = m("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: T,
    trigger(t, e) {
      ot(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        x(t, (s, i) => {
          this.$emit(i[0], qt(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      m(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let s = e.index || x(
              this.flys,
              (i, r, n, l) => {
                if (r[n] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            qt(s) || this.setindex(s);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      m(
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
        m(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = m(this.direction, t.target), i = {
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
      this.end = !1, this.__index = i.index, x(
        this.flyweights,
        (n, l, o, h, d, c, g, f, p) => {
          if (o = n / d >> 0, f = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < c % h) + /* 计算轮数, row的倍数 */
          (c / h >> 0)), p = f * d + n % d, p >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = f, l.i = p, l.data = this.flys[p];
          let w = [
            /* top */
            f * this.expand + l.x,
            /* left */
            l.space
          ];
          g && w.reverse(), l.top = w[0], l.left = w[1];
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
      let s = this.scrollx, i = this.flyweight, r = j(i, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, d = r.height, c = (Et(this.width, h) || h) + l, g = Et(this.height, d) + o, f = [h / c >> 0 || 1, d / g >> 0 || 1];
        s && f.reverse();
        let [p, w] = f, N = this.padding, S, F = 0, O, A;
        s ? (O = c, c -= l, A = (P) => (
          /* 计算top偏移量 */
          P * (g - o) + (P + 1) * o
        )) : (n ? (c = (h - l * (p + 2 * N - 1)) / p, S = !N * l, F = N * l) : (S = 0, F = h < c ? 0 : (h % c + l * p) / (p + 1) >> 0, c -= l), A = (P) => P * (c + S) + (P + 1) * F, O = g), this.row = w + 2, this.column = p, this.realH = g - o, this.realW = c, this.expand = O, this.Size = Math.ceil(t / p) * O;
        let B = Math.min(t, p * this.row), I = B - 1, L;
        for (; B-- > 0; )
          L = I - B, this.$set(e, L, {
            x: l,
            y: o,
            width: c,
            height: g - o,
            space: A(L % p),
            data: {}
          });
        e.length = I + 1;
        let q = [];
        d / O > I / p && q.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), q.push([
          "update:space",
          {
            row: (I / p >> 0) + 1,
            column: p,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(q);
      });
    }
  }
}, Xe = { class: "flyweight-all" };
function Qe(t, e, s, i, r, n) {
  const l = k("Card");
  return y(), V("div", {
    ref: "flyweight",
    class: nt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: s.line && r.__top !== 0
    }]),
    style: J(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", C(R(n.bridge)), void 0, !0),
    $("div", Xe, [
      (y(!0), V(Yt, null, X(r.flyweights, (o, h) => (y(), V("div", {
        key: h,
        style: J({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", b({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", C(R(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", C(b({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        v(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: _(() => [...e[1] || (e[1] = [
            M(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const re = /* @__PURE__ */ z(Ke, [["render", Qe], ["__scopeId", "data-v-1c021354"]]);
let Ze;
const Gt = {
  /* 自己动手 */
  diy: !1,
  min: (t, e, s) => s ? t > e : e.length < t,
  max: (t, e, s) => s ? t < e : e.length > t,
  pattern: (t, e) => !t.test(e),
  is: (t, e) => t.test(e),
  required: (t, e) => !e
}, ts = {
  inheritAttrs: !1,
  name: "Input",
  global: !1,
  components: { Card: W, Stream: St },
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
    j(this.$attrs, "value|modelValue=>value", (e, s) => {
      this.trigger = e, this.__emit(s);
    }), this.$watch("$attrs." + this.trigger, {
      immediate: !0,
      handler(e) {
        this.$nextTick(() => {
          m([
            ["Ref", this.$refs.input],
            ["input", this.$refs],
            [0, [{ value: e }]]
          ]).value = e || "";
        });
      }
    }), x(["left", "right", "rm"], (e, s, i) => {
      i = m([
        ["$el", this.$refs[s] || ""],
        [s, this.$refs]
      ]), this[s] = m("offsetWidth", i || "") || null;
    });
    let t = m([
      ["assign", Object, {}, this.$attrs],
      [
        function() {
          let e = {};
          return x(this.$attrs, (s, i) => {
            e[s] = this.$attrs[s];
          }), e;
        },
        this
      ]
    ]);
    t[this.trigger] = void 0, this.attrs = t, x(
      this.$attrs,
      (e, s, i) => {
        ye(s) && (this.inputAttrs[e] = s), e in i && (m("removeAttribute", this.$el, e), this.$watch(
          "$attrs." + e,
          (r) => {
            this.inputAttrs[e] = r;
          },
          { immediate: !0 }
        ));
      },
      de("maxlength,type,disabled,readonly")
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
      x(ot(t) ? t : [t], (s, i, r) => {
        x(Gt, (n, l) => {
          n in i && (r = [
            function(o, h, d, c, g, f, p) {
              let w = o.trigger;
              if (!o.required && w && this !== w)
                return;
              let N = m([h, d], o, d, p, f);
              return g.error = N ? c || N : Ze;
            },
            this,
            i,
            Gt[n],
            i[n],
            i.message,
            this,
            /number/.test(this.type)
          ]);
        }), e.push(r);
      }), this.RULE.push(e);
    },
    __runer(t, e) {
      m([this.RULE], null, t, e);
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
}, es = ["for"], ss = {
  class: "placeholder",
  flex: ""
}, is = {
  class: "s-wrap-tips",
  flex: ""
}, rs = {
  key: 0,
  class: "s-wrap-limit"
};
function ns(t, e, s, i, r, n) {
  const l = k("Stream"), o = k("Card");
  return y(), H(o, b({
    class: ["s-wrap", {
      [t.$attrs.class || ""]: !0,
      error: t.error
    }],
    "s-completed": t.completed
  }, t.attrs, {
    use: "",
    style: { "--text-left": t.left, "--text-right": t.right, "--text-close": t.rm }
  }), {
    default: _(() => [
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
      $("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          $("span", ss, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              M(" " + E(s.placeholder), 1)
            ], !0)
          ]),
          $("span", is, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              M(" " + E(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, es),
      v(o, {
        ref: "right",
        class: "s-wrap-right",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: ""
      }, {
        default: _(() => [
          a(t.$slots, "right", {}, () => [
            a(t.$slots, "limit", { limit: n.limit }, () => [
              t.$attrs.maxlength ? (y(), V("span", rs, E(n.limit), 1)) : vt("", !0)
            ], !0),
            $("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512),
            a(t.$slots, "r", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      v(o, {
        ref: "left",
        class: "s-wrap-left",
        height: "100%",
        nothing: "",
        width: "auto",
        bg: "transparent",
        vc: "",
        center: ""
      }, {
        default: _(() => [
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
        default: _(() => [
          a(t.$slots, "error", { error: t.error }, () => [
            M(E(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const ne = /* @__PURE__ */ z(ts, [["render", ns], ["__scopeId", "data-v-bf0c8b26"]]), ls = {
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
function os(t, e, s, i, r, n) {
  const l = k("Tips");
  return y(), H(l, {
    loading: "",
    visible: s.visible,
    position: "right top"
  }, {
    default: _(() => [
      a(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["visible"]);
}
const le = /* @__PURE__ */ z(ls, [["render", os]]), as = {}, oe = [];
oe.push(kt, W, ee, se, ie, re, ne, le, St, st);
const fs = { Boom: kt, Card: W, Confirm: ee, Div: se, Flex: ie, Flyweight: re, Input: ne, Loading: le, Stream: St, Tips: st };
as.install = function(t, e = {}) {
  oe.forEach((s) => {
    let { global: i, name: r } = s;
    i === !1 || t.component(r, s), t.component("S" + r, s);
  });
};
export {
  kt as Boom,
  W as Card,
  ee as Confirm,
  se as Div,
  ie as Flex,
  re as Flyweight,
  ne as Input,
  le as Loading,
  St as Stream,
  st as Tips,
  fs as components,
  as as default
};
