import serviceIcons from '../../assets/home/extra-service-icons.png';

interface AdditionalServicesProps {
  onUnavailableSelect: () => void;
}

const SERVICES = [
  { label: '点餐帮取', iconLeft: -3.75 },
  { label: '帮取快递', iconLeft: -72.19 },
  { label: '取送数码', iconLeft: -140.63 },
  { label: '取送文件', iconLeft: -209.06 },
  { label: '更多服务', iconLeft: -277.5 },
] as const;

/** 额外业务(1677:9637):非核心流程入口统一提示暂未开放。 */
export function AdditionalServices({
  onUnavailableSelect,
}: AdditionalServicesProps) {
  return (
    <section className="flex h-[85px] w-full items-start justify-between rounded-16 bg-bg-container px-6 pt-4">
      {SERVICES.map(({ label, iconLeft }) => (
        <button
          key={label}
          type="button"
          onClick={onUnavailableSelect}
          className="flex w-12 shrink-0 flex-col items-center gap-1.5"
        >
          <span className="relative size-[30px] shrink-0 overflow-hidden">
            <img
              src={serviceIcons}
              alt=""
              className="pointer-events-none absolute top-[-1.88px] h-[34.75px] w-[309.82px] max-w-none"
              style={{ left: iconLeft }}
            />
          </span>
          <span className="text-caption whitespace-nowrap text-text-primary">
            {label}
          </span>
        </button>
      ))}
    </section>
  );
}
