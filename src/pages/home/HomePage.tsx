import { Link } from 'react-router';

/** 首页(frame 913:7841)· M3 实现,当前为路由占位。 */
export function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="text-lg font-medium">首页 · 帮取送</h1>
      <Link className="text-sm text-blue-600 underline" to="/address/pickup">
        去填取件地址 →
      </Link>
    </main>
  );
}
