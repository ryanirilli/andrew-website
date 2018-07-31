import * as POSTS from "../action-types/posts.action-types";
import type Action from "../reducers/posts.reducer";

const setPosts: Action = posts => ({
  type: POSTS.SET_POSTS,
  posts
});

export const getPosts = () => {
  return async dispatch => {
    const req = await fetch("/api/v1/all-posts");
    const data = await req.json();
    dispatch(setPosts(data));
  };
};
