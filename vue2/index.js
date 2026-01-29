import { runer as b, merge as H, isArray as it, each as R, picker as M, isEmpty as st, isSimplyType as D, isString as ut } from "@soei/util";
import { runer as _, isNil as ft, each as G } from "@soei/tools";
import dt from "@soei/picker";
let pt = /(\d+|[+\-\*/]|%)/g, q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, V = (t, e) => {
  let i;
  if (i = b("match", t, pt)) {
    let s = i.length, l, a = 0, n, h = [];
    for (; s--; )
      a = i.shift(), a in q ? (l && h.push(l), a === "%" && (h.length = 2), n = a) : +a && h.push(+a), h.length == 2 && (h.push(e), l = q[n].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, Y = {}, v = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  Y[e] || (Y[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function L(t, e, i, s, l, a, n, h) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), a && (r._scopeId = "data-v-" + a);
  var o;
  if (n ? (o = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), l && l.call(this, c), c && c._registeredComponents && c._registeredComponents.add(n);
  }, r._ssrRegister = o) : l && (o = h ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (r.functional) {
      r._injectStyles = o;
      var f = r.render;
      r.render = function(u, p) {
        return o.call(p), f(u, p);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: t,
    options: r
  };
}
let J = (t) => t == null || t == null, _t = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const gt = {
  name: "Flyweight",
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
    }
  },
  computed: {
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, s = {};
      return H(s, {
        "--width": v(this.realW),
        "--height": v(this.realH),
        "--flyweight-content": v(i)
      }, e && {
        "--flyweight-h": v(e)
      }, t && s, {
        "--flyweight-w": v(t)
      }, "mix"), s;
    }
  },
  data() {
    return {
      flyweights: [],
      actice: !1,
      Size: null,
      column: 1,
      row: 1,
      expand: 10,
      count: 0,
      task: [],
      realW: 0,
      realH: 0
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
      _t(t);
    }
    this.scrollx = b("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: v,
    trigger(t, e) {
      it(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        R(t, (i, s) => {
          this.$emit(s[0], J(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      b([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || R(this.flys, (s, l, a, n) => {
          if (l[a] == n)
            return s;
        }, e.picker, e.id);
        J(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      b([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        b(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = b(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      H(s, this.space), t.from || e.push(["onscroll", s]);
      let l = !1;
      R(
        this.flyweights,
        (a, n, h, r, o, f, d, c, u) => {
          if (h = a / o >> 0, c = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < f % r) + (f / r >> 0)), u = c * o + a % o, u >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = c, n.i = u, n.data = this.flys[u];
          let p = [
            /* top */
            c * this.expand + n.x,
            /* left */
            n.space
          ];
          d && p.reverse(), n.top = p[0], n.left = p[1];
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
      let i = this.scrollx, s = this.flyweight, l = M(s, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [n, h] = this.offset, r = l.width, o = l.height, f = (V(this.width, r) || r) + n, d = V(this.height, o) + h, c = [r / f >> 0 || 1, o / d >> 0 || 1];
        i && c.reverse();
        let [u, p] = c, x = this.padding, z, S = 0, g, y;
        i ? (g = f, f -= n, y = ($) => (
          /* 计算top偏移量 */
          $ * (d - h) + ($ + 1) * h
        )) : (a ? (f = (r - n * (u + 2 * x - 1)) / u, z = !x * n, S = x * n) : (z = 0, S = (r % f + n * u) / (u + 1) >> 0, f -= n), y = ($) => $ * (f + z) + ($ + 1) * S, g = d), this.row = p + 2, this.column = u, this.realH = d - h, this.realW = f, this.expand = g, this.Size = Math.ceil(t / u) * g;
        let w = Math.min(t, u * this.row), m = w - 1, N;
        for (; w-- > 0; )
          N = m - w, this.$set(e, N, {
            x: n,
            y: h,
            width: f,
            height: d - h,
            space: y(N % u),
            data: {}
          });
        e.length = m + 1;
        let T = [];
        o / g > m / u && T.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), T.push(["update:space", {
          row: (m / u >> 0) + 1,
          column: u,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(T);
      });
    }
  }
};
var mt = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: e.style, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, yt = [], wt = /* @__PURE__ */ L(
  gt,
  mt,
  yt,
  !1,
  null,
  "d5f1cd63",
  null,
  null
);
const vt = wt.exports;
function F(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let rt = {
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
  }
}, bt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], nt = {};
R(
  bt,
  (t, e, i) => {
    t = F(e), nt["--" + F(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  rt
);
const xt = {
  name: "Card",
  // inheritAttrs: false,
  props: {
    offset: {
      type: [String, Array],
      default: () => [0, 0, 0, 0]
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
      type: String,
      default: "100%"
    },
    width: {
      type: String,
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
    }
  },
  data() {
    return {
      closecss: {},
      // style: {},
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
    style() {
      return this.tr();
    },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return b("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: rt,
  methods: {
    exec: v,
    isEmpty: st,
    picker: M,
    runer: b,
    isSimplyType: D,
    tr() {
      let t = {};
      return this.margin(this.offset), R(nt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: F,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = v(s));
    },
    change(t) {
      D(t) || (this.closecss = M(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      H(
        this,
        M(
          ut(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
          "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
          !0
        ),
        !0
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var St = function() {
  var e = this, i = e._self._c;
  return i("div", { key: e.trigger, staticClass: "card", style: e.isEmpty(e.style) ? e.tr() : e.style }, [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [e._v(" " + e._s(e.sub) + " "), e._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { flex: "", vcenter: "" } }, [e._t("icon", null, null, { el: e.$el, picker: e.picker, runer: e.runer }), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, attrs: { title: e.tips }, on: { click: function(s) {
          return e.$emit("close");
        } } })], 2)];
      })], 2)];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, $t = [], Nt = /* @__PURE__ */ L(
  xt,
  St,
  $t,
  !1,
  null,
  "b1e09a6c",
  null,
  null
);
const Tt = Nt.exports, zt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return st(i) ? [] : it(i) ? i : [i];
    }
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
    this.$.vnode.ref && H(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
var Ct = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ ref: "component", tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.__trigger(s), null, null, s);
  })], 2);
}, kt = [], Rt = /* @__PURE__ */ L(
  zt,
  Ct,
  kt,
  !1,
  null,
  null,
  null,
  null
);
const Mt = Rt.exports, K = /(?:\,|\|{2})/, Q = "px", Z = "";
let lt = document.documentElement, tt, et = ["s-left", "s-top", "s-right", "s-bottom"], Ht = { left: 0, top: 1, right: 2, bottom: 3 };
const P = [];
var Et = dt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let B = {}, ot = null;
Et(B, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    ot = Wt(() => {
      _(P);
    }, t), this._delay = t;
  }
});
B.delay = 60;
function Wt(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, _(t, this, arguments));
  };
}
const W = () => {
  ot();
};
function Lt(t) {
  P.push(t);
}
const k = new ResizeObserver(W);
k.observe(lt);
function ht(t) {
  t.onresize || (P.push([ht, null, t]), t.onresize = !0);
  var e = lt, i = e.clientHeight, s = ft(t.offset) ? 15 : t.offset, l = t.target, a = t.room, n = t.index, h = t.position, r = l.getBoundingClientRect(), o = a.offsetHeight + s, f = a.offsetWidth + s, d = "3,0,2,1".split(K), c, u = (r.height == tt ? r.bottom - r.top : r.height) >> 0, p = (r.width == tt ? r.right - r.left : r.width) >> 0, x = e.clientWidth - f, z = i - o, S = [
    /* left: 0 */
    r.left - f,
    /* top: 1 */
    r.top - o,
    /* right: 2 */
    x - r.right,
    /* bottom: 3 */
    z - r.bottom
  ];
  h && (G(
    h.split(K),
    function(at, E, O, ct) {
      ct.push(O[E]);
    },
    Ht,
    c = []
  ), d.unshift.apply(d, c)), n = G(
    d,
    function(at, E, O) {
      if (O[E] > 0)
        return E;
    },
    S
  );
  var g = 0, y = 0, w = 0;
  if (n != null) {
    var m = n == 0 || n == 2, N = n == 3 || n == 1;
    g = N ? Math.min(r.left, x) : n == 2 ? r.right + s : S[0], o -= s * +m;
    var T = Math.max(r.top, 0), $ = Math.min(
      r.bottom,
      i
    ), I = ($ - o + Math.min(i - o, T)) / 2;
    y = Math.max(
      m ? I : n == 3 ? r.top + u + s : Math.min(I, S[1]),
      0
    ), N && r.left > x && (w = r.left - g - s + p / 2);
  }
  let j = a.classList, C = t.css;
  j.remove(...et), j.add(et[n]), t.index = n, C.left = g + Q, C.top = y + Q;
  let U = C["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(y, T) - y,
    o - s
  ) : Z, X = f - 3 * s;
  C["--tips-arrow"] = w > X - 10 || m && (U + (o > 50 ? 15 : 0) > o || !U) ? "hidden" : "visible", C["--tips-arrow-left"] = w ? Math.min(w, X) : Z;
}
const A = "data-tips-scroll", Ot = {
  name: "Tips",
  props: {
    /* 目标对象 */
    target: {
      type: [HTMLElement]
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
    /* 字体大小 */
    fontSize: {
      type: [String, Number],
      default: void 0
    },
    /* 边框宽度 */
    border: {
      type: [String, Number],
      default: void 0
    },
    /* 边框和颜色 */
    color: {
      type: [String, Number],
      default: void 0
    },
    /* 背景色 */
    background: {
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
      default: 10
    },
    /* 显示箭头 */
    borderRadius: {
      type: [String, Number],
      default: 10
    }
  },
  watch: {
    visible: function(t) {
      t && this.$nextTick(() => {
        this.init();
      });
    }
  },
  data() {
    return {
      css: {}
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), _(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return _(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && ht({
        onresize: !1,
        /* 监控的目标 */
        target: t.parentNode,
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      });
    },
    __2listener() {
      this.static || this.__parent((t, e, i) => {
        e ? _(t.addEventListener, t, "scroll", W) : (_(k.observe, k, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, A), i || (_(t.addEventListener, t, "scroll", W), this.__attr(t, A, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = M(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), H(t, e), t;
    },
    __2next() {
      this.target || (this.init(), B.delay = +this.delay, Lt((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      _(t.removeEventListener, t, "scroll", W), _(t.removeAttribute, t, A, void 0), e || _(k.unobserve, k, t);
    });
  }
};
var At = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", class: e.target ? "tips-" + e.position : "", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, Ft = [], Pt = /* @__PURE__ */ L(
  Ot,
  At,
  Ft,
  !1,
  null,
  "f2043d4b",
  null,
  null
);
const Bt = Pt.exports, It = [vt, Tt, Mt, Bt], Dt = {
  install(t) {
    It.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Tt as Card,
  vt as Flyweight,
  Mt as Stream,
  Bt as Tips,
  Dt as default
};
