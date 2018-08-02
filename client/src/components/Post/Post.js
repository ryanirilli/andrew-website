// @flow
import * as React from "react";
import showdown from "showdown";
import moment from "moment";
import idx from "idx";
import { H1, P } from "../../styles/typography";
import { Container, RatioBox, RatioBoxContent } from "../../styles/layouts";
import Avatar from "../Avatar";
import { Pad } from "../../styles/spacing";
import * as Styled from "./PostStyles";

showdown.setFlavor("github");
const converter = new showdown.Converter();

type Props = {
  post: Object
};

class Post extends React.Component<Props> {
  createMarkup(): Object {
    return { __html: converter.makeHtml(this.props.post.body) };
  }

  render() {
    const { post } = this.props;
    const avatarUrl = idx(post, _ => _.photo.user.profile_image.medium);
    return (
      <Styled.PostContainer>
        <Container>
          <Styled.PostWrapper>
            <Styled.PostContent>
              <RatioBox rounded antecedent={16} consequent={9}>
                <RatioBoxContent>
                  <img src={post.photo.urls.regular} alt="post main photo" />
                  <Styled.PostTitleContainer bottom="0px" left="0px">
                    <Styled.PostTitle>
                      <Pad>
                        <H1>{post.title}</H1>
                      </Pad>
                    </Styled.PostTitle>
                    {avatarUrl && (
                      <Styled.AvatarContainer>
                        <Avatar url={avatarUrl}>
                          <P small flush>
                            {post.photo.user.name}
                          </P>
                          <P tiny flush>{`published ${moment(
                            post.createdAt
                          ).fromNow()}`}</P>
                        </Avatar>
                      </Styled.AvatarContainer>
                    )}
                  </Styled.PostTitleContainer>
                </RatioBoxContent>
              </RatioBox>
              <Pad>
                <Styled.PostBody
                  dangerouslySetInnerHTML={this.createMarkup()}
                />
              </Pad>
            </Styled.PostContent>
          </Styled.PostWrapper>
        </Container>
      </Styled.PostContainer>
    );
  }
}

export default Post;
