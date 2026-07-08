import iconChevron from '../../assets/nav/icon-chevron.svg';
import mapDelivery from '../../assets/address/map-delivery.jpg';
import mapPickup from '../../assets/address/map-pickup.jpg';
import type { AddressRole } from '../../data/models/order';

interface MapPreviewProps {
  role: AddressRole;
  poi: string;
}

/** 占位地图 + 定位气泡(1082:9499):地址已选后展示。 */
export function MapPreview({ role, poi }: MapPreviewProps) {
  const isPickup = role === 'pickup';
  return (
    <div className="relative h-[141px] w-full overflow-hidden">
      <img
        src={isPickup ? mapPickup : mapDelivery}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: isPickup ? 'center 22%' : 'center 42%' }}
      />
      <div className="absolute inset-x-0 top-8 flex flex-col items-center">
        <span className="flex items-center gap-1 rounded-full bg-bg-container p-1 pr-2 shadow-[0_0_2px_rgba(27,29,33,0.2)]">
          <span
            className={`flex size-6 items-center justify-center rounded-full text-caption font-semibold ${
              isPickup
                ? 'bg-bg-black text-bg-container'
                : 'bg-brand-primary text-text-primary'
            }`}
          >
            {isPickup ? '取' : '收'}
          </span>
          <span className="text-caption font-medium text-text-primary">
            {poi}
          </span>
          <img src={iconChevron} alt="" className="size-4 rotate-180" />
        </span>
        <span className="h-3 w-0.5 rounded-full bg-bg-black" />
        <span className="size-2 rounded-full border-2 border-bg-container bg-bg-black shadow-[0_0_2px_rgba(27,29,33,0.3)]" />
      </div>
    </div>
  );
}
