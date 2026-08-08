import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

type ImageBehavior = 'load' | 'load-without-decode' | 'error' | 'timeout';

let behavior: ImageBehavior;
let imageInstanceCount: number;
let decodeCallCount: number;

class FakeImage {
  complete = false;
  decoding = 'auto';
  naturalWidth = 0;
  onerror: (() => void) | null = null;
  onload: (() => void) | null = null;
  #src = '';

  constructor() {
    imageInstanceCount += 1;
  }

  decode =
    behavior === 'load-without-decode'
      ? undefined
      : () => {
          decodeCallCount += 1;
          return Promise.resolve();
        };

  get src() {
    return this.#src;
  }

  set src(value: string) {
    this.#src = value;
    if (behavior === 'timeout') return;

    queueMicrotask(() => {
      this.complete = true;
      if (behavior === 'error') {
        this.onerror?.();
        return;
      }

      this.naturalWidth = 100;
      this.onload?.();
    });
  }
}

async function loadPreloader() {
  return import('../src/lib/asset-preloader');
}

describe('视觉资源预加载器', () => {
  beforeEach(() => {
    behavior = 'load';
    imageInstanceCount = 0;
    decodeCallCount = 0;
    vi.resetModules();
    vi.stubGlobal('Image', FakeImage);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('相同 URL 并发和成功后重复调用均只创建一张图片', async () => {
    const { preloadImages } = await loadPreloader();

    const first = preloadImages(['/critical-map.webp']);
    const second = preloadImages(['/critical-map.webp']);
    const [firstResult, secondResult] = await Promise.all([first, second]);
    const thirdResult = await preloadImages(['/critical-map.webp']);

    expect(firstResult).toEqual([
      { url: '/critical-map.webp', status: 'loaded' },
    ]);
    expect(secondResult).toEqual(firstResult);
    expect(thirdResult).toEqual(firstResult);
    expect(imageInstanceCount).toBe(1);
    expect(decodeCallCount).toBe(1);
  });

  it('浏览器不支持 decode 时仍以 onload 与自然尺寸判定成功', async () => {
    behavior = 'load-without-decode';
    const { preloadImages } = await loadPreloader();

    await expect(preloadImages(['/legacy.svg'])).resolves.toEqual([
      { url: '/legacy.svg', status: 'loaded' },
    ]);
    expect(decodeCallCount).toBe(0);
  });

  it('加载失败时返回 error，且不会让调用方抛错', async () => {
    behavior = 'error';
    const { preloadImages } = await loadPreloader();

    await expect(preloadImages(['/missing.webp'])).resolves.toEqual([
      { url: '/missing.webp', status: 'error' },
    ]);
  });

  it('网络无响应时在安全超时后降级', async () => {
    vi.useFakeTimers();
    behavior = 'timeout';
    const { preloadImages } = await loadPreloader();

    const result = preloadImages(['/stalled-map.webp']);
    await vi.advanceTimersByTimeAsync(1_500);

    await expect(result).resolves.toEqual([
      { url: '/stalled-map.webp', status: 'timeout' },
    ]);
  });
});
