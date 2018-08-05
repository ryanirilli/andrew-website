import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../styles/style-config";

const dynamicPad = props => {
  const {
    small,
    flushTop,
    flushRight,
    flushBottom,
    flushLeft,
    flushSides,
    flushEnds
  } = props;

  const mqSmallVal = BASE_SPACING_UNIT * (small ? 1 : 4);
  const mqMediumVal = BASE_SPACING_UNIT * (small ? 2 : 4);
  const mqLargeVal = BASE_SPACING_UNIT * (small ? 4 : 4);

  return css`
    ${MQ.small(
      css`
        padding: ${flushTop || flushEnds ? 0 : mqSmallVal}px
          ${flushRight || flushSides ? 0 : mqSmallVal}px
          ${flushBottom || flushEnds ? 0 : mqSmallVal}px
          ${flushLeft || flushSides ? 0 : mqSmallVal}px;
      `
    )};
    ${MQ.medium(
      css`
        padding: ${flushTop || flushEnds ? 0 : mqMediumVal}px
          ${flushRight || flushSides ? 0 : mqMediumVal}px
          ${flushBottom || flushEnds ? 0 : mqMediumVal}px
          ${flushLeft || flushSides ? 0 : mqMediumVal}px;
      `
    )};
    ${MQ.large(
      css`
        padding: ${flushTop || flushEnds ? 0 : mqLargeVal}px
          ${flushRight || flushSides ? 0 : mqLargeVal}px
          ${flushBottom || flushEnds ? 0 : mqLargeVal}px
          ${flushLeft || flushSides ? 0 : mqLargeVal}px;
      `
    )};
  `;
};

export const Pad = styled("div")`
  ${dynamicPad};
`;
