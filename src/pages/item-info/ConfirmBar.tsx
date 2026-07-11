interface ConfirmBarProps {
  disabled: boolean;
  onConfirm: () => void;
}

/** 底部确认栏(frame 880:6258/6259 两种变体 = disabled 一个布尔)。 */
export function ConfirmBar({ disabled, onConfirm }: ConfirmBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-divider bg-bg-container px-3 pt-3 pb-[calc(env(safe-area-inset-bottom)+--spacing(3))]">
      <button
        type="button"
        disabled={disabled}
        onClick={onConfirm}
        className={`h-11 w-full rounded-full text-title font-semibold ${
          disabled
            ? 'bg-text-quaternary text-bg-container'
            : 'bg-brand-primary text-text-primary'
        }`}
      >
        确定
      </button>
    </div>
  );
}
