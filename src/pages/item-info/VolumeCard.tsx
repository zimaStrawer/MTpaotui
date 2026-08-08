import { useState } from 'react';

import iconCheckGreen from '../../assets/item-info/icon-check-green.svg';
import iconRefresh from '../../assets/item-info/icon-refresh.svg';
import photoDeliveryBox from '../../assets/item-info/photo-delivery-box.webp';
import {
  classifyVolumeDelivery,
  DEFAULT_DELIVERY_BOX_VOLUME,
  VOLUME_MAX_GIRTH_CM,
  type Volume,
} from '../../data/models/order';
import {
  DIMENSION_MAX_CM,
  DIMENSION_TICKS,
} from './constants';
import { FieldHeader } from './FieldHeader';
import { Switch } from './Switch';
import { TickSlider } from './TickSlider';
import { VolumeIllustration } from './VolumeIllustration';

interface VolumeCardProps {
  volume: Volume;
  expanded: boolean;
  onToggleExpanded: (expanded: boolean) => void;
  onChange: (volume: Volume) => void;
}

const DIMENSIONS = [
  { key: 'l', label: '长度' },
  { key: 'w', label: '宽度' },
  { key: 'h', label: '高度' },
] as const;

/** 体积/规格卡(frame 1380:20299 收起 / 1476:31660 展开,一个布尔切换)。 */
export function VolumeCard({
  volume,
  expanded,
  onToggleExpanded,
  onChange,
}: VolumeCardProps) {
  const deliveryStatus = classifyVolumeDelivery(volume);
  const [switchChecked, setSwitchChecked] = useState(expanded);

  const handleToggleExpanded = (nextExpanded: boolean) => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    setSwitchChecked(nextExpanded);
    if (reduceMotion) onToggleExpanded(nextExpanded);
  };

  const handleSwitchSlideEnd = (checked: boolean) => {
    if (checked !== expanded) onToggleExpanded(checked);
  };

  return (
    <section
      className={`w-full rounded-16 bg-container-bg px-4 py-3 ${
        expanded ? 'flex flex-col gap-2' : 'relative h-[194px]'
      }`}
    >
      <FieldHeader
        label="体积/规格"
        right={
          <span className="flex items-center gap-1">
            <span className="text-caption text-text-tertiary">详细尺寸</span>
            <Switch
              checked={switchChecked}
              ariaLabel="录入详细尺寸"
              onChange={handleToggleExpanded}
              onSlideEnd={handleSwitchSlideEnd}
            />
          </span>
        }
      />

      {!expanded ? (
        <>
          <p className="absolute top-11 right-4 left-4 text-caption-sm text-text-tertiary">
            请参考配送箱尺寸，
            <span className="text-highlight-primary">
              如物品尺寸大于配送箱请录入详细尺寸
            </span>
          </p>
          <div className="absolute top-[66px] right-4 left-4 h-[116px] overflow-hidden rounded-8 bg-page-bg">
            <div className="absolute top-[26px] right-5 left-[119px] text-caption text-text-secondary">
              <p className="font-medium">配送箱尺寸：</p>
              <div className="mt-[3px] flex flex-col gap-2">
                <p>
                  长{DEFAULT_DELIVERY_BOX_VOLUME.l}cm * 宽
                  {DEFAULT_DELIVERY_BOX_VOLUME.w}cm * 高
                  {DEFAULT_DELIVERY_BOX_VOLUME.h}cm
                </p>
                <p className="flex items-start gap-1 whitespace-nowrap">
                  <img src={iconCheckGreen} alt="" className="size-4.5" />
                  1箱矿泉水、大号文件箱
                </p>
              </div>
            </div>
            <div className="absolute top-0 -left-[7px] h-[116px] w-[122px] overflow-hidden">
              <img
                src={photoDeliveryBox}
                alt="骑手与配送箱"
                width={122}
                height={126}
                decoding="async"
                className="h-[126px] w-[122px] max-w-none"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-caption-sm text-text-tertiary">
            物品尺寸
            <span className="text-highlight-primary">
              三边之和在{VOLUME_MAX_GIRTH_CM}厘米内
            </span>
            可正常配送
          </p>
          <VolumeIllustration state={deliveryStatus} volume={volume} />
          <div className="mt-2 flex flex-col gap-6">
            {DIMENSIONS.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-body text-text-primary">{label}</span>
                  <span className="font-number text-display-lg font-medium text-text-primary">
                    {volume[key]}
                  </span>
                  <span className="text-body text-text-primary">厘米</span>
                </div>
                <TickSlider
                  value={volume[key]}
                  max={DIMENSION_MAX_CM}
                  ticks={DIMENSION_TICKS}
                  ariaLabel={`物品${label}(厘米)`}
                  onChange={(value) => onChange({ ...volume, [key]: value })}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_DELIVERY_BOX_VOLUME)}
            className="mx-auto mt-2 flex items-center gap-1 rounded-full border border-text-quaternary px-2 py-1.5"
          >
            <img src={iconRefresh} alt="" className="size-4" />
            <span className="text-caption text-text-tertiary">恢复默认</span>
          </button>
        </>
      )}
    </section>
  );
}
