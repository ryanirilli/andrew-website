import styled from "react-emotion";
import { BASE_SPACING_UNIT, COLORS } from "../styles/style-config";

const baseHeading = {
  color: COLORS.headings,
  margin: 0
};

export const H1 = styled("h1")(props => ({
  ...baseHeading,
  fontSize: "3.75rem",
  lineHeight: 1.5
}));

export const H2 = styled("h2")(props => ({
  ...baseHeading,
  fontSize: "3rem",
  lineHeight: 2
}));

export const H3 = styled("h3")(props => ({
  ...baseHeading,
  fontSize: "2.25rem",
  lineHeight: 2.25
}));

export const H4 = styled("h4")(props => ({
  ...baseHeading,
  fontSize: "1.5rem",
  lineHeight: 2.375
}));

export const P = styled("p")(props => ({
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.5,
  paddingBottom: `${BASE_SPACING_UNIT * 4}px`
}));
