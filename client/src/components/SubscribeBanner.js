// @flow

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import anime from "animejs";
import Waypoint from "react-waypoint";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";
import { COLORS } from "../styles/colors";
import { H2, P } from "../styles/typography";
import { Pad } from "../styles/spacing";
import { MdArrowForward } from "react-icons/md";
import Button from "./Button";
import Parallax from "./Parallax";
import Rockets from "../images/rockets.svg";

const BannerWrapper = styled("div")`
  position: relative;
  overflow: hidden;
`;

const Rocket = styled("img")`
  position: absolute;
  top: 50%;
  width: 200px;
  right: ${BASE_SPACING_UNIT * 30}px;
  mix-blend-mode: luminosity;
  ${MQ.small(
    css`
      opacity: 0.3;
    `
  )};
  ${MQ.medium(
    css`
      opacity: 0.6;
    `
  )};
`;

const BannerContainer = styled("div")`
  background: ${COLORS.brandSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  ${MQ.small(
    css`
      padding: ${BASE_SPACING_UNIT * 2}px 0 ${BASE_SPACING_UNIT * 65}px 0;
    `
  )};
  ${MQ.medium(
    css`
      padding: ${BASE_SPACING_UNIT * 20}px 0;
    `
  )} p {
    color: ${COLORS.white};
  }
`;

const BannerContent = styled("div")`
  text-align: center;
  opacity: 0;
`;

type Props = {};

type State = {
  hasAnimated: boolean
};

export default class SubscribeBanner extends React.Component<Props, State> {
  state: State = {
    hasAnimated: false
  };

  contentEl: ?HTMLHeadingElement = null;
  headingEl: ?HTMLHeadingElement = null;
  taglineEl: ?HTMLParagraphElement = null;
  buttonEl: ?HTMLDivElement = null;

  render() {
    return (
      <BannerWrapper>
        <Parallax>
          <Rocket src={Rockets} alt="rockets" />
        </Parallax>

        <Waypoint bottomOffset={250} onEnter={this.animateIn} />
        <BannerContainer>
          <BannerContent innerRef={el => (this.contentEl = el)}>
            <Pad>
              <H2 innerRef={el => (this.headingEl = el)} flush>
                Backed by science, proven with results.
              </H2>
              <P innerRef={el => (this.taglineEl = el)}>
                Grow your career. Build your reputation.
              </P>
              <Button
                innerRef={el => {
                  this.buttonEl = el;
                }}
                icon={<MdArrowForward />}
              >
                Sign Up
              </Button>
            </Pad>
          </BannerContent>
        </BannerContainer>
      </BannerWrapper>
    );
  }

  animateIn = (): void => {
    if (this.state.hasAnimated) {
      return;
    }
    this.setState({ hasAnimated: true }, () => {
      const baseAnimation = {
        translateY: [`${BASE_SPACING_UNIT * 3}px`, 0],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 2000
      };
      anime({
        ...baseAnimation,
        targets: this.contentEl
      });
      anime({
        ...baseAnimation,
        targets: this.headingEl
      });
      anime({
        ...baseAnimation,
        targets: this.taglineEl,
        delay: 150
      });
      anime({
        ...baseAnimation,
        targets: this.buttonEl,
        delay: 250
      });
    });
  };
}
