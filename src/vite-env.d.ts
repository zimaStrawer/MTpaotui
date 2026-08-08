/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 本网站对外访问地址，用于展示页二维码卡片链接 */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
