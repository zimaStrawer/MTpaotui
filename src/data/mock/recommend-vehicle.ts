import type { DeliveryVehicle, Item, ItemCategory } from '../models/order';

export type Weather = 'clear' | 'rain';

export interface VehicleContext {
  item: Item;
  distanceKm: number;
  weather: Weather;
}

/** 阈值为 mock 规则,按测试场景可调 */
const FRAGILE_CATEGORIES: readonly ItemCategory[] = ['鲜花', '数码'];
const HEAVY_KG = 20;
const BULKY_CM3 = 50 * 40 * 40;
const FAR_KM = 10;

/**
 * 车型推荐规则(§5,mock 层一条纯函数):
 * 物品尺寸大 / 过重 / 易损 / 距离遥远 / 天气恶劣 → 推荐汽车配送。
 * 命中时下单确认页顶部展示「推荐使用汽车配送」提示条。
 */
export function recommendVehicle({
  item,
  distanceKm,
  weather,
}: VehicleContext): DeliveryVehicle {
  const bulky =
    item.volume !== undefined &&
    item.volume.l * item.volume.w * item.volume.h >= BULKY_CM3;
  const heavy = item.weightKg !== undefined && item.weightKg >= HEAVY_KG;
  const fragile = FRAGILE_CATEGORIES.includes(item.category);
  const far = distanceKm >= FAR_KM;
  const badWeather = weather === 'rain';

  return bulky || heavy || fragile || far || badWeather ? 'car' : 'ebike';
}
