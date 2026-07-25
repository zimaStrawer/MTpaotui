---
version: beta
name: Meituan-Errand-Redesign
description: "项目启动阶段从 Figma Variables、Text Styles 与组件库提取的设计系统说明。第一部分提供可直接用于工程的具体 Token，第二部分解释 Token 语义、组件固有属性和通用还原原则，不绑定具体页面。"

# PART 1 · MACHINE-READABLE DESIGN SYSTEM
# 本区是本项目具体参数的单一来源；正文不重复抄写相同数值。
colors:
  # 主题色 Brand
  brand-primary: "#FEE42B"
  brand-secondary: "#FFFBE4"
  accent-primary: "#F58B1D"
  accent-secondary: "#FFF5E9"

  # 中性色 Neutral
  text-primary: "#1B1D21"
  text-secondary: "#595D65"
  text-tertiary: "#8C9098"
  text-quaternary: "#DDE0E6"
  bg-page: "#F4F5F7"
  bg-container: "#FBFCFE"
  bg-black: "#282B31"
  divider: "rgba(27,29,33,0.05)"

  # 辅助色 Functional
  decorative-primary: "#804D30"
  decorative-secondary: "#FDD4B8"
  decorative-tertiary: "#FFF4EE"
  alert: "#FF090D"
  insurance-primary: "#079968"
  insurance-secondary: "#E7FFF2"

