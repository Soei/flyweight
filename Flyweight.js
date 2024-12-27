import { runer as g, isArray as V, each as _, merge as E, picker as C, isEmpty as G, isSimplyType as F, isString as M } from "@soei/util";
import { openBlock as b, createElementBlock as k, normalizeClass as A, normalizeStyle as v, createElementVNode as S, Fragment as D, renderList as P, renderSlot as p, mergeProps as U, createCommentVNode as X, createTextVNode as Y, toDisplayString as q } from "vue";
let J = /(\d+|[+\-\*/]|%)/g, I = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, R = (e, t) => {
  let s;
  if (s = g("match", e, J)) {
    let r = s.length, l, h = 0, i, n = [];
    for (; r--; )
      h = s.shift(), h in I ? (l && n.push(l), h === "%" && (n.length = 2), i = h) : +h && n.push(+h), n.length == 2 && (n.push(t), l = I[i].apply(null, n), n.length = 0);
    +l || (l = +n.pop()), e = l >> 0;
  }
  return e;
}, O = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const j = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, l] of t)
    s[r] = l;
  return s;
};
let W = (e) => e == null || e == null, K = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const Q = {
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
      K(e);
    }
    this.scrollx = g("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: O,
    trigger(e, t) {
      this.lazyrun(() => {
        V(e) || (e = [[e, t]]), _(e, (s, r) => {
          this.$emit(r[0], W(r[1]) ? !0 : r[1]);
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
        let s = t.index || _(this.flys, (r, l, h, i) => {
          if (l[h] == i)
            return r;
        }, t.picker, t.id);
        W(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      g([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * r, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        g(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = g(this.direction, e.target), r = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      E(r, this.space), e.from || t.push(["onscroll", r]);
      let l = !1;
      _(
        this.flyweights,
        (h, i, n, a, d, c, u, f, o) => {
          if (n = h / d >> 0, f = n + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < c % a) + (c / a >> 0)), o = f * d + h % d, o >= this.count) {
            l || (t.push(["onend"]), l = !0);
            return;
          }
          i.index = f, i.i = o, i.data = this.flys[o];
          let y = [
            /* top */
            f * this.expand + i.x,
            /* left */
            i.space
          ];
          u && y.reverse(), i.top = y[0], i.left = y[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        r.index,
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
      let s = this.scrollx, r = this.flyweight, l = C(r, this.BoxRule);
      this.$nextTick(() => {
        let h = /true/.test(this.auto), [i, n] = this.offset, a = l.width, d = l.height, c = (R(this.width, a) || a) + i, u = R(this.height, d) + n, f = [a / c >> 0 || 1, d / u >> 0];
        s && f.reverse();
        let [o, y] = f, z = this.padding, T, $ = 0, w, N;
        s ? (w = c, c -= i, N = (m) => (
          /* 计算top偏移量 */
          m * (u - n) + (m + 1) * n
        )) : (h ? (c = (a - i * (o + 2 * z - 1)) / o, T = !z * i, $ = z * i) : (T = 0, $ = (a % c + i * o) / (o + 1) >> 0, c -= i), N = (m) => m * (c + T) + (m + 1) * $, w = u), this.row = y + 2, this.column = o, this.realH = u - n, this.realW = c, this.expand = w, this.Size = Math.ceil(e / o) * w;
        let B = Math.min(e, o * this.row), x = B - 1, H;
        for (; B-- > 0; )
          H = x - B, this.$set(t, H, {
            x: i,
            y: n,
            width: c,
            height: u - n,
            space: N(H % o),
            data: {}
          });
        t.length = x + 1;
        let L = [];
        d / w > x / o && L.push(["onend"]), g(this.direction, this.flyweight, 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0);
        }), this.scroll(), L.push(["update:space", {
          row: (x / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(L);
      });
    }
  }
}, Z = { class: "flyweight-all" };
function ee(e, t, s, r, l, h) {
  return b(), k("div", {
    ref: "flyweight",
    class: A(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: v({
      "--width": h.exec(l.realW),
      "--height": h.exec(l.realH),
      "--flyweight-content": h.exec(l.Size)
    }),
    onScroll: t[0] || (t[0] = (...i) => h.scroll && h.scroll(...i))
  }, [
    S("div", Z, [
      (b(!0), k(D, null, P(l.flyweights, (i, n) => (b(), k("div", {
        key: n,
        style: v({
          top: i.top + "px",
          left: i.left + "px"
        })
      }, [
        p(e.$slots, "default", U({ ref_for: !0 }, i), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? p(e.$slots, "end", { key: 0 }, void 0, !0) : X("", !0)
  ], 38);
}
const te = /* @__PURE__ */ j(Q, [["render", ee], ["__scopeId", "data-v-ec520e1e"]]);
const se = {
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
    exec: O,
    isEmpty: G,
    isSimplyType: F,
    tolower(e, t) {
      return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
    },
    css(e, t) {
      let s = this.tolower(t), r = this[s] || this.default[s];
      !r || this.default[s] == r || (e["--" + this.tolower(t, !0)] = O(r));
    },
    change(e) {
      F(e) || (this.closecss = C(e, "color=>--s-card-close-color,*"));
    },
    margin(e) {
      E(this, C(
        M(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ie = { class: "card-title" }, le = { class: "card-content" };
function re(e, t, s, r, l, h) {
  return b(), k("div", {
    class: "card",
    style: v(h.style)
  }, [
    p(e.$slots, "default", {}, () => [
      p(e.$slots, "title", {}, () => [
        S("div", ie, [
          Y(q(s.show || s.title) + " ", 1),
          S("div", {
            class: A(["card-close", { hide: h.isSimplyType(s.close) ? !s.close : !1 }]),
            style: v(l.closecss),
            onClick: t[0] || (t[0] = (i) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      p(e.$slots, "content", {}, () => [
        S("div", le, [
          p(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const he = /* @__PURE__ */ j(se, [["render", re], ["__scopeId", "data-v-def66c95"]]), ne = [te, he], ae = {
  install(e) {
    ne.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  he as Card,
  te as Flyweight,
  ae as default
};
