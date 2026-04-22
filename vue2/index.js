import { runer as b, each as k, merge as z, picker as N, isEmpty as it, isSimplyType as D, isString as mt, isArray as B, format as yt } from "@soei/util";
import { runer as f, isNil as vt, each as U, isString as wt } from "@soei/tools";
import bt from "@soei/picker";
let xt = /(\d+|[+\-\*/]|%)/g, X = {
  "+": (e, t) => e + t,
  "-": (e, t) => e - t,
  "*": (e, t) => e * t,
  "/": (e, t) => e / t,
  "%": (e, t, i) => parseFloat(e) / 100 * i
}, G = (e, t) => {
  let i;
  if (i = b("match", e, xt)) {
    let s = i.length, n, l = 0, o, a = [];
    for (; s--; )
      l = i.shift(), l in X ? (n && a.push(n), l === "%" && (a.length = 2), o = l) : +l && a.push(+l), a.length == 2 && (a.push(t), n = X[o].apply(null, a), a.length = 0);
    +n || (n = +a.pop()), e = n >> 0;
  }
  return e;
}, Y = {}, w = (e, t) => (e + "").replace(
  /\w+\((.*)\)/g,
  "$1"
).replace(
  Y[t] || (Y[t] = new RegExp("(?=\\s+|^)(\\d+)(?:\\.\\d{1,})?(?!(?:\\.)*\\d|%|\\w)", "g")),
  "$1px"
);
function E(e, t, i, s, n, l, o, a) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = i, r._compiled = !0), s && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
  var h;
  if (o ? (h = function(d) {
    d = d || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), n && n.call(this, d), d && d._registeredComponents && d._registeredComponents.add(o);
  }, r._ssrRegister = h) : n && (h = a ? function() {
    n.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), h)
    if (r.functional) {
      r._injectStyles = h;
      var c = r.render;
      r.render = function(u, _) {
        return h.call(_), c(u, _);
      };
    } else {
      var p = r.beforeCreate;
      r.beforeCreate = p ? [].concat(p, h) : [h];
    }
  return {
    exports: e,
    options: r
  };
}
function O(e, t) {
  return t && (e = e.replace(/[a-z]/g, "")), e.toLowerCase();
}
let st = {
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
  },
  /* 混合样式 */
  mix: {
    handler(e) {
      if (!e)
        return;
      let t = {};
      z(t, this.$data, this.$props, this.$attrs, "mix"), this._style = N(t, e, (i, s, n) => {
        this.$nextTick(() => {
          b("removeAttribute", this.$el, i);
        });
      });
    },
    immediate: !0
  }
}, $t = [
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
  $t,
  (e, t, i) => {
    e = O(t), rt["--" + O(t, !0)] = e, i[e] = function() {
      this.trigger++;
    };
  },
  st
);
const St = {
  name: "Card",
  // inheritAttrs: false,
  props: {
    offset: {
      type: [String, Array],
      default: () => []
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
    },
    mix: {
      type: String,
      default: "bg|bgc=>background-color,c|color=>color,fs=>font-size,lh=>line-height,mw|maxw=>max-width,mh|maxh=>max-height,m=>margin,p=>padding"
    }
  },
  data() {
    return {
      closecss: {},
      _style: {},
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
    // style() {
    //   return this.tr();
    // },
    sub() {
      return this.show || this.title;
    },
    tips() {
      return b("tips", this.close || {}) || "关闭[" + this.sub + "]";
    }
  },
  watch: st,
  methods: {
    exec: w,
    isEmpty: it,
    picker: N,
    runer: b,
    isSimplyType: D,
    tr() {
      let e = {};
      return this.margin(this.offset), this.css(rt, e), z(e, this._style, !0), e;
    },
    tolower: O,
    css(e, t) {
      k(e, (i, s) => {
        let n = s in this ? this[s] : this.default[s];
        !n || this.default[s] == n || (t[i] = w(n));
      });
    },
    change(e) {
      D(e) || (this.closecss = N(
        e,
        "color=>--s-card-close-color,size=>--s-close-width,bold=>--s-close-height,*"
      ));
    },
    margin(e) {
      N(
        mt(e) ? e.split(/\s*(?:,|\s+)\s*/) : e,
        "0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",
        !0,
        (t, i, s, n) => {
          let l = w(i);
          !l || this.default[n] == l || (this[n] = l);
        }
      );
    }
  },
  mounted() {
    this.change(this.close);
  }
};
var Tt = function() {
  var t = this, i = t._self._c;
  return i("div", { key: t.trigger, staticClass: "card", style: t.tr() }, [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "card-title", attrs: { space: "" } }, [t._t("subtitle", function() {
        return [t._v(t._s(t.sub))];
      }), t._t("icons", function() {
        return [i("div", { staticClass: "card-ico-items", attrs: { vcenter: "" } }, [t._t("icon", null, null, { el: t.$el, picker: t.picker, runer: t.runer }), i("div", { staticClass: "card-close", class: { hide: t.isSimplyType(t.close) ? !t.close : !1 }, style: t.closecss, attrs: { title: t.tips }, on: { click: function(s) {
          return t.$emit("close");
        } } })], 2)];
      })], 2)];
    }), t._t("content", function() {
      return [i("div", { staticClass: "card-content" }, [t._t("inner")], 2)];
    })];
  })], 2);
}, Ct = [], kt = /* @__PURE__ */ E(
  St,
  Tt,
  Ct,
  !1,
  null,
  "97741480",
  null,
  null
);
const nt = kt.exports;
let q = (e) => e == null || e == null, Nt = (...e) => {
  console.info("::::FLYWEIGHT", ...e);
};
const zt = {
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
      var e = this.w, t = this.h, i = this.Size, s = {};
      return z(
        s,
        {
          "--width": w(this.realW),
          "--height": w(this.realH),
          "--flyweight-content": w(i)
        },
        t && {
          "--flyweight-h": w(t)
        },
        e && {
          "--flyweight-w": w(e)
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
    this.flyweights = [], this.$set || (this.$set = (e, t, i) => {
      e[t] = i;
    }), this.setindex(this.index);
    try {
      new ResizeObserver(() => {
        this.rebuild(), this.$emit("resize");
      }).observe(this.flyweight);
    } catch (e) {
      Nt(e);
    }
    this.scrollx = b("hasAttribute", this.flyweight, "scroll-x"), this.BoxRule = /* this.scrollx ? 'clientHeight=>width,clientWidth=>height' : */
    "clientHeight=>height,clientWidth=>width", this.direction = this.scrollx ? "scrollLeft" : "scrollTop";
  },
  methods: {
    exec: w,
    trigger(e, t) {
      B(e) || (e = e && t ? [[e, t]] : []), e.length && this.lazyrun(() => {
        k(e, (i, s) => {
          this.$emit(s[0], q(s[1]) ? !0 : s[1]);
        });
      });
    },
    cheackflys(e) {
      if (!this.flys.length)
        return e && this.task.push(e), !0;
    },
    setview(e) {
      b(
        [
          this.cheackflys,
          (t) => {
            t = t || {};
            let i = t.index || k(
              this.flys,
              (s, n, l, o) => {
                if (n[l] == o)
                  return s;
              },
              t.picker,
              t.id
            );
            q(i) || this.setindex(i);
          }
        ],
        this,
        e
      );
    },
    setindex(e) {
      b(
        [
          this.cheackflys,
          ({ index: t }) => {
            this.selectIndex = t, this.$nextTick(() => {
              if (t < 0)
                return;
              let i = t / this.column >> 0, s = this.expand, n = this.flyweight[this.direction] / s >> 0;
              i > n && i < n + this.row - 2 || (this.flyweight[this.direction] = i * s - s / 2, this.scroll());
            });
          }
        ],
        this,
        { index: e }
      );
    },
    lazyrun(e, t) {
      clearTimeout(this.time), this.time = setTimeout(() => {
        b(e);
      }, t || this.lazy);
    },
    run(e) {
      let t = [], i = b(this.direction, e.target), s = {
        // ...this
        offset: i,
        top: i,
        width: this.realW,
        height: this.realH,
        /* 显示区域第一行的索引 */
        index: i / this.expand >> 0
      };
      z(s, this.space), e.from || (!this.line || (this.__top = i), t.push(["onscroll", s]));
      let n = !1;
      this.end = !1, this.__index = s.index, k(
        this.flyweights,
        (l, o, a, r, h, c, p, d, u) => {
          if (a = l / h >> 0, d = a + r * /* 偏移量, 如果超出顶部 + 1轮,排列到列队后, 否则保持在当前*/
          (+(a < c % r) + /* 计算轮数, row的倍数 */
          (c / r >> 0)), u = d * h + l % h, u >= this.count) {
            n || (this.end = !0, t.push(["onend"]), n = !0);
            return;
          }
          o.index = d, o.i = u, o.data = this.flys[u];
          let _ = [
            /* top */
            d * this.expand + o.x,
            /* left */
            o.space
          ];
          p && _.reverse(), o.top = _[0], o.left = _[1];
        },
        null,
        this.row,
        this.column,
        /* 显示区域第一行的索引 */
        s.index,
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
      let i = this.scrollx, s = this.flyweight, n = N(s, this.BoxRule);
      this.$nextTick(() => {
        let l = /true/.test(this.auto), [o, a] = this.offset, r = n.width, h = n.height, c = (G(this.width, r) || r) + o, p = G(this.height, h) + a, d = [r / c >> 0 || 1, h / p >> 0 || 1];
        i && d.reverse();
        let [u, _] = d, m = this.padding, x, R = 0, y, T;
        i ? (y = c, c -= o, T = (v) => (
          /* 计算top偏移量 */
          v * (p - a) + (v + 1) * a
        )) : (l ? (c = (r - o * (u + 2 * m - 1)) / u, x = !m * o, R = m * o) : (x = 0, R = r < c ? 0 : (r % c + o * u) / (u + 1) >> 0, c -= o), T = (v) => v * (c + x) + (v + 1) * R, y = p), this.row = _ + 2, this.column = u, this.realH = p - a, this.realW = c, this.expand = y, this.Size = Math.ceil(e / u) * y;
        let C = Math.min(e, u * this.row), g = C - 1, $;
        for (; C-- > 0; )
          $ = g - C, this.$set(t, $, {
            x: o,
            y: a,
            width: c,
            height: p - a,
            space: T($ % u),
            data: {}
          });
        t.length = g + 1;
        let S = [];
        h / y > g / u && S.push(["onend"]), this.$nextTick(() => {
          this.setindex(this.selectIndex || 0), this.scroll();
        }), S.push([
          "update:space",
          {
            row: (g / u >> 0) + 1,
            column: u,
            showrow: this.row,
            showcolumn: this.column
          }
        ]), this.trigger(S);
      });
    }
  }
};
var Rt = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "flyweight", staticClass: "flyweight", class: {
    //   'flyweight-active': actice,
    "flyweight-empty": t.Size === 0,
    line: t.line && t.__top !== 0
  }, style: t.style, on: { scroll: t.scroll } }, [t._t("title", null, null, t.bridge), i("div", { staticClass: "flyweight-all" }, t._l(t.flyweights, function(s, n) {
    return i("div", { key: n, style: {
      top: s.top + "px",
      left: s.left + "px"
    } }, [t._t("default", null, null, s)], 2);
  }), 0), t._t("mix", function() {
    return [t.flyweights.length ? t._t("end", null, null, t.bridge) : t._t("empty", function() {
      return [i("Card", { attrs: { height: "100% - 10px", width: "100%", center: "", nothing: "", vcenter: "" } }, [t._v(" 空~ ")])];
    })];
  }, null, t.bridge)], 2);
}, Lt = [], Et = /* @__PURE__ */ E(
  zt,
  Rt,
  Lt,
  !1,
  null,
  "f62b1c5c",
  null,
  null
);
const lt = Et.exports;
const Ht = {
  name: "Input",
  emits: ["update:modelValue", "change", "focus"],
  data: function() {
    return {
      id: yt("input-{1000-9999}-{1000-9999}")
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
};
var Mt = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "s-wrap" }, [i("input", { ref: "input", staticClass: "s-wrap-input", attrs: { placeholder: " ", autocomplete: "off", id: t.id, type: t.type, maxlength: t.maxlength }, domProps: { value: t.modelValue }, on: { focus: function(s) {
    return t.$emit("focus", s);
  }, change: function(s) {
    return t.$emit("change", s.target.value);
  }, input: function(s) {
    return t.$emit("update:modelValue", s.target.value);
  } } }), i("label", { staticClass: "s-wrap-label", attrs: { for: t.id } }, [t._t("default", function() {
    return [i("span", { staticClass: "placeholder", attrs: { flex: "" } }, [t._t("placeholder", function() {
      return [t._t("icon", null, { type: "placeholder" }), t._v(" " + t._s(t.placeholder) + " ")];
    })], 2), i("span", { staticClass: "s-wrap-tips", attrs: { flex: "" } }, [t._t("tips", function() {
      return [t._t("icon", null, { type: "tips" }), t._v(" " + t._s(t.tips || t.placeholder) + " ")];
    })], 2)];
  })], 2), i("span", { staticClass: "s-wrap-close", on: { click: function(s) {
    return t.$emit("update:modelValue", "");
  } } }, [t._v("×")]), i("span", { staticClass: "s-wrap-input forbidden" }, [t._v(" " + t._s(t.modelValue) + " ")])]);
}, Wt = [], At = /* @__PURE__ */ E(
  Ht,
  Mt,
  Wt,
  !1,
  null,
  "47bfb090",
  null,
  null
);
const ot = At.exports, Pt = {
  name: "Stream",
  computed: {
    component() {
      return this.$refs.component;
    },
    column() {
      let { columns: e, T: t } = this, i = e || t;
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
    this.$.vnode.ref && z(this, { ...this.component });
  },
  methods: {
    __trigger(e) {
      let t = e[this.bridge] || e.type;
      return (this.$slots || this.$scopedSlots)[t] ? t : "default";
    }
  }
};
var Ot = function() {
  var t = this, i = t._self._c;
  return i(t.type, t._b({ ref: "component", tag: "component" }, "component", t.$attrs, !1), [t._l(t.column, function(s) {
    return t._t(t.__trigger(s), null, null, s);
  })], 2);
}, Bt = [], Ft = /* @__PURE__ */ E(
  Pt,
  Ot,
  Bt,
  !1,
  null,
  null,
  null,
  null
);
const at = Ft.exports, J = /(?:\,|\|{2})/, K = "px", Q = "";
let ht = document.documentElement, Z, tt = ["s-left", "s-top", "s-right", "s-bottom"], Vt = { left: 0, top: 1, right: 2, bottom: 3 };
const F = [];
var It = bt(
  window,
  "Reflect.defineProperty|Object.defineProperty=>Proxy"
).Proxy;
let V = {}, ut = null;
It(V, "delay", {
  /**
   * 获取延迟时间值
   * @returns {number} 返回当前实例的延迟时间属性值
   */
  get() {
    return this._delay;
  },
  set(e) {
    ut = jt(() => {
      f(F);
    }, e), this._delay = e;
  }
});
V.delay = 60;
function jt(e, t) {
  let i = 0;
  return function() {
    const s = Date.now();
    s - i >= t && (i = s, f(e, this, arguments));
  };
}
const W = () => {
  ut();
};
function Dt(e) {
  F.push(e);
}
const L = new ResizeObserver(W);
L.observe(ht);
function ct(e) {
  e.onresize || (F.push([ct, null, e]), e.onresize = !0);
  var t = ht, i = vt(e.offset) ? 15 : e.offset, s = e.target, n = e.room, l = e.index, o = e.position, a = e.edge || 15, r = s.getBoundingClientRect(), h = n.offsetHeight + i, c = n.offsetWidth + i, p = "3,0,2,1".split(J), d, u = r.left, _ = r.top, m = Math.max(_, 0), x = (r.height == Z ? r.bottom - r.top : r.height) >> 0, R = (r.width == Z ? r.right - u : r.width) >> 0, y = t.clientWidth - c, T = t.clientHeight - h, C = [
    /* left: 0 */
    u - c,
    /* top: 1 */
    r.top - h,
    /* right: 2 */
    y - r.right,
    /* bottom: 3 */
    T - r.bottom
  ];
  o && (U(
    o.split(J),
    function(H, M, A, gt) {
      gt.push(A[M]);
    },
    Vt,
    d = []
  ), p.unshift.apply(p, d)), l = U(
    p,
    function(H, M, A) {
      if (A[M] > 0)
        return M;
    },
    C
  );
  let g = e.css;
  var $ = 0, S = 0, v = 0, I = 0;
  if (l != null) {
    var pt = l == 0 || l == 2;
    if (l == 3 || l == 1)
      $ = Math.min(
        u,
        y,
        u - (c - R) / 2 * 0.3
        /* 交集的偏移量 与 tLeft */
      ), v = Math.max(u - $ + i, 5), S = l == 3 ? m + x : C[1];
    else {
      $ = l == 2 ? r.right + i : C[0];
      var _t = m - (h - x) / 2 * 0.3;
      S = Math.min(m, T, Math.max(_t, m, 0)), I = x > h ? h / 4 - 1 : Math.max(m - S + x / 4, 4);
    }
    g.left = Math.min($, y) + K, g.top = Math.min(S, T) + K;
    let H = g["--tips-arrow-top"] = I || Q;
    g["--tips-arrow-left"] = v || Q, g["--tips-arrow"] = v > c - a || pt && (H + (h > 50 ? a : 0) > h || !H) ? "hidden" : "visible";
  }
  let j = n.classList;
  j.remove(...tt), j.add(tt[l]), e.index = l;
}
const P = "data-tips-scroll", et = 10, Ut = {
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
    proxy: function(e) {
      e && this.$nextTick(() => {
        this.init();
      });
    },
    visible: function(e) {
      this.__trigger(e);
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
    __parent(e) {
      let t = this.$el, i;
      for (; t && (t = t.parentNode, t && t.nodeType == 1 || (t = window, i = !0), f(e, null, t, i), !i); )
        ;
    },
    __attr(e, t, i) {
      return f(
        e[i === void 0 ? "getAttribute" : "setAttribute"],
        e,
        t,
        i
      );
    },
    /* 初始化 */
    init() {
      let e = this.$el;
      e.nodeName != "#comment" && (ct({
        onresize: !1,
        /* 监控的目标 */
        target: e.parentNode,
        /* 显示的元素 */
        room: e,
        /* 显示位置 */
        position: this.position,
        /* CSS样式集合 */
        css: this.css,
        /* 偏移量 */
        offset: +this.offset >> 0
      }), this.css.opacity = 1);
    },
    __2listener() {
      this.static || this.__parent((e, t, i) => {
        t ? f(e.addEventListener, e, "scroll", W) : (f(L.observe, L, e), (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) && (i = this.__attr(e, P), i || (f(e.addEventListener, e, "scroll", W), this.__attr(e, P, "true"))));
      });
    },
    __css() {
      let e = {}, t;
      return this.target ? t = {
        [this.position]: this.offset + "px"
      } : (t = N(
        this.$props,
        "color=>--tips-color,background=>--tips-background-color,border=>--tips-border-width,fontSize=>--tips-font-size,borderRadius=>--tips-border-radius"
      ), e["--arrow-size"] = Math.sqrt(2 * Math.pow((this.border || 3) * 2 + 2, 2)) / 2 >> 0), z(e, t), e;
    },
    __2next() {
      this.target || (this.init(), V.delay = +this.delay, Dt((e) => {
        this.__2listener();
      }), this.__2listener());
    },
    __debounce(e) {
      clearTimeout(this._timeout__), this._timeout__ = setTimeout(
        () => {
          f(e, this, arguments);
        },
        this.delay === et ? 600 : this.delay
      );
    },
    /* 显示 */
    __visible(e) {
      this.__debounce(() => {
        f("stopPropagation", e), this.$emit("toggle", this.proxy = !0);
      });
    },
    /* 隐藏 */
    __hide(e) {
      this.__debounce(() => {
        this.proxy && this.$emit("toggle", this.proxy = !1);
      });
    },
    /* 切换显示状态 */
    __toggle(e) {
      f("stopPropagation", e), this.$emit("toggle", this.proxy = !this.proxy);
    },
    /* 触发事件 */
    __trigger(e) {
      if (wt(e)) {
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
        }[e], this._try("addEventListener");
      } else
        this.proxy = e;
    },
    _try(e) {
      let t = this._el__, i = this._event__;
      if (!i)
        return;
      B(i) || (i = [i]);
      let s = [];
      k(i, (n, l) => {
        s.push([
          e,
          l[2] || t,
          l[0],
          l[1] || this.__toggle
        ]);
      }), f(s);
    }
  },
  mounted() {
    this.css = this.__css(), this.__2next(), this.__trigger(this.visible);
  },
  unmounted() {
    this._try("removeEventListener"), this.__parent(function(e, t) {
      f(e.removeEventListener, e, "scroll", W), f(e.removeAttribute, e, P, void 0), t || f(L.unobserve, L, e);
    });
  }
};
var Xt = function() {
  var t = this, i = t._self._c;
  return t.proxy ? i("div", t._b({ staticClass: "tips", class: t.target ? "tips-" + t.position : "", style: t.static ? null : t.css, attrs: { static: t.static ? "" : null }, on: { click: function(s) {
    s.stopPropagation();
  } } }, "div", t.$attrs, !1), [t._t("default", function() {
    return [t._t("title", function() {
      return [i("div", { staticClass: "tips-title" }, [t._v(t._s(t.title))])];
    }), t._t("content", function() {
      return [t._v(t._s(t.content))];
    })];
  })], 2) : t._e();
}, Gt = [], Yt = /* @__PURE__ */ E(
  Ut,
  Xt,
  Gt,
  !1,
  null,
  "75de3b29",
  null,
  null
);
const dt = Yt.exports, qt = {}, ft = [];
ft.push(nt, lt, ot, at, dt);
const Zt = { Card: nt, Flyweight: lt, Input: ot, Stream: at, Tips: dt };
qt.install = function(e, t = {}) {
  ft.forEach((i) => {
    e.component(i.name, i), e.component("S" + i.name, i), e.component(i.name + "S", i);
  });
};
export {
  nt as Card,
  lt as Flyweight,
  ot as Input,
  at as Stream,
  dt as Tips,
  Zt as components,
  qt as default
};
