export const ANIMATION_DURATION_QUICK_MS: number = 150;
export const ANIMATION_DURATION_MS: number = 300;
export const ANIMATION_DURATION_SLOW_MS: number = 450;

export const ANIMATION_DURATION_QUICK_S: number = ANIMATION_DURATION_QUICK_MS / 1000;
export const ANIMATION_DURATION_S: number = ANIMATION_DURATION_MS / 1000;
export const ANIMATION_DURATION_SLOW_S: number = ANIMATION_DURATION_SLOW_MS / 1000;

export const fadeInQuick = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: ANIMATION_DURATION_QUICK_S } },
};