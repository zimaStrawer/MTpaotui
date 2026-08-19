import { describe, expect, it } from 'vitest';

import { recommendVehicle } from '../src/data/mock/recommend-vehicle';
import { resolveServiceVisualTheme } from '../src/design-tokens/service-theme';
import {
  classifyVolumeDelivery,
  isOrderDraftReady,
  resolveCapacityInfoState,
  resolveCourierSpecialtyLabel,
  resolveItemDeliveryPreference,
  resolveItemProofServiceVariant,
  swapAddressRoles,
  transitionServiceAddresses,
  type Address,
  type Item,
} from '../src/data/models/order';

const pickup: Address = {
  role: 'pickup',
  poi: '取件地址',
  unit: '1-101',
  contactName: '取件人',
  phone: '13800000001',
};

const delivery: Address = {
  role: 'delivery',
  poi: '收件地址',
  unit: '2-202',
  contactName: '收件人',
  phone: '13800000002',
};

const standardItem: Item = {
  category: '文件',
  weightKg: 1,
  volume: { l: 20, w: 20, h: 20 },
  insurance: 'none',
};

describe('地址与服务模式', () => {
  it('仅急送派生尊贵视觉主题', () => {
    expect(resolveServiceVisualTheme('send')).toBe('standard');
    expect(resolveServiceVisualTheme('pick')).toBe('standard');
    expect(resolveServiceVisualTheme('express')).toBe('premium');
  });

  it('交换地址时同步修正地址角色', () => {
    expect(swapAddressRoles({ pickup, delivery })).toEqual({
      pickup: { ...delivery, role: 'pickup' },
      delivery: { ...pickup, role: 'delivery' },
    });
  });

  it('仅帮送和帮取直接互切时交换地址', () => {
    expect(
      transitionServiceAddresses('send', 'pick', { pickup, delivery }),
    ).toEqual({
      pickup: { ...delivery, role: 'pickup' },
      delivery: { ...pickup, role: 'delivery' },
    });

    expect(
      transitionServiceAddresses('send', 'express', { pickup, delivery }),
    ).toEqual({ pickup, delivery });
    expect(
      transitionServiceAddresses('express', 'pick', { pickup, delivery }),
    ).toEqual({ pickup, delivery });
  });
});

describe('体积、运力与凭证', () => {
  it.each([
    ['鲜花', '鲜花使者'],
    ['蛋糕', '蛋糕天使'],
    ['文件', '文件保镖'],
    ['餐饮', '美团跑腿'],
    ['生鲜', '美团跑腿'],
    ['数码', '美团跑腿'],
    ['服饰', '美团跑腿'],
    ['帮取快递', '美团跑腿'],
    ['五金', '美团跑腿'],
    ['汽配', '美团跑腿'],
    ['其他', '美团跑腿'],
  ] as const)('%s映射为%s骑手标签', (category, label) => {
    expect(resolveCourierSpecialtyLabel(category)).toBe(label);
  });

  it('按标准、汽车建议、超限优先级分类体积', () => {
    expect(classifyVolumeDelivery({ l: 41, w: 30, h: 31 })).toBe(
      'standard',
    );
    expect(classifyVolumeDelivery({ l: 40, w: 40, h: 40 })).toBe(
      'car-recommended',
    );
    expect(classifyVolumeDelivery({ l: 60, w: 20, h: 20 })).toBe(
      'car-recommended',
    );
    expect(classifyVolumeDelivery({ l: 100, w: 30, h: 20 })).toBe(
      'car-recommended',
    );
    expect(classifyVolumeDelivery({ l: 101, w: 30, h: 20 })).toBe(
      'oversize',
    );
  });

  it('接受尺寸推荐后自动选择汽车配送', () => {
    expect(
      resolveItemDeliveryPreference({
        serviceMode: 'send',
        vehicle: 'ebike',
        volume: { l: 60, w: 20, h: 20 },
        carRecommendationSelected: true,
      }),
    ).toEqual({ serviceMode: 'send', vehicle: 'car' });
    expect(
      resolveItemDeliveryPreference({
        serviceMode: 'express',
        vehicle: 'ebike',
        volume: { l: 60, w: 20, h: 20 },
        carRecommendationSelected: true,
      }),
    ).toEqual({ serviceMode: 'send', vehicle: 'car' });
  });

  it('取消尺寸推荐使用二轮车，未触发时保留原选择', () => {
    expect(
      resolveItemDeliveryPreference({
        serviceMode: 'send',
        vehicle: 'car',
        volume: { l: 60, w: 20, h: 20 },
        carRecommendationSelected: false,
      }),
    ).toEqual({ serviceMode: 'send', vehicle: 'ebike' });
    expect(
      resolveItemDeliveryPreference({
        serviceMode: 'send',
        vehicle: 'car',
        volume: { l: 41, w: 30, h: 31 },
        carRecommendationSelected: false,
      }),
    ).toEqual({ serviceMode: 'send', vehicle: 'car' });
  });

  it('物品尺寸超限只提示风险，不阻断正常下单流程', () => {
    const oversizeItem: Item = {
      ...standardItem,
      volume: { l: 101, w: 30, h: 20 },
    };

    expect(
      resolveItemDeliveryPreference({
        serviceMode: 'express',
        vehicle: 'ebike',
        volume: oversizeItem.volume,
        carRecommendationSelected: false,
      }),
    ).toEqual({ serviceMode: 'express', vehicle: 'ebike' });
    expect(
      isOrderDraftReady({ pickup, delivery, item: oversizeItem }),
    ).toBe(true);
  });

  it('根据地址、服务和载具派生运力信息', () => {
    expect(
      resolveCapacityInfoState({
        serviceMode: 'send',
        vehicle: 'ebike',
        pickup: null,
      }),
    ).toBe('pickup-required');
    expect(
      resolveCapacityInfoState({
        serviceMode: 'send',
        vehicle: 'car',
        pickup,
      }),
    ).toBe('hidden');
    expect(
      resolveCapacityInfoState({
        serviceMode: 'express',
        vehicle: 'car',
        pickup,
      }),
    ).toBe('visible');
  });

  it('急送凭证优先于保价凭证', () => {
    expect(resolveItemProofServiceVariant('express', 'tier2')).toBe(
      'express',
    );
    expect(resolveItemProofServiceVariant('send', 'tier1')).toBe(
      'insurance',
    );
    expect(resolveItemProofServiceVariant('send', 'none')).toBe('standard');
  });
});

describe('汽车推荐', () => {
  function recommend(item: Item, distanceKm = 3, weather = 'clear' as const) {
    return recommendVehicle({ item, distanceKm, weather });
  }

  it('普通条件使用二轮车', () => {
    expect(recommend(standardItem)).toBe('ebike');
  });

  it.each([
    ['大体积', { ...standardItem, volume: { l: 50, w: 40, h: 40 } }, 3, 'clear'],
    ['20kg', { ...standardItem, weightKg: 20 }, 3, 'clear'],
    ['易损品', { ...standardItem, category: '鲜花' }, 3, 'clear'],
    ['10km', standardItem, 10, 'clear'],
    ['雨天', standardItem, 3, 'rain'],
  ] as const)('%s独立命中汽车推荐', (_name, item, distanceKm, weather) => {
    expect(recommendVehicle({ item, distanceKm, weather })).toBe('car');
  });
});
