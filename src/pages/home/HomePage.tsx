import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { AppFixedLayer } from '../../components/AppShell';
import {
  Toast,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '../../components/Toast';
import {
  resolveCapacityInfoState,
  type AddressRole,
} from '../../data/models/order';
import { useTransientNotice } from '../../hooks/useTransientNotice';
import { preloadRouteExperience } from '../../lib/asset-preloader';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { AdditionalServices } from './AdditionalServices';
import { BottomTabBar } from './BottomTabBar';
import { BusinessTabs } from './BusinessTabs';
import { HeroPromo } from './HeroPromo';
import { HomeBrandMark } from './HomeBrandMark';
import { HomeNavBar } from './HomeNavBar';
import { ServiceCard } from './ServiceCard';

/**
 * 首页(frame 913:7841)。顶部运营区使用左右锚定的独立视觉图层，
 * 服务宫格、品牌标识与 TabBar 保持现有交互组件。
 */
export function HomePage() {
  const navigate = useNavigate();
  const [notice, showNotice] = useTransientNotice();
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
  const showUnavailableNotice = () =>
    showNotice(UNAVAILABLE_FEATURE_MESSAGE);

  useEffect(() => {
    void preloadRouteExperience('address');
  }, []);

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
    <div className="bg-page-bg pb-28">
      <section
        className={`relative overflow-hidden rounded-b-[20px] transition-colors duration-300 motion-reduce:transition-none ${
          serviceMode === 'express' ? 'bg-[#fde1cd]' : 'bg-[#fef775]'
        }`}
      >
        <div className="relative flex flex-col pt-[var(--app-safe-area-top)]">
          <div className="relative z-10">
            <HomeNavBar />
          </div>
          <div className="relative z-10 mt-2">
            <BusinessTabs onUnavailableSelect={showUnavailableNotice} />
          </div>
          <HeroPromo mode={serviceMode} />
          <div className="relative z-10 px-2">
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
          </div>
          <div className="h-2" />
        </div>
      </section>
      <main className="mt-2 px-2">
        <AdditionalServices onUnavailableSelect={showUnavailableNotice} />
        <HomeBrandMark />
      </main>
      <AppFixedLayer className="bottom-0 z-10">
        <BottomTabBar onUnavailableSelect={showUnavailableNotice} />
      </AppFixedLayer>
      {notice !== null && (
        <Toast
          key={notice.id}
          message={notice.message}
          className="bottom-[calc(88px+env(safe-area-inset-bottom))]"
        />
      )}
    </div>
  );
}
