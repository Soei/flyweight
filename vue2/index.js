import { runer as $, each as R, isEmpty as tt, picker as k, isSimplyType as U, merge as H, isString as pt, isArray as et } from "@soei/util";
import { runer as g, isNil as _t, each as X } from "@soei/tools";
import gt from "@soei/picker";
let mt = /(\d+|[+\-\*/]|%)/g, D = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, G = (t, e) => {
  let i;
  if (i = $("match", t, mt)) {
    let s = i.length, l, n = 0, o, h = [];
    for (; s--; )
      n = i.shift(), n in D ? (l && h.push(l), n === "%" && (h.length = 2), o = n) : +n && h.push(+n), h.length == 2 && (h.push(e), l = D[o].apply(null, h), h.length = 0);
    +l || (l = +h.pop()), t = l >> 0;
  }
  return t;
}, V = {}, S = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  V[e] || (V[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
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
      var f = r.beforeCreate;
      r.beforeCreate = f ? [].concat(f, a) : [a];
    }
  return {
    exports: t,
    options: r
  };
}
function B(t, e) {
  return e && (t = t.replace(/[a-z]/g, "")), t.toLowerCase();
}
let it = {
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
], st = {};
R(
  yt,
  (t, e, i) => {
    t = B(e), st["--" + B(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  it
);
const wt = {
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
    },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return $("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: it,
  methods: {
    exec: S,
    isEmpty: tt,
    picker: k,
    runer: $,
    isSimplyType: U,
    tr() {
      let t = {};
      return this.margin(this.offset), R(st, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: B,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = S(s));
    },
    change(t) {
      U(t) || (this.closecss = k(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      H(
        this,
        k(
          pt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
}, bt = [], xt = /* @__PURE__ */ W(
  wt,
  vt,
  bt,
  !1,
  null,
  "25654ded",
  null,
  null
);
const rt = xt.exports;
let q = (t) => t == null || t == null, St = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const $t = {
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
        index: this.index,
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
      return H(
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
      index: 0,
      end: !1,
      __top: 0
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
      St(t);
    }
    this.scrollx = $("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: S,
    trigger(t, e) {
      et(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        R(t, (i, s) => {
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
            let i = e.index || R(
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
              let i = e / this.column >> 0, s = this.expand;
              (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
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
      H(s, this.space), t.from || (!this.line || (this.__top = i), e.push(["onscroll", s]));
      let l = !1;
      this.end = !1, this.index = s.index, R(
        this.flyweights,
        (n, o, h, r, a, c, f, d, u) => {
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
          f && p.reverse(), o.top = p[0], o.left = p[1];
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
      let i = this.scrollx, s = this.flyweight, l = k(s, this.BoxRule);
      this.$nextTick(() => {
        let n = /true/.test(this.auto), [o, h] = this.offset, r = l.width, a = l.height, c = (G(this.width, r) || r) + o, f = G(this.height, a) + h, d = [r / c >> 0 || 1, a / f >> 0 || 1];
        i && d.reverse();
        let [u, p] = d, w = this.padding, v, C = 0, m, T;
        i ? (m = c, c -= o, T = (y) => (
          /* 计算top偏移量 */
          y * (f - h) + (y + 1) * h
        )) : (n ? (c = (r - o * (u + 2 * w - 1)) / u, v = !w * o, C = w * o) : (v = 0, C = r < c ? 0 : (r % c + o * u) / (u + 1) >> 0, c -= o), T = (y) => y * (c + v) + (y + 1) * C, m = f), this.row = p + 2, this.column = u, this.realH = f - h, this.realW = c, this.expand = m, this.Size = Math.ceil(t / u) * m;
        let z = Math.min(t, u * this.row), _ = z - 1, b;
        for (; z-- > 0; )
          b = _ - z, this.$set(e, b, {
            x: o,
            y: h,
            width: c,
            height: f - h,
            space: T(b % u),
            data: {}
          });
        e.length = _ + 1;
        let x = [];
        a / m > _ / u && x.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), x.push([
          "update:space",
          {
            row: (_ / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(x);
      });
    }
  }
};
var Tt = function() {
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
}, zt = [], Ct = /* @__PURE__ */ W(
  $t,
  Tt,
  zt,
  !1,
  null,
  "27513d8a",
  null,
  null
);
const nt = Ct.exports, Nt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return tt(i) ? [] : et(i) ? i : [i];
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
    this.$.vnode.ref && H(this, { ...this.component });
  },
  methods: {
    __trigger(t) {
      let e = t[this.bridge] || t.type;
      return (this.$slots || this.$scopedSlots)[e] ? e : "default";
    }
  }
};
var Rt = function() {
  var e = this, i = e._self._c;
  return i(e.type, e._b({ ref: "component", tag: "component" }, "component", e.$attrs, !1), [e._l(e.column, function(s) {
    return e._t(e.__trigger(s), null, null, s);
  })], 2);
}, kt = [], Ht = /* @__PURE__ */ W(
  Nt,
  Rt,
  kt,
  !1,
  null,
  null,
  null,
  null
);
const lt = Ht.exports, Y = /(?:\,|\|{2})/, J = "px", K = "";
let ot = document.documentElement, Q, Z = ["s-left", "s-top", "s-right", "s-bottom"], Lt = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var Mt = gt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let P = {}, ht = null;
Mt(P, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    ht = Et(() => {
      g(F);
    }, t), this._delay = t;
  }
});
P.delay = 60;
function Et(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, g(t, this, arguments));
  };
}
const E = () => {
  ht();
};
function Wt(t) {
  F.push(t);
}
const N = new ResizeObserver(E);
N.observe(ot);
function at(t) {
  t.onresize || (F.push([at, null, t]), t.onresize = !0);
  var e = ot, i = _t(t.offset) ? 15 : t.offset, s = t.target, l = t.room, n = t.index, o = t.position, h = t.edge || 15, r = s.getBoundingClientRect(), a = l.offsetHeight + i, c = l.offsetWidth + i, f = "3,0,2,1".split(Y), d, u = r.left, p = r.top, w = Math.max(p, 0), v = (r.height == Q ? r.bottom - r.top : r.height) >> 0, C = (r.width == Q ? r.right - u : r.width) >> 0, m = e.clientWidth - c, T = e.clientHeight - a, z = [
    /* left: 0 */
    u - c,
    /* top: 1 */
    r.top - a,
    /* right: 2 */
    m - r.right,
    /* bottom: 3 */
    T - r.bottom
  ];
  o && (X(
    o.split(Y),
    function(L, M, O, ft) {
      ft.push(O[M]);
    },
    Lt,
    d = []
  ), f.unshift.apply(f, d)), n = X(
    f,
    function(L, M, O) {
      if (O[M] > 0)
        return M;
    },
    z
  );
  let _ = t.css;
  var b = 0, x = 0, y = 0, j = 0;
  if (n != null) {
    var dt = n == 0 || n == 2;
    n == 3 || n == 1 ? (b = Math.min(
      u,
      m,
      u - (c - C) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), y = Math.max(u - b + i, 5), x = n == 3 ? w + v : z[1]) : (b = n == 2 ? r.right + i : z[0], x = Math.min(
      w,
      T,
      w - (a - v) / 2 * 0.3
      /* 交集的偏移量 与 tLeft */
    ), j = v > a ? a / 4 - 1 : Math.max(w - x + v / 4, 4)), _.left = Math.min(b, m) + J, _.top = Math.min(x, T) + J;
    let L = _["--tips-arrow-top"] = j || K;
    _["--tips-arrow-left"] = y || K, _["--tips-arrow"] = y > c - h || dt && (L + (a > 50 ? h : 0) > a || !L) ? "hidden" : "visible";
  }
  let I = l.classList;
  I.remove(...Z), I.add(Z[n]), t.index = n;
}
const A = "data-tips-scroll", Ot = {
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
      css: {
        opacity: 0
      }
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), g(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return g(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && (at({
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
        e ? g(t.addEventListener, t, "scroll", E) : (g(N.observe, N, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, A), i || (g(t.addEventListener, t, "scroll", E), this.__attr(t, A, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = k(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), H(t, e), t;
    },
    __2next() {
      this.target || (this.init(), P.delay = +this.delay, Wt((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      g(t.removeEventListener, t, "scroll", E), g(t.removeAttribute, t, A, void 0), e || g(N.unobserve, N, t);
    });
  }
};
var At = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", class: e.target ? "tips-" + e.position : "", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, Bt = [], Ft = /* @__PURE__ */ W(
  Ot,
  At,
  Bt,
  !1,
  null,
  "dd3a7816",
  null,
  null
);
const ut = Ft.exports, Pt = {}, ct = [];
ct.push(rt, nt, lt, ut);
const Xt = { Card: rt, Flyweight: nt, Stream: lt, Tips: ut };
Pt.install = function(t, e = {}) {
  ct.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  rt as Card,
  nt as Flyweight,
  lt as Stream,
  ut as Tips,
  Xt as components,
  Pt as default
};
