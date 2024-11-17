"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const f=require("@soei/util"),o=require("vue");const T=(e,t)=>{const i=e.__vccOpts||e;for(const[r,l]of t)i[r]=l;return i};let _=e=>e==null||e==null,H=/(\d+|[+\-\*/]|%)/g,b={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t,i)=>parseFloat(e)/100*i},v=(e,t)=>{let i;if(i=f.runer("match",e,H)){let r=i.length,l,s=0,n,h=[];for(;r--;)s=i.shift(),s in b?(l&&h.push(l),s==="%"&&(h.length=2),n=s):+s&&h.push(+s),h.length==2&&(h.push(t),l=b[n].apply(null,h),h.length=0);+l||(l=+h.pop()),e=l>>0}return e},N=(...e)=>{console.info("::::FLYWEIGHT",...e)};const S={name:"Flyweight",props:{flys:{type:Array,default:()=>[]},width:{type:Number,default:0},height:{type:Number,default:100},offset:{type:Array,default:()=>[0,0]},lazy:{type:Number,default:100},view:{type:Object,default:()=>null},index:{type:Number,default:0},top:{type:Number,default:!1},left:{type:Number,default:!1},auto:{type:[Boolean,String],default:!1},space:{type:Object,default:()=>null}},computed:{flyweight(){return this.$refs.flyweight}},data(){return{flyweights:[],actice:!1,Height:null,column:1,row:1,fwheight:10,count:0,task:[],realW:0,realH:0}},watch:{flys(e){this.count=e.length,this.re();let t=this.task.shift();t&&this.$nextTick(()=>{this.setview(t)})},view:{handler(e){this.setview(e)},immediate:!0},index(e){this.setindex(e)},top(e){this.flyweight.scrollTop=e},left(e){this.flyweight.scrollLeft=e}},mounted(){this.flyweights=[],this.$set||(this.$set=(e,t,i)=>{e[t]=i}),this.setindex(this.index);try{new ResizeObserver(()=>{this.re(),this.$emit("resize")}).observe(this.flyweight)}catch(e){N(e)}},methods:{trigger(e,t){this.lazyrun(()=>{f.isArray(e)||(e=[[e,t]]),f.each(e,(i,r)=>{this.$emit(r[0],_(r[1])?!0:r[1])})})},cheackflys(e){if(!this.flys.length)return e&&this.task.push(e),!0},setview(e){f.runer([this.cheackflys,t=>{t=t||{};let i=t.index||f.each(this.flys,(r,l,s,n)=>{if(l[s]==n)return r},t.picker,t.id);_(i)||this.setindex(i)}],this,e)},setindex(e){f.runer([this.cheackflys,({index:t})=>{this.$nextTick(()=>{let i=t/this.column>>0,r=this.fwheight;(this.flyweight.scrollTop/r>>0)+this.row-i-1>0||(this.flyweight.scrollTop=i*r,this.scroll())})}],this,{index:e})},lazyrun(e,t){clearTimeout(this.time),this.time=setTimeout(()=>{f.runer(e)},t||this.lazy)},run(e){let t=[],i=f.picker(e.target,"scrollTop=>top");f.merge(i,{height:this.realH,width:this.realW,index:i.top/this.fwheight>>0},this.space,"mix"),e.from||t.push(["onscroll",i]),f.each(this.flyweights,(r,l,s,n,h,g,c,a)=>{if(s=r/h>>0,c=s+n*(+(s<g%n)+(g/n>>0)),a=c*h+r%h,a>=this.count){t.push(["onend"]);return}l.index=c,l.top=c*this.fwheight,l.data=this.flys[a]},null,this.row,this.column,i.index),this.trigger(t),t=null},scroll(e){this.run(e||{target:this.flyweight,from:"space"})},re(){let e=this.count||this.flys.length,t=this.flyweights;if(!e)return t.length=e;this.count=e;let i=this.flyweight,r=f.picker(i,"clientHeight=>height,clientWidth=>width");this.$nextTick(()=>{let l=this.auto===!0,[s,n]=this.offset,h=r.width,g=r.height,c=(v(this.width,h)||h)+s,a=v(this.height,g)+n;this.realH=a-n;let u=h/c>>0||1,y=g/a>>0;this.row=y+2,this.column=u,this.fwheight=a;let w;l?(c=(h/u>>0)-s/u*(u-1),w=s):w=h%c/(u-1)>>0,this.realW=c,this.Height=Math.ceil(e/u)*a;let m=Math.min(e,u*this.row),d=m-1,p,k;for(;m-- >0;)p=d-m,k=this.flys[p],i=t[p],y=p/u>>0,this.$set(t,p,{data:k,top:y*a,left:p%u*(c+w),index:y});t.length=d+1;let x=[];g/a>d/u&&x.push(["onend"]),this.scroll(),x.push(["update:space",{row:(d/u>>0)+1,column:u,showrow:this.row,showcolumn:this.column}]),this.trigger(x)})}}};function B(e,t,i,r,l,s){return o.openBlock(),o.createElementBlock("div",{ref:"flyweight",class:o.normalizeClass(["flyweight",{"flyweight-active":l.actice}]),style:o.normalizeStyle({"--width":l.realW+"px","--height":l.realH+"px"}),onScroll:t[0]||(t[0]=(...n)=>s.scroll&&s.scroll(...n))},[o.createElementVNode("div",{class:"flyweight-all",style:o.normalizeStyle({"--flyweight-height":l.Height+"px"})},[(o.openBlock(!0),o.createElementBlock(o.Fragment,null,o.renderList(l.flyweights,(n,h)=>(o.openBlock(),o.createElementBlock("div",{key:h,style:o.normalizeStyle({top:n.top+"px",left:n.left+"px"})},[o.renderSlot(e.$slots,"default",{data:n.data,index:n.index},void 0,!0)],4))),128))],4),l.flyweights.length?o.renderSlot(e.$slots,"end",{key:0},void 0,!0):o.createCommentVNode("",!0)],38)}const z=T(S,[["render",B],["__scopeId","data-v-924b4e98"]]),F=[z],O={install(e){F.forEach(t=>{e.component("s-"+t.name.toLowerCase(),t)})}};exports.Flyweight=z;exports.default=O;
