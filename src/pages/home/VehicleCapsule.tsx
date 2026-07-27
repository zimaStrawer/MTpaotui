import iconCar from '../../assets/home/icon-car.svg';
import iconEbike from '../../assets/home/icon-ebike.svg';
import type { DeliveryVehicle } from '../../data/models/order';

interface VehicleCapsuleProps {
  value: DeliveryVehicle;
  onChange: (vehicle: DeliveryVehicle) => void;
}

const OPTIONS: { vehicle: DeliveryVehicle; label: string; icon: string }[] = [
  { vehicle: 'ebike', label: '两轮车', icon: iconEbike },
  { vehicle: 'car', label: '汽车', icon: iconCar },
];

/** 载具切换胶囊(组件 904:7366):选中项为白底浮起。 */
export function VehicleCapsule({ value, onChange }: VehicleCapsuleProps) {
  return (
    <div className="relative grid h-8 shrink-0 grid-cols-2 items-center rounded-full bg-page-bg p-0.5">
      <span
        aria-hidden
        className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-container-bg transition-transform duration-200 ease-out motion-reduce:transition-none ${
          value === 'car' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      {OPTIONS.map((option) => {
        const selected = value === option.vehicle;
        return (
          <button
            key={option.vehicle}
            type="button"
            onClick={() => onChange(option.vehicle)}
            aria-pressed={selected}
            className="relative z-10 flex h-7 items-center justify-center gap-1 rounded-full px-3 max-[374px]:px-1.5"
          >
            <span
              aria-hidden
              className={`size-4 transition-colors duration-200 motion-reduce:transition-none ${
                selected ? 'bg-text-primary' : 'bg-text-secondary'
              }`}
              style={{
                WebkitMaskImage: `url("${option.icon}")`,
                maskImage: `url("${option.icon}")`,
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
            <span
              className={`text-caption transition-colors duration-200 motion-reduce:transition-none ${
                selected
                  ? 'font-medium text-text-primary'
                  : 'text-text-secondary'
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
