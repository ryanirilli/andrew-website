//@ flow
import * as APP from "../action-types/app.action-types";

export const setBreakpointName = (breakpoint: string): void => {
  return {
    type: APP.SET_BREAKPOINT,
    breakpoint
  };
};
