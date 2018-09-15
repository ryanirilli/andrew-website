// @flow
import * as React from "react";
import styled from "react-emotion";
import COLORS from "./../styles/colors";

const Container = styled("div")`
  display: inline-flex;
  align-items: center;
  background: ${COLORS.activeColor};
  color: white;
  padding: 4px 12px 4px 8px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: 100;
  margin-top: 16px;
`;

const Play = styled("svg")`
  width: 12px;
  margin: 0 4px 0 0;
`;

type Props = {};

export default class Reel extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Container>
          <Play viewBox="0 0 30 35">
            <path fill="white" d="M6 4l20 12-20 12z" />
          </Play>
          Play Reel
        </Container>
      </React.Fragment>
    );
  }
}
