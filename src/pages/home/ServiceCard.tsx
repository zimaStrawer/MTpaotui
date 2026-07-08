import iconBadgeRabbit from '../../assets/home/icon-badge-rabbit.png';
import iconFlash from '../../assets/home/icon-flash.svg';
import iconPrivacy from '../../assets/home/icon-privacy.svg';
import iconSwap from '../../assets/home/icon-swap.svg';
import logoExpressGray from '../../assets/home/logo-express-gray.svg';
import logoExpressYellow from '../../assets/home/logo-express-yellow.svg';
import type {
  Address,
  AddressRole,
  DeliveryVehicle,
  ServiceMode,
} from '../../data/models/order';
import { RoleBadge } from '../../components/RoleBadge';
import { AddressField } from './AddressField';
import { PriceBar } from './PriceBar';
import { VehicleCapsule } from './VehicleCapsule';

interface ServiceCardProps {
  mode: ServiceMode;
  pickup: Address | null;
  delivery: Address | null;
  vehicle: DeliveryVehicle;
  onModeChange: (mode: ServiceMode) => void;
  onVehicleChange: (vehicle: DeliveryVehicle) => void;
  onEditAddress: (role: AddressRole) => void;
  onSubmit: () => void;
}

const TABS: ServiceMode[] = ['send', 'pick', 'express'];

/** 选中页签左右两侧的外翻圆角(文件夹页签形),凹弧半径对齐 radius-16 */
function TabFillet({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      className={
        side === 'left'
          ? 'absolute bottom-0 -left-4 size-4 bg-[radial-gradient(circle_at_top_left,transparent_16px,var(--color-bg-container)_16px)]'
          : 'absolute -right-4 bottom-0 size-4 bg-[radial-gradient(circle_at_top_right,transparent_16px,var(--color-bg-container)_16px)]'
      }
    />
  );
}

const CARD_CORNER: Record<ServiceMode, string> = {
  send: 'rounded-tl-none',
  pick: '',
  express: 'rounded-tr-none',
};

/**
 * 服务选择卡(905:8325 三变体 = mode 一个字段,业务配置随草稿进入下单页)。
 * 取/收地址均不预填;帮送↔帮取切换时地址互换由 store 负责。
 */
export function ServiceCard({
  mode,
  pickup,
  delivery,
  vehicle,
  onModeChange,
  onVehicleChange,
  onEditAddress,
  onSubmit,
}: ServiceCardProps) {
  const premium = mode === 'express';

  return (
    <section className="relative w-full">
      <div className="absolute inset-x-0 top-0.5 h-24 rounded-16 border-x border-t border-bg-container bg-bg-page" />
      <div className="absolute -top-2 right-0 z-10 flex items-center gap-0.5 rounded-tl-4 rounded-tr-4 rounded-br-4 bg-decorative-secondary px-1 py-0.5">
        <img src={iconBadgeRabbit} alt="" className="size-3" />
        {/* 装饰字体 Alimama ShuHeiTi,无授权时以粗体近似 */}
        <span className="text-caption font-bold text-decorative-primary">
          更快更安心
        </span>
      </div>

      <div className="relative flex h-[42px]">
        {TABS.map((tab, index) => {
          const active = mode === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onModeChange(tab)}
              className="relative flex flex-1 items-center justify-center"
            >
              {active && (
                <span className="absolute inset-0 rounded-t-12 bg-bg-container">
                  {index > 0 && <TabFillet side="left" />}
                  {index < TABS.length - 1 && <TabFillet side="right" />}
                </span>
              )}
              {tab === 'express' ? (
                <img
                  src={active ? logoExpressYellow : logoExpressGray}
                  alt="1对1急送"
                  className="relative h-[22px]"
                />
              ) : (
                <span
                  className={`relative text-tab ${
                    active
                      ? 'font-medium text-text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {tab === 'send' ? '帮送' : '帮取'}
                </span>
              )}
              {active && (
                <span className="absolute bottom-1 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-brand-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div
        className={`relative flex flex-col gap-4 rounded-16 bg-bg-container px-4 pt-4 pb-3 ${CARD_CORNER[mode]}`}
      >
        <div className="flex items-center justify-between gap-2">
          {!premium && (
            <VehicleCapsule value={vehicle} onChange={onVehicleChange} />
          )}
          <span
            className={`flex items-center gap-1 rounded-4 bg-gradient-to-r to-transparent p-1.5 text-caption ${
              mode === 'pick' ? 'from-bg-page' : 'from-accent-secondary'
            } ${premium ? 'w-full' : ''}`}
          >
            {mode !== 'pick' && (
              <img src={iconFlash} alt="" className="size-4" />
            )}
            {mode === 'pick' ? (
              <span className="text-text-secondary">
                填取件地址可查接单时间
              </span>
            ) : (
              <span className="text-text-secondary">
                {premium && '附近有234位骑手, '}预计
                <span className="text-accent-primary">1分钟</span>内接单
              </span>
            )}
          </span>
        </div>

        <div className="relative flex flex-col gap-4">
          <span className="absolute top-9 left-[11px] h-12 border-l border-dashed border-text-quaternary" />
          <img
            src={iconSwap}
            alt=""
            className="absolute top-[52px] left-[3px] size-4"
          />
          <div className="flex items-center gap-2.5">
            <RoleBadge role="pickup" premium={premium} />
            <AddressField
              address={pickup}
              placeholder="从哪里取件？"
              onClick={() => onEditAddress('pickup')}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <RoleBadge role="delivery" premium={premium} />
            <AddressField
              address={delivery}
              placeholder="送到哪里？"
              onClick={() => onEditAddress('delivery')}
            />
          </div>
        </div>

        <PriceBar mode={mode} onSubmit={onSubmit} />

        <p className="flex items-center justify-center gap-1 text-caption-sm text-text-tertiary">
          <img src={iconPrivacy} alt="" className="size-4" />
          隐藏真实手机号码，保护您的隐私
        </p>
      </div>
    </section>
  );
}
