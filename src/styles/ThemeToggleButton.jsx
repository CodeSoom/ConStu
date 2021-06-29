import React from 'react';

import styled from '@emotion/styled';

import Toggle from 'react-toggle';

import SunIcon from '../assets/icons/sun.svg';
import MoonIcon from '../assets/icons/moon.svg';

import mq from './responsive';
import palette from './palette';

import 'react-toggle/style.css';

const ToggleWrapper = styled(Toggle)`
  &.react-toggle .react-toggle-track {
    background-color: #ffa000;
  }

  &.react-toggle .react-toggle-track {
  ${mq({
    width: ['55px', '60px'],
    height: ['27px', '30px'],
  })};
  }

  &.react-toggle .react-toggle-thumb {
  ${mq({
    width: ['27px', '30px'],
    height: ['27px', '30px'],
  })};

    top: 0px;
    left: 0px;
    border: 2px solid #ffa000;
  }

  &.react-toggle--checked .react-toggle-thumb {
  ${mq({
    left: ['28px', '31px'],
  })};

    border: 2px solid ${palette.gray[6]};
  }

  &.react-toggle--checked .react-toggle-track {
    background-color: ${palette.gray[6]};
  }

  &.react-toggle .react-toggle-track-check {
  ${mq({
    width: ['26px', '28px'],
    height: ['26px', '28px'],
    left: ['3px', '4px'],
  })};
  }

  &.react-toggle .react-toggle-track-x {
    ${mq({
    width: ['23px', '24px'],
    height: ['23px', '24px'],
    right: ['3px', '4px'],
  })};
  }

  &.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: #f57c00;
  }

  &.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${palette.gray[7]};
  }

  &.react-toggle--focus .react-toggle-thumb {
    box-shadow: none;
  }

  &.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
    box-shadow: none;
  }
`;

const ThemeToggleButton = ({ onChange, theme }) => (
  <ToggleWrapper
    name="theme-toggle"
    defaultChecked={theme}
    title={theme ? 'dark' : 'light'}
    aria-label="No label tag"
    onChange={onChange}
    icons={{
      checked: <MoonIcon />,
      unchecked: <SunIcon />,
    }}
    data-testid="theme-toggle"
  />
);
export default ThemeToggleButton;
