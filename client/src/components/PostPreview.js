// @flow

import * as React from "react";
import styled from "react-emotion";
import { P } from "../styles/typography";
import { COLORS } from "../styles/colors";
import { RatioBox, RatioBoxContent } from "../styles/layouts";

const PostContainer = styled("div")`
  cursor: pointer;
  :hover {
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
        <RatioBox rounded antecedent={16} consequent={9}>
          <RatioBoxContent rounded>
            <PostImg
              innerRef={el => (this.imgEl = el)}
              src={post.photo.urls.regular}
              alt="post"
            />
          </RatioBoxContent>
        </RatioBox>
        <TitleComponent>{post.title}</TitleComponent>
        <P small={small}>{post.preview}</P>
      </PostContainer>
    );
  }
}
