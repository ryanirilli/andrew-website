// @flow
import * as POSTS from "../action-types/posts.action-types";

type PostsState = {|
  +posts: ?Array<Object>,
  +activePost: ?Object
|};

const DEFAULT_STATE: PostsState = {
  posts: null,
  activePost: null
};

export default (state: PostsState = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
    case POSTS.SET_POSTS: {
      return {
        ...state,
        posts: action.posts
      };
    }
    case POSTS.SET_ACTIVE_POST: {
      return {
        ...state,
        activePost: action.post
      };
    }
    default:
      return state;
  }
};
