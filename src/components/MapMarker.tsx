import mapMarkerBody from '../assets/tracking/map-marker-body.svg';
import mapMarkerDotDeliveryPremium from '../assets/tracking/map-marker-dot-delivery-premium.svg';
import mapMarkerDotDelivery from '../assets/tracking/map-marker-dot-delivery.svg';
import mapMarkerDotPickup from '../assets/tracking/map-marker-dot-pickup.svg';
import mapMarkerFaceDeliveryPremium from '../assets/tracking/map-marker-face-delivery-premium.svg';
import mapMarkerFaceDelivery from '../assets/tracking/map-marker-face-delivery.svg';
import mapMarkerFacePickup from '../assets/tracking/map-marker-face-pickup.svg';
import type { AddressRole } from '../data/models/order';

interface MapMarkerProps {
  role: AddressRole;
  /** 尊贵配送预留变体,当前物流页暂不启用。 */
  premium?: boolean;
  className?: string;
}

/** 地图取/收地标组件(946:9650):普通与尊贵共四个变体。 */
export function MapMarker({
  role,
  premium = false,
  className = '',
}: MapMarkerProps) {
  const isPickup = role === 'pickup';
  const face = isPickup
    ? mapMarkerFacePickup
    : premium
      ? mapMarkerFaceDeliveryPremium
      : mapMarkerFaceDelivery;
  const dot = isPickup
    ? mapMarkerDotPickup
    : premium
      ? mapMarkerDotDeliveryPremium
      : mapMarkerDotDelivery;

  return (
    <span
      role="img"
      aria-label={`${isPickup ? '取件' : '收件'}地图标`}
      className={`relative block h-[38.25px] w-[30px] shrink-0 ${className}`}
    >
      <img src={mapMarkerBody} alt="" className="absolute top-0 left-0 size-[30px]" />
      <img
        src={face}
        alt=""
        className="absolute top-[1.5px] left-[1.5px] size-[27px]"
      />
      <span
        aria-hidden
        className={`absolute top-1.5 left-[9px] text-caption font-semibold ${
          isPickup ? 'text-bg-container' : 'text-text-primary'
        } ${
          isPickup && premium
            ? 'bg-gradient-to-br from-[#fef0dd] to-[#f2d0b5] bg-clip-text text-transparent'
            : ''
        }`}
      >
        {isPickup ? '取' : '收'}
      </span>
      <img
        src={dot}
        alt=""
        className="absolute top-[31.5px] left-[11.25px] size-[7.5px]"
      />
    </span>
  );
}
