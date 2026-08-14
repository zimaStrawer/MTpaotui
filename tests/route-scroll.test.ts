import { afterEach, describe, expect, it, vi } from 'vitest';

import { resetRouteScroll } from '../src/app/route-scroll';

describe('路由滚动位置', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('每次切页都以无动画方式重置到页面顶部', () => {
    const scrollTo = vi.fn();
    vi.stubGlobal('window', { scrollTo });

    resetRouteScroll();

    expect(scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  });
});
