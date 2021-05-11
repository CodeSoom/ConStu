import React from 'react';

import { ThemeProvider } from '@emotion/react';

import { lightTheme } from '../../../styles/theme';

function MockTheme({ children }) {
  return (
    <ThemeProvider theme={lightTheme}>
      {children}
    </ThemeProvider>
  );
}

export default MockTheme;
