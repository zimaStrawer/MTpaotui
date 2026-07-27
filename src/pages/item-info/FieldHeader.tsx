import type { ReactNode } from 'react';

interface FieldHeaderProps {
  label: string;
  required?: boolean;
  /** 右侧辅助区(帮助链接 / 已选值 / 开关等) */
  right?: ReactNode;
}

/** 卡片字段头:左标题(可带必填 *)+ 右辅助区,物品信息各卡片共用。 */
export function FieldHeader({ label, required = false, right }: FieldHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-tab font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-0.5 align-top text-body font-semibold text-highlight-primary">
            *
          </span>
        )}
      </p>
      {right}
    </div>
  );
}
