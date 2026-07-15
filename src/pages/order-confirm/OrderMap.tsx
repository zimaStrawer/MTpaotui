import mapPickup from '../../assets/address/map-pickup.jpg';
import iconBack from '../../assets/nav/icon-back.svg';
import iconWeather from '../../assets/home/icon-weather.svg';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import routeCurve from '../../assets/order/route-curve.svg';
import { MapMarker } from '../../components/MapMarker';
import {
  MOCK_ACCEPT_MINUTES,
  MOCK_DELIVERY_ETA,
} from '../../data/mock/service-quotes';
import type { Address, AddressRole } from '../../data/models/order';

interface FloatCardProps {
  address: Address;
  /** 左格:上行大字 + 下行说明 */
  metric: React.ReactNode;
  metricLabel: string;
  metricBg: string;
  /** 点击回对应地址页修改 */
  onClick: () => void;
}

/** 地图浮卡(942:8835/867:16398):左指标格 + 右地址格。 */
function FloatCard({ address, metric, metricLabel, metricBg, onClick }: FloatCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex overflow-hidden rounded-8 border border-bg-container text-left shadow-[0_1px_4px_rgba(27,29,33,0.12)]"
    >
      <span
        className={`flex flex-col items-center justify-center px-3 py-1.5 ${metricBg}`}
      >
        <span className="font-number text-body leading-4 font-bold text-accent-primary">
          {metric}
        </span>
        <span className="text-caption font-medium whitespace-nowrap text-text-primary">
          {metricLabel}
        </span>
      </span>
      <span className="flex items-center bg-bg-container py-1 pr-1 pl-2">
        <span className="flex flex-col">
          <span className="text-caption font-medium whitespace-nowrap text-text-primary">
            {address.poi}
          </span>
          <span className="flex gap-0.5 text-caption-sm whitespace-nowrap text-text-secondary">
            {address.contactName}
            <span>{address.phone}</span>
          </span>
        </span>
        <img src={iconChevron} alt="" className="size-3" />
      </span>
    </button>
  );
}

interface OrderMapProps {
  pickup: Address;
  delivery: Address;
  onBack: () => void;
  onEditAddress: (role: AddressRole) => void;
}

/** 下单页地图区(857:2069):路线 + 取/收地标 + 双浮卡,导航悬浮其上。 */
export function OrderMap({ pickup, delivery, onBack, onEditAddress }: OrderMapProps) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <img
        src={mapPickup}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: 'center 24%' }}
      />
      <img
        src={routeCurve}
        alt=""
        className="absolute top-[128px] left-[123px] w-[120px]"
      />
      <span className="absolute top-[190px] left-[108px]">
        <MapMarker role="pickup" />
      </span>
      <span className="absolute top-[93px] left-[228px]">
        <MapMarker role="delivery" />
      </span>
      <div className="absolute top-[43px] left-[143px]">
        <FloatCard
          address={delivery}
          metric={MOCK_DELIVERY_ETA}
          metricLabel="预计送达"
          metricBg="bg-brand-secondary"
          onClick={() => onEditAddress('delivery')}
        />
      </div>
      <div className="absolute top-[139px] left-[22px]">
        <FloatCard
          address={pickup}
          metric={
            <>
              {MOCK_ACCEPT_MINUTES}
              <span className="ml-0.5 font-app text-caption-xs font-medium">
                分钟
              </span>
            </>
          }
          metricLabel="最快接单"
          metricBg="bg-bg-page"
          onClick={() => onEditAddress('pickup')}
        />
      </div>
      <header className="absolute inset-x-0 top-[env(safe-area-inset-top)] flex h-11 items-center justify-between px-2">
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          className="flex size-11 items-center justify-center"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-bg-container">
            <img src={iconBack} alt="" className="size-5" />
          </span>
        </button>
        <span className="flex items-center gap-1 text-caption font-medium text-text-primary">
          <img src={iconWeather} alt="" className="size-5" />
          <span className="flex gap-1.5">
            <span>强风</span>
            <span>6级</span>
          </span>
        </span>
      </header>
    </div>
  );
}
