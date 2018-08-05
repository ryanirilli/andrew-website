// @flow

import * as React from "react";
import { css } from "emotion";
import styled from "react-emotion";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";
import { COLORS } from "../styles/colors";

type Props = {|
  url: string,
  children?: ?React.Node
|};

const AvatarContainer = styled("div")`
  display: flex;
`;

const avatarBg = props => css`
  background: url(${props.url}) no-repeat;
  margin-right: ${props.hasChildren ? BASE_SPACING_UNIT * 4 : 0}px;
`;

const Avatar = styled("div")`
  ${avatarBg};
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  ${MQ.small(css`
    width: 35px;
    height: 35px;
    border: 2px solid ${COLORS.white};
  `)};
  ${MQ.medium(css`
    width: 50px;
    height: 50px;
    border: 4px solid ${COLORS.white};
  `)};
`;

const AvatarContent = styled("div")`
  ${MQ.medium(
    css`
      padding-top: ${BASE_SPACING_UNIT * 3}px;
    `
  )};
`;

export default ({ url, children }: Props) => (
  <AvatarContainer>
    <Avatar url={url} hasChildren={Boolean(children)} />
    {children && <AvatarContent>{children}</AvatarContent>}
  </AvatarContainer>
);
