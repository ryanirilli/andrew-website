// @flow
import * as React from "react";
import styled from "react-emotion";
import COLORS from "./../styles/colors";

const Container = styled("div")`
  display: inline-flex;
  align-items: center;
  background: ${COLORS.brand};
  color: white;
  padding: 4px 12px 4px 8px;
  border-radius: 100px;
  cursor: pointer;
  font-weight: 100;
  transition: box-shadow 500ms linear;
  will-change: box-shadow;
  box-shadow: 0 0 0 black;
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
          <Play viewBox="0 0 41.999 41.999">
            <path
              fill="white"
              d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40
	c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20
	c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z M7.5,39.095V2.904l26.239,18.096L7.5,39.095z"
            />
          </Play>
          Reel
        </Container>
      </React.Fragment>
    );
  }
}
