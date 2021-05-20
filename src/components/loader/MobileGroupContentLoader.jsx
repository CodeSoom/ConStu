/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTheme } from '@emotion/react';

import ContentLoader from 'react-content-loader';

const MobileGroupContentLoader = (props) => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 450 900"
      height="100%"
      width="100%"
      backgroundColor={theme.contentLoaderColor[0]}
      foregroundColor={theme.contentLoaderColor[1]}
      title="mobile loading.."
      {...props}
    >
      <rect x="0" y="0" rx="8" ry="8" width="270" height="40" />
      <rect x="350" y="70" rx="8" ry="8" width="100" height="35" />
      <rect x="0" y="125" rx="8" ry="8" width="450" height="5" />

      <rect x="0" y="145" rx="8" ry="8" width="120" height="15" />
      <rect x="330" y="145" rx="8" ry="8" width="120" height="15" />

      <rect x="0" y="190" rx="8" ry="8" width="450" height="80" />

      <rect x="0" y="320" rx="8" ry="8" width="180" height="5" />

      <rect x="0" y="340" rx="8" ry="8" width="450" height="200" />

      <rect x="0" y="560" rx="8" ry="8" width="100" height="40" />
      <rect x="120" y="560" rx="8" ry="8" width="100" height="40" />

      <rect x="0" y="630" rx="8" ry="8" width="180" height="5" />
      <rect x="0" y="650" rx="8" ry="8" width="450" height="100" />

    </ContentLoader>
  );
};

export default MobileGroupContentLoader;
