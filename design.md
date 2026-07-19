---
version: alpha
name: Meituan-Errand-Redesign
description: "一套以'确定性'而非'速度'为核心的跑腿代办 App 设计系统。品牌以美团黄(#FEE42B)为唯一强调锚点,承载在一整套统一色相(H220)的蓝调中性灰之上——蓝调让大面积浅色界面更干净、长时间阅读更护眼。文字层级不靠加粗堆砌,而靠 PingFang 的字重(Regular / Medium / Semibold)递进;数字与英文交由 SF Pro,承担价格、时间、里程等高信息密度场景。整套系统服务于一个判断:把独一无二的物品托付给陌生人会产生焦虑,界面要回答的是'物可见、人可信、事可感'的信任三角,而不是复制打车软件的地图优先范式。"

# ─────────────────────────────────────────────
# TOKENS
# ─────────────────────────────────────────────

colors:
  # 主题色 Brand
  brand-primary: "#FEE42B"     # 品牌主色 · 美团黄
  brand-secondary: "#FFFBE4"   # 品牌浅底
  accent-primary: "#F58B1D"    # 强调橙 · 价格/时间/紧迫
  accent-secondary: "#FFF5E9"  # 强调橙浅底

  # 中性色 Neutral (统一色相 H220,浅→深饱和度递增)
  text-primary: "#1B1D21"      # 主文字
  text-secondary: "#595D65"    # 次要文字
  text-tertiary: "#8C9098"     # 三级/占位文字
  text-quaternary: "#DDE0E6"   # 四级/失效文字、浅填充
  bg-page: "#F4F5F7"           # 页面底
  bg-container: "#FBFCFE"      # 卡片/容器底
  bg-black: "#282B31"          # 深色底/深色卡片、遮罩基色
  divider: "rgba(27,29,33,0.05)"   # 分隔线/描边 (#1B1D21 @5%)

  # 辅助色 Functional
  decorative-primary: "#804D30"    # 插画/装饰-棕
  decorative-secondary: "#FDD4B8"  # 插画/装饰-肤
  decorative-tertiary: "#FFF4EE"   # 插画/装饰-肤浅
  alert: "#FF090D"                 # 提醒(功能语义色,非通用 error)
  insurance-primary: "#079968"     # 保价(功能语义色,非通用 success)
  insurance-secondary: "#E7FFF2"   # 保价浅底

