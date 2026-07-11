import type { Address } from '../../data/models/order';
import { compactUnit, maskPhone } from '../../lib/format';

interface AddressRowProps {
  address: Address;
  label: string;
}

function AddressRow({ address, label }: AddressRowProps) {
  return (
    <div className="flex w-full items-start justify-between">
      <span className="text-body font-medium whitespace-nowrap text-text-tertiary">
        {label}
      </span>
      <div className="flex w-[178px] flex-col items-end gap-1 text-right text-text-primary">
        <span className="text-body font-medium whitespace-nowrap">
          {address.poi} {compactUnit(address.unit)}
        </span>
        <span className="flex gap-2 text-caption font-medium">
          <span>{address.contactName}</span>
          <span className="font-number">{maskPhone(address.phone)}</span>
        </span>
      </div>
    </div>
  );
}

interface OrderInfoCardProps {
  delivery: Address;
  feeYuan: number;
  note?: string;
  pickup: Address;
}

/** 订单信息卡(instance 1507:20733)，追踪态与完成态复用。 */
export function OrderInfoCard({
  delivery,
  feeYuan,
  note,
  pickup,
}: OrderInfoCardProps) {
  return (
    <section className="flex min-h-[293px] w-full flex-col rounded-16 bg-bg-container px-4 py-3">
      <h2 className="text-tab font-medium text-text-primary">订单信息</h2>
      <div className="mt-5 flex flex-col gap-4">
        <AddressRow address={pickup} label="取件地址" />
        <AddressRow address={delivery} label="收件地址" />
        <div className="flex items-start justify-between">
          <span className="text-body font-medium text-text-tertiary">
            备注信息
          </span>
          {note && (
            <span className="w-[178px] text-right text-body text-text-primary">
              {note}
            </span>
          )}
        </div>
      </div>
      <div className="mt-5 border-t border-divider pt-3">
        <div className="flex items-center justify-between">
          <span className="text-body font-medium text-text-primary">实付款</span>
          <span className="flex items-end gap-0.5 font-number text-text-primary">
            <span className="text-number-lg font-bold">¥</span>
            <span className="text-display font-bold">{feeYuan.toFixed(1)}</span>
          </span>
        </div>
      </div>
      <button
        type="button"
        className="mx-auto mt-auto flex h-7 items-center text-caption font-medium text-text-tertiary"
      >
        订单号/下单时间/费用明细
        <span aria-hidden className="ml-0.5 text-body leading-none">
          ⌄
        </span>
      </button>
    </section>
  );
}
