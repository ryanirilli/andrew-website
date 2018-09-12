// @flow
import * as React from "react";
import { FlexCenter } from "../styles/layouts";
import styled from "react-emotion";

const Container = styled("div")`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;
type Props = {};

export default class PhotoGallery extends React.Component<Props> {
  render() {
    return (
      <FlexCenter>
        <Container
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522711311445-15860d7c6d9d')"
          }}
        />
      </FlexCenter>
    );
  }
}
