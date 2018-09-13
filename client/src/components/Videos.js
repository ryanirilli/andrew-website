// @flow
import * as React from "react";
import Player from "@vimeo/player";
import styled from "react-emotion";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  iframe {
    display: block;
  }
`;

const Thumbs = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  img {
    display: block;
  }
`;

type Props = {
  videos: Object,
  type: string
};

type State = {
  currentVid: ?Object
};

export default class Videos extends React.Component<Props, State> {
  playerEl: { current: null | HTMLDivElement } = React.createRef();
  player: ?Object;
  state: State = {
    currentVid: null
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
      currentVid: featuredVid
    });
    const id = Videos.getVideoId(featuredVid);
    this.player = new Player("player", {
      id,
      width: el.offsetWidth,
      autoplay: true
    });
  }
  render() {
    const { videos } = this.props;
    return (
      <React.Fragment>
        <Container>
          <div>
            <div ref={this.playerEl} id="player" />
          </div>
        </Container>
        <Thumbs>{videos.data.map(this.renderVideo)}</Thumbs>
      </React.Fragment>
    );
  }

  renderVideo = (vid: Object, key?: number): React.Node => {
    return (
      <div key={key} onClick={e => this.playVideo(vid)}>
        <img src={vid.pictures.sizes[3].link} />
      </div>
    );
  };

  static getVideoId(vid: Object): string {
    return vid.uri.split("/").slice(-1)[0];
  }

  async playVideo(vid: Object) {
    const { player } = this;
    if (!player) {
      return;
    }
    await player.loadVideo(Videos.getVideoId(vid));
    await player.setAutopause(false);
    player.play();
  }
}
