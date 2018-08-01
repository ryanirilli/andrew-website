import * as React from "react";
import styled from "react-emotion";
import { MAX_WIDTH as maxWidth } from "./style-config";

export const Container = styled("div")(props => ({
  maxWidth,
  margin: "0 auto"
}));

export const RatioBox = styled("div")`
  position: relative;
  display: block;
  :before {
    content: "";
    display: block;
    width: 100%;
    padding-bottom: calc(
      ${props => props.consequent / props.antecedent} * 100%
    );
  }
`;

export const RatioBoxContent = styled("div")`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: ${props => props.overflow || "hidden"};
`;
