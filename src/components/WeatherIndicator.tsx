import iconWeather from '../assets/home/icon-weather.svg';

interface WeatherIndicatorProps {
  className?: string;
}

/** 原型当前仅展示“大雨”天气状态，首页与下单页共用同一 Figma 图标与文字规格。 */
export function WeatherIndicator({ className = '' }: WeatherIndicatorProps) {
  return (
    <span className={`flex items-center gap-1 text-caption text-text-primary ${className}`}>
      <span className="relative size-5 shrink-0 overflow-hidden">
        <img
          src={iconWeather}
          alt=""
          className="absolute top-[1.9px] left-[1.92px] h-[16.2px] w-[15.32px] max-w-none"
        />
      </span>
      <span>大雨</span>
    </span>
  );
}
