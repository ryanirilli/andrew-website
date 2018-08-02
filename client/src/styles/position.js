import { css } from "emotion";

export const absolutePosition = props => css`
  position: absolute;
  top: ${props.top || "auto"};
  right: ${props.right || "auto"};
  bottom: ${props.bottom || "auto"};
  left: ${props.left || "auto"};
  width: 100%;
`;
