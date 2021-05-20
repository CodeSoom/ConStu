import React from 'react';

import { render } from '@testing-library/react';

import MockTheme from '../common/test/MockTheme';
import ResponsiveGroupContentLoader from './ResponsiveGroupContentLoader';

describe('ResponsiveGroupContentLoader', () => {
  const renderResponsiveGroupContentLoader = ({ isDesktop, isMobile }) => render((
    <MockTheme>
      <ResponsiveGroupContentLoader
        isDesktop={isDesktop}
        isMobile={isMobile}
      />
    </MockTheme>
  ));

  it('render desktop content loader', () => {
    const state = {
      isDesktop: true,
      isMobile: false,
    };

    const { container } = renderResponsiveGroupContentLoader(state);

    expect(container).toHaveTextContent('desktop loading..');
  });

  it('render mobile content loader', () => {
    const state = {
      isDesktop: false,
      isMobile: true,
    };

    const { container } = renderResponsiveGroupContentLoader(state);

    expect(container).toHaveTextContent('mobile loading..');
  });
});
