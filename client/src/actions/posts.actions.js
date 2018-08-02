import * as POSTS from "../action-types/posts.action-types";

const setPosts = (posts: Array<Object>) => ({
  type: POSTS.SET_POSTS,
  posts
});

export const setActivePost = (post: ?Object) => ({
  type: POSTS.SET_ACTIVE_POST,
  post
});

export const getPosts = (): Function => {
  return async dispatch => {
    const req = await fetch("/api/v1/all-posts");
    if (req.ok) {
      const data = await req.json();
      dispatch(setPosts(data));
    }
  };
};

export const getPost = (postId: string): Function => {
  return async dispatch => {
    const req = await fetch(`/api/v1/post/${postId}`);
    if (req.ok) {
      const data = await req.json();
      dispatch(setActivePost(data));
    }
  };
};
