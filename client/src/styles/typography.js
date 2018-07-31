import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, COLORS, MQ } from "../styles/style-config";

/**
 * Type scale is based on the Major Third
 * https://type-scale.com/
 */

const baseHeading = {
  color: COLORS.headings,
  margin: 0
};

export const H1 = styled("h1")(
  props => ({
    ...baseHeading,
    lineHeight: 1.5
  }),
  MQ.small(css({ fontSize: "1.953rem" })),
  MQ.large(css({ fontSize: "2.441rem" }))
);

export const H2 = styled("h2")(
  props => ({
    ...baseHeading,
    lineHeight: 2
  }),
  MQ.small(css({ fontSize: "1.563rem" })),
  MQ.large(css({ fontSize: "1.953rem" }))
);

export const H3 = styled("h3")(
  props => ({
    ...baseHeading,
    lineHeight: 2.25
  }),
  MQ.small(css({ fontSize: "1.25rem" })),
  MQ.large(css({ fontSize: "1.563rem" }))
);

export const H4 = styled("h4")(
  props => ({
    ...baseHeading,
    fontSize: "1.5rem",
    lineHeight: 2.375
  }),
  MQ.small(css({ fontSize: "1rem" })),
  MQ.large(css({ fontSize: "1.25rem" }))
);

export const P = styled("p")(props => ({
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.5,
  color: COLORS.text,
  paddingBottom: `${BASE_SPACING_UNIT * 4}px`
}));
