// @flow
import React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import SocialIcons from "./SocialIcons";
import BioImg from "./../images/andrew-bio-pic.jpg";

import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";
import COLORS from "../styles/colors";

import { P } from "../styles/typography";

const BioContainer = styled("div")`
  display: flex;
  height: 100%;
  ${MQ.small(css`
    flex-direction: column-reverse;
  `)} ${MQ.medium(css`
    flex-direction: row;
  `)};
`;

const BioContentContainer = styled("div")`
  background-size: cover;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.wash};
`;

const BioContent = styled("div")`
  max-width: 500px;
  ${MQ.small(css`
    padding: ${BASE_SPACING_UNIT * 30}px ${BASE_SPACING_UNIT * 8}px;
  `)} ${MQ.large(css`
    padding: ${BASE_SPACING_UNIT * 60}px ${BASE_SPACING_UNIT * 8}px;
  `)};
`;

const BioPic = styled("div")`
  background-size: cover;
  ${MQ.small(css`
    flex-basis: 100%;
    height: 500px;
  `)} ${MQ.large(css`
    flex-basis: 60%;
    height: auto;
  `)};
`;

export default function() {
  return (
    <BioContainer>
      <BioContentContainer>
        <div>
          <BioContent>
            <P>
              Andrew Franks is a Seattle based director, editor, and
              cinematographer driven to capture the nuance of human narrative on
              film. Whether he is digging into the motivating force behind a hip
              hop artist, following a biker gang, or on an expedition to summit
              Kilimanjaro, Andrew's vision carries through each step of the
              filmmaking process. Andrew grew up on a small island where at the
              age of 10 he picked up his parent's video camera and his love for
              film was born.
            </P>
            <SocialIcons />
          </BioContent>
        </div>
      </BioContentContainer>
      <BioPic style={{ backgroundImage: `url(${BioImg})` }} />
    </BioContainer>
  );
}
