// @flow
import * as React from "react";
import styled from "react-emotion";

import { Pad } from "../styles/spacing";

const Container = styled("div")`
  position: fixed;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

type Props = {};

export default class TopNav extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Pad />
      </Container>
    );
  }
}
