// @flow
import * as APP from "../action-types/app.action-types";

type AppState = {|
  +breakpoint: ?string,
  +videos: ?Object,
  +photos: ?Object
|};

const DEFAULT_STATE: AppState = {
  breakpoint: null,
  videos: null,
  photos: null
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
    case APP.SET_PHOTOS: {
      return {
        ...state,
        photos: action.photos
      };
    }
    default:
      return state;
  }
};
