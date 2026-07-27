# 美团跑腿原型：研发与 AI 开发规范（v5）

> 本文是稳定的研发事实源，用于约束工程结构、AI 修改行为和交付质量。产品规则见 `product.md`，视觉与 Token 见 `design.md`，阶段进度见 `DEVELOPMENT-PLAN.md`，动态待办见 `implementation-gap.md`。

## 1. 工程基线

### 事实源优先级

发生冲突时按以下顺序判断：

1. `product.md`：产品定位、流程、页面规则、范围与验收；
2. `design.md` 与最新 Figma：视觉、Token、组件和响应式；
3. `tech.md`：架构、代码边界、检查与交付；
4. 当前代码：反映实现状态，不反向覆盖已明确的产品与设计规则。

业务阈值、页面文案和状态变化只在 `product.md` 定义；Figma 节点和精确视觉值只在设计事实源维护；实时里程碑和实现差异不写入本文。

### 技术栈

| 层 | 选型 |
|---|---|
| UI / 路由 | React 19 / React Router |
| 语言 | TypeScript，`strict: true` |
| 构建 | Vite |
| 状态 | Zustand |
| 样式 | Tailwind CSS 4 + CSS Custom Properties |
| 数据 | Repository 接口 + Mock 实现 |
| 环境 | Node.js 20+ / pnpm 10.17.1 |

工程优先级：`核心流程正确 > 追踪状态稳定 > 交互手感 > 视觉还原 > 代码整理`。该顺序只用于时间冲突时取舍。

### 常用命令

```bash
pnpm install
pnpm dev
pnpm check
pnpm test:watch
```

`pnpm check` 是完整质量门禁。局部命令包括 `typecheck`、`lint`、`stylelint`、`test` 和 `build`，以 `package.json` 为准。

## 2. 架构与数据边界

### 依赖方向

```text
app/router
    │
    ▼
pages ───────────────► components ─────► design-tokens
  │
  ├─► store
  ├─► data/models
  └─► data/repositories ───────────────► data/mock
```

- `pages` 负责路由级编排、页面临时状态和导航；
- `components` 负责可复用展示和局部交互，通过 Props 接收数据与事件；
- `store` 只保存需要跨路由延续的订单事实；
- `data/models` 保存领域类型、只读常量和纯业务判断；
- `data/repositories` 是提交订单和订阅追踪的唯一数据入口；
- `data/mock` 保存测试数据、报价、推荐规则和压缩时间轴；
- `design-tokens` 是设计 Token 的运行时代码映射。

页面不得直接读取 Mock；共享组件不得直接读取 Store 或 Repository；Store 和 Repository 不依赖页面组件。

### 订单数据流

```text
用户操作
→ 页面本地表单
→ Zustand 订单草稿
→ 页面组装 Order
→ OrderRepository.submitOrder()
→ OrderReceipt
→ OrderRepository.watchTracking()
→ TrackingPage 渲染同一阶段快照
```

稳定接口保持为：

```ts
interface OrderRepository {
  submitOrder(order: Order): Promise<OrderReceipt>;
  watchTracking(
    orderId: string,
    onStage: (stage: TrackingStage) => void,
  ): Unsubscribe;
}
```

未来接入真实服务时新增 Repository 实现并替换注入点，不修改页面调用方式。

### 状态与路由

- Store 保存服务模式、载具、取收地址、物品和订单回执；当前仅内存，不持久化历史订单；
- 未确认表单、展开状态、Toast、动画方向和提交中状态留在页面或组件；
- 能由已有数据推导的状态不重复存储；互斥状态使用联合类型，不堆叠 Boolean；
- `/`、`/address/:role`、`/item-info`、`/order-confirm`、`/tracking` 对应五个核心路由；
- 同一页面的多个 Figma Frame 使用显式页面状态，不新增路由；
- 缺少地址、物品或订单回执时，页面按 `product.md` 的流程守卫返回正确入口。

### 运行时约束

- 配送阶段只由 Repository 推进，页面不得建立第二条时间轴；
- 同一次位置刷新所需的坐标、预计时间和距离保存在同一快照；
- `setTimeout`、`setInterval`、媒体查询监听和 Repository 订阅必须在卸载时清理；
- 动效只解释状态，不承担唯一业务提交入口，并支持 `prefers-reduced-motion`；
- 移动端画布统一使用 `100%` 宽度和 `448px` 最大宽度，页面高度基于 `100dvh`；
- 固定栏必须处理安全区，并为滚动内容预留等量空间。

