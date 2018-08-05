import * as React from "react";
import styled from "react-emotion";
import { COLORS } from "../styles/colors";
import Logo from "../images/logo@2x.png";
import { BASE_SPACING_UNIT } from "../styles/style-config";

export const TopNavContainer = styled("div")`
  background: ${COLORS.white};
  padding: ${BASE_SPACING_UNIT * 4}px;
  display: flex;
  justify-content: center;
`;

export const TopNavContent = styled("div")``;

export const LogoContainer = styled("div")`
  text-align: center;
`;

export const LogoImg = styled("img")`
  max-width: 150px;
`;

export const TopNavLinks = styled("ul")`
  display: flex;
  list-style: none;
  padding: 0;
  a {
    color: ${COLORS.brandSecondary};
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.707rem;
    font-weight: 800;
  }
`;

export const TopNavLink = styled("li")`
  padding: 0 ${BASE_SPACING_UNIT * 4}px;
`;

export default () => (
  <TopNavContainer>
    <TopNavContent>
      <LogoContainer>
        <LogoImg src={Logo} alt="logo" />
      </LogoContainer>
      <div>
        <TopNavLinks>
          <TopNavLink>
            <a href="#">about</a>
          </TopNavLink>
          <TopNavLink>
            <a href="#">platform</a>
          </TopNavLink>
          <TopNavLink>
            <a href="#">results</a>
          </TopNavLink>
          <TopNavLink>
            <a href="#">why better up?</a>
          </TopNavLink>
          <TopNavLink>
            <a href="#">about us</a>
          </TopNavLink>
        </TopNavLinks>
      </div>
    </TopNavContent>
  </TopNavContainer>
);
