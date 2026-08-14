import type { HTMLAttributes, ReactNode } from 'react';

interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** 业务路由共享的手机应用画布，仅统一宽度、高度与横向溢出。 */
export function AppShell({
  children,
  className = '',
  ...props
}: AppShellProps) {
  return (
    <div
      className={`relative mx-auto min-h-dvh w-full max-w-md overflow-x-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface AppFixedLayerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  contentClassName?: string;
}

/** 将固定定位区域约束到与 AppShell 相同的手机画布宽度。 */
export function AppFixedLayer({
  children,
  className = '',
  contentClassName = '',
  ...props
}: AppFixedLayerProps) {
  return (
    <div className={`fixed inset-x-0 ${className}`} {...props}>
      <div className={`relative mx-auto w-full max-w-md ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
