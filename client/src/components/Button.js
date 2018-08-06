// @flow

import * as React from "react";
import styled from "react-emotion";

import { COLORS } from "../styles/colors";
import { BASE_SPACING_UNIT } from "../styles/style-config";

const ButtonContainer = styled("div")`
  display: inline-flex;
  border: 1px solid ${COLORS.white};
  color: ${COLORS.white};
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 2px;
  align-items: center;
  transition: all 250ms ease;
  box-shadow: none;
  :hover {
    box-shadow: 0 ${BASE_SPACING_UNIT}px ${BASE_SPACING_UNIT}px
      rgba(0, 0, 0, 0.1);
    background: ${COLORS.brand};
    border-color: ${COLORS.brand};
  }
`;

type Props = {
  children?: React.Node
};

export default class Button extends React.Component<Props> {
  render() {
    return <ButtonContainer>{this.props.children}</ButtonContainer>;
  }
}
