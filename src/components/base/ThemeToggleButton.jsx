import React from 'react';

import styled from '@emotion/styled';

import { mq2 } from '../../styles/responsive';

import ThemeToggle from '../../styles/ThemeToggle';

const ThemeToggleButtonWrapper = styled.div`
  ${mq2({
    width: ['100%', '1024px'],
  })};

  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;  
`;

const ThemeToggleButton = ({ theme, onChange }) => (
  <ThemeToggleButtonWrapper>
    <ThemeToggle
      theme={theme}
      onChange={onChange}
    />
  </ThemeToggleButtonWrapper>
);

export default ThemeToggleButton;
