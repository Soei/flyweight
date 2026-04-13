import { runer as $, each as k, isEmpty as it, picker as R, isSimplyType as U, merge as L, isString as gt, isArray as B } from "@soei/util";
import { runer as f, isNil as mt, each as X, isString as yt } from "@soei/tools";
import vt from "@soei/picker";
let bt = /(\d+|[+\-\*/]|%)/g, G = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, V = (t, e) => {
  let i;
  if (i = $("match", t, bt)) {
    let s = i.length, l, n = 0, o, h = [];
    for (; s--; )
      n = i.shift(), n in G ? (l && h.push(l), n === "%" && (h.length = 2), o = n) : +n && h.push(+n), h.length == 2 && (h.push(e), l = G[o].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, Y = {}, S = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  Y[e] || (Y[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function W(t, e, i, s, l, n, o, h) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), n && (r._scopeId = "data-v-" + n);
  var a;
  if (o ? (a = function(d) {
    d = d || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), l && l.call(this, d), d && d._registeredComponents && d._registeredComponents.add(o);
  }, r._ssrRegister = a) : l && (a = h ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), a)
    if (r.functional) {
      r._injectStyles = a;
      var c = r.render;
      r.render = function(u, p) {
        return a.call(p), c(u, p);
      };
    } else {
      var _ = r.beforeCreate;
      r.beforeCreate = _ ? [].concat(_, a) : [a];
    }
  return {
    exports: t,
    options: r
  };
}
function P(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let st = {
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
}, wt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], rt = {};
k(
  wt,
  (t, e, i) => {
    t = P(e), rt["--" + P(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  st
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
  watch: st,
  methods: {
    exec: S,
    isEmpty: it,
    picker: R,
    runer: $,
    isSimplyType: U,
    tr() {
      let t = {};
      return this.margin(this.offset), k(rt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: P,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = S(s));
    },
    change(t) {
      U(t) || (this.closecss = R(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      L(
        this,
        R(
          gt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [e._t("subtitle", function() {
        return [e._v(e._s(e.sub))];
      }), e._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [e._t("icon", null, null, { el: e.$el, picker: e.picker, runer: e.runer }), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, attrs: { title: e.tips }, on: { click: function(s) {
          return e.$emit("close");
        } } })], 2)];
      })], 2)];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, $t = [], Tt = /* @__PURE__ */ W(
  xt,
  St,
  $t,
  !1,
  null,
  "cbdbed88",
  null,
  null
);
const nt = Tt.exports;
let q = (t) => t == null || t == null, Nt = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const kt = {
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
      var t = this.w, e = this.h, i = this.Size, s = {};
      return L(
        s,
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
      ), s;
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
      Nt(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: S,
    trigger(t, e) {
      B(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        k(t, (i, s) => {
          this.$emit(s[0], q(s[1]) ? !0 : s[1]);
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
            let i = e.index || k(
              this.flys,
              (s, l, n, o) => {
                if (l[n] == o)
                  return s;
              },
              e.picker,
              e.id
            );
            q(i) || this.setindex(i);
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
              let i = e / this.column >> 0, s = this.expand, l = this.flyweight[this.direction] / s >> 0;
              i > l && i < l + this.row - 2 || (this.flyweight[this.direction] = i * s - s / 2, this.scroll());
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
      let e = [], i = $(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      L(s, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", s]));
      let l = !1;
      this.end = !1, this.__index = s.index, k(
        this.flyweights,
        (n, o, h, r, a, c, _, d, u) => {
          if (h = n / a >> 0, d = h + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(h < c % r) + /* 计算轮数, row的倍数 */
          (c / r >> 0)), u = d * a + n % a, u >= this.count) {
            l || (this.end = !0, e.push(["onend"]), l = !0);
            return;
          }
          o.index = d, o.i = u, o.data = this.flys[u];
          let p = [
            /* top */
            d * this.expand + o.x,
            /* left */
            o.space
          ];
          _ && p.reverse(), o.top = p[0], o.left = p[1];
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
      let i = this.scrollx, s = this.flyweight, l = R(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [o, h] = this.offset, r = l.width, a = l.height, c = (V(this.width, r) || r) + o, _ = V(this.height, a) + h, d = [r / c >> 0 || 1, a / _ >> 0 || 1];
        i && d.reverse();
        let [u, p] = d, m = this.padding, b, z = 0, y, T;
        i ? (y = c, c -= o, T = (v) => (
          /* 计算top偏移量 */
          v * (_ - h) + (v + 1) * h
        )) : (n ? (c = (r - o * (u + 2 * m - 1)) / u, b = !m * o, z = m * o) : (b = 0, z = r < c ? 0 : (r % c + o * u) / (u + 1) >> 0, c -= o), T = (v) => v * (c + b) + (v + 1) * z, y = _), this.row = p + 2, this.column = u, this.realH = _ - h, this.realW = c, this.expand = y, this.Size = Math.ceil(t / u) * y;
        let N = Math.min(t, u * this.row), g = N - 1, w;
        for (; N-- > 0; )
          w = g - N, this.$set(e, w, {
            x: o,
            y: h,
            width: c,
            height: _ - h,
            space: T(w % u),
            data: {}
          });
        e.length = g + 1;
        let x = [];
        a / y > g / u && x.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), x.push([
          "update:space",
          {
            row: (g / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(x);
      });
    }
  }
};
var zt = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    //   'flyweight-active': actice,
    "flyweight-empty": e.Size === 0,
    line: e.line && e.__top !== 0
  }, style: e.style, on: { scroll: e.scroll } }, [e._t("title", null, null, e.bridge), i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e._t("mix", function() {
    return [e.flyweights.length ? e._t("end", null, null, e.bridge) : e._t("empty", function() {
      return [i("Card", { attrs: { height: "100% - 10px", width: "100%", center: "", nothing: "", vcenter: "" } }, [e._v(" 空~ ")])];
    })];
  }, null, e.bridge)], 2);
}, Ct = [], Rt = /* @__PURE__ */ W(
  kt,
  zt,
  Ct,
  !1,
  null,
  "f62b1c5c",
  null,
  null
);
const lt = Rt.exports, Lt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return it(i) ? [] : B(i) ? i : [i];
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
    this.$.vnode.ref && L(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
var Et = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ ref: "component", tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.__trigger(s), null, null, s);
  })], 2);
}, Ht = [], Mt = /* @__PURE__ */ W(
  Lt,
  Et,
  Ht,
  !1,
  null,
  null,
  null,
  null
);
const ot = Mt.exports, J = /(?:\,|\|{2})/, K = "px", Q = "";
let ht = document.documentElement, Z, tt = ["s-left", "s-top", "s-right", "s-bottom"], Wt = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var At = vt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let j = {}, at = null;
At(j, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    at = Ot(() => {
      f(F);
    }, t), this._delay = t;
  }
});
j.delay = 60;
function Ot(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, f(t, this, arguments));
  };
}
const M = () => {
  at();
};
function Pt(t) {
  F.push(t);
}
const C = new ResizeObserver(M);
C.observe(ht);
function ut(t) {
  t.onresize || (F.push([ut, null, t]), t.onresize = !0);
  var e = ht, i = mt(t.offset) ? 15 : t.offset, s = t.target, l = t.room, n = t.index, o = t.position, h = t.edge || 15, r = s.getBoundingClientRect(), a = l.offsetHeight + i, c = l.offsetWidth + i, _ = "3,0,2,1".split(J), d, u = r.left, p = r.top, m = Math.max(p, 0), b = (r.height == Z ? r.bottom - r.top : r.height) >> 0, z = (r.width == Z ? r.right - u : r.width) >> 0, y = e.clientWidth - c, T = e.clientHeight - a, N = [
    /* left: 0 */
    u - c,
    /* top: 1 */
    r.top - a,
    /* right: 2 */
    y - r.right,
    /* bottom: 3 */
    T - r.bottom
  ];
  o && (X(
    o.split(J),
    function(E, H, A, pt) {
      pt.push(A[H]);
    },
    Wt,
    d = []
  ), _.unshift.apply(_, d)), n = X(
    _,
    function(E, H, A) {
      if (A[H] > 0)
        return H;
    },
    N
  );
  let g = t.css;
  var w = 0, x = 0, v = 0, I = 0;
  if (n != null) {
    var ft = n == 0 || n == 2;
    if (n == 3 || n == 1)
      w = Math.min(
        u,
        y,
        u - (c - z) / 2 * 0.3
        /* 交集的偏移量 与 tLeft */
      ), v = Math.max(u - w + i, 5), x = n == 3 ? m + b : N[1];
    else {
      w = n == 2 ? r.right + i : N[0];
      var _t = m - (a - b) / 2 * 0.3;
      x = Math.min(m, T, Math.max(_t, m, 0)), I = b > a ? a / 4 - 1 : Math.max(m - x + b / 4, 4);
    }
    g.left = Math.min(w, y) + K, g.top = Math.min(x, T) + K;
    let E = g["--tips-arrow-top"] = I || Q;
    g["--tips-arrow-left"] = v || Q, g["--tips-arrow"] = v > c - h || ft && (E + (a > 50 ? h : 0) > a || !E) ? "hidden" : "visible";
  }
  let D = l.classList;
  D.remove(...tt), D.add(tt[n]), t.index = n;
}
const O = "data-tips-scroll", et = 10, Bt = {
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
      default: et
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
      t.nodeName != "#comment" && (ut({
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
        e ? f(t.addEventListener, t, "scroll", M) : (f(C.observe, C, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, O), i || (f(t.addEventListener, t, "scroll", M), this.__attr(t, O, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = R(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), L(t, e), t;
    },
    __2next() {
      this.target || (this.init(), j.delay = +this.delay, Pt((t) => {
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
        this.delay === et ? 600 : this.delay
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
      if (yt(t)) {
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
      B(i) || (i = [i]);
      let s = [];
      k(i, (l, n) => {
        s.push([
          t,
          n[2] || e,
          n[0],
          n[1] || this.__toggle
        ]);
      }), f(s);
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next(), this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__parent(function(t, e) {
      f(t.removeEventListener, t, "scroll", M), f(t.removeAttribute, t, O, void 0), e || f(C.unobserve, C, t);
    });
  }
};
var Ft = function() {
  var e = this, i = e._self._c;
  return e._visible ? i("div", e._b({ staticClass: "tips", class: e.target ? "tips-" + e.position : "", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, jt = [], It = /* @__PURE__ */ W(
  Bt,
  Ft,
  jt,
  !1,
  null,
  "3312c88f",
  null,
  null
);
const ct = It.exports, Dt = {}, dt = [];
dt.push(nt, lt, ot, ct);
const Vt = { Card: nt, Flyweight: lt, Stream: ot, Tips: ct };
Dt.install = function(t, e = {}) {
  dt.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  nt as Card,
  lt as Flyweight,
  ot as Stream,
  ct as Tips,
  Vt as components,
  Dt as default
};
