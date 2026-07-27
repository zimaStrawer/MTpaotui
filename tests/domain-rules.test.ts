import { describe, expect, it } from 'vitest';

import { recommendVehicle } from '../src/data/mock/recommend-vehicle';
import {
  classifyVolumeDelivery,
  resolveCapacityInfoState,
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
  it('按标准、汽车建议、超限优先级分类体积', () => {
    expect(classifyVolumeDelivery({ l: 50, w: 50, h: 50 })).toBe(
      'standard',
    );
    expect(classifyVolumeDelivery({ l: 101, w: 20, h: 20 })).toBe(
      'car-recommended',
    );
    expect(classifyVolumeDelivery({ l: 101, w: 30, h: 30 })).toBe(
      'oversize',
    );
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
