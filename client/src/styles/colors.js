import { css } from "emotion";
import Color from "color";

const WHITE_SEMI_TRANSPARENT = "rgba(255, 255, 255, 0.9)";

const WHITE = "#fff";
const PRIMARY_TEXT_COLOR = "#444444";
const SECONDARY_TEXT_COLOR = Color(PRIMARY_TEXT_COLOR)
  .lighten(0.75)
  .hex();

export const COLORS = {
  black: PRIMARY_TEXT_COLOR,
  white: WHITE,
  whiteSemiTransparent: WHITE_SEMI_TRANSPARENT,
  headings: PRIMARY_TEXT_COLOR,
  text: SECONDARY_TEXT_COLOR
};
