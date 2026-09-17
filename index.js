import { runer as m, each as S, isEmpty as Z, take as Q, merge as K, picker as I, isSimplyType as Bt, isString as ce, format as xt, isArray as ot, array2Json as fe } from "@soei/util";
import { openBlock as y, createElementBlock as D, normalizeClass as nt, normalizeStyle as J, renderSlot as a, createElementVNode as w, toDisplayString as B, normalizeProps as N, guardReactiveProps as M, withModifiers as $t, resolveComponent as T, createBlock as R, createSlots as at, renderList as X, withCtx as p, mergeProps as $, createCommentVNode as kt, createTextVNode as E, KeepAlive as _e, resolveDynamicComponent as pe, Fragment as Yt, createVNode as k } from "vue";
import { runer as d, bus as me, isArray as ge, each as wt, isNil as lt, Event as Jt, take as ye, isString as be, isFunction as $e } from "@soei/tools";
import we from "@soei/picker";
let ve = /(\d+|[+\-\*/]|%)/g, Et = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, Mt = (t, e) => {
  let s;
  if (s = m("match", t, ve)) {
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
const z = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, r] of e)
    s[i] = r;
  return s;
};
let Kt = /^(?:--(\d-|d-).*|(?!--).*(height|width|top|left|bottom|right|size|radius|padding|margin|border))$/i;
function xe(t, e, s) {
  return this.$nextTick(() => {
    this.rm(t.replace(/\..*/, ""));
  }), Kt.test(s) ? C(e) : e;
}
function vt(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
function ke(t) {
  m("removeAttribute", this.$el, t);
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
      if (Z(t))
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
}, Se = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], Qt = {};
S(
  Se,
  (t, e, s) => {
    t = vt(e), Qt["--" + vt(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Xt
);
const Te = {
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
  watch: Xt,
  methods: {
    rm: ke,
    set: xe,
    exec: C,
    isEmpty: Z,
    picker: I,
    runer: m,
    isSimplyType: Bt,
    tr() {
      let t = {}, e = this.offset, s = this.$attrs;
      return this.margin(e), this.css(Qt, t), K(t, this._style, s.style, !0, "mix"), t;
    },
    tolower: vt,
    css(t, e) {
      S(t, (s, i) => {
        let r = i in this ? this[i] : this.default[i];
        !r || this.default[i] == r || (e[s] = C(r));
      });
    },
    change(t) {
      Bt(t) || (this.closecss = Q(
        t,
        "color:--s-card-close-color,size:--s-close-width,bold:--s-close-height,bg:--s-card-close-background-color,:bg:--s-card-close-hover-background-color,:color:--s-card-close-hover-color,shadow:--s-card-close-hover-box-shadow,*"
      ));
    },
    margin(t) {
      t = ce(t) ? t.split(/\s*(?:,|\s+)\s*/) : t, Q(this.$attrs, "l:3,t:0,r:1,b:2", t, (e) => this.rm(e)), !Z(t) && Q(
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
}, Ce = {
  class: "card-title",
  space: "",
  vc: ""
}, Ne = {
  class: "card-ico-items",
  vcenter: ""
}, Ae = { class: "card-content" };
function ze(t, e, s, i, r, n) {
  return y(), D("div", {
    class: nt({
      card: t.$attrs.use === void 0
    }),
    key: r.trigger,
    style: J(n.tr())
  }, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "title", {}, () => [
        w("div", Ce, [
          a(t.$slots, "subtitle", {}, () => [
            w("span", {
              style: J(r.tcss)
            }, B(n.sub), 5)
          ], !0),
          a(t.$slots, "icons", N(M({ el: t.$el, picker: n.picker, runer: n.runer })), () => [
            w("div", Ne, [
              a(t.$slots, "icon", N(M({ el: t.$el, picker: n.picker, runer: n.runer })), void 0, !0),
              w("div", {
                class: nt(["card-close", { hide: n.isSimplyType(s.close) ? !s.close : !1 }]),
                style: J(r.closecss),
                onClick: e[0] || (e[0] = $t((l) => t.$emit("close"), ["stop", "prevent"]))
              }, [
                a(t.$slots, "close", {}, void 0, !0)
              ], 6)
            ])
          ], !0)
        ])
      ], !0),
      a(t.$slots, "content", {}, () => [
        w("div", Ae, [
          a(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 6);
}
const W = /* @__PURE__ */ z(Te, [["render", ze], ["__scopeId", "data-v-6bdae450"]]), Rt = /(?:\,|\|{2})/, Wt = "";
let O = document.documentElement, Ht, Ot = ["s-left", "s-top", "s-right", "s-bottom"], Le = { left: 0, top: 1, right: 2, bottom: 3 };
const tt = [];
var Be = we(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let St = {}, Zt = null;
Be(St, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    Zt = Ee(() => {
      d(tt);
    }, t), this._delay = t;
  }
});
St.delay = 60;
function Ee(t, e) {
  let s = 0;
  return function() {
    const i = Date.now();
    i - s >= e && (s = i, d(t, this, arguments));
  };
}
let mt = {
  h: O.clientHeight,
  w: O.clientWidth
};
const rt = () => {
  let t = {
    h: O.clientHeight,
    w: O.clientWidth
  };
  (t.h !== mt.h || t.w !== mt.w) && me.emit("resize", t, te), Zt(), mt = t;
};
function It(t) {
  ee(t), tt.push(t);
}
function te(t, e) {
  if (!d(["getBoundingClientRect"], t))
    return;
  let s = t.getBoundingClientRect(), i = e.x, r = e.y;
  return i > s.left && i < s.left + s.width && r > s.top && r < s.top + s.height;
}
function ee(t) {
  let e = wt(tt, function(s, i) {
    if (t == i)
      return s;
  });
  e === void 0 || tt.splice(e, 1);
}
const G = new ResizeObserver(rt);
G.observe(O);
function Pt(t, e, s) {
  return Math.max(e, Math.min(t, s));
}
const gt = [], F = (t) => {
  if (ge(t))
    gt.push(t);
  else
    return +t < 0 ? d(t, gt) : gt.pop();
};
d([
  [
    "addEventListener",
    window,
    "keydown",
    function(t) {
      if (t.keyCode === 27) {
        d(["stopPropagation", "preventDefault"], t);
        let e = F(-1);
        e && d([[e[4]]]) === void 0 && d([F()]);
      }
    },
    !0
  ]
]);
const jt = {};
var yt = {
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
    for (var n, l, o = this.rWidth, h, u = t.match(this.rPosition), c = 0, g = u.length; c < g; c++)
      h = u[c], h != r ? i[h] = 0 : (l = u[(c + 1) % g], n = +!o.test(l), this.css(i, s, e, n), l == h && this.css(i, s, e, +!n));
    return i;
  }
};
function se(t) {
  t.onresize || (tt.push([se, null, t]), t.onresize = !0);
  var e = O, s = e.clientHeight, i = e.clientWidth, r = t.target, n = t.room, l = t.index, o = t.position, h = t.edge || 7, u = t.arrow || 0, c = t.css, g = t.space || (t.space = []);
  if (c["--tips-h--"] = s, /\s+|center/.test(o)) {
    yt.trigger(o, n, O, c);
    return;
  }
  var _ = r.getBoundingClientRect(), f = n.offsetHeight, v = n.offsetWidth, b = lt(t.offset) ? 7 : t.offset, P = "3,0,2,1".split(Rt), V, x = _.left, L = _.top, j = Math.max(L, h), A = (_.height == Ht ? _.bottom - L : _.height) >> 0, q = (_.width == Ht ? _.right - x : _.width) >> 0, U = i - v - b, H = s - f - b, Nt = x < 0 || x + q / 2 > i, At = L < 0 || L + A > s, ht = [
    /* left: 0 */
    At ? -1 : x - v,
    /* top: 1 */
    Nt ? -1 : j - f,
    /* right: 2 */
    At ? -1 : U - _.right,
    /* bottom: 3 */
    Nt ? -1 : H - _.bottom
  ];
  o && (wt(
    o.split(Rt),
    function(st, it, pt, de) {
      de.push(pt[it]);
    },
    Le,
    V = []
  ), P.unshift.apply(P, V)), l = wt(
    P,
    function(st, it, pt) {
      if (pt[it] - h > 0)
        return it;
    },
    ht
  );
  var ut = 0, dt = 0, zt = 0, ct = 0;
  if (l == null)
    yt.trigger("center", n, O, c);
  else {
    var ft = l == 0 || l == 2;
    ut = Pt(
      ft ? l == 2 ? _.right + b : ht[0] - b : (
        /* 目标对象的 left */
        x - u
      ),
      h,
      U
    ), dt = Pt(
      ft ? (
        // ? Math.min(
        // iTargetTop,
        // iShowHeight,
        Math.max(
          /* 交集的偏移量 与 tLeft */
          j - (f - A) / 2,
          b
        )
      ) : (
        // )
        l == 3 ? L + A + u + b : ht[1] - b
      ),
      h,
      H
    ), ft ? ct = Math.max(
      j - dt + (A - u) / 2 - u,
      u
    ) : zt = Math.max(
      /*  */
      Math.min(
        /* 相对位置差 + 目标宽 和 箭头差的一半 */
        x - ut + (q - u) / 2 - u,
        /* 目标宽 - 两倍的箭头 */
        v - 4 * u
      ),
      u
    );
    let st = yt.aLTM;
    c[st[0]] = ut, c[st[1]] = dt, c["--tips-arrow-top"] = (A > f, ct || Wt), c["--tips-arrow-left"] = zt || Wt;
  }
  let Lt = n.classList, ue = Ot[l], _t = g[0];
  (lt(_t) || _t != l) && d([
    [
      /* 移除旧值 */
      ["remove", Lt, Ot[_t]],
      /* 添加新值 */
      ["add", Lt, ue]
    ],
    () => {
      g.shift(), g.push(l), t.index = l;
    }
  ]);
}
new Jt("Tips");
const Ft = document.documentElement, Y = (t) => (d(["stopPropagation", "preventDefault"], t), t), Dt = (t) => {
  let e = F(t), s = I(e, "1=>host,3=>sign,4=>modal", !0);
  return s.task = e, s;
}, bt = "data-tips-scroll", Me = -1e4, Vt = 3, qt = {
  proxy: function(t) {
    t && this.$nextTick(this.__2next), clearInterval(this._timer__);
    let e = 1e3, s = 0, i = +this.timer;
    t === !0 && i && (this.t = i / e, this._timer__ = setInterval(() => {
      this.t = Math.max(i - ++s * e, 0) / e, s * e >= i && (this.proxy = !1, clearInterval(this._timer__));
    }, e)), this.$emit("update:visible", t);
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
      let e = I(
        [t],
        xt(
          "0.?.$el|0.$el|0=>el",
          I(this.$attrs, "ref-name|trigger-name=>name").name || "+"
        ),
        !0
      ).el;
      if (d(["currentTarget", "nodeType"], e || "")) {
        let s = e;
        e instanceof Jt && (s = e.currentTarget, Y(e)), this._event_mark = !1, this._target__ = s, s.mark || requestAnimationFrame(() => {
          this.__trigger(this.visible || "click"), s.mark = !0;
        });
      }
    }
  }
}, Re = {
  name: "Tips",
  components: {
    Card: W
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
      default: Vt
    },
    timer: {
      type: [String, Number]
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
      sign: xt("s-tips-{1-9}-{10-99}-{1-9}")
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
      K(e, this.__css(), !0), se({
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
      }), e.opacity = 1, this.css = e;
    },
    __toggle_append(t, e) {
      if (this.static || this.isSimply || t.nodeName == "#comment")
        return;
      let s = this.isModal, i = ye(this.$attrs, "append-to-*|append-to=>*", (l) => {
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
        e ? d(t.addEventListener, t, "scroll", rt) : (d(G.observe, G, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (s = this.__attr(t, bt), s || (d(t.addEventListener, t, "scroll", rt), this.__attr(t, bt, "true"))));
      });
    },
    __css() {
      let t = {};
      return this.arrow = t["--arrow-size"] = Math.sqrt(
        2 * Math.pow(
          Math.min(10, I(this.$attrs, "b|border=>b").b || 3) * 2 + 2,
          2
        )
      ) / 2 >> 0, t;
    },
    __2next() {
      if (lt(this.static))
        return;
      this.init(), It(this.init), St.delay = +this.delay, It(this.__2listener), this.__toggle_append(this.$el);
      let t = this._rank__ = [[["observe", G]], null, this.$el];
      d.apply(null, t), t[0][0][0] = "unobserve";
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          d(t, this, arguments);
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
        if (te(s.$el, t))
          return Y(t);
        if (!s.proxy)
          return F(), s._task__ = !1, i === this.sign ? void 0 : this.__close(t);
        if (d(r) !== void 0)
          return Y(t);
        /* 判断上次的是不是模式窗口 */
        // (host && host.$attrs.modal !== undefined) ||
        /* 判断是不是自己 */
        this.$el === t.currentTarget && i == this.sign || (d([e || []]), F(), s._task__ = !1);
      }
    },
    __click(t) {
      Y(t);
      let e = Z(t), { task: s, sign: i, host: r, modal: n } = Dt(-1);
      d(n) !== void 0 && (s = null);
      let l = i == this.sign;
      this.$attrs.clear === void 0 || (s && d([s]), F()), l || this.__Task(
        t,
        /* esc */
        () => this.$attrs.modal !== void 0 ? !0 : void 0
        /* 关闭删除用 */
        // () => (this.visible === "click" ? true : undefined),
      ), e || this.__toggle(t);
    },
    __Task(t, e, s) {
      this._task__ || (this._task__ = !0, F(["__hide", this, t, this.sign, e, s]));
    },
    __nextTick(t) {
      let e = () => {
        let s = this.$el;
        if (s.nodeType == 8)
          return requestAnimationFrame(e);
        d([
          [t],
          [
            "addEventListener",
            s,
            "mouseenter",
            () => {
              clearTimeout(this._t__);
            }
          ],
          ["addEventListener", s, "mouseleave", this.__hide]
        ]);
      };
      requestAnimationFrame(e);
    },
    /* 触发事件 */
    __trigger(t) {
      if (be(t)) {
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
              "mouseover",
              (i) => {
                e !== !0 && (e = !0, this.__visible(i), this.__nextTick());
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
          // hover: [
          //   /* 鼠标进入 */
          //   ["mouseenter", this.__visible],
          //   /* 鼠标离开 */
          //   ["mouseleave", this.__hide],
          // ],
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
      S(s, (r, n) => {
        let l = 0;
        n[2] === Ft && ++l && jt.__tipsmark_ || (l && (jt.__tipsmark_ = !0), i.push([
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
    d.apply(null, this._rank__), this._try("removeEventListener"), clearTimeout(this._timer__), ee(this.__2listener), this.__toggle_append(this.$el, !0), this.__parent(function(t, e) {
      d(t.removeEventListener, t, "scroll", rt), d(t.removeAttribute, t, bt, void 0), e || d(G.unobserve, G, t);
    });
  }
};
function We(t, e, s, i, r, n) {
  const l = T("Card");
  return r.proxy ? (y(), R(l, {
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
        a(t.$slots, h, $(u, { t: r.t }), void 0, !0)
      ])
    }))
  ]), 1032, ["class", "s-tips-completed", "style", "static", "onClick"])) : kt("", !0);
}
const et = /* @__PURE__ */ z(Re, [["render", We], ["__scopeId", "data-v-6e0a0e34"]]);
const He = {
  name: "Boom",
  emits: ["click"],
  components: { Card: W, Tips: et },
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
      S("disabled visible tips".split(/\s+/g), (t, e) => {
        m("removeAttribute", this.$el, e);
      });
    }
  }
}, Oe = ["disabled"];
function Ie(t, e, s, i, r, n) {
  const l = T("Tips"), o = T("Card");
  return y(), R(o, {
    class: "s-button",
    use: "",
    mix: t.mix,
    loading: s.loading ? "" : void 0,
    center: "",
    space: "",
    vc: ""
  }, {
    default: p(() => [
      w("button", {
        disabled: t.$attrs.disabled || s.loading,
        center: "",
        vc: "",
        onClick: e[0] || (e[0] = (h) => t.$emit("click", h))
      }, [
        a(t.$slots, "inner", {}, () => [
          w("span", null, [
            a(t.$slots, "default", {}, () => [
              e[1] || (e[1] = E("提示", -1))
            ], !0)
          ])
        ], !0)
      ], 8, Oe),
      a(t.$slots, "tips", {}, () => [
        t.$attrs.tips ? (y(), R(l, N($({ key: 0 }, t.$attrs.tips)), null, 16)) : kt("", !0)
      ], !0)
    ]),
    _: 3
  }, 8, ["mix", "loading"]);
}
const Tt = /* @__PURE__ */ z(He, [["render", Ie], ["__scopeId", "data-v-c7ed4102"]]), Pe = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return Z(s) ? [] : ot(s) ? s : [s];
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
    I(
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
function je(t, e, s, i, r, n) {
  return y(), R(_e, null, [
    (y(), R(pe(n.tag), $({ ref: "component" }, t.$attrs), {
      default: p(() => [
        (y(!0), D(Yt, null, X(n.column, (l) => a(t.$slots, n.__trigger(l), $({ ref_for: !0 }, l, { _: t.$attrs }))), 256))
      ]),
      _: 3
    }, 16))
  ], 1024);
}
const Ct = /* @__PURE__ */ z(Pe, [["render", je]]);
const Fe = {
  name: "Confirm",
  components: {
    Card: W,
    Tips: et,
    Boom: Tt
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
function qe(t, e, s, i, r, n) {
  const l = T("Card"), o = T("Boom"), h = T("Stream");
  return y(), D("span", De, [
    a(t.$slots, "default", {}, () => [
      a(t.$slots, "ref", {}, void 0, !0),
      a(t.$slots, "reference", {}, void 0, !0)
    ], !0),
    k(h, $({
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
          k(l, {
            flex: "",
            column: ""
          }, {
            title: p(() => [
              k(l, $({
                class: "s-confirm-title",
                height: "auto"
              }, s.titleAttrs), {
                default: p(() => [
                  a(t.$slots, "title", {}, () => [
                    E(B(s.title), 1)
                  ], !0)
                ]),
                _: 3
              }, 16)
            ]),
            content: p(() => [
              a(t.$slots, "content", {}, () => [
                E(B(s.content), 1)
              ], !0),
              a(t.$slots, "bottom", {}, () => [
                k(l, {
                  class: "s-confirm-booms",
                  flex: "",
                  space: "",
                  height: "auto"
                }, {
                  default: p(() => [
                    e[1] || (e[1] = w("span", null, null, -1)),
                    w("span", Ve, [
                      a(t.$slots, "boom", N(M({
                        close: n.close,
                        submit: s.submit
                      })), () => [
                        a(t.$slots, "cancel", N(M({ click: n.emitcancel, text: s.cancel })), () => [
                          k(o, $({ cancel: "" }, s.cancelAttrs, {
                            onClick: $t(n.emitcancel, ["stop"])
                          }), {
                            default: p(() => [
                              a(t.$slots, "can", { text: s.cancel }, void 0, !0),
                              E(" " + B(s.cancelAttrs.text || s.cancel), 1)
                            ]),
                            _: 3
                          }, 16, ["onClick"])
                        ], !0),
                        a(t.$slots, "submit", N(M({
                          click: n.close,
                          text: s.submit
                        })), () => [
                          k(o, $({
                            class: "simply",
                            onClick: $t(n.emitsubmit, ["stop"]),
                            submit: ""
                          }, s.submitAttrs), {
                            default: p(() => [
                              a(t.$slots, "sub", { text: s.submit }, void 0, !0),
                              E(" " + B(s.submitAttrs.text || s.submit), 1)
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
        k(l, $(t.$attrs, {
          width: "100%",
          nothing: "",
          height: "100%",
          onClose: e[0] || (e[0] = (u) => t.$attrs.close ? n.close(u) : "")
        }), at({ _: 2 }, [
          X(t.$slots, (u, c) => ({
            name: c,
            fn: p((g) => [
              a(t.$slots, c, $(g, { close: n.close }), void 0, !0)
            ])
          }))
        ]), 1040)
      ]),
      _: 3
    }, 16, ["columns", "visible", "arrow"])
  ]);
}
const ie = /* @__PURE__ */ z(Fe, [["render", qe], ["__scopeId", "data-v-de1fbaff"]]);
const Ue = {
  name: "Div",
  components: {
    Card: W
  }
};
function Ge(t, e, s, i, r, n) {
  const l = T("Card");
  return y(), R(l, {
    class: "s-div",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, N(M(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const re = /* @__PURE__ */ z(Ue, [["render", Ge], ["__scopeId", "data-v-90c20b5d"]]);
const Ye = {
  name: "Flex",
  components: {
    Card: W
  }
};
function Je(t, e, s, i, r, n) {
  const l = T("Card");
  return y(), R(l, {
    class: "s-flex",
    flex: "",
    height: "auto"
  }, at({ _: 2 }, [
    X(t.$slots, (o, h) => ({
      name: h,
      fn: p((u) => [
        a(t.$slots, h, N(M(u)), void 0, !0)
      ])
    }))
  ]), 1024);
}
const ne = /* @__PURE__ */ z(Ye, [["render", Je], ["__scopeId", "data-v-13b2463f"]]);
let Ut = (t) => t == null || t == null, Ke = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Xe = {
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
    this.scrollx = m("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: C,
    trigger(t, e) {
      ot(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        S(t, (s, i) => {
          this.$emit(i[0], Ut(i[1]) ? !0 : i[1]);
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
            let s = e.index || S(
              this.flys,
              (i, r, n, l) => {
                if (r[n] == l)
                  return i;
              },
              e.picker,
              e.id
            );
            Ut(s) || this.setindex(s);
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
      this.end = !1, this.__index = i.index, S(
        this.flyweights,
        (n, l, o, h, u, c, g, _, f) => {
          if (o = n / u >> 0, _ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < c % h) + /* 计算轮数, row的倍数 */
          (c / h >> 0)), f = _ * u + n % u, f >= this.count) {
            r || (this.end = !0, e.push(["onend"]), r = !0);
            return;
          }
          l.index = _, l.i = f, l.data = this.flys[f];
          let v = [
            /* top */
            _ * this.expand + l.x,
            /* left */
            l.space
          ];
          g && v.reverse(), l.top = v[0], l.left = v[1];
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
      let s = this.scrollx, i = this.flyweight, r = I(i, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [l, o] = this.offset, h = r.width, u = r.height, c = (Mt(this.width, h) || h) + l, g = Mt(this.height, u) + o, _ = [h / c >> 0 || 1, u / g >> 0 || 1];
        s && _.reverse();
        let [f, v] = _, b = this.padding, P, V = 0, x, L;
        s ? (x = c, c -= l, L = (H) => (
          /* 计算top偏移量 */
          H * (g - o) + (H + 1) * o
        )) : (n ? (c = (h - l * (f + 2 * b - 1)) / f, P = !b * l, V = b * l) : (P = 0, V = h < c ? 0 : (h % c + l * f) / (f + 1) >> 0, c -= l), L = (H) => H * (c + P) + (H + 1) * V, x = g), this.row = v + 2, this.column = f, this.realH = g - o, this.realW = c, this.expand = x, this.Size = Math.ceil(t / f) * x;
        let j = Math.min(t, f * this.row), A = j - 1, q;
        for (; j-- > 0; )
          q = A - j, this.$set(e, q, {
            x: l,
            y: o,
            width: c,
            height: g - o,
            space: L(q % f),
            data: {}
          });
        e.length = A + 1;
        let U = [];
        u / x > A / f && U.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), U.push([
          "update:space",
          {
            row: (A / f >> 0) + 1,
            column: f,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(U);
      });
    }
  }
}, Qe = { class: "flyweight-all" };
function Ze(t, e, s, i, r, n) {
  const l = T("Card");
  return y(), D("div", {
    ref: "flyweight",
    class: nt(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": r.Size === 0,
      line: s.line && r.__top !== 0
    }]),
    style: J(n.style),
    onScroll: e[0] || (e[0] = (...o) => n.scroll && n.scroll(...o))
  }, [
    a(t.$slots, "title", N(M(n.bridge)), void 0, !0),
    w("div", Qe, [
      (y(!0), D(Yt, null, X(r.flyweights, (o, h) => (y(), D("div", {
        key: h,
        style: J({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        a(t.$slots, "default", $({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    a(t.$slots, "mix", N(M(n.bridge)), () => [
      r.flyweights.length ? a(t.$slots, "end", N($({ key: 0 }, n.bridge)), void 0, !0) : a(t.$slots, "empty", { key: 1 }, () => [
        k(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: p(() => [...e[1] || (e[1] = [
            E(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const le = /* @__PURE__ */ z(Xe, [["render", Ze], ["__scopeId", "data-v-1c021354"]]);
let ts;
const Gt = {
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
  components: { Card: W, Stream: Ct },
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
      id: xt("input-{1000-9999}-{1000-9999}"),
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
    I(this.$attrs, "value|modelValue=>value", (e, s) => {
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
    }), S(["left", "right", "rm"], (e, s, i) => {
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
          return S(this.$attrs, (s, i) => {
            e[s] = this.$attrs[s];
          }), e;
        },
        this
      ]
    ]);
    t[this.trigger] = void 0, this.attrs = t, S(
      this.$attrs,
      (e, s, i) => {
        $e(s) && (this.inputAttrs[e] = s), e in i && (m("removeAttribute", this.$el, e), this.$watch(
          "$attrs." + e,
          (r) => {
            this.inputAttrs[e] = r;
          },
          { immediate: !0 }
        ));
      },
      fe("maxlength,type,disabled,readonly")
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
      S(ot(t) ? t : [t], (s, i, r) => {
        S(Gt, (n, l) => {
          n in i && (r = [
            function(o, h, u, c, g, _, f) {
              let v = o.trigger;
              if (!o.required && v && this !== v)
                return;
              let b = m([h, u], o, u, f, _);
              return g.error = b ? c || b : ts;
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
  const l = T("Stream"), o = T("Card");
  return y(), R(o, $({
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
      k(l, $({
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
      w("label", {
        class: "s-wrap-label",
        for: t.id
      }, [
        a(t.$slots, "default", {}, () => [
          w("span", is, [
            a(t.$slots, "placeholder", {}, () => [
              a(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
              E(" " + B(s.placeholder), 1)
            ], !0)
          ]),
          w("span", rs, [
            a(t.$slots, "tips", { limit: n.limit }, () => [
              a(t.$slots, "icon", { type: "tips" }, void 0, !0),
              E(" " + B(t.error || s.tips || s.placeholder), 1)
            ], !0)
          ])
        ], !0)
      ], 8, ss),
      k(o, {
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
              t.$attrs.maxlength ? (y(), D("span", ns, B(n.limit), 1)) : kt("", !0)
            ], !0),
            w("span", {
              ref: "rm",
              class: "s-wrap-close",
              onClick: e[1] || (e[1] = (...h) => n.close && n.close(...h))
            }, "×", 512),
            a(t.$slots, "r", {}, void 0, !0)
          ], !0)
        ]),
        _: 3
      }, 512),
      k(o, {
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
      k(o, {
        nothing: "",
        height: "auto",
        class: "input-error"
      }, {
        default: p(() => [
          a(t.$slots, "error", { error: t.error }, () => [
            E(B(t.error), 1)
          ], !0)
        ]),
        _: 3
      })
    ]),
    _: 3
  }, 16, ["s-completed", "class", "style"]);
}
const oe = /* @__PURE__ */ z(es, [["render", ls], ["__scopeId", "data-v-bf0c8b26"]]), os = {
  name: "Loading",
  components: {
    Tips: et
  },
  props: {
    visible: {
      type: Boolean,
      default: !0
    }
  }
};
function as(t, e, s, i, r, n) {
  const l = T("Tips");
  return y(), R(l, {
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
const ae = /* @__PURE__ */ z(os, [["render", as]]), hs = {}, he = [];
he.push(Tt, W, ie, re, ne, le, oe, ae, Ct, et);
const _s = { Boom: Tt, Card: W, Confirm: ie, Div: re, Flex: ne, Flyweight: le, Input: oe, Loading: ae, Stream: Ct, Tips: et };
hs.install = function(t, e = {}) {
  he.forEach((s) => {
    let { global: i, name: r } = s;
    i === !1 || t.component(r, s), t.component("S" + r, s);
  });
};
export {
  Tt as Boom,
  W as Card,
  ie as Confirm,
  re as Div,
  ne as Flex,
  le as Flyweight,
  oe as Input,
  ae as Loading,
  Ct as Stream,
  et as Tips,
  _s as components,
  hs as default
};
