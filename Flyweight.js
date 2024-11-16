import { isArray as F, each as x, runer as y, picker as z } from "@soei/util";
import { openBlock as _, createElementBlock as k, normalizeClass as O, normalizeStyle as v, createElementVNode as L, Fragment as E, renderList as S, renderSlot as T, createCommentVNode as W } from "vue";
const A = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [l, s] of e)
    i[l] = s;
  return i;
};
let H = (t) => t == null || t == null, B = /(\d+|[+\-\*/]|%)/g, N = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, $ = (t, e) => {
  let i;
  if (i = y("match", t, B)) {
    let l = i.length, s, h = 0, n, r = [];
    for (; l--; )
      h = i.shift(), h in N ? (s && r.push(s), h === "%" && (r.length = 2), n = h) : +h && r.push(+h), r.length == 2 && (r.push(e), s = N[n].apply(null, r), r.length = 0);
    +s || (s = +r.pop()), t = s >> 0;
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
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
        F(t) || (t = [[t, e]]), x(t, (i, l) => {
          this.$emit(l[0], H(l[1]) ? !0 : l[1]);
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
        let i = e.index || x(this.flys, (l, s, h, n) => {
          if (s[h] == n)
            return l;
        }, e.picker, e.id);
        H(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      y([this.cheackflys, ({ index: e }) => {
        this.$nextTick(() => {
          let i = e / this.column >> 0, l = this.fwheight;
          (this.flyweight.scrollTop / l >> 0) + this.row - i - 1 > 0 || (this.flyweight.scrollTop = i * l, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = z(t.target, "scrollTop=>top");
      x(
        this.flyweights,
        (i, l, s, h, n, r, u, f) => {
          if (s = i / n >> 0, u = s + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(s < r % h) + (r / h >> 0)), f = u * n + i % n, f >= this.count) {
            this.trigger("onend");
            return;
          }
          l.index = u, l.top = u * this.fwheight, l.data = this.flys[f];
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
      let i = this.flyweight, l = z(i, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let s = this.auto === !0, [h, n] = this.offset, r = l.width, u = l.height, f = ($(this.width, r) || r) + h, c = $(this.height, u) + n;
        this.realH = c - n;
        let o = r / f >> 0 || 1, g = u / c >> 0;
        this.row = g + 2, this.column = o, this.fwheight = c;
        let d;
        s ? (f = (r / o >> 0) - h / o * (o - 1), d = h) : d = r % f / (o - 1) >> 0, this.realW = f, this.Height = Math.ceil(t / o) * c;
        let w = Math.min(t, o * this.row), p = w - 1, a, b;
        for (; w-- > 0; )
          a = p - w, b = this.flys[a], i = e[a], g = a / o >> 0, this.$set(e, a, {
            data: b,
            top: g * c,
            left: a % o * (f + d),
            index: g
          });
        e.length = p + 1;
        let m = [];
        u / c > p / o && m.push(["onend"]), this.scroll(), m.push(["update:space", {
          row: (p / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(m);
      });
    }
  }
};
function j(t, e, i, l, s, h) {
  return _(), k("div", {
    ref: "flyweight",
    class: O(["flyweight", {
      "flyweight-active": s.actice
    }]),
    style: v({
      "--width": s.realW + "px",
      "--height": s.realH + "px"
    }),
    onScroll: e[0] || (e[0] = (...n) => h.scroll && h.scroll(...n))
  }, [
    L("div", {
      class: "flyweight-all",
      style: v({
        "--flyweight-height": s.Height + "px"
      })
    }, [
      (_(!0), k(E, null, S(s.flyweights, (n, r) => (_(), k("div", {
        key: r,
        style: v({
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
    s.flyweights.length ? T(t.$slots, "end", { key: 0 }, void 0, !0) : W("", !0)
  ], 38);
}
const M = /* @__PURE__ */ A(I, [["render", j], ["__scopeId", "data-v-f7462fc9"]]), R = [M], U = {
  install(t) {
    R.forEach((e) => {
      t.component("s-" + e.name.toLowerCase(), e);
    });
  }
};
export {
  M as Flyweight,
  U as default
};
