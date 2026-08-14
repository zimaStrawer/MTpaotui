export const DIRECT_APP_QUERY = '(max-width: 599px)';
export const MOBILE_BROWSER_QUERY =
  '(max-width: 599px) and (pointer: coarse)';
export const STANDALONE_APP_QUERY = '(display-mode: standalone)';

/** Showcase iframe 使用查询参数直接渲染业务 App。 */
export function isEmbeddedPreview(search = window.location.search): boolean {
  return new URLSearchParams(search).get('embed') === '1';
}

/** iOS Safari 使用非标准 navigator.standalone 标记主屏幕 Web App。 */
export function isIosStandaloneApp(): boolean {
  return (navigator as Navigator & { standalone?: boolean }).standalone === true;
}
