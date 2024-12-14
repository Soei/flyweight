import { runer as m, isArray as j, each as g, picker as b, merge as L, isEmpty as A, isSimplyType as W, isString as M } from "@soei/util";
import { openBlock as _, createElementBlock as x, normalizeClass as E, normalizeStyle as p, createElementVNode as k, Fragment as R, renderList as V, renderSlot as d, mergeProps as D, createCommentVNode as G, createTextVNode as P, toDisplayString as U } from "vue";
let Y = /(\d+|[+\-\*/]|%)/g, B = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, C = (e, t) => {
  let s;
  if (s = m("match", e, Y)) {
    let r = s.length, l, i = 0, o, h = [];
    for (; r--; )
      i = s.shift(), i in B ? (l && h.push(l), i === "%" && (h.length = 2), o = i) : +i && h.push(+i), h.length == 2 && (h.push(t), console.log(h, o, "W"), l = B[o].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), e = l >> 0;
  }
  return e;
}, O = (e) => e.replace(/\w+\((.*)\)/g, "$1").replace(/(?=\D)0(?!\w)/, "0px");
const I = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, l] of t)
    s[r] = l;
  return s;
};
let F = (e) => e == null || e == null, q = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const J = {
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
    flys(e) {
      this.count = e.length, this.re();
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
        this.re(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (e) {
      q(e);
    }
  },
  methods: {
    trigger(e, t) {
      this.lazyrun(() => {
        j(e) || (e = [[e, t]]), g(e, (s, r) => {
          this.$emit(r[0], F(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      m([this.cheackflys, (t) => {
        t = t || {};
        let s = t.index || g(this.flys, (r, l, i, o) => {
          if (l[i] == o)
            return r;
        }, t.picker, t.id);
        F(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      m([this.cheackflys, ({ index: t }) => {
        this.$nextTick(() => {
          let s = t / this.column >> 0, r = this.fwheight;
          (this.flyweight.scrollTop / r >> 0) + this.row - s - 1 > 0 || (this.flyweight.scrollTop = s * r, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        m(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = b(e.target, "scrollTop=>top");
      L(s, {
        height: this.realH,
        width: this.realW,
        /* 显示区域第一行的索引 */
        index: s.top / this.fwheight >> 0
        // ...this
      }, this.space, "mix"), e.from || t.push(["onscroll", s]);
      let r = !1;
      g(
        this.flyweights,
        (l, i, o, h, a, c, f, n) => {
          if (o = l / a >> 0, f = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < c % h) + (c / h >> 0)), n = f * a + l % a, n >= this.count) {
            r || (t.push(["onend"]), r = !0);
            return;
          }
          i.index = f, i.i = n, i.top = f * this.fwheight, i.data = this.flys[n], i.width = this.realW, i.height = this.realH;
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index
      ), this.trigger(t), t = null;
    },
    scroll(e) {
      this.run(e || { target: this.flyweight, from: "space" });
    },
    re() {
      let e = this.count || this.flys.length, t = this.flyweights;
      if (!e)
        return t.length = e;
      this.count = e;
      let s = this.flyweight, r = b(s, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let l = /true/.test(this.auto), [i, o] = this.offset, h = r.width, a = r.height, c = (C(this.width, h) || h) + i, f = C(this.height, a) + o;
        this.realH = f - o;
        let n = h / c >> 0 || 1, y = a / f >> 0, S = this.padding;
        this.row = y + 2, this.column = n, this.fwheight = f;
        let T, $ = 0;
        l ? (c = (h - i * (n + 2 * S - 1)) / n, T = !S * i, $ = S * i) : (T = 0, $ = (h % c + i * n) / (n + 1) >> 0, c -= i), this.realW = c, this.Height = Math.ceil(e / n) * f;
        let v = Math.min(e, n * this.row), w = v - 1, u, z, N;
        for (; v-- > 0; )
          u = w - v, N = this.flys[u], s = t[u], y = u / n >> 0, z = u % n, this.$set(t, u, {
            data: N,
            top: y * f,
            left: z * (c + T) + (z + 1) * $,
            index: y
          });
        t.length = w + 1;
        let H = [];
        a / f > w / n && H.push(["onend"]), this.scroll(), H.push(["update:space", {
          row: (w / n >> 0) + 1,
          column: n,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(H);
      });
    }
  }
};
function K(e, t, s, r, l, i) {
  return _(), x("div", {
    ref: "flyweight",
    class: E(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: p({
      "--width": l.realW + "px",
      "--height": l.realH + "px"
    }),
    onScroll: t[0] || (t[0] = (...o) => i.scroll && i.scroll(...o))
  }, [
    k("div", {
      class: "flyweight-all",
      style: p({
        "--flyweight-height": l.Height + "px"
      })
    }, [
      (_(!0), x(R, null, V(l.flyweights, (o, h) => (_(), x("div", {
        key: h,
        style: p({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        d(e.$slots, "default", D({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ], 4),
    l.flyweights.length ? d(e.$slots, "end", { key: 0 }, void 0, !0) : G("", !0)
  ], 38);
}
const Q = /* @__PURE__ */ I(J, [["render", K], ["__scopeId", "data-v-4f09502c"]]);
const X = {
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
      left: "0",
      style: {}
    };
  },
  computed: {
    style() {
      let e = {};
      return g(["BackGround", "Border", "Height", "Width", "Top", "Right", "BottoM", "Left"], (t, s) => {
        e["--" + s.replace(/[a-z]/g, "")] = O(this[s.toLowerCase()]);
      }), e;
    }
  },
  watch: {
    close: {
      handler(e) {
        this.change(e);
      },
      deep: !0
    },
    offset: {
      handler(e) {
        this.offser(e);
      },
      deep: !0
    }
  },
  methods: {
    exec: O,
    isEmpty: A,
    isSimplyType: W,
    change(e) {
      W(e) || (this.closecss = b(e, "color=>--s-card-close-color,*"));
    },
    offser(e) {
      e = M(e) ? e.split(/\s*(?:,|\s+)\s*/) : e;
      let t = b(e, "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left", !0);
      g(t, (s, r, l) => {
        l[s] = r + "px";
      }, t), L(this, t, !0);
    }
  },
  mounted() {
    this.change(this.close), this.offser(this.offset);
  }
}, Z = { class: "card-title" }, ee = { class: "card-content" };
function te(e, t, s, r, l, i) {
  return _(), x("div", {
    class: "card",
    style: p(i.style)
  }, [
    d(e.$slots, "default", {}, () => [
      d(e.$slots, "title", {}, () => [
        k("div", Z, [
          P(U(s.show || s.title) + " ", 1),
          k("div", {
            class: E(["card-close", { hide: i.isSimplyType(s.close) ? !s.close : !1 }]),
            style: p(l.closecss),
            onClick: t[0] || (t[0] = (o) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      d(e.$slots, "content", {}, () => [
        k("div", ee, [
          d(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const se = /* @__PURE__ */ I(X, [["render", te], ["__scopeId", "data-v-ca61ca3d"]]), ie = [Q, se], he = {
  install(e) {
    ie.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  se as Card,
  Q as Flyweight,
  he as default
};
