import React from 'react';

import DesktopGroupsContentLoader from './DesktopGroupsContentLoader';
import TabletGroupsContentLoader from './TabletGroupsContentLoader';
import MobileGroupsContentLoader from './MobileGroupsContentLoader';

const ResponsiveGroupsContentLoader = ({ isDesktop, isTablet, isMobile }) => (
  <>
    {isDesktop && <DesktopGroupsContentLoader /> }
    {isTablet && <TabletGroupsContentLoader />}
    {isMobile && <MobileGroupsContentLoader />}
  </>
);

export default ResponsiveGroupsContentLoader;
