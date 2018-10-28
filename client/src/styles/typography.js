// @flow
import styled from "react-emotion";
import { injectGlobal, css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";
import COLORS from "../styles/colors";

/**
 * Type scale is based on the Major Third
 * https://type-scale.com/
 */

type HeadingProps = {
  flush?: boolean,
  light?: boolean,
  uppercase?: boolean,
  brandFont?: boolean
};

const headingMarginTopDefault = `${BASE_SPACING_UNIT * 10}px`;
const headingMarginBottomDefault = `${BASE_SPACING_UNIT * 4}px`;

const headingProps = (props: HeadingProps): string => css`
  margin-top: ${props.flush ? 0 : headingMarginTopDefault};
  margin-bottom: ${props.flush ? 0 : headingMarginBottomDefault};
  font-weight: ${props.light ? 100 : 800};
  text-transform: ${props.uppercase ? "uppercase" : "none"};
  font-family: "adelle-sans";
`;

const headingBase = css`
  line-height: 1.1;
  margin: ${headingMarginTopDefault} 0 ${headingMarginBottomDefault} 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const h1 = css`
  ${headingBase};
  ${MQ.small(css({ fontSize: "1.953rem" }))};
  ${MQ.large(css({ fontSize: "2.441rem" }))};
`;

const h2 = css`
  ${headingBase};
  ${MQ.small(css({ fontSize: "1.563rem" }))};
  ${MQ.large(css({ fontSize: "1.953rem" }))};
`;

const h3 = css`
  ${headingBase};
  ${MQ.small(css({ fontSize: "1.25rem" }))};
  ${MQ.large(css({ fontSize: "1.563rem" }))};
`;

const h4 = css`
  ${headingBase};
  ${MQ.small(css({ fontSize: "1rem" }))};
  ${MQ.large(css({ fontSize: "1.25rem" }))};
`;

const p = css`
  margin: 0;
  line-height: 1.5;
  color: ${COLORS.text};
  font-family: "adelle-sans";
  font-weight: 100;
  letter-spacing: 1px;
  ${MQ.small(
    css`
      font-size: 1rem;
      padding-bottom: ${BASE_SPACING_UNIT * 4}px;
    `
  )};
  ${MQ.medium(
    css`
      font-size: 1.3125rem;
      padding-bottom: ${BASE_SPACING_UNIT * 4}px;
    `
  )};
`;

const blockquote = css`
  background: ${COLORS.lightestGrey};
  border-left: ${BASE_SPACING_UNIT}px solid ${COLORS.brandSecondary};
  margin: 0;
  padding: ${BASE_SPACING_UNIT * 4}px 0 ${BASE_SPACING_UNIT * 4}px
    ${BASE_SPACING_UNIT * 4}px;
  font-style: italic;
  p {
    padding: 0;
  }
`;

export const H1 = styled("h1")`
  ${h1};
  ${headingProps};
`;

export const H2 = styled("h2")`
  ${h2};
  ${headingProps};
`;

export const H3 = styled("h3")`
  ${h3};
  ${headingProps};
`;

export const H4 = styled("h4")`
  ${h4};
  ${headingProps};
`;

const brandHeadingProps = props => css``;

export const BrandHeading = styled(H1)`
  ${brandHeadingProps}
  margin-bottom: ${BASE_SPACING_UNIT * 10}px; 
  ${MQ.small(css({ fontSize: "1.953rem" }))};
  ${MQ.large(css({ fontSize: "5rem" }))};
`;

const pProps = props => css`
  ${MQ.small(
    css`
      font-weight: ${props.bold ? 600 : 100};
      font-size: ${props.small ? "1rem" : props.tiny ? "0.8rem" : "1rem"};
      padding-bottom: ${props.flush ? 0 : `${BASE_SPACING_UNIT * 2}px`};
      line-height: ${props.flush ? 1.25 : 1.5};
    `
  )};
  ${MQ.medium(
    css`
      padding-bottom: ${props.flush ? 0 : `${BASE_SPACING_UNIT * 4}px`};
    `
  )};
`;

export const P = styled("p")`
  ${p};
  ${pProps};
`;
