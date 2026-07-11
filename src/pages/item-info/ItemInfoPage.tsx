import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { NavigationBar } from '../../components/NavigationBar';
import type {
  InsuranceTier,
  ItemCategory,
  Volume,
} from '../../data/models/order';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { BrandCard } from './BrandCard';
import { CategorySelectCard } from './CategorySelectCard';
import { ConfirmBar } from './ConfirmBar';
import { DEFAULT_WEIGHT_KG, DELIVERY_BOX_CM } from './constants';
import { TypeSummaryCard } from './TypeSummaryCard';
import { VolumeCard } from './VolumeCard';
import { WeightCard } from './WeightCard';

/** 页内分段(§6):选类型 → 详情表单(重量/体积/保价),同一路由一个状态字段。 */
type Segment = 'category' | 'detail';

/**
 * 物品信息页(frame 1380:20261 类型 / 1380:20291 重量 / 1476:31660 体积展开)。
 * 表单状态集中在页面层,子卡片纯受控;确定时一次性写入下单草稿(事件从一处流出)。
 */
export function ItemInfoPage() {
  const navigate = useNavigate();
  const draftItem = useOrderDraftStore((state) => state.item);
  const setItem = useOrderDraftStore((state) => state.setItem);

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
    draftItem?.weightKg ?? DEFAULT_WEIGHT_KG,
  );
  const [volume, setVolume] = useState<Volume>(
    draftItem?.volume ?? DELIVERY_BOX_CM,
  );
  const [volumeExpanded, setVolumeExpanded] = useState(false);
  const volumeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!volumeExpanded) return;

    const frame = requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      volumeCardRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [volumeExpanded]);

  const handleSelectCategory = (selected: ItemCategory) => {
    setCategory(selected);
    setSegment('detail');
  };

  const handleConfirm = () => {
    if (!category) return;
    setItem({
      category,
      weightKg,
      volume,
      insurance,
      note: note.trim() === '' ? undefined : note.trim(),
    });
    navigate('/order-confirm');
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col pt-[env(safe-area-inset-top)]">
      <NavigationBar title="物品信息" onClose={() => navigate('/')} />
      <main className="flex flex-col gap-2 px-2 pt-3 pb-28">
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
                onChange={setVolume}
              />
            </div>
          </>
        )}
      </main>
      <ConfirmBar
        disabled={segment === 'category' || category === null}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
