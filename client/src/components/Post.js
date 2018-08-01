// @flow
import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { H1, P } from "../styles/typography";
import { RatioBox, RatioBoxContent } from "../styles/layouts";
import { MQ } from "../styles/style-config";

const PostContent = styled("div")(
  MQ.medium(css({ padding: "3rem 7rem 0 7rem" })),
  MQ.large(css({ padding: "3rem 13rem 0 13rem" }))
);

const PostContainer = styled("div")(
  MQ.medium(css({ paddingBottom: "7.5rem" })),
  MQ.large(css({ paddingBottom: "15rem" }))
);

type Props = {
  post: Object
};

class Post extends React.Component<Props> {
  render() {
    const { post } = this.props;
    return (
      <PostContainer>
        <PostContent>
          <RatioBox antecedent={16} consequent={9}>
            <RatioBoxContent>
              <img src={post.photo.urls.regular} alt="post main photo" />
            </RatioBoxContent>
          </RatioBox>
          <H1>{post.title}</H1>
          <P>{post.body}</P>
        </PostContent>
      </PostContainer>
    );
  }
}

export default Post;
