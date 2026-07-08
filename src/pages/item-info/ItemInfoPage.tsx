import { Link } from 'react-router';

/** 物品信息页(frame 1380:20261/20291/20301)· 分段填写,M2 第一条纵切实现。 */
export function ItemInfoPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium">物品信息</h1>
      <Link className="text-sm text-blue-600 underline" to="/order-confirm">
        去下单确认 →
      </Link>
    </main>
  );
}
