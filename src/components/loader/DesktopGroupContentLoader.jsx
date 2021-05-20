/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTheme } from '@emotion/react';

import ContentLoader from 'react-content-loader';

const DesktopGroupContentLoader = (props) => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 1024 900"
      height="100%"
      width="100%"
      backgroundColor={theme.contentLoaderColor[0]}
      foregroundColor={theme.contentLoaderColor[1]}
      title="desktop loading.."
      {...props}
    >
      <rect x="0" y="20" rx="8" ry="8" width="300" height="50" />
      <rect x="820" y="20" rx="8" ry="8" width="200" height="42" />
      <rect x="0" y="100" rx="8" ry="8" width="1024" height="5" />

      <rect x="0" y="165" rx="8" ry="8" width="1024" height="80" />
      <rect x="0" y="315" rx="8" ry="8" width="260" height="5" />

      <rect x="0" y="365" rx="8" ry="8" width="1024" height="250" />

      <rect x="0" y="625" rx="8" ry="8" width="100" height="40" />
      <rect x="120" y="625" rx="8" ry="8" width="100" height="40" />

    </ContentLoader>
  );
};

export default DesktopGroupContentLoader;
