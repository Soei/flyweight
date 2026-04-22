[![安装](https://img.shields.io/badge/安装-npm_i_@soei/flyweight-ffc107?style=flat)](https://npmjs.com/package/@soei/flyweight)

# 享元模式 [![Latest Version on NPM](https://img.shields.io/npm/v/@soei/flyweight?label=npm&style=flat-square)](https://npmjs.com/package/@soei/flyweight) [![Software License](https://img.shields.io/badge/license-ISC-brightgreen?label=&style=flat-square)](LICENSE.md) [![npm](https://img.shields.io/npm/dw/@soei/flyweight?label=Downloads&style=flat-square)](https://www.npmjs.com/package/@soei/flyweight) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40soei%2Futil?label=Size&color=&style=flat-square)](https://npmjs.com/package/@soei/flyweight)

[DEMO(示例)](https://soei.github.io/demo/flyweight/)

[![安装](https://img.shields.io/badge/-@soei-ae8aff?style=flat-square)![NPM Downloads by package author](https://img.shields.io/npm-stat/dw/soeiz?style=flat-square)](https://npmjs.com/package/@soei/flyweight)

[![安装](https://img.shields.io/badge/引用-import_{_Flyweight_}_from_"@soei/flyweight"-00bcd4?style=flat-square)](https://npmjs.com/package/@soei/flyweight)

## # 版本: `0.5.8`

### # `Card` 新增 `mix` 默认样式

```html
<!-- 默认样式变量 -->
<!--
  bg|bgc    => background-color
  c|color   => color
  fs        => font-size
  lh        => line-height
  mw|maxw   => max-width
  mh|maxh   => max-height
  m         => margin
  p         => padding
 -->
<Card color="red" bg="green"> </Card>
<!-- 转换为行内样式 -->
<div class="card" style="color:red;background-color:green">...</div>

<!-- 自定义 -->
<Card color="red" mix="color=>background-color"> </Card>
```

## # **目录**

- [`Input`](#-input-)
- [`Tips`](#-tips-)
- [`Stream`](#-stream-)
- [`Card`](#-card-)
- [`Flyweight`](#-flyweight-)

## # `安装`

```bash
# 安装
npm i @soei/flyweight
```

### `Vue3` 引用

```javascript
// main.js
import flyweight from "@soei/flyweight";
import "@soei/flyweight/style.css";

Vue.use(flyweight);
/* 单个导出 */
import { Flyweight, Card } from "@soei/flyweight";
```

### `Vue2` 引用

```javascript
// Vue2引用, 安装和Vue3相同
// main.js
import Flyweight from "@soei/flyweight/vue2/index";
import "@soei/flyweight/vue2/style.css";
```

### # 例子 🌰

```html
<!-- vue3 -->
<script setup>
  /* 引入依赖 */
  import { Flyweight, Card } from "@soei/flyweight";
  let flys = ref([]);
  flys.value = Array.from({ length: 200 }, (_, i) => ({ name: i }));
  let view = reactive({
    picker: "name",
    id: 10,
  });
  //...
</script>
```

```html
<!-- 相应的用法和属性在下面 -->
<!-- use.vue 多种写法 s-[*]  S[*大写][小写]  [*大写][小写] -->
<!-- 共享容器 -->
<s-flyweight ...></s-flyweight>
<!-- 卡片弹性布局 -->
<s-card ...></s-card>
<!-- 提示容器 -->
<s-tips ...></s-tips>
<!-- 流式容器 -->
<s-stream ...></s-stream>
<!-- 输入框 -->
<s-input ...></s-input>

<!-- ... -->
```

## # <`Input` />

[返回目录](#-目录)

```html
<!-- (版本 0.5.6) -->
<style lang="scss">
  /* 以下样式变量为默认值 */
  class{
    --s-input-border-radius: 10px; /* 边框的圆角 */
    --s-input-color: #077aed; /* 选中的颜色 */
    --s-input-primary-color: #4caf50; /* 默认有内容时的样式 */
    --s-input-label-primary-color: #999; /* 默认无内容文字颜色变量*/
    --s-input-label-color: #fff;
    --s-input-label-border-radius: 10px;
    --s-input-duration: 0.7s; /* 动画时间 默认 */
    --s-input-label-font-size: /* label的字体大小 */
  }

</style>
<!--
┌────────────────────────────────────┐
│ .s-wrap                            │
│ └─input.s-wrap-input               │
│ └─label.s-wrap-label               │
│         └─ #default                │
│            └─ #icon + #tips        │
│            └─ #icon + #placeholder │
│                                    │
└────────────────────────────────────┘
-->
<Input
  type="password|text|..."
  static|空(默认动画开启)
  placeholder="请输入"
  tips="密码"
  slow|fast|空(不写默认中间)

  v-model="value"
>
  <!-- 同属性 placeholder-->
  <template #placeholder>
  </template>
  <!-- 同属性 tips-->
  <template #tips>
  </template>
  <!-- 自定义图标插槽 -->
  <template #icon={type="placeholder|tips"}>
  </template>
</Input>
```

## # <`Tips` />

[返回目录](#-目录)

```html
<!-- (版本 0.5.3) -->
<Tips
  empty
  @toggle="toggle = $event"
  position="right,left,bottom"
  visible="hover|click"
  delay="100"
>
  <!-- 
   visible="hover|click" 新增
   hover: 鼠标移入时显示
   click: 点击时显示
    -->
  <!-- 
  empty 新增, 空样式
  @toggle="toggle = $event"
  状态改变是触发
   -->
  .......
</Tips>
```

#### - `arrow`: 显示箭头

```html
<!-- [notice|warn|simply]: 内置样式, 不喜欢可以background="..." color="..." -->
<Tips class="notice|warn|simply|arrow|animate" ... />
<Tips> ..... </Tips>
```

#### 基础配置

```html
<Tips
  // 是否显示
  visible="Boolean"
  // 偏移位置
  offset="Number"

  // 显示内容
  title="String"
  content=" 条更新"

  // 显示位置 按照顺序显示
  position="right,top,left,bottom"
  // 滚动延迟时间 ms
  delay="10"
  // 颜色 背景色 边框宽度
  background="red|#f00"
  color="red|#f00"
  boder="3"
/>
```

## # <`Stream` />

[返回目录](#-目录)

### `组件池`

```html
<!-- bridge="property" 绑定属性: columns对应属性 -->
<Stream
  type="组件名|div|Card|s-flyweight|..."
  bridge="key"
  :columns="[{key:1, name:'x'}]|{key:1, name:'x'}"
  [...组件的属性]
>
  <!-- 插槽 #1中的1 为插槽名称 对应columns中的key对应的值决定, 由bridge指定 -->
  <template #1="{ name }"> {{name}} </template>
  <template #2> 2 </template>

  <template #default> 默认输出[可以不写] </template>
</Stream>
```

#### `示例`

```html
<template>
  <Stream
    class="form"
    :T="[
      /* slot|name|type=>name 插槽名称 */
      { type: 'name', label: '输入框' },
      { type: 'state', label: '选择任务', data: [{label, value}, ...] },
      { type: 'state', label: '选择事件', data: [{label, value}, ...] },
    ]"
  >
    <template #state="{ type, label, index, data }">
      <div class="form_item">
        <el-select size="mini" v-model="search[type]" :placeholder="label">
          <el-option
            v-for="item in data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </template>
    <template #default="{ type, label, index }">
      <div class="form_item">
        <el-input
          size="mini"
          v-model="search[type]"
          :placeholder="label"
        ></el-input>
      </div>
    </template>
  </Stream>
</template>
<script setup>
  // 导入
  import { Stream } from "@soei/flyweight";
</script>
```

## # <`Card` />

[返回目录](#-目录)

````html
<!-- `Card` 新增 `#subtitle` 插槽 与 `#icons` 同级 -->
<!--
┌───────────────────────┐
│ #title                │
│  └─#subtitle──#icons  │
│               └─#icon │
│-----------------------│
│  #content             │
│  └─ tag.card-content  │
│   └─ #inner           │
│                       │
└───────────────────────┘
-->
``` ### 其它使用 ```html
<!-- 版本 0.4.0 -->

<!--
┌───────────────────────┐
│  #title               │
│   └──────────#icons   │
│               └─#icon │
│-----------------------│
│  #content             │
│  └─ tag.card-content  │
│   └─ #inner           │
│                       │
└───────────────────────┘
层级关系
    -->
<!-- 如果不写插槽 则为默认插槽,替换title和content -->
<Card>
  <!-- 插槽 #icon 删除 -->
  <!-- 
┌───────────────────────┐
│ title           [...]X│
│-----------------------│
│                       │
│                       │
│                       │
└───────────────────────┘
    中括号位置 为插槽内容
    -->
  <template #icon>-</template>
  <!-- 替换删除在内的内容 -->

  <!-- 
┌───────────────────────┐
│ title            [...]│
│-----------------------│
│                       │
│                       │
│                       │
└───────────────────────┘
    中括号位置 为插槽内容
    -->

  <template #icons>-</template>

  <!-- 以前版本  -->

  <!-- 
┌───────────────────────┐
│  #title               │
│-----------------------│
│                       │
│  #content             │
│                       │
└───────────────────────┘
    -->

  <template #title>-</template>
  <template #content>-</template>
</Card>
````

### `版本` 0.3.12 优化 和 `部分代码`优化

```html
<Card [space|space="around|evenly"|nothing] ... />
```

### `示例`

```html
<!-- auto-scroll 默认显示滚动条样式 -->
<s-card auto-scroll class="your-class"></s-card>
<!-- hover-scroll 鼠标移入显示滚动条样式 -->
<s-card hover-scroll class="your-class"></s-card>
<style lang="scss">
  .your-class {
    /* 设置滚动条颜色 */
    --scrollbar-color: red;
    /* 设置滚动条宽度 */
    --scrollbar-width: 10px;
  }
</style>

<!-- 设置高度 -->
<s-card height="100% - 10px"></s-card>

<!-- 设置边距 -->
<s-card offset="10px"></s-card>
<s-card :offset="[10]"></s-card>

<!-- 带删除的卡片 -->
<s-card :close="true" #content @close="close"></s-card>
<!-- 设置删除按钮颜色 -->
<s-card
  :close="{
		color: 'red'
	}"
  #content
  @close="close"
></s-card>

<s-card :close="true" @close="close">
  <template #content>呈现内容</template>
</s-card>
<script setup>
  let close = () => {
    console.log("close");
  };
</script>

<s-card
title="标题"
class="flyweight"

// ** 布局 **
flex row center column

// ** 边距 **
offset="20, 0, 10, 0"

// ** 是否显示关闭按钮 **
:close="true"
@close="close"

// ** 插槽 **
[#content, #inner, #default]

> </s-card>

```

## # <`Flyweight` />

[返回目录](#-目录)

- `#mix` 插槽
- `--flyweight-line-offset`: 30px;
- `--flyweight-min-width`: 400px

```html
<Flyweight ... :flys="list" ...>
  <template #title="{ width }">
    <!-- 标题栏固定显示 -->
    <Card
      height="30px"
      :width="width"
      style="position: sticky; top: 0; z-index: 1000"
    >
      <div>Title</div>
      <div>Source</div>
      <div>Date</div>
    </Card>
  </template>
  <template #mix="{ length, end, ... }">
    <Stream type="span" :columns="{ type: length == 0 ? 0 : end ? 1 : '-1' }">
      <template #0>
        <Card height="100% - 10px" width="100%" center nothing vcenter>
          空空如也~
        </Card>
      </template>
      <template #1> ~ 这是底线 ~ </template>
      <template #-1>...</template>
    </Stream>
  </template>
</Flyweight>
```

Or

```html
<s-flyweight
  ...
  h="容器高"
  w="容器宽"
  width="内容宽"
  height="内容高"
></s-flyweight>
```

Or

```html
<div style="height:100px;width:300px;">
  <!-- 确认父容器 宽 高 存在, 依赖父容器 `宽`, `高` 计算 -->
  <s-flyweight ...></s-flyweight>
</div>
<template>
  <Card class="flyweight-test" flex column simply>
    <template #title>
      <div>Flyweight Test</div>
    </template>
    <template #inner>
      <Card class="applist" background="#f7f7f7" border="0.1px" height="100%">
        <Flyweight
          :flys="flys"
          hover-scroll
          scroll-x
          auto
          :view="view"
          :width="100"
          padding
          height="100% - 10px"
          :offset="[10, 10]"
        >
          <template #default="{ data, x, y, width, height, space, i }">
            <div
              class="flyweight-item demo"
              :class="{ [`flyweight-item-${i & 3}`]: true}"
            >
              {{ data.name }}
            </div>
          </template>
          <template #end>
            <div>end</div>
          </template>
        </Flyweight>
      </Card>
    </template>
  </Card>
</template>
```

```html
<!-- scroll-x 横向滚动, 无[scroll-x]属性这是上下滚动 -->
<s-flyweight scroll-x></s-flyweight>

<!-- hover-scroll 鼠标移入显示滚动条样式 -->
<s-flyweight hover-scroll class="your-class"></s-flyweight>
<s-card hover-scroll class="your-class"></s-card>
<style lang="scss">
  .your-class {
    /* 设置滚动条颜色 */
    --scrollbar-color: red;
    /* 设置滚动条宽度 */
    --scrollbar-width: 10px;
  }
</style>

<!-- 设置高度 -->
<s-flyweight height="100% - 10px"></s-flyweight>

<!-- 设置宽度 -->
<s-flyweight width="100% - 10px"></s-flyweight>
<s-flyweight :width="`100% - 10px`"></s-flyweight>
```

### `v-model:space` 字段

```javascript
{
  // --- 新增 ---
  // 总行数
  showrow,
  // 总列数
  showcolumn,

  // --- 原有 ---
  row, // 数据填充行数
  column, // 数据填前列数
}
```

### `v-model:space`, 计算空间显示 `行` 与 `列`

- 被通知对象 `notice`: {`row`, `column`}

```html
<!-- eg.
  当有5个元素, 
  当: :width="100% / 3", column = 3列, row = 2, 
  当: :width="100% / 5", column = 5列, row = 1,
  当: :width="100% / 7", column = 7列, row = 1
  ...
-->
<!-- VUE3 -->
<template>
  <s-flyweight v-model:space="notice"></s-flyweight>
</template>
<script setup>
  let notice = ref({ row: 0, column: 0 });
  watch(
    () => notice.value,
    (val) => {
      console.log(val);
    },
  );
</script>

<!-- VUE2 -->
<template>
  <s-flyweight :space.sync="notice"></s-flyweight>
</template>
<script>
  export default {
    data() {
      return {
        notice: { row: 0, column: 0 },
      };
    },
  };
</script>
```

### `:auto` 默认值: `false`

当 `auto` 为 `true` 时, `:width` 赋值会被视为 `最小值`, 剩余空间自动填充

```html
<s-flyweight :auto="true" :width="100"></s-flyweight>
```

### `width`

```html
<!-- 添加`百分比`计算, 计算顺序, 左 => 右 -->
<s-flyweight width="100% / 2 - 10px"></s-flyweight>
<s-flyweight width="calc(100% - 100px)"></s-flyweight>
<s-flyweight width="100% - 100px"></s-flyweight>
<s-flyweight width="100px - 10px"></s-flyweight>
<s-flyweight width="100px"></s-flyweight>
```

### slot `end` 的呈现逻辑

```html
<!-- onend为滑动到底时, 回调函数 -->
<s-flyweight :flys="..." @onend="...">
  <template #default="{ data, index }"> 呈现内容 {{data.*}} </template>
  <template #end> ...显示在最下面的相关信息 </template>
</s-flyweight>
```

### `:top`

```html
<s-flyweight :top="滚动高度"></s-flyweight>
```

```html
<Flyweight
  :index="0"
  :view="{id: Number, picker: 'id'}"
  :flys="list|Array"
  :width="80"
  :height="130"
  :offset="[0, 30]"
  @onend="Function"
>
  <template #default="{data, index}"> ...todo </template>
</Flyweight>
```

### `index` 和 `view` 只生效一个

### _`index`_ 定位索引

```javascript
  // 格式
  Number;
  :index="10";
```

### _`view`_ 指定显示哪个索引

```javascript
  // 格式
  {
    // 定位属性
    id: Number,
    // 定位属性字段名称
    picker: String
  }
  :view="{id: 10, picker: 'id'}";
```

### _`flys`_ 显示的`数据列表`

```javascript
// 格式
Array;
:flys="[]";
```

### _`width`_ 单个容器 `宽度`

```javascript
// 格式
Number;
// 默认: 0, 占整行
:width="100";
```

### _`height`_ 单个容器 `高度`

```javascript
// 格式
Number;
// 默认: 100
:height="10";
```

### _`offset`_ 偏移量 _[`左右`, `上下`]_

```javascript
// 格式
Array = [左右, 上下];
:offset="[0, 30]";
```

### `@onend` 拉到`底部`时的回调

```javascript
// 格式
Function;
@onend="function(){}";
```
