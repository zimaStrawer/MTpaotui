import type { AddressRole } from '../data/models/order';

interface RoleBadgeProps {
  role: AddressRole;
  /** 1对1急送为「尊贵」金渐变变体(组件 942:8548-8551) */
  premium?: boolean;
}

/** 取/收 角标(取收标签):深底白字 / 黄底黑字;尊贵态用金渐变。 */
export function RoleBadge({ role, premium = false }: RoleBadgeProps) {
  const isPickup = role === 'pickup';

  if (premium) {
    /* 渐变为组件级装饰值(非全局 token) */
    return isPickup ? (
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-6 bg-text-primary">
        <span className="bg-gradient-to-br from-[#fef0dd] to-[#f2d0b5] bg-clip-text text-caption font-semibold text-transparent">
          取
        </span>
      </span>
    ) : (
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-6 bg-gradient-to-br from-[#ffe9cd] to-[#ffd2b3]">
        <span className="text-caption font-semibold text-text-primary">收</span>
      </span>
    );
  }

  return (
    <span
      className={`flex size-[22px] shrink-0 items-center justify-center rounded-6 text-caption font-semibold ${
        isPickup
          ? 'bg-text-primary text-bg-container'
          : 'bg-brand-primary text-text-primary'
      }`}
    >
      {isPickup ? '取' : '收'}
    </span>
  );
}
