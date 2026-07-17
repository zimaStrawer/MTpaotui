import { useState } from 'react';

import iconBadgeRabbit from '../../assets/home/icon-badge-rabbit.png';
import iconFlash from '../../assets/home/icon-flash.svg';
import iconPrivacy from '../../assets/home/icon-privacy.svg';
import iconSwap from '../../assets/home/icon-swap.svg';
import logoExpressGray from '../../assets/home/logo-express-gray.svg';
import logoExpressYellow from '../../assets/home/logo-express-yellow.svg';
import {
  supportsVehicleSelection,
  type Address,
  type AddressRole,
  type CapacityInfoState,
  type DeliveryVehicle,
  type ServiceMode,
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
  capacityInfoState: CapacityInfoState;
  onModeChange: (mode: ServiceMode) => void;
  onVehicleChange: (vehicle: DeliveryVehicle) => void;
  onEditAddress: (role: AddressRole) => void;
  onSubmit: () => void;
}

const TABS: ServiceMode[] = ['send', 'pick', 'express'];
const TAB_TRANSLATE: Record<ServiceMode, string> = {
  send: 'translate-x-0',
  pick: 'translate-x-full',
  express: 'translate-x-[200%]',
};

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
  capacityInfoState,
  onModeChange,
  onVehicleChange,
  onEditAddress,
  onSubmit,
}: ServiceCardProps) {
  const premium = mode === 'express';
  const vehicleSelectable = supportsVehicleSelection(mode);
  const activeTabIndex = TABS.indexOf(mode);
  const [addressSwapVersion, setAddressSwapVersion] = useState(0);

  const handleModeChange = (nextMode: ServiceMode) => {
    const swapsSendAndPick =
      (mode === 'send' && nextMode === 'pick') ||
      (mode === 'pick' && nextMode === 'send');
    if (swapsSendAndPick) {
      setAddressSwapVersion((version) => version + 1);
    }
    onModeChange(nextMode);
  };

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
        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 w-1/3 rounded-t-12 bg-bg-container transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${TAB_TRANSLATE[mode]}`}
        >
          {activeTabIndex > 0 && <TabFillet side="left" />}
          {activeTabIndex < TABS.length - 1 && <TabFillet side="right" />}
          <span className="absolute bottom-1 left-1/2 h-[3px] w-7 -translate-x-1/2 rounded-full bg-brand-primary" />
        </span>
        {TABS.map((tab) => {
          const active = mode === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleModeChange(tab)}
              className="relative z-10 flex flex-1 items-center justify-center"
            >
              {tab === 'express' ? (
                <img
                  src={active ? logoExpressYellow : logoExpressGray}
                  alt="1对1急送"
                  className="h-[22px] w-[75px] shrink-0"
                />
              ) : (
                <span
                  className={`text-tab transition-colors duration-300 motion-reduce:transition-none ${
                    active
                      ? 'font-medium text-text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {tab === 'send' ? '帮送' : '帮取'}
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
          {vehicleSelectable && (
            <VehicleCapsule value={vehicle} onChange={onVehicleChange} />
          )}
          {capacityInfoState === 'pickup-required' && (
            <span
              className={`flex items-center rounded-4 bg-gradient-to-r from-[#f9f9f9] to-transparent p-1.5 text-caption whitespace-nowrap text-text-secondary ${
                premium ? 'w-full' : ''
              }`}
            >
              填取件地址可查接单时间
            </span>
          )}
          {capacityInfoState === 'visible' && (
            <span
              className={`flex items-center gap-1 rounded-4 bg-gradient-to-r from-accent-secondary to-transparent p-1.5 text-caption ${
                premium ? 'w-full' : ''
              }`}
            >
              <img src={iconFlash} alt="" className="size-4" />
              <span className="text-text-secondary">
                {premium && '附近有234位骑手, '}预计
                <span className="text-accent-primary">1分钟</span>内接单
              </span>
            </span>
          )}
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
            <div
              key={`pickup-${addressSwapVersion}`}
              className={`flex min-w-0 flex-1 ${
                addressSwapVersion > 0
                  ? 'home-address-swap-from-bottom'
                  : ''
              }`}
            >
              <AddressField
                address={pickup}
                placeholder="从哪里取件？"
                onClick={() => onEditAddress('pickup')}
              />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <RoleBadge role="delivery" premium={premium} />
            <div
              key={`delivery-${addressSwapVersion}`}
              className={`flex min-w-0 flex-1 ${
                addressSwapVersion > 0 ? 'home-address-swap-from-top' : ''
              }`}
            >
              <AddressField
                address={delivery}
                placeholder="送到哪里？"
                onClick={() => onEditAddress('delivery')}
              />
            </div>
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
