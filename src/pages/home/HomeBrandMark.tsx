import brandMark from '../../assets/home/logo-paotui-muted.svg';

/** 首页底部品牌标识(1677:9329)。 */
export function HomeBrandMark() {
  return (
    <div className="mt-4 flex h-6 items-center justify-center gap-1">
      <img src={brandMark} alt="" className="size-6 shrink-0" />
      <span className="font-brand text-[16px] leading-normal whitespace-nowrap text-text-quaternary">
        美团跑腿
      </span>
    </div>
  );
}
