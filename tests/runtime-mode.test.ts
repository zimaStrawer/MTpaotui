import { describe, expect, it } from 'vitest';

import { isEmbeddedPreview } from '../src/app/runtime-mode';

describe('应用运行模式', () => {
  it('仅 embed=1 进入嵌入预览模式', () => {
    expect(isEmbeddedPreview('?embed=1')).toBe(true);
    expect(isEmbeddedPreview('?embed=0')).toBe(false);
    expect(isEmbeddedPreview('?mode=preview')).toBe(false);
  });
});
