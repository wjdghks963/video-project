import styled, { css, keyframes } from "styled-components";

export const theme = {
  changeBgColor: {
    on: "#5382eb",
    off: "#f0f6fd",
  },
  changeTxtColor: {
    on: "white",
    off: "#909090",
  },

  blue: "#5382eb",
  inputBox: {
    borderRadius: "5px",
    border: "1px gray solid",
  },

  processBarFade: keyframes`
  0% {
    opacity: 1;
  }
  50%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`,
};
