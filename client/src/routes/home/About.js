// @flow
import * as React from "react";
import anime from "animejs";

import { Page, FlexCenter } from "./../../styles/layouts";
import COLORS from "../../styles/colors";

type Props = {};

export default class About extends React.Component<Props> {
  containerEl: { current: null | HTMLDivElement } = React.createRef();

  componentDidMount() {
    this.animateIn();
  }

  render() {
    return (
      <Page background={COLORS.wash}>
        <FlexCenter innerRef={this.containerEl}>ABOUT</FlexCenter>
      </Page>
    );
  }

  animateIn() {
    anime({
      targets: this.containerEl.current,
      translateY: [20, 0],
      opacity: [0, 1],
      easing: "easeInOutQuint",
      duration: 1600
    });
  }

  animateOut() {}
}
