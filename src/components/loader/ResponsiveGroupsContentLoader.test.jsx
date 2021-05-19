import React from 'react';

import { render } from '@testing-library/react';

import MockTheme from '../common/test/MockTheme';
import ResponsiveGroupsContentLoader from './ResponsiveGroupsContentLoader';

describe('ResponsiveGroupsContentLoader', () => {
  const renderResponsiveGroupsContentLoader = ({ isDesktop, isTablet, isMobile }) => render((
    <MockTheme>
      <ResponsiveGroupsContentLoader
        isDesktop={isDesktop}
        isTablet={isTablet}
        isMobile={isMobile}
      />
    </MockTheme>
  ));

  it('render desktop content loader', () => {
    const state = {
      isDesktop: true,
      isTablet: false,
      isMobile: false,
    };

    const { container } = renderResponsiveGroupsContentLoader(state);

    expect(container).toHaveTextContent('desktop loading..');
  });

  it('render tablet content loader', () => {
    const state = {
      isDesktop: false,
      isTablet: true,
      isMobile: false,
    };

    const { container } = renderResponsiveGroupsContentLoader(state);

    expect(container).toHaveTextContent('tablet loading..');
  });

  it('render mobile content loader', () => {
    const state = {
      isDesktop: false,
      isTablet: false,
      isMobile: true,
    };

    const { container } = renderResponsiveGroupsContentLoader(state);

    expect(container).toHaveTextContent('mobile loading..');
  });
});
