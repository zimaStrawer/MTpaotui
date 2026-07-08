import iconBack from '../../assets/home/icon-back.svg';
import iconBookmark from '../../assets/home/icon-bookmark.svg';
import iconChevron from '../../assets/nav/icon-chevron.svg';
import iconLocation from '../../assets/home/icon-location.svg';
import iconWeather from '../../assets/home/icon-weather.svg';

/** 首页导航栏变体(913:7852):品牌标题 + 定位 + 天气(情境提示,事可感)。 */
export function HomeNavBar() {
  return (
    <header className="flex h-11 items-center px-2">
      <img src={iconBack} alt="" className="size-8" />
      <span className="font-brand text-title-brand text-text-primary">
        跑腿
      </span>
      <span className="ml-2 flex items-center">
        <img src={iconLocation} alt="" className="size-4" />
        <span className="text-body text-text-primary">杭州市</span>
        <img src={iconChevron} alt="" className="size-3.5 rotate-180" />
      </span>
      <span className="ml-auto flex items-center gap-4">
        <span className="flex items-center gap-1 text-caption text-text-primary">
          <img src={iconWeather} alt="" className="size-5" />
          <span className="flex gap-1.5">
            <span>强风</span>
            <span>6级</span>
          </span>
        </span>
        <img src={iconBookmark} alt="" className="size-6" />
      </span>
    </header>
  );
}
