import { runer as y, merge as R, isArray as I, each as m, picker as k, isEmpty as M, isSimplyType as H, isString as U } from "@soei/util";
let X = /(\d+|[+\-\*/]|%)/g, L = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, O = (e, t) => {
  let s;
  if (s = y("match", e, X)) {
    let i = s.length, n, a = 0, l, h = [];
    for (; i--; )
      a = s.shift(), a in L ? (n && h.push(n), a === "%" && (h.length = 2), l = a) : +a && h.push(+a), h.length == 2 && (h.push(t), n = L[l].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), e = n >> 0;
  }
  return e;
}, A = {}, g = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  A[t] || (A[t] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function F(e, t, s, i, n, a, l, h) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), i && (r.functional = !0), a && (r._scopeId = "data-v-" + a);
  var f;
  if (l ? (f = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), n && n.call(this, c), c && c._registeredComponents && c._registeredComponents.add(l);
  }, r._ssrRegister = f) : n && (f = h ? function() {
    n.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), f)
    if (r.functional) {
      r._injectStyles = f;
      var u = r.render;
      r.render = function(o, p) {
        return f.call(p), u(o, p);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, f) : [f];
    }
  return {
    exports: e,
    options: r
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
      I(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        m(e, (s, i) => {
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
        let s = t.index || m(this.flys, (i, n, a, l) => {
          if (n[a] == l)
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
      let n = !1;
      m(
        this.flyweights,
        (a, l, h, r, f, u, d, c, o) => {
          if (h = a / f >> 0, c = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % r) + (u / r >> 0)), o = c * f + a % f, o >= this.count) {
            n || (t.push(["onend"]), n = !0);
            return;
          }
          l.index = c, l.i = o, l.data = this.flys[o];
          let p = [
            /* top */
            c * this.expand + l.x,
            /* left */
            l.space
          ];
          d && p.reverse(), l.top = p[0], l.left = p[1];
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
      let s = this.scrollx, i = this.flyweight, n = k(i, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [l, h] = this.offset, r = n.width, f = n.height, u = (O(this.width, r) || r) + l, d = O(this.height, f) + h, c = [r / u >> 0 || 1, f / d >> 0 || 1];
        s && c.reverse();
        let [o, p] = c, v = this.padding, $, b = 0, _, S;
        s ? (_ = u, u -= l, S = (w) => (
          /* 计算top偏移量 */
          w * (d - h) + (w + 1) * h
        )) : (a ? (u = (r - l * (o + 2 * v - 1)) / o, $ = !v * l, b = v * l) : ($ = 0, b = (r % u + l * o) / (o + 1) >> 0, u -= l), S = (w) => w * (u + $) + (w + 1) * b, _ = d), this.row = p + 2, this.column = o, this.realH = d - h, this.realW = u, this.expand = _, this.Size = Math.ceil(e / o) * _;
        let T = Math.min(e, o * this.row), x = T - 1, C;
        for (; T-- > 0; )
          C = x - T, this.$set(t, C, {
            x: l,
            y: h,
            width: u,
            height: d - h,
            space: S(C % o),
            data: {}
          });
        t.length = x + 1;
        let z = [];
        f / _ > x / o && z.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
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
  }, style: t.style, on: { scroll: t.scroll } }, [s("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(i, n) {
    return s("div", { key: n, style: {
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
let W = {
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
}, J = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], E = {};
m(J, (e, t, s) => {
  e = N(t), E["--" + N(t, !0)] = e, s[e] = function() {
    this.trigger++;
  };
}, W);
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
  watch: W,
  methods: {
    exec: g,
    isEmpty: M,
    isSimplyType: H,
    tr() {
      let e = {};
      return this.margin(this.offset), m(E, (t, s) => {
        this.css(e, t, s);
      }), e;
    },
    tolower: N,
    css(e, t, s) {
      let i = this[s] || this.default[s];
      !i || this.default[s] == i || (e[t] = g(i));
    },
    change(e) {
      H(e) || (this.closecss = k(e, "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"));
    },
    margin(e) {
      R(this, k(
        U(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
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
      return [s("div", { staticClass: "card-title" }, [t._v(" " + t._s(t.show || t.title) + " "), s("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, on: { click: function(i) {
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
  "6065b432",
  null,
  null
);
const tt = Z.exports, et = {
  name: "Stream",
  props: {
    type: {
      type: String,
      default: "div"
    },
    data: {
      type: Array,
      default: () => []
    },
    T: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    trigger(e) {
      let t = e.slot || e.type;
      return (this.$scopedSlots || this.$slots)[t] ? t : "default";
    }
  }
};
var st = function() {
  var t = this, s = t._self._c;
  return s(t.type, t._b({ tag: "component", attrs: { data: t.data } }, "component", t.$attrs, !1), [t._l(t.T, function(i) {
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
