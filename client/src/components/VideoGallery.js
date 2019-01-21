import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import idx from "idx";
import Player from "@vimeo/player";

import { RatioBox, RatioBoxContent } from "../styles/layouts";
import { H2, H3, H4 } from "../styles/typography";
import { Pad } from "../styles/spacing";
import moment from "moment/moment";
import anime from "animejs";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";
import COLORS from "../styles/colors";

const CloseIcon = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z" />
    </svg>
  );
};

const Wrapper = styled("div")`
  background: #081419;
  overflow: hidden;
`;

const containerProps = props => css`
  position: ${props.isPlayingVid ? "absolute" : "relative"};
  left: ${props.isPlayingVid ? "-10000px" : "0"};
`;

const Container = styled("div")`
  color: white;
  width: 100%;
  ${containerProps};
`;

const Title = styled(H3)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: break-word;
`;

const VideosContainer = styled("div")`
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-wrap: nowrap;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 4px;
  }
`;

const VideoContainer = styled("div")`
  flex: 0 0 auto;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
  position: relative;
  ${MQ.small(css`
    width: 80vw;
  `)} ${MQ.medium(css`
    width: 40vw;
  `)};
`;

const videoPlayerContainerProps = props => css`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  position: ${props.isPlayingVid ? "relative" : "absolute"};
  left: ${props.isPlayingVid ? "0" : "-10000px"};
`;

const VideoPlayerContainer = styled("div")`
  ${videoPlayerContainerProps};
`;

const VideoPlayer = styled("div")`
  width: 100%;
  iframe {
    display: block;
  }
`;

const Close = styled("div")`
  position: absolute;
  background: white;
  top: -0px;
  right: 0px;
  z-index: 99;
  padding: 8px;
`;

const categoryTabProps = props => css`
  color: ${props.isActive ? COLORS.white : "#6d6d6d"};
`;

const CategoryTab = styled(H2)`
  ${categoryTabProps} display: inline-block;
  cursor: pointer;
  ${MQ.small(css`
    margin-right: ${BASE_SPACING_UNIT * 4}px;
  `)} ${MQ.medium(css`
    margin-right: ${BASE_SPACING_UNIT * 8}px;
  `)};
`;

type Props = {
  videos: Object
};

export default class VideoGallery extends React.Component<Props> {
  wrapperEl = React.createRef();
  videosContainerEl = React.createRef();
  playerContainerEl = React.createRef();
  containerEl = React.createRef();
  playerEl = React.createRef();
  player: null;

  state = {
    isPlayingVid: false,
    currentCategory: Object.keys(this.props.videos)[0],
    categories: new Set(Object.keys(this.props.videos))
  };

  render() {
    const { categories, currentCategory, isPlayingVid } = this.state;
    const cats = [];
    categories.forEach(cat =>
      cats.push(
        <CategoryTab
          key={cat}
          flush
          light
          isActive={cat === currentCategory}
          onClick={() => this.onCatClick(cat)}
        >
          {this.props.videos[cat].label}
        </CategoryTab>
      )
    );
    return (
      <Wrapper innerRef={this.wrapperEl}>
        <Container isPlayingVid={isPlayingVid} innerRef={this.containerEl}>
          <React.Fragment>
            {this.renderCategoryTabs()}
            <div ref={this.videosContainerEl}>{this.renderVideos()}</div>
          </React.Fragment>
        </Container>
        <VideoPlayerContainer
          isPlayingVid={isPlayingVid}
          innerRef={this.playerContainerEl}
        >
          <Close onClick={this.closeVideo}>
            <CloseIcon />
          </Close>
          <VideoPlayer innerRef={this.playerEl} />
        </VideoPlayerContainer>
      </Wrapper>
    );
  }

  renderCategoryTabs() {
    const { categories, currentCategory } = this.state;
    const cats = [];
    categories.forEach(cat =>
      cats.push(
        <CategoryTab
          key={cat}
          flush
          light
          isActive={cat === currentCategory}
          onClick={() => this.onCatClick(cat)}
        >
          {this.props.videos[cat].label}
        </CategoryTab>
      )
    );
    return <Pad>{cats}</Pad>;
  }

  renderVideos() {
    const { videos } = this.props;
    const { currentCategory } = this.state;
    const { data } = videos[currentCategory];
    return (
      <VideosContainer>
        {data.map((vid, key) => this.renderVideo(vid, key))}
      </VideosContainer>
    );
  }

  renderVideo(vid, key) {
    const pic = idx(vid, _ => _.pictures.sizes[5].link);
    return (
      <VideoContainer key={key} onClick={e => this.playVideo(vid)}>
        <RatioBox
          key={key}
          antecedent={16}
          consequent={9}
          style={{ backgroundImage: `url(${pic})`, backgroundSize: "cover" }}
        >
          <RatioBoxContent />
        </RatioBox>
        <div>
          <Pad flushTop small>
            <Title flush light>
              {vid.name}
            </Title>
            <H4 light flush>
              {moment.duration(vid.duration, "seconds").humanize()}
            </H4>
          </Pad>
        </div>
      </VideoContainer>
    );
  }

  async playVideo(vid) {
    const containerEl = this.containerEl.current;
    await anime({
      targets: containerEl,
      opacity: [1, 0],
      translateX: [0, 100],
      duration: 1000,
      easing: "easeInExpo"
    }).finished;

    const playerEl = this.playerEl.current;
    const player = new Player(playerEl, {
      url: vid.link,
      width: playerEl.offsetWidth
    });
    this.player = player;
    await player.ready();

    const playerContainerEl = this.playerContainerEl.current;
    await anime({
      targets: playerContainerEl,
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 0,
      easing: "easeInExpo"
    }).finished;

    const wrapperEl = this.wrapperEl.current;
    const wrapperHeight = wrapperEl.offsetHeight;
    const playerHeight = playerContainerEl.offsetHeight;
    await anime({
      targets: wrapperEl,
      height: [wrapperHeight, playerHeight],
      duration: 1000,
      easing: "easeInOutExpo"
    }).finished;

    player.play();
    player.on("play", () => {
      this.setState({ isPlayingVid: true });
    });
  }

  closeVideo = async () => {
    this.player.pause();
    const playerContainerEl = this.playerContainerEl.current;
    await anime({
      targets: playerContainerEl,
      opacity: [1, 0],
      translateX: [0, 100],
      duration: 1000,
      easing: "easeInExpo"
    }).finished;

    const wrapperEl = this.wrapperEl.current;
    const containerEl = this.containerEl.current;
    const wrapperHeight = wrapperEl.offsetHeight;
    const containerHeight = containerEl.offsetHeight;
    await anime({
      targets: wrapperEl,
      height: [wrapperHeight, containerHeight],
      duration: 1000,
      easing: "easeInOutExpo"
    }).finished;

    await this.player.destroy();
    this.player = null;

    this.setState({ isPlayingVid: false }, () => {
      anime({
        targets: containerEl,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 1000,
        easing: "easeInExpo"
      });
    });
  };

  async onCatClick(cat) {
    const opts = {
      targets: this.videosContainerEl.current,
      duration: 1000,
      easing: "easeInOutQuint"
    };
    await anime({
      ...opts,
      translateX: [0, 100],
      opacity: [1, 0]
    }).finished;
    this.setState({ currentCategory: cat }, () => {
      anime({
        ...opts,
        translateX: [100, 0],
        opacity: [0, 1]
      });
    });
  }
}
