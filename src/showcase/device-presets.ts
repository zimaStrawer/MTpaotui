export type ViewportPresetId =
  | 'phone-360'
  | 'phone-375'
  | 'phone-390'
  | 'phone-402'
  | 'phone-440';

export interface ViewportPreset {
  id: ViewportPresetId;
  label: string;
  detail: string;
  width: number;
  height: number;
}

export interface PhoneFrameMetrics {
  outerWidth: number;
  outerHeight: number;
  screenLeft: number;
  screenTop: number;
}

/** 375 × 812 是项目的设计基准。 */
export const PHONE_PRESETS = [
  {
    id: 'phone-360',
    label: 'Compact',
    detail: '360 × 780',
    width: 360,
    height: 780,
  },
  {
    id: 'phone-375',
    label: 'Standard',
    detail: '375 × 812',
    width: 375,
    height: 812,
  },
  {
    id: 'phone-390',
    label: 'Medium',
    detail: '390 × 844',
    width: 390,
    height: 844,
  },
  {
    id: 'phone-402',
    label: 'Large',
    detail: '402 × 874',
    width: 402,
    height: 874,
  },
  {
    id: 'phone-440',
    label: 'Max',
    detail: '440 × 956',
    width: 440,
    height: 956,
  },
] as const satisfies readonly [ViewportPreset, ...ViewportPreset[]];

export const DEFAULT_VIEWPORT_PRESET_ID: ViewportPresetId = 'phone-375';

export const MAX_PHONE_VIEWPORT = {
  width: 440,
  height: 956,
} as const;

/**
 * 提供的透明样机壳尺寸为 2521 × 5154，中心透明屏幕区域为
 * 2250 × 4894；这里将真实 iframe 视窗精准放入透明区域。
 */
const PHONE_FRAME_SOURCE = {
  width: 2521,
  height: 5154,
  screenWidth: 2250,
  screenHeight: 4894,
  screenLeft: 135,
  screenTop: 130,
} as const;

export function resolvePhoneFrameMetrics(
  viewportWidth: number,
  viewportHeight: number,
): PhoneFrameMetrics {
  return {
    outerWidth:
      viewportWidth *
      (PHONE_FRAME_SOURCE.width / PHONE_FRAME_SOURCE.screenWidth),
    outerHeight:
      viewportHeight *
      (PHONE_FRAME_SOURCE.height / PHONE_FRAME_SOURCE.screenHeight),
    screenLeft:
      viewportWidth *
      (PHONE_FRAME_SOURCE.screenLeft / PHONE_FRAME_SOURCE.screenWidth),
    screenTop:
      viewportHeight *
      (PHONE_FRAME_SOURCE.screenTop / PHONE_FRAME_SOURCE.screenHeight),
  };
}

export const MAX_PHONE_FRAME = resolvePhoneFrameMetrics(
  MAX_PHONE_VIEWPORT.width,
  MAX_PHONE_VIEWPORT.height,
);

interface ResolvePhoneScaleInput {
  availableWidth: number;
  availableHeight: number;
  horizontalInset?: number;
  verticalInset?: number;
}

/** 所有手机共用最大机型算出的比例，保证切换时物理大小关系稳定。 */
export function resolvePhoneScale({
  availableWidth,
  availableHeight,
  horizontalInset = 24,
  verticalInset = 24,
}: ResolvePhoneScaleInput) {
  const usableWidth = Math.max(0, availableWidth - horizontalInset);
  const usableHeight = Math.max(0, availableHeight - verticalInset);

  return Math.max(
    0,
    Math.min(
      1,
      usableWidth / MAX_PHONE_FRAME.outerWidth,
      usableHeight / MAX_PHONE_FRAME.outerHeight,
    ),
  );
}
