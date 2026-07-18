import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { SERVICE_QUOTES } from '../../data/mock/service-quotes';
import { resolveDeliveryService } from '../../data/models/order';
import type { TrackingStage } from '../../data/models/tracking';
import { orderRepository } from '../../data/repositories';
import { useOrderDraftStore } from '../../store/order-draft-store';
import {
  Toast,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '../../components/Toast';
import { CompletedOrderView } from './CompletedOrderView';
import { CourierCard } from './CourierCard';
import { OrderInfoCard } from './OrderInfoCard';
import { TrackingMap } from './TrackingMap';
import { TrackingStatusCard } from './TrackingStatusCard';

/** 配送追踪页(frame 1507:20230/20684/21772/22206、1380:21404)。 */
export function TrackingPage() {
  const navigate = useNavigate();
  const receipt = useOrderDraftStore((state) => state.receipt);
  const pickup = useOrderDraftStore((state) => state.pickup);
  const delivery = useOrderDraftStore((state) => state.delivery);
  const item = useOrderDraftStore((state) => state.item);
  const serviceMode = useOrderDraftStore((state) => state.serviceMode);
  const vehicle = useOrderDraftStore((state) => state.vehicle);

  const [stage, setStage] = useState<TrackingStage>('accepting');
  const [bookmarked, setBookmarked] = useState(false);
  const [notice, setNotice] = useState<{
    id: number;
    message: string;
  } | null>(null);

  const ready =
    receipt !== null && pickup !== null && delivery !== null && item !== null;

  useEffect(() => {
    if (!ready) navigate('/', { replace: true });
  }, [navigate, ready]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (receipt === null) return;
    return orderRepository.watchTracking(receipt.orderId, setStage);
  }, [receipt]);

  useEffect(() => {
    if (notice === null) return;
    const timer = window.setTimeout(() => setNotice(null), 3_000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (stage === 'completed') window.scrollTo(0, 0);
  }, [stage]);

  if (receipt === null || pickup === null || delivery === null || item === null) {
    return null;
  }

  const serviceKey = resolveDeliveryService(serviceMode, vehicle);
  const feeYuan = SERVICE_QUOTES[serviceKey].feeYuan;

  const showNotice = (message: string) =>
    setNotice((current) => ({
      id: (current?.id ?? 0) + 1,
      message,
    }));

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '美团跑腿订单',
          text: `${receipt.courier.name}正在为我配送`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showNotice('订单链接已复制');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        showNotice('分享暂时不可用');
      }
    }
  };

  const commonActions = {
    onBack: () => navigate(-1),
    onBookmark: () => setBookmarked((value) => !value),
    onCall: () => {
      window.location.href = 'tel:10109777';
    },
    onClaim: () => showNotice('理赔服务已为您打开'),
    onEdit: () => navigate('/order-confirm'),
    onMessage: () => showNotice(`正在联系${receipt.courier.name}`),
    onMore: () => showNotice('更多订单服务已展开'),
    onShare: handleShare,
    onSupport: () => showNotice('正在为您接入客服'),
    onTip: () => showNotice('感谢红包已送达骑手'),
  };

  let content: React.ReactNode;
  if (stage === 'completed') {
    content = (
      <CompletedOrderView
        bookmarked={bookmarked}
        courier={receipt.courier}
        pickup={pickup}
        delivery={delivery}
        note={item.note}
        feeYuan={feeYuan}
        onBack={commonActions.onBack}
        onTip={commonActions.onTip}
        onUnavailable={() => showNotice(UNAVAILABLE_FEATURE_MESSAGE)}
      />
    );
  } else {
    content = (
      <div className="mx-auto min-h-dvh max-w-md bg-bg-page">
        <TrackingMap
          stage={stage}
          pickupCode={receipt.courier.pickupCode ?? '----'}
          bookmarked={bookmarked}
          onBack={commonActions.onBack}
          onBookmark={commonActions.onBookmark}
          onItemIssue={() => showNotice(UNAVAILABLE_FEATURE_MESSAGE)}
          onSupport={commonActions.onSupport}
        />
        <main className="relative z-10 flex flex-col gap-2 px-2 pb-8">
          {stage !== 'accepting' && (
            <CourierCard
              courier={receipt.courier}
              onCall={commonActions.onCall}
              onMessage={commonActions.onMessage}
            />
          )}
          <TrackingStatusCard stage={stage} {...commonActions} />
          <OrderInfoCard
            pickup={pickup}
            delivery={delivery}
            note={item.note}
            feeYuan={feeYuan}
          />
        </main>
      </div>
    );
  }

  return (
    <>
      {content}
      {notice && (
        <Toast
          key={notice.id}
          message={notice.message}
          className="bottom-[calc(24px+env(safe-area-inset-bottom))]"
        />
      )}
    </>
  );
}
