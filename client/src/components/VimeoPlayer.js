// @flow
import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import anime from "animejs";
import Player from "@vimeo/player";

import { FlexCenter } from "./../styles/layouts";
import { MQ } from "../styles/style-config";

const ReelContainer = styled("div")`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: 0;
`;

const VidContainer = styled("div")`
  opacity: 0;
  ${MQ.small(css`
    width: 100%;
  `)} ${MQ.medium(css`
    width: 80%;
  `)};
`;

type Props = {
  onClose: () => void
};

const id = "291733038";

export default class VimeoPlayer extends React.Component<Props> {
  containerEl: { current: null | HTMLDivElement } = React.createRef();
  vidContainerEl: { current: null | HTMLDivElement } = React.createRef();
  async componentDidMount() {
    const el = this.containerEl.current;

    if (!el) {
      return;
    }
    await anime({
      targets: el,
      opacity: [0, 1],
      duration: 2000,
      easing: "easeInOutQuint"
    }).finished;

    const vidEl = this.vidContainerEl.current;

    if (!vidEl) {
      return;
    }

    const player = new Player(id, {
      id,
      width: vidEl.offsetWidth
    });

    player.on("loaded", () => {
      anime({
        targets: vidEl,
        opacity: [0, 1],
        translateY: ["20px", 0],
        duration: 1000,
        easing: "easeInOutQuint"
      });
    });
  }
  render() {
    return (
      <ReelContainer innerRef={this.containerEl} onClick={this.props.onClose}>
        <FlexCenter>
          <VidContainer innerRef={this.vidContainerEl} id={id} />
        </FlexCenter>
      </ReelContainer>
    );
  }
}
