# 跑腿改版原型 · 技术需求与工程规范 (v2)

> Claude Code 项目上下文。建议保存为仓库根目录 `CLAUDE.md`。
> 本文档只覆盖**工程侧**。设计侧(视觉、token 值、组件规格、交互细节)以 `design.md` 与 Figma 源文件为准;冲突时以 Figma 为准。
> Figma 文件 key:`kA4fPhh917AHnA73fwT4HD`;改版稿根节点:`1524:27664`;组件库:`960:7565`。

---

## 0. 定位与目标(决定一切取舍)

- **是什么**:美团跑腿(帮取送)自主改版原型,用于可用性测试(n=8,拉丁方,"七夕送花"场景锚点)。**本期只做「帮取送」这一条主流程,单方案,不做 A/B。**
- **双重成功标准**:① 跑通测试;② 仓库被招聘方读到时,是"能上工程的真实项目",不是能跑的 demo。**后者的分主要来自代码怎么被读(§10),不是运行时功能。**
- **必须守住的产品命题**:核心用户需求是**确定性**而非速度。分析主线是**委托信任三角**,已落到具体 UI:
  - **物可见**:物品凭证、收货码、照片位("取件后生成"灰显占位)。
  - **人可信**:骑手卡片 + 徽章(信用骑手 / 鲜花使者 / 大件御用 / 极速神通)。
  - **事可感**:进度条 + 时间轴(预计取件 / 预计送达 / 到达 / 完成) + 情境提示("细雨连绵,骑手赶路不易")。

---

## 1. 技术栈(锁定)

| 层 | 选型 |
|---|---|
| 框架 | React + TypeScript(`strict: true`) |
| 构建 | Vite |
| 路由 | React Router |
| UX 状态 | Zustand(**仅内存,不落盘**) |
| 样式 | Tailwind,颜色/间距/圆角全部映射自 Figma Token(§4) |
| 数据 | Mock 数据层,藏在类型化接口后(§5) |
| 包管理 / 运行时 | pnpm / Node 20+ |

**分发分三期**(与业务代码解耦,一套代码通吃):Vercel 发链接 → PWA 添加到主屏幕(`manifest` + `display:standalone` + iOS `apple-touch-icon`)→ Capacitor 打本地包。前期只做前两步。

---

## 2. 目录结构

```
src/
  app/            # 路由、全局 Provider、根级 ErrorBoundary
  pages/          # 5 个路由(见 §6),每个一个目录
  components/     # 跨路由复用的受控组件(纯 props 函数)
  design-tokens/  # 从 Figma 导出的 token(§4)
  data/
    models/       # 领域类型(§5)
    repositories/ # 接口定义 + mock 实现(换真后端只动这里)
    mock/         # mock 数据
  store/          # Zustand,UX 状态(仅内存)
  lib/            # 纯工具函数
```

拆分依据:**按复用拆组件,不按重渲染拆**。

---

## 3. 工程约束

- `strict: true`,禁止 `any` / `@ts-ignore`。
- 单文件 ~150 行为准,过长即拆(准则,非纪律)。
- **数据边界**:组件不在内部直接请求数据;数据来自 store 或 repository,组件只吃 props。
- **互斥状态用一个 enum / union,不堆多个 Boolean。**
- **无魔法数字**:所有色值/间距/圆角走 token。
- 埋点虽本期不做(§14),但组件里**事件从一处流出**的写法先保持(不要在组件里散记),将来集中接 `track()`。

---

## 4. 设计 Token 契约

三层:**primitive → semantic → component**。Figma 分组用中文语义名(主题色/中性色/辅助色,对齐 TDesign),**CSS 导出名用英文**,两者分离。中性色为蓝调灰(H=220);已有 Spacing、Radius 变量集合。保留领域中文标签(保价、提醒 等)。**实际 token 值让 Claude Code 通过 Figma MCP 从组件库(`960:7565`)现拉,不要手写猜值。**

