import iconChevron from '../../assets/nav/icon-chevron-24.svg';
import type { AddressRole } from '../../data/models/order';
import { formatPhone } from '../../lib/format';
import { MapPreview } from './MapPreview';

export interface AddressFormValue {
  /** null = 未选定位点(未填态) */
  poi: string | null;
  unit: string;
  contactName: string;
  phone: string;
}

interface AddressFormCardProps {
  role: AddressRole;
  value: AddressFormValue;
  /** 地址行点击:mock 定位选点 */
  onPickPoi: () => void;
  onChange: (patch: Partial<AddressFormValue>) => void;
  onSave: () => void;
}

function FieldLabel({ text, required = false }: { text: string; required?: boolean }) {
  return (
    <span className="text-body font-medium text-text-primary">
      {text}
      {required && (
        <span className="ml-0.5 align-top text-tab font-semibold text-accent-primary">
          *
        </span>
      )}
    </span>
  );
}

function AuxPill({ text }: { text: string }) {
  return (
    <span className="flex h-6 items-center justify-center rounded-full border-[0.6px] border-text-quaternary px-3 text-caption-sm whitespace-nowrap text-text-secondary">
      {text}
    </span>
  );
}

const inputClass =
  'w-full bg-transparent text-body font-medium text-text-primary placeholder:font-normal placeholder:text-text-quaternary focus:outline-none';

/**
 * 地址填写卡(1082:9471 变体集):角色(取/收)× 已填/未填。
 * 未填无地图、按钮置灰;地址与电话为必填。
 */
export function AddressFormCard({
  role,
  value,
  onPickPoi,
  onChange,
  onSave,
}: AddressFormCardProps) {
  const canSave = value.poi !== null && value.phone.length === 11;

  return (
    <section className="w-full overflow-hidden rounded-16 border-2 border-bg-container bg-bg-container">
      {value.poi !== null && <MapPreview role={role} poi={value.poi} />}
      <div
        className={`px-3 pb-4 ${value.poi !== null ? 'pt-5' : 'pt-4'}`}
      >
        <div className="mr-1 grid grid-cols-[71px_1fr_48px] items-center gap-y-6">
          <FieldLabel text="地址" required />
          <button
            type="button"
            onClick={onPickPoi}
            className="col-span-2 flex items-center justify-between text-left"
          >
            {value.poi !== null ? (
              <span className="text-title leading-none font-semibold text-text-primary">
                {value.poi}
              </span>
            ) : (
              <span className="text-title font-semibold text-text-secondary">
                {role === 'pickup' ? '选择取件地址' : '选择收件地址'}
              </span>
            )}
            <img src={iconChevron} alt="" className="size-6 shrink-0" />
          </button>

          <FieldLabel text="门牌号" />
          <input
            value={value.unit}
            onChange={(event) => onChange({ unit: event.target.value })}
            placeholder="单元、楼层、门牌号等, 如: 4单元301"
            className={inputClass}
          />
          <span />

          <FieldLabel text="联系人" />
          <input
            value={value.contactName}
            onChange={(event) => onChange({ contactName: event.target.value })}
            placeholder="联系人姓名"
            className={`${inputClass} ml-0.5`}
          />
          <AuxPill text="通讯录" />

          <FieldLabel text="电话" required />
          <input
            value={formatPhone(value.phone)}
            onChange={(event) =>
              onChange({
                phone: event.target.value.replace(/\D/g, '').slice(0, 11),
              })
            }
            placeholder="请输入正确的号码"
            inputMode="numeric"
            className={`${inputClass} font-number`}
          />
          <AuxPill text="分机号" />
        </div>

        <button
          type="button"
          disabled={!canSave}
          onClick={onSave}
          className={`mx-0.5 mt-6 h-11 w-[calc(100%-4px)] rounded-full text-title font-semibold ${
            canSave
              ? 'bg-brand-primary text-text-primary'
              : 'bg-text-quaternary text-bg-container'
          }`}
        >
          保存并使用
        </button>
      </div>
    </section>
  );
}
