import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import styled from "react-emotion";
import { css } from "emotion";

export const PostWrapper = styled("div")(
  MQ.medium(css({ padding: "3rem 7rem 0 7rem" })),
  MQ.large(css({ padding: "1rem 13rem 0 13rem" }))
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
  display: flex;
  ${MQ.small(
    css`
      flex-direction: column;
      align-items: flex-start;
      padding: ${BASE_SPACING_UNIT * 4}px ${BASE_SPACING_UNIT * 4}px 0
        ${BASE_SPACING_UNIT * 4}px;
    `
  )};
  ${MQ.medium(
    css`
      flex-direction: row;
      align-items: center;
      padding: ${BASE_SPACING_UNIT * 4}px 0;
    `
  )};
`;

export const PostTitle = styled("div")`
  flex: 1;
`;

export const PostAvatarContainer = styled("div")`
  ${MQ.small(
    css`
      padding-top: ${BASE_SPACING_UNIT * 4}px;
    `
  )};
  ${MQ.medium(
    css`
      padding-top: 0;
    `
  )};
`;
