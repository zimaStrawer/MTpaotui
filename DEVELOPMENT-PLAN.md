# 跑腿改版原型 · 开发计划

> 配套文档:产品需求见 `product.md`,设计还原见 `design.md`,工程规范见 `tech.md`。
> 本计划按技术规格的里程碑展开;每页的具体设计信息在**开工该页时**由需求方提供,配合 Figma MCP 现拉对应 frame。
> 优先级仲裁见 `tech.md` §1:**P0 流程正确 > P1 时间轴稳定 > P2 手感 > P3 视觉还原 > P4 代码干净**。

---

## 阶段总览

| 阶段 | 内容 | 产出 / 验收 | 依赖 |
|---|---|---|---|
| M0 | 工程脚手架 | `pnpm dev` 可跑,strict TS 零报错,Vercel 可发链接 | — |
| M1 | 地基(tokens / 模型 / 数据层 / store / 共享组件) | 组件在演示路由可见,mock 数据经接口流出 | Figma MCP(组件库 `960:7565`) |
| M2 | 第一条纵切:物品信息页 | 类型→重量→体积→保价 分段流程端到端 | 该页设计信息 + frame `1380:20261/20291/20301` |
| M3 | 首页 + 地址页 | 首页→取件地址→收件地址 可串联 | 各页设计信息 + 对应 frame |
| M4 | 下单确认页 | 全流程可提交订单,车型推荐提示生效 | 该页设计信息 + frame `856:1453` 等 |
| M5 | 配送追踪时间轴 | 下单后 5 态自动推进,收货码揭示,一分钟看完弧线 | 该页设计信息 + 5 个 frame |
| M6 | 收尾:PWA + 仓库呈现 | 可添加到主屏幕;README 完整 | — |
| 延后 | Capacitor 本地包 | — | 测试前视需要 |

---

## M0 · 工程脚手架

- [ ] Vite + React + TypeScript(`strict: true`,tsconfig 禁 `any` 路径)
- [ ] pnpm、Node 20+;ESLint(含 `no-explicit-any`)
- [ ] Tailwind 接入(先空 token 映射,M1 填值)
- [ ] React Router:5 条路由骨架(空页占位)+ 根级 `ErrorBoundary`
- [ ] 目录结构按 `tech.md` §2 建齐:`app / pages / components / design-tokens / data(models·repositories·mock) / store / lib`
- [ ] Vercel 部署跑通(发链接是第一分发形态)

**验收**:5 条路由能空转切换;线上链接可访问。

## M1 · 地基

- [x] **Design tokens**:经 Figma MCP 从组件库 `960:7565` 拉取(与 design.md 交叉校验一致),落 `design-tokens/tokens.css`(Tailwind 4 `@theme`)
- [ ] **领域模型**:按 `product.md` 第 10 节落 `data/models/`(`Order / Address / Item / Courier / TrackingStage` 等 union 类型)
- [ ] **数据层**:`OrderRepository` 接口 + `MockOrderRepository` 实现;车型推荐规则为 mock 层纯函数
- [ ] **Store**:Zustand 仅内存;互斥状态用 union 不堆 Boolean;事件从一处流出的写法立规
- [ ] **共享组件全部按需建**(不预建;变体信息随每页开工时提供,Figma 变体 → React props/状态枚举):
  - **不实现的系统 UI**:`StatusBar`、`HomeIndicator` 由真机系统提供,Figma frame 里对应图层实现时跳过;工程侧只做安全区适配(`viewport-fit=cover` + `env(safe-area-inset-*)`)
  - `TabBar` 本期流程用不到,不做(设计中出现再议)
  - `NavigationBar` 是应用内 UI(全屏网页无系统返回),各路由显示状态不同,首个用到的页面开工时建
  - 其余(业务选择、地址填写-居中、物品类型选择、物品体积、保价、进度条、骑手卡片、物品凭证、取收标签、车型推荐提示条)同样在首个使用页开工时建
- [ ] 组件按 `tech.md` §3 保持纯 props 受控:不直接请求数据、不导入 Mock

