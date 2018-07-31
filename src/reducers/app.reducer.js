// @flow

type AppState = {|
  breakpoint: ?string
|};

const DEFAULT_STATE: AppState = {
  breakpoint: null
};

export default (state: AppState = DEFAULT_STATE, action: Object) => {
  switch (action.type) {
    default:
      return state;
  }
};
