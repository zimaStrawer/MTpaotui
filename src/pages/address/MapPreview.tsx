import iconChevron from '../../assets/nav/icon-chevron-16.svg';
import mapDelivery from '../../assets/address/map-delivery.jpg';
import mapMarkerDot from '../../assets/address/map-marker-dot.svg';
import mapMarkerPointer from '../../assets/address/map-marker-pointer.svg';
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
    <div className="relative h-[139px] w-full overflow-hidden">
      <img
        src={isPickup ? mapPickup : mapDelivery}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: isPickup ? 'center 22%' : 'center 42%' }}
      />
      <div className="absolute top-[45px] left-1/2 -translate-x-1/2">
        <span className="relative z-10 flex items-center gap-1 rounded-[23px] bg-bg-container p-1 shadow-[0_0_2px_rgba(27,29,33,0.2)]">
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
          <img src={iconChevron} alt="" className="size-4" />
        </span>
        <img
          src={mapMarkerPointer}
          alt=""
          className="pointer-events-none absolute top-8 left-1/2 h-[14px] w-2.5 -translate-x-1/2"
        />
        <img
          src={mapMarkerDot}
          alt=""
          className="pointer-events-none absolute top-10 left-1/2 size-2.5 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
