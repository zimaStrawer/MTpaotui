import { RoleBadge } from '../../components/RoleBadge';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import logoExpress from '../../assets/order/logo-express.svg';
import iconExpand from '../../assets/tracking/icon-expand.svg';
import iconHelp from '../../assets/tracking/icon-help.svg';
import logoInsurance from '../../assets/tracking/logo-insurance.svg';
import proofDelivery from '../../assets/tracking/proof-delivery.png';
import proofDeliveryConfirmed from '../../assets/tracking/proof-delivery-confirmed.jpg';
import proofPickup from '../../assets/tracking/proof-pickup.png';
import proofPickupConfirmed from '../../assets/tracking/proof-pickup-confirmed.jpg';
import {
  TRACKING_STAGE_FLOW,
  type TrackingStage,
} from '../../data/models/tracking';
import type { ItemProofServiceVariant } from '../../data/models/order';

const SERVICE_HEADER_COLOR: Record<ItemProofServiceVariant, string> = {
  standard: 'text-brand-bg',
  insurance: 'text-insurance-bg',
  express: 'text-highlight-bg',
};

function ProofServiceHeader({
  variant,
}: {
  variant: ItemProofServiceVariant;
}) {
  const color = SERVICE_HEADER_COLOR[variant];

  return (
    <>
      <div
        className={`pointer-events-none absolute top-0 right-[143px] left-0 h-[27px] rounded-tl-16 bg-current ${color}`}
      />
      <svg
        aria-hidden
        viewBox="216 0 40 29"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute top-[-2px] right-[103px] h-[29px] w-10 ${color}`}
      >
        <path
          d="M216 0H228.268C235.72 0 242.186 5.14487 243.859 12.4067L244.877 16.8203C245.909 21.2986 248.816 25.1168 252.859 27.3022L256 29H216V0Z"
          fill="currentColor"
        />
      </svg>

      {variant === 'express' && (
        <img
          src={logoExpress}
          alt="1对1急送"
          className="absolute top-0.5 left-4 h-[22px] w-[75px]"
        />
      )}
      {variant === 'insurance' && (
        <img
          src={logoInsurance}
          alt="省心送保价服务"
          className="absolute top-0 left-4 h-[25px] w-[92px]"
        />
      )}
      {variant === 'standard' && (
        <span className="absolute top-[3px] left-4 flex h-5 w-14 items-center text-body leading-5 font-semibold whitespace-nowrap text-text-primary">
          普通帮送
        </span>
      )}
    </>
  );
}

interface ProofThumbnailProps {
  confirmed: boolean;
  premium: boolean;
  role: 'pickup' | 'delivery';
  src: string;
}

function ProofThumbnail({
  confirmed,
  premium,
  role,
  src,
}: ProofThumbnailProps) {
  const roleLabel = role === 'pickup' ? '取件' : '收件';
  return (
    <div className="relative isolate size-12 shrink-0 rounded-6 bg-container-bg max-[350px]:size-10">
      <img
        src={src}
        alt={`${roleLabel}物品凭证`}
        className={`absolute inset-0 block size-full rounded-6 object-cover ${
          confirmed ? 'object-center' : 'object-bottom'
        }`}
      />
      <span className="absolute top-0 left-0 z-10 rounded-6">
        <RoleBadge role={role} premium={premium} />
      </span>
      {confirmed && (
        <span className="absolute right-0 bottom-0 z-10 flex size-4 items-center justify-center rounded-[5px] bg-text-primary">
          <img src={iconExpand} alt="" className="size-3" />
        </span>
      )}
    </div>
  );
}

interface ItemProofCardProps {
  pickupCode: string;
  serviceVariant: ItemProofServiceVariant;
  stage: TrackingStage;
  onItemIssue: () => void;
}

/** 物品凭证三变体(node 1541:28177):待取件 / 待收件 / 已送达。 */
export function ItemProofCard({
  pickupCode,
  serviceVariant,
  stage,
  onItemIssue,
}: ItemProofCardProps) {
  const stageIndex = TRACKING_STAGE_FLOW.indexOf(stage);
  const pickupConfirmed =
    stageIndex >= TRACKING_STAGE_FLOW.indexOf('delivering');
  const deliveryConfirmed = stageIndex >= TRACKING_STAGE_FLOW.indexOf('arrived');
  const codeVisible = pickupConfirmed;

  return (
    <section className="relative h-[102px] w-full overflow-hidden rounded-16 bg-container-bg">
      <div className="absolute inset-x-0 top-0 h-[27px] bg-page-bg" />
      <ProofServiceHeader variant={serviceVariant} />
      <button
        type="button"
        onClick={onItemIssue}
        className="absolute top-0 right-4 flex h-6 items-center text-caption-sm whitespace-nowrap text-text-tertiary"
      >
        物品异常处理
        <img src={iconChevron} alt="" className="size-3" />
      </button>

      <div className="absolute top-[43px] left-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-tab font-medium text-text-primary">收货码</span>
          <span
            className={`font-number font-bold text-highlight-primary ${
              codeVisible ? 'text-display' : 'text-number-lg'
            }`}
          >
            {codeVisible ? pickupCode : '✱✱✱✱'}
          </span>
          <img src={iconHelp} alt="" className="size-4" />
        </div>
        <p className="text-caption whitespace-nowrap text-text-tertiary">
          <span className="max-[350px]:hidden">
            {codeVisible
              ? '请确认物品完好后，告知骑手收货码'
              : '骑手取件后将更新为4位数字'}
          </span>
          <span className="hidden max-[350px]:inline">
            {codeVisible ? '确认完好后告知收货码' : '取件后更新4位数字'}
          </span>
        </p>
      </div>

      <div className="absolute top-[41px] right-4 flex gap-3 max-[350px]:gap-2">
        <ProofThumbnail
          role="pickup"
          premium={serviceVariant === 'express'}
          confirmed={pickupConfirmed}
          src={pickupConfirmed ? proofPickupConfirmed : proofPickup}
        />
        <ProofThumbnail
          role="delivery"
          premium={serviceVariant === 'express'}
          confirmed={deliveryConfirmed}
          src={deliveryConfirmed ? proofDeliveryConfirmed : proofDelivery}
        />
      </div>
    </section>
  );
}
