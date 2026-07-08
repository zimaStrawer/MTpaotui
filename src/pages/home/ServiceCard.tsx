import { useState } from 'react';

import connectorDashed from '../../assets/home/connector-dashed.svg';
import iconBadgeRabbit from '../../assets/home/icon-badge-rabbit.png';
import iconFlash from '../../assets/home/icon-flash.svg';
import iconPrivacy from '../../assets/home/icon-privacy.svg';
import iconSwap from '../../assets/home/icon-swap.svg';
import logoExpressGray from '../../assets/home/logo-express-gray.svg';
import logoExpressYellow from '../../assets/home/logo-express-yellow.svg';
import tabActiveExpress from '../../assets/home/tab-active-express.svg';
import tabActivePick from '../../assets/home/tab-active-pick.svg';
import tabActiveSend from '../../assets/home/tab-active-send.svg';
import type {
  Address,
  AddressRole,
  DeliveryVehicle,
} from '../../data/models/order';
import { AddressField } from './AddressField';
import { PriceBar } from './PriceBar';
import { RoleBadge } from './RoleBadge';
import type { ServiceMode } from './service-mode';
import { VehicleCapsule } from './VehicleCapsule';

interface ServiceCardProps {
  pickup: Address | null;
  delivery: Address | null;
  vehicle: DeliveryVehicle;
  onVehicleChange: (vehicle: DeliveryVehicle) => void;
  onEditAddress: (role: AddressRole) => void;
  onSubmit: () => void;
}

const TABS: { mode: ServiceMode; activeBar: string }[] = [
  { mode: 'send', activeBar: tabActiveSend },
  { mode: 'pick', activeBar: tabActivePick },
  { mode: 'express', activeBar: tabActiveExpress },
];

const CARD_CORNER: Record<ServiceMode, string> = {
  send: 'rounded-tl-none',
  pick: '',
  express: 'rounded-tr-none',
};

/**
 * 服务选择卡(905:8325 三变体 = mode 一个字段):
 * 帮送 = 主流程入口;帮取 / 1对1急送为可切换的展示变体(本期不进流程)。
 */
export function ServiceCard({
  pickup,
  delivery,
  vehicle,
  onVehicleChange,
  onEditAddress,
  onSubmit,
}: ServiceCardProps) {
  const [mode, setMode] = useState<ServiceMode>('send');
  const premium = mode === 'express';
  /** 帮取变体:取件待填、收件为「我的位置」 */
  const pickupShown = mode === 'pick' ? null : pickup;
  const deliveryShown = mode === 'pick' ? pickup : delivery;

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
        {TABS.map((tab) => {
          const active = mode === tab.mode;
          return (
            <button
              key={tab.mode}
              type="button"
              onClick={() => setMode(tab.mode)}
              className="relative flex flex-1 items-center justify-center"
            >
              {active && (
                <img
                  src={tab.activeBar}
                  alt=""
                  className="absolute inset-0 size-full"
                />
              )}
              {tab.mode === 'express' ? (
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
                  {tab.mode === 'send' ? '帮送' : '帮取'}
                </span>
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
          <img
            src={connectorDashed}
            alt=""
            className="absolute top-9 left-[11px] h-12"
          />
          <img
            src={iconSwap}
            alt=""
            className="absolute top-[52px] left-[3px] size-4"
          />
          <div className="flex items-center gap-2.5">
            <RoleBadge role="pickup" premium={premium} />
            <AddressField
              address={pickupShown}
              placeholder="从哪里取件？"
              onClick={() => onEditAddress('pickup')}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <RoleBadge role="delivery" premium={premium} />
            <AddressField
              address={deliveryShown}
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
