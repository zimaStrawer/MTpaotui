import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/** 根级错误边界:渲染崩溃时兜底,提示全退重开(UX 状态仅内存,重开即干净起点)。 */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-2 p-6 text-center">
          <h1 className="text-lg font-medium">页面出错了</h1>
          <p className="text-sm text-gray-500">请关闭应用后重新打开</p>
        </main>
      );
    }
    return this.props.children;
  }
}
