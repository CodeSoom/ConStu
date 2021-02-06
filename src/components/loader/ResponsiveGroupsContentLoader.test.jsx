import React from 'react';

import { render } from '@testing-library/react';

import ResponsiveGroupsContentLoader from './ResponsiveGroupsContentLoader';

describe('ResponsiveGroupsContentLoader', () => {
  const renderResponsiveGroupsContentLoader = ({ isDesktop, isMobile }) => render((
    <ResponsiveGroupsContentLoader
      isDesktop={isDesktop}
      isMobile={isMobile}
    />
  ));

  it('render desktop content loader', () => {
    const state = {
      isDesktop: true,
      isMobile: false,
    };

    const { container } = renderResponsiveGroupsContentLoader(state);

    expect(container).toHaveTextContent('desktop loading..');
  });

  it('render mobile content loader', () => {
    const state = {
      isDesktop: false,
      isMobile: true,
    };

    const { container } = renderResponsiveGroupsContentLoader(state);

    expect(container).toHaveTextContent('mobile loading..');
  });
});
