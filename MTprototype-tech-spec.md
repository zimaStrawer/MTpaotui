# 跑腿改版原型：研发技术规格（v4）

> 本文是项目的研发事实来源，回答“工程如何组织、状态和数据如何流动、怎样验证与交付”。
> 产品业务与页面交互见 `product.md`；视觉还原、Token 和组件规范见 `design.md`。

---

## 0. 文档边界

| 文档 | 单一职责 |
|---|---|
| `product.md` | 领域对象、业务规则、用户流程、页面交互和状态机 |
| `design.md` | 设计原则、Token、组件、响应式和视觉还原 |
| `MTprototype-tech-spec.md` | 技术栈、架构、代码组织、数据实现、测试和部署 |

研发文档不重复定义汽车推荐阈值、体积语录、收货码变化等产品规则。代码实现必须满足 `product.md`，视觉实现必须满足 `design.md` 与最新 Figma。

---

## 1. 工程目标

### 1.1 交付目标

- 支持核心流程在桌面浏览器、手机浏览器和 PWA 环境中稳定运行。
- 在没有真实后端的情况下提供可重复的完整测试体验。
- 保持清晰的数据边界，使 Mock 可替换为真实 HTTP 服务。
- 让项目目录、类型和提交历史能够直接说明架构意图。

### 1.2 工程优先级

`P0 核心流程正确 > P1 追踪状态稳定 > P2 交互手感 > P3 视觉还原 > P4 代码整理`

该顺序用于时间冲突时的取舍，不代表视觉还原可以忽略。

---

## 2. 技术栈与运行环境

| 层 | 选型 |
|---|---|
| UI | React |
| 语言 | TypeScript，`strict: true` |
| 构建 | Vite |
| 路由 | React Router |
| 客户端状态 | Zustand |
| 样式 | Tailwind CSS + CSS Custom Properties |
| 数据访问 | Repository 接口 + Mock 实现 |
| 包管理 | pnpm |
| Node.js | 20+ |

常用命令以 `package.json` 为准：

```bash
pnpm install
pnpm dev
pnpm build
```

---

## 3. 总体架构

### 3.1 依赖方向

```text
app/router
    │
    ▼
pages ───────────────► components
  │                       │
  ├─► store               └─► design-tokens
  ├─► data/models
  └─► data/repositories ──► data/mock
```

约束：

- 页面可以组合组件、读取 Store、调用领域纯函数和 Repository。
- 共享组件通过 props 接收数据和事件，不直接读取 Mock。
- Store 不依赖页面组件。
- Repository 接口不依赖具体页面。
- Mock 实现可以依赖领域类型和 Mock fixtures。
- 设计 Token 不依赖业务或页面。

### 3.2 运行时数据流

```text
用户操作
  → 页面本地表单状态
  → Zustand 订单草稿
  → 页面组装 Order
  → OrderRepository.submitOrder()
  → OrderReceipt
  → OrderRepository.watchTracking()
  → TrackingPage 渲染阶段状态
```

---

## 4. 目录结构

```text
src/
  app/
    App.tsx
    AppErrorBoundary.tsx
    router.tsx
  pages/
    home/
    address/
    item-info/
    order-confirm/
    tracking/
  components/
  design-tokens/
    tokens.css
  data/
    models/
      order.ts
      tracking.ts
    repositories/
      order-repository.ts
      mock-order-repository.ts
      index.ts
    mock/
      fixtures.ts
      recommend-vehicle.ts
      service-quotes.ts
      tracking-timeline.ts
  store/
    order-draft-store.ts
  lib/
  assets/
```

职责：

- `pages`：路由级编排、页面临时状态和导航。
- `components`：跨页面复用或具备独立语义的受控组件。
- `data/models`：把 `product.md` 的领域对象和纯业务判断转成类型与函数。
- `data/repositories`：提交订单和订阅追踪的数据边界。
- `data/mock`：当前原型环境的数据、报价、推荐和时间轴。
- `store`：跨路由共享的订单草稿和订单回执。
- `design-tokens`：`design.md` 的工程映射。

---

## 5. 产品模型的代码映射

产品定义以 `product.md` 为准；研发层只规定代码落点。

| 产品概念 | 代码位置 |
|---|---|
| 业务、服务、地址、物品、保价、载具、订单 | `src/data/models/order.ts` |
| 配送阶段与骑手 | `src/data/models/tracking.ts` |
| 服务切换、地址交换、体积分类等纯判断 | `src/data/models/order.ts` |
| 车型推荐 | `src/data/mock/recommend-vehicle.ts` |
| 报价与预计时间 | `src/data/mock/service-quotes.ts` |
| 场景地址、骑手和环境数据 | `src/data/mock/fixtures.ts` |
| 追踪阶段持续时间 | `src/data/mock/tracking-timeline.ts` |

实现约束：

- 领域类型使用 union、interface 和只读常量表达。
- 可复用的业务判断写成无副作用纯函数。
- 页面不复制阈值或重新编写等价判断。
- 互斥业务状态使用单个 union，不使用多个 Boolean 组合。
- 产品规则修改时，先更新 `product.md`，再更新模型、Mock 和测试。

