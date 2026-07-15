import iconChevron from '../../assets/nav/icon-chevron.svg';
import type { ServiceQuote } from '../../data/mock/service-quotes';

interface CheckoutBarProps {
  quote: ServiceQuote;
  submitting: boolean;
  onSubmit: () => void;
}

/** 底部支付栏(1496:26347):红包/支付方式行 + 深色结算胶囊。 */
export function CheckoutBar({ quote, submitting, onSubmit }: CheckoutBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-divider bg-bg-container pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-10 items-center justify-around">
        <span className="flex items-center text-caption text-text-primary">
          暂无可用红包
          <img src={iconChevron} alt="" className="size-3" />
        </span>
        <span className="flex items-center text-caption text-text-primary">
          在线支付
          <img src={iconChevron} alt="" className="size-3" />
        </span>
      </div>
      <div className="mx-2 mb-3 flex h-12 items-center overflow-hidden rounded-full bg-text-primary">
        <span className="flex items-end gap-2 pl-4">
          <span className="flex items-end gap-0.5 text-bg-container">
            <span className="font-number text-tab font-bold">¥</span>
            {/* 24px 展示型大数字为 token 已知缺口 */}
            <span className="text-[24px] leading-6 font-semibold">
              {quote.feeYuan}
            </span>
          </span>
          {quote.originalFeeYuan !== undefined && (
            <span className="font-number text-tab text-text-tertiary line-through">
              ¥{quote.originalFeeYuan}
            </span>
          )}
          <img
            src={iconChevron}
            alt=""
            className="mb-1 size-3 rotate-90 opacity-60"
          />
        </span>
        <button
          type="button"
          className="ml-auto flex h-full items-center bg-bg-black px-4 text-tab font-medium text-brand-primary"
        >
          找人付
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={onSubmit}
          className="flex h-full items-center bg-brand-primary px-5 text-tab font-medium text-text-primary disabled:opacity-70"
        >
          {submitting ? '提交中…' : '提交订单'}
        </button>
      </div>
    </div>
  );
}
