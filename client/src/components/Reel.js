// @flow
import * as React from "react";
import PlayButton from "../images/play-button.svg";
import styled from "react-emotion";

const Container = styled("div")`
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 100px;
`;

const Play = styled("img")`
  width: 20px;
  margin: 0 4px 0 0;
`;

type Props = {};

export default class Reel extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Play src={PlayButton} />
        Reel
      </Container>
    );
  }
}
