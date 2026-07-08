import iconClose from '../assets/nav/icon-close.svg';

interface NavigationBarProps {
  title: string;
  /** 传入即显示左侧 ✕ 关闭按钮 */
  onClose?: () => void;
}

/** 顶部导航栏(应用内 UI,全屏网页无系统返回)。各路由显示状态经 props 控制。 */
export function NavigationBar({ title, onClose }: NavigationBarProps) {
  return (
    <header className="relative flex h-11 shrink-0 items-center justify-center">
      {onClose && (
        <button
          type="button"
          aria-label="关闭"
          onClick={onClose}
          className="absolute left-0 flex size-11 items-center justify-center"
        >
          <img src={iconClose} alt="" className="size-8" />
        </button>
      )}
      <h1 className="text-title font-semibold text-text-primary">{title}</h1>
    </header>
  );
}
