import { Link, useParams } from 'react-router';

import type { AddressRole } from '../../data/models/order';

function isAddressRole(value: string | undefined): value is AddressRole {
  return value === 'pickup' || value === 'delivery';
}

/** 地址页(取件 frame 878:5645 / 收件 frame 885:6377)· 同一路由两种角色,M3 实现。 */
export function AddressPage() {
  const { role } = useParams();
  if (!isAddressRole(role)) throw new Error(`非法地址角色:${String(role)}`);

  const isPickup = role === 'pickup';
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium">
        {isPickup ? '取件地址' : '收件地址'}
      </h1>
      <Link
        className="text-sm text-blue-600 underline"
        to={isPickup ? '/address/delivery' : '/item-info'}
      >
        {isPickup ? '去填收件地址 →' : '去填物品信息 →'}
      </Link>
    </main>
  );
}
