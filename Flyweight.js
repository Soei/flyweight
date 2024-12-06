import { isArray as W, each as w, runer as m, picker as k, merge as C, isEmpty as I, isSimplyType as H, isString as L } from "@soei/util";
import { openBlock as _, createElementBlock as b, normalizeClass as F, normalizeStyle as g, createElementVNode as x, Fragment as j, renderList as A, renderSlot as d, createCommentVNode as B, createTextVNode as V, toDisplayString as M } from "vue";
const E = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, i] of e)
    s[l] = i;
  return s;
};
let N = (t) => t == null || t == null, R = /(\d+|[+\-\*/]|%)/g, O = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, $ = (t, e) => {
  let s;
  if (s = m("match", t, R)) {
    let l = s.length, i, h = 0, n, r = [];
    for (; l--; )
      h = s.shift(), h in O ? (i && r.push(i), h === "%" && (r.length = 2), n = h) : +h && r.push(+h), r.length == 2 && (r.push(e), i = O[n].apply(null, r), r.length = 0);
    +i || (i = +r.pop()), t = i >> 0;
  }
  return t;
}, D = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const G = {
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
      default: () => null
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
    }
  },
  computed: {
    flyweight() {
      return this.$refs.flyweight;
    }
  },
  data() {
    return {
      flyweights: [],
      actice: !1,
      Height: null,
      column: 1,
      row: 1,
      fwheight: 10,
      count: 0,
      task: [],
      realW: 0,
      realH: 0
    };
  },
  watch: {
    flys(t) {
      this.count = t.length, this.re();
      let e = this.task.shift();
      e && this.$nextTick(() => {
        this.setview(e);
      });
    },
    view: {
      handler(t) {
        this.setview(t);
      },
      immediate: !0
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
        this.re(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      D(t);
    }
  },
  methods: {
    trigger(t, e) {
      this.lazyrun(() => {
        W(t) || (t = [[t, e]]), w(t, (s, l) => {
          this.$emit(l[0], N(l[1]) ? !0 : l[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      m([this.cheackflys, (e) => {
        e = e || {};
        let s = e.index || w(this.flys, (l, i, h, n) => {
          if (i[h] == n)
            return l;
        }, e.picker, e.id);
        N(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      m([this.cheackflys, ({ index: e }) => {
        this.$nextTick(() => {
          let s = e / this.column >> 0, l = this.fwheight;
          (this.flyweight.scrollTop / l >> 0) + this.row - s - 1 > 0 || (this.flyweight.scrollTop = s * l, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        m(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = k(t.target, "scrollTop=>top");
      C(s, {
        height: this.realH,
        width: this.realW,
        /* 显示区域第一行的索引 */
        index: s.top / this.fwheight >> 0
        // ...this
      }, this.space, "mix"), t.from || e.push(["onscroll", s]), w(
        this.flyweights,
        (l, i, h, n, r, u, f, c) => {
          if (h = l / r >> 0, f = h + n * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % n) + (u / n >> 0)), c = f * r + l % r, c >= this.count) {
            e.push(["onend"]);
            return;
          }
          i.index = f, i.top = f * this.fwheight, i.data = this.flys[c];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index
      ), this.trigger(e), e = null;
    },
    scroll(t) {
      this.run(t || { target: this.flyweight, from: "space" });
    },
    re() {
      let t = this.count || this.flys.length, e = this.flyweights;
      if (!t)
        return e.length = t;
      this.count = t;
      let s = this.flyweight, l = k(s, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let i = this.auto === !0, [h, n] = this.offset, r = l.width, u = l.height, f = ($(this.width, r) || r) + h, c = $(this.height, u) + n;
        this.realH = c - n;
        let o = r / f >> 0 || 1, p = u / c >> 0;
        this.row = p + 2, this.column = o, this.fwheight = c;
        let v;
        i ? (f = (r / o >> 0) - h / o * (o - 1), v = h) : v = r % f / (o - 1) >> 0, this.realW = f, this.Height = Math.ceil(t / o) * c;
        let S = Math.min(t, o * this.row), y = S - 1, a, z;
        for (; S-- > 0; )
          a = y - S, z = this.flys[a], s = e[a], p = a / o >> 0, this.$set(e, a, {
            data: z,
            top: p * c,
            left: a % o * (f + v),
            index: p
          });
        e.length = y + 1;
        let T = [];
        u / c > y / o && T.push(["onend"]), this.scroll(), T.push(["update:space", {
          row: (y / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(T);
      });
    }
  }
};
function U(t, e, s, l, i, h) {
  return _(), b("div", {
    ref: "flyweight",
    class: F(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: g({
      "--width": i.realW + "px",
      "--height": i.realH + "px"
    }),
    onScroll: e[0] || (e[0] = (...n) => h.scroll && h.scroll(...n))
  }, [
    x("div", {
      class: "flyweight-all",
      style: g({
        "--flyweight-height": i.Height + "px"
      })
    }, [
      (_(!0), b(j, null, A(i.flyweights, (n, r) => (_(), b("div", {
        key: r,
        style: g({
          top: n.top + "px",
          left: n.left + "px"
        })
      }, [
        d(t.$slots, "default", {
          data: n.data,
          index: n.index
        }, void 0, !0)
      ], 4))), 128))
    ], 4),
    i.flyweights.length ? d(t.$slots, "end", { key: 0 }, void 0, !0) : B("", !0)
  ], 38);
}
const Y = /* @__PURE__ */ E(G, [["render", U], ["__scopeId", "data-v-5f77e7a2"]]);
const q = {
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
      $$attrs: {},
      top: "0",
      right: "0",
      bottom: "0",
      left: "0"
    };
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
        this.offser(t);
      },
      deep: !0
    }
  },
  methods: {
    isEmpty: I,
    isSimplyType: H,
    change(t) {
      H(t) || (this.closecss = k(t, "color=>--s-card-close-color,*"));
    },
    offser(t) {
      t = L(t) ? t.split(/\s*(?:,|\s+)\s*/) : t;
      let e = k(t, "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left", !0);
      w(e, (s, l, i) => {
        i[s] = l + "px";
      }, e), C(this, e, !0);
    }
  },
  mounted() {
    this.change(this.close), this.offser(this.offset);
  }
}, J = { class: "card-title" }, K = { class: "card-content" };
function P(t, e, s, l, i, h) {
  return _(), b("div", {
    class: "card",
    style: g({
      "--card-bgc": s.background,
      "--card-bw": s.border,
      "--card-height": s.height,
      "--card-width": s.width,
      "--top": i.top,
      "--right": i.right,
      "--bottom": i.bottom,
      "--left": i.left
    })
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        x("div", J, [
          V(M(s.show || s.title) + " ", 1),
          x("div", {
            class: F(["card-close", { hide: h.isSimplyType(s.close) ? !s.close : !1 }]),
            style: g(i.closecss),
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        x("div", K, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const Q = /* @__PURE__ */ E(q, [["render", P], ["__scopeId", "data-v-74802ccb"]]), X = [Y, Q], et = {
  install(t) {
    X.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  Q as Card,
  Y as Flyweight,
  et as default
};
