import illustBoxRef from '../../assets/item-info/illust-box-ref.png';
import illustCourierDefault from '../../assets/item-info/illust-courier-default.png';
import illustCourierLarge from '../../assets/item-info/illust-courier-large.png';
import illustCourierOversize from '../../assets/item-info/illust-courier.png';
import type {
  Volume,
  VolumeDeliveryStatus,
} from '../../data/models/order';
import { DIMENSION_MAX_CM } from './constants';

interface VolumeIllustrationProps {
  state: VolumeDeliveryStatus;
  volume: Volume;
}

const COURIER_STATE = {
  standard: {
    image: illustCourierDefault,
    message: '这件交给我，您放心！',
  },
  'car-recommended': {
    image: illustCourierLarge,
    message: '这件有点大，汽车送更稳',
  },
  oversize: {
    image: illustCourierOversize,
    message: '太大啦，可能送不了哦',
  },
} as const;

const BOX_ORIGIN = { x: 152, y: 208 };
const AXIS_LENGTH_PX = 110;
const AXIS_HEIGHT_PX = 100;
const AXIS_DEPTH_PX = 60;

function getBoxGeometry(volume: Volume) {
  const normalize = (value: number) =>
    Math.min(Math.max(value, 0), DIMENSION_MAX_CM) / DIMENSION_MAX_CM;

  return {
    width: normalize(volume.l) * AXIS_LENGTH_PX,
    height: normalize(volume.h) * AXIS_HEIGHT_PX,
    depth: normalize(volume.w) * AXIS_DEPTH_PX,
  };
}

/** 详细尺寸参照插画(frame 1476:31617):175cm 骑手 + 体积线框对比。 */
export function VolumeIllustration({ state, volume }: VolumeIllustrationProps) {
  const courier = COURIER_STATE[state];
  const box = getBoxGeometry(volume);
  const frontTop = BOX_ORIGIN.y - box.height;
  const frontRight = BOX_ORIGIN.x + box.width;
  const backLeft = BOX_ORIGIN.x + box.depth;
  const backRight = frontRight + box.depth;
  const backBottom = BOX_ORIGIN.y - box.depth;
  const backTop = frontTop - box.depth;

  return (
    <div className="relative h-[225px] w-full overflow-hidden rounded-8 bg-bg-page">
      <p className="absolute top-1/2 left-3 -translate-y-1/2 text-caption-xs text-text-secondary [writing-mode:vertical-lr]">
        身高175厘米
      </p>
      <div className="absolute top-2 left-1/3 z-10 -translate-x-1/2">
        <span className="relative block rounded-8 bg-bg-black px-3 py-2 text-caption whitespace-nowrap text-bg-container after:absolute after:-bottom-1 after:left-5 after:size-2 after:rotate-45 after:bg-bg-black">
          {courier.message}
        </span>
      </div>
      <svg
        viewBox="0 0 327 225"
        role="img"
        aria-label="骑手与配送箱尺寸示意"
        className="absolute inset-0 size-full"
      >
        <defs>
          <clipPath id="delivery-box-clip">
            <rect x="152" y="175" width="42" height="33" />
          </clipPath>
        </defs>
        <g
          fill="none"
          stroke="var(--color-text-tertiary)"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeWidth="1.5"
        >
          <path d="M152 208V108" />
          <path d="M152 208H262" />
          <path d="M152 208L212 148" />
        </g>
        <g stroke="var(--color-text-tertiary)" strokeWidth="1.5">
          <path d="M148 108H156" />
          <path d="M262 204V212" />
          <path d="M209 145L215 151" />
        </g>
        <g
          fill="var(--color-text-tertiary)"
          fontFamily="var(--font-number)"
          fontSize="8"
        >
          <text x="152" y="101" textAnchor="middle">
            高
          </text>
          <text x="269" y="211">
            长
          </text>
          <text x="216" y="144" transform="rotate(-45 216 144)">
            宽
          </text>
        </g>

        <image
          href={courier.image}
          x="41"
          y="60"
          width="85"
          height="147"
          preserveAspectRatio="xMidYMid meet"
        />

        <g clipPath="url(#delivery-box-clip)">
          <image
            href={illustBoxRef}
            x="145.37"
            y="170.58"
            width="56.37"
            height="42.05"
            preserveAspectRatio="none"
          />
        </g>

        <g
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeLinejoin="round"
          strokeWidth="1.5"
        >
          <path
            d={`M${BOX_ORIGIN.x} ${BOX_ORIGIN.y}H${frontRight}V${frontTop}H${BOX_ORIGIN.x}Z`}
          />
          <path
            d={`M${backLeft} ${backBottom}H${backRight}V${backTop}H${backLeft}Z`}
          />
          <path
            d={`M${BOX_ORIGIN.x} ${BOX_ORIGIN.y}L${backLeft} ${backBottom}M${frontRight} ${BOX_ORIGIN.y}L${backRight} ${backBottom}M${frontRight} ${frontTop}L${backRight} ${backTop}M${BOX_ORIGIN.x} ${frontTop}L${backLeft} ${backTop}`}
          />
        </g>
      </svg>
    </div>
  );
}
