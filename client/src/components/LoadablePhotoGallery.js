// @flow
import * as React from "react";
import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./PhotoGallery"),
  loading: () => <div>Loading</div>
});
