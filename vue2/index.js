import { runer as y, merge as R, isArray as W, each as w, picker as k, isEmpty as E, isSimplyType as A, isString as U } from "@soei/util";
let X = /(\d+|[+\-\*/]|%)/g, H = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, L = (e, t) => {
  let s;
  if (s = y("match", e, X)) {
    let i = s.length, l, a = 0, r, h = [];
    for (; i--; )
      a = s.shift(), a in H ? (l && h.push(l), a === "%" && (h.length = 2), r = a) : +a && h.push(+a), h.length == 2 && (h.push(t), l = H[r].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), e = l >> 0;
  }
  return e;
}, O = {}, g = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  O[t] || (O[t] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function F(e, t, s, i, l, a, r, h) {
  var n = typeof e == "function" ? e.options : e;
  t && (n.render = t, n.staticRenderFns = s, n._compiled = !0), i && (n.functional = !0), a && (n._scopeId = "data-v-" + a);
  var u;
  if (r ? (u = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), l && l.call(this, c), c && c._registeredComponents && c._registeredComponents.add(r);
  }, n._ssrRegister = u) : l && (u = h ? function() {
    l.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), u)
    if (n.functional) {
      n._injectStyles = u;
      var f = n.render;
      n.render = function(o, p) {
        return u.call(p), f(o, p);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, u) : [u];
    }
  return {
    exports: e,
    options: n
  };
}
let B = (e) => e == null || e == null, G = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const V = {
  name: "Flyweight",
  props: {
    flys: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
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
      type: Number,
      default: !1
    },
    left: {
      type: Number,
      default: !1
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
      var e = this.w, t = this.h, s = this.Size, i = {};
      return R(i, {
        "--width": g(this.realW),
        "--height": g(this.realH),
        "--flyweight-content": g(s)
      }, t && {
        "--flyweight-h": g(t)
      }, e && i, {
        "--flyweight-w": g(e)
      }, "mix"), i;
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
    flys(e) {
      this.count = e.length, this.rebuild();
      let t = this.task.shift();
      t && this.$nextTick(() => {
        this.setview(t);
      });
    },
    view: {
      handler(e) {
        this.setview(e);
      },
      immediate: !0,
      deep: !0
    },
    index(e) {
      this.setindex(e);
    },
    top(e) {
      this.flyweight.scrollTop = e;
    },
    left(e) {
      this.flyweight.scrollLeft = e;
    }
  },
  mounted() {
    this.flyweights = [], this.$set || (this.$set = (e, t, s) => {
      e[t] = s;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (e) {
      G(e);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: g,
    trigger(e, t) {
      W(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        w(e, (s, i) => {
          this.$emit(i[0], B(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      y([this.cheackflys, (t) => {
        t = t || {};
        let s = t.index || w(this.flys, (i, l, a, r) => {
          if (l[a] == r)
            return i;
        }, t.picker, t.id);
        B(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      y([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, i = this.expand;
          (this.flyweight[this.direction] / i >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * i, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = y(this.direction, e.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      R(i, this.space), e.from || t.push(["onscroll", i]);
      let l = !1;
      w(
        this.flyweights,
        (a, r, h, n, u, f, d, c, o) => {
          if (h = a / u >> 0, c = h + n * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < f % n) + (f / n >> 0)), o = c * u + a % u, o >= this.count) {
            l || (t.push(["onend"]), l = !0);
            return;
          }
          r.index = c, r.i = o, r.data = this.flys[o];
          let p = [
            /* top */
            c * this.expand + r.x,
            /* left */
            r.space
          ];
          d && p.reverse(), r.top = p[0], r.left = p[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        i.index,
        this.scrollx
      ), this.trigger(t), t = null;
    },
    scroll(e) {
      this.run(e || { target: this.flyweight, from: "space" });
    },
    rebuild() {
      let e = this.count || this.flys.length, t = this.flyweights;
      if (!e)
        return t.length = e;
      this.count = e;
      let s = this.scrollx, i = this.flyweight, l = k(i, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [r, h] = this.offset, n = l.width, u = l.height, f = (L(this.width, n) || n) + r, d = L(this.height, u) + h, c = [n / f >> 0 || 1, u / d >> 0 || 1];
        s && c.reverse();
        let [o, p] = c, v = this.padding, b, $ = 0, _, S;
        s ? (_ = f, f -= r, S = (m) => (
          /* 计算top偏移量 */
          m * (d - h) + (m + 1) * h
        )) : (a ? (f = (n - r * (o + 2 * v - 1)) / o, b = !v * r, $ = v * r) : (b = 0, $ = (n % f + r * o) / (o + 1) >> 0, f -= r), S = (m) => m * (f + b) + (m + 1) * $, _ = d), this.row = p + 2, this.column = o, this.realH = d - h, this.realW = f, this.expand = _, this.Size = Math.ceil(e / o) * _;
        let T = Math.min(e, o * this.row), x = T - 1, C;
        for (; T-- > 0; )
          C = x - T, this.$set(t, C, {
            x: r,
            y: h,
            width: f,
            height: d - h,
            space: S(C % o),
            data: {}
          });
        t.length = x + 1;
        let z = [];
        u / _ > x / o && z.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), z.push(["update:space", {
          row: (x / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(z);
      });
    }
  }
};
var j = function() {
  var t = this, s = t._self._c;
  return s("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": t.actice
  }, style: t.style, on: { scroll: t.scroll } }, [s("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(i, l) {
    return s("div", { key: l, style: {
      top: i.top + "px",
      left: i.left + "px"
    } }, [t._t("default", null, null, i)], 2);
  }), 0), t.flyweights.length ? t._t("end") : t._e()], 2);
}, Y = [], q = /* @__PURE__ */ F(
  V,
  j,
  Y,
  !1,
  null,
  "3416ac53",
  null,
  null
);
const D = q.exports;
function N(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let I = {
  close: {
    handler(e) {
      this.change(e);
    },
    deep: !0
  },
  offset: {
    handler(e) {
      this.margin(e);
    },
    deep: !0
  }
}, J = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], M = {};
w(
  J,
  (e, t, s) => {
    e = N(t), M["--" + N(t, !0)] = e, s[e] = function() {
      this.trigger++;
    };
  },
  I
);
const K = {
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
  watch: I,
  methods: {
    exec: g,
    isEmpty: E,
    isSimplyType: A,
    tr() {
      let e = {};
      return this.margin(this.offset), w(M, (t, s) => {
        this.css(e, t, s);
      }), e;
    },
    tolower: N,
    css(e, t, s) {
      let i = this[s] || this.default[s];
      !i || this.default[s] == i || (e[t] = g(i));
    },
    change(e) {
      A(e) || (this.closecss = k(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      R(
        this,
        k(
          U(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
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
var P = function() {
  var t = this, s = t._self._c;
  return s("div", { key: t.trigger, staticClass: "card", style: t.isEmpty(t.style) ? t.tr() : t.style }, [t._t("default", function() {
    return [t._t("title", function() {
      var i;
      return [s("div", { staticClass: "card-title" }, [t._v(" " + t._s(t.show || t.title) + " "), s("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, attrs: { title: (i = t.close) == null ? void 0 : i.tips }, on: { click: function(l) {
        return t.$emit("close");
      } } })])];
    }), t._t("content", function() {
      return [s("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, Q = [], Z = /* @__PURE__ */ F(
  K,
  P,
  Q,
  !1,
  null,
  "16139b86",
  null,
  null
);
const tt = Z.exports, et = {
  name: "Stream",
  computed: {
    column() {
      let { columns: e, T: t } = this, s = e || t;
      return E(s) ? [] : W(s) ? s : [s];
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
      type: Array,
      default: () => null
    },
    T: {
      type: Array,
      default: () => null
    }
  },
  methods: {
    trigger(e) {
      let t = e[this.bridge] || e.type;
      return (this.$scopedSlots || this.$slots)[t] ? t : "default";
    }
  }
};
var st = function() {
  var t = this, s = t._self._c;
  return s(t.type, t._b({ tag: "component", attrs: { data: t.data } }, "component", t.$attrs, !1), [t._l(t.column, function(i) {
    return [t._t(t.trigger(i), null, null, i)];
  })], 2);
}, it = [], lt = /* @__PURE__ */ F(
  et,
  st,
  it,
  !1,
  null,
  null,
  null,
  null
);
const rt = lt.exports, nt = [D, tt, rt], ot = {
  install(e) {
    nt.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  tt as Card,
  D as Flyweight,
  rt as Stream,
  ot as default
};
