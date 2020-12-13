import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Responsive from '../../styles/Responsive';
import palette from '../../styles/palette';
import Button from '../../styles/Button';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.gray[1]};
  box-shadow: 0px 2px 4px ${palette.gray[4]};
  z-index: 100;
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserStatusWrapper = styled.div`
  span {
    margin-right: 1rem;
  }
`;

const TitleWrapper = styled(Link)`
  font-family: 'Jua', sans-serif;
  font-size: 2.3rem;
`;

const Spacer = styled.div`
  height: 6rem;
`;

const Header = ({ user, onLogout }) => (
  <>
    <HeaderWrapper>
      <Wrapper>
        <TitleWrapper to="/">ConStu</TitleWrapper>
        {user ? (
          <UserStatusWrapper>
            <span>{user}</span>
            <Button
              warn
              onClick={onLogout}
            >
              로그아웃
            </Button>
          </UserStatusWrapper>
        ) : (
          <div>
            <Button to="/login" style={{ marginRight: '0.5rem' }}>로그인</Button>
            <Button to="/register" success>회원가입</Button>
          </div>
        )}
      </Wrapper>
    </HeaderWrapper>
    <Spacer />
  </>
);

export default Header;
