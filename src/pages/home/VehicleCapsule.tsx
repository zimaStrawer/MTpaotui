import iconCar from '../../assets/home/icon-car.svg';
import iconEbike from '../../assets/home/icon-ebike.png';
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
    <div className="flex h-8 shrink-0 items-center rounded-full bg-bg-page p-0.5">
      {OPTIONS.map((option) => {
        const selected = value === option.vehicle;
        return (
          <button
            key={option.vehicle}
            type="button"
            onClick={() => onChange(option.vehicle)}
            className={`flex h-7 items-center gap-1 rounded-full px-3 ${
              selected ? 'bg-bg-container' : ''
            }`}
          >
            <img src={option.icon} alt="" className="size-4" />
            <span
              className={`text-caption ${
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
