import Color from "color";

const PRIMARY_BRAND_COLOR = "#FF4F2C";
const SECONDARY_BRAND_COLOR = "#33A8FF";
const PRIMARY_WASH = "#f3f4f5";
const WHITE = "#fff";
const LIGHT_GREY = "#ccc";
const LIGHTEST_GREY = "#f9f9f9";
const DARK_GREY = Color(LIGHT_GREY)
  .darken(0.75)
  .hex();
const PRIMARY_TEXT_COLOR = "#444444";
const SECONDARY_TEXT_COLOR = Color(PRIMARY_TEXT_COLOR)
  .lighten(0.75)
  .hex();

export const COLORS = {
  wash: PRIMARY_WASH,
  brand: PRIMARY_BRAND_COLOR,
  brandSecondary: SECONDARY_BRAND_COLOR,
  black: PRIMARY_TEXT_COLOR,
  white: WHITE,
  lightestGrey: LIGHTEST_GREY,
  lightGrey: LIGHT_GREY,
  darkGrey: DARK_GREY,
  headings: PRIMARY_TEXT_COLOR,
  text: SECONDARY_TEXT_COLOR
};
