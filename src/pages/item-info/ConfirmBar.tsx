import { AppFixedLayer } from '../../components/AppShell';

interface ConfirmBarProps {
  disabled: boolean;
  onConfirm: () => void;
  recommendation?: React.ReactNode;
}

/** 底部确认栏(880:6260，两种变体 = disabled 一个布尔)。 */
export function ConfirmBar({
  disabled,
  onConfirm,
  recommendation,
}: ConfirmBarProps) {
  return (
    <AppFixedLayer className="bottom-0 z-10">
      {recommendation}
      <div className="h-[calc(56px+max(32px,env(safe-area-inset-bottom)))] border-t-[0.6px] border-border-divider bg-container-bg px-3 pt-[11.4px]">
        <button
          type="button"
          disabled={disabled}
          onClick={onConfirm}
          className={`h-11 w-full rounded-full text-title font-semibold ${
            disabled
              ? 'bg-text-quaternary text-container-bg'
              : 'bg-brand-primary text-text-primary'
          }`}
        >
          确定
        </button>
      </div>
    </AppFixedLayer>
  );
}
