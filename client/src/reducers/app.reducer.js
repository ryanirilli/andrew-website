// @flow
import * as APP from "../action-types/app.action-types";

type AppState = {|
  +breakpoint: ?string
|};

const DEFAULT_STATE: AppState = {
  breakpoint: null
};

export default (state: AppState = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
    case APP.SET_BREAKPOINT: {
      return {
        ...state,
        breakpoint: action.breakpoint
      };
    }
    default:
      return state;
  }
};
