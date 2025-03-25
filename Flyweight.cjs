"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const o=require("@soei/util"),i=require("vue");let I=/(\d+|[+\-\*/]|%)/g,E={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t,s)=>parseFloat(e)/100*s},N=(e,t)=>{let s;if(s=o.runer("match",e,I)){let n=s.length,l,h=0,r,c=[];for(;n--;)h=s.shift(),h in E?(l&&c.push(l),h==="%"&&(c.length=2),r=h):+h&&c.push(+h),c.length==2&&(c.push(t),l=E[r].apply(null,c),c.length=0);+l||(l=+c.pop()),e=l>>0}return e},B=e=>(e+"").replace(/\w+\((.*)\)/g,"$1").replace(/(?=\s+|^)(\d+(\.\d+)*)(?!(?:\.)*\d|%|\w)/g,"$1px");const L=(e,t)=>{const s=e.__vccOpts||e;for(const[n,l]of t)s[n]=l;return s};let C=e=>e==null||e==null,V=(...e)=>{console.info("::::FLYWEIGHT",...e)};const W={name:"Flyweight",props:{flys:{type:Array,default:()=>[]},width:{type:Number,default:0},height:{type:Number,default:100},offset:{type:Array,default:()=>[0,0]},lazy:{type:Number,default:100},view:{type:Object,default:()=>({id:0})},index:{type:Number,default:0},top:{type:Number,default:!1},left:{type:Number,default:!1},auto:{type:[Boolean,String],default:!1},space:{type:Object,default:()=>null},padding:{type:Boolean,default:!1}},computed:{flyweight(){return this.$refs.flyweight||""}},data(){return{flyweights:[],actice:!1,Size:null,column:1,row:1,expand:10,count:0,task:[],realW:0,realH:0}},watch:{flys(e){this.count=e.length,this.rebuild();let t=this.task.shift();t&&this.$nextTick(()=>{this.setview(t)})},view:{handler(e){this.setview(e)},immediate:!0,deep:!0},index(e){this.setindex(e)},top(e){this.flyweight.scrollTop=e},left(e){this.flyweight.scrollLeft=e}},mounted(){this.flyweights=[],this.$set||(this.$set=(e,t,s)=>{e[t]=s}),this.setindex(this.index);try{new ResizeObserver(()=>{this.rebuild(),this.$emit("resize")}).observe(this.flyweight)}catch(e){V(e)}this.scrollx=o.runer("hasAttribute",this.flyweight,"scroll-x"),this.BoxRule="clientHeight=>height,clientWidth=>width",this.direction=this.scrollx?"scrollLeft":"scrollTop"},methods:{exec:B,trigger(e,t){this.lazyrun(()=>{o.isArray(e)||(e=[[e,t]]),o.each(e,(s,n)=>{this.$emit(n[0],C(n[1])?!0:n[1])})})},cheackflys(e){if(!this.flys.length)return e&&this.task.push(e),!0},setview(e){o.runer([this.cheackflys,t=>{t=t||{};let s=t.index||o.each(this.flys,(n,l,h,r)=>{if(l[h]==r)return n},t.picker,t.id);C(s)||this.setindex(s)}],this,e)},setindex(e){o.runer([this.cheackflys,({index:t})=>{this.selectIndex=t,this.$nextTick(()=>{let s=t/this.column>>0,n=this.expand;(this.flyweight[this.direction]/n>>0)+this.row-s-1>0||(this.flyweight[this.direction]=s*n,this.scroll())})}],this,{index:e})},lazyrun(e,t){clearTimeout(this.time),this.time=setTimeout(()=>{o.runer(e)},t||this.lazy)},run(e){let t=[],s=o.runer(this.direction,e.target),n={offset:s,top:s,width:this.realW,height:this.realH,index:s/this.expand>>0};o.merge(n,this.space),e.from||t.push(["onscroll",n]);let l=!1;o.each(this.flyweights,(h,r,c,d,f,u,p,g,a)=>{if(c=h/f>>0,g=c+d*(+(c<u%d)+(u/d>>0)),a=g*f+h%f,a>=this.count){l||(t.push(["onend"]),l=!0);return}r.index=g,r.i=a,r.data=this.flys[a];let y=[g*this.expand+r.x,r.space];p&&y.reverse(),r.top=y[0],r.left=y[1]},null,this.row,this.column,n.index,this.scrollx),this.trigger(t),t=null},scroll(e){this.run(e||{target:this.flyweight,from:"space"})},rebuild(){let e=this.count||this.flys.length,t=this.flyweights;if(!e)return t.length=e;this.count=e;let s=this.scrollx,n=this.flyweight,l=o.picker(n,this.BoxRule);this.$nextTick(()=>{let h=/true/.test(this.auto),[r,c]=this.offset,d=l.width,f=l.height,u=(N(this.width,d)||d)+r,p=N(this.height,f)+c,g=[d/u>>0||1,f/p>>0||1];s&&g.reverse();let[a,y]=g,_=this.padding,S,k=0,m,b;s?(m=u,u-=r,b=w=>w*(p-c)+(w+1)*c):(h?(u=(d-r*(a+2*_-1))/a,S=!_*r,k=_*r):(S=0,k=(d%u+r*a)/(a+1)>>0,u-=r),b=w=>w*(u+S)+(w+1)*k,m=p),this.row=y+2,this.column=a,this.realH=p-c,this.realW=u,this.expand=m,this.Size=Math.ceil(e/a)*m;let T=Math.min(e,a*this.row),x=T-1,z;for(;T-- >0;)z=x-T,this.$set(t,z,{x:r,y:c,width:u,height:p-c,space:b(z%a),data:{}});t.length=x+1;let v=[];f/m>x/a&&v.push(["onend"]),this.flyweight&&(this.flyweight[this.direction]=0),this.$nextTick(()=>{this.setindex(this.selectIndex||0),this.scroll()}),v.push(["update:space",{row:(x/a>>0)+1,column:a,showrow:this.row,showcolumn:this.column}]),this.trigger(v)})}}},j={class:"flyweight-all"};function M(e,t,s,n,l,h){return i.openBlock(),i.createElementBlock("div",{ref:"flyweight",class:i.normalizeClass(["flyweight",{"flyweight-active":l.actice}]),style:i.normalizeStyle({"--width":h.exec(l.realW),"--height":h.exec(l.realH),"--flyweight-content":h.exec(l.Size)}),onScroll:t[0]||(t[0]=(...r)=>h.scroll&&h.scroll(...r))},[i.createElementVNode("div",j,[(i.openBlock(!0),i.createElementBlock(i.Fragment,null,i.renderList(l.flyweights,(r,c)=>(i.openBlock(),i.createElementBlock("div",{key:c,style:i.normalizeStyle({top:r.top+"px",left:r.left+"px"})},[i.renderSlot(e.$slots,"default",i.mergeProps({ref_for:!0},r),void 0,!0)],4))),128))]),l.flyweights.length?i.renderSlot(e.$slots,"end",{key:0},void 0,!0):i.createCommentVNode("",!0)],38)}const H=L(W,[["render",M],["__scopeId","data-v-8f29f044"]]);function $(e,t){return t&&(e=e.replace(/[a-z]/g,"")),e.toLowerCase()}let O={close:{handler(e){this.change(e)},deep:!0},offset:{handler(e){this.margin(e)},deep:!0}},q=["BackGround","BordeR","Height","Width","Top","Right","Bottom","Left"],A={};o.each(q,(e,t,s)=>{e=$(t),A["--"+$(t,!0)]=e,s[e]=function(){this.trigger++}},O);const G={name:"Card",props:{offset:{type:[String,Array],default:()=>[0,0,0,0]},background:{type:String,default:""},border:{type:String,default:"1px"},height:{type:String,default:"100%"},width:{type:String,default:"100%"},show:{type:String,default:""},close:{type:Object,default:null},title:{type:String,default:""}},data(){return{closecss:{},style:{},trigger:0,default:{top:"0px",right:"0px",bottom:"0px",left:"0px",height:"100%",width:"100%",background:"",border:"1px"}}},computed:{style(){return this.tr()}},watch:O,methods:{exec:B,isEmpty:o.isEmpty,isSimplyType:o.isSimplyType,tr(){let e={};return this.margin(this.offset),o.each(A,(t,s)=>{this.css(e,t,s)}),e},tolower:$,css(e,t,s){let n=this[s]||this.default[s];!n||this.default[s]==n||(e[t]=B(n))},change(e){o.isSimplyType(e)||(this.closecss=o.picker(e,"color=>--s-card-close-color,*"))},margin(e){o.merge(this,o.picker(o.isString(e)?e.split(/\s*(?:,|\s+)\s*/):e,"0=>top,1|0=>right,2|0=>bottom,3|1|0=>left",!0),!0)}},mounted(){this.change(this.close)}},P={class:"card-title"},D={class:"card-content"};function U(e,t,s,n,l,h){return i.openBlock(),i.createElementBlock("div",{class:"card",key:l.trigger,style:i.normalizeStyle(h.isEmpty(h.style)?h.tr():h.style)},[i.renderSlot(e.$slots,"default",{},()=>[i.renderSlot(e.$slots,"title",{},()=>[i.createElementVNode("div",P,[i.createTextVNode(i.toDisplayString(s.show||s.title)+" ",1),i.createElementVNode("div",{class:i.normalizeClass(["card-close",{hide:h.isSimplyType(s.close)?!s.close:!1}]),style:i.normalizeStyle(l.closecss),onClick:t[0]||(t[0]=r=>e.$emit("close"))},null,6)])],!0),i.renderSlot(e.$slots,"content",{},()=>[i.createElementVNode("div",D,[i.renderSlot(e.$slots,"inner",{},void 0,!0)])],!0)],!0)],4)}const F=L(G,[["render",U],["__scopeId","data-v-23ece4cb"]]),R={name:"Stream",props:{type:{type:String,default:"div"},data:{type:Array,default:()=>[]},T:{type:Array,default:()=>[]}},render(e){return e(this.type,{props:{data:this.data}},this._l(this.T,(t,s)=>{let n=o.picker(t,"slot|name|type=>name").name,l=o.picker(this,o.format("$scopedSlots.?|$slots.?|$scopedSlots.default=>?",n));return o.merge(t,{index:s}),o.runer(n,l,t)}))}},X=[H,F,R],Y={install(e){X.forEach(t=>{e.component("S"+t.name,t),e.component(t.name+"S",t)})}};exports.Card=F;exports.Flyweight=H;exports.Stream=R;exports.default=Y;
