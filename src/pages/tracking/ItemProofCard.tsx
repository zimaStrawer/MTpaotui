import { RoleBadge } from '../../components/RoleBadge';
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

interface ProofThumbnailProps {
  confirmed: boolean;
  role: 'pickup' | 'delivery';
  src: string;
}

function ProofThumbnail({ confirmed, role, src }: ProofThumbnailProps) {
  const roleLabel = role === 'pickup' ? '取件' : '收件';
  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-6 max-[350px]:size-10">
      <img
        src={src}
        alt={`${roleLabel}物品凭证`}
        className={`size-full object-cover ${
          confirmed ? 'object-center' : 'object-bottom'
        }`}
      />
      <span className="absolute top-0 left-0">
        <RoleBadge role={role} />
      </span>
      {confirmed && (
        <span className="absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-[5px] bg-text-primary">
          <img src={iconExpand} alt="" className="size-4" />
        </span>
      )}
    </div>
  );
}

interface ItemProofCardProps {
  pickupCode: string;
  stage: TrackingStage;
  onViewBenefits: () => void;
}

/** 物品凭证三变体(node 1541:28177):待取件 / 待收件 / 已送达。 */
export function ItemProofCard({
  pickupCode,
  stage,
  onViewBenefits,
}: ItemProofCardProps) {
  const stageIndex = TRACKING_STAGE_FLOW.indexOf(stage);
  const pickupConfirmed = stageIndex >= TRACKING_STAGE_FLOW.indexOf('picked');
  const deliveryConfirmed = stageIndex >= TRACKING_STAGE_FLOW.indexOf('arrived');
  const codeVisible = pickupConfirmed;

  return (
    <section className="relative h-[102px] w-full overflow-hidden rounded-16 bg-bg-container">
      <div className="absolute inset-x-0 top-0 h-[27px] bg-bg-page" />
      <div
        className="absolute top-0 left-0 h-[27px] w-[275px] bg-insurance-secondary"
        style={{ clipPath: 'polygon(0 0, 85% 0, 96% 100%, 100% 100%, 0 100%)' }}
      />
      <img
        src={logoInsurance}
        alt="省心送保价服务"
        className="absolute top-0 left-4 h-[25px] w-[92px]"
      />
      <button
        type="button"
        onClick={onViewBenefits}
        className="absolute top-0.5 right-2 flex h-6 items-center px-1 text-caption-sm text-text-tertiary"
      >
        查看权益
        <span aria-hidden className="ml-0.5 text-body leading-none">
          ›
        </span>
      </button>

      <div className="absolute top-[43px] left-4 flex flex-col gap-1">
        <div className="flex h-[29px] items-center gap-2">
          <span className="text-tab font-medium text-text-primary">收货码</span>
          <span
            className={`font-number font-bold text-accent-primary ${
              codeVisible ? 'text-display' : 'text-number-lg'
            }`}
          >
            {codeVisible ? pickupCode : '✱✱✱✱'}
          </span>
          <img src={iconHelp} alt="" className="size-3.5" />
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
          confirmed={pickupConfirmed}
          src={pickupConfirmed ? proofPickupConfirmed : proofPickup}
        />
        <ProofThumbnail
          role="delivery"
          confirmed={deliveryConfirmed}
          src={deliveryConfirmed ? proofDeliveryConfirmed : proofDelivery}
        />
      </div>
    </section>
  );
}
