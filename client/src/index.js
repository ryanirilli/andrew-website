import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import ResizeObserver from "resize-observer-polyfill";
import { getBreakpointNameFromWidth } from "./styles/style-config";

import registerServiceWorker from "./registerServiceWorker";

import { setBreakpointName } from "./actions/app.actions";

import appReducer from "./reducers/app.reducer";

export const store = createStore(
  combineReducers({ app: appReducer }),
  applyMiddleware(thunk)
);

const ro = new ResizeObserver(entries => {
  const { width } = entries[0].contentRect;
  const breakpointName = getBreakpointNameFromWidth(width);
  store.dispatch(setBreakpointName(breakpointName));
});
ro.observe(document.body);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
