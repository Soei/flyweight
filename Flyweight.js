import { runer as p, isArray as D, each as x, merge as R, picker as _, isEmpty as P, isSimplyType as E, isString as U, format as X } from "@soei/util";
import { openBlock as S, createElementBlock as T, normalizeClass as j, normalizeStyle as z, createElementVNode as k, Fragment as Y, renderList as q, renderSlot as g, mergeProps as J, createCommentVNode as K, createTextVNode as Q, toDisplayString as Z } from "vue";
let ee = /(\d+|[+\-\*/]|%)/g, F = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, I = (e, t) => {
  let s;
  if (s = p("match", e, ee)) {
    let r = s.length, i, h = 0, l, n = [];
    for (; r--; )
      h = s.shift(), h in F ? (i && n.push(i), h === "%" && (n.length = 2), l = h) : +h && n.push(+h), n.length == 2 && (n.push(t), i = F[l].apply(null, n), n.length = 0);
    +i || (i = +n.pop()), e = i >> 0;
  }
  return e;
}, C = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const V = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [r, i] of t)
    s[r] = i;
  return s;
};
let W = (e) => e == null || e == null, te = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const se = {
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
      te(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: C,
    trigger(e, t) {
      this.lazyrun(() => {
        D(e) || (e = [[e, t]]), x(e, (s, r) => {
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
        let s = t.index || x(this.flys, (r, i, h, l) => {
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
      R(r, this.space), e.from || t.push(["onscroll", r]);
      let i = !1;
      x(
        this.flyweights,
        (h, l, n, c, u, a, d, f, o) => {
          if (n = h / u >> 0, f = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = f * u + h % u, o >= this.count) {
            i || (t.push(["onend"]), i = !0);
            return;
          }
          l.index = f, l.i = o, l.data = this.flys[o];
          let y = [
            /* top */
            f * this.expand + l.x,
            /* left */
            l.space
          ];
          d && y.reverse(), l.top = y[0], l.left = y[1];
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
      let s = this.scrollx, r = this.flyweight, i = _(r, this.BoxRule);
      this.$nextTick(() => {
        let h = /true/.test(this.auto), [l, n] = this.offset, c = i.width, u = i.height, a = (I(this.width, c) || c) + l, d = I(this.height, u) + n, f = [c / a >> 0 || 1, u / d >> 0 || 1];
        s && f.reverse();
        let [o, y] = f, v = this.padding, $, N = 0, m, B;
        s ? (m = a, a -= l, B = (w) => (
          /* 计算top偏移量 */
          w * (d - n) + (w + 1) * n
        )) : (h ? (a = (c - l * (o + 2 * v - 1)) / o, $ = !v * l, N = v * l) : ($ = 0, N = (c % a + l * o) / (o + 1) >> 0, a -= l), B = (w) => w * (a + $) + (w + 1) * N, m = d), this.row = y + 2, this.column = o, this.realH = d - n, this.realW = a, this.expand = m, this.Size = Math.ceil(e / o) * m;
        let L = Math.min(e, o * this.row), b = L - 1, H;
        for (; L-- > 0; )
          H = b - L, this.$set(t, H, {
            x: l,
            y: n,
            width: a,
            height: d - n,
            space: B(H % o),
            data: {}
          });
        t.length = b + 1;
        let A = [];
        u / m > b / o && A.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), A.push(["update:space", {
          row: (b / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(A);
      });
    }
  }
}, ie = { class: "flyweight-all" };
function le(e, t, s, r, i, h) {
  return S(), T("div", {
    ref: "flyweight",
    class: j(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: z({
      "--width": h.exec(i.realW),
      "--height": h.exec(i.realH),
      "--flyweight-content": h.exec(i.Size)
    }),
    onScroll: t[0] || (t[0] = (...l) => h.scroll && h.scroll(...l))
  }, [
    k("div", ie, [
      (S(!0), T(Y, null, q(i.flyweights, (l, n) => (S(), T("div", {
        key: n,
        style: z({
          top: l.top + "px",
          left: l.left + "px"
        })
      }, [
        g(e.$slots, "default", J({ ref_for: !0 }, l), void 0, !0)
      ], 4))), 128))
    ]),
    i.flyweights.length ? g(e.$slots, "end", { key: 0 }, void 0, !0) : K("", !0)
  ], 38);
}
const re = /* @__PURE__ */ V(se, [["render", le], ["__scopeId", "data-v-8f29f044"]]);
function O(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let G = {
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
}, he = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], M = {};
x(he, (e, t, s) => {
  e = O(t), M["--" + O(t, !0)] = e, s[e] = function() {
    this.trigger++;
  };
}, G);
const ne = {
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
  watch: G,
  methods: {
    exec: C,
    isEmpty: P,
    isSimplyType: E,
    tr() {
      let e = {};
      return this.margin(this.offset), x(M, (t, s) => {
        this.css(e, t, s);
      }), e;
    },
    tolower: O,
    css(e, t, s) {
      let r = this[s] || this.default[s];
      !r || this.default[s] == r || (e[t] = C(r));
    },
    change(e) {
      E(e) || (this.closecss = _(e, "color=>--s-card-close-color,*"));
    },
    margin(e) {
      R(this, _(
        U(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, oe = { class: "card-title" }, ae = { class: "card-content" };
function ce(e, t, s, r, i, h) {
  return S(), T("div", {
    class: "card",
    key: i.trigger,
    style: z(h.isEmpty(h.style) ? h.tr() : h.style)
  }, [
    g(e.$slots, "default", {}, () => [
      g(e.$slots, "title", {}, () => [
        k("div", oe, [
          Q(Z(s.show || s.title) + " ", 1),
          k("div", {
            class: j(["card-close", { hide: h.isSimplyType(s.close) ? !s.close : !1 }]),
            style: z(i.closecss),
            onClick: t[0] || (t[0] = (l) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      g(e.$slots, "content", {}, () => [
        k("div", ae, [
          g(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const ue = /* @__PURE__ */ V(ne, [["render", ce], ["__scopeId", "data-v-23ece4cb"]]), de = {
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
  render(e) {
    return e(
      this.type,
      {
        // ...item,
        props: {
          data: this.data
        }
      },
      this._l(this.T, (t, s) => {
        let r = _(t, "slot|name|type=>name").name, i = _(this, X("$scopedSlots.?|$slots.?|$scopedSlots.default=>?", r));
        return R(t, { index: s }), p(r, i, t);
      })
    );
  }
}, fe = [re, ue, de], ye = {
  install(e) {
    fe.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  ue as Card,
  re as Flyweight,
  de as Stream,
  ye as default
};
