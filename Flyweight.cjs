"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const u=require("@soei/util"),o=require("vue");const T=(e,t)=>{const i=e.__vccOpts||e;for(const[s,l]of t)i[s]=l;return i};let _=e=>e==null||e==null,H=/(\d+|[+\-\*/]|%)/g,v={"+":(e,t)=>e+t,"-":(e,t)=>e-t,"*":(e,t)=>e*t,"/":(e,t)=>e/t,"%":(e,t,i)=>parseFloat(e)/100*i},b=(e,t)=>{let i;if(i=u.runer("match",e,H)){let s=i.length,l,h=0,n,r=[];for(;s--;)h=i.shift(),h in v?(l&&r.push(l),h==="%"&&(r.length=2),n=h):+h&&r.push(+h),r.length==2&&(r.push(t),l=v[n].apply(null,r),r.length=0);+l||(l=+r.pop()),e=l>>0}return e},N=(...e)=>{console.info("::::FLYWEIGHT",...e)};const S={name:"Flyweight",props:{flys:{type:Array,default:()=>[]},width:{type:Number,default:0},height:{type:Number,default:100},offset:{type:Array,default:()=>[0,0]},lazy:{type:Number,default:100},view:{type:Object,default:()=>null},index:{type:Number,default:0},top:{type:Number,default:!1},left:{type:Number,default:!1},auto:{type:[Boolean,String],default:!1},space:{type:Object,default:()=>null}},computed:{flyweight(){return this.$refs.flyweight}},data(){return{flyweights:[],actice:!1,Height:null,column:1,row:1,fwheight:10,count:0,task:[],realW:0,realH:0}},watch:{flys(e){this.count=e.length,this.re();let t=this.task.shift();t&&this.$nextTick(()=>{this.setview(t)})},view:{handler(e){this.setview(e)},immediate:!0},index(e){this.setindex(e)},top(e){this.flyweight.scrollTop=e},left(e){this.flyweight.scrollLeft=e}},mounted(){this.flyweights=[],this.$set||(this.$set=(e,t,i)=>{e[t]=i}),this.setindex(this.index);try{new ResizeObserver(()=>{this.re(),this.$emit("resize")}).observe(this.flyweight)}catch(e){N(e)}},methods:{trigger(e,t){this.lazyrun(()=>{u.isArray(e)||(e=[[e,t]]),u.each(e,(i,s)=>{this.$emit(s[0],_(s[1])?!0:s[1])})})},cheackflys(e){if(!this.flys.length)return e&&this.task.push(e),!0},setview(e){u.runer([this.cheackflys,t=>{t=t||{};let i=t.index||u.each(this.flys,(s,l,h,n)=>{if(l[h]==n)return s},t.picker,t.id);_(i)||this.setindex(i)}],this,e)},setindex(e){u.runer([this.cheackflys,({index:t})=>{this.$nextTick(()=>{let i=t/this.column>>0,s=this.fwheight;(this.flyweight.scrollTop/s>>0)+this.row-i-1>0||(this.flyweight.scrollTop=i*s,this.scroll())})}],this,{index:e})},lazyrun(e,t){clearTimeout(this.time),this.time=setTimeout(()=>{u.runer(e)},t||this.lazy)},run(e){let t=u.picker(e.target,"scrollTop=>top");u.each(this.flyweights,(i,s,l,h,n,r,a,c)=>{if(l=i/n>>0,a=l+h*(+(l<r%h)+(r/h>>0)),c=a*n+i%n,c>=this.count){this.trigger("onend");return}s.index=a,s.top=a*this.fwheight,s.data=this.flys[c]},null,this.row,this.column,t.top/this.fwheight>>0)},scroll(e){this.run(e||{target:this.flyweight})},re(){let e=this.count||this.flys.length,t=this.flyweights;if(!e)return t.length=e;this.count=e;let i=this.flyweight,s=u.picker(i,"clientHeight=>height,clientWidth=>width");this.$nextTick(()=>{let l=this.auto===!0,[h,n]=this.offset,r=s.width,a=s.height,c=(b(this.width,r)||r)+h,g=b(this.height,a)+n;this.realH=g-n;let f=r/c>>0||1,p=a/g>>0;this.row=p+2,this.column=f,this.fwheight=g;let w;l?(c=(r/f>>0)-h/f*(f-1),w=h):w=r%c/(f-1)>>0,this.realW=c,this.Height=Math.ceil(e/f)*g;let m=Math.min(e,f*this.row),d=m-1,y,k;for(;m-- >0;)y=d-m,k=this.flys[y],i=t[y],p=y/f>>0,this.$set(t,y,{data:k,top:p*g,left:y%f*(c+w),index:p});t.length=d+1;let x=[];a/g>d/f&&x.push(["onend"]),this.scroll(),x.push(["update:space",{row:(d/f>>0)+1,column:f,showrow:this.row,showcolumn:this.column}]),this.trigger(x)})}}};function B(e,t,i,s,l,h){return o.openBlock(),o.createElementBlock("div",{ref:"flyweight",class:o.normalizeClass(["flyweight",{"flyweight-active":l.actice}]),style:o.normalizeStyle({"--width":l.realW+"px","--height":l.realH+"px"}),onScroll:t[0]||(t[0]=(...n)=>h.scroll&&h.scroll(...n))},[o.createElementVNode("div",{class:"flyweight-all",style:o.normalizeStyle({"--flyweight-height":l.Height+"px"})},[(o.openBlock(!0),o.createElementBlock(o.Fragment,null,o.renderList(l.flyweights,(n,r)=>(o.openBlock(),o.createElementBlock("div",{key:r,style:o.normalizeStyle({top:n.top+"px",left:n.left+"px"})},[o.renderSlot(e.$slots,"default",{data:n.data,index:n.index},void 0,!0)],4))),128))],4),l.flyweights.length?o.renderSlot(e.$slots,"end",{key:0},void 0,!0):o.createCommentVNode("",!0)],38)}const z=T(S,[["render",B],["__scopeId","data-v-f7462fc9"]]),F=[z],O={install(e){F.forEach(t=>{e.component("s-"+t.name.toLowerCase(),t)})}};exports.Flyweight=z;exports.default=O;
