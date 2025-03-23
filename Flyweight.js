import { runer as p, isArray as V, each as b, merge as A, picker as x, isEmpty as G, isSimplyType as E, isString as M, format as D } from "@soei/util";
import { openBlock as S, createElementBlock as k, normalizeClass as W, normalizeStyle as T, createElementVNode as v, Fragment as P, renderList as U, renderSlot as g, mergeProps as X, createCommentVNode as Y, createTextVNode as q, toDisplayString as J } from "vue";
let K = /(\d+|[+\-\*/]|%)/g, F = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, I = (t, e) => {
  let s;
  if (s = p("match", t, K)) {
    let r = s.length, i, h = 0, l, n = [];
    for (; r--; )
      h = s.shift(), h in F ? (i && n.push(i), h === "%" && (n.length = 2), l = h) : +h && n.push(+h), n.length == 2 && (n.push(e), i = F[l].apply(null, n), n.length = 0);
    +i || (i = +n.pop()), t = i >> 0;
  }
  return t;
}, O = (t) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const j = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [r, i] of e)
    s[r] = i;
  return s;
};
let R = (t) => t == null || t == null, Q = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
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
      Q(t);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: O,
    trigger(t, e) {
      this.lazyrun(() => {
        V(t) || (t = [[t, e]]), b(t, (s, r) => {
          this.$emit(r[0], R(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      p([this.cheackflys, (e) => {
        e = e || {};
        let s = e.index || b(this.flys, (r, i, h, l) => {
          if (i[h] == l)
            return r;
        }, e.picker, e.id);
        R(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      p([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let s = e / this.column >> 0, r = this.expand;
          (this.flyweight[this.direction] / r >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * r, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        p(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = p(this.direction, t.target), r = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      A(r, this.space), t.from || e.push(["onscroll", r]);
      let i = !1;
      b(
        this.flyweights,
        (h, l, n, c, d, a, u, f, o) => {
          if (n = h / d >> 0, f = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = f * d + h % d, o >= this.count) {
            i || (e.push(["onend"]), i = !0);
            return;
          }
          l.index = f, l.i = o, l.data = this.flys[o];
          let y = [
            /* top */
            f * this.expand + l.x,
            /* left */
            l.space
          ];
          u && y.reverse(), l.top = y[0], l.left = y[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        r.index,
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
      let s = this.scrollx, r = this.flyweight, i = x(r, this.BoxRule);
      this.$nextTick(() => {
        let h = /true/.test(this.auto), [l, n] = this.offset, c = i.width, d = i.height, a = (I(this.width, c) || c) + l, u = I(this.height, d) + n, f = [c / a >> 0 || 1, d / u >> 0 || 1];
        s && f.reverse();
        let [o, y] = f, z = this.padding, $, N = 0, m, B;
        s ? (m = a, a -= l, B = (w) => (
          /* 计算top偏移量 */
          w * (u - n) + (w + 1) * n
        )) : (h ? (a = (c - l * (o + 2 * z - 1)) / o, $ = !z * l, N = z * l) : ($ = 0, N = (c % a + l * o) / (o + 1) >> 0, a -= l), B = (w) => w * (a + $) + (w + 1) * N, m = u), this.row = y + 2, this.column = o, this.realH = u - n, this.realW = a, this.expand = m, this.Size = Math.ceil(t / o) * m;
        let H = Math.min(t, o * this.row), _ = H - 1, L;
        for (; H-- > 0; )
          L = _ - H, this.$set(e, L, {
            x: l,
            y: n,
            width: a,
            height: u - n,
            space: B(L % o),
            data: {}
          });
        e.length = _ + 1;
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
}, tt = { class: "flyweight-all" };
function et(t, e, s, r, i, h) {
  return S(), k("div", {
    ref: "flyweight",
    class: W(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: T({
      "--width": h.exec(i.realW),
      "--height": h.exec(i.realH),
      "--flyweight-content": h.exec(i.Size)
    }),
    onScroll: e[0] || (e[0] = (...l) => h.scroll && h.scroll(...l))
  }, [
    v("div", tt, [
      (S(!0), k(P, null, U(i.flyweights, (l, n) => (S(), k("div", {
        key: n,
        style: T({
          top: l.top + "px",
          left: l.left + "px"
        })
      }, [
        g(t.$slots, "default", X({ ref_for: !0 }, l), void 0, !0)
      ], 4))), 128))
    ]),
    i.flyweights.length ? g(t.$slots, "end", { key: 0 }, void 0, !0) : Y("", !0)
  ], 38);
}
const st = /* @__PURE__ */ j(Z, [["render", et], ["__scopeId", "data-v-8f29f044"]]);
const it = {
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
      return this.tr();
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
    exec: O,
    isEmpty: G,
    isSimplyType: E,
    tr() {
      let t = {};
      return this.margin(this.offset), b(["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], (e, s) => {
        this.css(t, s);
      }), t;
    },
    tolower(t, e) {
      return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
    },
    css(t, e) {
      let s = this.tolower(e), r = this[s] || this.default[s];
      !r || this.default[s] == r || (t["--" + this.tolower(e, !0)] = O(r));
    },
    change(t) {
      E(t) || (this.closecss = x(t, "color=>--s-card-close-color,*"));
    },
    margin(t) {
      A(this, x(
        M(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, lt = { class: "card-title" }, rt = { class: "card-content" };
function ht(t, e, s, r, i, h) {
  return S(), k("div", {
    class: "card",
    style: T(h.isEmpty(h.style) ? h.tr() : h.style)
  }, [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => [
        v("div", lt, [
          q(J(s.show || s.title) + " ", 1),
          v("div", {
            class: W(["card-close", { hide: h.isSimplyType(s.close) ? !s.close : !1 }]),
            style: T(i.closecss),
            onClick: e[0] || (e[0] = (l) => t.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      g(t.$slots, "content", {}, () => [
        v("div", rt, [
          g(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const nt = /* @__PURE__ */ j(it, [["render", ht], ["__scopeId", "data-v-03bba61c"]]), ot = {
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
        let r = x(e, "slot|name|type=>name").name, i = x(this, D("$scopedSlots.?|$slots.?|$scopedSlots.default=>?", r));
        return A(e, { index: s }), p(r, i, e);
      })
    );
  }
}, at = [st, nt, ot], ut = {
  install(t) {
    at.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  nt as Card,
  st as Flyweight,
  ot as Stream,
  ut as default
};
