import iconInsuranceGuarantee from '../../assets/order-confirm/icon-insurance-guarantee.svg';
import iconChevron from '../../assets/nav/icon-chevron.svg';

interface InsuranceGuaranteeTagProps {
  className?: string;
}

/** 已保价订单保障标签(node 1715:22449)，吸附在底部提交栏上方。 */
export function InsuranceGuaranteeTag({
  className = '',
}: InsuranceGuaranteeTagProps) {
  return (
    <div
      role="status"
      className={`flex h-8 w-full items-center justify-between bg-insurance-bg px-3 ${className}`}
    >
      <span className="flex items-center gap-1 whitespace-nowrap text-caption text-text-primary">
        <span className="flex size-4 shrink-0 items-center justify-center">
          <img
            src={iconInsuranceGuarantee}
            alt=""
            className="h-[11.33px] w-[9.33px]"
          />
        </span>
        <span>
          本单由
          <span className="text-insurance-primary">“省心送”</span>
          保价服务保障, 最高全额赔付
        </span>
      </span>
      <img src={iconChevron} alt="" className="size-3 shrink-0" />
    </div>
  );
}
