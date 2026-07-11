import { useState } from 'react';

import { RoleBadge } from '../../components/RoleBadge';
import helpTopics from '../../assets/tracking/help-topics.jpg';
import iconExpand from '../../assets/tracking/icon-expand.svg';
import proofDelivery from '../../assets/tracking/proof-delivery-confirmed.jpg';
import proofPickup from '../../assets/tracking/proof-pickup-confirmed.jpg';
import type { Address } from '../../data/models/order';
import type { Courier } from '../../data/models/tracking';
import { CourierCard } from './CourierCard';
import { OrderActions } from './OrderActions';
import { OrderInfoCard } from './OrderInfoCard';
import { TrackingNavigation } from './TrackingNavigation';

function SignedThumbnail({
  role,
  src,
}: {
  role: 'pickup' | 'delivery';
  src: string;
}) {
  return (
    <div className="relative size-[69px] shrink-0 overflow-hidden rounded-8 max-[350px]:size-14">
      <img
        src={src}
        alt={role === 'pickup' ? '取件物品凭证' : '收件物品凭证'}
        className="size-full object-cover object-center"
      />
      <span className="absolute top-0 left-0">
        <RoleBadge role={role} />
      </span>
      <span className="absolute right-0 bottom-0 flex size-4 items-center justify-center rounded-[5px] bg-text-primary">
        <img src={iconExpand} alt="" className="size-4" />
      </span>
    </div>
  );
}

interface CompletedOrderViewProps {
  bookmarked: boolean;
  courier: Courier;
  delivery: Address;
  feeYuan: number;
  note?: string;
  pickup: Address;
  onBack: () => void;
  onBookmark: () => void;
  onCall: () => void;
  onClaim: () => void;
  onEdit: () => void;
  onMessage: () => void;
  onMore: () => void;
  onShare: () => void;
  onSupport: () => void;
  onTip: () => void;
}

/** 订单完成页(frame 1380:21404)。 */
export function CompletedOrderView({
  bookmarked,
  courier,
  delivery,
  feeYuan,
  note,
  pickup,
  onBack,
  onBookmark,
  onCall,
  onClaim,
  onEdit,
  onMessage,
  onMore,
  onShare,
  onSupport,
  onTip,
}: CompletedOrderViewProps) {
  const [tipVisible, setTipVisible] = useState(true);

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-bg-page pt-[env(safe-area-inset-top)]">
      <TrackingNavigation
        bookmarked={bookmarked}
        onBack={onBack}
        onBookmark={onBookmark}
        onSupport={onSupport}
      />
      <main className="flex flex-col gap-2 px-2 pb-8">
        <section className="rounded-b-16 bg-bg-container pb-3 pl-4">
          <h1 className="text-title-max font-semibold text-text-primary">
            订单已完成
          </h1>
          <p className="mt-2 whitespace-nowrap text-body text-text-primary max-[350px]:whitespace-normal">
            本次服务343米，用时28分钟，感谢您使用美团跑腿
          </p>

          <div className="mt-4 mr-4 flex h-[93px] items-center rounded-8 bg-bg-page p-3">
            <div className="flex min-w-[145px] flex-col max-[350px]:min-w-[92px]">
              <span className="text-tab font-medium text-text-primary">
                签收方式
              </span>
              <span className="mt-1 text-tab font-medium text-accent-primary">
                本人签收
              </span>
              <button
                type="button"
                className="mt-1 flex h-5 items-center self-start text-caption text-text-tertiary"
              >
                查看详情
                <span aria-hidden className="text-body leading-none">
                  ›
                </span>
              </button>
            </div>
            <div className="ml-auto flex gap-3 max-[350px]:gap-2">
              <SignedThumbnail role="pickup" src={proofPickup} />
              <SignedThumbnail role="delivery" src={proofDelivery} />
            </div>
          </div>

          <div className="mt-3 mr-4">
            <OrderActions
              onMore={onMore}
              onEdit={onEdit}
              onClaim={onClaim}
              onShare={onShare}
            />
          </div>
        </section>

        <CourierCard
          courier={courier}
          showTip={tipVisible}
          onCall={onCall}
          onDismissTip={() => setTipVisible(false)}
          onMessage={onMessage}
          onTip={onTip}
        />

        <OrderInfoCard
          pickup={pickup}
          delivery={delivery}
          note={note}
          feeYuan={feeYuan}
        />

        <section className="relative h-[411px] overflow-hidden rounded-16 bg-bg-container">
          <img
            src={helpTopics}
            alt="遇到问题需要帮助"
            className="absolute max-w-none"
            style={{
              width: '104.47%',
              height: '329.3%',
              left: '-2.23%',
              top: '-189.05%',
            }}
          />
        </section>
      </main>
    </div>
  );
}
