/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

const mq = facepaint([
  '@media(min-width: 1050px)',
  '@media(min-width: 1150px)',
]);

const AppBlockWrapper = styled.div(() => mq({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  width: ['calc(100% - 3rem)', '1024px'],
}));

const GlobalBlock = ({ children, ...rest }) => (
  <AppBlockWrapper {...rest}>
    {children}
  </AppBlockWrapper>
);

export default GlobalBlock;
