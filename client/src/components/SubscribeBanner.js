// @flow

import * as React from "react";
import styled from "react-emotion";
import { COLORS } from "../styles/colors";

const BannerContainer = styled("div")`
  background: ${COLORS.brandSecondary};
  height: 300px;
  margin-bottom: 1000px;
`;

type Props = {};

export default class SubscribeBanner extends React.Component<Props> {
  render() {
    return <BannerContainer />;
  }
}
