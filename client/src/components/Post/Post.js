// @flow
import * as React from "react";
import { Link } from "react-router-dom";
import showdown from "showdown";
import moment from "moment";
import idx from "idx";
import anime from "animejs";
import { MdArrowBack } from "react-icons/md";
import { H1, P } from "../../styles/typography";
import { Container, RatioBox, RatioBoxContent } from "../../styles/layouts";
import Avatar from "../Avatar";
import { Pad } from "../../styles/spacing";
import {
  PostContainer,
  PostWrapper,
  PostContent,
  PostBack,
  PostBackIcon,
  PostBody,
  PostTitleContainer,
  PostTitle,
  PostAvatarContainer
} from "./PostStyles";
import { BASE_SPACING_UNIT } from "../../styles/style-config";

import Footer from "../../components/Footer";

showdown.setFlavor("github");
const converter = new showdown.Converter();

type Props = {
  post: Object
};

class Post extends React.Component<Props> {
  wrapperEl: ?HTMLDivElement = null;

  componentDidMount() {
    const baseAnimation = {
      opacity: [0, 1],
      translateX: [`-${BASE_SPACING_UNIT * 8}px`, 0],
      easing: "easeInOutSine",
      duration: 800
    };
    anime({
      ...baseAnimation,
      targets: this.wrapperEl
    });
  }

  createMarkup(): Object {
    return { __html: converter.makeHtml(this.props.post.body) };
  }

  render() {
    const { post } = this.props;
    const avatarUrl = idx(post, _ => _.photo.user.profile_image.medium);
    return (
      <PostContainer>
        <Container>
          <PostWrapper innerRef={el => (this.wrapperEl = el)}>
            <PostContent>
              <RatioBox rounded antecedent={16} consequent={9}>
                <RatioBoxContent rounded>
                  <PostBack>
                    <Link to="/">
                      <PostBackIcon>
                        <MdArrowBack />
                      </PostBackIcon>
                    </Link>
                  </PostBack>
                  <img src={post.photo.urls.regular} alt="post hero" />
                </RatioBoxContent>
              </RatioBox>
              <PostTitleContainer>
                <PostTitle>
                  <H1 flush>{post.title}</H1>
                </PostTitle>
                {avatarUrl && (
                  <PostAvatarContainer>
                    <Avatar url={avatarUrl}>
                      <P small flush>
                        {post.photo.user.name}
                      </P>
                      <P tiny flush>{`published ${moment(
                        post.createdAt
                      ).fromNow()}`}</P>
                    </Avatar>
                  </PostAvatarContainer>
                )}
              </PostTitleContainer>
              <Pad flushTop>
                <PostBody dangerouslySetInnerHTML={this.createMarkup()} />
              </Pad>
            </PostContent>
          </PostWrapper>
        </Container>
        <Footer />
      </PostContainer>
    );
  }
}

export default Post;