## 3. AI 编码规则

### 修改边界

- 修改前先阅读当前任务对应的产品章节、设计规范和目标代码；
- 优先复用现有组件、类型、纯函数、Store Action、Repository 和 Token；
- 每次只修改与任务直接相关的文件，不回退或覆盖工作区中的无关改动；
- 未经用户说明，不新增依赖、不替换技术方案、不扩大产品范围；
- 业务规则改变时先更新 `product.md`，再更新模型、Mock、页面和测试；
- 不把实时待办、实现进度或 Figma 精确值写入本文。

### TypeScript 与业务逻辑

- 保持 `strict: true`，所有 Props、业务状态和外部数据必须有明确类型；
- 禁止无理由使用 `any`、`@ts-ignore`、`@ts-expect-error` 或 `as unknown as`；
- 不得关闭 ESLint、Stylelint 或 TypeScript 规则来规避错误；
- 可空值必须显式处理，外部数据不得未经校验直接视为可信类型；
- 优先使用联合类型、泛型、类型守卫和纯函数，不用类型断言掩盖数据问题；
- 业务阈值和 Mock 数值集中定义，禁止在页面或 JSX 中复制。

### React 与副作用

- 页面负责数据编排，业务组件负责具体区块，通用组件负责复用交互；
- 组件通过 Props 接收数据与事件，不在内部导入 Mock 或发起订单请求；
- 复杂状态和副作用集中到页面层或自定义 Hook，避免在 JSX 中编写复杂业务判断；
- 可推导值不额外存入 State；动态列表使用稳定业务标识作为 Key；
- 单文件约 150 行是检查职责的提示，不是机械拆分指标；
- 事件入口集中，同一业务动作不能散落在多个互不关联的处理器中。

### 样式与资源

- 局部问题不得通过修改全局样式解决；全局样式只放基础规则和跨页面公共动效；
- 优先使用 `src/design-tokens/tokens.css` 中的语义 Token，不重复定义相同颜色、间距和圆角；
- Figma 特有装饰值可以局部使用，但需有明确来源且不能冒充通用 Token；
- 修改样式时检查不同视口和内容长度，不固定为某个 Figma 画板高度；
- SVG 保持 `viewBox` 与宽高比，资源按领域目录存放并使用语义名称；
- 不在页面伪造系统状态栏或 Home Indicator，安全区使用 `env(safe-area-inset-*)`。

## 4. 质量门禁

### 自动检查

每次代码任务完成后执行：

```bash
pnpm check
```

固定顺序为：

```text
TypeScript typecheck
→ ESLint
→ Stylelint
→ Vitest
→ production build
```

必须修复本次修改引入的全部错误。禁止通过关闭规则、删除测试、降低严格度或加入忽略注释获得通过。`git diff --check` 用于补充检查空白错误。

Vitest 优先覆盖领域纯函数和 Mock 状态：地址转换、运力派生、体积优先级、保价凭证、车型推荐和配送阶段。页面视觉不使用单元测试替代真实浏览器检查。

### 人工验收

- 从首页连续走通地址、物品、下单、追踪和完成页；
- 从下单确认页返回修改地址或物品，确认草稿保持一致；
- 检查防重复提交、路由守卫、定时器和订阅清理；
- 使用 320、375、390、414、448px 宽度检查横向滚动、文本遮挡、固定栏和安全区；
- 对关键 Figma 节点截图对比，确认图片、SVG 和动效状态正确；
- PWA 交付阶段额外验证添加主屏、独立窗口和 `viewport-fit=cover`。

## 5. 开发与交付流程

按以下顺序执行每次开发任务：

1. 从 `product.md` 确认业务目标、页面规则和验收结果；
2. 从 `design.md` 与 Figma 获取视觉规格和素材；
3. 阅读目标页面、共享组件、模型、Store 和 Repository 的现有实现；
4. 需要时先调整领域类型或纯函数，再修改页面和组件；
5. 补充与业务规则匹配的 Vitest 测试；
6. 执行 `pnpm check`，修复全部失败项；
7. 手动验证核心链路、返回修改和响应式；
8. 交付时说明修改内容、解决的问题、检查结果和未解决风险。

Git 提交、推送和发布由用户明确发起。工作区存在无关改动时，不回退、不覆盖，也不混入提交。

里程碑状态统一维护在 `DEVELOPMENT-PLAN.md`；尚未实现的产品项统一维护在 `implementation-gap.md`；本文只保存可长期复用的工程规则。
