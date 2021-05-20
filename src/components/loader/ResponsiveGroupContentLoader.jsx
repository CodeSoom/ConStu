import React from 'react';

import DesktopGroupContentLoader from './DesktopGroupContentLoader';
import MobileGroupContentLoader from './MobileGroupContentLoader';

const ResponsiveGroupContentLoader = ({ isDesktop, isMobile }) => (
  <>
    {isDesktop && <DesktopGroupContentLoader /> }
    {isMobile && <MobileGroupContentLoader />}
  </>
);

export default ResponsiveGroupContentLoader;
