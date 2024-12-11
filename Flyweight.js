import { runer as w, isArray as L, each as m, picker as k, merge as $, isEmpty as j, isSimplyType as O, isString as A } from "@soei/util";
import { openBlock as _, createElementBlock as x, normalizeClass as E, normalizeStyle as g, createElementVNode as b, Fragment as B, renderList as V, renderSlot as d, createCommentVNode as D, createTextVNode as M, toDisplayString as R } from "vue";
let G = /(\d+|[+\-\*/]|%)/g, C = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, F = (t, e) => {
  let s;
  if (s = w("match", t, G)) {
    let h = s.length, i, l = 0, n, r = [];
    for (; h--; )
      l = s.shift(), l in C ? (i && r.push(i), l === "%" && (r.length = 2), n = l) : +l && r.push(+l), r.length == 2 && (r.push(e), console.log(r, n, "W"), i = C[n].apply(null, r), r.length = 0);
    +i || (i = +r.pop()), t = i >> 0;
  }
  return t;
}, U = (t) => t.replace(/\w+\((.*)\)/g, "$1").replace(/(?=\D)0(?!\w)/, "0px");
const I = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [h, i] of e)
    s[h] = i;
  return s;
};
let W = (t) => t == null || t == null, Y = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const q = {
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
        this.re(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Y(t);
    }
  },
  methods: {
    trigger(t, e) {
      this.lazyrun(() => {
        L(t) || (t = [[t, e]]), m(t, (s, h) => {
          this.$emit(h[0], W(h[1]) ? !0 : h[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      w([this.cheackflys, (e) => {
        e = e || {};
        let s = e.index || m(this.flys, (h, i, l, n) => {
          if (i[l] == n)
            return h;
        }, e.picker, e.id);
        W(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      w([this.cheackflys, ({ index: e }) => {
        this.$nextTick(() => {
          let s = e / this.column >> 0, h = this.fwheight;
          (this.flyweight.scrollTop / h >> 0) + this.row - s - 1 > 0 || (this.flyweight.scrollTop = s * h, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        w(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = k(t.target, "scrollTop=>top");
      $(s, {
        height: this.realH,
        width: this.realW,
        /* 显示区域第一行的索引 */
        index: s.top / this.fwheight >> 0
        // ...this
      }, this.space, "mix"), t.from || e.push(["onscroll", s]);
      let h = !1;
      m(
        this.flyweights,
        (i, l, n, r, u, f, c, o) => {
          if (n = i / u >> 0, c = n + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < f % r) + (f / r >> 0)), o = c * u + i % u, o >= this.count) {
            h || (e.push(["onend"]), h = !0);
            return;
          }
          l.index = c, l.top = c * this.fwheight, l.data = this.flys[o];
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
      let s = this.flyweight, h = k(s, "clientHeight=>height,clientWidth=>width");
      this.$nextTick(() => {
        let i = /true/.test(this.auto), [l, n] = this.offset, r = h.width, u = h.height, f = (F(this.width, r) || r) + l, c = F(this.height, u) + n;
        this.realH = c - n;
        let o = r / f >> 0 || 1, p = u / c >> 0;
        this.row = p + 2, this.column = o, this.fwheight = c;
        let v, H = 0;
        i ? (f = (r / o >> 0) - l / o * (o - 1), v = l) : (v = 0, H = l / (o + 1) * o + r % f / (o + 1) >> 0, f -= l), this.realW = f, this.Height = Math.ceil(t / o) * c;
        let S = Math.min(t, o * this.row), y = S - 1, a, T, N;
        for (; S-- > 0; )
          a = y - S, N = this.flys[a], s = e[a], p = a / o >> 0, T = a % o, this.$set(e, a, {
            data: N,
            top: p * c,
            left: T * (f + v) + (T + 1) * H,
            index: p
          });
        e.length = y + 1;
        let z = [];
        u / c > y / o && z.push(["onend"]), this.scroll(), z.push(["update:space", {
          row: (y / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(z);
      });
    }
  }
};
function J(t, e, s, h, i, l) {
  return _(), x("div", {
    ref: "flyweight",
    class: E(["flyweight", {
      "flyweight-active": i.actice
    }]),
    style: g({
      "--width": i.realW + "px",
      "--height": i.realH + "px"
    }),
    onScroll: e[0] || (e[0] = (...n) => l.scroll && l.scroll(...n))
  }, [
    b("div", {
      class: "flyweight-all",
      style: g({
        "--flyweight-height": i.Height + "px"
      })
    }, [
      (_(!0), x(B, null, V(i.flyweights, (n, r) => (_(), x("div", {
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
    i.flyweights.length ? d(t.$slots, "end", { key: 0 }, void 0, !0) : D("", !0)
  ], 38);
}
const K = /* @__PURE__ */ I(q, [["render", J], ["__scopeId", "data-v-292d1069"]]);
const P = {
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
    exec: U,
    isEmpty: j,
    isSimplyType: O,
    change(t) {
      O(t) || (this.closecss = k(t, "color=>--s-card-close-color,*"));
    },
    offser(t) {
      t = A(t) ? t.split(/\s*(?:,|\s+)\s*/) : t;
      let e = k(t, "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left", !0);
      m(e, (s, h, i) => {
        i[s] = h + "px";
      }, e), $(this, e, !0);
    }
  },
  mounted() {
    this.change(this.close), this.offser(this.offset);
  }
}, Q = { class: "card-title" }, X = { class: "card-content" };
function Z(t, e, s, h, i, l) {
  return _(), x("div", {
    class: "card",
    style: g({
      "--card-background-color": s.background,
      "--card-bw": s.border,
      "--card-height": l.exec(s.height),
      "--card-width": l.exec(s.width),
      "--top": i.top,
      "--right": i.right,
      "--bottom": i.bottom,
      "--left": i.left
    })
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        b("div", Q, [
          M(R(s.show || s.title) + " ", 1),
          b("div", {
            class: E(["card-close", { hide: l.isSimplyType(s.close) ? !s.close : !1 }]),
            style: g(i.closecss),
            onClick: e[0] || (e[0] = (n) => t.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        b("div", X, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const tt = /* @__PURE__ */ I(P, [["render", Z], ["__scopeId", "data-v-84f183dc"]]), et = [K, tt], lt = {
  install(t) {
    et.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  tt as Card,
  K as Flyweight,
  lt as default
};
