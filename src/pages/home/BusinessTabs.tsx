import iconBizHelppick from '../../assets/home/icon-biz-helppick.png';
import type { BusinessType } from '../../data/models/order';

interface BusinessTabsProps {
  value: BusinessType;
  onChange: (business: BusinessType) => void;
}

const TABS: BusinessType[] = ['帮取送', '帮我买', '帮个忙'];

/** 业务 tab(913:7861):本期只做「帮取送」,其余两个可点但不切流程。 */
export function BusinessTabs({ value, onChange }: BusinessTabsProps) {
  return (
    <div className="flex items-center gap-2 px-2">
      {TABS.map((business) => {
        const active = value === business;
        return (
          <button
            key={business}
            type="button"
            onClick={() => onChange(business)}
            className={
              active
                ? 'flex items-center gap-1 rounded-full bg-bg-container py-0.5 pr-4 pl-3'
                : 'flex h-9 w-[90px] items-center justify-center rounded-full bg-divider'
            }
          >
            {active && (
              <img
                src={iconBizHelppick}
                alt=""
                className="size-8 rounded-4"
              />
            )}
            <span
              className={`text-tab text-text-primary ${active ? 'font-medium' : ''}`}
            >
              {business}
            </span>
          </button>
        );
      })}
    </div>
  );
}
