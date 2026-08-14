interface OrderActionsProps {
  onMore: () => void;
  onEdit: () => void;
  onClaim: () => void;
  onShare: () => void;
}

interface ActionButtonProps {
  children: React.ReactNode;
  highlighted?: boolean;
  onClick: () => void;
}

function ActionButton({
  children,
  highlighted = false,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-7 w-20 rounded-full border bg-container-bg text-body font-medium max-[350px]:w-[72px] ${
        highlighted
          ? 'border-highlight-primary text-highlight-primary'
          : 'border-border-divider text-text-primary'
      }`}
    >
      {children}
    </button>
  );
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
        <ActionButton onClick={onEdit}>修改订单</ActionButton>
        <ActionButton onClick={onClaim}>申请理赔</ActionButton>
        <ActionButton highlighted onClick={onShare}>
          分享订单
        </ActionButton>
      </div>
    </div>
  );
}
