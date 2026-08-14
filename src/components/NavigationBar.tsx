import type { ReactNode } from 'react';

import iconBack from '../assets/nav/icon-back.svg';
import iconClose from '../assets/nav/icon-close.svg';
import { AppFixedLayer } from './AppShell';

interface NavigationBarProps {
  title: string;
  /** 标题左侧角标(如取/收标签) */
  badge?: ReactNode;
  /** 传入即显示左侧 ✕ 关闭按钮 */
  onClose?: () => void;
  /** 传入即显示左侧 ‹ 返回按钮(与 onClose 二选一) */
  onBack?: () => void;
}

interface NavigationPageProps extends NavigationBarProps {
  children: ReactNode;
  className?: string;
}

/** 固定顶部导航栏：组件自身承接状态栏安全区，页面内容需预留相同高度。 */
export function NavigationBar({
  title,
  badge,
  onClose,
  onBack,
}: NavigationBarProps) {
  const leftAction = onBack ?? onClose;
  return (
    <AppFixedLayer className="top-0 z-30">
      <header className="h-[calc(44px+var(--app-safe-area-top))] bg-page-bg pt-[var(--app-safe-area-top)]">
        <div className="relative flex h-11 items-center justify-center gap-1">
          {leftAction && (
            <button
              type="button"
              aria-label={onBack ? '返回' : '关闭'}
              onClick={leftAction}
              className="absolute left-1 flex size-11 items-center justify-center"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-container-bg">
                <img
                  src={onBack ? iconBack : iconClose}
                  alt=""
                  className="size-5"
                />
              </span>
            </button>
          )}
          {badge}
          <h1 className="text-title font-semibold text-text-primary">
            {title}
          </h1>
        </div>
      </header>
    </AppFixedLayer>
  );
}

/** 带固定导航栏的页面骨架，统一维护导航高度与安全区占位。 */
export function NavigationPage({
  children,
  className = '',
  ...navigationProps
}: NavigationPageProps) {
  return (
    <div
      className={`flex flex-col pt-[calc(44px+var(--app-safe-area-top))] ${className}`}
    >
      <NavigationBar {...navigationProps} />
      {children}
    </div>
  );
}
