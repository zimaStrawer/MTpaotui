import iconHelp from '../../assets/item-info/icon-help.svg';
import logoExpress from '../../assets/order/logo-express.svg';
import { CornerCheck } from '../../components/CornerCheck';
import {
  SERVICE_QUOTES,
  type OrderServiceKey,
} from '../../data/mock/service-quotes';

interface ServiceOptionCardProps {
  value: OrderServiceKey;
  onChange: (key: OrderServiceKey) => void;
}

function Fee({ yuan }: { yuan: number }) {
  const [int, decimal] = yuan.toFixed(1).split('.');
  return (
    <span className="flex items-end gap-0.5 text-accent-primary">
      <span className="text-body font-semibold">¥</span>
      {/* DINPro 展示数字为 token 已知缺口,以 SF Pro 近似 */}
      <span className="font-number text-[20px] leading-5 font-bold">
        {int}.
      </span>
      <span className="font-number text-tab leading-5 font-bold">
        {decimal}
      </span>
    </span>
  );
}

function OptionShell({
  selected,
  onSelect,
  etaLabel,
  feeYuan,
  children,
  tall = false,
}: {
  selected: boolean;
  onSelect: () => void;
  etaLabel: string;
  feeYuan: number;
  children: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative w-full overflow-hidden rounded-12 border text-left ${
        tall ? 'h-18' : 'h-14'
      } ${
        selected
          ? 'border-brand-primary bg-brand-secondary'
          : 'border-text-quaternary bg-bg-container'
      }`}
    >
      {selected && <CornerCheck />}
      {children}
      <span className="absolute top-1/2 right-6 flex -translate-y-1/2 flex-col items-end gap-1">
        <Fee yuan={feeYuan} />
        <span className="flex items-center gap-0.5 whitespace-nowrap">
          <span className="text-caption-xs text-text-tertiary">送达</span>
          <span className="font-number text-body text-text-primary">
            {etaLabel}
          </span>
        </span>
      </span>
    </button>
  );
}

/**
 * 服务选择组件(1540:27741 / 864:7143):普通帮送 / 1对1急送 / 汽车配送。
 * 预选由首页业务配置(serviceMode / vehicle)决定,选择回写草稿。
 */
export function ServiceOptionCard({ value, onChange }: ServiceOptionCardProps) {
  return (
    <section className="w-full rounded-16 bg-bg-container px-3 pt-3 pb-3">
      {/* 抽屉把手 */}
      <span className="mx-auto mb-3 block h-1 w-8 rounded-full bg-text-quaternary" />
      <div className="flex flex-col gap-2">
        <OptionShell
          selected={value === 'standard'}
          onSelect={() => onChange('standard')}
          feeYuan={SERVICE_QUOTES.standard.feeYuan}
          etaLabel={SERVICE_QUOTES.standard.etaLabel}
        >
          <span className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2">
            <span className="text-body font-medium text-text-primary">
              普通帮送
            </span>
            <span className="rounded-4 border-[0.6px] border-text-tertiary px-1 py-0.5 text-caption-xs font-medium text-text-tertiary">
              享标准权益
            </span>
            <img src={iconHelp} alt="" className="size-3.5" />
          </span>
        </OptionShell>

        <OptionShell
          selected={value === 'express'}
          onSelect={() => onChange('express')}
          feeYuan={SERVICE_QUOTES.express.feeYuan}
          etaLabel={SERVICE_QUOTES.express.etaLabel}
          tall
        >
          <span className="absolute top-[15px] left-5 flex items-center gap-2">
            <img src={logoExpress} alt="1对1急送" className="h-[22px]" />
            {/* 金渐变为组件级装饰值(非全局 token) */}
            <span className="rounded-4 bg-gradient-to-r from-[#ffe2af] to-[#e8ba7e] px-1 py-0.5 text-caption-xs font-medium text-decorative-primary">
              权益升级
            </span>
            <img src={iconHelp} alt="" className="size-3.5" />
          </span>
          <span className="absolute bottom-2.5 left-4 flex items-center gap-0.5">
            {['优先接单', '尊享骑士', '专享理赔权益'].map((benefit) => (
              <span
                key={benefit}
                className="rounded-tl-4 rounded-tr-4 rounded-br-4 bg-bg-container px-1 py-0.5 text-caption-xs font-medium text-decorative-primary"
              >
                {benefit}
              </span>
            ))}
          </span>
        </OptionShell>

        <OptionShell
          selected={value === 'car'}
          onSelect={() => onChange('car')}
          feeYuan={SERVICE_QUOTES.car.feeYuan}
          etaLabel={SERVICE_QUOTES.car.etaLabel}
        >
          <span className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-2">
            <span className="text-body font-medium text-text-primary">
              汽车配送
            </span>
            <span className="rounded-tl-4 rounded-tr-4 rounded-br-4 bg-gradient-to-r from-[#fcf17b] to-brand-primary px-1 py-0.5 text-caption-xs text-text-primary">
              重物稳送
            </span>
          </span>
        </OptionShell>
      </div>
    </section>
  );
}
