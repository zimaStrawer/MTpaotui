import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/App';
import { preloadAssetGroup } from './lib/asset-preloader';
import './index.css';

// 在 React 挂载前启动首屏与急送切换态资源请求，图片解码与 JS 初始化并行。
void preloadAssetGroup('homeExpress');

const container = document.getElementById('root');
if (!container) throw new Error('缺少 #root 挂载节点');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
