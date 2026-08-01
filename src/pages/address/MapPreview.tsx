import iconChevron from '../../assets/nav/icon-chevron-16.svg';
import mapDelivery from '../../assets/address/map-delivery.jpg';
import mapMarkerDot from '../../assets/address/map-marker-dot.svg';
import mapMarkerPointer from '../../assets/address/map-marker-pointer.svg';
import mapPickup from '../../assets/address/map-pickup.jpg';
import { RoleBadge } from '../../components/RoleBadge';
import type { AddressRole } from '../../data/models/order';

interface MapPreviewProps {
  role: AddressRole;
  poi: string;
  premium: boolean;
}

/** 占位地图 + 定位气泡(1082:9499):地址已选后展示。 */
export function MapPreview({ role, poi, premium }: MapPreviewProps) {
  const isPickup = role === 'pickup';

  return (
    <div className="relative h-[139px] w-full overflow-hidden">
      <img
        src={isPickup ? mapPickup : mapDelivery}
        alt=""
        className="size-full object-cover"
        style={{ objectPosition: isPickup ? 'center 22%' : 'center 42%' }}
      />
      <div className="absolute top-[79px] left-1/2 -translate-x-1/2">
        <span className="relative z-10 flex -translate-y-full items-center gap-1 rounded-8 bg-container-bg p-1 shadow-[0_0_2px_rgba(27,29,33,0.2)]">
          <RoleBadge role={role} premium={premium} />
          <span className="text-caption font-medium text-text-primary">
            {poi}
          </span>
          <img src={iconChevron} alt="" className="size-4" />
        </span>
        <img
          src={mapMarkerPointer}
          alt=""
          className="pointer-events-none absolute top-0 left-1/2 h-[14px] w-2.5 -translate-x-1/2"
        />
        <img
          src={mapMarkerDot}
          alt=""
          className="pointer-events-none absolute top-2 left-1/2 size-2.5 -translate-x-1/2"
        />
      </div>
    </div>
  );
}
