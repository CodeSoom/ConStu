import React from 'react';

import styled from '@emotion/styled';

import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import GlobalBlock from '../../styles/GlobalBlock';

import MyStudyInfoPage from './MyStudyInfoPage';
import ProfileSettingPage from './ProfileSettingPage';
import MyInfoTab from '../../components/myInfo/MyInfoTab';
import HeaderContainer from '../../containers/base/HeaderContainer';

const MyInfoPageWrapper = styled.div`

`;

const MyInfoTitle = styled.div`
  margin-bottom: 2rem;
`;

const MyInfoPage = () => (
  <>
    <Helmet>
      <title>ConStu | 내 정보</title>
    </Helmet>
    <HeaderContainer />
    <MyInfoTab />
    <GlobalBlock>
      <MyInfoPageWrapper>
        <MyInfoTitle>
          내 정보
        </MyInfoTitle>
        <Switch>
          <Route path="/myinfo/study" component={MyStudyInfoPage} />
          <Route path="/myinfo/setting" component={ProfileSettingPage} />
        </Switch>
      </MyInfoPageWrapper>
    </GlobalBlock>
  </>
);

export default MyInfoPage;
