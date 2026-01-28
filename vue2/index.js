import { runer as z, merge as M, isArray as it, each as k, picker as L, isEmpty as st, isSimplyType as D, isString as ct } from "@soei/util";
import { runer as g, isNil as ut, each as G } from "@soei/tools";
import dt from "@soei/picker";
let pt = /(\d+|[+\-\*/]|%)/g, q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, V = (t, e) => {
  let i;
  if (i = z("match", t, pt)) {
    let s = i.length, l, a = 0, n, h = [];
    for (; s--; )
      a = i.shift(), a in q ? (l && h.push(l), a === "%" && (h.length = 2), n = a) : +a && h.push(+a), h.length == 2 && (h.push(e), l = q[n].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, Y = {}, w = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  Y[e] || (Y[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function W(t, e, i, s, l, a, n, h) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), a && (r._scopeId = "data-v-" + a);
  var o;
  if (n ? (o = function(f) {
    f = f || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !f && typeof __VUE_SSR_CONTEXT__ < "u" && (f = __VUE_SSR_CONTEXT__), l && l.call(this, f), f && f._registeredComponents && f._registeredComponents.add(n);
  }, r._ssrRegister = o) : l && (o = h ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (r.functional) {
      r._injectStyles = o;
      var u = r.render;
      r.render = function(c, p) {
        return o.call(p), u(c, p);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: t,
    options: r
  };
}
let J = (t) => t == null || t == null, gt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const _t = {
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
      return M(s, {
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
      gt(t);
    }
    this.scrollx = z("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(t, e) {
      it(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        k(t, (i, s) => {
          this.$emit(s[0], J(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      z([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || k(this.flys, (s, l, a, n) => {
          if (l[a] == n)
            return s;
        }, e.picker, e.id);
        J(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      z([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        z(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = z(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      M(s, this.space), t.from || e.push(["onscroll", s]);
      let l = !1;
      k(
        this.flyweights,
        (a, n, h, r, o, u, d, f, c) => {
          if (h = a / o >> 0, f = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < u % r) + (u / r >> 0)), c = f * o + a % o, c >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = f, n.i = c, n.data = this.flys[c];
          let p = [
            /* top */
            f * this.expand + n.x,
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
      let i = this.scrollx, s = this.flyweight, l = L(s, this.BoxRule);
      this.$nextTick(() => {
        let a = /true/.test(this.auto), [n, h] = this.offset, r = l.width, o = l.height, u = (V(this.width, r) || r) + n, d = V(this.height, o) + h, f = [r / u >> 0 || 1, o / d >> 0 || 1];
        i && f.reverse();
        let [c, p] = f, b = this.padding, T, x = 0, _, y;
        i ? (_ = u, u -= n, y = (S) => (
          /* 计算top偏移量 */
          S * (d - h) + (S + 1) * h
        )) : (a ? (u = (r - n * (c + 2 * b - 1)) / c, T = !b * n, x = b * n) : (T = 0, x = (r % u + n * c) / (c + 1) >> 0, u -= n), y = (S) => S * (u + T) + (S + 1) * x, _ = d), this.row = p + 2, this.column = c, this.realH = d - h, this.realW = u, this.expand = _, this.Size = Math.ceil(t / c) * _;
        let v = Math.min(t, c * this.row), m = v - 1, $;
        for (; v-- > 0; )
          $ = m - v, this.$set(e, $, {
            x: n,
            y: h,
            width: u,
            height: d - h,
            space: y($ % c),
            data: {}
          });
        e.length = m + 1;
        let N = [];
        o / _ > m / c && N.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), N.push(["update:space", {
          row: (m / c >> 0) + 1,
          column: c,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(N);
      });
    }
  }
};
var mt = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: e.style, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, yt = [], vt = /* @__PURE__ */ W(
  _t,
  mt,
  yt,
  !1,
  null,
  "d5f1cd63",
  null,
  null
);
const wt = vt.exports;
function F(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let rt = {
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
}, bt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], nt = {};
k(
  bt,
  (t, e, i) => {
    t = F(e), nt["--" + F(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  rt
);
const xt = {
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
  watch: rt,
  methods: {
    exec: w,
    isEmpty: st,
    isSimplyType: D,
    tr() {
      let t = {};
      return this.margin(this.offset), k(nt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: F,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = w(s));
    },
    change(t) {
      D(t) || (this.closecss = L(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      M(
        this,
        L(
          ct(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
var St = function() {
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
}, $t = [], Nt = /* @__PURE__ */ W(
  xt,
  St,
  $t,
  !1,
  null,
  "17093fb8",
  null,
  null
);
const zt = Nt.exports, Tt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return st(i) ? [] : it(i) ? i : [i];
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
    this.$.vnode.ref && M(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
var Ct = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ ref: "component", tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.__trigger(s), null, null, s);
  })], 2);
}, Rt = [], kt = /* @__PURE__ */ W(
  Tt,
  Ct,
  Rt,
  !1,
  null,
  null,
  null,
  null
);
const Mt = kt.exports, K = /(?:\,|\|{2})/, Q = "px", Z = "";
let lt = document.documentElement, tt, et = ["s-left", "s-top", "s-right", "s-bottom"], Ht = { left: 0, top: 1, right: 2, bottom: 3 };
const P = [];
var Et = dt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let B = {}, ot = null;
Et(B, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    ot = Lt(() => {
      g(P);
    }, t), this._delay = t;
  }
});
B.delay = 60;
function Lt(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, g(t, this, arguments));
  };
}
const E = () => {
  ot();
};
function Wt(t) {
  P.push(t);
}
const R = new ResizeObserver(E);
R.observe(lt);
function ht(t) {
  t.onresize || (P.push([ht, null, t]), t.onresize = !0);
  var e = lt, i = e.clientHeight, s = ut(t.offset) ? 15 : t.offset, l = t.target, a = t.room, n = t.index, h = t.position, r = l.getBoundingClientRect(), o = a.offsetHeight + s, u = a.offsetWidth + s, d = "3,0,2,1".split(K), f, c = (r.height == tt ? r.bottom - r.top : r.height) >> 0, p = (r.width == tt ? r.right - r.left : r.width) >> 0, b = e.clientWidth - u, T = i - o, x = [
    /* left: 0 */
    r.left - u,
    /* top: 1 */
    r.top - o,
    /* right: 2 */
    b - r.right,
    /* bottom: 3 */
    T - r.bottom
  ];
  h && (G(
    h.split(K),
    function(at, H, O, ft) {
      ft.push(O[H]);
    },
    Ht,
    f = []
  ), d.unshift.apply(d, f)), n = G(
    d,
    function(at, H, O) {
      if (O[H] > 0)
        return H;
    },
    x
  );
  var _ = 0, y = 0, v = 0;
  if (n != null) {
    var m = n == 0 || n == 2, $ = n == 3 || n == 1;
    _ = $ ? Math.min(r.left, b) : n == 2 ? r.right + s : x[0], o -= s * +m;
    var N = Math.max(r.top, 0), S = Math.min(
      r.bottom,
      i
    ), I = (S - o + Math.min(i - o, N)) / 2;
    y = Math.max(
      m ? I : n == 3 ? r.top + c + s : Math.min(I, x[1]),
      0
    ), $ && r.left > b && (v = r.left - _ - s + p / 2);
  }
  let j = a.classList, C = t.css;
  j.remove(...et), j.add(et[n]), t.index = n, C.left = _ + Q, C.top = y + Q;
  let U = C["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(y, N) - y,
    o - s
  ) : Z, X = u - 3 * s;
  C["--tips-arrow"] = v > X - 10 || m && (U + (o > 50 ? 15 : 0) > o || !U) ? "hidden" : "visible", C["--tips-arrow-left"] = v ? Math.min(v, X) : Z;
}
const A = "data-tips-scroll", Ot = {
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
    },
    /* 显示箭头 */
    borderRadius: {
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
      this.$el.nodeName != "#comment" && ht({
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
        offset: +this.offset >> 0
      });
    },
    scrollListener() {
      this.static || this.parent((t, e, i) => {
        e ? g(t.addEventListener, t, "scroll", E) : (g(R.observe, R, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.attr(t, A), i || (g(t.addEventListener, t, "scroll", E), this.attr(t, A, "true"))));
      });
    }
  },
  mounted() {
    M(
      this.css,
      L(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      )
    ), this.css["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0, this.init(), B.delay = +this.delay, Wt((t) => {
      this.scrollListener();
    }), this.scrollListener();
  },
  unmounted() {
    this.parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", E), g(t.removeAttribute, t, A, void 0), e || g(R.unobserve, R, t);
    });
  }
};
var At = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, Ft = [], Pt = /* @__PURE__ */ W(
  Ot,
  At,
  Ft,
  !1,
  null,
  "d4e2f8f1",
  null,
  null
);
const Bt = Pt.exports, It = [wt, zt, Mt, Bt], Dt = {
  install(t) {
    It.forEach((e) => {
      t.component("S" + e.name, e), t.component(e.name + "S", e);
    });
  }
};
export {
  zt as Card,
  wt as Flyweight,
  Mt as Stream,
  Bt as Tips,
  Dt as default
};