---

## 5. 领域模型与数据层(最关键的"缝")

"能上工程"最硬的证据:**mock 藏在接口后,换真后端 = 换一个文件。** 领域模型据真实设计稿定义:

```ts
type BusinessType = '帮取送' | '帮我买' | '帮个忙';   // 首页业务 tab,本期只做「帮取送」

type AddressRole = 'pickup' | 'delivery';            // 取件 / 收件(同一路由两种角色)
interface Address {
  role: AddressRole;
  contactName: string;
  phone: string;
  detail: string;                                    // 如「景顺铂悦城9号楼」
}

type ItemCategory = '鲜花' | '文件' | '数码' | '食品' | '其他';
type InsuranceTier = 'none' | 'free_5x' | 'paid';    // 未保价最高赔5倍跑腿费 / 保价
interface Item {
  category: ItemCategory;
  weightKg?: number;
  volume?: { l: number; w: number; h: number };      // 三维体积
  insurance: InsuranceTier;
  note?: string;                                      // 物品描述 / 配送要求
}

type DeliveryVehicle = 'ebike' | 'car';              // 车型推荐规则见下
interface Order {
  business: BusinessType;
  pickup: Address;
  delivery: Address;
  item: Item;
  vehicle: DeliveryVehicle;
  feeYuan: number;
}

type TrackingStage =
  | 'accepting' | 'accepted' | 'picked' | 'delivering' | 'arrived' | 'completed';

interface Courier {
  name: string;
  rating: number;
  badges: string[];                                  // 信用骑手 / 鲜花使者 / 大件御用 / 极速神通
  pickupCode?: string;                               // 取件前 ✱✱✱✱,取件后 4 位数字
}
```

- **Repository 模式**:`OrderRepository` 是接口,`MockOrderRepository` 是实现;页面/store 只依赖接口。接真 API 新增 `HttpOrderRepository`,改一处注入即可。
- **车型推荐规则**(mock 层一条纯函数):物品尺寸大 / 过重 / 易损 / 距离遥远 / 天气恶劣 → 推荐汽车配送(下单页顶部提示条)。

---

## 6. 页面 / 路由模型(14 个 Figma frame → 5 个路由)

设计稿把每个状态各画一个 frame;代码里**同一屏幕的多个 frame = 一个路由 + 一个状态字段**,不是多个路由。

| 路由 | 组件 | Figma frame(node id) | 页内状态 / 分段 |
|---|---|---|---|
| 首页 | `HomePage` | 首页 `913:7841` | 业务 tab:帮取送 / 帮我买 / 帮个忙(**只做帮取送**) |
| 地址 | `AddressPage` | 取件 `878:5645`、收件 `885:6377` | 同一路由,`role = pickup / delivery`,流程中走两次 |
| 物品信息 | `ItemInfoPage` | 类型 `1380:20261`、重量 `1380:20291`、体积 `1380:20301` | 分段填写:类型 → 重量 → 体积 → 保价(slot) |
| 下单确认 | `OrderConfirmPage` | 下单页1 `856:1453`、页2 `1507:10832`、页3 `864:7899` | 物品区展开/精简、地址栏有无等状态 + 车型推荐提示 |
| 配送追踪 | `TrackingPage` | 配送页1 `1507:20230`、页2 `1507:20684`、页3 `1507:21772`、页4 `1507:22206`、页5 `1380:21404` | 时间轴 5 态(§8),订单完成是终态 |

**先建的共享组件**(跨路由复用):`StatusBar`、`NavigationBar`、`TabBar`、`HomeIndicator`、业务选择、地址填写-居中、物品类型选择、物品体积、保价、进度条、骑手卡片、物品凭证、取收标签、车型推荐提示条。

---

## 7. 基本用户使用流程(帮取送 · 七夕送花)

