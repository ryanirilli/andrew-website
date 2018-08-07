// @flow
import * as React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import styled from "react-emotion";
import anime from "animejs";
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

import { COLORS } from "../styles/colors";
import Logo from "../images/logo@2x.png";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";

export const TopNavContainer = styled("div")`
  background: ${COLORS.white};
  padding: ${BASE_SPACING_UNIT * 4}px ${BASE_SPACING_UNIT * 4}px 0
    ${BASE_SPACING_UNIT * 4}px;
  display: flex;
  justify-content: center;
`;

export const TopNavContent = styled("div")``;

export const LogoContainer = styled("div")`
  text-align: center;
  margin: ${BASE_SPACING_UNIT}px 0;
`;

export const LogoImg = styled("img")`
  max-width: 150px;
`;

export const TopNavLinks = styled("ul")`
  list-style: none;
  padding: 0;
  a {
    color: ${COLORS.brandSecondary};
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 800;
    :hover {
      color: ${COLORS.brand};
    }
  }
  ${MQ.small(css`
    text-align: center;
    a {
      font-size: 1.563rem;
      line-height: 2;
    }
  `)};
  ${MQ.medium(css`
    display: flex;
    a {
      font-size: 0.707rem;
    }
  `)};
`;

export const TopNavLink = styled("li")`
  padding: 0 ${BASE_SPACING_UNIT * 4}px;
`;

const TopNavMenuContainer = styled("div")`
  z-index: 1;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

const MenuStyles = css`
  color: ${COLORS.brandSecondary};
  cursor: pointer;
  position: absolute;
  font-size: 1.563rem;
  left: ${BASE_SPACING_UNIT * 2}px;
  top: ${BASE_SPACING_UNIT * 2}px;
  :hover {
    color: ${COLORS.brand};
  }
`;

const TopNavMenuIcon = styled(MdMenu)`
  ${MenuStyles};
  top: ${BASE_SPACING_UNIT * 4}px;
  left: ${BASE_SPACING_UNIT * 4}px;
`;

const TopNavCloseIcon = styled(MdClose)`
  ${MenuStyles};
  left: auto;
  right: ${BASE_SPACING_UNIT * 2}px;
  color: ${COLORS.darkGrey};
`;

const TopNavMenu = styled("div")`
  position: absolute;
  background: ${COLORS.white};
  width: calc(100% - ${BASE_SPACING_UNIT * 4}px);
  z-index: 2;
  top: ${BASE_SPACING_UNIT * 2}px;
  left: ${BASE_SPACING_UNIT * 2}px;
  transform: translateY(-100%);
  border-radius: ${BASE_SPACING_UNIT}px;
`;

const TopNavMenuBg = styled("div")`
  background: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

type Props = {|
  breakpoint: ?string
|};

type State = {|
  isMenuOpen: boolean
|};

class TopNav extends React.Component<Props, State> {
  state: State = {
    isMenuOpen: false
  };
  isAnimating: boolean = false;
  topNavMenuEl: ?HTMLDivElement = null;
  topNavMenuBgEl: ?HTMLDivElement = null;

  componentDidUpdate(prevProps, prevState) {
    const wasMenuOpen = prevState.isMenuOpen;
    const { isMenuOpen } = this.state;
    if (isMenuOpen && !wasMenuOpen) {
      this.openMenu();
    }
  }

  openMenu() {
    anime({
      targets: this.topNavMenuEl,
      translateY: ["-100%", 0],
      duration: 800,
      easing: "easeOutCirc"
    });
  }

  render() {
    const { breakpoint } = this.props;
    const { isMenuOpen } = this.state;

    const links = (
      <TopNavLinks>
        <TopNavLink>
          <a href="#">about</a>
        </TopNavLink>
        <TopNavLink>
          <a href="#">platform</a>
        </TopNavLink>
        <TopNavLink>
          <a href="#">results</a>
        </TopNavLink>
        <TopNavLink>
          <a href="#">why better up?</a>
        </TopNavLink>
        <TopNavLink>
          <a href="#">sign up</a>
        </TopNavLink>
      </TopNavLinks>
    );

    if (breakpoint === "small") {
      return (
        <React.Fragment>
          <div onClick={this.toggleMenu}>
            <TopNavMenuIcon />
          </div>
          <Link to="/">
            <LogoContainer>
              <LogoImg src={Logo} alt="logo" />
            </LogoContainer>
          </Link>
          {isMenuOpen && (
            <TopNavMenuContainer>
              <TopNavMenu innerRef={el => (this.topNavMenuEl = el)}>
                <TopNavCloseIcon onClick={this.toggleMenu} />
                {links}
              </TopNavMenu>
              <TopNavMenuBg
                innerRef={el => (this.topNavMenuBgEl = el)}
                onClick={this.toggleMenu}
              />
            </TopNavMenuContainer>
          )}
        </React.Fragment>
      );
    }
    return (
      <TopNavContainer>
        <TopNavContent>
          <Link to="/">
            <LogoContainer>
              <LogoImg src={Logo} alt="logo" />
            </LogoContainer>
          </Link>
          <div>{links}</div>
        </TopNavContent>
      </TopNavContainer>
    );
  }

  toggleMenu = async () => {
    if (this.isAnimating) {
      return;
    }
    this.isAnimating = true;
    if (this.state.isMenuOpen) {
      anime({
        targets: this.topNavMenuEl,
        translateY: [0, "-100%"],
        opacity: [1, 0],
        duration: 600,
        easing: "easeOutCirc"
      });

      await anime({
        targets: this.topNavMenuBgEl,
        opacity: [1, 0],
        duration: 1000,
        easing: "easeOutCirc"
      }).finished;
    }
    this.isAnimating = false;
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };
}

const mapStateToProps = state => ({
  breakpoint: state.app.breakpoint
});

export default connect(mapStateToProps)(TopNav);
