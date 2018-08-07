// @flow

import * as React from "react";
import styled from "react-emotion";
import moment from "moment";
import numbro from "numbro";
import { BASE_SPACING_UNIT } from "../styles/style-config";
import { COLORS } from "../styles/colors";
import { MdFavorite } from "react-icons/md";
import { H4, P } from "../styles/typography";
import Avatar from "../components/Avatar";

const PostContainer = styled("div")`
  display: flex;
  margin-bottom: ${BASE_SPACING_UNIT * 4}px;
  cursor: pointer;
  :hover {
    h4 {
      color: ${COLORS.brand};
    }
    p {
      color: ${COLORS.darkGrey};
    }
  }
`;

const PostImgContainer = styled("div")`
  margin-right: ${BASE_SPACING_UNIT * 2}px;
`;

const PostBody = styled("div")`
  padding-top: ${BASE_SPACING_UNIT}px;
`;

const PostMeta = styled(P)`
  color: ${COLORS.lightGrey};
  font-size: 0.8rem !important;
  border-top: 1px solid;
  margin-top: ${BASE_SPACING_UNIT * 2}px;
  padding: ${BASE_SPACING_UNIT}px ${BASE_SPACING_UNIT}px 0 0;
`;

type Props = {|
  posts: Object,
  onClick: string => any
|};

export default class TopFivePosts extends React.Component<Props> {
  render() {
    return this.props.posts.map(this.renderPost);
  }

  renderPost = (post: Object, key: number): React.Node => {
    return (
      <PostContainer
        onClick={e => this.props.onClick(`/posts/${post.id}`)}
        key={key}
      >
        <PostImgContainer>
          <Avatar url={post.photo.user.profile_image.medium} />
        </PostImgContainer>
        <PostBody>
          <H4 flush>{post.title}</H4>
          <P small flush>
            {post.preview}
          </P>
          <PostMeta>
            {moment(post.createdAt).format("MMM DD")} <MdFavorite />{" "}
            {numbro(post.favorites).format({ thousandSeparated: true })}
          </PostMeta>
        </PostBody>
      </PostContainer>
    );
  };
}
