import { runer as p, isArray as X, each as _, merge as V, picker as H, isEmpty as Y, isSimplyType as F, isString as q } from "@soei/util";
import { openBlock as y, createElementBlock as S, normalizeClass as D, normalizeStyle as T, createElementVNode as k, Fragment as G, renderList as M, renderSlot as g, mergeProps as A, createCommentVNode as J, createTextVNode as K, toDisplayString as Q, createBlock as Z, resolveDynamicComponent as tt, withCtx as et } from "vue";
let st = /(\d+|[+\-\*/]|%)/g, I = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, s) => parseFloat(t) / 100 * s
}, W = (t, e) => {
  let s;
  if (s = p("match", t, st)) {
    let h = s.length, l, r = 0, i, n = [];
    for (; h--; )
      r = s.shift(), r in I ? (l && n.push(l), r === "%" && (n.length = 2), i = r) : +r && n.push(+r), n.length == 2 && (n.push(e), l = I[i].apply(null, n), n.length = 0);
    +l || (l = +n.pop()), t = l >> 0;
  }
  return t;
}, O = (t) => (t + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const E = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [h, l] of e)
    s[h] = l;
  return s;
};
let j = (t) => t == null || t == null, it = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const lt = {
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
      it(t);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: O,
    trigger(t, e) {
      this.lazyrun(() => {
        X(t) || (t = [[t, e]]), _(t, (s, h) => {
          this.$emit(h[0], j(h[1]) ? !0 : h[1]);
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
        let s = e.index || _(this.flys, (h, l, r, i) => {
          if (l[r] == i)
            return h;
        }, e.picker, e.id);
        j(s) || this.setindex(s);
      }], this, t);
    },
    setindex(t) {
      p([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let s = e / this.column >> 0, h = this.expand;
          (this.flyweight[this.direction] / h >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * h, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        p(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], s = p(this.direction, t.target), h = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      V(h, this.space), t.from || e.push(["onscroll", h]);
      let l = !1;
      _(
        this.flyweights,
        (r, i, n, c, u, a, d, f, o) => {
          if (n = r / u >> 0, f = n + c * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < a % c) + (a / c >> 0)), o = f * u + r % u, o >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          i.index = f, i.i = o, i.data = this.flys[o];
          let m = [
            /* top */
            f * this.expand + i.x,
            /* left */
            i.space
          ];
          d && m.reverse(), i.top = m[0], i.left = m[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        h.index,
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
      let s = this.scrollx, h = this.flyweight, l = H(h, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [i, n] = this.offset, c = l.width, u = l.height, a = (W(this.width, c) || c) + i, d = W(this.height, u) + n, f = [c / a >> 0 || 1, u / d >> 0 || 1];
        s && f.reverse();
        let [o, m] = f, $ = this.padding, v, z = 0, w, B;
        s ? (w = a, a -= i, B = (x) => (
          /* 计算top偏移量 */
          x * (d - n) + (x + 1) * n
        )) : (r ? (a = (c - i * (o + 2 * $ - 1)) / o, v = !$ * i, z = $ * i) : (v = 0, z = (c % a + i * o) / (o + 1) >> 0, a -= i), B = (x) => x * (a + v) + (x + 1) * z, w = d), this.row = m + 2, this.column = o, this.realH = d - n, this.realW = a, this.expand = w, this.Size = Math.ceil(t / o) * w;
        let N = Math.min(t, o * this.row), b = N - 1, C;
        for (; N-- > 0; )
          C = b - N, this.$set(e, C, {
            x: i,
            y: n,
            width: a,
            height: d - n,
            space: B(C % o),
            data: {}
          });
        e.length = b + 1;
        let L = [];
        u / w > b / o && L.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), L.push(["update:space", {
          row: (b / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(L);
      });
    }
  }
}, rt = { class: "flyweight-all" };
function ht(t, e, s, h, l, r) {
  return y(), S("div", {
    ref: "flyweight",
    class: D(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: T({
      "--width": r.exec(l.realW),
      "--height": r.exec(l.realH),
      "--flyweight-content": r.exec(l.Size)
    }),
    onScroll: e[0] || (e[0] = (...i) => r.scroll && r.scroll(...i))
  }, [
    k("div", rt, [
      (y(!0), S(G, null, M(l.flyweights, (i, n) => (y(), S("div", {
        key: n,
        style: T({
          top: i.top + "px",
          left: i.left + "px"
        })
      }, [
        g(t.$slots, "default", A({ ref_for: !0 }, i), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? g(t.$slots, "end", { key: 0 }, void 0, !0) : J("", !0)
  ], 38);
}
const nt = /* @__PURE__ */ E(lt, [["render", ht], ["__scopeId", "data-v-8f29f044"]]);
function R(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let P = {
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
}, ot = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], U = {};
_(ot, (t, e, s) => {
  t = R(e), U["--" + R(e, !0)] = t, s[t] = function() {
    this.trigger++;
  };
}, P);
const at = {
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
  watch: P,
  methods: {
    exec: O,
    isEmpty: Y,
    isSimplyType: F,
    tr() {
      let t = {};
      return this.margin(this.offset), _(U, (e, s) => {
        this.css(t, e, s);
      }), t;
    },
    tolower: R,
    css(t, e, s) {
      let h = this[s] || this.default[s];
      !h || this.default[s] == h || (t[e] = O(h));
    },
    change(t) {
      F(t) || (this.closecss = H(t, "color=>--s-card-close-color,*"));
    },
    margin(t) {
      V(this, H(
        q(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ct = { class: "card-title" }, ut = { class: "card-content" };
function dt(t, e, s, h, l, r) {
  return y(), S("div", {
    class: "card",
    key: l.trigger,
    style: T(r.isEmpty(r.style) ? r.tr() : r.style)
  }, [
    g(t.$slots, "default", {}, () => [
      g(t.$slots, "title", {}, () => [
        k("div", ct, [
          K(Q(s.show || s.title) + " ", 1),
          k("div", {
            class: D(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
            style: T(l.closecss),
            onClick: e[0] || (e[0] = (i) => t.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      g(t.$slots, "content", {}, () => [
        k("div", ut, [
          g(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const ft = /* @__PURE__ */ E(at, [["render", dt], ["__scopeId", "data-v-fcd6014d"]]), gt = {
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
function pt(t, e, s, h, l, r) {
  return y(), Z(tt(s.type), A(t.$attrs, { data: s.data }), {
    default: et(() => [
      (y(!0), S(G, null, M(s.T, (i) => g(t.$slots, r.trigger(i), A({
        key: i.type,
        ref_for: !0
      }, i))), 128))
    ]),
    _: 3
  }, 16, ["data"]);
}
const yt = /* @__PURE__ */ E(gt, [["render", pt]]), mt = [nt, ft, yt], _t = {
  install(t) {
    mt.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  ft as Card,
  nt as Flyweight,
  yt as Stream,
  _t as default
};
