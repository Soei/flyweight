import { runer as g, isArray as E, each as m, merge as A, picker as z, isEmpty as I, isSimplyType as N, isString as U } from "@soei/util";
let X = /(\d+|[+\-\*/]|%)/g, H = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, L = (e, t) => {
  let s;
  if (s = g("match", e, X)) {
    let i = s.length, n, a = 0, l, h = [];
    for (; i--; )
      a = s.shift(), a in H ? (n && h.push(n), a === "%" && (h.length = 2), l = a) : +a && h.push(+a), h.length == 2 && (h.push(t), n = H[l].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), e = n >> 0;
  }
  return e;
}, R = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
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
let O = (e) => e == null || e == null, G = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const M = {
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
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: R,
    trigger(e, t) {
      E(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        m(e, (s, i) => {
          this.$emit(i[0], O(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      g([this.cheackflys, (t) => {
        t = t || {};
        let s = t.index || m(this.flys, (i, n, a, l) => {
          if (n[a] == l)
            return i;
        }, t.picker, t.id);
        O(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      g([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, i = this.expand;
          (this.flyweight[this.direction] / i >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * i, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = g(this.direction, e.target), i = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      A(i, this.space), e.from || t.push(["onscroll", i]);
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
      let s = this.scrollx, i = this.flyweight, n = z(i, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [l, h] = this.offset, r = n.width, f = n.height, u = (L(this.width, r) || r) + l, d = L(this.height, f) + h, c = [r / u >> 0 || 1, f / d >> 0 || 1];
        s && c.reverse();
        let [o, p] = c, x = this.padding, v, $ = 0, _, b;
        s ? (_ = u, u -= l, b = (y) => (
          /* 计算top偏移量 */
          y * (d - h) + (y + 1) * h
        )) : (a ? (u = (r - l * (o + 2 * x - 1)) / o, v = !x * l, $ = x * l) : (v = 0, $ = (r % u + l * o) / (o + 1) >> 0, u -= l), b = (y) => y * (u + v) + (y + 1) * $, _ = d), this.row = p + 2, this.column = o, this.realH = d - h, this.realW = u, this.expand = _, this.Size = Math.ceil(e / o) * _;
        let S = Math.min(e, o * this.row), w = S - 1, T;
        for (; S-- > 0; )
          T = w - S, this.$set(t, T, {
            x: l,
            y: h,
            width: u,
            height: d - h,
            space: b(T % o),
            data: {}
          });
        t.length = w + 1;
        let C = [];
        f / _ > w / o && C.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), C.push(["update:space", {
          row: (w / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(C);
      });
    }
  }
};
var V = function() {
  var t = this, s = t._self._c;
  return s("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": t.actice
  }, style: {
    "--width": t.exec(t.realW),
    "--height": t.exec(t.realH),
    "--flyweight-content": t.exec(t.Size)
  }, on: { scroll: t.scroll } }, [s("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(i, n) {
    return s("div", { key: n, style: {
      top: i.top + "px",
      left: i.left + "px"
    } }, [t._t("default", null, null, i)], 2);
  }), 0), t.flyweights.length ? t._t("end") : t._e()], 2);
}, j = [], Y = /* @__PURE__ */ F(
  M,
  V,
  j,
  !1,
  null,
  "95f71719",
  null,
  null
);
const q = Y.exports;
function k(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let B = {
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
}, D = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], W = {};
m(D, (e, t, s) => {
  e = k(t), W["--" + k(t, !0)] = e, s[e] = function() {
    this.trigger++;
  };
}, B);
const J = {
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
  watch: B,
  methods: {
    exec: R,
    isEmpty: I,
    isSimplyType: N,
    tr() {
      let e = {};
      return this.margin(this.offset), m(W, (t, s) => {
        this.css(e, t, s);
      }), e;
    },
    tolower: k,
    css(e, t, s) {
      let i = this[s] || this.default[s];
      !i || this.default[s] == i || (e[t] = R(i));
    },
    change(e) {
      N(e) || (this.closecss = z(e, "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"));
    },
    margin(e) {
      A(this, z(
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
var K = function() {
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
}, P = [], Q = /* @__PURE__ */ F(
  J,
  K,
  P,
  !1,
  null,
  "6065b432",
  null,
  null
);
const Z = Q.exports, tt = {
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
var et = function() {
  var t = this, s = t._self._c;
  return s(t.type, t._b({ tag: "component", attrs: { data: t.data } }, "component", t.$attrs, !1), [t._l(t.T, function(i) {
    return [t._t(t.trigger(i), null, null, i)];
  })], 2);
}, st = [], it = /* @__PURE__ */ F(
  tt,
  et,
  st,
  !1,
  null,
  null,
  null,
  null
);
const lt = it.exports, rt = [q, Z, lt], ht = {
  install(e) {
    rt.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  Z as Card,
  q as Flyweight,
  lt as Stream,
  ht as default
};
