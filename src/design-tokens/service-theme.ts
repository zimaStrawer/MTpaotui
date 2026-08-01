import type { ServiceMode } from '../data/models/order';

export type ServiceVisualTheme = 'standard' | 'premium';

/** 视觉主题只由订单服务模式派生，不作为第二份业务状态保存。 */
export function resolveServiceVisualTheme(
  serviceMode: ServiceMode,
): ServiceVisualTheme {
  return serviceMode === 'express' ? 'premium' : 'standard';
}
