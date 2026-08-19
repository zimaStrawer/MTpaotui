export const DIRECT_APP_QUERY = '(max-width: 599px)';

/** Showcase iframe 使用查询参数直接渲染业务 App。 */
export function isEmbeddedPreview(search = window.location.search): boolean {
  return new URLSearchParams(search).get('embed') === '1';
}
