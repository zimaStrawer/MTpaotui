import { useState } from 'react';

import avatarRunner from '../../assets/address/avatar-runner.svg';
import iconCloseSmall from '../../assets/address/icon-close-small.svg';
import iconSearch from '../../assets/address/icon-search.svg';
import iconEdit from '../../assets/item-info/icon-edit.svg';
import {
  MOCK_ADDRESS_BOOK,
  type AddressBookEntry,
} from '../../data/mock/fixtures';
import { maskPhone } from '../../lib/format';

interface AddressBookCardProps {
  /** 与当前表单定位点一致的条目显示选中角标 */
  selectedPoi: string | null;
  onPick: (entry: AddressBookEntry) => void;
}

/** 地址簿(884:5711):搜索 + 提示条 + 地址列表,点击条目回填表单。 */
export function AddressBookCard({ selectedPoi, onPick }: AddressBookCardProps) {
  const [tipVisible, setTipVisible] = useState(true);

  return (
    <section className="w-full rounded-16 bg-container-bg py-4">
      <div className="flex items-center gap-3 px-4">
        <h2 className="text-tab font-medium text-text-primary">地址簿</h2>
        <span className="flex flex-1 items-center gap-1 rounded-full bg-page-bg px-3 py-2">
          <img src={iconSearch} alt="" className="size-5" />
          <span className="text-caption text-text-secondary">
            搜索地址簿内姓名、电话、地址
          </span>
        </span>
      </div>

      {tipVisible && (
        <div className="mx-4 mt-2 flex items-center justify-between rounded-4 bg-highlight-bg px-3 py-2">
          <span className="text-caption font-medium text-highlight-primary">
            左滑可置顶、删除地址
          </span>
          <button
            type="button"
            aria-label="关闭提示"
            onClick={() => setTipVisible(false)}
            className="ml-auto flex size-4 shrink-0 items-center justify-center"
          >
            <span
              aria-hidden
              className="size-4 bg-highlight-primary"
              style={{
                WebkitMaskImage: `url("${iconCloseSmall}")`,
                maskImage: `url("${iconCloseSmall}")`,
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </button>
        </div>
      )}

      <ul className="mt-2">
        {MOCK_ADDRESS_BOOK.map((entry) => {
          const selected = entry.poi === selectedPoi;
          return (
            <li key={entry.poi} className="relative h-15 overflow-hidden">
              {selected && (
                <>
                  <span className="absolute -top-3 -left-3 size-7 rounded-8 bg-service-primary" />
                  <svg
                    viewBox="0 0 8 8"
                    aria-hidden
                    className="absolute top-[3px] left-[5px] size-2"
                  >
                    <path
                      d="M1.3 4l1.8 1.8L6.7 2"
                      fill="none"
                      stroke="var(--color-text-primary)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
              <button
                type="button"
                onClick={() => onPick(entry)}
                className="flex size-full items-center justify-between px-5 text-left"
              >
                <span className="flex items-center gap-3">
                  {entry.avatar === 'runner' ? (
                    <img src={avatarRunner} alt="" className="size-[38px]" />
                  ) : (
                    <span className="flex size-[38px] items-center justify-center rounded-full bg-highlight-bg text-body font-semibold text-highlight-primary">
                      {entry.contactName.charAt(0)}
                    </span>
                  )}
                  <span className="flex flex-col gap-1">
                    <span className="text-body font-medium text-text-primary">
                      {entry.poi} {entry.unit}
                    </span>
                    <span className="flex items-center gap-2 text-caption text-text-secondary">
                      {entry.contactName}
                      <span className="font-number">
                        {maskPhone(entry.phone)}
                      </span>
                    </span>
                  </span>
                </span>
                <img src={iconEdit} alt="" className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
