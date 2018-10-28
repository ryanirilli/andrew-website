// @flow
import * as React from "react";
import Player from "@vimeo/player";
import styled from "react-emotion";
import { css } from "emotion";
import anime from "animejs";
import moment from "moment";
import COLORS from "../styles/colors";
import { RatioBox, RatioBoxContent } from "../styles/layouts";
import { Pad } from "../styles/spacing";
import { H2, H3 } from "../styles/typography";
import { MQ } from "../styles/style-config";
const Container = styled("div")`
  display: grid;
  iframe {
    display: block;
  }
  ${MQ.small(css`
    grid-template-columns: 1fr;
  `)} ${MQ.medium(css`
    grid-template-columns: 2fr 1fr;
  `)};
`;

const LeftSide = styled("div")`
  background: black;
  display: grid;
  align-items: center;
`;

const vidLinkProps = props => css`
  color: ${props.isActive ? COLORS.activeColor : "#adadad"};
`;

const VidLink = styled("p")`
  margin: 0 0 16px 0;
  font-size: 16px;
  cursor: pointer;
  font-family: "adelle-sans";
  ${vidLinkProps};
  :hover {
    color: ${COLORS.activeColor};
  }
`;

const PlayerContainer = styled("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 0;
`;

const PreviewContainer = styled("div")`
  position: relative;
  z-index: 1;
  color: white;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const title = css`
  position: absolute;
  overflow: hidden;
  z-index: 1;
  left: 64px;
`;

const previewBottom = 68;

const PreviewTitle = styled("div")`
  ${title} bottom: 48px;
  padding: 12px 0 3px 0;
  :after {
    content: "";
    position: absolute;
    width: 75px;
    height: 6px;
    background: white;
    top: 0;
    left: 0;
  }
`;

const PreviewSubTitle = styled("div")`
  ${title} bottom: ${previewBottom - 48}px;
`;

const PreviewBg = styled("div")`
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.65) 100%
  );
`;

const Play = styled("svg")`
  width: 50px;
  position: absolute;
  bottom: 24px;
  left: 16px;
`;

const List = styled("div")`
  margin-top: 16px;
`;

type Props = {
  videos: Object,
  type: string
};

type State = {
  currentVid: ?Object,
  currentLink: ?Object,
  isPlaying: boolean
};

export default class Videos extends React.Component<Props, State> {
  playerEl: { current: null | HTMLDivElement } = React.createRef();
  previewContainerEl: { current: null | HTMLDivElement } = React.createRef();
  previewTitleEl: { current: null | HTMLDivElement } = React.createRef();
  previewSubTitleEl: { current: null | HTMLDivElement } = React.createRef();
  previewImgEl: { current: null | HTMLImageElement } = React.createRef();
  playEl: { current: null | HTMLElement } = React.createRef();
  player: ?Object;
  state: State = {
    currentLink: null,
    currentVid: null,
    isPlaying: false
  };
  componentDidMount() {
    const el = this.playerEl.current;
    if (!el) {
      return;
    }
    const { type, videos } = this.props;
    const featuredVid = videos.data.find(vid => {
      return vid.tags.find(tag => tag.canonical === `featured:${type}`);
    });
    if (!featuredVid) {
      return null;
    }
    this.setState({
      currentVid: featuredVid,
      currentLink: featuredVid
    });
    const id = Videos.getVideoId(featuredVid);
    const player = new Player("player", {
      id,
      width: el.offsetWidth,
      autoplay: false
    });
    this.player = player;
  }

  render() {
    const { currentVid } = this.state;
    const { videos } = this.props;
    return (
      <React.Fragment>
        <Container>
          <LeftSide>
            <RatioBox
              antecedent={16}
              consequent={9}
              style={{ background: "#1b1b1b" }}
            >
              <RatioBoxContent>
                <PlayerContainer innerRef={this.playerEl} id="player" />
                {currentVid && (
                  <PreviewContainer
                    innerRef={this.previewContainerEl}
                    onClick={this.playCurrentVid}
                  >
                    <img
                      alt={currentVid.name}
                      ref={this.previewImgEl}
                      src={currentVid.pictures.sizes[4].link}
                    />
                    <PreviewTitle>
                      <H2 flush innerRef={this.previewTitleEl}>
                        {currentVid.name}
                      </H2>
                    </PreviewTitle>
                    <PreviewSubTitle>
                      <H3 flush innerRef={this.previewSubTitleEl}>
                        {moment
                          .duration(currentVid.duration, "seconds")
                          .humanize()}
                      </H3>
                    </PreviewSubTitle>
                    <PreviewBg />
                    <Play innerRef={this.playEl} viewBox="0 0 41.999 41.999">
                      <path fill="white" d="M6 4l20 12-20 12z" />
                    </Play>
                  </PreviewContainer>
                )}
              </RatioBoxContent>
            </RatioBox>
          </LeftSide>
          <Pad>
            <H2 flush>Directing</H2>
            <List>{videos.data.map(this.renderVideo)}</List>
          </Pad>
        </Container>
      </React.Fragment>
    );
  }

  renderVideo = (vid: Object, key?: number): React.Node => {
    return (
      <div key={key} onClick={e => this.setCurrentVid(vid)}>
        <VidLink isActive={vid === this.state.currentLink}>{vid.name}</VidLink>
      </div>
    );
  };

  static getVideoId(vid: Object): string {
    return vid.uri.split("/").slice(-1)[0];
  }

  static preloadImg(path: string): Promise<void> {
    return new Promise(resolve => {
      const img = document.createElement("img");
      img.src = path;
      img.onload = resolve;
    });
  }

  async showPreview() {
    const { player } = this;
    const previewContainerEl = this.previewContainerEl.current;
    const playerEl = this.playerEl.current;
    if (!player || !previewContainerEl || !playerEl) {
      return;
    }
    player.pause();
    this.setState({ isPlaying: false });
    await anime({
      targets: playerEl,
      opacity: [1, 0],
      easing: "easeInOutQuint",
      duration: 500
    });
    const promise = await anime({
      targets: previewContainerEl,
      opacity: [0, 1],
      easing: "easeInOutQuint",
      duration: 500
    }).finished;
    playerEl.style.zIndex = "0";
    return promise;
  }

  async hidePreview() {
    const previewContainerEl = this.previewContainerEl.current;
    const playerEl = this.playerEl.current;
    if (!previewContainerEl || !playerEl) {
      return;
    }
    playerEl.style.zIndex = "2";
    await anime({
      targets: previewContainerEl,
      opacity: [1, 0],
      easing: "easeInOutQuint",
      duration: 500
    }).finished;
    return anime({
      targets: playerEl,
      opacity: [0, 1],
      easing: "easeInOutQuint",
      duration: 500
    }).finished;
  }

  playCurrentVid = async () => {
    const { player } = this;
    const { currentVid } = this.state;
    if (!player || !currentVid) {
      return;
    }
    await player.loadVideo(Videos.getVideoId(currentVid));
    await player.setAutopause(false);
    await this.hidePreview();
    await player.play();
    this.setState({ isPlaying: true });
  };

  async setCurrentVid(vid: Object) {
    if (this.state.currentVid === vid) {
      return;
    }
    this.setState({ currentLink: vid });
    const previewTitleEl = this.previewTitleEl.current;
    const previewSubTitleEl = this.previewSubTitleEl.current;
    const previewImgEl = this.previewImgEl.current;
    const playEl = this.playEl.current;
    if (!previewTitleEl || !previewImgEl || !previewSubTitleEl || !playEl) {
      return;
    }
    if (this.state.isPlaying) {
      await this.showPreview();
    }
    await Videos.preloadImg(vid.pictures.sizes[4].link);
    anime({
      targets: playEl,
      opacity: [1, 0],
      easing: "easeInOutQuint",
      duration: 500
    });
    anime({
      targets: previewTitleEl,
      translateY: [0, "100%"],
      easing: "easeInOutQuint",
      duration: 1000
    });
    anime({
      targets: previewSubTitleEl,
      translateY: [0, "100%"],
      easing: "easeInOutQuint",
      duration: 1000,
      delay: 50
    });
    await anime({
      targets: previewImgEl,
      translateY: [0, "10%"],
      opacity: 0,
      easing: "easeInOutQuint",
      duration: 1500
    }).finished;
    this.setState({ currentVid: vid }, () => {
      anime({
        targets: playEl,
        opacity: [0, 1],
        easing: "easeInOutQuint",
        duration: 500,
        delay: 500
      });
      anime({
        targets: previewTitleEl,
        translateY: ["100%", 0],
        easing: "easeInOutQuint",
        duration: 1000
      });
      anime({
        targets: previewSubTitleEl,
        translateY: ["100%", 0],
        easing: "easeInOutQuint",
        duration: 1000,
        delay: 100
      });
      anime({
        targets: previewImgEl,
        translateY: ["10%", 0],
        opacity: [0, 1],
        easing: "easeInOutQuint",
        duration: 1500
      });
    });
  }
}
