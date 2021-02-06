/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import facepaint from 'facepaint';
import styled from '@emotion/styled';

const mq = facepaint([
  '@media(min-width: 1024px)',
  '@media(min-width: 1150px)',
]);

const ResponsiveContainer = styled.div(() => mq({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  width: ['calc(100% - 3rem)', '680px', '1024px'],
}));

const Responsive = ({ children, ...rest }) => (
  <ResponsiveContainer {...rest}>
    {children}
  </ResponsiveContainer>
);

export default Responsive;
