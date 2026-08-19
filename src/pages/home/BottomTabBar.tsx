import tabActiveBg from '../../assets/home/tab-active-bg.svg';
import tabMy from '../../assets/home/tab-my.svg';
import tabOrder from '../../assets/home/tab-order.svg';

interface BottomTabBarProps {
  onUnavailableSelect: () => void;
}

/** 首页底部导航(1677:10022):跑腿固定选中,其余页签提示暂未开放。 */
export function BottomTabBar({ onUnavailableSelect }: BottomTabBarProps) {
  return (
    <nav
      aria-label="主导航"
      className="grid h-[calc(48px+max(32px,env(safe-area-inset-bottom)))] w-full grid-cols-3 bg-container-bg"
    >
      <button
        type="button"
        aria-current="page"
        className="relative h-12"
      >
        <span className="absolute top-2 left-1/2 size-10 -translate-x-1/2">
          <img src={tabActiveBg} alt="" className="size-full" />
        </span>
        <span className="absolute top-[18px] left-1/2 -translate-x-1/2 font-brand text-[14px] leading-[normal] font-normal whitespace-nowrap text-text-primary">
          跑腿
        </span>
      </button>

      <button
        type="button"
        onClick={onUnavailableSelect}
        className="flex h-12 flex-col items-center pt-2.5"
      >
        <img src={tabOrder} alt="" className="size-6 shrink-0" />
        <span className="font-ui text-[10px] leading-[normal] font-normal text-text-primary">
          订单
        </span>
      </button>

      <button
        type="button"
        onClick={onUnavailableSelect}
        className="flex h-12 flex-col items-center pt-2.5"
      >
        <img src={tabMy} alt="" className="size-6 shrink-0" />
        <span className="font-ui text-[10px] leading-[normal] font-normal text-text-primary">
          我的
        </span>
      </button>
    </nav>
  );
}
