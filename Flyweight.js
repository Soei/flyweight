import { runer as p, isArray as V, each as S, merge as A, picker as x, isEmpty as G, isSimplyType as F, isString as M, format as D } from "@soei/util";
import { openBlock as b, createElementBlock as k, normalizeClass as E, normalizeStyle as T, createElementVNode as v, Fragment as P, renderList as U, renderSlot as g, mergeProps as X, createCommentVNode as Y, createTextVNode as q, toDisplayString as J } from "vue";
let K = /(\d+|[+\-\*/]|%)/g, I = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, R = (e, t) => {
  let s;
  if (s = p("match", e, K)) {
    let r = s.length, i, h = 0, l, n = [];
    for (; r--; )
      h = s.shift(), h in I ? (i && n.push(i), h === "%" && (n.length = 2), l = h) : +h && n.push(+h), n.length == 2 && (n.push(t), i = I[l].apply(null, n), n.length = 0);
    +i || (i = +n.pop()), e = i >> 0;
  }
  return e;
}, O = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const j = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, i] of t)
    s[r] = i;
  return s;
};
let W = (e) => e == null || e == null, Q = (...e) => {
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
      Q(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: O,
    trigger(e, t) {
      this.lazyrun(() => {
        V(e) || (e = [[e, t]]), S(e, (s, r) => {
          this.$emit(r[0], W(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      p([this.cheackflys, (t) => {
        t = t || {};
        let s = t.index || S(this.flys, (r, i, h, l) => {
          if (i[h] == l)
            return r;
        }, t.picker, t.id);
        W(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      p([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * r, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        p(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = p(this.direction, e.target), r = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      A(r, this.space), e.from || t.push(["onscroll", r]);
      let i = !1;
      S(
        this.flyweights,
        (h, l, n, c, d, a, f, u, o) => {
          if (n = h / d >> 0, u = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = u * d + h % d, o >= this.count) {
            i || (t.push(["onend"]), i = !0);
            return;
          }
          l.index = u, l.i = o, l.data = this.flys[o];
          let y = [
            /* top */
            u * this.expand + l.x,
            /* left */
            l.space
          ];
          f && y.reverse(), l.top = y[0], l.left = y[1];
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
      let s = this.scrollx, r = this.flyweight, i = x(r, this.BoxRule);
      this.$nextTick(() => {
        let h = /true/.test(this.auto), [l, n] = this.offset, c = i.width, d = i.height, a = (R(this.width, c) || c) + l, f = R(this.height, d) + n, u = [c / a >> 0 || 1, d / f >> 0 || 1];
        s && u.reverse();
        let [o, y] = u, $ = this.padding, z, N = 0, m, B;
        s ? (m = a, a -= l, B = (w) => (
          /* 计算top偏移量 */
          w * (f - n) + (w + 1) * n
        )) : (h ? (a = (c - l * (o + 2 * $ - 1)) / o, z = !$ * l, N = $ * l) : (z = 0, N = (c % a + l * o) / (o + 1) >> 0, a -= l), B = (w) => w * (a + z) + (w + 1) * N, m = f), this.row = y + 2, this.column = o, this.realH = f - n, this.realW = a, this.expand = m, this.Size = Math.ceil(e / o) * m;
        let H = Math.min(e, o * this.row), _ = H - 1, L;
        for (; H-- > 0; )
          L = _ - H, this.$set(t, L, {
            x: l,
            y: n,
            width: a,
            height: f - n,
            space: B(L % o),
            data: {}
          });
        t.length = _ + 1;
        let C = [];
        d / m > _ / o && C.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), C.push(["update:space", {
          row: (_ / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(C);
      });
    }
  }
}, ee = { class: "flyweight-all" };
function te(e, t, s, r, i, h) {
  return b(), k("div", {
    ref: "flyweight",
    class: E(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: T({
      "--width": h.exec(i.realW),
      "--height": h.exec(i.realH),
      "--flyweight-content": h.exec(i.Size)
    }),
    onScroll: t[0] || (t[0] = (...l) => h.scroll && h.scroll(...l))
  }, [
    v("div", ee, [
      (b(!0), k(P, null, U(i.flyweights, (l, n) => (b(), k("div", {
        key: n,
        style: T({
          top: l.top + "px",
          left: l.left + "px"
        })
      }, [
        g(e.$slots, "default", X({ ref_for: !0 }, l), void 0, !0)
      ], 4))), 128))
    ]),
    i.flyweights.length ? g(e.$slots, "end", { key: 0 }, void 0, !0) : Y("", !0)
  ], 38);
}
const se = /* @__PURE__ */ j(Z, [["render", te], ["__scopeId", "data-v-8f29f044"]]);
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
      return this.margin(this.offset), S(["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], (t, s) => {
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
      F(e) || (this.closecss = x(e, "color=>--s-card-close-color,*"));
    },
    margin(e) {
      A(this, x(
        M(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, le = { class: "card-title" }, re = { class: "card-content" };
function he(e, t, s, r, i, h) {
  return b(), k("div", {
    class: "card",
    style: T(h.style)
  }, [
    g(e.$slots, "default", {}, () => [
      g(e.$slots, "title", {}, () => [
        v("div", le, [
          q(J(s.show || s.title) + " ", 1),
          v("div", {
            class: E(["card-close", { hide: h.isSimplyType(s.close) ? !s.close : !1 }]),
            style: T(i.closecss),
            onClick: t[0] || (t[0] = (l) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      g(e.$slots, "content", {}, () => [
        v("div", re, [
          g(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const ne = /* @__PURE__ */ j(ie, [["render", he], ["__scopeId", "data-v-def66c95"]]), oe = {
  name: "Stream",
  props: {
    type: {
      type: String,
      default: "div"
    },
    data: {
      type: Array,
      default: () => ({})
    },
    T: {
      type: Array,
      default: () => []
    }
  },
  render(e) {
    return e(
      this.type || "div",
      {
        // ...item,
        props: {
          data: this.data
        }
      },
      this._l(this.T, (t, s) => {
        let r = x(t, "slot|name=>name").name, i = x(this, D("$scopedSlots.?|$slots.?|$scopedSlots.default=>?", r));
        return A(t, { index: s }), p(r, i, t);
      })
    );
  }
}, ae = [se, ne, oe], fe = {
  install(e) {
    ae.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  ne as Card,
  se as Flyweight,
  oe as Stream,
  fe as default
};
