// @flow

import * as React from "react";
import { connect } from "react-redux";

import Post from "../../components/Post/Post";
import TopNav from "../../components/TopNav";
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
        <TopNav />
        {posts && posts.map(this.renderPosts)}
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
