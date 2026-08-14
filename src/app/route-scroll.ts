/** 路由切换在首帧绘制前回到页面原点，避免继承上一页的滚动位置。 */
export function resetRouteScroll(): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}
