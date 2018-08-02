import * as React from "react";
import styled from "react-emotion";
import { COLORS } from "../styles/colors";
import Logo from "../images/logo@2x.png";
import { BASE_SPACING_UNIT } from "../styles/style-config";

export const TopNavContainer = styled("div")`
  background: ${COLORS.white};
  padding: ${BASE_SPACING_UNIT * 4}px;
`;

export const LogoImg = styled("img")`
  max-width: 100px;
`;

export default () => (
  <TopNavContainer>
    <LogoImg src={Logo} alt="logo" />
  </TopNavContainer>
);
