interface SwitchProps {
  checked: boolean;
  ariaLabel: string;
  onChange: (checked: boolean) => void;
}

/** 开关(详细尺寸 toggle,frame 877:5614 两变体 = checked 一个布尔)。 */
export function Switch({ checked, ariaLabel, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`h-6 w-10 rounded-full p-0.5 transition-colors ${
        checked ? 'bg-brand-primary' : 'bg-text-quaternary'
      }`}
    >
      <span
        className={`block size-5 rounded-full bg-bg-container shadow transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
