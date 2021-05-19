/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useTheme } from '@emotion/react';

import ContentLoader from 'react-content-loader';

const TabletGroupsContentLoader = (props) => {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 1024 1300"
      height="100%"
      width="100%"
      backgroundColor={theme.contentLoaderColor[0]}
      foregroundColor={theme.contentLoaderColor[1]}
      title="tablet loading.."
      {...props}
    >
      <rect x="5" y="50" rx="8" ry="8" width="300" height="40" />
      <rect x="850" y="50" rx="8" ry="8" width="150" height="40" />

      {/* 테두리 */}
      <rect x="18" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="475" rx="8" ry="8" width="470" height="7" />
      <rect x="480" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="130" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="145" y="160" rx="16" ry="16" width="220" height="40" />
      <rect x="60" y="240" rx="8" ry="8" width="260" height="10" />
      <rect x="60" y="270" rx="8" ry="8" width="290" height="10" />
      <rect x="60" y="300" rx="8" ry="8" width="210" height="10" />
      <rect x="60" y="330" rx="8" ry="8" width="290" height="10" />
      <rect x="60" y="360" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="40" y="405" rx="8" ry="8" width="420" height="5" />
      <rect x="40" y="425" rx="8" ry="8" width="60" height="35" />
      <rect x="110" y="425" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="515" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="475" rx="8" ry="8" width="470" height="7" />
      <rect x="977" y="130" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="130" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="650" y="160" rx="16" ry="16" width="220" height="40" />
      <rect x="555" y="240" rx="8" ry="8" width="260" height="10" />
      <rect x="555" y="270" rx="8" ry="8" width="290" height="10" />
      <rect x="555" y="300" rx="8" ry="8" width="210" height="10" />
      <rect x="555" y="330" rx="8" ry="8" width="290" height="10" />
      <rect x="555" y="360" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="540" y="405" rx="8" ry="8" width="415" height="5" />
      <rect x="540" y="425" rx="8" ry="8" width="60" height="35" />
      <rect x="610" y="425" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="18" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="855" rx="8" ry="8" width="470" height="7" />
      <rect x="480" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="510" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="140" y="540" rx="16" ry="16" width="220" height="40" />
      <rect x="50" y="620" rx="8" ry="8" width="260" height="10" />
      <rect x="50" y="650" rx="8" ry="8" width="290" height="10" />
      <rect x="50" y="680" rx="8" ry="8" width="210" height="10" />
      <rect x="50" y="710" rx="8" ry="8" width="290" height="10" />
      <rect x="50" y="740" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="40" y="785" rx="8" ry="8" width="420" height="5" />
      <rect x="40" y="805" rx="8" ry="8" width="60" height="35" />
      <rect x="110" y="805" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="515" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="855" rx="8" ry="8" width="470" height="7" />
      <rect x="977" y="510" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="510" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="650" y="540" rx="16" ry="16" width="220" height="40" />
      <rect x="555" y="620" rx="8" ry="8" width="200" height="10" />
      <rect x="555" y="650" rx="8" ry="8" width="230" height="10" />
      <rect x="555" y="680" rx="8" ry="8" width="150" height="10" />
      <rect x="555" y="710" rx="8" ry="8" width="230" height="10" />
      <rect x="555" y="740" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="540" y="785" rx="8" ry="8" width="415" height="5" />
      <rect x="540" y="805" rx="8" ry="8" width="60" height="35" />
      <rect x="610" y="805" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="18" y="890" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="1235" rx="8" ry="8" width="470" height="7" />
      <rect x="480" y="890" rx="8" ry="8" width="8" height="350" />
      <rect x="18" y="890" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="140" y="920" rx="16" ry="16" width="220" height="40" />
      <rect x="50" y="1000" rx="8" ry="8" width="260" height="10" />
      <rect x="50" y="1030" rx="8" ry="8" width="290" height="10" />
      <rect x="50" y="1060" rx="8" ry="8" width="210" height="10" />
      <rect x="50" y="1090" rx="8" ry="8" width="290" height="10" />
      <rect x="50" y="1120" rx="8" ry="8" width="240" height="10" />
      {/* 태그 */}
      <rect x="40" y="1165" rx="8" ry="8" width="420" height="5" />
      <rect x="40" y="1185" rx="8" ry="8" width="60" height="35" />
      <rect x="110" y="1185" rx="8" ry="8" width="60" height="35" />

      {/* 테두리 */}
      <rect x="515" y="890" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="1235" rx="8" ry="8" width="470" height="7" />
      <rect x="977" y="890" rx="8" ry="8" width="8" height="350" />
      <rect x="515" y="890" rx="8" ry="8" width="470" height="7" />
      {/* 내용 */}
      <rect x="650" y="920" rx="16" ry="16" width="220" height="40" />
      <rect x="555" y="1000" rx="8" ry="8" width="200" height="10" />
      <rect x="555" y="1030" rx="8" ry="8" width="230" height="10" />
      <rect x="555" y="1060" rx="8" ry="8" width="150" height="10" />
      <rect x="555" y="1090" rx="8" ry="8" width="230" height="10" />
      <rect x="555" y="1120" rx="8" ry="8" width="180" height="10" />
      {/* 태그 */}
      <rect x="540" y="1165" rx="8" ry="8" width="415" height="5" />
      <rect x="540" y="1185" rx="8" ry="8" width="60" height="35" />
      <rect x="610" y="1185" rx="8" ry="8" width="60" height="35" />

    </ContentLoader>
  );
};

export default TabletGroupsContentLoader;
