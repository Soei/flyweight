import { runer as g, isArray as L, each as m, merge as O, picker as T, isEmpty as W, isSimplyType as R, isString as A } from "@soei/util";
let E = /(\d+|[+\-\*/]|%)/g, N = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, F = (t, e) => {
  let i;
  if (i = g("match", t, E)) {
    let s = i.length, n, a = 0, l, h = [];
    for (; s--; )
      a = i.shift(), a in N ? (n && h.push(n), a === "%" && (h.length = 2), l = a) : +a && h.push(+a), h.length == 2 && (h.push(e), n = N[l].apply(null, h), h.length = 0);
    +n || (n = +h.pop()), t = n >> 0;
  }
  return t;
}, z = (t) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
function B(t, e, i, s, n, a, l, h) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), a && (r._scopeId = "data-v-" + a);
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
    exports: t,
    options: r
  };
}
let H = (t) => t == null || t == null, I = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const U = {
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      I(t);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: z,
    trigger(t, e) {
      this.lazyrun(() => {
        L(t) || (t = [[t, e]]), m(t, (i, s) => {
          this.$emit(s[0], H(s[1]) ? !0 : s[1]);
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
        let i = e.index || m(this.flys, (s, n, a, l) => {
          if (n[a] == l)
            return s;
        }, e.picker, e.id);
        H(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      g([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = g(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      O(s, this.space), t.from || e.push(["onscroll", s]);
      let n = !1;
      m(
        this.flyweights,
        (a, l, h, r, f, u, d, c, o) => {
          if (h = a / f >> 0, c = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % r) + (u / r >> 0)), o = c * f + a % f, o >= this.count) {
            n || (e.push(["onend"]), n = !0);
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
      let i = this.scrollx, s = this.flyweight, n = T(s, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [l, h] = this.offset, r = n.width, f = n.height, u = (F(this.width, r) || r) + l, d = F(this.height, f) + h, c = [r / u >> 0 || 1, f / d >> 0];
        i && c.reverse();
        let [o, p] = c, x = this.padding, v, b = 0, y, $;
        i ? (y = u, u -= l, $ = (_) => (
          /* 计算top偏移量 */
          _ * (d - h) + (_ + 1) * h
        )) : (a ? (u = (r - l * (o + 2 * x - 1)) / o, v = !x * l, b = x * l) : (v = 0, b = (r % u + l * o) / (o + 1) >> 0, u -= l), $ = (_) => _ * (u + v) + (_ + 1) * b, y = d), this.row = p + 2, this.column = o, this.realH = d - h, this.realW = u, this.expand = y, this.Size = Math.ceil(t / o) * y;
        let k = Math.min(t, o * this.row), w = k - 1, C;
        for (; k-- > 0; )
          C = w - k, this.$set(e, C, {
            x: l,
            y: h,
            width: u,
            height: d - h,
            space: $(C % o),
            data: {}
          });
        e.length = w + 1;
        let S = [];
        f / y > w / o && S.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), S.push(["update:space", {
          row: (w / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(S);
      });
    }
  }
};
var X = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: {
    "--width": e.exec(e.realW),
    "--height": e.exec(e.realH),
    "--flyweight-content": e.exec(e.Size)
  }, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, n) {
    return i("div", { key: n, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, G = [], M = /* @__PURE__ */ B(
  U,
  X,
  G,
  !1,
  null,
  "15867e3c",
  null,
  null
);
const V = M.exports;
const j = {
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
      let t = {};
      return this.margin(this.offset), m(["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], (e, i) => {
        this.css(t, i);
      }), t;
    }
  },
  watch: {
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
  },
  methods: {
    exec: z,
    isEmpty: W,
    isSimplyType: R,
    tolower(t, e) {
      return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
    },
    css(t, e) {
      let i = this.tolower(e), s = this[i] || this.default[i];
      !s || this.default[i] == s || (t["--" + this.tolower(e, !0)] = z(s));
    },
    change(t) {
      R(t) || (this.closecss = T(t, "color=>--s-card-close-color,*"));
    },
    margin(t) {
      O(this, T(
        A(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Y = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "card", style: e.style }, [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "card-title" }, [e._v(" " + e._s(e.show || e.title) + " "), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, on: { click: function(s) {
        return e.$emit("close");
      } } })])];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, q = [], D = /* @__PURE__ */ B(
  j,
  Y,
  q,
  !1,
  null,
  "1c7635d6",
  null,
  null
);
const J = D.exports, K = [V, J], Q = {
  install(t) {
    K.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  J as Card,
  V as Flyweight,
  Q as default
};
