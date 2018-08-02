// @flow

import * as React from "react";
import { connect } from "react-redux";
import Post from "../../components/Post/Post";
import TopNav from "../../components/TopNav";

import { getPost, setActivePost } from "../../actions/posts.actions";

type Props = {
  getPost: Function,
  setActivePost: Function,
  post: ?Object,
  match: Object
};

class PostDetail extends React.Component<Props> {
  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
  }

  componentWillUnmount() {
    this.props.setActivePost(null);
  }

  render() {
    const { post } = this.props;
    return (
      <React.Fragment>
        <TopNav />
        {post && <Post post={post} />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.activePost
});

const mapDispatchToProps = {
  getPost,
  setActivePost
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
