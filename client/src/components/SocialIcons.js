import React from "react";
import VimeoIcon from "../images/vimeo.svg";
import InstaIcon from "../images/instagram.svg";
import KPIcon from "../images/kp.svg";
import { BASE_SPACING_UNIT } from "../styles/style-config";
import styled from "react-emotion";

import { P } from "./../styles/typography";

const SocialContainer = styled("div")`
  display: flex;
  margin-top: ${BASE_SPACING_UNIT * 15}px;
  justify-content: center;
  > div > a {
    display: inline-block;
    padding: 0 ${BASE_SPACING_UNIT * 2}px;
  }
`;

const Email = styled(P)`
  letter-spacing: 4px;
  padding: 0 ${BASE_SPACING_UNIT * 6}px;
`;

const Logo = styled("img")`
  width: 35px;
  padding: 0 ${BASE_SPACING_UNIT * 2}px;
`;

const KPLogo = styled("img")`
  width: 45px;
  transform: translate(${BASE_SPACING_UNIT}px, -${BASE_SPACING_UNIT}px);
  padding: 0 ${BASE_SPACING_UNIT * 2}px;
`;

const SocialIcons = styled("div")`
  border-top: 1px solid;
  padding: ${BASE_SPACING_UNIT * 6}px ${BASE_SPACING_UNIT * 6}px 0
    ${BASE_SPACING_UNIT * 6}px;
  display: flex;
  justify-content: center;
`;

export default function() {
  return (
    <SocialContainer>
      <div>
        <Email>awfranks@gmail.com</Email>
        <SocialIcons>
          <a href="https://vimeo.com/andrewfranks" target="_blank">
            <Logo src={VimeoIcon} />
          </a>
          <a href="https://www.instagram.com/awfranks/" target="_blank">
            <Logo src={InstaIcon} />
          </a>
          <a
            href="http://kontentpartners.com/directors/andrew-franks/"
            target="_blank"
          >
            <KPLogo src={KPIcon} />
          </a>
        </SocialIcons>
      </div>
    </SocialContainer>
  );
}
