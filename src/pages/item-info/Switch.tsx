interface SwitchProps {
  checked: boolean;
  ariaLabel: string;
  onChange: (checked: boolean) => void;
  onSlideEnd?: (checked: boolean) => void;
}

/** 开关(详细尺寸 toggle,frame 877:5614 两变体 = checked 一个布尔)。 */
export function Switch({
  checked,
  ariaLabel,
  onChange,
  onSlideEnd,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`h-6 w-10 rounded-full p-0.5 transition-colors duration-[220ms] ease-out motion-reduce:transition-none ${
        checked ? 'bg-brand-primary' : 'bg-text-quaternary'
      }`}
    >
      <span
        onTransitionEnd={() => onSlideEnd?.(checked)}
        className={`block size-5 rounded-full bg-container-bg shadow transition-transform duration-[220ms] ease-out motion-reduce:transition-none ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
