import iconBack from '../../assets/home/icon-back.svg';
import iconBookmark from '../../assets/home/icon-bookmark.svg';
import iconChevron from '../../assets/nav/icon-chevron-16.svg';
import iconLocation from '../../assets/home/icon-location.svg';
import { WeatherIndicator } from '../../components/WeatherIndicator';

/** 首页导航栏(908:6301):品牌标题 + 定位 + 天气(情境提示,事可感)。 */
export function HomeNavBar() {
  return (
    <header className="relative h-11">
      <span className="absolute top-2 left-3 flex items-center gap-2">
        <span className="flex items-center">
          <img src={iconBack} alt="" className="size-6" />
          <span className="font-brand text-title-brand text-text-primary">
            跑腿
          </span>
        </span>
        <span className="flex items-center">
          <img src={iconLocation} alt="" className="size-4" />
          <span className="text-body text-text-primary">杭州市</span>
          <img src={iconChevron} alt="" className="size-4" />
        </span>
      </span>

      <span className="absolute top-3 right-3 flex items-center gap-4">
        <WeatherIndicator />
        <img src={iconBookmark} alt="" className="size-5" />
      </span>
    </header>
  );
}
