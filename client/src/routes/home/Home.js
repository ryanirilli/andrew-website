// @flow
import * as React from "react";
import styled from "react-emotion";
import type { RouterHistory } from "./../../../flow-typed/npm/react-router-dom_v4.x.x.js";
import Loadable from "react-loadable";
import { css } from "emotion";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import anime from "animejs";

import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import COLORS from "../../styles/colors";

import { Page, FlexCenter } from "../../styles/layouts";
import { H4 } from "../../styles/typography";

import Reel from "./../../components/ReelButton";
import Logo from "./../../components/AndrewFranksLogo";
const Gallery = Loadable({
  loader: () => import("./../../components/PhotoGallery"),
  loading: () => null
});

const VimeoPlayer = Loadable({
  loader: () => import("./../../components/VimeoPlayer"),
  loading: () => null
});

const Wrapper = styled("div")`
  opacity: 0;
`;

const Container = styled("div")`
  display: grid;
  height: 100%;
  ${MQ.small(css`
    grid-template-columns: 1fr;
  `)};
  ${MQ.medium(css`
    grid-template-columns: 1fr 1fr;
  `)};
`;

const Hero = styled("div")`
  text-align: center;
  color: #42351d;
`;

const Name = styled(H4)`
  margin-bottom: 0;
  letter-spacing: ${BASE_SPACING_UNIT * 2}px;
  padding: 0 12px 12px 12px;
  border-bottom: 1px solid;
`;

const Tags = styled("ul")`
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
  > li {
    margin-top: 0;
    :not(:first-child) {
      margin-left: 24px;
      list-style: disc;
    }
  }
`;

type Props = {
  breakpoint: string,
  history: RouterHistory
};

type State = {
  isShowingReel: boolean
};

class Home extends React.Component<Props, State> {
  containerEl: { current: null | HTMLDivElement } = React.createRef();
  heroEl: { current: null | HTMLDivElement } = React.createRef();
  galleryEl: { current: null | HTMLDivElement } = React.createRef();

  state: State = {
    isShowingReel: false
  };

  componentDidMount() {
    this.animateIn();
  }

  render() {
    const { breakpoint } = this.props;
    return (
      <React.Fragment>
        {this.state.isShowingReel && <VimeoPlayer onClose={this.onCloseReel} />}
        <Wrapper innerRef={this.containerEl}>
          <Page background={COLORS.wash}>
            <Container>
              <div>
                <FlexCenter>
                  <div>
                    <Hero innerRef={this.heroEl}>
                      <Logo color={COLORS.brand} />
                      <Name light uppercase>
                        Andrew Franks
                      </Name>
                      <div>
                        <Tags>
                          <li>Director</li>
                          <li>Cinematographer</li>
                          <li>Editor</li>
                        </Tags>
                      </div>
                      <div onClick={this.playReel}>
                        <Reel isShowingReel={this.state.isShowingReel} />
                      </div>
                    </Hero>
                  </div>
                </FlexCenter>
              </div>
              {breakpoint !== "small" && (
                <div ref={this.galleryEl}>
                  <Gallery />
                </div>
              )}
            </Container>
          </Page>
        </Wrapper>
      </React.Fragment>
    );
  }

  onCloseReel = async () => {
    this.setState({ isShowingReel: false });
    await anime({
      targets: this.containerEl.current,
      scale: [0.75, 1],
      easing: "easeInOutQuint",
      opacity: [0.5, 1],
      duration: 1000
    }).finished;
  };

  playReel = async () => {
    this.setState({ isShowingReel: true });
    await anime({
      targets: this.containerEl.current,
      scale: [1, 0.75],
      easing: "easeInOutQuint",
      opacity: [1, 0.5],
      duration: 1000
    }).finished;
  };

  async animateIn() {
    anime({
      targets: this.heroEl.current,
      translateY: ["20px", 0],
      easing: "easeInOutQuint",
      opacity: [0, 1],
      duration: 2000
    });
    await anime({
      targets: this.containerEl.current,
      translateY: ["20px", 0],
      easing: "easeInOutQuint",
      opacity: [0, 1],
      duration: 2000
    }).finished;
  }

  async animateOut(route: string) {
    anime({
      targets: this.heroEl.current,
      translateY: [0, "20px"],
      easing: "easeInOutQuint",
      opacity: [1, 0],
      duration: 1400
    });
    anime({
      targets: this.galleryEl.current,
      translateY: [0, "20px"],
      easing: "easeInOutQuint",
      opacity: [1, 0],
      delay: 250,
      duration: 1600
    });
    await anime({
      targets: this.containerEl.current,
      translateY: [0, "20px"],
      easing: "easeInOutQuint",
      opacity: [1, 0],
      duration: 2000
    }).finished;
    this.props.history.push(route);
  }
}

const mapStateToProps = state => ({
  breakpoint: state.app.breakpoint
});

export default connect(mapStateToProps)(withRouter(Home));
