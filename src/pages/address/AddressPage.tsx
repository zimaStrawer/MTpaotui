import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { NavigationBar } from '../../components/NavigationBar';
import { RoleBadge } from '../../components/RoleBadge';
import {
  Toast,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '../../components/Toast';
import {
  SCENARIO_DELIVERY_ADDRESS,
  SCENARIO_PICKUP_ADDRESS,
  type AddressBookEntry,
} from '../../data/mock/fixtures';
import type { AddressRole } from '../../data/models/order';
import { useOrderDraftStore } from '../../store/order-draft-store';
import { AddressBookCard } from './AddressBookCard';
import { AddressFormCard, type AddressFormValue } from './AddressFormCard';
import { PasteRecognizeCard } from './PasteRecognizeCard';

function isAddressRole(value: string | undefined): value is AddressRole {
  return value === 'pickup' || value === 'delivery';
}

/**
 * 地址页(取件 878:5645 / 收件 885:6377):同一路由,role 两种角色,流程中走两次。
 * 定位选点 / 粘贴识别以场景地址 mock;地址簿条目点击回填。
 */
export function AddressPage() {
  const { role } = useParams();
  if (!isAddressRole(role)) throw new Error(`非法地址角色:${String(role)}`);

  const navigate = useNavigate();
  const location = useLocation();
  /** 来源页标记(下单页改地址时传入),保存后原路返回 */
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo;
  const stored = useOrderDraftStore((state) =>
    role === 'pickup' ? state.pickup : state.delivery,
  );
  const other = useOrderDraftStore((state) =>
    role === 'pickup' ? state.delivery : state.pickup,
  );
  const setAddress = useOrderDraftStore((state) => state.setAddress);
  const premium = useOrderDraftStore(
    (state) => state.serviceMode === 'express',
  );

  const [form, setForm] = useState<AddressFormValue>(() =>
    stored === null
      ? { poi: null, unit: '', contactName: '', phone: '' }
      : {
          poi: stored.poi,
          unit: stored.unit,
          contactName: stored.contactName,
          phone: stored.phone,
        },
  );
  const [unavailableNoticeId, setUnavailableNoticeId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (unavailableNoticeId === null) return;
    const timer = window.setTimeout(() => setUnavailableNoticeId(null), 3_000);
    return () => window.clearTimeout(timer);
  }, [unavailableNoticeId]);

  const scenario =
    role === 'pickup' ? SCENARIO_PICKUP_ADDRESS : SCENARIO_DELIVERY_ADDRESS;

  const handlePatch = (patch: Partial<AddressFormValue>) =>
    setForm((current) => ({ ...current, ...patch }));

  /** 地址行点击 = 以对应场景默认地址填满表单,便于串联测试后续流程。 */
  const handlePickPoi = () =>
    setForm({
      poi: scenario.poi,
      unit: scenario.unit,
      contactName: scenario.contactName,
      phone: scenario.phone,
    });

  const handlePickBookEntry = (entry: AddressBookEntry) =>
    setForm({
      poi: entry.poi,
      unit: entry.unit,
      contactName: entry.contactName,
      phone: entry.phone,
    });

  /**
   * 保存后:带来源标记(下单页改地址)则原路返回;
   * 否则另一地址已填(本次补齐最后一个)直进物品信息,不然回首页。
   */
  const handleSave = () => {
    if (form.poi === null) return;
    setAddress({
      role,
      poi: form.poi,
      unit: form.unit,
      contactName: form.contactName,
      phone: form.phone,
    });
    navigate(returnTo ?? (other !== null ? '/item-info' : '/'));
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col pt-[env(safe-area-inset-top)]">
      <NavigationBar
        title={role === 'pickup' ? '取件信息' : '收件信息'}
        badge={<RoleBadge role={role} premium={premium} />}
        onBack={() => navigate(-1)}
      />
      <main className="flex flex-col gap-2 px-2 pt-3 pb-8">
        <PasteRecognizeCard
          onUnavailable={() =>
            setUnavailableNoticeId((noticeId) => (noticeId ?? 0) + 1)
          }
        />
        <AddressFormCard
          role={role}
          premium={premium}
          value={form}
          onPickPoi={handlePickPoi}
          onChange={handlePatch}
          onSave={handleSave}
        />
        <AddressBookCard selectedPoi={form.poi} onPick={handlePickBookEntry} />
      </main>
      {unavailableNoticeId !== null && (
        <Toast
          key={unavailableNoticeId}
          message={UNAVAILABLE_FEATURE_MESSAGE}
          className="bottom-[calc(24px+env(safe-area-inset-bottom))]"
        />
      )}
    </div>
  );
}
