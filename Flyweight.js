import { runer as $, each as E, isEmpty as ct, picker as R, isSimplyType as tt, merge as P, isString as Et, isArray as U } from "@soei/util";
import { openBlock as z, createElementBlock as M, normalizeStyle as I, renderSlot as u, createElementVNode as L, createTextVNode as X, toDisplayString as G, normalizeProps as O, guardReactiveProps as Y, normalizeClass as ft, resolveComponent as Mt, Fragment as pt, renderList as gt, mergeProps as B, createVNode as Ct, withCtx as _t, createBlock as Ht, resolveDynamicComponent as Rt, withModifiers as Pt, createCommentVNode as Bt } from "vue";
import { runer as f, isNil as Wt, each as et, isString as At } from "@soei/tools";
import Ot from "@soei/picker";
let jt = /(\d+|[+\-\*/]|%)/g, it = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, st = (t, e) => {
  let i;
  if (i = $("match", t, jt)) {
    let r = i.length, n, s = 0, l, o = [];
    for (; r--; )
      s = i.shift(), s in it ? (n && o.push(n), s === "%" && (o.length = 2), l = s) : +s && o.push(+s), o.length == 2 && (o.push(e), n = it[l].apply(null, o), o.length = 0);
    +n || (n = +o.pop()), t = n >> 0;
  }
  return t;
}, rt = {}, S = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  rt[e] || (rt[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
const F = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [r, n] of e)
    i[r] = n;
  return i;
};
function q(t, e) {
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
}, It = [
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
  It,
  (t, e, i) => {
    t = q(e), yt["--" + q(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  mt
);
const Ft = {
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
      return $("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: mt,
  methods: {
    exec: S,
    isEmpty: ct,
    picker: R,
    runer: $,
    isSimplyType: tt,
    tr() {
      let t = {};
      return this.margin(this.offset), E(yt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: q,
    css(t, e, i) {
      let r = this[i] || this.default[i];
      !r || this.default[i] == r || (t[e] = S(r));
    },
    change(t) {
      tt(t) || (this.closecss = R(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      P(
        this,
        R(
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
}, Dt = {
  class: "card-title",
  space: ""
}, Vt = {
  class: "card-ico-items",
  vcenter: ""
}, Gt = ["title"], Yt = { class: "card-content" };
function qt(t, e, i, r, n, s) {
  return z(), M("div", {
    class: "card",
    key: n.trigger,
    style: I(s.isEmpty(s.style) ? s.tr() : s.style)
  }, [
    u(t.$slots, "default", {}, () => [
      u(t.$slots, "title", {}, () => [
        L("div", Dt, [
          u(t.$slots, "subtitle", {}, () => [
            X(G(s.sub), 1)
          ], !0),
          u(t.$slots, "icons", {}, () => [
            L("div", Vt, [
              u(t.$slots, "icon", O(Y({ el: t.$el, picker: s.picker, runer: s.runer })), void 0, !0),
              L("div", {
                class: ft(["card-close", { hide: s.isSimplyType(i.close) ? !i.close : !1 }]),
                style: I(n.closecss),
                onClick: e[0] || (e[0] = (l) => t.$emit("close")),
                title: s.tips
              }, null, 14, Gt)
            ])
          ], !0)
        ])
      ], !0),
      u(t.$slots, "content", {}, () => [
        L("div", Yt, [
          u(t.$slots, "inner", {}, void 0, !0)
        ])
      ], !0)
    ], !0)
  ], 4);
}
const bt = /* @__PURE__ */ F(Ft, [["render", qt], ["__scopeId", "data-v-1b917e35"]]);
let nt = (t) => t == null || t == null, Ut = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Xt = {
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
      return P(
        r,
        {
          "--width": S(this.realW),
          "--height": S(this.realH),
          "--flyweight-content": S(i)
        },
        e && {
          "--flyweight-h": S(e)
        },
        t && {
          "--flyweight-w": S(t)
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
      Ut(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: S,
    trigger(t, e) {
      U(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
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
      $(
        [
          this.cheackflys,
          (e) => {
            e = e || {};
            let i = e.index || E(
              this.flys,
              (r, n, s, l) => {
                if (n[s] == l)
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
      $(
        [
          this.cheackflys,
          ({ index: e }) => {
            this.selectIndex = e, this.$nextTick(() => {
              if (e < 0)
                return;
              let i = e / this.column >> 0, r = this.expand, n = this.flyweight[this.direction] / r >> 0;
              i > n && i < n + this.row - 2 || (this.flyweight[this.direction] = i * r - r / 2, this.scroll());
            });
          }
        ],
        this,
        { index: t }
      );
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        $(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = $(this.direction, t.target), r = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      P(r, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", r]));
      let n = !1;
      this.end = !1, this.__index = r.index, E(
        this.flyweights,
        (s, l, o, h, c, d, p, g, a) => {
          if (o = s / c >> 0, g = o + h * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < d % h) + /* 计算轮数, row的倍数 */
          (d / h >> 0)), a = g * c + s % c, a >= this.count) {
            n || (this.end = !0, e.push(["onend"]), n = !0);
            return;
          }
          l.index = g, l.i = a, l.data = this.flys[a];
          let k = [
            /* top */
            g * this.expand + l.x,
            /* left */
            l.space
          ];
          p && k.reverse(), l.top = k[0], l.left = k[1];
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
      let i = this.scrollx, r = this.flyweight, n = R(r, this.BoxRule);
      this.$nextTick(() => {
        let s = /true/.test(this.auto), [l, o] = this.offset, h = n.width, c = n.height, d = (st(this.width, h) || h) + l, p = st(this.height, c) + o, g = [h / d >> 0 || 1, c / p >> 0 || 1];
        i && g.reverse();
        let [a, k] = g, m = this.padding, w, C = 0, y, T;
        i ? (y = d, d -= l, T = (b) => (
          /* 计算top偏移量 */
          b * (p - o) + (b + 1) * o
        )) : (s ? (d = (h - l * (a + 2 * m - 1)) / a, w = !m * l, C = m * l) : (w = 0, C = h < d ? 0 : (h % d + l * a) / (a + 1) >> 0, d -= l), T = (b) => b * (d + w) + (b + 1) * C, y = p), this.row = k + 2, this.column = a, this.realH = p - o, this.realW = d, this.expand = y, this.Size = Math.ceil(t / a) * y;
        let N = Math.min(t, a * this.row), _ = N - 1, v;
        for (; N-- > 0; )
          v = _ - N, this.$set(e, v, {
            x: l,
            y: o,
            width: d,
            height: p - o,
            space: T(v % a),
            data: {}
          });
        e.length = _ + 1;
        let x = [];
        c / y > _ / a && x.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), x.push([
          "update:space",
          {
            row: (_ / a >> 0) + 1,
            column: a,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(x);
      });
    }
  }
}, Jt = { class: "flyweight-all" };
function Kt(t, e, i, r, n, s) {
  const l = Mt("Card");
  return z(), M("div", {
    ref: "flyweight",
    class: ft(["flyweight", {
      //   'flyweight-active': actice,
      "flyweight-empty": n.Size === 0,
      line: i.line && n.__top !== 0
    }]),
    style: I(s.style),
    onScroll: e[0] || (e[0] = (...o) => s.scroll && s.scroll(...o))
  }, [
    u(t.$slots, "title", O(Y(s.bridge)), void 0, !0),
    L("div", Jt, [
      (z(!0), M(pt, null, gt(n.flyweights, (o, h) => (z(), M("div", {
        key: h,
        style: I({
          top: o.top + "px",
          left: o.left + "px"
        })
      }, [
        u(t.$slots, "default", B({ ref_for: !0 }, o), void 0, !0)
      ], 4))), 128))
    ]),
    u(t.$slots, "mix", O(Y(s.bridge)), () => [
      n.flyweights.length ? u(t.$slots, "end", O(B({ key: 0 }, s.bridge)), void 0, !0) : u(t.$slots, "empty", { key: 1 }, () => [
        Ct(l, {
          height: "100% - 10px",
          width: "100%",
          center: "",
          nothing: "",
          vcenter: ""
        }, {
          default: _t(() => [...e[1] || (e[1] = [
            X(" 空~ ", -1)
          ])]),
          _: 1
        })
      ], !0)
    ], !0)
  ], 38);
}
const wt = /* @__PURE__ */ F(Xt, [["render", Kt], ["__scopeId", "data-v-0e5d0d75"]]), Qt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return ct(i) ? [] : U(i) ? i : [i];
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
    this.$.vnode.ref && P(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
function Zt(t, e, i, r, n, s) {
  return z(), Ht(Rt(i.type), B({ ref: "component" }, t.$attrs), {
    default: _t(() => [
      (z(!0), M(pt, null, gt(s.column, (l) => u(t.$slots, s.__trigger(l), B({
        key: l.type
      }, { ref_for: !0 }, l))), 128))
    ]),
    _: 3
  }, 16);
}
const vt = /* @__PURE__ */ F(Qt, [["render", Zt]]), lt = /(?:\,|\|{2})/, ot = "px", ht = "";
let xt = document.documentElement, at, dt = ["s-left", "s-top", "s-right", "s-bottom"], te = { left: 0, top: 1, right: 2, bottom: 3 };
const J = [];
var ee = Ot(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let K = {}, St = null;
ee(K, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    St = ie(() => {
      f(J);
    }, t), this._delay = t;
  }
});
K.delay = 60;
function ie(t, e) {
  let i = 0;
  return function() {
    const r = Date.now();
    r - i >= e && (i = r, f(t, this, arguments));
  };
}
const j = () => {
  St();
};
function se(t) {
  J.push(t);
}
const H = new ResizeObserver(j);
H.observe(xt);
function $t(t) {
  t.onresize || (J.push([$t, null, t]), t.onresize = !0);
  var e = xt, i = Wt(t.offset) ? 15 : t.offset, r = t.target, n = t.room, s = t.index, l = t.position, o = t.edge || 15, h = r.getBoundingClientRect(), c = n.offsetHeight + i, d = n.offsetWidth + i, p = "3,0,2,1".split(lt), g, a = h.left, k = h.top, m = Math.max(k, 0), w = (h.height == at ? h.bottom - h.top : h.height) >> 0, C = (h.width == at ? h.right - a : h.width) >> 0, y = e.clientWidth - d, T = e.clientHeight - c, N = [
    /* left: 0 */
    a - d,
    /* top: 1 */
    h.top - c,
    /* right: 2 */
    y - h.right,
    /* bottom: 3 */
    T - h.bottom
  ];
  l && (et(
    l.split(lt),
    function(W, A, D, Lt) {
      Lt.push(D[A]);
    },
    te,
    g = []
  ), p.unshift.apply(p, g)), s = et(
    p,
    function(W, A, D) {
      if (D[A] > 0)
        return A;
    },
    N
  );
  let _ = t.css;
  var v = 0, x = 0, b = 0, Q = 0;
  if (s != null) {
    var Nt = s == 0 || s == 2;
    if (s == 3 || s == 1)
      v = Math.min(
        a,
        y,
        a - (d - C) / 2 * 0.3
        /* 交集的偏移量 与 tLeft */
      ), b = Math.max(a - v + i, 5), x = s == 3 ? m + w : N[1];
    else {
      v = s == 2 ? h.right + i : N[0];
      var zt = m - (c - w) / 2 * 0.3;
      x = Math.min(m, T, Math.max(zt, m, 0)), Q = w > c ? c / 4 - 1 : Math.max(m - x + w / 4, 4);
    }
    _.left = Math.min(v, y) + ot, _.top = Math.min(x, T) + ot;
    let W = _["--tips-arrow-top"] = Q || ht;
    _["--tips-arrow-left"] = b || ht, _["--tips-arrow"] = b > d - o || Nt && (W + (c > 50 ? o : 0) > c || !W) ? "hidden" : "visible";
  }
  let Z = n.classList;
  Z.remove(...dt), Z.add(dt[s]), t.index = s;
}
const V = "data-tips-scroll", ut = 10, re = {
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
    _visible: function(t) {
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
      _visible: !1,
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
      t.nodeName != "#comment" && ($t({
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
        e ? f(t.addEventListener, t, "scroll", j) : (f(H.observe, H, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, V), i || (f(t.addEventListener, t, "scroll", j), this.__attr(t, V, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = R(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), P(t, e), t;
    },
    __2next() {
      this.target || (this.init(), K.delay = +this.delay, se((t) => {
        this.__2listener();
      }), this.__2listener());
    },
    // /* 显示 */
    // __visible(e) {
    //   runer("stopPropagation", e);
    //   this.$emit("toggle", (this._visible = true));
    // },
    // /* 隐藏 */
    // __hide() {
    //   if (!this._visible) return;
    //   this.$emit("toggle", (this._visible = false));
    // },
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
        f("stopPropagation", t), this.$emit("toggle", this._visible = !0);
      });
    },
    /* 隐藏 */
    __hide(t) {
      this.__debounce(() => {
        this._visible && this.$emit("toggle", this._visible = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(t) {
      f("stopPropagation", t), this.$emit("toggle", this._visible = !this._visible);
    },
    /* 触发事件 */
    __trigger(t) {
      if (At(t)) {
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
        this._visible = t;
    },
    _try(t) {
      let e = this._el__, i = this._event__;
      if (!i)
        return;
      U(i) || (i = [i]);
      let r = [];
      E(i, (n, s) => {
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
      f(t.removeEventListener, t, "scroll", j), f(t.removeAttribute, t, V, void 0), e || f(H.unobserve, H, t);
    });
  }
}, ne = ["static"], le = { class: "tips-title" };
function oe(t, e, i, r, n, s) {
  return n._visible ? (z(), M("div", B({ key: 0 }, t.$attrs, {
    class: ["tips", i.target ? "tips-" + i.position : ""],
    style: i.static ? null : n.css,
    static: i.static ? "" : null,
    onClick: e[0] || (e[0] = Pt(() => {
    }, ["stop"]))
  }), [
    u(t.$slots, "default", {}, () => [
      u(t.$slots, "title", {}, () => [
        L("div", le, G(i.title), 1)
      ], !0),
      u(t.$slots, "content", {}, () => [
        X(G(i.content), 1)
      ], !0)
    ], !0)
  ], 16, ne)) : Bt("", !0);
}
const kt = /* @__PURE__ */ F(re, [["render", oe], ["__scopeId", "data-v-a3a8bbe9"]]), he = {}, Tt = [];
Tt.push(bt, wt, vt, kt);
const fe = { Card: bt, Flyweight: wt, Stream: vt, Tips: kt };
he.install = function(t, e = {}) {
  Tt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  bt as Card,
  wt as Flyweight,
  vt as Stream,
  kt as Tips,
  fe as components,
  he as default
};
