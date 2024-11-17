import { isArray as F, each as x, runer as y, picker as z, merge as O } from "@soei/util";
import { openBlock as _, createElementBlock as b, normalizeClass as L, normalizeStyle as k, createElementVNode as W, Fragment as E, renderList as S, renderSlot as T, createCommentVNode as A } from "vue";
const B = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, s] of e)
    i[r] = s;
  return i;
};
let H = (t) => t == null || t == null, C = /(\d+|[+\-\*/]|%)/g, N = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, $ = (t, e) => {
  let i;
  if (i = y("match", t, C)) {
    let r = i.length, s, l = 0, n, h = [];
    for (; r--; )
      l = i.shift(), l in N ? (s && h.push(s), l === "%" && (h.length = 2), n = l) : +l && h.push(+l), h.length == 2 && (h.push(e), s = N[n].apply(null, h), h.length = 0);
    +s || (s = +h.pop()), t = s >> 0;
  }
  return t;
}, I = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const j = {
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.re(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      I(t);
    }
  },
  methods: {
    trigger(t, e) {
      this.lazyrun(() => {
        F(t) || (t = [[t, e]]), x(t, (i, r) => {
          this.$emit(r[0], H(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      y([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || x(this.flys, (r, s, l, n) => {
          if (s[l] == n)
            return r;
        }, e.picker, e.id);
        H(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      y([this.cheackflys, ({ index: e }) => {
        this.$nextTick(() => {
          let i = e / this.column >> 0, r = this.fwheight;
          (this.flyweight.scrollTop / r >> 0) + this.row - i - 1 > 0 || (this.flyweight.scrollTop = i * r, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = z(t.target, "scrollTop=>top");
      O(i, {
        height: this.realH,
        width: this.realW,
        /* 显示区域第一行的索引 */
        index: i.top / this.fwheight >> 0
        // ...this
      }, this.space, "mix"), t.from || e.push(["onscroll", i]), x(
        this.flyweights,
        (r, s, l, n, h, c, f, u) => {
          if (l = r / h >> 0, f = l + n * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(l < c % n) + (c / n >> 0)), u = f * h + r % h, u >= this.count) {
            e.push(["onend"]);
            return;
          }
          s.index = f, s.top = f * this.fwheight, s.data = this.flys[u];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        i.index
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
      let i = this.flyweight, r = z(i, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let s = this.auto === !0, [l, n] = this.offset, h = r.width, c = r.height, f = ($(this.width, h) || h) + l, u = $(this.height, c) + n;
        this.realH = u - n;
        let o = h / f >> 0 || 1, g = c / u >> 0;
        this.row = g + 2, this.column = o, this.fwheight = u;
        let d;
        s ? (f = (h / o >> 0) - l / o * (o - 1), d = l) : d = h % f / (o - 1) >> 0, this.realW = f, this.Height = Math.ceil(t / o) * u;
        let w = Math.min(t, o * this.row), p = w - 1, a, v;
        for (; w-- > 0; )
          a = p - w, v = this.flys[a], i = e[a], g = a / o >> 0, this.$set(e, a, {
            data: v,
            top: g * u,
            left: a % o * (f + d),
            index: g
          });
        e.length = p + 1;
        let m = [];
        c / u > p / o && m.push(["onend"]), this.scroll(), m.push(["update:space", {
          row: (p / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(m);
      });
    }
  }
};
function M(t, e, i, r, s, l) {
  return _(), b("div", {
    ref: "flyweight",
    class: L(["flyweight", {
      "flyweight-active": s.actice
    }]),
    style: k({
      "--width": s.realW + "px",
      "--height": s.realH + "px"
    }),
    onScroll: e[0] || (e[0] = (...n) => l.scroll && l.scroll(...n))
  }, [
    W("div", {
      class: "flyweight-all",
      style: k({
        "--flyweight-height": s.Height + "px"
      })
    }, [
      (_(!0), b(E, null, S(s.flyweights, (n, h) => (_(), b("div", {
        key: h,
        style: k({
          top: n.top + "px",
          left: n.left + "px"
        })
      }, [
        T(t.$slots, "default", {
          data: n.data,
          index: n.index
        }, void 0, !0)
      ], 4))), 128))
    ], 4),
    s.flyweights.length ? T(t.$slots, "end", { key: 0 }, void 0, !0) : A("", !0)
  ], 38);
}
const R = /* @__PURE__ */ B(j, [["render", M], ["__scopeId", "data-v-924b4e98"]]), V = [R], Y = {
  install(t) {
    V.forEach((e) => {
      t.component("s-" + e.name.toLowerCase(), e);
    });
  }
};
export {
  R as Flyweight,
  Y as default
};
