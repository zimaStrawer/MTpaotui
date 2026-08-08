import { useState } from 'react';

import iconFlash from '../../assets/home/icon-flash.svg';
import iconPrivacy from '../../assets/home/icon-privacy.svg';
import iconSwap from '../../assets/home/icon-swap.svg';
import logoExpressGray from '../../assets/home/logo-express-gray.svg';
import logoExpressActive from '../../assets/home/logo-express-active.svg';
import tabSelectedExpress from '../../assets/home/tab-selected-express.svg';
import tabSelectedPick from '../../assets/home/tab-selected-pick.svg';
import tabSelectedSend from '../../assets/home/tab-selected-send.svg';
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
const TAB_INDICATOR_ASSET: Record<ServiceMode, string> = {
  send: tabSelectedSend,
  pick: tabSelectedPick,
  express: tabSelectedExpress,
};
const TAB_INDICATOR_POSITION: Record<ServiceMode, string> = {
  send: 'left-0 w-[36.77%]',
  pick: 'left-[29.81%] w-[40.39%]',
  express: 'left-[63.23%] w-[36.77%]',
};

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
    <section className="relative h-[324px] w-full">
      <div className="absolute inset-x-0 top-0.5 h-24 rounded-16 border-x border-t border-container-bg bg-page-bg" />
      <div className="absolute -top-[11px] right-0 z-10 flex h-[23px] w-[60px] items-center rounded-tl-4 rounded-tr-4 rounded-br-4 bg-decorative-secondary px-1.5 py-[3px]">
        <span className="font-decorative text-decorative font-bold text-decorative-primary">
          专人更快
        </span>
      </div>

      <div className="relative grid h-11 grid-cols-[120fr_119fr_120fr]">
        <img
          aria-hidden
          src={TAB_INDICATOR_ASSET[mode]}
          alt=""
          className={`pointer-events-none absolute top-0 h-11 transition-[left,width] duration-300 ease-out will-change-[left,width] motion-reduce:transition-none ${TAB_INDICATOR_POSITION[mode]} ${
            mode === 'express' ? '-scale-y-100 rotate-180' : ''
          }`}
        />
        {TABS.map((tab) => {
          const active = mode === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleModeChange(tab)}
              className="relative z-10 mt-0.5 flex h-[42px] flex-1 items-center justify-center"
            >
              {tab === 'express' ? (
                <span
                  role="img"
                  aria-label="1对1急送"
                  className="relative h-[22px] w-[75px] shrink-0 scale-[1.143]"
                >
                  <img
                    src={logoExpressGray}
                    alt=""
                    className="absolute inset-0 size-full"
                  />
                  <img
                    src={logoExpressActive}
                    alt=""
                    className={`absolute inset-0 size-full transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </span>
              ) : (
                <span
                  className={`text-tab transition-colors duration-300 motion-reduce:transition-none ${
                    active
                      ? 'font-semibold text-text-primary'
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
        className={`absolute inset-x-0 top-11 flex h-[280px] flex-col overflow-hidden rounded-16 bg-container-bg px-4 pt-4 pb-3 ${CARD_CORNER[mode]}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex h-8 items-center justify-between gap-2 max-[374px]:gap-0">
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
                className={`flex items-center gap-1 rounded-4 bg-gradient-to-r from-highlight-bg to-transparent p-1.5 text-caption ${
                  premium ? 'w-full' : ''
                }`}
              >
                <img src={iconFlash} alt="" className="size-4" />
                <span className="text-text-secondary">
                  {premium && '附近有234位骑手, '}预计
                  <span className="text-highlight-primary">1分钟</span>内接单
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
        </div>

        <div className="mt-4 h-12">
          <PriceBar mode={mode} onSubmit={onSubmit} />
        </div>

        <p className="mt-3 flex items-center justify-center gap-1 text-caption-sm leading-none text-text-tertiary">
          <img src={iconPrivacy} alt="" className="size-4" />
          隐藏真实手机号码，保护您的隐私
        </p>
      </div>
    </section>
  );
}
