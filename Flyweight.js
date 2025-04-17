import { runer as p, isArray as X, each as _, merge as V, picker as H, isEmpty as Y, isSimplyType as F, isString as q } from "@soei/util";
import { openBlock as y, createElementBlock as b, normalizeClass as D, normalizeStyle as k, createElementVNode as T, Fragment as G, renderList as M, renderSlot as g, mergeProps as A, createCommentVNode as J, createTextVNode as K, toDisplayString as Q, createBlock as Z, resolveDynamicComponent as ee, withCtx as te } from "vue";
let se = /(\d+|[+\-\*/]|%)/g, I = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, s) => parseFloat(e) / 100 * s
}, W = (e, t) => {
  let s;
  if (s = p("match", e, se)) {
    let h = s.length, l, r = 0, i, n = [];
    for (; h--; )
      r = s.shift(), r in I ? (l && n.push(l), r === "%" && (n.length = 2), i = r) : +r && n.push(+r), n.length == 2 && (n.push(t), l = I[i].apply(null, n), n.length = 0);
    +l || (l = +n.pop()), e = l >> 0;
  }
  return e;
}, O = (e) => (e + "").replace(/\w+\((.*)\)/g, "$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g, "$1px");
const E = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [h, l] of t)
    s[h] = l;
  return s;
};
let j = (e) => e == null || e == null, ie = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const le = {
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
      ie(e);
    }
    this.scrollx = p("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: O,
    trigger(e, t) {
      X(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        _(e, (s, h) => {
          this.$emit(h[0], j(h[1]) ? !0 : h[1]);
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
        let s = t.index || _(this.flys, (h, l, r, i) => {
          if (l[r] == i)
            return h;
        }, t.picker, t.id);
        j(s) || this.setindex(s);
      }], this, e);
    },
    setindex(e) {
      p([this.cheackflys, ({ index: t }) => {
        this.selectIndex = t, this.$nextTick(() => {
          let s = t / this.column >> 0, h = this.expand;
          (this.flyweight[this.direction] / h >> 0) + this.row - s - 1 > 0 || (this.flyweight[this.direction] = s * h, this.scroll());
        });
      }], this, { index: e });
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        p(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], s = p(this.direction, e.target), h = {
        // ...this
        offset: s,
        top: s,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: s / this.expand >> 0
      };
      V(h, this.space), e.from || t.push(["onscroll", h]);
      let l = !1;
      _(
        this.flyweights,
        (r, i, n, a, u, c, d, f, o) => {
          if (n = r / u >> 0, f = n + a * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(n < c % a) + (c / a >> 0)), o = f * u + r % u, o >= this.count) {
            l || (t.push(["onend"]), l = !0);
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
      let s = this.scrollx, h = this.flyweight, l = H(h, this.BoxRule);
      this.$nextTick(() => {
        let r = /true/.test(this.auto), [i, n] = this.offset, a = l.width, u = l.height, c = (W(this.width, a) || a) + i, d = W(this.height, u) + n, f = [a / c >> 0 || 1, u / d >> 0 || 1];
        s && f.reverse();
        let [o, m] = f, z = this.padding, $, v = 0, w, B;
        s ? (w = c, c -= i, B = (x) => (
          /* 计算top偏移量 */
          x * (d - n) + (x + 1) * n
        )) : (r ? (c = (a - i * (o + 2 * z - 1)) / o, $ = !z * i, v = z * i) : ($ = 0, v = (a % c + i * o) / (o + 1) >> 0, c -= i), B = (x) => x * (c + $) + (x + 1) * v, w = d), this.row = m + 2, this.column = o, this.realH = d - n, this.realW = c, this.expand = w, this.Size = Math.ceil(e / o) * w;
        let N = Math.min(e, o * this.row), S = N - 1, C;
        for (; N-- > 0; )
          C = S - N, this.$set(t, C, {
            x: i,
            y: n,
            width: c,
            height: d - n,
            space: B(C % o),
            data: {}
          });
        t.length = S + 1;
        let L = [];
        u / w > S / o && L.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), L.push(["update:space", {
          row: (S / o >> 0) + 1,
          column: o,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(L);
      });
    }
  }
}, re = { class: "flyweight-all" };
function he(e, t, s, h, l, r) {
  return y(), b("div", {
    ref: "flyweight",
    class: D(["flyweight", {
      "flyweight-active": l.actice
    }]),
    style: k({
      "--width": r.exec(l.realW),
      "--height": r.exec(l.realH),
      "--flyweight-content": r.exec(l.Size)
    }),
    onScroll: t[0] || (t[0] = (...i) => r.scroll && r.scroll(...i))
  }, [
    T("div", re, [
      (y(!0), b(G, null, M(l.flyweights, (i, n) => (y(), b("div", {
        key: n,
        style: k({
          top: i.top + "px",
          left: i.left + "px"
        })
      }, [
        g(e.$slots, "default", A({ ref_for: !0 }, i), void 0, !0)
      ], 4))), 128))
    ]),
    l.flyweights.length ? g(e.$slots, "end", { key: 0 }, void 0, !0) : J("", !0)
  ], 38);
}
const ne = /* @__PURE__ */ E(le, [["render", he], ["__scopeId", "data-v-5ecef76b"]]);
function R(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let P = {
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
}, oe = ["BackGround", "BordeR", "Height", "Width", "Top", "Right", "Bottom", "Left"], U = {};
_(oe, (e, t, s) => {
  e = R(t), U["--" + R(t, !0)] = e, s[e] = function() {
    this.trigger++;
  };
}, P);
const ce = {
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
      let e = {};
      return this.margin(this.offset), _(U, (t, s) => {
        this.css(e, t, s);
      }), e;
    },
    tolower: R,
    css(e, t, s) {
      let h = this[s] || this.default[s];
      !h || this.default[s] == h || (e[t] = O(h));
    },
    change(e) {
      F(e) || (this.closecss = H(e, "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"));
    },
    margin(e) {
      V(this, H(
        q(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0
      ), !0);
    }
  },
  mounted() {
    this.change(this.close);
  }
}, ae = { class: "card-title" }, ue = { class: "card-content" };
function de(e, t, s, h, l, r) {
  return y(), b("div", {
    class: "card",
    key: l.trigger,
    style: k(r.isEmpty(r.style) ? r.tr() : r.style)
  }, [
    g(e.$slots, "default", {}, () => [
      g(e.$slots, "title", {}, () => [
        T("div", ae, [
          K(Q(s.show || s.title) + " ", 1),
          T("div", {
            class: D(["card-close", { hide: r.isSimplyType(s.close) ? !s.close : !1 }]),
            style: k(l.closecss),
            onClick: t[0] || (t[0] = (i) => e.$emit("close"))
          }, null, 6)
        ])
      ], !0),
      g(e.$slots, "content", {}, () => [
        T("div", ue, [
          g(e.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const fe = /* @__PURE__ */ E(ce, [["render", de], ["__scopeId", "data-v-4c41de24"]]), ge = {
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
    trigger(e) {
      let t = e.slot || e.type;
      return (this.$scopedSlots || this.$slots)[t] ? t : "default";
    }
  }
};
function pe(e, t, s, h, l, r) {
  return y(), Z(ee(s.type), A(e.$attrs, { data: s.data }), {
    default: te(() => [
      (y(!0), b(G, null, M(s.T, (i) => g(e.$slots, r.trigger(i), A({
        key: i.type,
        ref_for: !0
      }, i))), 128))
    ]),
    _: 3
  }, 16, ["data"]);
}
const ye = /* @__PURE__ */ E(ge, [["render", pe]]), me = [ne, fe, ye], _e = {
  install(e) {
    me.forEach((t) => {
      e.component("S" + t.name, t), e.component(t.name + "S", t);
    });
  }
};
export {
  fe as Card,
  ne as Flyweight,
  ye as Stream,
  _e as default
};
