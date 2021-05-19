/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTheme } from '@emotion/react';

import ContentLoader from 'react-content-loader';

const MobileGroupsContentLoader = (props) => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 450 1400"
      height="100%"
      width="100%"
      backgroundColor={theme.contentLoaderColor[0]}
      foregroundColor={theme.contentLoaderColor[1]}
      title="mobile loading.."
      {...props}
    >
      <rect x="45" y="50" rx="8" ry="8" width="360" height="40" />

      {/* 테두리 */}
      <rect x="0" y="200" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="570" rx="8" ry="8" width="440" height="7" />
      <rect x="435" y="200" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="200" rx="8" ry="8" width="440" height="7" />

      {/* 내용 */}
      <rect x="120" y="230" rx="16" ry="16" width="220" height="40" />
      <rect x="30" y="320" rx="8" ry="8" width="260" height="10" />
      <rect x="30" y="350" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="380" rx="8" ry="8" width="210" height="10" />
      <rect x="30" y="410" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="440" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="30" y="495" rx="8" ry="8" width="390" height="5" />
      <rect x="30" y="515" rx="8" ry="8" width="60" height="35" />
      <rect x="100" y="515" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="0" y="600" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="970" rx="8" ry="8" width="440" height="7" />
      <rect x="435" y="600" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="600" rx="8" ry="8" width="440" height="7" />

      {/* 내용 */}
      <rect x="120" y="630" rx="16" ry="16" width="220" height="40" />
      <rect x="30" y="720" rx="8" ry="8" width="260" height="10" />
      <rect x="30" y="750" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="780" rx="8" ry="8" width="210" height="10" />
      <rect x="30" y="810" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="840" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="30" y="895" rx="8" ry="8" width="390" height="5" />
      <rect x="30" y="915" rx="8" ry="8" width="60" height="35" />
      <rect x="100" y="915" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="0" y="1000" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="1370" rx="8" ry="8" width="440" height="7" />
      <rect x="435" y="1000" rx="8" ry="8" width="8" height="375" />
      <rect x="0" y="1000" rx="8" ry="8" width="440" height="7" />

      {/* 내용 */}
      <rect x="120" y="1030" rx="16" ry="16" width="220" height="40" />
      <rect x="30" y="1120" rx="8" ry="8" width="260" height="10" />
      <rect x="30" y="1150" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="1180" rx="8" ry="8" width="210" height="10" />
      <rect x="30" y="1210" rx="8" ry="8" width="290" height="10" />
      <rect x="30" y="1240" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="30" y="1295" rx="8" ry="8" width="390" height="5" />
      <rect x="30" y="1315" rx="8" ry="8" width="60" height="35" />
      <rect x="100" y="1315" rx="8" ry="8" width="60" height="35" />

    </ContentLoader>
  );
};

export default MobileGroupsContentLoader;
