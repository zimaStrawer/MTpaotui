import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import iconBack from '../../assets/nav/icon-back.svg';
import { SERVICE_QUOTES } from '../../data/mock/service-quotes';
import {
  resolveDeliveryService,
  type AddressRole,
  type DeliveryService,
  type InsuranceTier,
} from '../../data/models/order';
import { orderRepository } from '../../data/repositories';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { AnnouncementBar } from './AnnouncementBar';
import { CheckoutBar } from './CheckoutBar';
import { ItemInfoCard } from './ItemInfoCard';
import { OrderConfigCard } from './OrderConfigCard';
import { OrderMap } from './OrderMap';
import { ServiceOptionCard } from './ServiceOptionCard';
import { ThumbnailMap } from './ThumbnailMap';

/** 地图区大部分滑出视口后切换为吸顶态(导航公告 + 缩略地图) */
const STICKY_SCROLL_Y = 160;

/**
 * 下单确认页(frame 856:1453)。
 * 服务档位预选来自首页业务配置:急送 → 1对1急送;载具汽车 → 汽车配送;否则普通帮送。
 * 保价/备注与物品信息页同步;前序已保价则保价组件为缩小态。
 */
export function OrderConfirmPage() {
  const navigate = useNavigate();
  const business = useOrderDraftStore((state) => state.business);
  const serviceMode = useOrderDraftStore((state) => state.serviceMode);
  const setServiceMode = useOrderDraftStore((state) => state.setServiceMode);
  const vehicle = useOrderDraftStore((state) => state.vehicle);
  const setVehicle = useOrderDraftStore((state) => state.setVehicle);
  const pickup = useOrderDraftStore((state) => state.pickup);
  const delivery = useOrderDraftStore((state) => state.delivery);
  const item = useOrderDraftStore((state) => state.item);
  const setItem = useOrderDraftStore((state) => state.setItem);
  const setReceipt = useOrderDraftStore((state) => state.setReceipt);
  const swapAddresses = useOrderDraftStore((state) => state.swapAddresses);

  const [insuranceCollapsed, setInsuranceCollapsed] = useState(
    () => (item?.insurance ?? 'none') !== 'none',
  );
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > STICKY_SCROLL_Y);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ready = pickup !== null && delivery !== null && item !== null;
  useEffect(() => {
    if (!ready) navigate('/', { replace: true });
  }, [ready, navigate]);

  if (pickup === null || delivery === null || item === null) return null;

  const selected = resolveDeliveryService(serviceMode, vehicle);
  const quote = SERVICE_QUOTES[selected];

  /** 选档回写业务配置,保持与首页同一份草稿 */
  const handleSelectService = (key: DeliveryService) => {
    if (key === 'express') {
      setServiceMode('express');
      setVehicle('ebike');
    } else {
      if (serviceMode === 'express') setServiceMode('send');
      setVehicle(key === 'car' ? 'car' : 'ebike');
    }
  };

  const handleInsuranceChange = (tier: InsuranceTier) =>
    setItem({ ...item, insurance: tier });

  const handleNoteChange = (note: string) =>
    setItem({ ...item, note: note === '' ? undefined : note });

  /** 从下单页进地址页只为改地址,保存后原路返回(经 router state 标记) */
  const handleEditAddress = (role: AddressRole) =>
    navigate(`/address/${role}`, { state: { returnTo: '/order-confirm' } });

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    const receipt = await orderRepository.submitOrder({
      business,
      serviceMode,
      pickup,
      delivery,
      item,
      vehicle: selected === 'car' ? 'car' : 'ebike',
      feeYuan: quote.feeYuan,
    });
    setReceipt(receipt);
    navigate('/tracking');
  };

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-gradient-to-b from-container-bg to-page-bg">
      {/* 上滑吸顶态(864:7899):导航公告 + 缩略地图 */}
      <div
        className={`fixed inset-x-0 top-0 z-20 mx-auto max-w-md bg-page-bg px-2 pt-[env(safe-area-inset-top)] pb-2 shadow-[0_4px_16px_rgba(28,30,33,0.06)] transition-transform duration-200 ${
          scrolled ? 'translate-y-0' : 'pointer-events-none -translate-y-full'
        }`}
      >
        <div className="relative flex h-11 items-center justify-center">
          <button
            type="button"
            aria-label="返回"
            onClick={() => navigate(-1)}
            className="absolute left-0 flex size-11 items-center justify-center"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-container-bg">
              <img src={iconBack} alt="" className="size-5" />
            </span>
          </button>
          <AnnouncementBar />
        </div>
        <ThumbnailMap
          pickup={pickup}
          delivery={delivery}
          onEdit={handleEditAddress}
          onSwap={swapAddresses}
        />
      </div>
      <OrderMap
        pickup={pickup}
        delivery={delivery}
        onBack={() => navigate(-1)}
        onEditAddress={handleEditAddress}
      />
      <main className="relative z-10 -mt-15 flex flex-col gap-2 px-2 pb-40">
        <ServiceOptionCard value={selected} onChange={handleSelectService} />
        <ItemInfoCard
          item={item}
          insuranceCollapsed={insuranceCollapsed}
          onExpandInsurance={() => setInsuranceCollapsed(false)}
          onInsuranceChange={handleInsuranceChange}
          onNoteChange={handleNoteChange}
          onEditItem={() => navigate('/item-info')}
        />
        <OrderConfigCard />
      </main>
      <CheckoutBar quote={quote} submitting={submitting} onSubmit={handleSubmit} />
    </div>
  );
}
