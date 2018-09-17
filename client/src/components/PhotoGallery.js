// @flow
import * as React from "react";
import { FlexCenter } from "../styles/layouts";
import styled from "react-emotion";
import { connect } from "react-redux";
import anime from "animejs";
import {
  requestInterval,
  clearRequestInterval
} from "../utils/request-interval";
import { fetchPhotos } from "../actions/app.actions";

let curImg = 0;
let nextImg = 1;
let isPreloading = false;

const Image = styled("div")`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
`;

type Props = {
  fetchPhotos: () => void,
  photos: ?Object
};

type State = {
  isAnimating: boolean,
  interval: ?any
};

export class PhotoGallery extends React.Component<Props, State> {
  imagesContainerEl: { current: null | HTMLDivElement } = React.createRef();
  state: State = {
    isAnimating: false,
    interval: null
  };

  componentDidMount() {
    if (!this.props.photos) {
      this.props.fetchPhotos();
    }
  }

  async componentDidUpdate() {
    const { isAnimating } = this.state;
    const { photos } = this.props;
    const imagesContainerEl = this.imagesContainerEl.current;
    if (!isAnimating && photos != null && imagesContainerEl != null) {
      await PhotoGallery.preloadImg(photos[curImg]);
      const el = imagesContainerEl.childNodes[curImg];
      // $FlowFixMe
      el.style.backgroundImage = `url(${photos[curImg]})`;
      // $FlowFixMe
      el.style.opacity = "0";
      await anime({
        targets: el,
        opacity: [0, 1],
        duration: 2000,
        easing: "easeInOutQuart"
      }).finished;
      this.setState({
        isAnimating: true,
        interval: requestInterval(this.animate, 4000)
      });
    }
  }

  componentWillUnmount() {
    const { interval } = this.state;
    if (interval) {
      clearRequestInterval(interval);
    }
  }

  render() {
    const { photos } = this.props;
    if (!photos) {
      return null;
    }
    return (
      <FlexCenter innerRef={this.imagesContainerEl}>
        {photos.map((url, i) => (
          <Image
            key={i}
            style={{
              zIndex: photos.length - i
            }}
          />
        ))}
      </FlexCenter>
    );
  }

  static preloadImg(path: string): Promise<void> {
    return new Promise(resolve => {
      const img = document.createElement("img");
      img.src = path;
      img.onload = resolve;
    });
  }

  animate = async () => {
    const { photos } = this.props;
    const imagesContainerEl = this.imagesContainerEl.current;
    if (isPreloading || !photos || !imagesContainerEl) {
      return;
    }
    isPreloading = true;
    await PhotoGallery.preloadImg(photos[nextImg]);
    isPreloading = false;
    // $FlowFixMe
    imagesContainerEl.childNodes[nextImg].style.backgroundImage = `url(${
      photos[nextImg]
    })`;
    const el = imagesContainerEl.childNodes[curImg];
    if (nextImg === 0) {
      await anime({
        targets: imagesContainerEl.childNodes[0],
        opacity: [0, 1],
        duration: 2000,
        easing: "easeInOutQuart"
      }).finished;
      photos.forEach((url, i) => {
        // $FlowFixMe
        imagesContainerEl.childNodes[i].style.opacity = "1";
      });
    } else {
      await anime({
        targets: el,
        opacity: [1, 0],
        duration: 2000,
        easing: "easeInOutQuart"
      }).finished;
    }
    curImg = nextImg;
    nextImg = nextImg === photos.length - 1 ? 0 : nextImg + 1;
  };
}

const mapStateToProps = state => ({
  photos: state.app.photos
});

const mapDispatchToProps = {
  fetchPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
