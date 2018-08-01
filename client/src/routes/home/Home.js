// @flow

import * as React from "react";
import { connect } from "react-redux";

import { Pad } from "../../styles/spacing";
import { Container } from "../../styles/layouts";
import Post from "../../components/Post";
import { getPosts } from "../../actions/posts.actions";

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
    return (
      <React.Fragment>
        <Container>
          <Pad>{posts && posts.map(this.renderPosts)}</Pad>
        </Container>
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
