import illustBoxRef from '../../assets/item-info/illust-box-ref.webp';
import illustCourierDefault from '../../assets/item-info/illust-courier-default.webp';
import illustCourierLarge from '../../assets/item-info/illust-courier-large.webp';
import illustCourierOversize from '../../assets/item-info/illust-courier.webp';
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
    <div
      role="img"
      aria-label="骑手与配送箱尺寸示意"
      className="relative h-[225px] w-full overflow-hidden rounded-8 bg-page-bg"
    >
      <p className="absolute top-1/2 left-3 -translate-y-1/2 text-caption-xs text-text-secondary [writing-mode:vertical-lr]">
        身高175厘米
      </p>
      <div className="absolute top-2 left-1/3 z-10 -translate-x-1/2">
        <span className="relative block rounded-8 bg-mask-bg px-3 py-2 text-caption whitespace-nowrap text-container-bg after:absolute after:-bottom-1 after:left-5 after:size-2 after:rotate-45 after:bg-mask-bg">
          {courier.message}
        </span>
      </div>

      {Object.entries(COURIER_STATE).map(([candidateState, candidate]) => (
        <span
          key={candidateState}
          aria-hidden
          className={`pointer-events-none absolute overflow-hidden transition-opacity duration-200 ease-out motion-reduce:transition-none ${
            candidateState === state ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: '12.538%',
            top: '26.667%',
            width: '29.969%',
            height: '65.333%',
          }}
        >
          <img
            src={candidate.image}
            alt=""
            width={200}
            height={355}
            decoding="async"
            draggable={false}
            className="absolute max-w-none select-none"
            style={{
              left: '0.837%',
              top: '-4.57%',
              width: '99.37%',
              height: '118.08%',
            }}
          />
        </span>
      ))}

      <span
        aria-hidden
        className="pointer-events-none absolute overflow-hidden"
        style={{
          left: '46.483%',
          top: '77.778%',
          width: '12.844%',
          height: '14.667%',
        }}
      >
        <img
          src={illustBoxRef}
          alt=""
          width={56.37}
          height={42.05}
          decoding="async"
          draggable={false}
          className="absolute max-w-none select-none"
          style={{
            left: '-15.786%',
            top: '-13.394%',
            width: '134.214%',
            height: '127.424%',
          }}
        />
      </span>

      <svg
        viewBox="0 0 327 225"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full"
      >
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
