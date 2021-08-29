import React from 'react';

import styled from '@emotion/styled';

import ProfileSettingContainer from '../../containers/myInfo/ProfileSettingContainer';

const ProfileSettingPageWrapper = styled.div`

`;

const ProfileSettingPage = () => (
  <ProfileSettingPageWrapper>
    계정 설정
    <ProfileSettingContainer />
  </ProfileSettingPageWrapper>
);
export default ProfileSettingPage;
