// @flow

import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import anime from "animejs";

import { Container } from "../../styles/layouts";
import { H1, H2, H4, SectionHeading, postTitle } from "../../styles/typography";
import { Pad } from "../../styles/spacing";

import TopNav from "../../components/TopNav";
import TopPosts from "../../components/TopPosts";
import PostPreview from "../../components/PostPreview";
import SubscribeBanner from "../../components/SubscribeBanner";
import Footer from "../../components/Footer";

import { getPosts } from "../../actions/posts.actions";

const HomeLayout = styled("div")(
  css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${MQ.small(css`
      grid-template-areas: "c-main c-main c-main c-main" "sidebar sidebar sidebar sidebar" "c-left c-left c-left c-left" "c-right c-right c-right c-right";
    `)};
    ${MQ.medium(
      css`
        grid-template-areas: "sidebar sidebar c-main c-main" "sidebar sidebar c-left c-left" "c-right c-right c-right c-right";
      `
    )};
    ${MQ.large(css`
      grid-template-columns: 1fr 1fr 1fr 1fr;
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

const HomeLayoutTrending = styled("div")`
  display: flex;
  flex-wrap: wrap;
  ${MQ.small(css`
    > div {
      flex-basis: 100%;
    }
  `)};
  ${MQ.medium(css`
    flex-wrap: nowrap;
    > div {
      flex-basis: 33.33%;
      margin-right: ${BASE_SPACING_UNIT * 4}px;
    }
  `)};
  ${MQ.large(css`
    flex-wrap: wrap;
    > div {
      margin-right: 0;
      flex-basis: 100%;
    }
  `)};
`;

const HomeLayoutFeatured = styled("div")`
  display: flex;
  ${MQ.small(css`
    flex-wrap: wrap;
    > div {
      flex-basis: 100%;
    }
  `)};
  ${MQ.medium(css`
    flex-wrap: nowrap;
    > div {
      margin-right: ${BASE_SPACING_UNIT * 4}px;
      flex-basis: 50%;
      :last-child {
        margin-right: 0;
      }
    }
  `)};
  ${MQ.large(css`
    > div {
      margin-right: ${BASE_SPACING_UNIT * 8}px;
      :last-child {
        margin-right: 0;
      }
    }
  `)};
`;

const HeroTitle = styled(H1)`
  ${postTitle};
`;

const PostTitle = styled(H4)`
  ${postTitle};
`;

const MainTitle = styled(H2)`
  ${postTitle};
`;

type Props = {
  getPosts: Function,
  posts: ?Object,
  history: Object
};

class Home extends React.Component<Props> {
  homeHeroEl: ?HTMLDivElement = null;
  homeSidebarEl: ?HTMLDivElement = null;
  homeLeftEl: ?HTMLDivElement = null;
  homeRightEl: ?HTMLDivElement = null;
  homeLowerSectionEl: ?HTMLDivElement = null;

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
        <Pad flushEnds>
          <Container>
            <HomeLayout>
              <HomeLayoutSidebar innerRef={el => (this.homeSidebarEl = el)}>
                <Pad flushEnds flushLeft>
                  <SectionHeading flush>Your Top Five</SectionHeading>
                  <TopPosts
                    onClick={this.goToPost}
                    posts={posts.slice(9, 14)}
                  />
                </Pad>
              </HomeLayoutSidebar>
              <HomeLayoutContentMain innerRef={el => (this.homeHeroEl = el)}>
                <PostPreview
                  post={posts[0]}
                  onClick={e => this.goToPost(`/posts/${posts[0].id}`)}
                  TitleComponent={HeroTitle}
                />
              </HomeLayoutContentMain>
              <HomeLayoutContentLeft innerRef={el => (this.homeLeftEl = el)}>
                <Pad flushLeft flushTop>
                  <PostPreview
                    post={posts[1]}
                    onClick={e => this.goToPost(`/posts/${posts[1].id}`)}
                    TitleComponent={MainTitle}
                  />
                  <PostPreview
                    post={posts[2]}
                    onClick={e => this.goToPost(`/posts/${posts[2].id}`)}
                    TitleComponent={MainTitle}
                  />
                </Pad>
              </HomeLayoutContentLeft>
              <HomeLayoutContentRight innerRef={el => (this.homeRightEl = el)}>
                <Pad flushSides flushTop>
                  <SectionHeading flush>Trending stories</SectionHeading>
                  <HomeLayoutTrending>
                    <PostPreview
                      small
                      post={posts[5]}
                      onClick={e => this.goToPost(`/posts/${posts[5].id}`)}
                      TitleComponent={PostTitle}
                    />
                    <PostPreview
                      small
                      post={posts[6]}
                      onClick={e => this.goToPost(`/posts/${posts[6].id}`)}
                      TitleComponent={PostTitle}
                    />
                    <PostPreview
                      small
                      post={posts[7]}
                      onClick={e => this.goToPost(`/posts/${posts[7].id}`)}
                      TitleComponent={PostTitle}
                    />
                  </HomeLayoutTrending>
                </Pad>
              </HomeLayoutContentRight>
            </HomeLayout>
          </Container>
        </Pad>
        <div ref={el => (this.homeLowerSectionEl = el)}>
          <SubscribeBanner />
          <Pad>
            <Container>
              <HomeLayoutFeatured>
                <PostPreview
                  post={posts[3]}
                  onClick={e => this.goToPost(`/posts/${posts[3].id}`)}
                  TitleComponent={MainTitle}
                />
                <PostPreview
                  post={posts[4]}
                  onClick={e => this.goToPost(`/posts/${posts[4].id}`)}
                  TitleComponent={MainTitle}
                />
              </HomeLayoutFeatured>
            </Container>
          </Pad>
          <Footer />
        </div>
      </React.Fragment>
    );
  }

  goToPost = async (path: string): Promise<void> => {
    const baseAnimation = {
      opacity: [1, 0],
      translateX: [0, `${BASE_SPACING_UNIT * 16}px`],
      easing: "easeInOutSine",
      duration: 800
    };

    anime({
      ...baseAnimation,
      targets: this.homeSidebarEl
    });

    anime({
      ...baseAnimation,
      targets: this.homeHeroEl,
      delay: 100
    });

    anime({
      ...baseAnimation,
      targets: this.homeLeftEl,
      delay: 150
    });

    anime({
      ...baseAnimation,
      targets: this.homeLowerSectionEl,
      delay: 150
    });

    await anime({
      ...baseAnimation,
      targets: this.homeRightEl,
      delay: 200
    }).finished;

    this.props.history.push(path);
  };
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
