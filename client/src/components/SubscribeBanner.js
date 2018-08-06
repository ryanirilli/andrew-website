// @flow

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { MQ } from "../styles/style-config";
import { COLORS } from "../styles/colors";
import { H2, P } from "../styles/typography";
import { Pad } from "../styles/spacing";

import { MdArrowForward } from "react-icons/md";

import Button from "./Button";

const BannerContainer = styled("div")`
  background: ${COLORS.brandSecondary};
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  p {
    color: ${COLORS.white};
    opacity: 0.75;
  }
`;

const BannerContent = styled("div")`
  ${MQ.small(
    css`
      text-align: left;
    `
  )};
  ${MQ.medium(
    css`
      text-align: center;
    `
  )};
`;

type Props = {};

export default class SubscribeBanner extends React.Component<Props> {
  render() {
    return (
      <BannerContainer>
        <BannerContent>
          <Pad>
            <H2 flush>Backed by science, proven with results</H2>
            <P>Join us today and grow your career with confidence</P>
            <Button>
              Sign Up <MdArrowForward />
            </Button>
          </Pad>
        </BannerContent>
      </BannerContainer>
    );
  }
}
