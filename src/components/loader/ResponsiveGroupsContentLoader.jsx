import React from 'react';

import DesktopGroupsContentLoader from './DesktopGroupsContentLoader';
import MobileGroupsContentLoader from './MobileGroupsContentLoader';

const ResponsiveGroupsContentLoader = ({ isDesktop, isMobile }) => (
  <>
    {isDesktop && <DesktopGroupsContentLoader /> }
    {isMobile && <MobileGroupsContentLoader />}
  </>
);

export default ResponsiveGroupsContentLoader;
