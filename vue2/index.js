import { runer as T, merge as E, isArray as Z, each as R, picker as W, isEmpty as tt, isSimplyType as U, isString as ht } from "@soei/util";
import { runer as g, each as X } from "@soei/tools";
import at from "@soei/picker";
let ct = /(\d+|[+\-\*/]|%)/g, G = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, D = (t, e) => {
  let i;
  if (i = T("match", t, ct)) {
    let s = i.length, l, a = 0, n, o = [];
    for (; s--; )
      a = i.shift(), a in G ? (l && o.push(l), a === "%" && (o.length = 2), n = a) : +a && o.push(+a), o.length == 2 && (o.push(e), l = G[n].apply(null, o), o.length = 0);
    +l || (l = +o.pop()), t = l >> 0;
  }
  return t;
}, V = {}, w = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  V[e] || (V[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function A(t, e, i, s, l, a, n, o) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), a && (r._scopeId = "data-v-" + a);
  var h;
  if (n ? (h = function(c) {
    c = c || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !c && typeof __VUE_SSR_CONTEXT__ < "u" && (c = __VUE_SSR_CONTEXT__), l && l.call(this, c), c && c._registeredComponents && c._registeredComponents.add(n);
  }, r._ssrRegister = h) : l && (h = o ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), h)
    if (r.functional) {
      r._injectStyles = h;
      var u = r.render;
      r.render = function(f, p) {
        return h.call(p), u(f, p);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, h) : [h];
    }
  return {
    exports: t,
    options: r
  };
}
let Y = (t) => t == null || t == null, ft = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const ut = {
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
    }
  },
  computed: {
    flyweight() {
      return this.$refs.flyweight || "";
    },
    style() {
      var t = this.w, e = this.h, i = this.Size, s = {};
      return E(s, {
        "--width": w(this.realW),
        "--height": w(this.realH),
        "--flyweight-content": w(i)
      }, e && {
        "--flyweight-h": w(e)
      }, t && s, {
        "--flyweight-w": w(t)
      }, "mix"), s;
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
    this.flyweights = [], this.$set || (this.$set = (t, e, i) => {
      t[e] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (t) {
      ft(t);
    }
    this.scrollx = T("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(t, e) {
      Z(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        R(t, (i, s) => {
          this.$emit(s[0], Y(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      T([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || R(this.flys, (s, l, a, n) => {
          if (l[a] == n)
            return s;
        }, e.picker, e.id);
        Y(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      T([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        T(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = T(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      E(s, this.space), t.from || e.push(["onscroll", s]);
      let l = !1;
      R(
        this.flyweights,
        (a, n, o, r, h, u, d, c, f) => {
          if (o = a / h >> 0, c = o + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(o < u % r) + (u / r >> 0)), f = c * h + a % h, f >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = c, n.i = f, n.data = this.flys[f];
          let p = [
            /* top */
            c * this.expand + n.x,
            /* left */
            n.space
          ];
          d && p.reverse(), n.top = p[0], n.left = p[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index,
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
      let i = this.scrollx, s = this.flyweight, l = W(s, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [n, o] = this.offset, r = l.width, h = l.height, u = (D(this.width, r) || r) + n, d = D(this.height, h) + o, c = [r / u >> 0 || 1, h / d >> 0 || 1];
        i && c.reverse();
        let [f, p] = c, b = this.padding, C, x = 0, _, y;
        i ? (_ = u, u -= n, y = (v) => (
          /* 计算top偏移量 */
          v * (d - o) + (v + 1) * o
        )) : (a ? (u = (r - n * (f + 2 * b - 1)) / f, C = !b * n, x = b * n) : (C = 0, x = (r % u + n * f) / (f + 1) >> 0, u -= n), y = (v) => v * (u + C) + (v + 1) * x, _ = d), this.row = p + 2, this.column = f, this.realH = d - o, this.realW = u, this.expand = _, this.Size = Math.ceil(t / f) * _;
        let S = Math.min(t, f * this.row), m = S - 1, $;
        for (; S-- > 0; )
          $ = m - S, this.$set(e, $, {
            x: n,
            y: o,
            width: u,
            height: d - o,
            space: y($ % f),
            data: {}
          });
        e.length = m + 1;
        let z = [];
        h / _ > m / f && z.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), z.push(["update:space", {
          row: (m / f >> 0) + 1,
          column: f,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(z);
      });
    }
  }
};
var dt = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: e.style, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, pt = [], gt = /* @__PURE__ */ A(
  ut,
  dt,
  pt,
  !1,
  null,
  "d5f1cd63",
  null,
  null
);
const _t = gt.exports;
function F(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let et = {
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
}, yt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], it = {};
R(
  yt,
  (t, e, i) => {
    t = F(e), it["--" + F(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  et
);
const mt = {
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
  watch: et,
  methods: {
    exec: w,
    isEmpty: tt,
    isSimplyType: U,
    tr() {
      let t = {};
      return this.margin(this.offset), R(it, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: F,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = w(s));
    },
    change(t) {
      U(t) || (this.closecss = W(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      E(
        this,
        W(
          ht(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
};
var vt = function() {
  var e = this, i = e._self._c;
  return i("div", { key: e.trigger, staticClass: "card", style: e.isEmpty(e.style) ? e.tr() : e.style }, [e._t("default", function() {
    return [e._t("title", function() {
      var s;
      return [i("div", { staticClass: "card-title" }, [e._v(" " + e._s(e.show || e.title) + " "), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, attrs: { title: (s = e.close) == null ? void 0 : s.tips }, on: { click: function(l) {
        return e.$emit("close");
      } } })])];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, wt = [], bt = /* @__PURE__ */ A(
  mt,
  vt,
  wt,
  !1,
  null,
  "ec96bb2a",
  null,
  null
);
const xt = bt.exports, St = {
  name: "Stream",
  computed: {
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return tt(i) ? [] : Z(i) ? i : [i];
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
      type: [Array, Object],
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
var $t = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.trigger(s), null, null, s);
  })], 2);
}, zt = [], Tt = /* @__PURE__ */ A(
  St,
  $t,
  zt,
  !1,
  null,
  null,
  null,
  null
);
const Ct = Tt.exports, q = /(?:\,|\|{2})/, H = "px", J = "";
let st = document.documentElement, K, Q = ["s-left", "s-top", "s-right", "s-bottom"], Nt = { left: 0, top: 1, right: 2, bottom: 3 };
const P = [];
var Rt = at(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let B = {}, rt = null;
Rt(B, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    rt = kt(() => {
      g(P);
    }, t), this._delay = t;
  }
});
B.delay = 60;
function kt(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, g(t, this, arguments));
  };
}
const L = () => {
  rt();
};
function Mt(t) {
  P.push(t);
}
const N = new ResizeObserver(L);
N.observe(st);
function nt(t) {
  t.onresize || (P.push([nt, null, t]), t.onresize = !0);
  var e = st, i = e.clientHeight, s = t.offset || 15, l = t.target, a = t.room, n = t.index, o = t.position, r = l.getBoundingClientRect(), h = a.offsetHeight + s, u = a.offsetWidth + s, d = "3,0,2,1".split(q), c, f = (r.height == K ? r.bottom - r.top : r.height) >> 0, p = (r.width == K ? r.right - r.left : r.width) >> 0, b = e.clientWidth - u, C = i - h, x = [
    /* left: 0 */
    r.left - u,
    /* top: 1 */
    r.top - h,
    /* right: 2 */
    b - r.right,
    /* bottom: 3 */
    C - r.bottom
  ];
  o && (X(
    o.split(q),
    function(lt, M, O, ot) {
      ot.push(O[M]);
    },
    Nt,
    c = []
  ), d.unshift.apply(d, c)), n = X(
    d,
    function(lt, M, O) {
      if (O[M] > 0)
        return M;
    },
    x
  );
  var _ = 0, y = 0, S = 0;
  if (n != null) {
    var m = n == 0 || n == 2, $ = n == 3 || n == 1;
    _ = $ ? Math.min(r.left, b) : n == 2 ? r.right + s : x[0], h -= s * +m;
    var z = Math.max(r.top, 0), v = Math.min(
      r.bottom,
      i
    ), I = (v - h + Math.min(i - h, z)) / 2;
    y = Math.max(
      m ? I : n == 3 ? r.top + f + s : Math.min(I, x[1]),
      0
    ), $ && r.left > b && (S = r.left - _ - s + p / 2);
  }
  let j = a.classList, k = t.css;
  j.remove(...Q), j.add(Q[n]), t.index = n, k.left = _ + H, k.top = y + H, k["--tips-position-top"] = m ? Math.max(
    s,
    Math.min(
      /* 底边距 */
      (Math.min(y + h, v) + Math.max(y, z)) / 2 - y + s / 2,
      /* 容器高度 - offset / 2 */
      h - 0.5 * s
    )
  ) + H : J, k["--tips-position-left"] = S ? Math.min(S, u - 3 * s) + H : J;
}
const Ht = {
  name: "Tips",
  props: {
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
      default: 10
    }
  },
  watch: {
    visible: function(t) {
      t && this.$nextTick(() => {
        this.init();
      });
    }
  },
  data() {
    return {
      css: {}
    };
  },
  methods: {
    parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), g(t, null, e, i), !i); )
        ;
    },
    attr(t, e, i) {
      return g(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      this.$el.nodeName != "#comment" && nt({
        onresize: !1,
        /* 监控的目标 */
        target: this.$el.parentNode,
        /* 显示的元素 */
        room: this.$el,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset
      });
    },
    scrollListener() {
      this.static || this.parent((t, e, i) => {
        e ? g(t.addEventListener, t, "scroll", L) : (g(N.observe, N, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, "-tips-scroll"), i || (g(t.addEventListener, t, "scroll", L), this.attr(t, "-tips-scroll", "true"))));
      });
    }
  },
  mounted() {
    E(
      this.css,
      W(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size"
      )
    ), this.init(), B.delay = +this.delay, Mt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", L), g(t.removeAttribute, t, "-tips-scroll", void 0), e || g(N.unobserve, N, t);
    });
  }
};
var Lt = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("title", function() {
    return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
  }), e._t("content", function() {
    return [e._v(e._s(e.content))];
  })], 2) : e._e();
}, Et = [], Wt = /* @__PURE__ */ A(
  Ht,
  Lt,
  Et,
  !1,
  null,
  "f3c84b5f",
  null,
  null
);
const At = Wt.exports, Ot = [_t, xt, Ct, At], It = {
  install(t) {
    Ot.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  xt as Card,
  _t as Flyweight,
  Ct as Stream,
  At as Tips,
  It as default
};
