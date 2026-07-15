import iconSwapH from '../../assets/order/icon-swap-h.svg';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import { RoleBadge } from '../../components/RoleBadge';
import type { Address, AddressRole } from '../../data/models/order';

interface ThumbnailMapProps {
  pickup: Address;
  delivery: Address;
  onEdit: (role: AddressRole) => void;
  onSwap: () => void;
}

function Side({
  address,
  emphasize = false,
  onClick,
}: {
  address: Address;
  emphasize?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-0.5 text-left"
    >
      <RoleBadge role={address.role} />
      <span className="flex w-[104px] flex-col p-1">
        <span
          className={`truncate text-caption text-text-primary ${
            emphasize ? 'font-semibold' : 'font-medium'
          }`}
        >
          {address.poi}
        </span>
        <span className="flex gap-0.5 truncate text-caption-sm text-text-secondary">
          {address.contactName}
          <span>{address.phone}</span>
        </span>
      </span>
      <img src={iconChevron} alt="" className="size-3" />
    </button>
  );
}

/** 缩略地图(942:8668):取/收摘要,点击回对应地址页修改,中键互换取/收。 */
export function ThumbnailMap({ pickup, delivery, onEdit, onSwap }: ThumbnailMapProps) {
  return (
    <div className="flex h-13 w-full items-center justify-center gap-2 rounded-16 bg-bg-container">
      <Side address={pickup} onClick={() => onEdit('pickup')} />
      <button
        type="button"
        aria-label="互换取件与收件地址"
        onClick={onSwap}
        className="flex size-11 items-center justify-center"
      >
        <img src={iconSwapH} alt="" className="w-5" />
      </button>
      <Side address={delivery} emphasize onClick={() => onEdit('delivery')} />
    </div>
  );
}