---

## 6. 状态管理

### 6.1 Zustand Store

`src/store/order-draft-store.ts` 保存跨路由订单草稿：

- 当前业务和服务模式。
- 配送载具。
- 取件与收件地址。
- 物品信息。
- 提交成功后的订单回执。

Store Actions：

- `setServiceMode`
- `setVehicle`
- `setAddress`
- `swapAddresses`
- `setItem`
- `setReceipt`
- `reset`

`setServiceMode` 内部调用领域纯函数处理地址转换，页面只负责触发模式变化和播放动画。

### 6.2 页面本地状态

以下状态保留在页面或组件内部：

- 尚未确认的表单输入。
- 展开/收起状态。
- 当前 Toast。
- 当前动画版本或方向。
- 提交中状态。
- 仅影响当前组件的提示条关闭状态。

判断原则：需要跨路由保持的订单事实放 Store；关闭组件即可丢弃的展示状态放本地。

### 6.3 持久化

- 当前 Store 仅内存，不写 Local Storage。
- 刷新、关闭或重开应用允许回到干净起点。
- 该策略服务于连续可用性测试，不代表正式产品的数据策略。

---

## 7. Repository 与 Mock

### 7.1 接口

```ts
interface OrderRepository {
  submitOrder(order: Order): Promise<OrderReceipt>;
  watchTracking(
    orderId: string,
    onStage: (stage: TrackingStage) => void,
  ): Unsubscribe;
}
```

`OrderRepository` 是页面访问订单数据的唯一入口。

### 7.2 当前实现

`MockOrderRepository` 负责：

- 模拟提交延迟。
- 生成递增订单号。
- 返回固定测试骑手与收货码。
- 根据 Mock 时间轴依次通知配送阶段。
- 返回取消订阅函数，供页面卸载时清理。

注入点位于：

```ts
// src/data/repositories/index.ts
export const orderRepository: OrderRepository = new MockOrderRepository();
```

未来接入真实服务时新增 `HttpOrderRepository` 并替换注入，不修改页面调用方式。

### 7.3 Mock 与产品规则

- Mock 的业务阈值和时间参数必须与 `product.md` 保持一致。
- Mock 数据只用于测试，不应散落在 JSX 中。
- 页面不得根据“当前是 Mock”写特殊业务分支。
- 具有业务含义的 Mock 常量应集中命名并可测试。

---

## 8. 路由与页面组织

### 8.1 路由

| 路由 | 页面 | 主要职责 |
|---|---|---|
| `/` | `HomePage` | 创建订单草稿入口 |
| `/address/:role` | `AddressPage` | 复用取件/收件两种地址角色 |
| `/item-info` | `ItemInfoPage` | 编辑并提交完整物品信息 |
| `/order-confirm` | `OrderConfirmPage` | 汇总草稿、选择服务、提交订单 |
| `/tracking` | `TrackingPage` | 订阅并展示配送状态 |

### 8.2 Figma Frame 与路由

同一页面的多个 Figma Frame 实现为一个路由内的显式状态，不为每个 Frame 建路由。

| 页面 | Figma 节点 |
|---|---|
| 首页 | `913:7841` |
| 取件/收件地址 | `878:5645`、`885:6377` |
| 物品信息 | `1380:20261`、`1380:20291`、`1476:31660` |
| 下单确认 | `856:1453` |
| 配送追踪 | `1507:20230`、`1507:20684`、`1507:21772`、`1507:22206`、`1380:21404` |

### 8.3 路由守卫

当前使用页面级检查：

- 下单确认页缺少地址或物品时重定向首页。
- 配送追踪页缺少订单回执或订单数据时重定向首页。

若后续页面增加，应避免在多个页面复制守卫条件；可抽为 Loader 或共享 Hook。

### 8.4 应用画布与页面容器

所有路由共享同一套移动端应用画布约束，由 `AppShell` 统一提供：

- `width: 100%`，在 Web 预览场景使用 `max-width: 448px`。
- `min-height: 100dvh`，不把页面整体高度固定为某个 Figma 画板高度。
- 宽屏预览时水平居中，移动端视口内铺满。
- 统一处理横向溢出，默认禁止页面出现横向滚动条。

页面组件只负责页面自己的背景、顶部安全区、滚动内容和业务布局，不重复声明 `mx-auto min-h-dvh max-w-md`。当前代码中这些规则仍分散在各页面，后续应抽出 `src/components/AppShell.tsx` 并通过根路由布局统一包裹页面。

固定在视口边缘的 Tab Bar、确认栏等区域不依赖页面内容流定位，应使用共享的固定层容器：

- 固定层自身覆盖视口边缘。
- 固定层内部再次使用 `width: 100%` 和 `max-width: 448px`。
- 底部高度叠加 `env(safe-area-inset-bottom)`。
- 页面滚动内容必须预留等量底部空间，避免被固定层遮挡。

`AppShell` 只负责应用画布，不承载页面背景渐变、业务状态、页面专属安全区偏移或具体组件尺寸。

