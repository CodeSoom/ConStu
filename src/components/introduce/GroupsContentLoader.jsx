/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import ContentLoader from 'react-content-loader';

const GroupContentLoader = (props) => (
  <ContentLoader
    speed={1}
    viewBox="0 0 1024 900"
    height={900}
    width={1024}
    backgroundColor="#f2f2f2"
    foregroundColor="#e3e3e3"
    {...props}
  >
    <rect x="0" y="100" rx="8" ry="8" width="300" height="50" />
    <rect x="820" y="100" rx="8" ry="8" width="200" height="42" />
    <rect x="0" y="175" rx="8" ry="8" width="1024" height="5" />

    <rect x="0" y="260" rx="8" ry="8" width="1024" height="80" />
    <rect x="0" y="410" rx="8" ry="8" width="260" height="5" />

    <rect x="0" y="470" rx="8" ry="8" width="1024" height="250" />

    <rect x="0" y="760" rx="8" ry="8" width="100" height="40" />
    <rect x="120" y="760" rx="8" ry="8" width="100" height="40" />

  </ContentLoader>
);

export default GroupContentLoader;
