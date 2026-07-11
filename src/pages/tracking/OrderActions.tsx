interface OrderActionsProps {
  onMore: () => void;
  onEdit: () => void;
  onClaim: () => void;
  onShare: () => void;
}

/** 订单操作(frame 1541:27878)，三枚次级动作保持固定尺寸。 */
export function OrderActions({
  onMore,
  onEdit,
  onClaim,
  onShare,
}: OrderActionsProps) {
  return (
    <div className="flex h-7 w-full items-center justify-between">
      <button
        type="button"
        onClick={onMore}
        className="h-7 px-4 text-caption text-text-tertiary max-[350px]:w-8 max-[350px]:px-0"
      >
        更多
      </button>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="h-7 w-20 rounded-full border border-divider bg-bg-container text-body font-medium text-text-primary max-[350px]:w-[72px]"
        >
          修改订单
        </button>
        <button
          type="button"
          onClick={onClaim}
          className="h-7 w-20 rounded-full border border-divider bg-bg-container text-body font-medium text-text-primary max-[350px]:w-[72px]"
        >
          申请理赔
        </button>
        <button
          type="button"
          onClick={onShare}
          className="h-7 w-20 rounded-full border border-accent-primary bg-bg-container text-body font-medium text-accent-primary max-[350px]:w-[72px]"
        >
          分享订单
        </button>
      </div>
    </div>
  );
}
