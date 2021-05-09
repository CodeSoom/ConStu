import React from 'react';

import emotionReset from 'emotion-reset';

import { Global, css, useTheme } from '@emotion/react';

import mq from './responsive';

const setGlobalStyles = ({ baseFont, baseTone, baseShadow }) => css`
  ${emotionReset}

  * {
    box-sizing: inherit;
  }

  body {
    color: ${baseFont};
    background: ${baseTone};
    text-shadow: ${baseShadow};
    font-family: 'Jua', sans-serif;
    transition: all 0.25s linear 0s;
  }

  input {
    border: none;
    outline:none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  code {
    line-height: 25px;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    font-family: 'D2Coding', monospace;
    padding: 0.2rem 0.4rem;
    margin: 0 .2rem 0 0;
    border-radius: 6px;
  }

  pre {
  ${mq({
    padding: ['.7rem 1rem', '1rem 1.5rem'],
  })};

    background: #f4f4f4;
    color: #666;
    page-break-inside: avoid;
    font-family: 'D2Coding', monospace;
    word-wrap: break-word;
    line-height: 1.6;
    max-width: 100%;
    overflow: auto;
    display: block;
    border: 1px solid #ddd;
    border-left: 3px solid #38d9a9;
    margin: 1rem 0;    
  }
`;

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global styles={setGlobalStyles(theme)} />
  );
};

export default GlobalStyles;
