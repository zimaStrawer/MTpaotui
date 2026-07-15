import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import heroBg from '../../assets/home/hero-bg.png';
import marketingCard from '../../assets/home/marketing-card.png';
import servicesRow from '../../assets/home/services-row.png';
import tabBar from '../../assets/home/tab-bar.png';
import {
  Toast,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '../../components/Toast';
import {
  resolveCapacityInfoState,
  type AddressRole,
} from '../../data/models/order';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { BusinessTabs } from './BusinessTabs';
import { HomeNavBar } from './HomeNavBar';
import { ServiceCard } from './ServiceCard';

/**
 * 首页(frame 913:7841)。品牌视觉区 / 服务宫格 / 营销卡 / TabBar
 * 为设计稿整图(纯展示);交互集中在服务选择卡。
 */
export function HomePage() {
  const navigate = useNavigate();
  const [unavailableNoticeId, setUnavailableNoticeId] = useState<number | null>(
    null,
  );
  const serviceMode = useOrderDraftStore((state) => state.serviceMode);
  const setServiceMode = useOrderDraftStore((state) => state.setServiceMode);
  const vehicle = useOrderDraftStore((state) => state.vehicle);
  const setVehicle = useOrderDraftStore((state) => state.setVehicle);
  const pickup = useOrderDraftStore((state) => state.pickup);
  const delivery = useOrderDraftStore((state) => state.delivery);
  const capacityInfoState = resolveCapacityInfoState({
    serviceMode,
    vehicle,
    pickup,
  });

  useEffect(() => {
    if (unavailableNoticeId === null) return;
    const timer = window.setTimeout(() => setUnavailableNoticeId(null), 3_000);
    return () => window.clearTimeout(timer);
  }, [unavailableNoticeId]);

  const handleEditAddress = (role: AddressRole) => navigate(`/address/${role}`);

  /** 去下单:按流程顺序补齐未填地址(取→收),都齐则进物品信息 */
  const handleSubmit = () => {
    if (pickup === null) {
      navigate('/address/pickup');
    } else if (delivery === null) {
      navigate('/address/delivery');
    } else {
      navigate('/item-info');
    }
  };

  return (
    <div className="relative mx-auto min-h-dvh max-w-md pb-28">
      <img
        src={heroBg}
        alt=""
        className="absolute top-0 left-0 w-full"
      />
      <div className="relative flex flex-col pt-[env(safe-area-inset-top)]">
        <HomeNavBar />
        <div className="mt-2">
          <BusinessTabs
            onUnavailableSelect={() =>
              setUnavailableNoticeId((noticeId) => (noticeId ?? 0) + 1)
            }
          />
        </div>
        {/* 品牌口号与吉祥物区域(在 hero 整图内),布局级留白 */}
        <div className="h-[104px]" />
        <main className="flex flex-col gap-4 px-2">
          <ServiceCard
            mode={serviceMode}
            pickup={pickup}
            delivery={delivery}
            vehicle={vehicle}
            capacityInfoState={capacityInfoState}
            onModeChange={setServiceMode}
            onVehicleChange={setVehicle}
            onEditAddress={handleEditAddress}
            onSubmit={handleSubmit}
          />
          <div className="flex flex-col gap-2">
            <img
              src={servicesRow}
              alt="点餐帮取 / 帮取快递 / 取送数码 / 取送文件 / 更多服务"
              className="w-full rounded-16"
            />
            <img
              src={marketingCard}
              alt="企业跑腿优惠 / 充值赠券"
              className="w-full rounded-16"
            />
          </div>
        </main>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md bg-bg-container pb-[env(safe-area-inset-bottom)]">
        <img src={tabBar} alt="跑腿 / 订单 / 我的" className="w-full" />
      </div>
      {unavailableNoticeId !== null && (
        <Toast
          key={unavailableNoticeId}
          message={UNAVAILABLE_FEATURE_MESSAGE}
          className="bottom-[calc(88px+env(safe-area-inset-bottom))]"
        />
      )}
    </div>
  );
}
