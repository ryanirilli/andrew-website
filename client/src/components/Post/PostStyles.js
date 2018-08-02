import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import { COLORS } from "../../styles/colors";
import styled from "react-emotion";
import { css } from "emotion";
import { absolutePosition } from "../../styles/position";

export const PostWrapper = styled("div")(
  MQ.medium(css({ padding: "3rem 7rem 0 7rem" })),
  MQ.large(css({ padding: "2rem 13rem 0 13rem" }))
);

export const PostContent = styled("div")``;

export const PostContainer = styled("div")(
  MQ.medium(css({ paddingBottom: "7.5rem" })),
  MQ.large(css({ paddingBottom: "15rem" }))
);

export const PostBody = styled("div")(
  css`
    img {
      width: auto;
      max-width: 100%;
      display: block;
      margin: ${BASE_SPACING_UNIT * 8}px auto 0 auto;
    }
    ${MQ.small(
      css`
        padding-top: ${BASE_SPACING_UNIT}px;
      `
    )} ${MQ.medium(
      css`
        padding-top: ${BASE_SPACING_UNIT * 8}px;
      `
    )};
  `
);

export const PostTitleContainer = styled("div")`
  ${absolutePosition};
  display: flex;
  ${MQ.small(
    css`
      flex-direction: column;
      padding-bottom: ${BASE_SPACING_UNIT * 4}px;
      background: ${COLORS.whiteSemiTransparent};
    `
  )};
  ${MQ.medium(
    css`
      flex-direction: row;
      background: ${COLORS.white};
    `
  )};
`;

export const PostTitle = styled("div")`
  flex: 1;
`;

export const AvatarContainer = styled("div")`
  ${MQ.small(
    css`
      padding-top: 0;
      padding-left: ${BASE_SPACING_UNIT * 4}px;
    `
  )} ${MQ.medium(css`
    padding-top: ${BASE_SPACING_UNIT * 4}px;
  `)};
`;
