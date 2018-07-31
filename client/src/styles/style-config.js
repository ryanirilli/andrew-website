import { css } from "emotion";
import Color from "color";

const PRIMARY_TEXT_COLOR = "#444444";

const SECONDARY_TEXT_COLOR = Color(PRIMARY_TEXT_COLOR)
  .lighten(0.75)
  .hex();

export const BASE_SPACING_UNIT = 4;

export const MAX_WIDTH = 1440;

const BREAKPOINTS = {
  small: 0,
  medium: 768,
  large: 1080,
  xLarge: MAX_WIDTH
};

export const COLORS = {
  headings: PRIMARY_TEXT_COLOR,
  text: SECONDARY_TEXT_COLOR
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
