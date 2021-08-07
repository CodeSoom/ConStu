import React from 'react';

import styled from '@emotion/styled';

import { auth } from '../../services/firebase';

import ProfileSettingContainer from '../../containers/myInfo/ProfileSettingContainer';

const ProfileSettingPageWrapper = styled.div`

`;

const ProfileSettingPage = () => {
  const user = auth.currentUser;

  return (
    <ProfileSettingPageWrapper>
      계정 설정
      <ProfileSettingContainer
        user={user}
      />
    </ProfileSettingPageWrapper>
  );
};
export default ProfileSettingPage;
