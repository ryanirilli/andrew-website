import styled from "react-emotion";
import { MAX_WIDTH as maxWidth } from "./style-config";
export const Container = styled("div")(props => ({
  maxWidth,
  margin: "0 auto"
}));
