import courierAvatar from '../../assets/tracking/courier-avatar.webp';
import iconClose from '../../assets/nav/icon-close-12.svg';
import iconButtonRing from '../../assets/tracking/icon-button-ring.svg';
import iconMessage from '../../assets/tracking/icon-message.svg';
import iconPhone from '../../assets/tracking/icon-phone.svg';
import iconStar from '../../assets/tracking/icon-star.svg';
import type { ItemCategory } from '../../data/models/order';
import type { Courier } from '../../data/models/tracking';
import { CourierSpecialtyBadge } from './CourierSpecialtyBadge';

interface CourierCardProps {
  courier: Courier;
  itemCategory: ItemCategory;
  showTip?: boolean;
  onCall: () => void;
  onDismissTip?: () => void;
  onMessage: () => void;
  onTip?: () => void;
}

/** 骑手卡片两变体(node 1507:20966):基础态 / 完成后打赏态。 */
export function CourierCard({
  courier,
  itemCategory,
  showTip = false,
  onCall,
  onDismissTip,
  onMessage,
  onTip,
}: CourierCardProps) {
  return (
    <section className="overflow-hidden rounded-16 bg-container-bg">
      <div className="flex h-[74px] items-center px-4 max-[350px]:px-3">
        <div className="relative size-[46px] shrink-0 rounded-full bg-brand-bg">
          <div className="absolute top-[3px] left-[3px] size-10 overflow-hidden rounded-full">
            <img
              src={courierAvatar}
              alt={`${courier.name}头像`}
              width={560}
              height={1246}
              decoding="async"
              className="absolute max-w-none"
              style={{
                width: '699.15%',
                height: '1546.47%',
                left: '-83.31%',
                top: '-136.94%',
              }}
            />
          </div>
        </div>

        <div className="ml-2 flex min-w-0 flex-col max-[350px]:ml-1">
          <div className="flex items-center gap-2 whitespace-nowrap max-[350px]:gap-1">
            <span className="font-app text-title-brand font-semibold text-text-primary">
              {courier.name}
            </span>
            <CourierSpecialtyBadge itemCategory={itemCategory} />
          </div>
          <div className="flex items-center gap-1 px-1 py-0.5 text-caption text-text-primary">
            <span>
              满意度{' '}
              <span className="font-number">
                {courier.satisfaction.toFixed(2)}%
              </span>
            </span>
            <span className="text-text-quaternary">|</span>
            <span className="font-number">{courier.rating.toFixed(1)}</span>
            <img src={iconStar} alt="星级" className="size-4" />
          </div>
        </div>

        <div className="ml-auto flex">
          <button
            type="button"
            aria-label="联系骑手发消息"
            onClick={onMessage}
            className="flex size-12 items-center justify-center max-[350px]:size-11"
          >
            <img src={iconMessage} alt="" className="size-12 max-[350px]:size-11" />
          </button>
          <button
            type="button"
            aria-label="给骑手打电话"
            onClick={onCall}
            className="relative flex size-12 items-center justify-center max-[350px]:size-11"
          >
            <img src={iconButtonRing} alt="" className="absolute size-10" />
            <img src={iconPhone} alt="" className="relative size-6" />
          </button>
        </div>
      </div>

      {showTip && (
        <div className="flex h-[31px] items-center overflow-hidden bg-brand-bg pl-4 text-caption text-text-primary">
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {courier.name}提前20分钟为您送达，发个感谢红包吧！
          </span>
          <button
            type="button"
            onClick={onTip}
            className="flex h-[31px] w-14 shrink-0 items-center justify-center"
          >
            <span className="rounded-4 bg-brand-primary px-2 py-0.5 text-caption-xs font-medium">
              打赏
            </span>
          </button>
          <button
            type="button"
            aria-label="关闭打赏提示"
            onClick={onDismissTip}
            className="flex h-[31px] w-8 shrink-0 items-center justify-center"
          >
            <img src={iconClose} alt="" className="size-3" />
          </button>
        </div>
      )}
    </section>
  );
}
