import iconCheckGreen from '../../assets/item-info/icon-check-green.svg';
import iconRefresh from '../../assets/item-info/icon-refresh.svg';
import photoDeliveryBox from '../../assets/item-info/photo-delivery-box.png';
import type { Volume } from '../../data/models/order';
import {
  DELIVERY_BOX_CM,
  DIMENSION_CAR_THRESHOLD_CM,
  DIMENSION_MAX_CM,
  DIMENSION_TICKS,
  MAX_GIRTH_CM,
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
  const girth = volume.l + volume.w + volume.h;
  const illustrationState =
    girth > MAX_GIRTH_CM
      ? 'oversize'
      : Math.max(volume.l, volume.w, volume.h) > DIMENSION_CAR_THRESHOLD_CM
        ? 'large'
        : 'default';

  return (
    <section className="flex w-full flex-col gap-2 rounded-16 bg-bg-container px-4 py-3">
      <FieldHeader
        label="体积/规格"
        right={
          <span className="flex items-center gap-1">
            <span className="text-caption text-text-tertiary">详细尺寸</span>
            <Switch
              checked={expanded}
              ariaLabel="录入详细尺寸"
              onChange={onToggleExpanded}
            />
          </span>
        }
      />

      {!expanded ? (
        <>
          <p className="text-caption-sm text-text-tertiary">
            请参考配送箱尺寸，
            <span className="text-accent-primary">
              如物品尺寸大于配送箱请录入详细尺寸
            </span>
          </p>
          <div className="flex items-center gap-1">
            <img
              src={photoDeliveryBox}
              alt="骑手与配送箱"
              className="w-[122px] shrink-0"
            />
            <div className="flex flex-col gap-2 text-caption text-text-secondary">
              <p className="font-medium">配送箱尺寸：</p>
              <p>
                长{DELIVERY_BOX_CM.l}cm * 宽{DELIVERY_BOX_CM.w}cm * 高
                {DELIVERY_BOX_CM.h}cm
              </p>
              <p className="flex items-center gap-1">
                <img src={iconCheckGreen} alt="" className="size-4.5" />
                1箱矿泉水、电脑主机、大号文件箱
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-caption-sm text-text-tertiary">
            物品尺寸
            <span className="text-accent-primary">
              三边之和在{MAX_GIRTH_CM}厘米内
            </span>
            可正常配送
          </p>
          <VolumeIllustration state={illustrationState} volume={volume} />
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
            onClick={() => onChange(DELIVERY_BOX_CM)}
            className="mx-auto mt-2 flex items-center gap-1 rounded-full border border-text-quaternary px-2 py-1.5"
          >
            <img src={iconRefresh} alt="" className="size-5" />
            <span className="text-caption text-text-tertiary">恢复默认</span>
          </button>
        </>
      )}
    </section>
  );
}