1. **首页**:默认选中「帮取送」tab → 点击进入下单。
2. **地址**:填/确认**取件地址**(`role=pickup`)→ 填/确认**收件地址**(`role=delivery`)。同一路由两次。
3. **物品信息**:选类型(鲜花)→ 填重量 → 填体积 → 选保价档位;必要时物品描述/配送要求。
4. **下单确认**:核对取件/收件地址、物品、配送车型、费用、保价;若命中车型推荐规则,顶部出现"推荐使用汽车配送"提示 → 提交订单。
5. **配送追踪**:时间轴自动推进(§8),全程展示骑手信息与徽章(人可信)、物品凭证与收货码/照片位(物可见)、进度与情境提示(事可感)。
6. **完成**:时间轴终态"订单已完成"(本次服务 XX 米、XX 分钟)。

> 这条 happy path 是本期唯一要跑通的流程;异常/失败分支见 §14,本期不做。

---

## 8. 配送追踪时间轴(该路由的核心内容)

真骑手流程几十分钟,测试等不了 → 用**压缩时间轴 mock**,下单后每 10–15 秒自动推进一档,对应已画好的 5 个 frame:

`待接单(accepting) → 待取件/预计取件(accepted,收货码 ✱✱✱✱) → 已取件/预计送达(picked,收货码显示 4 位) → 配送中/到达收件地(delivering→arrived) → 订单已完成(completed)`

- 收货码在 `picked` 时由 ✱✱✱✱ 揭示为 4 位数字。
- 每档的时间、文案、进度信号按"确定性"设计;情境提示条(天气)贯穿。
- 这是该路由的**设计内容**,不是额外"状态集";参与者下单后一分钟内看完整条弧线,无需任何跳转工具。

---

## 9. 状态管理

- UX 状态放 Zustand,**仅内存**:杀进程重开 = 干净起点。这**替代了 reset 按钮**,切换参与者时全退重开即可。
- 存储策略:UX 状态**不落盘**;(将来的)埋点数据才落盘。

---

## 10. 仓库呈现(最高杠杆的"真 vs demo")

- **README**:架构图 + token / 领域模型 / 路由模型 / 流程 总览(即本文档)。
- **commit 历史**:有递进,别一个 `init`。2000 行单文件 + 单次提交 = demo 石锤。
- **基础可访问性**:点击区域、语义标签、对比度——做一点即可,别过度。

---

## 11. 取舍顺序(规则冲突时怎么权衡)

**P0 流程正确(5 路由走通) > P1 配送时间轴稳定复现 > P2 手感真实(转场/弹层) > P3 视觉还原(用 token) > P4 代码干净**

---

## 12. 与 Figma 协作(Claude Code 用 Figma MCP)

- Claude Code 连 Figma MCP,**做到哪个路由拉哪个 frame**(用 §6 表里的 node id)的设计上下文、尺寸、token 值(Dev Mode / `get_design_context`)。链接就是导出,现读现用。
- 另需单独导出:图标 / 插画 SVG。

---

## 13. 构建顺序

1. **地基**:tokens、领域模型、repository(mock)、store、ErrorBoundary、一套共享组件(§6 底部清单)。
2. **第一条纵切**:建议 **物品信息页** 或 **下单确认页**(承载最想验证的交互)端到端跑通。
3. 其余路由 → **配送追踪时间轴**(§8)→ PWA 打磨 → Capacitor 打包。

---

## 14. 本期不做 / 延后

- **feature flags / A/B 变体**——单方案。
- **每页完整 loading / empty / error 状态集**——只做流程 happy path(配送时间轴除外,它是设计内容)。
- **失败 / 异常态**(骑手异常、地址识别失败等)——延后。
- **埋点**——最后再做,本期只保留"事件从一处流出"的写法习惯,不实现 `track()`。
- 性能预算 / 虚拟滚动 / 懒加载(除非真出现超长列表);分析 SDK;reset / 跳转运营工具;真后端 / 鉴权。
