import React from 'react';

import styled from '@emotion/styled';

import ProfileSettingForm from '../../components/myInfo/ProfileSettingForm';

const ProfileSettingContainerWrapper = styled.div`

`;

const ProfileSettingContainer = ({ user }) => {
  if (!user) {
    return <div>로그인 후 이용해주세요</div>;
  }

  return (
    <ProfileSettingContainerWrapper>
      <ProfileSettingForm
        user={user}
      />
    </ProfileSettingContainerWrapper>
  );
};

export default ProfileSettingContainer;
