// @flow

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { MQ } from "../../styles/style-config";
import { connect } from "react-redux";
import { Container, RatioBox, RatioBoxContent } from "../../styles/layouts";
import { H1, SectionHeading, P } from "../../styles/typography";
import { Pad } from "../../styles/spacing";

import Post from "../../components/Post/Post";
import TopNav from "../../components/TopNav";
import TopPosts from "../../components/TopPosts";

import { getPosts } from "../../actions/posts.actions";

const HomeLayout = styled("div")(
  css`
    margin-bottom: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${MQ.small(css`
      grid-template-areas: "c-main c-main c-main c-main" "sidebar sidebar sidebar sidebar" "c-left c-left c-left c-left" "c-right c-right c-right c-right";
    `)};
    ${MQ.medium(
      css`
        grid-template-areas: "sidebar c-main c-main c-main" "sidebar c-left c-left c-right";
      `
    )};
    ${MQ.large(css`
      grid-template-areas: "sidebar c-main c-main c-main" "sidebar c-left c-left c-right";
    `)};
  `
);

const HomeLayoutSidebar = styled("div")`
  grid-area: sidebar;
`;

const HomeLayoutContentMain = styled("div")`
  grid-area: c-main;
`;

const HomeLayoutContentLeft = styled("div")`
  grid-area: c-left;
`;

const HomeLayoutContentRight = styled("div")`
  grid-area: c-right;
`;

type Props = {
  getPosts: Function,
  posts: ?Object
};

class Home extends React.Component<Props> {
  componentDidMount() {
    const { posts } = this.props;
    !posts && this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    if (!posts) {
      return null;
    }
    return (
      <React.Fragment>
        <TopNav />
        <Pad flushTop>
          <Container>
            <HomeLayout>
              <HomeLayoutSidebar>
                <Pad flushEnds flushLeft>
                  <SectionHeading flush>Your Top Five</SectionHeading>
                  <TopPosts posts={posts.slice(9, 14)} />
                </Pad>
              </HomeLayoutSidebar>
              <HomeLayoutContentMain>
                <Pad flushSides flushTop>
                  <RatioBox rounded antecedent={16} consequent={9}>
                    <RatioBoxContent rounded>
                      <img
                        src={posts[0].photo.urls.regular}
                        alt="post main photo"
                      />
                    </RatioBoxContent>
                  </RatioBox>
                  <H1>{posts[0].title}</H1>
                  <P>{posts[0].preview}</P>
                </Pad>
              </HomeLayoutContentMain>
              <HomeLayoutContentLeft>
                <Pad flushLeft flushTop>
                  <RatioBox rounded antecedent={16} consequent={9}>
                    <RatioBoxContent rounded>
                      <img
                        src={posts[1].photo.urls.regular}
                        alt="post main photo"
                      />
                    </RatioBoxContent>
                  </RatioBox>
                </Pad>
              </HomeLayoutContentLeft>
              <HomeLayoutContentRight>
                <Pad flushSides flushTop>
                  <SectionHeading flush>Trending stories</SectionHeading>
                  <RatioBox rounded antecedent={16} consequent={9}>
                    <RatioBoxContent rounded>
                      <img
                        src={posts[5].photo.urls.regular}
                        alt="post main photo"
                      />
                    </RatioBoxContent>
                  </RatioBox>

                  <RatioBox rounded antecedent={16} consequent={9}>
                    <RatioBoxContent rounded>
                      <img
                        src={posts[6].photo.urls.regular}
                        alt="post main photo"
                      />
                    </RatioBoxContent>
                  </RatioBox>
                </Pad>
              </HomeLayoutContentRight>
            </HomeLayout>
          </Container>
        </Pad>
      </React.Fragment>
    );
  }

  renderPosts = (post, i) => {
    return <Post key={i} post={post} />;
  };
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