**验收**:token 映射就位,色值/间距/圆角零魔法数字。

## M2 · 第一条纵切:物品信息页 `ItemInfoPage`

> frame:类型 `1380:20261` / 重量 `1380:20291` / 体积 `1380:20301`

- [x] 开工前:接收该页具体设计信息,MCP 拉 frame 上下文(类型 `1380:20261` / 重量 `1380:20291` / 体积展开 `1476:31660`)
- [x] 分段状态机:`category → detail`(重量/体积/保价在 detail 段同屏);体积展开为卡内布尔
- [x] 表单数据集中页面层,确定时写入 store;`Item` 模型对齐真实设计(11 品类、保价 4 档、体积必填)
- [x] 出参约定:确定 → `store.item` + 跳转 `/order-confirm`

**验收**:选「鲜花」走完全段,store 中拿到完整 `Item`。✅(待真机视觉复核)

## M3 · 首页 + 地址页

**`HomePage`**(frame `913:7841`)
- [ ] 业务 tab:帮取送 / 帮我买 / 帮个忙,**只做帮取送**可点
- [ ] 入口进入下单流程

**`AddressPage`**(取件 `878:5645` / 收件 `885:6377`)
- [ ] 同一路由,`role = pickup / delivery` 走两次
- [ ] 表单对齐 `Address` 模型;流程顺序:取件 → 收件 → 物品信息

**验收**:首页 → 取件 → 收件 → 物品信息页 一条链能走。

## M4 · 下单确认页 `OrderConfirmPage`

> frame:`856:1453` / `1507:10832` / `864:7899`

- [ ] 三个 frame 归并为一个路由 + 状态字段(物品区展开/精简、地址栏有无)
- [ ] 汇总取件/收件地址、物品、车型、费用、保价
- [ ] 命中车型推荐规则时顶部提示「推荐使用汽车配送」
- [ ] 提交订单 → 经 repository 创建 → 跳转追踪页

**验收**:七夕送花 happy path 从首页到提交全通。

## M5 · 配送追踪时间轴 `TrackingPage`(P1 核心)

> frame:`1507:20230` / `1507:20684` / `1507:21772` / `1507:22206` / `1380:21404`

- [x] 44 秒压缩时间轴:`accepting → accepted → delivering → arrived → completed`
- [x] 取件/送件各 6 个位置快照,每 2 秒同步更新位置、时间和距离
- [x] 收货码:`delivering` 前 ✱✱✱✱,进入送件阶段后揭示 4 位
- [x] 信任三角全量呈现:骑手卡片+徽章(人可信)、物品凭证+照片位(物可见)、进度条+时间轴+情境提示(事可感)
- [x] 终态「订单已完成」(本次服务约 2.5 公里、17 分钟)
- [x] 推进逻辑住 mock 层/store,不进组件;刷新/重开 = 干净起点

**验收**:下单后不动手,约 44 秒看完整条弧线,顺序与文案稳定复现。

## M6 · 收尾

- [ ] PWA:`manifest` + `display:standalone` + iOS `apple-touch-icon`,真机添加主屏验证
- [ ] 转场/弹层手感打磨(P2,时间富余才做)
- [ ] 基础可访问性:点击区域、语义标签、对比度(做一点即可)
- [ ] README:架构图 + token / 领域模型 / 路由模型 / 流程总览

---

## 工作方式约定

1. **每页开工流程**:从 `product.md` 对应页面章节确认规则 → MCP 拉对应 Figma frame → 按 `design.md` 实现 → 按页面验收标准过检。
2. **数据层 / mock 随页面演进**:页面开发中发现模型缺字段、mock 缺数据时,由开发侧判断并直接调整,commit 信息说明改动原因;需求方无需关心这一层。
3. **Commit 纪律**:git 操作(commit/push)一律由需求方发起,开发侧改完并跑完验收后停在工作区等待;提交时仍保持小步递进、一个关切一个 commit,禁止巨型单提交。
4. **不做清单**以 `product.md` 第 12 节为准:无 A/B、无失败态、无埋点实现、无真后端。
