import styled from "react-emotion";
import { BASE_SPACING_UNIT } from "../styles/style-config";

export const Pad = styled("div")(props => {
  return {
    padding: `${BASE_SPACING_UNIT * 4}px`
  };
});
