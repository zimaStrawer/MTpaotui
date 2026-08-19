import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { NavigationPage } from '../../components/NavigationBar';
import {
  classifyVolumeDelivery,
  DEFAULT_DELIVERY_BOX_VOLUME,
  DEFAULT_ITEM_WEIGHT_KG,
  resolveItemDeliveryPreference,
  type InsuranceTier,
  type ItemCategory,
  type Volume,
} from '../../data/models/order';
import {
  preloadAssetGroup,
  preloadRouteExperience,
} from '../../lib/asset-preloader';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { BrandCard } from './BrandCard';
import { CarDeliveryRecommendation } from './CarDeliveryRecommendation';
import { CategorySelectCard } from './CategorySelectCard';
import { ConfirmBar } from './ConfirmBar';
import { TypeSummaryCard } from './TypeSummaryCard';
import { VolumeCard } from './VolumeCard';
import { WeightCard } from './WeightCard';

/** 页内分段见 product.md §7：选类型 → 详情表单，同一路由一个状态字段。 */
type Segment = 'category' | 'detail';

/**
 * 物品信息页(frame 1380:20261 类型 / 1380:20291 重量 / 1476:31660 体积展开)。
 * 表单状态集中在页面层,子卡片纯受控;确定时一次性写入下单草稿(事件从一处流出)。
 */
export function ItemInfoPage() {
  const navigate = useNavigate();
  const draftItem = useOrderDraftStore((state) => state.item);
  const setItem = useOrderDraftStore((state) => state.setItem);
  const serviceMode = useOrderDraftStore((state) => state.serviceMode);
  const setServiceMode = useOrderDraftStore((state) => state.setServiceMode);
  const vehicle = useOrderDraftStore((state) => state.vehicle);
  const setVehicle = useOrderDraftStore((state) => state.setVehicle);

  const [segment, setSegment] = useState<Segment>(
    draftItem ? 'detail' : 'category',
  );
  const [category, setCategory] = useState<ItemCategory | null>(
    draftItem?.category ?? null,
  );
  const [note, setNote] = useState(draftItem?.note ?? '');
  const [insurance, setInsurance] = useState<InsuranceTier>(
    draftItem?.insurance ?? 'none',
  );
  const [weightKg, setWeightKg] = useState(
    draftItem?.weightKg ?? DEFAULT_ITEM_WEIGHT_KG,
  );
  const [volume, setVolume] = useState<Volume>(
    draftItem?.volume ?? DEFAULT_DELIVERY_BOX_VOLUME,
  );
  const initialCarRecommendation =
    draftItem !== null &&
    classifyVolumeDelivery(draftItem.volume) === 'car-recommended';
  const [carRecommendationSelected, setCarRecommendationSelected] = useState(
    initialCarRecommendation && vehicle === 'car',
  );
  const [carRecommendationDismissed, setCarRecommendationDismissed] =
    useState(initialCarRecommendation && vehicle !== 'car');
  const [volumeExpanded, setVolumeExpanded] = useState(false);
  const volumeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void preloadAssetGroup('itemDetail');
    void preloadRouteExperience('orderConfirm');
  }, []);

  useEffect(() => {
    if (!volumeExpanded) return;

    const frame = requestAnimationFrame(() => {
      const volumeCard = volumeCardRef.current;
      if (volumeCard === null) return;

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const navigationHeight =
        document
          .querySelector<HTMLElement>('[data-app-navigation-bar]')
          ?.getBoundingClientRect().height ?? 0;
      const volumeCardTop =
        window.scrollY + volumeCard.getBoundingClientRect().top;

      window.scrollTo({
        top: Math.max(0, volumeCardTop - navigationHeight),
        left: 0,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [volumeExpanded]);

  const handleSelectCategory = (selected: ItemCategory) => {
    setCategory(selected);
    setSegment('detail');
  };

  const handleVolumeChange = (nextVolume: Volume) => {
    const wasRecommended =
      classifyVolumeDelivery(volume) === 'car-recommended';
    const isRecommended =
      classifyVolumeDelivery(nextVolume) === 'car-recommended';

    setVolume(nextVolume);
    if (!isRecommended) {
      setCarRecommendationSelected(false);
    } else if (!wasRecommended && !carRecommendationDismissed) {
      setCarRecommendationSelected(true);
    }
  };

  const handleCarRecommendationChange = (selected: boolean) => {
    setCarRecommendationSelected(selected);
    setCarRecommendationDismissed(!selected);
  };

  const handleConfirm = () => {
    if (!category) return;
    const trimmedNote = note.trim();
    const deliveryPreference = resolveItemDeliveryPreference({
      serviceMode,
      vehicle,
      volume,
      carRecommendationSelected,
    });
    setItem({
      category,
      weightKg,
      volume,
      insurance,
      note: trimmedNote === '' ? undefined : trimmedNote,
    });
    if (deliveryPreference.serviceMode !== serviceMode) {
      setServiceMode(deliveryPreference.serviceMode);
    }
    if (deliveryPreference.vehicle !== vehicle) {
      setVehicle(deliveryPreference.vehicle);
    }
    navigate('/order-confirm');
  };

  const showCarRecommendation =
    classifyVolumeDelivery(volume) === 'car-recommended';

  return (
    <NavigationPage title="物品信息" onClose={() => navigate('/')}>
      <main
        className={`flex flex-col gap-2 px-2 pt-3 ${
          showCarRecommendation ? 'pb-40' : 'pb-28'
        }`}
      >
        {segment === 'category' || category === null ? (
          <>
            <CategorySelectCard onSelect={handleSelectCategory} />
            <BrandCard />
          </>
        ) : (
          <>
            <TypeSummaryCard
              category={category}
              note={note}
              insurance={insurance}
              onReopenCategory={() => setSegment('category')}
              onNoteChange={setNote}
              onInsuranceChange={setInsurance}
            />
            <WeightCard weightKg={weightKg} onChange={setWeightKg} />
            <div ref={volumeCardRef}>
              <VolumeCard
                volume={volume}
                expanded={volumeExpanded}
                onToggleExpanded={setVolumeExpanded}
                onChange={handleVolumeChange}
              />
            </div>
          </>
        )}
      </main>
      <ConfirmBar
        disabled={segment === 'category' || category === null}
        onConfirm={handleConfirm}
        recommendation={
          showCarRecommendation ? (
            <CarDeliveryRecommendation
              selected={carRecommendationSelected}
              onChange={handleCarRecommendationChange}
            />
          ) : undefined
        }
      />
    </NavigationPage>
  );
}
