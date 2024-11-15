import { isArray as F, each as m, runer as d, picker as z } from "@soei/util";
import { openBlock as x, createElementBlock as _, normalizeClass as O, normalizeStyle as b, createElementVNode as L, Fragment as W, renderList as E, renderSlot as T, createCommentVNode as S } from "vue";
const A = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [h, i] of e)
    s[h] = i;
  return s;
};
let H = (t) => t == null || t == null, B = /(\d+|[+\-\*/]|%)/g, N = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, $ = (t, e) => {
  let s;
  if (s = d("match", t, B)) {
    let h = s.length, i, l = 0, r, n = [];
    for (; h--; )
      l = s.shift(), l in N ? (i && n.push(i), l === "%" && (n.length = 2), r = l) : +l && n.push(+l), n.length == 2 && (n.push(e), i = N[r].apply(null, n), n.length = 0);
    +i || (i = +n.pop()), t = i >> 0;
  }
  return t;
}, C = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const I = {
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
      C(t);
    }
  },
  methods: {
    trigger(t, e) {
      this.lazyrun(() => {
        F(t) || (t = [[t, e]]), m(t, (s, h) => {
          this.$emit(h[0], H(h[1]) ? !0 : h[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      d([this.cheackflys, (e) => {
        e = e || {};
        let s = e.index || m(this.flys, (h, i, l, r) => {
          if (i[l] == r)
            return h;
        }, e.picker, e.id);
        H(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      d([this.cheackflys, ({ index: e }) => {
        this.$nextTick(() => {
          let s = e / this.column >> 0, h = this.fwheight;
          (this.flyweight.scrollTop / h >> 0) + this.row - s - 1 > 0 || (this.flyweight.scrollTop = s * h, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        d(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = z(t.target, "scrollTop=>top");
      m(
        this.flyweights,
        (s, h, i, l, r, n, u, o) => {
          if (i = s / r >> 0, u = i + l * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(i < n % l) + (n / l >> 0)), o = u * r + s % r, o >= this.count) {
            this.trigger("onend");
            return;
          }
          h.index = u, h.top = u * this.fwheight, h.data = this.flys[o];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        e.top / this.fwheight >> 0
      );
    },
    scroll(t) {
      this.run(t || { target: this.flyweight });
    },
    re() {
      let t = this.count || this.flys.length, e = this.flyweights;
      if (!t)
        return e.length = t;
      this.count = t;
      let s = this.flyweight, h = z(s, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let i = this.auto === !0, [l, r] = this.offset, n = h.width, u = h.height, o = ($(this.width, n) || n) + l, a = $(this.height, u) + r;
        this.realW = o - l, this.realH = a - r;
        let f = n / o >> 0 || 1, g = u / a >> 0;
        this.row = g + 2, this.column = f, this.fwheight = a;
        let k = n % o / (f - 1 * +!i) >> 0;
        i && (o = this.realW = (n / f >> 0) - l, k = l), this.Height = Math.ceil(t / f) * a;
        let y = Math.min(t, f * this.row), p = y - 1, c, v;
        for (; y-- > 0; )
          c = p - y, v = this.flys[c], s = e[c], g = c / f >> 0, this.$set(e, c, {
            data: v,
            top: g * a,
            left: c % f * (o + k),
            index: g
          });
        e.length = p + 1;
        let w = [];
        u / a > p && w.push(["onend"]), this.scroll(), w.push(["update:space", { row: (p / f >> 0) + 1, column: f }]), this.trigger(w);
      });
    }
  }
}, j = ["data"];
function M(t, e, s, h, i, l) {
  return x(), _("div", {
    ref: "flyweight",
    class: O(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: b({
      "--width": i.realW + "px",
      "--height": i.realH + "px"
    }),
    onScroll: e[0] || (e[0] = (...r) => l.scroll && l.scroll(...r))
  }, [
    L("div", {
      class: "flyweight-all",
      style: b({
        "--flyweight-height": i.Height + "px"
      })
    }, [
      (x(!0), _(W, null, E(i.flyweights, (r, n) => (x(), _("div", {
        key: n,
        data: r.top,
        style: b({
          top: r.top + "px",
          left: r.left + "px"
        })
      }, [
        T(t.$slots, "default", {
          data: r.data,
          index: r.index
        }, void 0, !0)
      ], 12, j))), 128))
    ], 4),
    i.flyweights.length ? T(t.$slots, "end", { key: 0 }, void 0, !0) : S("", !0)
  ], 38);
}
const R = /* @__PURE__ */ A(I, [["render", M], ["__scopeId", "data-v-1342d2cb"]]), V = [R], q = {
  install(t) {
    V.forEach((e) => {
      t.component("s-" + e.name.toLowerCase(), e);
    });
  }
};
export {
  R as Flyweight,
  q as default
};
