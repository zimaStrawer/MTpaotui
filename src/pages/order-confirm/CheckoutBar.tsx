import iconChevron from '../../assets/nav/icon-chevron.svg';
import { AppFixedLayer } from '../../components/AppShell';
import { MoneyAmount } from '../../components/MoneyAmount';
import type { ServiceQuote } from '../../data/mock/service-quotes';
import { InsuranceGuaranteeTag } from './InsuranceGuaranteeTag';

interface CheckoutBarProps {
  quote: ServiceQuote;
  insured: boolean;
  submitting: boolean;
  onSubmit: () => void;
}

/** 底部支付栏(1554:4789):红包/支付方式行 + 深色结算胶囊。 */
export function CheckoutBar({
  quote,
  insured,
  submitting,
  onSubmit,
}: CheckoutBarProps) {
  return (
    <AppFixedLayer className="bottom-0 z-10">
      <div className="relative h-[calc(88px+max(32px,env(safe-area-inset-bottom)))] border-t border-border-divider bg-container-bg">
        {insured && (
          <InsuranceGuaranteeTag className="absolute inset-x-0 -top-8" />
        )}
        <div className="absolute inset-x-0 top-[-2px] grid h-[41px] grid-cols-2 place-items-center">
          <span className="flex items-center text-caption text-text-primary">
            暂无可用红包
            <img src={iconChevron} alt="" className="size-3" />
          </span>
          <span className="flex items-center text-caption text-text-primary">
            在线支付
            <img src={iconChevron} alt="" className="size-3" />
          </span>
        </div>
        <div className="absolute inset-x-2 top-[39px] flex h-12 items-center overflow-hidden rounded-full bg-text-primary">
          <span className="flex items-end gap-2 pl-4">
            <span className="flex items-baseline gap-2">
              <MoneyAmount
                yuan={quote.feeYuan}
                variant="checkout"
                className="text-container-bg"
              />
              {quote.originalFeeYuan !== undefined && (
                <MoneyAmount
                  yuan={quote.originalFeeYuan}
                  fractionDigits={0}
                  variant="original"
                  className="text-text-tertiary line-through"
                />
              )}
            </span>
            <img
              src={iconChevron}
              alt=""
              className="mb-1 size-3 rotate-90 opacity-60"
            />
          </span>
          <button
            type="button"
            className="ml-auto flex h-full items-center bg-mask-bg px-4 text-tab font-medium text-service-on-dark"
          >
            找人付
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={onSubmit}
            className="flex h-full items-center bg-service-primary px-5 text-tab font-medium text-text-primary disabled:opacity-70"
          >
            {submitting ? '提交中…' : '提交订单'}
          </button>
        </div>
      </div>
    </AppFixedLayer>
  );
}
