// @flow

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { P } from "../styles/typography";
import { COLORS } from "../styles/colors";
import { RatioBox, RatioBoxContent } from "../styles/layouts";
import { Pad } from "../styles/spacing";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";

const PostContainer = styled("div")`
  cursor: pointer;
  transform: translateY(0);
  transition: box-shadow 400ms ease, transform 400ms ease;
  margin-bottom: ${BASE_SPACING_UNIT * 4}px;
  img {
    width: 100%;
  }
  ${MQ.medium(css`
    :hover {
      transform: translateY(-${BASE_SPACING_UNIT}px);
      box-shadow: 0 ${BASE_SPACING_UNIT}px ${BASE_SPACING_UNIT * 4}px
        rgba(0, 0, 0, 0.15);
      h1,
      h2,
      h3,
      h4 {
        color: ${COLORS.brand};
      }
      p {
        color: ${COLORS.darkGrey};
      }
    }
  `)};
`;

const PostImg = styled("img")`
  opacity: 0;
  transition: opacity 1s ease;
`;

type Props = {
  onClick: string => any,
  post: Object,
  TitleComponent: Object,
  small?: boolean
};

export default class PostPreview extends React.Component<Props> {
  imgEl: ?HTMLImageElement = null;

  componentDidMount() {
    const { imgEl } = this;
    if (!imgEl) {
      return;
    }
    imgEl.onload = () => {
      imgEl.style.opacity = "1";
    };
  }

  render() {
    const { onClick, post, TitleComponent, small } = this.props;
    return (
      <PostContainer onClick={e => onClick(`/posts/${post.id}`)}>
        <RatioBox antecedent={16} consequent={9}>
          <RatioBoxContent>
            <PostImg
              innerRef={el => (this.imgEl = el)}
              src={post.photo.urls.regular}
              alt="post"
            />
          </RatioBoxContent>
        </RatioBox>
        <Pad flushEnds small>
          <TitleComponent>{post.title}</TitleComponent>
          <P small={small}>{post.preview}</P>
        </Pad>
      </PostContainer>
    );
  }
}
