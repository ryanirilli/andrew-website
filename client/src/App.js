// @flow

import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./routes/home/Home";

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    );
  }
}

export default App;
