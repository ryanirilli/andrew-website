import * as React from "react";
import styled from "react-emotion";
import { css, keyframes } from "emotion";
import idx from "idx";
import Player from "@vimeo/player";

import { RatioBox, RatioBoxContent } from "../styles/layouts";
import { H2, H3 } from "../styles/typography";
import { Pad } from "../styles/spacing";
import moment from "moment/moment";

const Container = styled("div")`
  overflow: auto;
  background: black;
  position: relative;
`;

const Title = styled(H2)`
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
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const videoContainerProps = props => css`
  animation: ${props.isPlayingVid
    ? `${fadeOut} 500ms ease forwards`
    : `${fadeIn} 500ms ease forwards`};
`;

const VideoContainer = styled("div")`
  width: 40vw;
  flex: 0 0 auto;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.3);
  position: relative;
  ${videoContainerProps};
`;

const VideoInfoContainer = styled("div")`
  color: white;
`;

const videoPlayerProps = props => css`
  iframe {
     opacity: ${props.showPlayer ? 1 : 0};
  } 
  animation: ${
    !props.isPlayingVid
      ? `${fadeOut} 500ms ease forwards`
      : `${fadeIn} 500ms ease forwards`
  };w
`;

const VideoPlayer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 1;
  transition: opacity 1s ease;

  ${videoPlayerProps};
`;

export default class VideoGallery extends React.Component {
  constructor(props: Props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isPlayingVid && this.state.isPlayingVid) {
      this.playVideo();
    }
  }

  state = {
    isPlayingVid: false,
    showPlayer: false,
    currentVid: null
  };

  render() {
    const { videos } = this.props;
    return Object.keys(videos).map(category =>
      this.renderCategory(videos[category], category)
    );
  }
  renderCategory(category, key) {
    const { isPlayingVid } = this.state;
    const { data } = category;
    return (
      <Container key={key}>
        {isPlayingVid && this.renderPlayer()}
        <VideosContainer>
          {data.map((vid, key) => this.renderVid(vid, key))}
        </VideosContainer>
      </Container>
    );
  }
  renderVid(vid, key) {
    const { isPlayingVid } = this.state;
    const pic = idx(vid, _ => _.pictures.sizes[5].link);
    return (
      <VideoContainer
        key={key}
        onClick={e => this.setCurVid(vid)}
        isPlayingVid={isPlayingVid}
      >
        <RatioBox
          key={key}
          antecedent={16}
          consequent={9}
          style={{ background: `url(${pic})`, backgroundSize: "cover" }}
        >
          <RatioBoxContent />
        </RatioBox>
        <VideoInfoContainer>
          <Pad flushLeft={key !== 0}>
            <Title flush innerRef={this.previewTitleEl}>
              {vid.name}
            </Title>
            <H3 flush innerRef={this.previewSubTitleEl}>
              {moment.duration(vid.duration, "seconds").humanize()}
            </H3>
          </Pad>
        </VideoInfoContainer>
      </VideoContainer>
    );
  }
  renderPlayer() {
    return (
      <VideoPlayer
        isPlayingVid
        showPlayer={this.state.showPlayer}
        id="player"
      />
    );
  }
  setCurVid(vid) {
    this.setState({
      isPlayingVid: true,
      currentVid: vid
    });
  }
  async playVideo() {
    const { currentVid } = this.state;
    const player = new Player("player", {
      url: currentVid.link,
      width: window.innerWidth
    });
    player.play();
    player.on("play", data => {
      this.setState({ showPlayer: true });
    });
  }
}
