// @flow
import * as React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";

import gmailImage from "./../images/gmail.svg";
import instagramImage from "./../images/instagram.svg";
import twitterImage from "./../images/twitter.svg";

import { Pad } from "../styles/spacing";

const Container = styled("div")`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: row-reverse;
`;

const Content = styled("div")`
  background: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: inline-flex;
`;

const NavContainer = styled("div")`
  display: flex;
  align-items: center;
  a {
    padding: 8px 12px;
    text-transform: uppercase;
    text-decoration: none;
    color: black;
  }
`;

type Props = {
  onNav: (path: string) => void
};

export default class TopNav extends React.Component<Props> {
  render() {
    return (
      <Container>
        <Pad>
          <Content>
            <NavContainer>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  this.props.onNav("/about");
                }}
              >
                <span>about</span>
              </a>
              <a href="https://www.instagram.com/awfranks/">
                <img src={instagramImage} />
              </a>
            </NavContainer>
          </Content>
        </Pad>
      </Container>
    );
  }
}
