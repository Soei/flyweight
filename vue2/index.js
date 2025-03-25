import { runer as g, isArray as E, each as m, merge as F, picker as w, isEmpty as I, isSimplyType as H, isString as U, format as X } from "@soei/util";
let G = /(\d+|[+\-\*/]|%)/g, L = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, O = (t, e) => {
  let s;
  if (s = g("match", t, G)) {
    let i = s.length, l, a = 0, r, h = [];
    for (; i--; )
      a = s.shift(), a in L ? (l && h.push(l), a === "%" && (h.length = 2), r = a) : +a && h.push(+a), h.length == 2 && (h.push(e), l = L[r].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, z = (t) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
function N(t, e, s, i, l, a, r, h) {
  var n = typeof t == "function" ? t.options : t;
  e && (n.render = e, n.staticRenderFns = s, n._compiled = !0), i && (n.functional = !0), a && (n._scopeId = "data-v-" + a);
  var f;
  if (r ? (f = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), l && l.call(this, c), c && c._registeredComponents && c._registeredComponents.add(r);
  }, n._ssrRegister = f) : l && (f = h ? function() {
    l.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), f)
    if (n.functional) {
      n._injectStyles = f;
      var u = n.render;
      n.render = function(o, p) {
        return f.call(p), u(o, p);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, f) : [f];
    }
  return {
    exports: t,
    options: n
  };
}
let A = (t) => t == null || t == null, M = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
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
      M(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: z,
    trigger(t, e) {
      this.lazyrun(() => {
        E(t) || (t = [[t, e]]), m(t, (s, i) => {
          this.$emit(i[0], A(i[1]) ? !0 : i[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      g([this.cheackflys, (e) => {
        e = e || {};
        let s = e.index || m(this.flys, (i, l, a, r) => {
          if (l[a] == r)
            return i;
        }, e.picker, e.id);
        A(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      g([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let s = e / this.column >> 0, i = this.expand;
          (this.flyweight[this.direction] / i >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * i, this.scroll());
        });
      }], this, { index: t });
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
      F(i, this.space), t.from || e.push(["onscroll", i]);
      let l = !1;
      m(
        this.flyweights,
        (a, r, h, n, f, u, d, c, o) => {
          if (h = a / f >> 0, c = h + n * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % n) + (u / n >> 0)), o = c * f + a % f, o >= this.count) {
            l || (e.push(["onend"]), l = !0);
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
      let s = this.scrollx, i = this.flyweight, l = w(i, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [r, h] = this.offset, n = l.width, f = l.height, u = (O(this.width, n) || n) + r, d = O(this.height, f) + h, c = [n / u >> 0 || 1, f / d >> 0 || 1];
        s && c.reverse();
        let [o, p] = c, $ = this.padding, v, b = 0, y, S;
        s ? (y = u, u -= r, S = (_) => (
          /* 计算top偏移量 */
          _ * (d - h) + (_ + 1) * h
        )) : (a ? (u = (n - r * (o + 2 * $ - 1)) / o, v = !$ * r, b = $ * r) : (v = 0, b = (n % u + r * o) / (o + 1) >> 0, u -= r), S = (_) => _ * (u + v) + (_ + 1) * b, y = d), this.row = p + 2, this.column = o, this.realH = d - h, this.realW = u, this.expand = y, this.Size = Math.ceil(t / o) * y;
        let T = Math.min(t, o * this.row), x = T - 1, C;
        for (; T-- > 0; )
          C = x - T, this.$set(e, C, {
            x: r,
            y: h,
            width: u,
            height: d - h,
            space: S(C % o),
            data: {}
          });
        e.length = x + 1;
        let k = [];
        f / y > x / o && k.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), k.push(["update:space", {
          row: (x / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(k);
      });
    }
  }
};
var j = function() {
  var e = this, s = e._self._c;
  return s("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: {
    "--width": e.exec(e.realW),
    "--height": e.exec(e.realH),
    "--flyweight-content": e.exec(e.Size)
  }, on: { scroll: e.scroll } }, [s("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(i, l) {
    return s("div", { key: l, style: {
      top: i.top + "px",
      left: i.left + "px"
    } }, [e._t("default", null, null, i)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, Y = [], q = /* @__PURE__ */ N(
  V,
  j,
  Y,
  !1,
  null,
  "05373fe1",
  null,
  null
);
const D = q.exports;
function R(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let B = {
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
}, J = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], W = {};
m(J, (t, e, s) => {
  t = R(e), W["--" + R(e, !0)] = t, s[t] = function() {
    this.trigger++;
  };
}, B);
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
      style: {},
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
    exec: z,
    isEmpty: I,
    isSimplyType: H,
    tr() {
      let t = {};
      return this.margin(this.offset), m(W, (e, s) => {
        this.css(t, e, s);
      }), t;
    },
    tolower: R,
    css(t, e, s) {
      let i = this[s] || this.default[s];
      !i || this.default[s] == i || (t[e] = z(i));
    },
    change(t) {
      H(t) || (this.closecss = w(t, "color=>--s-card-close-color,*"));
    },
    margin(t) {
      F(this, w(
        U(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
  var e = this, s = e._self._c;
  return s("div", { key: e.trigger, staticClass: "card", style: e.isEmpty(e.style) ? e.tr() : e.style }, [e._t("default", function() {
    return [e._t("title", function() {
      return [s("div", { staticClass: "card-title" }, [e._v(" " + e._s(e.show || e.title) + " "), s("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, on: { click: function(i) {
        return e.$emit("close");
      } } })])];
    }), e._t("content", function() {
      return [s("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, Q = [], Z = /* @__PURE__ */ N(
  K,
  P,
  Q,
  !1,
  null,
  "b6ea8a12",
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
  render(t) {
    return t(
      this.type,
      {
        // ...item,
        props: {
          data: this.data
        }
      },
      this._l(this.T, (e, s) => {
        let i = w(e, "slot|name|type=>name").name, l = w(this, X("$scopedSlots.?|$slots.?|$scopedSlots.default=>?", i));
        return F(e, { index: s }), g(i, l, e);
      })
    );
  }
}, st = null, it = null;
var lt = /* @__PURE__ */ N(
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
  install(t) {
    nt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  tt as Card,
  D as Flyweight,
  rt as Stream,
  ot as default
};
