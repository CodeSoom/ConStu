/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ContentLoader from 'react-content-loader';

const GroupsContentLoader = (props) => (
  <ContentLoader
    speed={1}
    viewBox="0 0 1024 900"
    height={900}
    width={1024}
    backgroundColor="#f2f2f2"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="5" y="20" rx="8" ry="8" width="220" height="40" />
    <rect x="850" y="20" rx="8" ry="8" width="150" height="40" />

    <rect x="18" y="130" rx="8" ry="8" width="304" height="310" />
    <rect x="350" y="130" rx="8" ry="8" width="304" height="310" />
    <rect x="680" y="130" rx="8" ry="8" width="304" height="310" />

    <rect x="18" y="470" rx="8" ry="8" width="304" height="310" />
    <rect x="350" y="470" rx="8" ry="8" width="304" height="310" />
    <rect x="680" y="470" rx="8" ry="8" width="304" height="310" />

  </ContentLoader>
);

export default GroupsContentLoader;
