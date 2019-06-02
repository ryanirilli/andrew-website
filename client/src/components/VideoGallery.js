import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import idx from "idx";
import Player from "@vimeo/player";
import { BarLoader } from "react-spinners";
import WindowSize from "@reach/window-size";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  position: relative;
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

const arrowSize = "50px";
const StyledSlider = styled(Slider)`
  .slick-prev {
    width: ${arrowSize};
    height: ${arrowSize};
    left: 20px;
    z-index: 1;
    :before {
      font-size: ${arrowSize};
    }
  }
  .slick-next {
    width: ${arrowSize};
    height: ${arrowSize};
    right: 20px;
    z-index: 1;
    :before {
      font-size: ${arrowSize};
    }
  }
`;

const Title = styled(H4)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: break-word;
`;

const VideoContainer = styled("div")`
  flex: 0 0 auto;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
  position: relative;
  padding-bottom: ${BASE_SPACING_UNIT * 4}px;
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
  top: 10px;
  right: 20px;
  z-index: 99;
  padding: 8px;
  border-radius: 100px;
  line-height: 0;
  cursor: pointer;
  transition: transform 250ms easeOut;
  transform: scale(1);
  :hover {
    transform: scale(1.1);
  }
`;

const categoryTabProps = props => css`
  color: ${props.isActive ? COLORS.white : "#6d6d6d"};
`;

const CategoryTab = styled(H4)`
  ${categoryTabProps} text-transform: uppercase;
  display: inline-block;
  cursor: pointer;
  ${MQ.small(css`
    margin-right: ${BASE_SPACING_UNIT * 4}px;
  `)} ${MQ.medium(css`
    margin-right: ${BASE_SPACING_UNIT * 8}px;
  `)};
`;

const AbsoluteCenter = styled("div")`
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`;

type Props = {
  videos: Object
};

export default class VideoGallery extends React.Component<Props> {
  wrapperEl = React.createRef();
  videosContainerEl = React.createRef();
  videosEl = React.createRef();
  playerContainerEl = React.createRef();
  containerEl = React.createRef();
  playerEl = React.createRef();
  player: null;

  state = {
    isShowingSpinner: false,
    isPlayingVid: false,
    currentCategory: Object.keys(this.props.videos)[0],
    categories: new Set(Object.keys(this.props.videos))
  };

  render() {
    const {
      categories,
      currentCategory,
      isPlayingVid,
      isShowingSpinner
    } = this.state;
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
        {isShowingSpinner && (
          <AbsoluteCenter>
            <BarLoader color="rgba(255, 255, 255, 0.25)" />
          </AbsoluteCenter>
        )}
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

  getSettings(size) {
    let numSlides;
    if (size.width <= 500) {
      numSlides = 1;
    } else if (size.width <= 1000) {
      numSlides = 2;
    } else {
      numSlides = 3;
    }
    return {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: numSlides,
      slidesToScroll: numSlides
    };
  }

  renderVideos() {
    const { videos } = this.props;
    const { currentCategory } = this.state;
    const { data } = videos[currentCategory];
    return (
      <WindowSize>
        {size => (
          <StyledSlider innerRef={this.videosEl} {...this.getSettings(size)}>
            {data.map((vid, key) => this.renderVideo(vid, key))}
          </StyledSlider>
        )}
      </WindowSize>
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
      duration: 500,
      easing: "easeInExpo"
    }).finished;

    this.setState({ isShowingSpinner: true });

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
      duration: 500,
      easing: "easeInOutExpo"
    }).finished;

    player.play();
    player.on("play", () => {
      this.setState({ isPlayingVid: true, isShowingSpinner: false });
    });
  }

  closeVideo = async () => {
    this.player.pause();
    const playerContainerEl = this.playerContainerEl.current;
    await anime({
      targets: playerContainerEl,
      opacity: [1, 0],
      translateX: [0, 100],
      duration: 500,
      easing: "easeInExpo"
    }).finished;

    this.setState({ isShowingSpinner: true });

    const wrapperEl = this.wrapperEl.current;
    const containerEl = this.containerEl.current;
    const wrapperHeight = wrapperEl.offsetHeight;
    const containerHeight = containerEl.offsetHeight;
    await anime({
      targets: wrapperEl,
      height: [wrapperHeight, containerHeight],
      duration: 500,
      easing: "easeInOutExpo"
    }).finished;

    await this.player.destroy();
    this.player = null;

    this.setState({ isPlayingVid: false, isShowingSpinner: false }, () => {
      anime({
        targets: containerEl,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 500,
        easing: "easeOutExpo"
      });
    });
  };

  async onCatClick(cat) {
    this.videosEl.current.scrollLeft = 0;
    const opts = {
      targets: this.videosContainerEl.current,
      duration: 500,
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
