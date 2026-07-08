import illustBoxRef from '../../assets/item-info/illust-box-ref.png';
import illustBoxWireframe from '../../assets/item-info/illust-box-wireframe.svg';
import illustCourier from '../../assets/item-info/illust-courier.png';

interface VolumeIllustrationProps {
  /** 三边之和超限时,骑手气泡提示「太大啦」 */
  oversize: boolean;
}

/** 详细尺寸参照插画(frame 1476:31617):175cm 骑手 + 体积线框对比。 */
export function VolumeIllustration({ oversize }: VolumeIllustrationProps) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-8 bg-bg-page">
      <p className="absolute top-1/2 left-3 -translate-y-1/2 text-caption-xs text-text-secondary [writing-mode:vertical-lr]">
        身高175厘米
      </p>
      <img
        src={illustCourier}
        alt=""
        className="absolute bottom-0 left-8 h-[195px] object-contain"
      />
      {oversize && (
        <div className="absolute top-2 left-14 z-10">
          <span className="block rounded-8 bg-bg-black px-1.5 py-2 text-caption whitespace-nowrap text-bg-container">
            太大啦，可能送不了哦
          </span>
          <span className="mx-auto -mt-1 block size-2 rotate-45 bg-bg-black" />
        </div>
      )}
      <span className="absolute top-[100px] right-10 w-[94px]">
        <img src={illustBoxWireframe} alt="" className="w-full" />
        <img
          src={illustBoxRef}
          alt=""
          className="absolute bottom-0 left-0 w-[42px]"
        />
      </span>
    </div>
  );
}
