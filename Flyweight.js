import { runer as y, merge as R, isArray as Y, each as S, picker as A, isEmpty as q, isSimplyType as I, isString as J } from "@soei/util";
import { openBlock as w, createElementBlock as b, normalizeClass as D, normalizeStyle as k, createElementVNode as T, Fragment as G, renderList as P, renderSlot as p, mergeProps as E, createCommentVNode as K, createTextVNode as Q, toDisplayString as Z, createBlock as tt, resolveDynamicComponent as et, withCtx as st } from "vue";
let it = /(\d+|[+\-\*/]|%)/g, W = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, j = (t, e) => {
  let s;
  if (s = y("match", t, it)) {
    let l = s.length, h, r = 0, i, n = [];
    for (; l--; )
      r = s.shift(), r in W ? (h && n.push(h), r === "%" && (n.length = 2), i = r) : +r && n.push(+r), n.length == 2 && (n.push(e), h = W[i].apply(null, n), n.length = 0);
    +h || (h = +n.pop()), t = h >> 0;
  }
  return t;
}, M = {}, u = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  M[e] || (M[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const F = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, h] of e)
    s[l] = h;
  return s;
};
let V = (t) => t == null || t == null, lt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const rt = {
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
    w: {
      type: [Number, String]
    },
    h: {
      type: [Number, String]
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
    },
    style() {
      var t = this.w, e = this.h, s = this.Size, l = {};
      return R(l, {
        "--width": u(this.realW),
        "--height": u(this.realH),
        "--flyweight-content": u(s)
      }, e && {
        "--flyweight-h": u(e)
      }, t && l, {
        "--flyweight-w": u(t)
      }, "mix"), l;
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
      lt(t);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: u,
    trigger(t, e) {
      Y(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        S(t, (s, l) => {
          this.$emit(l[0], V(l[1]) ? !0 : l[1]);
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
        let s = e.index || S(this.flys, (l, h, r, i) => {
          if (h[r] == i)
            return l;
        }, e.picker, e.id);
        V(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      y([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let s = e / this.column >> 0, l = this.expand;
          (this.flyweight[this.direction] / l >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * l, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        y(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = y(this.direction, t.target), l = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      R(l, this.space), t.from || e.push(["onscroll", l]);
      let h = !1;
      S(
        this.flyweights,
        (r, i, n, c, d, a, f, g, o) => {
          if (n = r / d >> 0, g = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = g * d + r % d, o >= this.count) {
            h || (e.push(["onend"]), h = !0);
            return;
          }
          i.index = g, i.i = o, i.data = this.flys[o];
          let m = [
            /* top */
            g * this.expand + i.x,
            /* left */
            i.space
          ];
          f && m.reverse(), i.top = m[0], i.left = m[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        l.index,
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
      let s = this.scrollx, l = this.flyweight, h = A(l, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [i, n] = this.offset, c = h.width, d = h.height, a = (j(this.width, c) || c) + i, f = j(this.height, d) + n, g = [c / a >> 0 || 1, d / f >> 0 || 1];
        s && g.reverse();
        let [o, m] = g, z = this.padding, v, N = 0, x, B;
        s ? (x = a, a -= i, B = (_) => (
          /* 计算top偏移量 */
          _ * (f - n) + (_ + 1) * n
        )) : (r ? (a = (c - i * (o + 2 * z - 1)) / o, v = !z * i, N = z * i) : (v = 0, N = (c % a + i * o) / (o + 1) >> 0, a -= i), B = (_) => _ * (a + v) + (_ + 1) * N, x = f), this.row = m + 2, this.column = o, this.realH = f - n, this.realW = a, this.expand = x, this.Size = Math.ceil(t / o) * x;
        let C = Math.min(t, o * this.row), $ = C - 1, L;
        for (; C-- > 0; )
          L = $ - C, this.$set(e, L, {
            x: i,
            y: n,
            width: a,
            height: f - n,
            space: B(L % o),
            data: {}
          });
        e.length = $ + 1;
        let H = [];
        d / x > $ / o && H.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), H.push(["update:space", {
          row: ($ / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(H);
      });
    }
  }
}, ht = { class: "flyweight-all" };
function nt(t, e, s, l, h, r) {
  return w(), b("div", {
    ref: "flyweight",
    class: D(["flyweight", {
      "flyweight-active": h.actice
    }]),
    style: k(r.style),
    onScroll: e[0] || (e[0] = (...i) => r.scroll && r.scroll(...i))
  }, [
    T("div", ht, [
      (w(!0), b(G, null, P(h.flyweights, (i, n) => (w(), b("div", {
        key: n,
        style: k({
          top: i.top + "px",
          left: i.left + "px"
        })
      }, [
        p(t.$slots, "default", E({ ref_for: !0 }, i), void 0, !0)
      ], 4))), 128))
    ]),
    h.flyweights.length ? p(t.$slots, "end", { key: 0 }, void 0, !0) : K("", !0)
  ], 38);
}
const ot = /* @__PURE__ */ F(rt, [["render", nt], ["__scopeId", "data-v-ae52e0f1"]]);
function O(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let U = {
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
}, at = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], X = {};
S(at, (t, e, s) => {
  t = O(e), X["--" + O(e, !0)] = t, s[t] = function() {
    this.trigger++;
  };
}, U);
const ct = {
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
      // style: {},
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
  watch: U,
  methods: {
    exec: u,
    isEmpty: q,
    isSimplyType: I,
    tr() {
      let t = {};
      return this.margin(this.offset), S(X, (e, s) => {
        this.css(t, e, s);
      }), t;
    },
    tolower: O,
    css(t, e, s) {
      let l = this[s] || this.default[s];
      !l || this.default[s] == l || (t[e] = u(l));
    },
    change(t) {
      I(t) || (this.closecss = A(t, "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"));
    },
    margin(t) {
      R(this, A(
        J(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ut = { class: "card-title" }, dt = { class: "card-content" };
function ft(t, e, s, l, h, r) {
  return w(), b("div", {
    class: "card",
    key: h.trigger,
    style: k(r.isEmpty(r.style) ? r.tr() : r.style)
  }, [
    p(t.$slots, "default", {}, () => [
      p(t.$slots, "title", {}, () => [
        T("div", ut, [
          Q(Z(s.show || s.title) + " ", 1),
          T("div", {
            class: D(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
            style: k(h.closecss),
            onClick: e[0] || (e[0] = (i) => t.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      p(t.$slots, "content", {}, () => [
        T("div", dt, [
          p(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const gt = /* @__PURE__ */ F(ct, [["render", ft], ["__scopeId", "data-v-4c41de24"]]), pt = {
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
  methods: {
    trigger(t) {
      let e = t.slot || t.type;
      return (this.$scopedSlots || this.$slots)[e] ? e : "default";
    }
  }
};
function yt(t, e, s, l, h, r) {
  return w(), tt(et(s.type), E(t.$attrs, { data: s.data }), {
    default: st(() => [
      (w(!0), b(G, null, P(s.T, (i) => p(t.$slots, r.trigger(i), E({
        key: i.type,
        ref_for: !0
      }, i))), 128))
    ]),
    _: 3
  }, 16, ["data"]);
}
const wt = /* @__PURE__ */ F(pt, [["render", yt]]), mt = [ot, gt, wt], St = {
  install(t) {
    mt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  gt as Card,
  ot as Flyweight,
  wt as Stream,
  St as default
};
