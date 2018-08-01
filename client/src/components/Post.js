// @flow
import * as React from "react";
import showdown from "showdown";
import moment from "moment";
import styled from "react-emotion";
import idx from "idx";
import { css } from "emotion";
import { H1, P } from "../styles/typography";
import { Container, RatioBox, RatioBoxContent } from "../styles/layouts";
import AvatarContainer from "../components/Avatar";
import { Pad } from "../styles/spacing";
import { MQ, BASE_SPACING_UNIT } from "../styles/style-config";
import BlueHeader from "../images/explainer-bg-blue.jpg";
showdown.setFlavor("github");
const converter = new showdown.Converter();

const PostContent = styled("div")(
  MQ.medium(css({ padding: "3rem 7rem 0 7rem" })),
  MQ.large(css({ padding: "3rem 13rem 0 13rem" }))
);

const PostContainer = styled("div")(
  css`
    background: url(${BlueHeader}) no-repeat;
    background-size: contain;
  `,
  MQ.medium(css({ paddingBottom: "7.5rem" })),
  MQ.large(css({ paddingBottom: "15rem" }))
);

const PostBody = styled("div")(
  css`
    img {
      width: auto;
      max-width: 100%;
      display: block;
      margin: ${BASE_SPACING_UNIT * 8}px auto 0 auto;
    }
  `
);

type Props = {
  post: Object
};

class Post extends React.Component<Props> {
  createMarkup() {
    return { __html: converter.makeHtml(this.props.post.body) };
  }

  render() {
    const { post } = this.props;
    const avatarUrl = idx(post, _ => _.photo.user.profile_image.medium);
    return (
      <PostContainer>
        <Container>
          <PostContent>
            <RatioBox rounded antecedent={16} consequent={9}>
              <RatioBoxContent rounded>
                <img src={post.photo.urls.regular} alt="post main photo" />
              </RatioBoxContent>
            </RatioBox>
            <Pad>
              {avatarUrl && (
                <AvatarContainer
                  url={avatarUrl}
                  title={post.photo.user.name}
                  tagline={`published ${moment(post.createdAt).fromNow()}`}
                />
              )}
              <H1>{post.title}</H1>
              <PostBody dangerouslySetInnerHTML={this.createMarkup()} />
            </Pad>
          </PostContent>
        </Container>
      </PostContainer>
    );
  }
}

export default Post;
