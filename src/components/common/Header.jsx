import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Responsive from '../../styles/Responsive';
import palette from '../../styles/palette';
import Button from '../../styles/Button';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  box-shadow: 0px 2px 4px ${palette.gray[4]};
  background: ${palette.gray[1]};
`;

const Wrapper = styled(Responsive)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

const UserStatusWrapper = styled.div`
  span {
    margin-right: 1rem;
  }
`;

const TitleWrapper = styled(Link)`
  font-size: 2.3rem;
  font-family: 'Jua', sans-serif;
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

export default React.memo(Header);
