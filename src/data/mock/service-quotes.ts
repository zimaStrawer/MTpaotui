import type { DeliveryService } from '../models/order';

/**
 * 下单页服务档位报价(frame 864:7143,mock 静态值)。
 * standard = 普通帮送 / express = 1对1急送 / car = 汽车配送。
 */
export interface ServiceQuote {
  key: DeliveryService;
  feeYuan: number;
  /** 划线原价(有优惠时展示) */
  originalFeeYuan?: number;
  etaLabel: string;
}

export const SERVICE_QUOTES: Record<DeliveryService, ServiceQuote> = {
  standard: { key: 'standard', feeYuan: 4.9, originalFeeYuan: 15, etaLabel: '16:58' },
  express: { key: 'express', feeYuan: 9.3, etaLabel: '16:40' },
  car: { key: 'car', feeYuan: 29.5, etaLabel: '16:45' },
};

/** 地图浮卡 mock:预计送达 / 最快接单 */
export const MOCK_DELIVERY_ETA = '12:03';
export const MOCK_ACCEPT_MINUTES = 3;
