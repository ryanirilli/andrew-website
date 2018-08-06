import styled from "react-emotion";
import { css } from "emotion";
import { BASE_SPACING_UNIT, MQ } from "../../styles/style-config";
import { COLORS } from "../../styles/colors";

export const PostWrapper = styled("div")(
  MQ.medium(css({ padding: "3rem 7rem 0 7rem" })),
  MQ.large(css({ padding: "1rem 13rem 0 13rem" }))
);

export const PostContent = styled("div")``;

export const PostContainer = styled("div")();

export const PostBack = styled("div")`
  position: absolute;
  right: ${BASE_SPACING_UNIT * 2}px;
  top: ${BASE_SPACING_UNIT * 2}px;
  border-radius: ${BASE_SPACING_UNIT * 2}px;
  padding: ${BASE_SPACING_UNIT * 2}px;
  color: ${COLORS.brandSecondary};
  background: ${COLORS.white};
  z-index: 1;
  a {
    color: ${COLORS.brandSecondary};
    text-decoration: none;
  }
  ${MQ.small(
    css`
      font-size: 2rem;
    `
  )};
  ${MQ.medium(
    css`
      font-size: 1rem;
    `
  )};
`;

export const PostBackIcon = styled("span")`
  display: inline-block;
  transform: translateY(3px);
`;

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
