// @flow
import * as React from "react";
import styled from "react-emotion";
import anime from "animejs";

type Props = {
  children: React.Node
};

const Container = styled("div")`
  overflow: hidden;
`;

const Content = styled("div")`
  transform: translateY(100%);
`;

export default class TextReveal extends React.Component<Props> {
  contentEl: { current: null | HTMLDivElement } = React.createRef();
  componentDidMount() {
    const contentEl = this.contentEl.current;
    if (!contentEl) {
      return;
    }
    anime({
      targets: contentEl,
      translateY: ["100%", 0],
      easing: "easeInOutQuint",
      duration: 1000,
      delay: 500
    });
  }
  render() {
    return (
      <Container>
        <Content innerRef={this.contentEl}>{this.props.children}</Content>
      </Container>
    );
  }
}
