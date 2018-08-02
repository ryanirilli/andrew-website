import { css } from "emotion";
import Color from "color";

const PRIMARY_BRAND_COLOR = "#FF4F2C";
const PRIMARY_WASH = "#f3f4f5";
const WHITE = "#fff";
const PRIMARY_TEXT_COLOR = "#444444";
const SECONDARY_TEXT_COLOR = Color(PRIMARY_TEXT_COLOR)
  .lighten(0.75)
  .hex();

export const COLORS = {
  wash: PRIMARY_WASH,
  brand: PRIMARY_BRAND_COLOR,
  black: PRIMARY_TEXT_COLOR,
  white: WHITE,
  headings: PRIMARY_TEXT_COLOR,
  text: SECONDARY_TEXT_COLOR
};
