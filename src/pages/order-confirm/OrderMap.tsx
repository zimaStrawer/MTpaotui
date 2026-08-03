import mapPickup from '../../assets/address/map-pickup.webp';
import iconBack from '../../assets/nav/icon-back.svg';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import iconSwapMap from '../../assets/order/icon-swap-map.svg';
import routeCurve from '../../assets/order/route-curve.svg';
import { MapMarker } from '../../components/MapMarker';
import { WeatherIndicator } from '../../components/WeatherIndicator';
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
      className="flex overflow-hidden rounded-8 border border-container-bg text-left shadow-[0_1px_4px_rgba(27,29,33,0.12)]"
    >
      <span
        className={`flex flex-col items-center justify-center px-3 py-1.5 ${metricBg}`}
      >
        <span className="font-number text-body leading-4 font-bold text-highlight-primary">
          {metric}
        </span>
        <span className="text-caption font-medium whitespace-nowrap text-text-primary">
          {metricLabel}
        </span>
      </span>
      <span className="flex items-center bg-container-bg py-1 pr-1 pl-2">
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
  premium: boolean;
  onBack: () => void;
  onEditAddress: (role: AddressRole) => void;
  onSwapAddresses: () => void;
  /** 当前模拟地图中，两个地址位置是否已交换。 */
  addressesSwapped: boolean;
}

/** 下单页地图区(857:2069):路线 + 取/收地标 + 双浮卡,导航悬浮其上。 */
export function OrderMap({
  pickup,
  delivery,
  premium,
  onBack,
  onEditAddress,
  onSwapAddresses,
  addressesSwapped,
}: OrderMapProps) {
  const pickupMetric = (
    <>
      {MOCK_ACCEPT_MINUTES}
      <span className="ml-0.5 font-app text-caption-xs font-medium">分钟</span>
    </>
  );

  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <img
        src={mapPickup}
        alt=""
        width={750}
        height={1669}
        decoding="async"
        className="size-full object-cover"
        style={{ objectPosition: 'center 24%' }}
      />
      <img
        src={routeCurve}
        alt=""
        className="absolute top-[128px] left-[123px] w-[120px]"
      />
      <span className="absolute top-[190px] left-[108px]">
        <MapMarker
          role={addressesSwapped ? 'delivery' : 'pickup'}
          premium={premium}
        />
      </span>
      <span className="absolute top-[93px] left-[228px]">
        <MapMarker
          role={addressesSwapped ? 'pickup' : 'delivery'}
          premium={premium}
        />
      </span>
      <div className="absolute top-[43px] left-[143px]">
        <FloatCard
          address={addressesSwapped ? pickup : delivery}
          metric={addressesSwapped ? pickupMetric : MOCK_DELIVERY_ETA}
          metricLabel={addressesSwapped ? '最快接单' : '预计送达'}
          metricBg={addressesSwapped ? 'bg-page-bg' : 'bg-service-bg'}
          onClick={() =>
            onEditAddress(addressesSwapped ? 'pickup' : 'delivery')
          }
        />
      </div>
      <div className="absolute top-[139px] left-[22px]">
        <FloatCard
          address={addressesSwapped ? delivery : pickup}
          metric={addressesSwapped ? MOCK_DELIVERY_ETA : pickupMetric}
          metricLabel={addressesSwapped ? '预计送达' : '最快接单'}
          metricBg={addressesSwapped ? 'bg-service-bg' : 'bg-page-bg'}
          onClick={() =>
            onEditAddress(addressesSwapped ? 'delivery' : 'pickup')
          }
        />
      </div>
      <button
        type="button"
        aria-label="互换取件与收件地址"
        onClick={onSwapAddresses}
        className="absolute top-[192px] right-2 flex size-11 items-center justify-center"
      >
        <span className="flex size-8 items-center justify-center rounded-[10px] bg-white shadow-[0_0_4px_rgba(0,0,0,0.05)]">
          <img
            src={iconSwapMap}
            alt=""
            className="size-5 -scale-y-100 rotate-180"
          />
        </span>
      </button>
      <header className="absolute inset-x-0 top-[var(--app-safe-area-top)] flex h-11 items-center justify-between px-3">
        <button
          type="button"
          aria-label="返回"
          onClick={onBack}
          className="flex size-11 items-center justify-center"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-container-bg">
            <img src={iconBack} alt="" className="size-5" />
          </span>
        </button>
        <WeatherIndicator />
      </header>
    </div>
  );
}
