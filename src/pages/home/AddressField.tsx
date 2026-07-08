import type { Address } from '../../data/models/order';

interface AddressFieldProps {
  /** null = 未填,显示占位大字并高亮描边 */
  address: Address | null;
  placeholder: string;
  onClick: () => void;
}

/** 地址胶囊(已填 / 未填两态);右侧地址簿入口为视觉占位。 */
export function AddressField({ address, placeholder, onClick }: AddressFieldProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-13 flex-1 rounded-full bg-bg-container text-left ${
        address === null ? 'border border-text-primary' : ''
      }`}
    >
      {address !== null ? (
        <span className="flex flex-col pl-4">
          <span className="text-body font-medium text-text-primary">
            {address.poi} {address.unit}
          </span>
          <span className="flex items-center gap-2 text-caption text-text-secondary">
            {address.contactName}
            <span className="font-number">{address.phone}</span>
          </span>
        </span>
      ) : (
        <span className="pl-4 text-headline font-medium text-text-primary">
          {placeholder}
        </span>
      )}
      <span className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full border-[0.6px] border-text-quaternary px-3 py-1 text-caption-sm text-text-secondary">
        地址簿
      </span>
    </button>
  );
}
