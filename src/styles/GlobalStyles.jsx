import React from 'react';

import emotionReset from 'emotion-reset';

import { Global, css } from '@emotion/react';

const setGlobalStyles = css`
  ${emotionReset}

  * {
    box-sizing: inherit;
  }

  body {
    font-family: 'Jua', sans-serif;
    color: #212529;
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
    padding: 0.3rem 0.4rem;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 6px;
    font-family: 'D2Coding', monospace;
  }

  pre {
    background: #f4f4f4;
    color: #666;
    page-break-inside: avoid;
    font-family: 'D2Coding', monospace;
    word-wrap: break-word;
    font-size: 15px;
    line-height: 1.6;
    max-width: 100%;
    overflow: auto;
    display: block;
    border: 1px solid #ddd;
    border-left: 3px solid #38d9a9;
    margin: 1rem 0;    
    padding: 1em 1.5em;
  }
`;

const GlobalStyles = () => (
  <Global styles={setGlobalStyles} />
);

export default GlobalStyles;