---

## 9. 定时器、订阅与动效实现

- 所有 `setTimeout`、`setInterval`、媒体查询监听和 Repository 订阅必须在卸载时清理。
- 配送阶段只由 Repository 推进，页面不另建第二条阶段时间轴。
- 阶段内地图快照由追踪组件维护，并在阶段变化时重置。
- 同一次位置刷新所需的坐标、预计时间和距离保存在同一快照对象中。
- 动效必须支持 `prefers-reduced-motion` 降级。
- 用 CSS transition/keyframes 实现展示动效；业务状态变化仍由 React 状态驱动。
- 不使用动画完成回调作为唯一业务提交入口。

---

## 10. Design Token 集成

- `design.md` 是 Token 和视觉规范来源。
- `src/design-tokens/tokens.css` 是运行时代码映射。
- Tailwind 类应引用语义 Token，例如 `bg-bg-page`、`text-text-primary`。
- 不为近似颜色新建散装色值。
- Figma 特定素材的装饰颜色或渐变可作为组件级值，但应有来源注释。
- 字体、字号、字重、行高、颜色、间距和圆角不得目测猜测。
- SVG 保持 `viewBox` 与宽高比，禁止通过不匹配的宽高拉伸。

---

## 11. 编码约束

- 保持 TypeScript `strict: true`。
- 禁止 `any` 和 `@ts-ignore`。
- 组件通过 props 接收数据与事件，不在内部直接请求或导入 Mock。
- 页面负责数据编排，组件负责展示和局部交互。
- 单文件约 150 行是拆分提示，不是硬性指标；按职责边界拆分。
- 事件入口集中，避免同一业务动作散落多个匿名处理器。
- 不修改与当前任务无关的文件或重构。
- 资源文件使用清楚的领域目录和语义命名。
- 手机安全区使用 `env(safe-area-inset-*)`，不在页面伪造系统 Home Indicator。

---

## 12. 测试与验收

### 12.1 静态检查

- TypeScript 编译通过。
- 生产构建通过。
- Git diff 无空白错误。
- 没有未清理的类型忽略或调试代码。

### 12.2 业务测试

业务验收用例以 `product.md` 为准，优先为纯函数补充测试：

- 服务模式切换与地址转换。
- 运力信息派生。
- 体积状态优先级。
- 保价与物品凭证变体优先级。
- 汽车推荐各触发条件。
- 配送阶段顺序与终态。

### 12.3 页面链路

- 首页到订单完成的核心流程可连续运行。
- 返回修改地址或物品后，草稿保持一致。
- 防重复提交有效。
- 页面卸载后定时器和订阅停止。

### 12.4 视觉与响应式

- 使用 320、375、390、414、448px 宽度检查。
- 无横向滚动、文本遮挡、固定底栏覆盖和安全区错误。
- 对关键 Figma 节点进行截图对比。
- 图片、SVG 和 Canvas（如有）均非空且比例正确。

---

## 13. 部署与分发

### 13.1 Vercel

- 使用仓库锁定的 pnpm 与 Node.js 版本。
- 生产构建命令与本地一致。
- 部署失败先检查包管理器声明、Lockfile 和 Node Engine。

### 13.2 PWA

计划包含：

- Web App Manifest。
- `display: standalone`。
- iOS `apple-touch-icon`。
- `viewport-fit=cover`。
- 真机添加到主屏幕验证。

### 13.3 Capacitor

本期不作为前置交付。PWA 流程稳定后，再评估本地包、权限和原生导航。

---

## 14. 开发工作流

1. 从 `product.md` 确认业务规则和验收结果。
2. 从 `design.md` 与 Figma 获取视觉规格和资源。
3. 阅读目标页面、共享组件、模型和 Store 的现有实现。
4. 更新模型或纯函数，再更新页面。
5. 运行构建、业务链路和响应式截图检查。
6. 在提交说明中记录产品规则、视觉节点和工程改动。

Git 操作由用户明确发起。工作区存在无关改动时，不回退、不覆盖，也不混入提交。

---

## 15. 当前里程碑

| 里程碑 | 内容 | 状态 |
|---|---|---|
| M0 | Vite、React、严格 TS、Router、Vercel | 已完成 |
| M1 | Token、模型、Repository、Zustand、共享组件 | 已完成，持续校准 |
| M2 | 物品信息纵向流程 | 已完成，持续视觉打磨 |
| M3 | 首页与地址页 | 已完成，持续响应式打磨 |
| M4 | 下单确认与订单提交 | 已完成 |
| M5 | 配送追踪状态机与动态地图 | 进行中 |
| M6 | PWA、可访问性、README 和测试整理 | 待完成 |

具体未实现的产品项见 `product.md`“需求与当前实现差异”。

---

## 16. 仓库呈现

- README 应提供三份核心文档入口。
- 架构图、数据流、路由和运行方式以本文为准。
- 产品规则不应只存在于代码注释中。
- Figma 精确规格不应复制到研发文档形成第二事实来源。
- Commit 保持功能递进，避免巨型初始化提交。
