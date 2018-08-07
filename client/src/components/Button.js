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
  border-radius: 100px;
  align-items: center;
  transition: all 250ms ease;
  box-shadow: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 200;
  :hover {
    box-shadow: 0 ${BASE_SPACING_UNIT}px ${BASE_SPACING_UNIT}px
      rgba(0, 0, 0, 0.1);
    background: ${COLORS.brand};
    border-color: ${COLORS.brand};
  }
`;

const ButtonIcon = styled("span")`
  margin-left: ${BASE_SPACING_UNIT * 2}px;
`;

type Props = {
  children?: React.Node,
  icon?: React.Node,
  innerRef?: HTMLDivElement => void
};

export default class Button extends React.Component<Props> {
  render() {
    const { children, icon } = this.props;
    return (
      <ButtonContainer innerRef={this.props.innerRef}>
        {children}
        {icon && <ButtonIcon>{icon}</ButtonIcon>}
      </ButtonContainer>
    );
  }
}
