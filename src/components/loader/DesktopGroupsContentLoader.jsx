/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTheme } from '@emotion/react';

import ContentLoader from 'react-content-loader';

const DesktopGroupsContentLoader = (props) => {
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
      <rect x="5" y="40" rx="8" ry="8" width="300" height="40" />
      <rect x="850" y="40" rx="8" ry="8" width="150" height="40" />

      {/* 테두리 */}
      <rect x="18" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="475" rx="8" ry="8" width="304" height="7" />
      <rect x="314" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="130" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="100" y="160" rx="16" ry="16" width="150" height="30" />
      <rect x="50" y="240" rx="8" ry="8" width="200" height="10" />
      <rect x="50" y="270" rx="8" ry="8" width="230" height="10" />
      <rect x="50" y="300" rx="8" ry="8" width="150" height="10" />
      <rect x="50" y="330" rx="8" ry="8" width="230" height="10" />
      <rect x="50" y="360" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="35" y="405" rx="8" ry="8" width="270" height="5" />
      <rect x="40" y="425" rx="8" ry="8" width="60" height="35" />
      <rect x="110" y="425" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="350" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="350" y="475" rx="8" ry="8" width="304" height="7" />
      <rect x="647" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="350" y="130" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="430" y="160" rx="16" ry="16" width="150" height="30" />
      <rect x="380" y="240" rx="8" ry="8" width="200" height="10" />
      <rect x="380" y="270" rx="8" ry="8" width="230" height="10" />
      <rect x="380" y="300" rx="8" ry="8" width="150" height="10" />
      <rect x="380" y="330" rx="8" ry="8" width="230" height="10" />
      <rect x="380" y="360" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="365" y="405" rx="8" ry="8" width="270" height="5" />
      <rect x="370" y="425" rx="8" ry="8" width="60" height="35" />
      <rect x="440" y="425" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="680" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="680" y="475" rx="8" ry="8" width="304" height="7" />
      <rect x="977" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="680" y="130" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="755" y="160" rx="16" ry="16" width="150" height="30" />
      <rect x="705" y="240" rx="8" ry="8" width="200" height="10" />
      <rect x="705" y="270" rx="8" ry="8" width="230" height="10" />
      <rect x="705" y="300" rx="8" ry="8" width="150" height="10" />
      <rect x="705" y="330" rx="8" ry="8" width="230" height="10" />
      <rect x="705" y="360" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="695" y="405" rx="8" ry="8" width="270" height="5" />
      <rect x="700" y="425" rx="8" ry="8" width="60" height="35" />
      <rect x="770" y="425" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="18" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="855" rx="8" ry="8" width="304" height="7" />
      <rect x="314" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="510" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="100" y="540" rx="16" ry="16" width="150" height="30" />
      <rect x="50" y="620" rx="8" ry="8" width="200" height="10" />
      <rect x="50" y="650" rx="8" ry="8" width="230" height="10" />
      <rect x="50" y="680" rx="8" ry="8" width="150" height="10" />
      <rect x="50" y="710" rx="8" ry="8" width="230" height="10" />
      <rect x="50" y="740" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="35" y="785" rx="8" ry="8" width="270" height="5" />
      <rect x="40" y="805" rx="8" ry="8" width="60" height="35" />
      <rect x="110" y="805" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="350" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="350" y="855" rx="8" ry="8" width="304" height="7" />
      <rect x="647" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="350" y="510" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="430" y="540" rx="16" ry="16" width="150" height="30" />
      <rect x="380" y="620" rx="8" ry="8" width="200" height="10" />
      <rect x="380" y="650" rx="8" ry="8" width="230" height="10" />
      <rect x="380" y="680" rx="8" ry="8" width="150" height="10" />
      <rect x="380" y="710" rx="8" ry="8" width="230" height="10" />
      <rect x="380" y="740" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="365" y="785" rx="8" ry="8" width="270" height="5" />
      <rect x="370" y="805" rx="8" ry="8" width="60" height="35" />
      <rect x="440" y="805" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="680" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="680" y="855" rx="8" ry="8" width="304" height="7" />
      <rect x="977" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="680" y="510" rx="8" ry="8" width="304" height="7" />
      {/* 내용 */}
      <rect x="755" y="540" rx="16" ry="16" width="150" height="30" />
      <rect x="705" y="620" rx="8" ry="8" width="200" height="10" />
      <rect x="705" y="650" rx="8" ry="8" width="230" height="10" />
      <rect x="705" y="680" rx="8" ry="8" width="150" height="10" />
      <rect x="705" y="710" rx="8" ry="8" width="230" height="10" />
      <rect x="705" y="740" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="695" y="785" rx="8" ry="8" width="270" height="5" />
      <rect x="700" y="805" rx="8" ry="8" width="60" height="35" />
      <rect x="770" y="805" rx="8" ry="8" width="60" height="35" />

    </ContentLoader>
  );
};

export default DesktopGroupsContentLoader;
