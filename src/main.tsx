import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import heroArtMascotUrl from './assets/home/hero-art-mascot.webp';
import heroExpressMascotUrl from './assets/home/hero-express-mascot.webp';
import './index.css';

// 首屏 LCP 图预加载：产物文件名带 hash 无法在 index.html 写死，
// 这里通过 import 拿到最终 URL 后动态插入 preload（两张合计 ~30KB，按 mode 二选一展示）
for (const href of [heroExpressMascotUrl, heroArtMascotUrl]) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  document.head.appendChild(link);
}

const container = document.getElementById('root');
if (!container) throw new Error('缺少 #root 挂载节点');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