typography:
  # 中文标题
  headline:    { fontFamily: "PingFang SC", fontSize: 22px, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }
  title:       { fontFamily: "PingFang SC", fontSize: 18px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  title-sm:    { fontFamily: "PingFang SC", fontSize: 16px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  title-max:   { fontFamily: "PingFang SC", fontSize: 30px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  title-brand: { fontFamily: "Meituan Type", fontSize: 20px, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 }

  # 页签
  tab-active: { fontFamily: "PingFang SC", fontSize: 16px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  tab:        { fontFamily: "PingFang SC", fontSize: 16px, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 }

  # 正文
  body:           { fontFamily: "PingFang SC", fontSize: 14px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  body-secondary: { fontFamily: "PingFang SC", fontSize: 14px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }

  # 注释
  caption-strong:    { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  caption:           { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  caption-icon:      { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 600, lineHeight: 1.5, letterSpacing: 0 }
  caption-sm:        { fontFamily: "PingFang SC", fontSize: 11px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  caption-xs-strong: { fontFamily: "PingFang SC", fontSize: 10px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  caption-xs:        { fontFamily: "PingFang SC", fontSize: 10px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }

  # 数字 / 英文
  number:     { fontFamily: "SF Pro", fontSize: 14px, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }
  number-sm:  { fontFamily: "SF Pro", fontSize: 12px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 }
  number-xs:  { fontFamily: "SF Pro", fontSize: 11px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 }
  number-lg:  { fontFamily: "SF Pro", fontSize: 16px, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }
  display:    { fontFamily: "SF Pro", fontSize: 24px, fontWeight: 700, lineHeight: 20px, letterSpacing: 0 }
  display-lg: { fontFamily: "SF Pro", fontSize: 32px, fontWeight: 500, lineHeight: 1, letterSpacing: 0 }
  display-xl: { fontFamily: "SF Pro", fontSize: 36px, fontWeight: 700, lineHeight: 1, letterSpacing: 0 }

  # 装饰
  decorative: { fontFamily: "Meituan Type", fontSize: 12px, fontWeight: 700, lineHeight: 17px, letterSpacing: 0 }

rounded:
  "2": 2px
  "4": 4px
  "6": 6px
  "8": 8px
  "10": 10px
  "12": 12px
  "16": 16px
  "20": 20px
  full: 9999px

spacing:
  "2": 2px
  "4": 4px
  "6": 6px
  "8": 8px
  "10": 10px
  "12": 12px
  "16": 16px
  "20": 20px
  "24": 24px

# 初始组件提取只记录已确认的稳定外层属性。
# 整体尺寸与 Fixed/Hug/Fill 模式当时未被系统记录，不能在此反推或猜测。
# 复杂组件不得使用单一 typography 字段；文字样式由子文字槽位引用 typography Token。
components:
  NavigationBar:
    textColor: "{colors.text-primary}"
  Tab-Bar:
    backgroundColor: "{colors.bg-container}"

  物品类型选择:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 12px 16px
    gap: 10px
    chipBackground: "{colors.bg-page}"
  物品凭证:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
  物品重量:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
  物品确认按钮:
    backgroundColor: "{colors.bg-container}"
    accentColor: "{colors.brand-primary}"

  高信用骑士:
    backgroundColor: "{colors.insurance-secondary}"
    textColor: "{colors.insurance-primary}"
    padding: 8px 12px
  进度条:
    activeColor: "{colors.brand-primary}"
    doneColor: "{colors.text-tertiary}"
    pendingColor: "{colors.text-quaternary}"

  地址识别:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
  地址簿:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 16px 0
    gap: 10px
    accentColor: "{colors.accent-primary}"

  订单信息:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 12px 16px
    gap: 10px
  缩略地图:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"

  保价:
    backgroundColor: "{colors.bg-page}"
    accentColor: "{colors.insurance-primary}"
    rounded: "{rounded.8}"

  取收标签:
    backgroundColor: "{colors.text-primary}"
    rounded: "{rounded.6}"
  载具切换胶囊:
    backgroundColor: "{colors.bg-page}"
    rounded: "{rounded.full}"
  品牌心智:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
---

# 美团跑腿代办：设计系统

> **PART 2 · HUMAN-READABLE GUIDANCE**
> 本文形成于项目启动阶段，描述可从 Design Token 与组件库中确认的设计系统信息，不预判 Token 将出现在哪些具体页面。
> 产品业务与交互规则见 `product.md`；研发实现见 `MTprototype-tech-spec.md`。

---

## 文档使用方式

### 能从初始设计系统确认的内容

- Token 的名称、类型、数值、模式和语义分组。
- Text Style 的字体、字号、字重、行高和字距。
- 已检查组件的整体容器、内边距、子项间距、圆角、背景和描边。
- 组件集已经定义的变体轴和公共资源。

### 初始阶段不能确认的内容

- 每个 Token 在所有页面中的完整使用位置。
- 尚未检查页面中的局部例外和未来新增用法。
- 某个组件在页面中的外边距；外边距通常由父容器决定。
- 没有在组件库中绑定或命名的隐含设计意图。

### 事实优先级

1. 最新 Figma Variables、Text Styles 与组件库。
2. 本文件顶部结构化 Token。
3. 本文的语义和使用原则。
4. 开发具体页面时读取的目标 Figma 节点。
5. 当前代码只用于定位实现，不作为设计正确性的证据。

---

## 设计理念 · Principles

本项目使用“物可见、人可信、事可感”作为设计方向，通过清晰的信息层级和连续反馈提高委托体验的确定性。完整业务论述属于 `product.md`。

通用设计原则：

- 语义优先于装饰。
- 关键状态保持清晰、连续、可识别。
- 信息层级依靠字重、颜色和间距共同建立。
- 公共组件优先于页面内重复绘制。

---

## 色彩 · Color

### 主题色

- `brand-primary` 用于品牌锚点、主操作和明确选中态。
- `brand-secondary` 用于品牌浅底和轻量选中背景。
- 品牌色不应因单个页面的装饰需要被随意扩展。

### 强调色

- `accent-primary` 表达需要优先注意的信息。
- `accent-secondary` 是对应的浅色承载面。
- 强调色与品牌色职责分开，避免所有重点都使用同一种黄色。

### 中性色

- `text-primary → text-quaternary` 表达四级文字和失效层级。
- `bg-page` 用作页面背景，`bg-container` 用作容器背景。
- `bg-black` 用作深色面或遮罩基色。
- `divider` 用于轻量分隔和描边。

### 功能与装饰色

- `insurance-*`、`alert` 是具名功能色，不能扩展成通用成功/错误色。
- `decorative-*` 只用于插画和装饰，不承担功能状态。

新增颜色前先判断是否存在新的稳定语义。单个素材或组件内部渐变不应为了“统一”强行上升为全局 Token。

---

## 文字 · Typography

### 字体分工

- PingFang SC：中文标题、正文、页签和注释。
- SF Pro：价格、时间、里程、评分和展示数字。
- Meituan Type：品牌和明确的装饰文字。

### 文字层级

| 信息角色 | Token 组 |
|---|---|
| 标题 | `headline / title / title-sm / title-max / title-brand` |
| 页签 | `tab-active / tab` |
| 正文 | `body / body-secondary` |
| 注释 | `caption-strong / caption / caption-sm / caption-xs` |
| 数字 | `number / number-sm / number-xs / number-lg` |
| 展示数字 | `display / display-lg / display-xl` |
| 装饰文字 | `decorative` |

### 为什么组件不能只有一个 Typography

一个组件通常同时包含标题、正文、注释、数字和状态标签。给组件写一个笼统的 `typography` 会产生两个问题：

1. 无法表达多个文字层级。
2. 容易让开发把整个组件错误地套用同一字号和字重。

正确方式：

- 字体参数由独立 Text Style / Typography Token 管理。
- 组件只在稳定文字槽位上记录引用，例如 `titleStyle`、`bodyStyle`、`valueStyle`。
- 如果槽位样式会随内容或变体变化，则不写死在组件固有属性中，开发具体页面时读取组件实例。

文字还原必须同时核对字体、字号、字重、行高、字距和颜色，不能只核对字号。

---

## 布局 · Layout

### 间距体系

- 基础栅格为 4px，允许 2px 半档和 10px 节奏。
- 页面与同级区块可使用语义一致的间距 Token。
- 组件内部 padding 和 gap 属于组件固有属性，可在组件库中记录。
- 组件外边距通常属于父级布局，不应写入组件本身。

### 尺寸与 Sizing Mode

组件库初始提取时，应优先记录：

1. 整体宽度和高度。
2. 宽高是 Fixed、Hug 还是 Fill。
3. 最小/最大尺寸和宽高比。
4. Auto Layout 方向、对齐和分布。
5. 四边内边距和子项 gap。
6. 影响布局的描边、圆角和裁切。

本项目最初没有系统记录全部组件尺寸和 Sizing Mode，因此当前结构化区只保留已确认属性；缺失值必须回到组件库读取，不能猜测。

---

## 立体与深度 · Elevation

| 层级 | 处理 | 用途 |
|---|---|---|
| Flat | 无阴影 | 普通背景和区块 |
| Hairline | 轻描边 | 卡片、输入与分隔 |
| Soft | 轻投影 | 浮层、气泡和悬浮面板 |
| Modal | 投影与遮罩 | 弹窗和预览 |

具体阴影参数应作为 Effect Style 或组件固有属性读取，不根据页面截图猜测。

---

## 形状 · Shapes

- 小圆角用于角标、Chip 和细节。
- 中等圆角用于输入框、图片框和普通卡片。
- 大圆角用于主容器和面板。
- `full` 用于胶囊、头像和圆形标记。
- 圆角属于组件固有属性，应记录 Token 引用而不是视觉描述。

---

## 组件 · Components

### 组件固有属性

适合在项目启动阶段记录：

- 整体尺寸及 Fixed/Hug/Fill。
- Auto Layout 方向、对齐、分布。
- 内边距与子项 gap。
- 背景、描边、阴影、圆角和裁切。
- 变体轴、布尔属性、实例交换和可覆盖槽位。
- 图标、图片等资源的固定尺寸与比例。

不适合写成组件固有属性：

- 组件在某个页面中的外边距和绝对位置。
- 页面业务决定的显隐条件。
- 所有子文字共用的单一字号。
- 某个页面实例临时覆盖的文案、颜色或尺寸。

### 复杂组件的文字记录

需要记录文字时，应按槽位拆分：

```yaml
ExampleComponent:
  titleStyle: "{typography.title}"
  bodyStyle: "{typography.body-secondary}"
  valueStyle: "{typography.number-lg}"
```

只有组件库中已经明确绑定并长期稳定的槽位才写入；否则保持在 Text Style 层，避免重复事实来源。

### 当前结构化组件数据

顶部 `components` 仅保留项目初始提取时已确认的背景、圆角、padding、gap 和功能色。未记录的整体尺寸不代表不存在，而是需要从 Figma 组件库按需读取。

---

## 该做 / 不该做 · Do's and Don'ts

### Do

- 先理解 Token 语义，再读取具体数值。
- 组件优先记录尺寸、Sizing Mode、padding、gap、圆角和变体。
- 文字样式通过独立 Token 或明确槽位引用。
- 新页面开发时读取目标节点，补充组件库无法提供的局部信息。
- 修改 Token 或组件时同步更新结构化数据与工程映射。

### Don't

- 不在项目启动时编造 Token 对应的全部页面位置。
- 不把复杂组件概括成一个 Typography。
- 不把父级外边距写成组件固有属性。
- 不用页面截图反推已经可以从 Variables 或组件库读取的数据。
- 不把产品规则和研发架构混入设计系统文件。

---

## 响应式 · Responsive

项目启动阶段只定义跨页面成立的基础规则；具体页面的组件尺寸、特殊间距和素材锚点，开发时以目标 Figma 页面为准。

### 基础规则

- 以移动端为主要目标，页面在支持范围内铺满可用宽度，不对整张页面做等比例缩放。
- 屏幕宽度小于或等于 `448px` 时，页面内容铺满可用屏幕宽度。
- 屏幕宽度大于 `448px` 时，页面内容保持约 `448px` 宽，并在桌面浏览器中水平居中显示。
- 页面左右内容边缘默认使用 `spacing-8`，即 `8px`；这是页面外边缘留白，不属于组件内部 padding。页面节点明确给出其他值时，以页面设计为准。
- 普通内容区域默认采用 `width: Fill`、`height: Hug`，由内部内容决定高度。
- 输入框、按钮、页签、导航栏等交互控件可以使用稳定的固定高度；图片、插画和地图可以使用固定比例或明确的展示区域。
- 当前 Figma 实例尺寸只作为 referenceSize，不能直接推导成所有屏幕都适用的固定尺寸。
- 字号、字重和图标尺寸默认不随视口线性缩放；优先通过 Fill、间距、换行和裁切适配宽度。
- 文本变长时优先换行或使用设计稿规定的截断策略，不压缩字号，也不让文字遮挡相邻内容。
- 图片和 SVG 保持原始宽高比；需要适配时使用明确的裁切、缩放或左右锚定规则，禁止非等比拉伸。
- 页面高度随内容增长；需要占满屏幕时使用最小高度，而不是把页面内容锁定为固定高度。
- 固定在视口边缘的底部操作区必须为安全区预留空间，不能遮挡页面内容。

### 检查范围

- 至少检查 `320px`、`375px`、`390px`、`414px` 和 `448px` 宽度。
- 重点检查左右边距、内容换行、固定栏覆盖、横向溢出、图片比例和安全区。
- `448px` 以上属于桌面浏览器或更宽容器的预览场景，不应因此把移动端文字和控件整体放大。

### 规则边界

- 本节不记录某个具体组件的内部布局、页面特殊高度或素材绝对坐标。
- 公共组件的稳定变体和可替换槽位写在组件契约中；具体组件响应式规则在读取页面 Figma 节点时补充。
- AppShell、固定栏容器和安全区的代码组织属于 `MTprototype-tech-spec.md`，不在本文件中规定实现方式。

---

## 交付与集成 · Handoff

- Figma Variables / Text Styles → 本文件顶部结构化 Token。
- 结构化 Token → `src/design-tokens/tokens.css`。
- Figma Component Properties → 组件 Props 与变体类型。
- 组件外壳属性与文字 Token 分开记录，避免重复和错误覆盖。
- 开发具体页面时再读取页面节点，不在初始设计系统中预写页面映射。

---

## 附录 A：以后提取组件库的必填模板

```yaml
ComponentName:
  dimensions:
    width: 0px
    height: 0px
    widthMode: fixed | hug | fill
    heightMode: fixed | hug | fill
    minWidth: null
    maxWidth: null
    aspectRatio: null
  autoLayout:
    direction: horizontal | vertical | none
    align: start | center | end | stretch
    justify: start | center | end | space-between
    padding: 0px
    gap: 0px
  appearance:
    background: "{colors.*}"
    border: null
    radius: "{rounded.*}"
    effect: null
    clipContent: false
  variants: []
  assets: []
  textSlots:
    titleStyle: "{typography.*}"
    bodyStyle: "{typography.*}"
```

该模板是下一个项目建立 `design.md` 时的通用复盘产物。没有读取到的字段写 `null`，不能猜值。

## 附录 B：低频设计说明

- 中性色采用 H220 蓝调灰，用于约束扩展时保持统一色相；开发阶段不重新计算色值。
- 缺少 PingFang SC 时使用 Noto Sans SC / system-ui；固定品牌字优先导出轮廓 SVG。
- 阴影保持中性蓝调，具体参数以 Effect Style 或组件定义为准。
- 暗色模式尚未定义。
- 9px 特殊角标和系统状态栏文字不纳入常规 Typography Token。
