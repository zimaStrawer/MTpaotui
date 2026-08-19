import priceCtaLightningExpress from '../../assets/home/price-cta-lightning-express.svg';
import priceCtaLightning from '../../assets/home/price-cta-lightning.svg';
import { MoneyAmount } from '../../components/MoneyAmount';
import { MOCK_BASE_FEE_YUAN } from '../../data/mock/fixtures';
import type { ServiceMode } from '../../data/models/order';

interface PriceBarProps {
  mode: ServiceMode;
  onSubmit: () => void;
}

const BAR_BG: Record<ServiceMode, string> = {
  send: 'bg-brand-bg',
  pick: 'bg-brand-bg',
  express: 'bg-decorative-tertiary',
};

const CTA_DECORATION: Record<ServiceMode, string> = {
  send: priceCtaLightning,
  pick: priceCtaLightning,
  express: priceCtaLightningExpress,
};

/** 价格条(913:6529):起步价 + 立减角标;右侧用闪电 Mask 形成下单区。 */
export function PriceBar({ mode, onSubmit }: PriceBarProps) {
  return (
    <button
      type="button"
      onClick={onSubmit}
      className={`relative h-12 w-full overflow-hidden rounded-full text-left ${BAR_BG[mode]}`}
    >
      <img
        src={CTA_DECORATION[mode]}
        alt=""
        className="pointer-events-none absolute inset-y-0 right-0 h-12 w-[182px]"
      />
      <span className="absolute top-3 left-[21px] z-10 flex h-6 items-end gap-1">
        <span className="flex h-full items-baseline gap-1">
          <MoneyAmount
            yuan={MOCK_BASE_FEE_YUAN}
            variant="hero"
            className="text-text-primary"
          />
          <span className="font-ui text-[12px] leading-[normal] font-medium whitespace-nowrap text-text-secondary">
            起
          </span>
        </span>
        <span className="flex h-5 items-center self-end rounded-tl-10 rounded-tr-10 rounded-br-10 bg-alert-primary px-2 font-ui text-[11px] leading-[normal] font-normal whitespace-nowrap text-container-bg">
          最高减20元
        </span>
      </span>
      <span className="absolute inset-y-0 right-0 z-10 flex w-[100px] items-center justify-center">
        <span className="text-title font-semibold text-text-primary">
          去下单
        </span>
      </span>
    </button>
  );
}
