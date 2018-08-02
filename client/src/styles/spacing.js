import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";

const pad = props => css`
  ${MQ.small(
    css`
      padding: ${BASE_SPACING_UNIT * (props.small ? 1 : 4)}px;
    `
  )};
  ${MQ.medium(
    css`
      padding: ${BASE_SPACING_UNIT * (props.small ? 2 : 4)}px;
    `
  )};
  ${MQ.large(
    css`
      padding: ${BASE_SPACING_UNIT * (props.small ? 4 : 4)}px;
    `
  )};
`;

export const Pad = styled("div")`
  ${pad};
`;
