import { runer as k, each as E, isEmpty as ct, picker as P, isSimplyType as tt, merge as B, isString as Et, isArray as X, format as Mt } from "@soei/util";
import { openBlock as N, createElementBlock as C, normalizeStyle as D, renderSlot as d, createElementVNode as p, createTextVNode as W, toDisplayString as M, normalizeProps as j, guardReactiveProps as q, normalizeClass as ft, resolveComponent as Ht, Fragment as pt, renderList as gt, mergeProps as A, createVNode as Rt, withCtx as _t, createBlock as Pt, resolveDynamicComponent as Bt, withModifiers as Wt, createCommentVNode as At } from "vue";
import { runer as f, isNil as It, each as et, isString as Ot } from "@soei/tools";
import Vt from "@soei/picker";
let jt = /(\d+|[+\-\*/]|%)/g, it = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, st = (t, e) => {
  let i;
  if (i = k("match", t, jt)) {
    let r = i.length, l, s = 0, n, o = [];
    for (; r--; )
      s = i.shift(), s in it ? (l && o.push(l), s === "%" && (o.length = 2), n = s) : +s && o.push(+s), o.length == 2 && (o.push(e), l = it[n].apply(null, o), o.length = 0);
    +l || (l = +o.pop()), t = l >> 0;
  }
  return t;
}, rt = {}, $ = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  rt[e] || (rt[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const I = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, l] of e)
    i[r] = l;
  return i;
};
function U(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let mt = {
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
}, Ft = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], yt = {};
E(
  Ft,
  (t, e, i) => {
    t = U(e), yt["--" + U(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  mt
);
const Dt = {
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
      type: [String, Number],
      default: "100%"
    },
    width: {
      type: [String, Number],
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
    },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return k("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: mt,
  methods: {
    exec: $,
    isEmpty: ct,
    picker: P,
    runer: k,
    isSimplyType: tt,
    tr() {
      let t = {};
      return this.margin(this.offset), E(yt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: U,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = $(r));
    },
    change(t) {
      tt(t) || (this.closecss = P(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      B(
        this,
        P(
          Et(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, Gt = {
  class: "card-title",
  space: ""
}, Yt = {
  class: "card-ico-items",
  vcenter: ""
}, qt = ["title"], Ut = { class: "card-content" };
function Xt(t, e, i, r, l, s) {
  return N(), C("div", {
    class: "card",
    key: l.trigger,
    style: D(s.isEmpty(s.style) ? s.tr() : s.style)
  }, [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        p("div", Gt, [
          d(t.$slots, "subtitle", {}, () => [
            W(M(s.sub), 1)
          ], !0),
          d(t.$slots, "icons", {}, () => [
            p("div", Yt, [
              d(t.$slots, "icon", j(q({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              p("div", {
                class: ft(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: D(l.closecss),
                onClick: e[0] || (e[0] = (n) => t.$emit("close")),
                title: s.tips
              }, null, 14, qt)
            ])
          ], !0)
        ])
      ], !0),
      d(t.$slots, "content", {}, () => [
        p("div", Ut, [
          d(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const wt = /* @__PURE__ */ I(Dt, [["render", Xt], ["__scopeId", "data-v-1b917e35"]]);
let nt = (t) => t == null || t == null, Jt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Kt = {
  name: "Flyweight",
  props: {
    flys: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
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
      type: [String, Number],
      default: 0
    },
    left: {
      type: [String, Number],
      default: 0
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
    },
    line: {
      type: Boolean,
      default: !0
    },
    mix: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bridge() {
      return {
        /* 滚动方向 */
        scroll: this.scrollx ? "left" : "top",
        /* 数据量 */
        length: this.flys.length,
        // actice,
        column: this.column,
        expand: this.expand,
        width: this.realW,
        height: this.realH,
        /* 容器宽度或者高度 */
        content: this.Size,
        /* 当前顶部 */
        index: this.__index,
        row: this.row,
        /* 是否滚动到底部 */
        end: this.end
      };
    },
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, r = {};
      return B(
        r,
        {
          "--width": $(this.realW),
          "--height": $(this.realH),
          "--flyweight-content": $(i)
        },
        e && {
          "--flyweight-h": $(e)
        },
        t && {
          "--flyweight-w": $(t)
        },
        "mix"
      ), r;
    }
  },
  data() {
    return {
      flyweights: [],
      //   actice: false,
      Size: 0,
      column: 1,
      row: 1,
      expand: 10,
      count: 0,
      task: [],
      realW: 0,
      realH: 0,
      end: !1,
      __top: 0,
      __index: 0,
      scrollx: ""
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      Jt(t);
    }
    this.scrollx = k("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: $,
    trigger(t, e) {
      X(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        E(t, (i, r) => {
          this.$emit(r[0], nt(r[1]) ? !0 : r[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      k(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || E(
              this.flys,
              (r, l, s, n) => {
                if (l[s] == n)
                  return r;
              },
              e.picker,
              e.id
            );
            nt(i) || this.setindex(i);
          }
        ],
        this,
        t
      );
    },
    setindex(t) {
      k(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let i = e / this.column >> 0, r = this.expand, l = this.flyweight[this.direction] / r >> 0;
              i > l && i < l + this.row - 2 || (this.flyweight[this.direction] = i * r - r / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        k(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = k(this.direction, t.target), r = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      B(r, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", r]));
      let l = !1;
      this.end = !1, this.__index = r.index, E(
        this.flyweights,
        (s, n, o, h, c, u, g, _, a) => {
          if (o = s / c >> 0, _ = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < u % h) + /* 计算轮数, row的倍数 */
          (u / h >> 0)), a = _ * c + s % c, a >= this.count) {
            l || (this.end = !0, e.push(["onend"]), l = !0);
            return;
          }
          n.index = _, n.i = a, n.data = this.flys[a];
          let T = [
            /* top */
            _ * this.expand + n.x,
            /* left */
            n.space
          ];
          g && T.reverse(), n.top = T[0], n.left = T[1];
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
      let i = this.scrollx, r = this.flyweight, l = P(r, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [n, o] = this.offset, h = l.width, c = l.height, u = (st(this.width, h) || h) + n, g = st(this.height, c) + o, _ = [h / u >> 0 || 1, c / g >> 0 || 1];
        i && _.reverse();
        let [a, T] = _, y = this.padding, v, H = 0, w, z;
        i ? (w = u, u -= n, z = (b) => (
          /* 计算top偏移量 */
          b * (g - o) + (b + 1) * o
        )) : (s ? (u = (h - n * (a + 2 * y - 1)) / a, v = !y * n, H = y * n) : (v = 0, H = h < u ? 0 : (h % u + n * a) / (a + 1) >> 0, u -= n), z = (b) => b * (u + v) + (b + 1) * H, w = g), this.row = T + 2, this.column = a, this.realH = g - o, this.realW = u, this.expand = w, this.Size = Math.ceil(t / a) * w;
        let L = Math.min(t, a * this.row), m = L - 1, x;
        for (; L-- > 0; )
          x = m - L, this.$set(e, x, {
            x: n,
            y: o,
            width: u,
            height: g - o,
            space: z(x % a),
            data: {}
          });
        e.length = m + 1;
        let S = [];
        c / w > m / a && S.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), S.push([
          "update:space",
          {
            row: (m / a >> 0) + 1,
            column: a,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(S);
      });
    }
  }
}, Qt = { class: "flyweight-all" };
function Zt(t, e, i, r, l, s) {
  const n = Ht("Card");
  return N(), C("div", {
    ref: "flyweight",
    class: ft(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": l.Size === 0,
      line: i.line && l.__top !== 0
    }]),
    style: D(s.style),
    onScroll: e[0] || (e[0] = (...o) => s.scroll && s.scroll(...o))
  }, [
    d(t.$slots, "title", j(q(s.bridge)), void 0, !0),
    p("div", Qt, [
      (N(!0), C(pt, null, gt(l.flyweights, (o, h) => (N(), C("div", {
        key: h,
        style: D({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        d(t.$slots, "default", A({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    d(t.$slots, "mix", j(q(s.bridge)), () => [
      l.flyweights.length ? d(t.$slots, "end", j(A({ key: 0 }, s.bridge)), void 0, !0) : d(t.$slots, "empty", { key: 1 }, () => [
        Rt(n, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: _t(() => [...e[1] || (e[1] = [
            W(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const bt = /* @__PURE__ */ I(Kt, [["render", Zt], ["__scopeId", "data-v-0e5d0d75"]]);
const te = {
  name: "Input",
  emits: ["update:modelValue", "change", "focus"],
  data: function() {
    return {
      id: Mt("input-{1000-9999}-{1000-9999}")
    };
  },
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    type: {
      type: String,
      default: "text"
    },
    tips: {
      type: String,
      default: ""
    },
    maxlength: {
      type: Number,
      default: 50
    }
  }
}, ee = { class: "s-wrap" }, ie = ["id", "type", "value", "maxlength"], se = ["for"], re = {
  class: "placeholder",
  flex: ""
}, ne = {
  class: "s-wrap-tips",
  flex: ""
}, le = { class: "s-wrap-input forbidden" };
function oe(t, e, i, r, l, s) {
  return N(), C("div", ee, [
    p("input", {
      ref: "input",
      class: "s-wrap-input",
      placeholder: " ",
      autocomplete: "off",
      id: t.id,
      type: i.type,
      value: i.modelValue,
      maxlength: i.maxlength,
      onFocus: e[0] || (e[0] = (n) => t.$emit("focus", n)),
      onChange: e[1] || (e[1] = (n) => t.$emit("change", n.target.value)),
      onInput: e[2] || (e[2] = (n) => t.$emit("update:modelValue", n.target.value))
    }, null, 40, ie),
    p("label", {
      class: "s-wrap-label",
      for: t.id
    }, [
      d(t.$slots, "default", {}, () => [
        p("span", re, [
          d(t.$slots, "placeholder", {}, () => [
            d(t.$slots, "icon", { type: "placeholder" }, void 0, !0),
            W(" " + M(i.placeholder), 1)
          ], !0)
        ]),
        p("span", ne, [
          d(t.$slots, "tips", {}, () => [
            d(t.$slots, "icon", { type: "tips" }, void 0, !0),
            W(" " + M(i.tips || i.placeholder), 1)
          ], !0)
        ])
      ], !0)
    ], 8, se),
    p("span", {
      class: "s-wrap-close",
      onClick: e[3] || (e[3] = (n) => t.$emit("update:modelValue", ""))
    }, "×"),
    p("span", le, M(i.modelValue), 1)
  ]);
}
const vt = /* @__PURE__ */ I(te, [["render", oe], ["__scopeId", "data-v-84909c4c"]]), he = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return ct(i) ? [] : X(i) ? i : [i];
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
    columns: {
      type: [Object, Array],
      default: () => null
    },
    T: {
      type: [Array, Object],
      default: () => null
    }
  },
  mounted() {
    this.$.vnode.ref && B(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function ae(t, e, i, r, l, s) {
  return N(), Pt(Bt(i.type), A({ ref: "component" }, t.$attrs), {
    default: _t(() => [
      (N(!0), C(pt, null, gt(s.column, (n) => d(t.$slots, s.__trigger(n), A({
        key: n.type
      }, { ref_for: !0 }, n))), 128))
    ]),
    _: 3
  }, 16);
}
const xt = /* @__PURE__ */ I(he, [["render", ae]]), lt = /(?:\,|\|{2})/, ot = "px", ht = "";
let St = document.documentElement, at, dt = ["s-left", "s-top", "s-right", "s-bottom"], de = { left: 0, top: 1, right: 2, bottom: 3 };
const J = [];
var ue = Vt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let K = {}, $t = null;
ue(K, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    $t = ce(() => {
      f(J);
    }, t), this._delay = t;
  }
});
K.delay = 60;
function ce(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, f(t, this, arguments));
  };
}
const F = () => {
  $t();
};
function fe(t) {
  J.push(t);
}
const R = new ResizeObserver(F);
R.observe(St);
function kt(t) {
  t.onresize || (J.push([kt, null, t]), t.onresize = !0);
  var e = St, i = It(t.offset) ? 15 : t.offset, r = t.target, l = t.room, s = t.index, n = t.position, o = t.edge || 15, h = r.getBoundingClientRect(), c = l.offsetHeight + i, u = l.offsetWidth + i, g = "3,0,2,1".split(lt), _, a = h.left, T = h.top, y = Math.max(T, 0), v = (h.height == at ? h.bottom - h.top : h.height) >> 0, H = (h.width == at ? h.right - a : h.width) >> 0, w = e.clientWidth - u, z = e.clientHeight - c, L = [
    /* left: 0 */
    a - u,
    /* top: 1 */
    h.top - c,
    /* right: 2 */
    w - h.right,
    /* bottom: 3 */
    z - h.bottom
  ];
  n && (et(
    n.split(lt),
    function(O, V, G, Ct) {
      Ct.push(G[V]);
    },
    de,
    _ = []
  ), g.unshift.apply(g, _)), s = et(
    g,
    function(O, V, G) {
      if (G[V] > 0)
        return V;
    },
    L
  );
  let m = t.css;
  var x = 0, S = 0, b = 0, Q = 0;
  if (s != null) {
    var zt = s == 0 || s == 2;
    if (s == 3 || s == 1)
      x = Math.min(
        a,
        w,
        a - (u - H) / 2 * 0.3
        /* 交集的偏移量 与 tLeft */
      ), b = Math.max(a - x + i, 5), S = s == 3 ? y + v : L[1];
    else {
      x = s == 2 ? h.right + i : L[0];
      var Lt = y - (c - v) / 2 * 0.3;
      S = Math.min(y, z, Math.max(Lt, y, 0)), Q = v > c ? c / 4 - 1 : Math.max(y - S + v / 4, 4);
    }
    m.left = Math.min(x, w) + ot, m.top = Math.min(S, z) + ot;
    let O = m["--tips-arrow-top"] = Q || ht;
    m["--tips-arrow-left"] = b || ht, m["--tips-arrow"] = b > u - o || zt && (O + (c > 50 ? o : 0) > c || !O) ? "hidden" : "visible";
  }
  let Z = l.classList;
  Z.remove(...dt), Z.add(dt[s]), t.index = s;
}
const Y = "data-tips-scroll", ut = 10, pe = {
  name: "Tips",
  props: {
    /* 目标对象 */
    target: {
      type: [HTMLElement]
    },
    /* 是否显示 */
    visible: {
      type: [Boolean, String, Number],
      default: !0
    },
    /* 提示内容 */
    content: {
      type: String,
      default: ""
    },
    /* 提示标题 */
    title: {
      type: [String, Number],
      default: ""
    },
    /* 显示位置 */
    position: {
      type: String,
      default: "top"
    },
    /* tips容器的偏移量 */
    offset: {
      type: [String, Number],
      default: void 0
    },
    /* 字体大小 */
    fontSize: {
      type: [String, Number],
      default: void 0
    },
    /* 边框宽度 */
    border: {
      type: [String, Number],
      default: void 0
    },
    /* 边框和颜色 */
    color: {
      type: [String, Number],
      default: void 0
    },
    /* 背景色 */
    background: {
      type: [String, Number],
      default: void 0
    },
    /* 静态显示 */
    static: {
      type: Boolean,
      default: !1
    },
    delay: {
      type: [String, Number],
      default: ut
    },
    /* 显示箭头 */
    borderRadius: {
      type: [String, Number],
      default: 10
    }
  },
  watch: {
    proxy: function(t) {
      t && this.$nextTick(() => {
        this.init();
      });
    },
    visible: function(t) {
      this.__trigger(t);
    }
  },
  data() {
    return {
      css: {
        opacity: 0
      },
      proxy: !1,
      _event_mark: !1,
      _el__: null,
      _event__: null,
      _timeout__: null
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), f(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return f(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && (kt({
        onresize: !1,
        /* 监控的目标 */
        target: t.parentNode,
        /* 显示的元素 */
        room: t,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      }), this.css.opacity = 1);
    },
    __2listener() {
      this.static || this.__parent((t, e, i) => {
        e ? f(t.addEventListener, t, "scroll", F) : (f(R.observe, R, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, Y), i || (f(t.addEventListener, t, "scroll", F), this.__attr(t, Y, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = P(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), B(t, e), t;
    },
    __2next() {
      this.target || (this.init(), K.delay = +this.delay, fe((t) => {
        this.__2listener();
      }), this.__2listener());
    },
    __debounce(t) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(t, this, arguments);
        },
        this.delay === ut ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(t) {
      this.__debounce(() => {
        f("stopPropagation", t), this.$emit("toggle", this.proxy = !0);
      });
    },
    /* 隐藏 */
    __hide(t) {
      this.__debounce(() => {
        this.proxy && this.$emit("toggle", this.proxy = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(t) {
      f("stopPropagation", t), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(t) {
      if (Ot(t)) {
        if (this._event_mark)
          return;
        this._event_mark = !0, this._el__ = f("parentNode", this.$el), this._event__ = {
          hover: [
            /* 鼠标进入 */
            ["mouseenter", this.__visible],
            /* 鼠标离开 */
            ["mouseleave", this.__hide]
          ],
          click: [["click"], ["click", this.__hide, window]]
        }[t], this._try("addEventListener");
      } else
        this.proxy = t;
    },
    _try(t) {
      let e = this._el__, i = this._event__;
      if (!i)
        return;
      X(i) || (i = [i]);
      let r = [];
      E(i, (l, s) => {
        r.push([
          t,
          s[2] || e,
          s[0],
          s[1] || this.__toggle
        ]);
      }), f(r);
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next(), this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__parent(function(t, e) {
      f(t.removeEventListener, t, "scroll", F), f(t.removeAttribute, t, Y, void 0), e || f(R.unobserve, R, t);
    });
  }
}, ge = ["static"], _e = { class: "tips-title" };
function me(t, e, i, r, l, s) {
  return l.proxy ? (N(), C("div", A({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : l.css,
    static: i.static ? "" : null,
    onClick: e[0] || (e[0] = Wt(() => {
    }, ["stop"]))
  }), [
    d(t.$slots, "default", {}, () => [
      d(t.$slots, "title", {}, () => [
        p("div", _e, M(i.title), 1)
      ], !0),
      d(t.$slots, "content", {}, () => [
        W(M(i.content), 1)
      ], !0)
    ], !0)
  ], 16, ge)) : At("", !0);
}
const Nt = /* @__PURE__ */ I(pe, [["render", me], ["__scopeId", "data-v-b717238b"]]), ye = {}, Tt = [];
Tt.push(wt, bt, vt, xt, Nt);
const Se = { Card: wt, Flyweight: bt, Input: vt, Stream: xt, Tips: Nt };
ye.install = function(t, e = {}) {
  Tt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  wt as Card,
  bt as Flyweight,
  vt as Input,
  xt as Stream,
  Nt as Tips,
  Se as components,
  ye as default
};
