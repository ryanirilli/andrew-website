// @flow
import * as POSTS from "../action-types/posts.action-types";

type AppState = {|
  +posts: ?Object
|};

export type Action = {| type: POSTS.SET_POSTS, posts: string |};

const DEFAULT_STATE: AppState = {
  posts: null
};

export default (state: AppState = DEFAULT_STATE, action: Action) => {
  switch (action.type) {
    case POSTS.SET_POSTS: {
      return {
        ...state,
        posts: action.posts
      };
    }
    default:
      return state;
  }
};
