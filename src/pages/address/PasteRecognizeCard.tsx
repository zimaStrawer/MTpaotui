import iconCamera from '../../assets/item-info/icon-camera.svg';
import iconCopy from '../../assets/address/icon-copy.svg';

interface PasteRecognizeCardProps {
  onUnavailable: () => void;
}

/** 地址识别条(885:6238):拍照/粘贴地址自动填充。 */
export function PasteRecognizeCard({ onUnavailable }: PasteRecognizeCardProps) {
  return (
    <button
      type="button"
      onClick={onUnavailable}
      className="flex h-12 w-full items-center gap-4 rounded-16 bg-container-bg px-5 text-left"
    >
      <img src={iconCamera} alt="" className="size-6" />
      <span className="h-[18px] w-px bg-text-quaternary" />
      <span className="flex-1 text-body text-text-tertiary">
        点击粘贴地址, 帮您自动填充
      </span>
      <span className="flex shrink-0 items-center gap-0.5">
        <img src={iconCopy} alt="" className="size-4" />
        <span className="text-caption font-medium text-text-primary">
          粘贴识别
        </span>
      </span>
    </button>
  );
}
