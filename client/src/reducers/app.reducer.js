// @flow
import * as APP from "../action-types/app.action-types";

type AppState = {|
  +breakpoint: ?string,
  +videos: ?Object
|};

const DEFAULT_STATE: AppState = {
  breakpoint: null,
  videos: null
};

export default (state: AppState = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
    case APP.SET_BREAKPOINT: {
      return {
        ...state,
        breakpoint: action.breakpoint
      };
    }
    case APP.SET_VIDEOS: {
      return {
        ...state,
        videos: action.videos
      };
    }
    default:
      return state;
  }
};
