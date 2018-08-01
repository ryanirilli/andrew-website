import * as React from "react";
import styled from "react-emotion";
import { COLORS, BASE_SPACING_UNIT } from "../styles/style-config";
import { P } from "../styles/typography";

type Props = {|
  url: string,
  title: string,
  tagline: string
|};

const AvatarContainer = styled("div")`
  display: flex;
  margin-bottom: ${BASE_SPACING_UNIT * 8}px;
`;

const Avatar = styled("div")`
  overflow: hidden;
  background: ${props => `url(${props.url}) no-repeat`};
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 4px solid ${COLORS.white};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin-right: ${BASE_SPACING_UNIT * 4}px;
`;

const AvatarContent = styled("div")`
  padding-top: ${BASE_SPACING_UNIT * 4}px;
`;

export default ({ url, title, tagline }: Props) => (
  <AvatarContainer>
    <Avatar url={url} />
    <AvatarContent>
      <P small bold flush>
        {title}
      </P>
      <P tiny flush>
        {tagline}
      </P>
    </AvatarContent>
  </AvatarContainer>
);
