import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import faviconUrl from '../../favicon.png';
import githubIconUrl from '../assets/showcase/github-icon.svg';
import { SITE_URL } from '../config/site';
import { QRCodeSVG } from 'qrcode.react';
import phoneFrameUrl from '../assets/showcase/iphone-16-pro-black-titanium.webp';
import statusBatteryUrl from '../assets/showcase/status-battery.svg';
import statusCellularUrl from '../assets/showcase/status-cellular.svg';
import statusWifiUrl from '../assets/showcase/status-wifi.svg';
import {
  DEFAULT_VIEWPORT_PRESET_ID,
  PHONE_PRESETS,
  resolvePhoneFrameMetrics,
  resolvePhoneScale,
  type ViewportPreset,
  type ViewportPresetId,
} from './device-presets';
import './showcase.css';

const GITHUB_REPOSITORY_URL = 'https://github.com/zimaStrawer/MTpaotui';

interface ElementSize {
  width: number;
  height: number;
}

function buildEmbeddedAppUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set('embed', '1');
  return `${url.pathname}${url.search}${url.hash}`;
}

function formatSystemTime(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  }).format(date);
}

function useSystemTime() {
  const [systemTime, setSystemTime] = useState(() => formatSystemTime(new Date()));

  useEffect(() => {
    const updateSystemTime = () => {
      setSystemTime(formatSystemTime(new Date()));
    };
    const timer = window.setInterval(updateSystemTime, 15_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return systemTime;
}

function SimulatedSystemChrome({ time }: { time: string }) {
  return (
    <>
      <div aria-hidden="true" className="showcase-system-status-bar">
        <time className="showcase-system-time">{time}</time>
        <span className="showcase-system-island-spacer" />
        <span className="showcase-system-levels">
          <img alt="" height="13" src={statusCellularUrl} width="20" />
          <img alt="" height="13" src={statusWifiUrl} width="18" />
          <img alt="" height="13" src={statusBatteryUrl} width="28" />
        </span>
      </div>
      <div aria-hidden="true" className="showcase-system-home-indicator" />
    </>
  );
}

function useElementSize(elementRef: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateSize = () => {
      const bounds = element.getBoundingClientRect();
      setSize({ width: bounds.width, height: bounds.height });
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(element);
    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return size;
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <rect x="5.25" y="1.75" width="9.5" height="16.5" rx="2" />
      <path d="M8.25 4h3.5M9 15.75h2" />
    </svg>
  );
}

interface DeviceSelectorProps {
  selectedPreset: ViewportPreset;
  onSelect: (presetId: ViewportPresetId) => void;
}

function DeviceSelector({ selectedPreset, onSelect }: DeviceSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const hasMeasuredRef = useRef(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  // 选中项变化：提交最终位置，并从当前视觉位置播放平滑滑动动画。
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const active = container.querySelector<HTMLElement>(
      '[aria-pressed="true"]',
    );
    if (!active) return;

    const next = { left: active.offsetLeft, width: active.offsetWidth };
    const indicator = indicatorRef.current;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // 首次测量或减少动态效果：直接落位，不播动画。
    if (!indicator || !hasMeasuredRef.current || reduceMotion) {
      animationRef.current?.cancel();
      hasMeasuredRef.current = true;
      setIndicatorStyle(next);
      return;
    }

    // 以 indicator 当前视觉位置为起点，快速连点时从中途平滑接续。
    const containerBox = container.getBoundingClientRect();
    const indicatorBox = indicator.getBoundingClientRect();
    const start = {
      left: indicatorBox.left - containerBox.left,
      width: indicatorBox.width,
    };

    if (
      Math.abs(start.left - next.left) < 0.5 &&
      Math.abs(start.width - next.width) < 0.5
    ) {
      setIndicatorStyle(next);
      return;
    }

    animationRef.current?.cancel();
    setIndicatorStyle(next);

    // 直接平滑滑动：宽度随按钮差值自然过渡，轻微过冲后落位，不做拉伸。
    const animation = indicator.animate(
      [
        { left: `${start.left}px`, width: `${start.width}px` },
        { left: `${next.left}px`, width: `${next.width}px` },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1.25, 0.36, 1)',
        fill: 'both',
      },
    );
    animation.finished.then(() => animation.cancel()).catch(() => {});
    animationRef.current = animation;
  }, [selectedPreset.id]);

  // 容器尺寸变化（响应式断点切换文案显隐）与字体加载完成后瞬时重测。
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const syncIndicator = () => {
      const active = container.querySelector<HTMLElement>(
        '[aria-pressed="true"]',
      );
      if (!active) return;
      animationRef.current?.cancel();
      setIndicatorStyle({ left: active.offsetLeft, width: active.offsetWidth });
    };

    const resizeObserver = new ResizeObserver(syncIndicator);
    resizeObserver.observe(container);
    document.fonts?.ready.then(syncIndicator).catch(() => {});

    return () => {
      resizeObserver.disconnect();
      animationRef.current?.cancel();
    };
  }, []);

  return (
    <div
      aria-label="选择预览尺寸"
      className="showcase-device-selector"
      ref={containerRef}
      role="group"
    >
      {indicatorStyle ? (
        <span
          aria-hidden="true"
          className="showcase-device-indicator"
          ref={indicatorRef}
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />
      ) : null}
      {PHONE_PRESETS.map((preset) => {
        const isSelected = preset.id === selectedPreset.id;
        return (
          <button
            aria-label={`预览 ${preset.detail} 尺寸`}
            aria-pressed={isSelected}
            className="showcase-device-option"
            key={preset.id}
            onClick={() => onSelect(preset.id)}
            type="button"
          >
            <PhoneIcon className="showcase-device-option-icon" />
            <span className="showcase-device-option-copy">
              <strong>{preset.label}</strong>
              <span>{preset.detail}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ShowcaseLayout() {
  const [selectedPresetId, setSelectedPresetId] =
    useState<ViewportPresetId>(DEFAULT_VIEWPORT_PRESET_ID);
  const [isSwitching, setIsSwitching] = useState(false);
  const deviceSpaceRef = useRef<HTMLDivElement>(null);
  const appFrameRef = useRef<HTMLIFrameElement>(null);
  const switchTimerRef = useRef<number | null>(null);
  const deviceSpaceSize = useElementSize(deviceSpaceRef);
  const [embeddedAppUrl] = useState(buildEmbeddedAppUrl);
  const systemTime = useSystemTime();

  const selectedPreset =
    PHONE_PRESETS.find(({ id }) => id === selectedPresetId) ??
    PHONE_PRESETS[0];
  const frameMetrics = resolvePhoneFrameMetrics(
    selectedPreset.width,
    selectedPreset.height,
  );
  const phoneScale = resolvePhoneScale({
    availableWidth: deviceSpaceSize.width,
    availableHeight: deviceSpaceSize.height,
  });

  useEffect(() => {
    document.documentElement.classList.add('showcase-active');
    return () => {
      document.documentElement.classList.remove('showcase-active');
    };
  }, []);

  useEffect(
    () => () => {
      if (switchTimerRef.current !== null) {
        window.clearTimeout(switchTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    appFrameRef.current?.contentDocument?.documentElement.style.setProperty(
      '--app-safe-area-top',
      `${selectedPreset.safeAreaTop}px`,
    );
  }, [selectedPreset.safeAreaTop]);

  const selectPreset = (presetId: ViewportPresetId) => {
    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);
    }
    setIsSwitching(true);
    setSelectedPresetId(presetId);
    switchTimerRef.current = window.setTimeout(() => {
      setIsSwitching(false);
      switchTimerRef.current = null;
    }, 180);
  };

  const frameStyle: CSSProperties = {
    width: frameMetrics.outerWidth * phoneScale,
    height: frameMetrics.outerHeight * phoneScale,
  };
  const transformStyle: CSSProperties = {
    width: frameMetrics.outerWidth,
    height: frameMetrics.outerHeight,
    transform: `scale(${phoneScale})`,
  };
  const screenStyle: CSSProperties = {
    left: frameMetrics.screenLeft,
    top: frameMetrics.screenTop,
    width: selectedPreset.width,
    height: selectedPreset.height,
    borderRadius: Math.max(34, selectedPreset.width * 0.112),
  };

  return (
    <main className="showcase-root">
      <div aria-hidden="true" className="showcase-ambient showcase-ambient-a" />
      <div aria-hidden="true" className="showcase-ambient showcase-ambient-b" />

      <header className="showcase-header">
        <a className="showcase-brand" href={GITHUB_REPOSITORY_URL}>
          <img alt="" className="showcase-brand-mark" src={faviconUrl} />
          <span className="showcase-brand-copy">
            <strong>美团跑腿可运行交互工程</strong>

          </span>
        </a>
      </header>

      <div className="showcase-layout">
        <aside className="showcase-intro">
          
          <h1>
            <span>让重要交付，</span>
            <br />
            <span>始终看得见。</span>
          </h1>
          <p className="showcase-description">
            聚焦服务选择成本、操作效率、配送过程不确定性与交付确认缺口，进行全链路优化。
          </p>
          <div className="showcase-principles" aria-label="产品体验原则">
            <span>物可见</span>
            <span>人可信</span>
            <span>事可感</span>
          </div>
          <p className="showcase-operate-hint">
            <span aria-hidden="true">↗</span>
            中间原型可直接点击操作
          </p>
        </aside>

        <section className="showcase-stage" aria-label="移动端交互原型">
          <div className="showcase-device-space" ref={deviceSpaceRef}>
            <div className="showcase-device-visual" style={frameStyle}>
              <div
                className={`showcase-device-transform ${
                  isSwitching ? 'is-switching' : ''
                }`}
                style={transformStyle}
              >
                <div className="showcase-device-screen" style={screenStyle}>
                  <iframe
                    className="showcase-app-frame"
                    onLoad={(event) => {
                      event.currentTarget.contentDocument?.documentElement.style.setProperty(
                        '--app-safe-area-top',
                        `${selectedPreset.safeAreaTop}px`,
                      );
                    }}
                    ref={appFrameRef}
                    src={embeddedAppUrl}
                    title={`${selectedPreset.label} 美团跑腿交互原型`}
                  />
                  <SimulatedSystemChrome time={systemTime} />
                </div>
                <img
                  alt=""
                  aria-hidden="true"
                  className="showcase-phone-shell"
                  decoding="async"
                  height="2454"
                  loading="lazy"
                  src={phoneFrameUrl}
                  width="1200"
                />
              </div>
            </div>
          </div>

          <DeviceSelector
            onSelect={selectPreset}
            selectedPreset={selectedPreset}
          />
        </section>

        <aside className="showcase-repository">

          <div className="showcase-qr-card">
            <QRCodeSVG
              value={SITE_URL}
              size={154}
              level="M"
              marginSize={0}
              bgColor="#ffffff"
              fgColor="#1b1d21"
              title={`扫码打开 ${SITE_URL}`}
            />
          </div>
          <h2>手机端体验</h2>
          <p>扫描二维码，在手机端打开，获得更完整、沉浸的操作体验。</p>
          <a
            className="showcase-repository-link"
            href={GITHUB_REPOSITORY_URL}
            rel="noreferrer"
            target="_blank"
          >
            打开
            <span className="showcase-repository-link-brand">
              <img
                alt=""
                className="showcase-repository-link-icon"
                src={githubIconUrl}
              />
              GitHub
            </span>
          </a>
        </aside>
      </div>
    </main>
  );
}
