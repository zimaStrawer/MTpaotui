import logoPaotui from '../../assets/item-info/logo-paotui.svg';

/** 品牌心智卡(frame 1380:20289):一小时全城送 + 品类专属配送说明。 */
export function BrandCard() {
  return (
    <section className="flex w-full flex-col gap-2 rounded-16 bg-bg-container px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <img src={logoPaotui} alt="" className="size-6" />
          <span className="font-brand text-tab text-brand-primary">
            美团跑腿
          </span>
        </span>
        <span className="relative text-caption font-medium text-text-primary">
          <span className="absolute inset-x-0 bottom-0.5 h-[7px] bg-brand-secondary" />
          <span className="relative">一小时 全城送</span>
        </span>
      </div>
      <p className="text-caption font-medium text-text-primary">
        每个品类都有专属的配送流程与防护装备, 请准确选择物品类型,
        让送达更安心、更匹配。
      </p>
    </section>
  );
}
