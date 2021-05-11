import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import Button from '../../styles/Button';
import AppBlock from '../../styles/AppBlock';

import { LOGIN, REGISTER } from '../../util/constants/constants';

import UserHeaderStatus from './UserHeaderStatus';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 2px 4px ${({ theme }) => theme.headShadowColor};
  background: ${({ theme }) => theme.subBaseTone[0]};
`;

const Wrapper = styled(AppBlock)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mq({
    height: ['4rem', '5rem'],
  })};
`;

const TitleWrapper = styled(Link)`
  ${mq({
    fontSize: ['1.9rem', '2.2rem', '2.4rem'],
  })};
`;

const Spacer = styled.div`
  ${mq({
    height: ['6rem', '7rem'],
  })};
`;

const Header = ({ user, onLogout }) => (
  <>
    <HeaderWrapper>
      <Wrapper>
        <TitleWrapper to="/">ConStu</TitleWrapper>
        {user ? (
          <UserHeaderStatus
            user={user}
            onClick={onLogout}
          />
        ) : (
          <div>
            <Button to="/login" style={{ marginRight: '0.5rem' }}>{LOGIN}</Button>
            <Button to="/register" success>{REGISTER}</Button>
          </div>
        )}
      </Wrapper>
    </HeaderWrapper>
    <Spacer />
  </>
);

export default React.memo(Header);
