import React from 'react';

import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Context as ResponsiveContext } from 'react-responsive';

import { lightTheme } from '../../../styles/theme';

function InjectMockProviders({
  width = 700, path = '', theme = lightTheme, children,
}) {
  return (
    <HelmetProvider>
      <ResponsiveContext.Provider value={{ width }}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={[path]}>
            {children}
          </MemoryRouter>
        </ThemeProvider>
      </ResponsiveContext.Provider>
    </HelmetProvider>
  );
}

export default InjectMockProviders;
