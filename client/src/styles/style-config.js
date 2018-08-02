import { css } from "emotion";

export const BASE_SPACING_UNIT = 4;
export const MAX_WIDTH = 1440;

const BREAKPOINTS = {
  small: 0,
  medium: 768,
  large: 1080,
  xLarge: MAX_WIDTH
};

export const MQ = Object.keys(BREAKPOINTS).reduce((accumulator, label) => {
  accumulator[label] = style =>
    css`
      @media (min-width: ${BREAKPOINTS[label]}px) {
        ${style};
      }
    `;
  return accumulator;
}, {});
