import { runer as w, each as O, isEmpty as it, picker as k, isSimplyType as D, merge as R, isString as dt, isArray as st } from "@soei/util";
import { runer as _, isNil as pt, each as G } from "@soei/tools";
import _t from "@soei/picker";
let gt = /(\d+|[+\-\*/]|%)/g, q = {
  "+": (t, e) => t + e,
  "-": (t, e) => t - e,
  "*": (t, e) => t * e,
  "/": (t, e) => t / e,
  "%": (t, e, i) => parseFloat(t) / 100 * i
}, V = (t, e) => {
  let i;
  if (i = w("match", t, gt)) {
    let s = i.length, l, h = 0, n, a = [];
    for (; s--; )
      h = i.shift(), h in q ? (l && a.push(l), h === "%" && (a.length = 2), n = h) : +h && a.push(+h), a.length == 2 && (a.push(e), l = q[n].apply(null, a), a.length = 0);
    +l || (l = +a.pop()), t = l >> 0;
  }
  return t;
}, Y = {}, b = (t, e) => (t + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  Y[e] || (Y[e] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function j(t, e, i, s, l, h, n, a) {
  var r = typeof t == "function" ? t.options : t;
  e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), h && (r._scopeId = "data-v-" + h);
  var o;
  if (n ? (o = function(u) {
    u = u || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !u && typeof __VUE_SSR_CONTEXT__ < "u" && (u = __VUE_SSR_CONTEXT__), l && l.call(this, u), u && u._registeredComponents && u._registeredComponents.add(n);
  }, r._ssrRegister = o) : l && (o = a ? function() {
    l.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (r.functional) {
      r._injectStyles = o;
      var f = r.render;
      r.render = function(c, p) {
        return o.call(p), f(c, p);
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
function A(t, e) {
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
}, mt = [
  "BackGround",
  "BordeR",
  "Height",
  "Width",
  "Top",
  "Right",
  "Bottom",
  "Left"
], nt = {};
O(
  mt,
  (t, e, i) => {
    t = A(e), nt["--" + A(e, !0)] = t, i[t] = function() {
      this.trigger++;
    };
  },
  rt
);
const yt = {
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
      return w("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: rt,
  methods: {
    exec: b,
    isEmpty: it,
    picker: k,
    runer: w,
    isSimplyType: D,
    tr() {
      let t = {};
      return this.margin(this.offset), O(nt, (e, i) => {
        this.css(t, e, i);
      }), t;
    },
    tolower: A,
    css(t, e, i) {
      let s = this[i] || this.default[i];
      !s || this.default[i] == s || (t[e] = b(s));
    },
    change(t) {
      D(t) || (this.closecss = k(
        t,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(t) {
      R(
        this,
        k(
          dt(t) ? t.split(/\s*(?:,|\s+)\s*/) : t,
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
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [e._v(" " + e._s(e.sub) + " "), e._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { flex: "", vcenter: "" } }, [e._t("icon", null, null, { el: e.$el, picker: e.picker, runer: e.runer }), i("div", { staticClass: "card-close", class: { hide: e.isSimplyType(e.close) ? !e.close : !1 }, style: e.closecss, attrs: { title: e.tips }, on: { click: function(s) {
          return e.$emit("close");
        } } })], 2)];
      })], 2)];
    }), e._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [e._t("inner")], 2)];
    })];
  })], 2);
}, bt = [], wt = /* @__PURE__ */ j(
  yt,
  vt,
  bt,
  !1,
  null,
  "b1e09a6c",
  null,
  null
);
const xt = wt.exports, St = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xt
}, Symbol.toStringTag, { value: "Module" }));
let J = (t) => t == null || t == null, $t = (...t) => {
  console.info("::::FLYWEIGHT", ...t);
};
const Tt = {
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
      return R(s, {
        "--width": b(this.realW),
        "--height": b(this.realH),
        "--flyweight-content": b(i)
      }, e && {
        "--flyweight-h": b(e)
      }, t && s, {
        "--flyweight-w": b(t)
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
      $t(t);
    }
    this.scrollx = w("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: b,
    trigger(t, e) {
      st(t) || (t = t && e ? [[t, e]] : []), t.length && this.lazyrun(() => {
        O(t, (i, s) => {
          this.$emit(s[0], J(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(t) {
      if (!this.flys.length)
        return t && this.task.push(t), !0;
    },
    setview(t) {
      w([this.cheackflys, (e) => {
        e = e || {};
        let i = e.index || O(this.flys, (s, l, h, n) => {
          if (l[h] == n)
            return s;
        }, e.picker, e.id);
        J(i) || this.setindex(i);
      }], this, t);
    },
    setindex(t) {
      w([this.cheackflys, ({ index: e }) => {
        this.selectIndex = e, this.$nextTick(() => {
          let i = e / this.column >> 0, s = this.expand;
          (this.flyweight[this.direction] / s >> 0) + this.row - i - 1 > 0 || (this.flyweight[this.direction] = i * s, this.scroll());
        });
      }], this, { index: t });
    },
    lazyrun(t, e) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        w(t);
      }, e || this.lazy);
    },
    run(t) {
      let e = [], i = w(this.direction, t.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      R(s, this.space), t.from || e.push(["onscroll", s]);
      let l = !1;
      O(
        this.flyweights,
        (h, n, a, r, o, f, d, u, c) => {
          if (a = h / o >> 0, u = a + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(a < f % r) + (f / r >> 0)), c = u * o + h % o, c >= this.count) {
            l || (e.push(["onend"]), l = !0);
            return;
          }
          n.index = u, n.i = c, n.data = this.flys[c];
          let p = [
            /* top */
            u * this.expand + n.x,
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
      let i = this.scrollx, s = this.flyweight, l = k(s, this.BoxRule);
      this.$nextTick(() => {
        let h = /true/.test(this.auto), [n, a] = this.offset, r = l.width, o = l.height, f = (V(this.width, r) || r) + n, d = V(this.height, o) + a, u = [r / f >> 0 || 1, o / d >> 0 || 1];
        i && u.reverse();
        let [c, p] = u, x = this.padding, C, S = 0, g, y;
        i ? (g = f, f -= n, y = ($) => (
          /* 计算top偏移量 */
          $ * (d - a) + ($ + 1) * a
        )) : (h ? (f = (r - n * (c + 2 * x - 1)) / c, C = !x * n, S = x * n) : (C = 0, S = (r % f + n * c) / (c + 1) >> 0, f -= n), y = ($) => $ * (f + C) + ($ + 1) * S, g = d), this.row = p + 2, this.column = c, this.realH = d - a, this.realW = f, this.expand = g, this.Size = Math.ceil(t / c) * g;
        let v = Math.min(t, c * this.row), m = v - 1, T;
        for (; v-- > 0; )
          T = m - v, this.$set(e, T, {
            x: n,
            y: a,
            width: f,
            height: d - a,
            space: y(T % c),
            data: {}
          });
        e.length = m + 1;
        let z = [];
        o / g > m / c && z.push(["onend"]), this.flyweight && (this.flyweight[this.direction] = 0), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), z.push(["update:space", {
          row: (m / c >> 0) + 1,
          column: c,
          showrow: this.row,
          showcolumn: this.column
        }]), this.trigger(z);
      });
    }
  }
};
var zt = function() {
  var e = this, i = e._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    "flyweight-active": e.actice
  }, style: e.style, on: { scroll: e.scroll } }, [i("div", { staticClass: "flyweight-all" }, e._l(e.flyweights, function(s, l) {
    return i("div", { key: l, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [e._t("default", null, null, s)], 2);
  }), 0), e.flyweights.length ? e._t("end") : e._e()], 2);
}, Ct = [], Nt = /* @__PURE__ */ j(
  Tt,
  zt,
  Ct,
  !1,
  null,
  "d5f1cd63",
  null,
  null
);
const Mt = Nt.exports, Ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mt
}, Symbol.toStringTag, { value: "Module" })), kt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: t, T: e } = this, i = t || e;
      return it(i) ? [] : st(i) ? i : [i];
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
    this.$.vnode.ref && R(this, { ...this.component });
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
}, Ht = [], Et = /* @__PURE__ */ j(
  kt,
  Rt,
  Ht,
  !1,
  null,
  null,
  null,
  null
);
const jt = Et.exports, Pt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jt
}, Symbol.toStringTag, { value: "Module" })), K = /(?:\,|\|{2})/, Q = "px", Z = "";
let lt = document.documentElement, tt, et = ["s-left", "s-top", "s-right", "s-bottom"], Wt = { left: 0, top: 1, right: 2, bottom: 3 };
const L = [];
var At = _t(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let F = {}, ot = null;
At(F, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(t) {
    ot = Lt(() => {
      _(L);
    }, t), this._delay = t;
  }
});
F.delay = 60;
function Lt(t, e) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= e && (i = s, _(t, this, arguments));
  };
}
const E = () => {
  ot();
};
function Ft(t) {
  L.push(t);
}
const M = new ResizeObserver(E);
M.observe(lt);
function at(t) {
  t.onresize || (L.push([at, null, t]), t.onresize = !0);
  var e = lt, i = e.clientHeight, s = pt(t.offset) ? 15 : t.offset, l = t.target, h = t.room, n = t.index, a = t.position, r = l.getBoundingClientRect(), o = h.offsetHeight + s, f = h.offsetWidth + s, d = "3,0,2,1".split(K), u, c = (r.height == tt ? r.bottom - r.top : r.height) >> 0, p = (r.width == tt ? r.right - r.left : r.width) >> 0, x = e.clientWidth - f, C = i - o, S = [
    /* left: 0 */
    r.left - f,
    /* top: 1 */
    r.top - o,
    /* right: 2 */
    x - r.right,
    /* bottom: 3 */
    C - r.bottom
  ];
  a && (G(
    a.split(K),
    function(ct, H, P, ft) {
      ft.push(P[H]);
    },
    Wt,
    u = []
  ), d.unshift.apply(d, u)), n = G(
    d,
    function(ct, H, P) {
      if (P[H] > 0)
        return H;
    },
    S
  );
  var g = 0, y = 0, v = 0;
  if (n != null) {
    var m = n == 0 || n == 2, T = n == 3 || n == 1;
    g = T ? Math.min(r.left, x) : n == 2 ? r.right + s : S[0], o -= s * +m;
    var z = Math.max(r.top, 0), $ = Math.min(
      r.bottom,
      i
    ), B = ($ - o + Math.min(i - o, z)) / 2;
    y = Math.max(
      m ? B : n == 3 ? r.top + c + s : Math.min(B, S[1]),
      0
    ), T && r.left > x && (v = r.left - g - s + p / 2);
  }
  let I = h.classList, N = t.css;
  I.remove(...et), I.add(et[n]), t.index = n, N.left = g + Q, N.top = y + Q;
  let U = N["--tips-arrow-top"] = m ? Math.min(
    /* 底边距 */
    Math.max(y, z) - y,
    o - s
  ) : Z, X = f - 3 * s;
  N["--tips-arrow"] = v > X - 10 || m && (U + (o > 50 ? 15 : 0) > o || !U) ? "hidden" : "visible", N["--tips-arrow-left"] = v ? Math.min(v, X) : Z;
}
const W = "data-tips-scroll", Bt = {
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
      css: {}
    };
  },
  methods: {
    __parent(t) {
      let e = this.$el, i;
      for (; e && (e = e.parentNode, e && e.nodeType == 1 || (e = window, i = !0), _(t, null, e, i), !i); )
        ;
    },
    __attr(t, e, i) {
      return _(
        t[i === void 0 ? "getAttribute" : "setAttribute"],
        t,
        e,
        i
      );
    },
    /* 初始化 */
    init() {
      let t = this.$el;
      t.nodeName != "#comment" && at({
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
      });
    },
    __2listener() {
      this.static || this.__parent((t, e, i) => {
        e ? _(t.addEventListener, t, "scroll", E) : (_(M.observe, M, t), (t.offsetHeight < t.scrollHeight || t.offsetWidth < t.scrollWidth) && (i = this.__attr(t, W), i || (_(t.addEventListener, t, "scroll", E), this.__attr(t, W, "true"))));
      });
    },
    __css() {
      let t = {}, e;
      return this.target ? e = {
        [this.position]: this.offset + "px"
      } : (e = k(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), t["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), R(t, e), t;
    },
    __2next() {
      this.target || (this.init(), F.delay = +this.delay, Ft((t) => {
        this.__2listener();
      }), this.__2listener());
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next();
  },
  unmounted() {
    this.__parent(function(t, e) {
      _(t.removeEventListener, t, "scroll", E), _(t.removeAttribute, t, W, void 0), e || _(M.unobserve, M, t);
    });
  }
};
var It = function() {
  var e = this, i = e._self._c;
  return e.visible ? i("div", e._b({ staticClass: "tips", class: e.target ? "tips-" + e.position : "", style: e.static ? null : e.css, attrs: { static: e.static ? "" : null } }, "div", e.$attrs, !1), [e._t("default", function() {
    return [e._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [e._v(e._s(e.title))])];
    }), e._t("content", function() {
      return [e._v(e._s(e.content))];
    })];
  })], 2) : e._e();
}, Ut = [], Xt = /* @__PURE__ */ j(
  Bt,
  It,
  Ut,
  !1,
  null,
  "b7f54162",
  null,
  null
);
const Dt = Xt.exports, Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dt
}, Symbol.toStringTag, { value: "Module" })), qt = /* @__PURE__ */ Object.assign({ "./components/Card.vue": St, "./components/Flyweight.vue": Ot, "./components/Stream.vue": Pt, "./components/Tips.vue": Gt }), ht = [], ut = {};
for (const [t, e] of Object.entries(qt)) {
  const i = t.split("/").pop().replace(/\.vue$/, "");
  ut[i] = e.default, ht.push(e.default);
}
ut.install = function(t, e = {}) {
  ht.forEach((i) => {
    t.component(i.name, i), t.component("S" + i.name, i), t.component(i.name + "S", i);
  });
};
export {
  ut as components,
  ut as default
};