typography:
  # 标题 Title
  headline:          { fontFamily: "PingFang SC", fontSize: 22px, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }
  title:             { fontFamily: "PingFang SC", fontSize: 18px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  title-brand:       { fontFamily: "Meituan Type", fontSize: 20px, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 }
  # 标签 Tab
  tab-active:        { fontFamily: "PingFang SC", fontSize: 16px, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0 }
  tab:               { fontFamily: "PingFang SC", fontSize: 16px, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0 }
  # 正文 Body
  body:              { fontFamily: "PingFang SC", fontSize: 14px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  body-secondary:    { fontFamily: "PingFang SC", fontSize: 14px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  # 注释 Caption
  caption-strong:    { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  caption:           { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  caption-icon:      { fontFamily: "PingFang SC", fontSize: 12px, fontWeight: 600, lineHeight: 1.5, letterSpacing: 0 }
  caption-sm:        { fontFamily: "PingFang SC", fontSize: 11px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  caption-xs-strong: { fontFamily: "PingFang SC", fontSize: 10px, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 }
  caption-xs:        { fontFamily: "PingFang SC", fontSize: 10px, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 }
  # 数字 Number (SF Pro)
  number:            { fontFamily: "SF Pro", fontSize: 14px, fontWeight: 500, lineHeight: 1.2, letterSpacing: 0 }
  number-sm:         { fontFamily: "SF Pro", fontSize: 12px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 }
  number-xs:         { fontFamily: "SF Pro", fontSize: 11px, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0 }
  # 装饰 Decorative
  decorative:        { fontFamily: "Meituan Type", fontSize: 12px, fontWeight: 700, lineHeight: 17px, letterSpacing: 0 }

rounded:
  "2": 2px      # 角标、细节
  "4": 4px      # 小标签、chip
  "6": 6px      # 输入框、列表项
  "8": 8px      # 卡片、图片框
  "10": 10px
  "12": 12px    # 大卡片、弹层
  "16": 16px    # 大图容器、底部面板
  "20": 20px
  full: 9999px  # 胶囊按钮、圆形头像/角标

spacing:
  "2": 2px
  "4": 4px      # 基础栅格(4 的体系)
  "6": 6px
  "8": 8px      # ★ 全局基准:页面左右边距 & 并列组件上下间距
  "10": 10px    # 美团常用节奏
  "12": 12px
  "16": 16px
  "20": 20px
  "24": 24px

# 从实际组件库(Figma node 960:7565)提取,非推测。仅列主要具名组件。
components:
  # 框架 Frame
  NavigationBar:
    textColor: "{colors.text-primary}"
  Tab-Bar:                  # 底部标签栏
    backgroundColor: "{colors.bg-container}"

  # 物可见 · 物品 Item
  物品类型选择:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 12px 16px
    gap: 10px
    typography: "{typography.body-secondary}"
    chipBackground: "{colors.bg-page}"
  物品凭证:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
    typography: "{typography.tab-active}"
  物品重量:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
    typography: "{typography.body}"
  物品确认按钮:
    backgroundColor: "{colors.bg-container}"
    accentColor: "{colors.brand-primary}"
    typography: "{typography.title}"

  # 人可信 · 骑手 Courier
  高信用骑士:               # 注意:绿底,非白底卡片
    backgroundColor: "{colors.insurance-secondary}"
    textColor: "{colors.insurance-primary}"
    typography: "{typography.caption}"
    padding: 8px 12px

  # 事可感 · 进度 Progress
  进度条:
    activeColor: "{colors.brand-primary}"
    doneColor: "{colors.text-tertiary}"
    pendingColor: "{colors.text-quaternary}"

  # 地址 Address
  地址识别:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    typography: "{typography.body-secondary}"
  地址簿:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 16px 0
    gap: 10px
    accentColor: "{colors.accent-primary}"

  # 订单 Order
  订单信息:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    padding: 12px 16px
    gap: 10px
    typography: "{typography.body}"
    priceType: "{typography.number-sm}"
  缩略地图:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"

  # 保价 Insurance
  保价:
    backgroundColor: "{colors.bg-page}"
    accentColor: "{colors.insurance-primary}"
    rounded: "{rounded.8}"
    typography: "{typography.body}"

  # 标签 & 载具 Label & Vehicle
  取收标签:                 # 取/送 角标(深底白字)
    backgroundColor: "{colors.text-primary}"
    typography: "{typography.caption-icon}"
    rounded: "{rounded.6}"
  载具切换胶囊:
    backgroundColor: "{colors.bg-page}"
    rounded: "{rounded.full}"   # 实测 40px 胶囊
  品牌心智:
    backgroundColor: "{colors.bg-container}"
    rounded: "{rounded.16}"
    accentColor: "{colors.brand-primary}"
    typography: "{typography.caption-strong}"
---

# 美团跑腿代办 · 设计系统 (Design Tokens)

> 面向后续开发的 single source of truth。Figma 里按类别分组(`主题色 / 中性色 / 辅助色`、`标题 / 正文 / 注释 / 数字 / 标签 / 装饰`),导出为 CSS 自定义属性时取语义叶子名:`中性色/text-primary` → `--color-text-primary`。组名只是设计端的收纳,不进变量名。

## 设计理念 · Principles

整套系统由一个判断驱动:**跑腿代办的核心用户需求是"确定性",不是"速度"。** 物品往往独一无二、不可替代,却要交给一个陌生人——这本身制造焦虑。所有设计决策都在回答**委托信任三角**:

- **物可见** — 被托付的物品要在下单、确认、跟踪各环节持续可视(`物品凭证` / `物品类型选择`)。
- **人可信** — 骑手的身份、评分、轨迹要清晰可感(`高信用骑士`)。
- **事可感** — 进度要以时间轴/状态机的形式让人随时感知(`进度条`)。


## 色彩 · Color

### 主题色 Brand
- **brand-primary** (`{colors.brand-primary}`) — 美团黄,唯一的品牌强调色。仅用于主 CTA(`button-primary`)、选中态、关键强调。**不作装饰性滥用。**
- **brand-secondary** (`{colors.brand-secondary}`) — 品牌浅底,用于选中项背景、轻提示区。
- **accent-primary** (`{colors.accent-primary}`) — 强调橙,专用于价格、时间、里程等"需要一眼看到的数字/紧迫信息",与主黄区分开。
- **accent-secondary** (`{colors.accent-secondary}`) — 强调橙浅底。

### 中性色 Neutral
统一色相 **H220**,浅端到深端饱和度递增(约 2% → 16%),构造上用 `RGB=(M−3t, M−2t, M)` 锁死色相,保证 Figma 里每一档 H 都精确等于 220。文字四级、背景两级、深色底一档、分隔线一档:

- **text-primary** (`{colors.text-primary}`) — 主文字。
- **text-secondary** (`{colors.text-secondary}`) — 次要文字。
- **text-tertiary** (`{colors.text-tertiary}`) — 三级/占位文字。
- **text-quaternary** (`{colors.text-quaternary}`) — 四级/失效文字,也可作浅填充(值很浅,勿用于关键正文)。
- **bg-page** (`{colors.bg-page}`) — 页面底,衬托白色卡片。
- **bg-container** (`{colors.bg-container}`) — 卡片与容器底(取代纯白)。
- **bg-black** (`{colors.bg-black}`) — 深色底/深色卡片;也作遮罩基色(叠透明度使用)。
- **divider** (`{colors.divider}`) — 分隔线/描边,`#1B1D21` 叠 5% 透明(可跟随任意底色)。

### 辅助色 Functional
- **insurance-primary / -secondary** (`{colors.insurance-primary}`) — **保价**功能色(绿)。产品语义色,非通用 success:绿色在本系统中专指保价路径。
- **alert** (`{colors.alert}`) — **提醒**功能色(红),用于警示/召回类信息。
- **decorative-primary / -secondary / -tertiary** — 插画与装饰专用(棕 / 肤 / 肤浅),不参与功能语义。

## 文字 · Typography

### 字体族 Font Family
- **PingFang SC** — 中文主字体。字重轴取 Regular(400)/ Medium(500)/ Semibold(600) 三档,层级靠字重递进。
- **SF Pro** — 数字与拉丁字符专用(价格、时间、里程、倒计时),高信息密度场景。
- **Meituan Type** — 品牌字,仅用于导航栏品牌标题(`title-brand`)。
- **Meituan Type Bold** — 装饰字,用于营销/装饰标签(`decorative`)。

> **替代字体**:无 PingFang / Meituan Type 授权时,中文用 **Noto Sans SC**;数字保留 SF Pro 或退回 system-ui;装饰字可用任意粗黑体近似。

### 层级 Hierarchy

| Token | 字体 | 字号 | 字重 | 行高 | 用途 |
|---|---|---|---|---|---|
| `{typography.headline}` | PingFang | 22 | 500 | 1.4 | 地址强调、页面大标题 |
| `{typography.title}` | PingFang | 18 | 600 | 1.4 | 页面标题 |
| `{typography.title-brand}` | Meituan Type | 20 | 400 | 1.4 | 导航栏品牌标题 |
| `{typography.tab-active}` / `{typography.tab}` | PingFang | 16 | 600 / 400 | 1.4 | 业务 Tab 选中 / 未选中 |
| `{typography.body}` / `{typography.body-secondary}` | PingFang | 14 | 500 / 400 | 1.5 | 正文 / 次要正文 |
| `{typography.caption-strong}` / `{typography.caption}` / `{typography.caption-icon}` | PingFang | 12 | 500 / 400 / 600 | 1.5 | 注释强调 / 注释 / 图标字 |
| `{typography.caption-sm}` | PingFang | 11 | 400 | 1.5 | 小注释 |
| `{typography.caption-xs-strong}` / `{typography.caption-xs}` | PingFang | 10 | 500 / 400 | 1.5 | 极小注释(下限字号) |
| `{typography.number}` / `{typography.number-sm}` / `{typography.number-xs}` | SF Pro | 14 / 12 / 11 | 500 / 400 / 400 | 1.2 | 价格/时间/里程等数字 |
| `{typography.display}` | SF Pro | 24 | 700 | 20px | 收货码、实付款等展示数字 |
| `{typography.decorative}` | Meituan Type | 12 | 700 | 17px | 装饰标签 |

### 原则 Principles
- **层级靠字重、不靠字号堆砌。** 同为 12px 的 `caption-strong`(500)与 `caption`(400)通过字重拉开主次,避免字号碎片化。
- **数字交给 SF Pro。** 价格、时间、里程用等宽感更强的 SF Pro,与中文正文形成信息分区。
- **10px 是下限。** `caption-xs` 是可用的最小中文字号;9px 及以下仅限极特殊角标(见 Known Gaps),不进 token。
- **行高:正文松、数字紧。** 正文/注释 1.5 便于阅读;常规数字为 1.2,展示数字 `display` 固定为 20px。

> Figma 中大部分文字样式行高设为 **Auto**,上表为对应的推荐渲染值(PingFang Auto ≈ 1.4–1.5);`display` 使用固定 20px 字高。

## 布局 · Layout

### 间距 Spacing
- **基础栅格 4px**,含 2px 半档;并保留 **10px** 作为美团式节奏。
- Tokens:`{spacing.2}` · `{spacing.4}` · `{spacing.6}` · `{spacing.8}` · `{spacing.10}` · `{spacing.12}` · `{spacing.16}` · `{spacing.20}` · `{spacing.24}`。
- 卡片内边距常用 `{spacing.16}`;列表项/输入框内边距常用 `{spacing.12}`;紧密信息块用 `{spacing.8}` / `{spacing.4}`。
- 大数值(如页面区块间距 24+ 以上)属于布局级,不进 token。

### 栅格与容器
- 移动端单列为主,内容宽度撑满屏幕。
- **布局常量(全局基准)**:所有页面**左右边距统一 `{spacing.8}`(8px)**;多个并列组件之间的**上下间距统一 `{spacing.8}`(8px)**。这是整套界面的节奏基准,优先级高于个别场景的间距选择。
- 订单确认页采用**信息优先**布局:物品/委托信息在上,地图/骑手在下(反地图优先)。

## 立体与深度 · Elevation

| 层级 | 处理 | 用途 |
|---|---|---|
| 0 (flat) | 无阴影无边框 | 页面底、普通区块 |
| 1 (hairline) | 1px `{colors.divider}` 描边于 `{colors.bg-container}` | 卡片、输入框 |
| 2 (soft) | 轻投影,**带一点色相**(非纯黑透明),约 `0 4px 16px rgba(28,30,33,0.06)` | 浮层、下拉、底部面板 |
| 3 (modal) | 更强投影 + 遮罩(`{colors.bg-black}` 叠 ~55% 透明) | 弹窗、图片预览 |

> 投影原则:**不用纯黑叠透明度**,阴影带一点中性蓝调色相,与整套 H220 中性色一致,视觉更干净。遮罩用 `bg-black` 作基色叠透明度(系统未单列 mask token)。

## 形状 · Shapes

### 圆角 Border Radius

| Token | 值 | 用途 |
|---|---|---|
| `{rounded.2}` | 2px | 角标、细节 |
| `{rounded.4}` | 4px | 小标签、chip、保价角标 |
| `{rounded.6}` | 6px | 输入框、列表项 |
| `{rounded.8}` | 8px | 卡片、按钮、图片框 |
| `{rounded.12}` | 12px | 大卡片、信息卡、弹层 |
| `{rounded.16}` | 16px | 大图容器、底部面板 |
| `{rounded.20}` | 20px | 超大容器 |
| `{rounded.full}` | 9999px | 圆形头像、圆形角标、胶囊标签 |

## 组件 · Components

> 以下组件**从实际组件库(Figma node `960:7565`)提取**——名称、圆角、内边距、token 绑定均为真实值,非推测。仅列主要具名组件;`Frame 20900xxx` 类未命名子片段未收录。

### 框架 Frame
- **NavigationBar** — 导航栏,文字 `{colors.text-primary}`。
- **Tab Bar** — 底部标签栏,`{colors.bg-container}` 底。

### 物可见 · 物品
- **物品类型选择** — `{colors.bg-container}` 底,圆角 `{rounded.16}`,内边距 12/16、间距 10;内部 chip 用 `{colors.bg-page}`,`{typography.body-secondary}`。
- **物品凭证 / 物品重量 / 物品体积** — 物品参数卡,`{colors.bg-container}`,圆角 `{rounded.16}`,强调用 `{colors.brand-primary}`。
- **物品确认按钮** — `{colors.bg-container}` 底 + `{colors.brand-primary}` 强调 + `{typography.title}`。

### 人可信 · 骑手
- **高信用骑士** — ⚠ **绿底**组件:`{colors.insurance-secondary}` 底 + `{colors.insurance-primary}` 文字,内边距 8/12,`{typography.caption}`。用绿色把"高信用"与保价信用体系呼应,**不是白底卡片**。

### 事可感 · 进度
- **进度条** — 进行中 `{colors.brand-primary}`、已完成 `{colors.text-tertiary}`、未开始 `{colors.text-quaternary}`。

### 地址
- **地址识别 / 地址簿 / 地址填写-居中** — `{colors.bg-container}`,圆角 `{rounded.16}`。地址簿为纵向自动布局,内边距 16/0、间距 10,强调用 `{colors.accent-primary}`。

### 订单
- **订单信息 / 下单页其余** — `{colors.bg-container}`,圆角 `{rounded.16}`,内边距 12/16、间距 10;金额用 `{typography.number-sm}`。
- **缩略地图** — `{colors.bg-container}`,圆角 `{rounded.16}`,强调 `{colors.brand-primary}`。

### 保价
- **保价 / 大保价** — `{colors.bg-page}` 底,圆角 `{rounded.8}`,强调 `{colors.insurance-primary}`,`{typography.body}`。
- **三变体**(node `1496:29632`,由「是否已选档位 × 物品是否易损」派生):
  - `未保价-提示`(默认)— 副标题"未保价最高赔付**5倍**配送费",5倍用 `{colors.accent-primary}`。
  - `未保价-建议`(易损品类:鲜花/蛋糕/数码)— 副标题"物品易损 建议您保价",整句 `{colors.alert}`。
  - `已保价-权益`(已选任一档位)— 副标题"享**高信用**骑手配送 物丢物损**全额赔**",强调词 `{colors.insurance-primary}`;选中 chip 为 `{colors.brand-secondary}` 底 + `{colors.brand-primary}` 描边 + 右上角勾角标。

### 标签 & 载具
- **取收标签** — 取/送角标,`{colors.text-primary}` 深底白字,圆角 `{rounded.6}`,`{typography.caption-icon}`。
- **载具切换胶囊** — `{colors.bg-page}` 底,胶囊圆角(实测 40px → `{rounded.full}`)。
- **品牌心智 / 动态催促标签** — `{colors.bg-container}` / 强调 `{colors.brand-primary}`,`{typography.caption-strong}`。

## 该做 / 不该做 · Do's and Don'ts

### Do
- 把 `{colors.brand-primary}` 留给真正的主 CTA 和选中态,不做装饰性铺色。
- 价格/时间/里程一律用 `{colors.accent-primary}` + `{typography.number}`(SF Pro),形成信息分区。
- 层级用 PingFang 字重(400/500/600)表达,而不是不断加大字号。
- 中性色只用这套 H220 蓝调阶梯;需要新灰时从阶梯里取,不要临时目测新灰。
- 页面左右边距、并列组件上下间距一律 `{spacing.8}`(8px)。
- 订单确认页保持"物品信息优先、地图其次"的反地图优先布局。

### Don't
- 不用纯黑 `#000` / 纯白 `#fff`;主文字是 `text-primary`,容器底是 `bg-container`。
- 不给中性色临时目测新值——散装灰/散装黄是这套系统之前最大的一致性问题。
- 投影不用纯黑叠透明度,要带一点色相(见 Elevation)。
- `insurance-primary`(绿)/`alert`(红)是**产品语义色**,不要当通用 success/error 到处用。
- `text-quaternary` 很浅,不要用于关键正文;它是失效态/浅填充用途。
- 中文正文字号不低于 10px(`caption-xs`)。

## 响应式 · Responsive

- 目标平台为移动端 App(iOS/Android),单列布局。计划以 **React + TypeScript + Vite** 构建 PWA 原型用于可用性测试。
- 触控目标:主要按钮/可点区域保证 ≥ 44px 高。
- 数字/时间等信息在小屏优先缩小而非折行。

## 交付与集成 · Handoff

- **Figma → CSS**:变量与样式名对应 `--color-*`、`--space-*`、`--radius-*`;文字暴露为 `--font-size-*` / `--font-weight-*` / `--font-family-*` 原语,复合样式(`body`、`title` 等)在组件层组合。
- **数据层建议**:token 单独成文件(如本 `design.md` 或 `tokens.css`),UI 与业务分离,便于将 mock 换成真实接口时只改一处。
- 完整 CSS `:root {}` 变量清单见配套 `tokens.css`(可由本文件 frontmatter 生成)。

## 已知缺口 · Known Gaps

- **展示型大数字**(SF Pro 20/24/32、DINPro 评分)尚未建为独立 token;当前散落在营销/详情场景,建议补一组 `数字/display-*`。
- **9px 取/送角标**与 **iOS 状态栏时间(SF Pro Semibold 15)** 属系统级/极特殊,刻意不进 token 体系。
- **组件规格**已从实际组件库(`960:7565`)提取(名称/圆角/内边距/token 绑定为真实值);但组件**内部逐元素**的精确间距/尺寸未逐一记录,以 Figma 为准。未命名的 `Frame 20900xxx` 子片段未收录。
- **暗色模式**未定义;`bg-black` 提供了深色底基础,但完整深色主题尚未建立。
