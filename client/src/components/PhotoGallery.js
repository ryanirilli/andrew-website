// @flow
import * as React from "react";
import { FlexCenter } from "../styles/layouts";
import { css } from "emotion";
import styled from "react-emotion";
import { connect } from "react-redux";
import anime from "animejs";
import { fetchPhotos } from "../actions/app.actions";

const Container = styled("div")``;

const image = css`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
`;

const CurImage = styled("div")`
  ${image};
  z-index: 1;
`;

const NextImage = styled("div")`
  ${image};
  z-index: 0;
`;

type Props = {
  fetchPhotos: () => void,
  photos: ?Object
};

type State = {
  isAnimating: boolean,
  curImg: ?number,
  nextImg: ?number,
  interval: ?any
};

export class PhotoGallery extends React.Component<Props, State> {
  curEl: { current: null | HTMLDivElement } = React.createRef();
  nextEl: { current: null | HTMLDivElement } = React.createRef();
  state: State = {
    isAnimating: false,
    curImg: null,
    nextImg: null,
    interval: null
  };

  componentDidMount() {
    if (!this.props.photos) {
      this.props.fetchPhotos();
    }
  }

  componentDidUpdate() {
    if (!this.state.isAnimating && this.state.curImg != null) {
      this.setState(
        { isAnimating: true, interval: setInterval(this.animate, 4000) },
        () => {}
      );
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
    }
  }

  static getDerivedStateFromProps(nextProps: Props, nextState: State): State {
    if (nextProps.photos && nextState.curImg == null) {
      return {
        ...nextState,
        curImg: 0,
        nextImg: 1
      };
    }
    return nextState;
  }

  render() {
    const { photos } = this.props;
    const { curImg, nextImg } = this.state;
    if (!photos || curImg == null || !nextImg == null) {
      return null;
    }
    return (
      <FlexCenter>
        <CurImage
          innerRef={this.curEl}
          style={{
            backgroundImage: `url('${photos[curImg]}')`
          }}
        />
        <NextImage
          innerRef={this.nextEl}
          style={{
            backgroundImage: `url('${photos[nextImg]}')`
          }}
        />
      </FlexCenter>
    );
  }

  static preloadImg(path: string): Promise<void> {
    return new Promise(resolve => {
      const img = new Image();
      img.src = path;
      img.onload = resolve;
    });
  }

  animate = async () => {
    const { photos } = this.props;
    const curEl = this.curEl.current;
    const nextEl = this.nextEl.current;
    if (curEl == null || nextEl == null || !photos) {
      return;
    }
    await anime({
      targets: curEl,
      opacity: [1, 0],
      duration: 2000,
      easing: "easeInOutQuart"
    }).finished;
    const curImg = this.state.nextImg;
    const nextImg =
      this.state.nextImg === photos.length - 1 ? 0 : this.state.nextImg + 1;
    await PhotoGallery.preloadImg(photos[nextImg]);
    this.setState(
      {
        curImg
      },
      () => {
        curEl.style.opacity = "1";
        this.setState({ nextImg });
      }
    );
  };
}

const mapStateToProps = state => ({
  photos: state.app.photos
});

const mapDispatchToProps = {
  fetchPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
