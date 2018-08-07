// @flow

import * as React from "react";

type Props = {
  children: React.Element<any>
};

type State = {
  translate: number
};

class Parallax extends React.Component<Props, State> {
  element: ?HTMLElement = null;
  state: State = {
    translate: 0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.translate);
    window.addEventListener("resize", this.translate);
    setTimeout(this.translate, 50);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.translate);
    window.removeEventListener("resize", this.translate);
  }

  translate = () => {
    if (!this.element) return;
    const rect = this.element.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    const scrollOffset = rect.top + scrollTop + -window.innerHeight / 2;
    const scrollPosition = window.scrollY - scrollOffset;
    const translate = scrollPosition / -10;
    this.setState({ translate });
  };

  render() {
    const { children } = this.props;
    return React.cloneElement(children, {
      style: { transform: `translateY(${this.state.translate}px)` },
      innerRef: el => {
        this.element = el;
      }
    });
  }
}

export default Parallax;
