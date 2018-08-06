import * as React from "react";
import styled from "react-emotion";
import { COLORS } from "../styles/colors";
import { BASE_SPACING_UNIT } from "../styles/style-config";

import Logo from "../images/logo@2x.png";

const FooterWrapper = styled("div")`
  background: ${COLORS.lightestGrey};
  padding: ${BASE_SPACING_UNIT * 50}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLogo = styled("img")`
  max-width: 200px;
  filter: grayscale();
  opacity: 0.25;
`;

export default () => (
  <FooterWrapper>
    <FooterLogo src={Logo} alt="logo" />
  </FooterWrapper>
);
