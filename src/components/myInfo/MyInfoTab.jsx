import React from 'react';

import styled from '@emotion/styled';

import { NavLink } from 'react-router-dom';

const MyInfoTabWrapper = styled.div`
  
`;

const MyInfoTab = () => {
  const activeStyle = {
    color: 'skyBlue',
  };

  return (
    <MyInfoTabWrapper>
      <NavLink exact activeStyle={activeStyle} to="/myinfo/study">내 스터디 정보</NavLink>
      <NavLink exact activeStyle={activeStyle} to="/myinfo/setting">계정 설정</NavLink>
    </MyInfoTabWrapper>
  );
};

export default MyInfoTab;
