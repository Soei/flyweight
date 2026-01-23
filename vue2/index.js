import { runer as z, merge as E, isArray as et, each as k, picker as L, isEmpty as it, isSimplyType as X, isString as ct } from "@soei/util";
import { runer as g, isNil as ft, each as G } from "@soei/tools";
import ut from "@soei/picker";
let dt = /(\d+|[+\-\*/]|%)/g, q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, D = (t, e) => {
  let i;
  if (i = z("match", t, dt)) {
    let s = i.length, l, a = 0, n, h = [];
    for (; s--; )
      a = i.shift(), a in q ? (l && h.push(l), a === "%" && (h.length = 2), n = a) : +a && h.push(+a), h.length == 2 && (h.push(e), l = q[n].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, V = {}, w = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  V[e] || (V[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function W(t, e, i, s, l, a, n, h) {
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
      var u = r.render;
      r.render = function(f, p) {
        return o.call(p), u(f, p);
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
let Y = (t) => t == null || t == null, pt = (...t) => {
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
      return E(s, {
        "--width": w(this.realW),
        "--height": w(this.realH),
        "--flyweight-content": w(i)
      }, e && {
        "--flyweight-h": w(e)
      }, t && s, {
        "--flyweight-w": w(t)
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
      pt(t);
    }
    this.scrollx = z("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(t, e) {
      et(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        k(t, (i, s) => {
          this.$emit(s[0], Y(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      z([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || k(this.flys, (s, l, a, n) => {
          if (l[a] == n)
            return s;
        }, e.picker, e.id);
        Y(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      z([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        z(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = z(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      E(s, this.space), t.from || e.push(["onscroll", s]);
      let l = !1;
      k(
        this.flyweights,
        (a, n, h, r, o, u, d, c, f) => {
          if (h = a / o >> 0, c = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % r) + (u / r >> 0)), f = c * o + a % o, f >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = c, n.i = f, n.data = this.flys[f];
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
      let i = this.scrollx, s = this.flyweight, l = L(s, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [n, h] = this.offset, r = l.width, o = l.height, u = (D(this.width, r) || r) + n, d = D(this.height, o) + h, c = [r / u >> 0 || 1, o / d >> 0 || 1];
        i && c.reverse();
        let [f, p] = c, b = this.padding, T, x = 0, _, m;
        i ? (_ = u, u -= n, m = (S) => (
          /* 计算top偏移量 */
          S * (d - h) + (S + 1) * h
        )) : (a ? (u = (r - n * (f + 2 * b - 1)) / f, T = !b * n, x = b * n) : (T = 0, x = (r % u + n * f) / (f + 1) >> 0, u -= n), m = (S) => S * (u + T) + (S + 1) * x, _ = d), this.row = p + 2, this.column = f, this.realH = d - h, this.realW = u, this.expand = _, this.Size = Math.ceil(t / f) * _;
        let v = Math.min(t, f * this.row), y = v - 1, $;
        for (; v-- > 0; )
          $ = y - v, this.$set(e, $, {
            x: n,
            y: h,
            width: u,
            height: d - h,
            space: m($ % f),
            data: {}
          });
        e.length = y + 1;
        let N = [];
        o / _ > y / f && N.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), N.push(["update:space", {
          row: (y / f >> 0) + 1,
          column: f,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(N);
      });
    }
  }
};
var _t = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: e.style, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, yt = [], mt = /* @__PURE__ */ W(
  gt,
  _t,
  yt,
  !1,
  null,
  "d5f1cd63",
  null,
  null
);
const vt = mt.exports;
function O(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let st = {
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
}, wt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], rt = {};
k(
  wt,
  (t, e, i) => {
    t = O(e), rt["--" + O(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  st
);
const bt = {
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
    }
  },
  watch: st,
  methods: {
    exec: w,
    isEmpty: it,
    isSimplyType: X,
    tr() {
      let t = {};
      return this.margin(this.offset), k(rt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: O,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = w(s));
    },
    change(t) {
      X(t) || (this.closecss = L(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      E(
        this,
        L(
          ct(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
var xt = function() {
  var e = this, i = e._self._c;
  return i("div", { key: e.trigger, staticClass: "card", style: e.isEmpty(e.style) ? e.tr() : e.style }, [e._t("default", function() {
    return [e._t("title", function() {
      var s;
      return [i("div", { staticClass: "card-title" }, [e._v(" " + e._s(e.show || e.title) + " "), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, attrs: { title: (s = e.close) == null ? void 0 : s.tips }, on: { click: function(l) {
        return e.$emit("close");
      } } })])];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, St = [], $t = /* @__PURE__ */ W(
  bt,
  xt,
  St,
  !1,
  null,
  "ec96bb2a",
  null,
  null
);
const Nt = $t.exports, zt = {
  name: "Stream",
  computed: {
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return it(i) ? [] : et(i) ? i : [i];
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
    data: {
      type: Array,
      default: () => []
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
  methods: {
    trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
var Tt = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.trigger(s), null, null, s);
  })], 2);
}, Ct = [], Rt = /* @__PURE__ */ W(
  zt,
  Tt,
  Ct,
  !1,
  null,
  null,
  null,
  null
);
const kt = Rt.exports, J = /(?:\,|\|{2})/, K = "px", Q = "";
let nt = document.documentElement, Z, tt = ["s-left", "s-top", "s-right", "s-bottom"], Mt = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var Ht = ut(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let P = {}, lt = null;
Ht(P, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    lt = Et(() => {
      g(F);
    }, t), this._delay = t;
  }
});
P.delay = 60;
function Et(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, g(t, this, arguments));
  };
}
const H = () => {
  lt();
};
function Lt(t) {
  F.push(t);
}
const R = new ResizeObserver(H);
R.observe(nt);
function ot(t) {
  t.onresize || (F.push([ot, null, t]), t.onresize = !0);
  var e = nt, i = e.clientHeight, s = ft(t.offset) ? 15 : t.offset, l = t.target, a = t.room, n = t.index, h = t.position, r = l.getBoundingClientRect(), o = a.offsetHeight + s, u = a.offsetWidth + s, d = "3,0,2,1".split(J), c, f = (r.height == Z ? r.bottom - r.top : r.height) >> 0, p = (r.width == Z ? r.right - r.left : r.width) >> 0, b = e.clientWidth - u, T = i - o, x = [
    /* left: 0 */
    r.left - u,
    /* top: 1 */
    r.top - o,
    /* right: 2 */
    b - r.right,
    /* bottom: 3 */
    T - r.bottom
  ];
  h && (G(
    h.split(J),
    function(ht, M, A, at) {
      at.push(A[M]);
    },
    Mt,
    c = []
  ), d.unshift.apply(d, c)), n = G(
    d,
    function(ht, M, A) {
      if (A[M] > 0)
        return M;
    },
    x
  );
  var _ = 0, m = 0, v = 0;
  if (n != null) {
    var y = n == 0 || n == 2, $ = n == 3 || n == 1;
    _ = $ ? Math.min(r.left, b) : n == 2 ? r.right + s : x[0], o -= s * +y;
    var N = Math.max(r.top, 0), S = Math.min(
      r.bottom,
      i
    ), B = (S - o + Math.min(i - o, N)) / 2;
    m = Math.max(
      y ? B : n == 3 ? r.top + f + s : Math.min(B, x[1]),
      0
    ), $ && r.left > b && (v = r.left - _ - s + p / 2);
  }
  let I = a.classList, C = t.css;
  I.remove(...tt), I.add(tt[n]), t.index = n, C.left = _ + K, C.top = m + K;
  let j = C["--tips-arrow-top"] = y ? Math.min(
    /* 底边距 */
    Math.max(m, N) - m,
    o - s
  ) : Q, U = u - 3 * s;
  C["--tips-arrow"] = v > U - 10 || y && (j + (o > 50 ? 15 : 0) > o || !j) ? "hidden" : "visible", C["--tips-arrow-left"] = v ? Math.min(v, U) : Q;
}
const Wt = {
  name: "Tips",
  props: {
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
    parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), g(t, null, e, i), !i); )
        ;
    },
    attr(t, e, i) {
      return g(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      this.$el.nodeName != "#comment" && ot({
        onresize: !1,
        /* 监控的目标 */
        target: this.$el.parentNode,
        /* 显示的元素 */
        room: this.$el,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      });
    },
    scrollListener() {
      this.static || this.parent((t, e, i) => {
        e ? g(t.addEventListener, t, "scroll", H) : (g(R.observe, R, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, "-tips-scroll"), i || (g(t.addEventListener, t, "scroll", H), this.attr(t, "-tips-scroll", "true"))));
      });
    }
  },
  mounted() {
    E(
      this.css,
      L(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      )
    ), this.css["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0, this.init(), P.delay = +this.delay, Lt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", H), g(t.removeAttribute, t, "-tips-scroll", void 0), e || g(R.unobserve, R, t);
    });
  }
};
var At = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, Ot = [], Ft = /* @__PURE__ */ W(
  Wt,
  At,
  Ot,
  !1,
  null,
  "72d69fdc",
  null,
  null
);
const Pt = Ft.exports, Bt = [vt, Nt, kt, Pt], Xt = {
  install(t) {
    Bt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Nt as Card,
  vt as Flyweight,
  kt as Stream,
  Pt as Tips,
  Xt as default
};
