import { runer as y, merge as A, isArray as P, each as b, picker as H, isEmpty as V, isSimplyType as F, isString as J } from "@soei/util";
import { openBlock as m, createElementBlock as S, normalizeClass as D, normalizeStyle as k, createElementVNode as T, Fragment as G, renderList as U, renderSlot as p, mergeProps as X, createCommentVNode as K, createTextVNode as Q, toDisplayString as Z, createBlock as tt, resolveDynamicComponent as et, normalizeProps as st, guardReactiveProps as it, withCtx as lt } from "vue";
let rt = /(\d+|[+\-\*/]|%)/g, I = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, W = (t, e) => {
  let s;
  if (s = y("match", t, rt)) {
    let l = s.length, h, r = 0, i, n = [];
    for (; l--; )
      r = s.shift(), r in I ? (h && n.push(h), r === "%" && (n.length = 2), i = r) : +r && n.push(+r), n.length == 2 && (n.push(e), h = I[i].apply(null, n), n.length = 0);
    +h || (h = +n.pop()), t = h >> 0;
  }
  return t;
}, j = {}, u = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  j[e] || (j[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const E = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [l, h] of e)
    s[l] = h;
  return s;
};
let M = (t) => t == null || t == null, ht = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const nt = {
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
      return A(l, {
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
      ht(t);
    }
    this.scrollx = y("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: u,
    trigger(t, e) {
      P(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        b(t, (s, l) => {
          this.$emit(l[0], M(l[1]) ? !0 : l[1]);
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
        let s = e.index || b(this.flys, (l, h, r, i) => {
          if (h[r] == i)
            return l;
        }, e.picker, e.id);
        M(s) || this.setindex(s);
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
      A(l, this.space), t.from || e.push(["onscroll", l]);
      let h = !1;
      b(
        this.flyweights,
        (r, i, n, c, d, a, f, g, o) => {
          if (n = r / d >> 0, g = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = g * d + r % d, o >= this.count) {
            h || (e.push(["onend"]), h = !0);
            return;
          }
          i.index = g, i.i = o, i.data = this.flys[o];
          let w = [
            /* top */
            g * this.expand + i.x,
            /* left */
            i.space
          ];
          f && w.reverse(), i.top = w[0], i.left = w[1];
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
      let s = this.scrollx, l = this.flyweight, h = H(l, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [i, n] = this.offset, c = h.width, d = h.height, a = (W(this.width, c) || c) + i, f = W(this.height, d) + n, g = [c / a >> 0 || 1, d / f >> 0 || 1];
        s && g.reverse();
        let [o, w] = g, z = this.padding, v, N = 0, x, B;
        s ? (x = a, a -= i, B = (_) => (
          /* 计算top偏移量 */
          _ * (f - n) + (_ + 1) * n
        )) : (r ? (a = (c - i * (o + 2 * z - 1)) / o, v = !z * i, N = z * i) : (v = 0, N = (c % a + i * o) / (o + 1) >> 0, a -= i), B = (_) => _ * (a + v) + (_ + 1) * N, x = f), this.row = w + 2, this.column = o, this.realH = f - n, this.realW = a, this.expand = x, this.Size = Math.ceil(t / o) * x;
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
        let R = [];
        d / x > $ / o && R.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), R.push(["update:space", {
          row: ($ / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(R);
      });
    }
  }
}, ot = { class: "flyweight-all" };
function at(t, e, s, l, h, r) {
  return m(), S("div", {
    ref: "flyweight",
    class: D(["flyweight", {
      "flyweight-active": h.actice
    }]),
    style: k(r.style),
    onScroll: e[0] || (e[0] = (...i) => r.scroll && r.scroll(...i))
  }, [
    T("div", ot, [
      (m(!0), S(G, null, U(h.flyweights, (i, n) => (m(), S("div", {
        key: n,
        style: k({
          top: i.top + "px",
          left: i.left + "px"
        })
      }, [
        p(t.$slots, "default", X({ ref_for: !0 }, i), void 0, !0)
      ], 4))), 128))
    ]),
    h.flyweights.length ? p(t.$slots, "end", { key: 0 }, void 0, !0) : K("", !0)
  ], 38);
}
const ct = /* @__PURE__ */ E(nt, [["render", at], ["__scopeId", "data-v-ae52e0f1"]]);
function O(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let Y = {
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
}, ut = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], q = {};
b(
  ut,
  (t, e, s) => {
    t = O(e), q["--" + O(e, !0)] = t, s[t] = function() {
      this.trigger++;
    };
  },
  Y
);
const dt = {
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
  watch: Y,
  methods: {
    exec: u,
    isEmpty: V,
    isSimplyType: F,
    tr() {
      let t = {};
      return this.margin(this.offset), b(q, (e, s) => {
        this.css(t, e, s);
      }), t;
    },
    tolower: O,
    css(t, e, s) {
      let l = this[s] || this.default[s];
      !l || this.default[s] == l || (t[e] = u(l));
    },
    change(t) {
      F(t) || (this.closecss = H(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      A(
        this,
        H(
          J(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
          "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
          !0
        ),
        !0
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ft = { class: "card-title" }, gt = ["title"], pt = { class: "card-content" };
function yt(t, e, s, l, h, r) {
  return m(), S("div", {
    class: "card",
    key: h.trigger,
    style: k(r.isEmpty(r.style) ? r.tr() : r.style)
  }, [
    p(t.$slots, "default", {}, () => [
      p(t.$slots, "title", {}, () => {
        var i;
        return [
          T("div", ft, [
            Q(Z(s.show || s.title) + " ", 1),
            T("div", {
              class: D(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
              style: k(h.closecss),
              onClick: e[0] || (e[0] = (n) => t.$emit("close")),
              title: (i = s.close) == null ? void 0 : i.tips
            }, null, 14, gt)
          ])
        ];
      }, !0),
      p(t.$slots, "content", {}, () => [
        T("div", pt, [
          p(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const mt = /* @__PURE__ */ E(dt, [["render", yt], ["__scopeId", "data-v-c1ad1d74"]]), wt = {
  name: "Stream",
  computed: {
    column() {
      let { columns: t, T: e } = this, s = t || e;
      return V(s) ? [] : P(s) ? s : [s];
    }
  },
  props: {
    /* 桥接 指定数据字段为插槽名称 */
    bridge: {
      type: String,
      default: "slot"
    },
    type: {
      type: String,
      default: "div"
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: [Object, Array],
      default: () => null
    },
    T: {
      type: Array,
      default: () => null
    }
  },
  methods: {
    trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function xt(t, e, s, l, h, r) {
  return m(), tt(et(s.type), st(it(t.$attrs)), {
    default: lt(() => [
      (m(!0), S(G, null, U(r.column, (i) => p(t.$slots, r.trigger(i), X({
        key: i.type,
        ref_for: !0
      }, i))), 128))
    ]),
    _: 3
  }, 16);
}
const _t = /* @__PURE__ */ E(wt, [["render", xt]]), bt = [ct, mt, _t], Tt = {
  install(t) {
    bt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  mt as Card,
  ct as Flyweight,
  _t as Stream,
  Tt as default
};
