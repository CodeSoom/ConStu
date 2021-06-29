import React from 'react';

import styled from '@emotion/styled';

import { mq2 } from '../../styles/responsive';

import ThemeToggleButton from '../../styles/ThemeToggleButton';

const ThemeToggleButtonWrapper = styled.div`
  ${mq2({
    width: ['100%', '1024px'],
  })};

  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;  
`;

const ThemeToggle = ({ theme, onChange }) => (
  <ThemeToggleButtonWrapper>
    <ThemeToggleButton
      theme={theme}
      onChange={onChange}
    />
  </ThemeToggleButtonWrapper>
);

export default ThemeToggle;
