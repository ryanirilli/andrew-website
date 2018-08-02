// @flow

import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./routes/home/Home";
import PostDetail from "./routes/post-detail/PostDetail";

type Props = {};

class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:postId" component={PostDetail} />
        </Switch>
      </Router>
    );
  }
}

export default App;
