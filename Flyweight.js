import { runer as y, isArray as G, each as _, picker as z, merge as A, isEmpty as M, isSimplyType as I, isString as D } from "@soei/util";
import { openBlock as b, createElementBlock as k, normalizeClass as j, normalizeStyle as T, createElementVNode as S, Fragment as P, renderList as U, renderSlot as f, mergeProps as X, createCommentVNode as Y, createTextVNode as q, toDisplayString as J } from "vue";
let K = /(\d+|[+\-\*/]|%)/g, R = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, x = (e, t) => {
  let s;
  if (s = y("match", e, K)) {
    let h = s.length, l, i = 0, r, n = [];
    for (; h--; )
      i = s.shift(), i in R ? (l && n.push(l), i === "%" && (n.length = 2), r = i) : +i && n.push(+i), n.length == 2 && (n.push(t), l = R[r].apply(null, n), n.length = 0);
    +l || (l = +n.pop()), e = l >> 0;
  }
  return e;
}, W = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const V = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [h, l] of t)
    s[h] = l;
  return s;
};
let E = (e) => e == null || e == null, Q = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const Z = {
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
      Size: null,
      column: 1,
      row: 1,
      spacex: 10,
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
      Q(e);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = this.scrollx ? "clientHeight=>width,clientWidth=>height" : "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: W,
    trigger(e, t) {
      this.lazyrun(() => {
        G(e) || (e = [[e, t]]), _(e, (s, h) => {
          this.$emit(h[0], E(h[1]) ? !0 : h[1]);
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
        let s = t.index || _(this.flys, (h, l, i, r) => {
          if (l[i] == r)
            return h;
        }, t.picker, t.id);
        E(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      y([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, h = this.spacex;
          (this.flyweight[this.direction] / h >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * h, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = z(e.target, this.scrollx ? "scrollLeft=>top" : "scrollTop=>top");
      A(s, {
        height: this.realH,
        width: this.realW,
        /* 显示区域第一行的索引 */
        index: s.top / this.spacex >> 0
        // ...this
      }, this.space, "mix"), e.from || t.push(["onscroll", s]);
      let h = !1;
      _(
        this.flyweights,
        (l, i, r, n, u, d, c, a, o) => {
          if (r = l / u >> 0, a = r + n * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(r < d % n) + (d / n >> 0)), o = a * u + l % u, o >= this.count) {
            h || (t.push(["onend"]), h = !0);
            return;
          }
          i.index = a, i.i = o, i.data = this.flys[o];
          let p = [
            /* top */
            a * this.spacex + i.x,
            /* left */
            i.space
          ];
          c && p.reverse(), i.top = p[0], i.left = p[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index,
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
      let s = this.scrollx, h = this.flyweight, l = z(h, this.BoxRule);
      this.$nextTick(() => {
        let i = /true/.test(this.auto), [r, n] = this.offset, u = l.width, d = l.height, c = (x(this.width, u) || u) + r, a = x(this.height, d) + n, o = u / (s ? a : c) >> 0 || 1, p = d / (s ? c : a) >> 0, v = this.padding;
        this.row = p + 2, this.column = o;
        let w, $ = 0, N, B, H;
        s ? (w = 0, c = x(this.width, d) || d, B = c, N = c - r, H = (g) => (
          /* 计算左偏移量 */
          g * a + (g + 1) * n
        ), a = x(this.height, u) || u, a += n) : (i ? (c = (u - r * (o + 2 * v - 1)) / o, w = !v * r, $ = v * r) : (w = 0, $ = (u % c + r * o) / (o + 1) >> 0, c -= r), H = (g) => g * (c + w) + (g + 1) * $, N = c, B = a), this.realH = a - n, this.realW = N, this.spacex = B, this.Size = Math.ceil(e / o) * this.spacex;
        let L = Math.min(e, o * this.row), m = L - 1, C, F = 0;
        for (; L-- > 0; )
          C = m - L, F = C % o, this.$set(t, C, {
            x: r,
            y: n,
            width: c,
            height: a - n,
            space: H(F),
            data: {}
          });
        t.length = m + 1;
        let O = [];
        d / this.spacex > m / o && O.push(["onend"]), this.flyweight[this.direction] = 0, this.$nextTick(() => {
          this.setindex(this.selectIndex || 0);
        }), this.scroll(), O.push(["update:space", {
          row: (m / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(O);
      });
    }
  }
}, ee = { class: "flyweight-all" };
function te(e, t, s, h, l, i) {
  return b(), k("div", {
    ref: "flyweight",
    class: j(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: T({
      "--width": i.exec(l.realW),
      "--height": i.exec(l.realH),
      "--flyweight-content": i.exec(l.Size)
    }),
    onScroll: t[0] || (t[0] = (...r) => i.scroll && i.scroll(...r))
  }, [
    S("div", ee, [
      (b(!0), k(P, null, U(l.flyweights, (r, n) => (b(), k("div", {
        key: n,
        style: T({
          top: r.top + "px",
          left: r.left + "px"
        })
      }, [
        f(e.$slots, "default", X({ ref_for: !0 }, r), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? f(e.$slots, "end", { key: 0 }, void 0, !0) : Y("", !0)
  ], 38);
}
const se = /* @__PURE__ */ V(Z, [["render", te], ["__scopeId", "data-v-00424b62"]]);
const ie = {
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
      let e = {};
      return this.margin(this.offset), _(["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], (t, s) => {
        this.css(e, s);
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
        this.margin(e);
      },
      deep: !0
    }
  },
  methods: {
    exec: W,
    isEmpty: M,
    isSimplyType: I,
    tolower(e, t) {
      return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
    },
    css(e, t) {
      let s = this.tolower(t), h = this[s] || this.default[s];
      !h || this.default[s] == h || (e["--" + this.tolower(t, !0)] = W(h));
    },
    change(e) {
      I(e) || (this.closecss = z(e, "color=>--s-card-close-color,*"));
    },
    margin(e) {
      A(this, z(
        D(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, le = { class: "card-title" }, re = { class: "card-content" };
function he(e, t, s, h, l, i) {
  return b(), k("div", {
    class: "card",
    style: T(i.style)
  }, [
    f(e.$slots, "default", {}, () => [
      f(e.$slots, "title", {}, () => [
        S("div", le, [
          q(J(s.show || s.title) + " ", 1),
          S("div", {
            class: j(["card-close", { hide: i.isSimplyType(s.close) ? !s.close : !1 }]),
            style: T(l.closecss),
            onClick: t[0] || (t[0] = (r) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      f(e.$slots, "content", {}, () => [
        S("div", re, [
          f(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const ne = /* @__PURE__ */ V(ie, [["render", he], ["__scopeId", "data-v-def66c95"]]), oe = [se, ne], ue = {
  install(e) {
    oe.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  ne as Card,
  se as Flyweight,
  ue as default
};
