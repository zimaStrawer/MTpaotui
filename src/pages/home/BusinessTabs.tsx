import iconBizHelppick from '../../assets/home/icon-biz-helppick.png';
import type { BusinessType } from '../../data/models/order';

interface BusinessTabsProps {
  onUnavailableSelect: () => void;
}

const TABS: BusinessType[] = ['帮取送', '帮我买', '帮个忙'];

/** 业务入口(913:7861):帮取送固定选中,其余入口仅提示暂未开放。 */
export function BusinessTabs({ onUnavailableSelect }: BusinessTabsProps) {
  return (
    <div className="flex items-center gap-2 px-2">
      {TABS.map((business) => {
        const active = business === '帮取送';
        return (
          <button
            key={business}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => {
              if (!active) onUnavailableSelect();
            }}
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
              className={`text-tab text-text-primary ${active ? 'font-semibold' : ''}`}
            >
              {business}
            </span>
          </button>
        );
      })}
    </div>
  );
}
