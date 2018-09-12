// @flow
import * as React from "react";

type Props = {
  color?: ?string
};

export default class AndrewFranksLogo extends React.Component<Props> {
  render() {
    const color = this.props.color || "black";
    return (
      <svg
        width="193"
        height="145"
        viewBox="0 0 193 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="andrew-franks-logo">
          <path
            id="main-column"
            d="M102.5 136.5V13C102.5 10.5 101 8 97 5.5C93 3 88 0.5 81 0.5H135C135 0.5 127.5 1.5 125.5 3.5C123.5 5.5 123 7 123 13V136.5C123 138.5 123.5 140 125.5 142C127.5 144 135 145 135 145H90.5C90.5 145 97.5 143.5 99.5 142C101.5 140.5 102.5 138 102.5 136.5Z"
            fill={color}
          />
          <path
            id="a"
            d="M58.1247 73.5H94.5C90 73.5 82 76 77.5 79C73 82 69.5 84.5 64.5 91.5L35.9005 140.074C34.1033 143.126 30.8254 145 27.2832 145H0.5C0.5 145 7 144 9 143C11 142 11.5 141 13 138.5L49.579 78.3068C51.3927 75.3221 54.6322 73.5 58.1247 73.5Z"
            fill={color}
          />
          <path
            id="f-bottom"
            d="M164 58.5V88.5C164 88.5 162.5 77.5 148 73.5C164 70.5 164 58.5 164 58.5Z"
            fill={color}
          />
          <path
            id="f-top"
            d="M193 0.5H161.5C168 1.5 181 6 186.5 16.5C186.5 16.5 186.5 11.5 188 7.5C189.5 3.5 193 0.5 193 0.5Z"
            fill={color}
          />
        </g>
      </svg>
    );
  }
}
