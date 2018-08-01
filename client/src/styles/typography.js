import styled from "react-emotion";
import { injectGlobal, css } from "emotion";
import { BASE_SPACING_UNIT, COLORS, MQ } from "../styles/style-config";

/**
 * Type scale is based on the Major Third
 * https://type-scale.com/
 */

const headingBase = css({
  color: COLORS.headings,
  margin: 0
});

const h1 = css`
  ${headingBase};
  line-height: 1.5;
  ${MQ.small(css({ fontSize: "1.953rem" }))};
  ${MQ.large(css({ fontSize: "2.441rem" }))};
`;

const h2 = css`
  ${headingBase};
  line-height: 2;
  ${MQ.small(css({ fontSize: "1.563rem" }))};
  ${MQ.large(css({ fontSize: "1.953rem" }))};
`;

const h3 = css`
  ${headingBase};
  line-height: 2.25;
  ${MQ.small(css({ fontSize: "1.25rem" }))};
  ${MQ.large(css({ fontSize: "1.563rem" }))};
`;

const h4 = css`
  ${headingBase};
  line-height: 2.375;
  ${MQ.small(css({ fontSize: "1rem" }))};
  ${MQ.large(css({ fontSize: "1.25rem" }))};
`;

const p = css`
  margin: 0;
  font-size: 1.3125rem;
  line-height: 1.5;
  color: ${COLORS.text};
  padding-bottom: ${BASE_SPACING_UNIT * 4}px;
`;

export const H1 = styled("h1")`
  ${h1};
`;

export const H2 = styled("h1")`
  ${h2};
`;

export const H3 = styled("h3")`
  ${h3};
`;

export const H4 = styled("h3")`
  ${h4};
`;

export const P = styled("p")`
  ${p};
  font-size: ${props =>
    props.small ? "1rem" : props.tiny ? "0.8rem" : "1.3125rem"};
  font-weight: ${props => (props.bold ? 600 : "normal")};
  padding-bottom: ${props => (props.flush ? 0 : `${BASE_SPACING_UNIT * 4}px`)};
`;

injectGlobal`   
  h1 {${h1}}  
  h2 {${h2}}
  h3 {${h3}}
  h4 {${h3}}
  p {${p}}
`;
