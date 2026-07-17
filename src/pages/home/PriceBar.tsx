import priceCtaLightningExpress from '../../assets/home/price-cta-lightning-express.svg';
import priceCtaLightning from '../../assets/home/price-cta-lightning.svg';
import { MOCK_BASE_FEE_YUAN } from '../../data/mock/fixtures';
import type { ServiceMode } from '../../data/models/order';

interface PriceBarProps {
  mode: ServiceMode;
  onSubmit: () => void;
}

const BAR_BG: Record<ServiceMode, string> = {
  send: 'bg-brand-secondary',
  pick: 'bg-brand-secondary',
  express: 'bg-decorative-tertiary',
};

const CTA_DECORATION: Record<ServiceMode, string> = {
  send: priceCtaLightning,
  pick: priceCtaLightning,
  express: priceCtaLightningExpress,
};

const [feeInt, feeDecimal] = MOCK_BASE_FEE_YUAN.toFixed(1).split('.');

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
      <span className="absolute top-3 left-5 z-10 flex items-end gap-1">
        <span className="flex items-end gap-0.5 text-text-primary">
          <span className="font-number text-tab leading-4 font-bold">¥</span>
          {/* 24px 展示型大数字为 token 已知缺口(design.md Known Gaps) */}
          <span className="text-[24px] leading-6 font-semibold">
            {feeInt}.
          </span>
          <span className="text-title leading-6 font-semibold">
            {feeDecimal}
          </span>
        </span>
        <span className="text-caption font-medium text-text-secondary">起</span>
      </span>
      <span className="absolute top-4 left-[108px] z-10 flex h-5 items-center rounded-tl-10 rounded-tr-10 rounded-br-10 bg-alert px-2 text-caption-sm whitespace-nowrap text-bg-container">
        最高减20元
      </span>
      <span className="absolute inset-y-0 right-0 z-10 flex w-[100px] items-center justify-center">
        {/* 去下单为装饰字体(DingTalk JinBuTi),无授权时以粗体近似 */}
        <span className="text-[22px] font-bold tracking-[-1.76px] text-text-primary">
          去下单
        </span>
      </span>
    </button>
  );
}
