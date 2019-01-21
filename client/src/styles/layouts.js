import styled from "react-emotion";
import { css } from "emotion";
import { MAX_WIDTH, MEDIUM_WIDTH, BASE_SPACING_UNIT, MQ } from "./style-config";
import COLORS from "./colors";

const containerProps = props => {
  let maxWidth = MAX_WIDTH;
  if (props.medium) {
    maxWidth = MEDIUM_WIDTH;
  }
  return css`
    max-width: ${maxWidth}px;
  `;
};

export const Container = styled("div")`
  position: relative;
  margin: 0 auto;
  ${containerProps};
`;

const ratioProps = props => css`
  padding-bottom: calc(${props.consequent / props.antecedent} * 100%);
`;

export const RatioBox = styled("div")`
  position: relative;
  display: block;
  :before {
    content: "";
    display: block;
    width: 100%;
    ${ratioProps};
  }
`;

const ratioBoxProps = props => css`
  overflow: ${props.overflow || "hidden"};
  ${MQ.large(
    css`
      border-radius: ${props.rounded ? `${BASE_SPACING_UNIT}px` : 0};
    `
  )};
`;

export const RatioBoxContent = styled("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${COLORS.lightestGrey};
  ${ratioBoxProps};
`;

const pageProps = ({ background, color }) => css`
  background: ${background || "transparent"};
  color: ${color || "auto"};
`;

export const Page = styled("div")`
  width: 100%;
  height: ${window.innerHeight}px;
  overflow: auto;
  ${pageProps};
`;

export const FlexCenter = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;
