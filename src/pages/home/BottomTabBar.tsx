import { useEffect, useState } from 'react';

import tabActiveBg from '../../assets/home/tab-active-bg.svg';
import exitFullscreenIcon from '../../assets/home/icon-exit-fullscreen.svg';
import fullscreenIcon from '../../assets/home/icon-fullscreen.svg';
import tabMy from '../../assets/home/tab-my.svg';
import tabOrder from '../../assets/home/tab-order.svg';
import {
  isEmbeddedPreview,
  isIosStandaloneApp,
  MOBILE_BROWSER_QUERY,
  STANDALONE_APP_QUERY,
} from '../../app/runtime-mode';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import './BottomTabBar.css';

interface BottomTabBarProps {
  onUnavailableSelect: () => void;
}

const FULLSCREEN_HINT_STORAGE_KEY = 'mtpaotui.fullscreen-hint-seen';

interface WebkitFullscreenDocument extends Document {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
}

interface WebkitFullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void> | void;
}

function useMobileBrowserMode() {
  const isMobileViewport = useMediaQuery(MOBILE_BROWSER_QUERY);
  const isStandaloneDisplay = useMediaQuery(STANDALONE_APP_QUERY);

  return (
    isMobileViewport &&
    !isEmbeddedPreview() &&
    !isStandaloneDisplay &&
    !isIosStandaloneApp()
  );
}

function getFullscreenElement() {
  const fullscreenDocument = document as WebkitFullscreenDocument;
  return (
    document.fullscreenElement ?? fullscreenDocument.webkitFullscreenElement
  );
}

function useFullscreenState() {
  const [isFullscreen, setIsFullscreen] = useState(() =>
    Boolean(getFullscreenElement()),
  );

  useEffect(() => {
    const syncFullscreenState = () =>
      setIsFullscreen(Boolean(getFullscreenElement()));
    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState);

    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState);
    };
  }, []);

  return isFullscreen;
}

interface FullscreenTabProps {
  isFullscreen: boolean;
}

function FullscreenTab({ isFullscreen }: FullscreenTabProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(FULLSCREEN_HINT_STORAGE_KEY) === 'true') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const showTimer = window.setTimeout(() => {
      sessionStorage.setItem(FULLSCREEN_HINT_STORAGE_KEY, 'true');
      setShowHint(true);
    }, 1_000);
    const hideTimer = window.setTimeout(() => setShowHint(false), 3_500);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const toggleFullscreen = async () => {
    sessionStorage.setItem(FULLSCREEN_HINT_STORAGE_KEY, 'true');
    setShowHint(false);

    const fullscreenDocument = document as WebkitFullscreenDocument;
    const fullscreenRoot = document.documentElement as WebkitFullscreenElement;

    if (getFullscreenElement()) {
      await Promise.resolve(
        document.exitFullscreen?.() ?? fullscreenDocument.webkitExitFullscreen?.(),
      );
      return;
    }

    await Promise.resolve(
      fullscreenRoot.requestFullscreen?.() ?? fullscreenRoot.webkitRequestFullscreen?.(),
    );
  };

  const label = isFullscreen ? '还原' : '全屏';

  return (
    <button
      aria-label={label}
      className="home-fullscreen-tab relative flex h-12 flex-col items-center pt-2.5"
      data-hint={showHint ? 'true' : undefined}
      onClick={() => {
        void toggleFullscreen().catch(() => {});
      }}
      title={label}
      type="button"
    >
      {showHint ? (
        <>
          <span aria-hidden="true" className="home-fullscreen-ring" />
          <span
            aria-hidden="true"
            className="home-fullscreen-ring home-fullscreen-ring-delayed"
          />
          <span className="home-fullscreen-hint">
            <strong>全屏体验更佳</strong>
            <small>点击进入沉浸模式</small>
          </span>
        </>
      ) : null}
      <span className="home-fullscreen-icon-wrap">
        <img
          alt=""
          className="size-6 shrink-0"
          src={isFullscreen ? exitFullscreenIcon : fullscreenIcon}
        />
      </span>
      <span className="text-caption-xs text-text-primary">{label}</span>
    </button>
  );
}

/** 首页底部导航(1677:10022):跑腿固定选中,其余页签提示暂未开放。 */
export function BottomTabBar({ onUnavailableSelect }: BottomTabBarProps) {
  const isMobileBrowser = useMobileBrowserMode();
  const isFullscreen = useFullscreenState();

  return (
    <nav
      aria-label="主导航"
      className={`grid h-[calc(48px+max(32px,env(safe-area-inset-bottom)))] w-full bg-container-bg ${
        isMobileBrowser ? 'grid-cols-4' : 'grid-cols-3'
      }`}
    >
      <button
        type="button"
        aria-current="page"
        className="relative h-12"
      >
        <span className="absolute top-2 left-1/2 size-10 -translate-x-1/2">
          <img src={tabActiveBg} alt="" className="size-full" />
        </span>
        <span className="absolute top-[18px] left-1/2 -translate-x-1/2 font-brand text-body leading-normal font-normal whitespace-nowrap text-text-primary">
          跑腿
        </span>
      </button>

      <button
        type="button"
        onClick={onUnavailableSelect}
        className="flex h-12 flex-col items-center pt-2.5"
      >
        <img src={tabOrder} alt="" className="size-6 shrink-0" />
        <span className="text-caption-xs text-text-primary">订单</span>
      </button>

      <button
        type="button"
        onClick={onUnavailableSelect}
        className="flex h-12 flex-col items-center pt-2.5"
      >
        <img src={tabMy} alt="" className="size-6 shrink-0" />
        <span className="text-caption-xs text-text-primary">我的</span>
      </button>
      {isMobileBrowser ? <FullscreenTab isFullscreen={isFullscreen} /> : null}
    </nav>
  );
}
