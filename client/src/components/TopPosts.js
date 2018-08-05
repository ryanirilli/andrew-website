// @flow

import * as React from "react";
import styled from "react-emotion";
import { BASE_SPACING_UNIT } from "../styles/style-config";
import { Pad } from "../styles/spacing";

import { SectionHeading, H4, P } from "../styles/typography";

import Avatar from "../components/Avatar";

const PostContainer = styled("div")`
  display: flex;
  margin-bottom: ${BASE_SPACING_UNIT * 4}px;
`;

const PostImgContainer = styled("div")`
  margin-right: ${BASE_SPACING_UNIT * 2}px;
`;

const PostBody = styled("div")`
  padding-top: ${BASE_SPACING_UNIT}px;
`;

type Props = {|
  posts: Object
|};

export default class TopFivePosts extends React.Component<Props> {
  render() {
    return this.props.posts.map(this.renderPost);
  }

  renderPost(post: Object, key: number): React.Node {
    return (
      <PostContainer key={key}>
        <PostImgContainer>
          <Avatar url={post.photo.user.profile_image.medium} />
        </PostImgContainer>
        <PostBody>
          <H4 flush>{post.title}</H4>
          <P small>{post.preview}</P>
        </PostBody>
      </PostContainer>
    );
  }
}
