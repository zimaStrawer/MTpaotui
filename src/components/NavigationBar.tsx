import type { ReactNode } from 'react';

import iconBack from '../assets/home/icon-back.svg';
import iconClose from '../assets/nav/icon-close.svg';

interface NavigationBarProps {
  title: string;
  /** 标题左侧角标(如取/收标签) */
  badge?: ReactNode;
  /** 传入即显示左侧 ✕ 关闭按钮 */
  onClose?: () => void;
  /** 传入即显示左侧 ‹ 返回按钮(与 onClose 二选一) */
  onBack?: () => void;
}

/** 顶部导航栏(应用内 UI,全屏网页无系统返回)。各路由显示状态经 props 控制。 */
export function NavigationBar({ title, badge, onClose, onBack }: NavigationBarProps) {
  const leftAction = onBack ?? onClose;
  return (
    <header className="relative flex h-11 shrink-0 items-center justify-center gap-1">
      {leftAction && (
        <button
          type="button"
          aria-label={onBack ? '返回' : '关闭'}
          onClick={leftAction}
          className="absolute left-0 flex size-11 items-center justify-center"
        >
          <img src={onBack ? iconBack : iconClose} alt="" className="size-8" />
        </button>
      )}
      {badge}
      <h1 className="text-title font-semibold text-text-primary">{title}</h1>
    </header>
  );
}
