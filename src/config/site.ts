/**
 * 本网站对外访问地址。
 *
 * 通过环境变量 VITE_SITE_URL 配置；部署后若域名/地址变更，
 * 只需在 Vercel 项目设置（或 .env）中修改该变量即可，无需改代码。
 * 未配置时回退到下方默认值。
 */
export const SITE_URL: string =
  import.meta.env.VITE_SITE_URL || 'https://mtpaotui.vercel.app';
