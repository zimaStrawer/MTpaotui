interface ToastProps {
  message: string;
  className?: string;
}

export const UNAVAILABLE_FEATURE_MESSAGE = '该功能暂未开放，敬请期待';

/** 全局轻提示:颜色、字号、圆角统一使用系统 token,由页面传入垂直位置。 */
export function Toast({ message, className = '' }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast-enter fixed left-1/2 z-50 -translate-x-1/2 rounded-full bg-mask-bg px-4 py-2 text-caption whitespace-nowrap text-container-bg shadow-[0_4px_16px_rgba(28,30,33,0.18)] ${className}`}
    >
      {message}
    </div>
  );
}
