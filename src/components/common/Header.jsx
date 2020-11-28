import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Responsive from '../../styles/Responsive';
import palette from '../../styles/palette';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px ${palette.teal[2]};
`;

const Wrapper = styled(Responsive)`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    margin-right: 4rem;
  }
`;

const TitleWrapper = styled(Link)`
  font-weight: bold;
  font-size: 1.8rem;
`;

const LinkWrapper = styled(Link)`
  :first-of-type{
    margin-right: 1rem;
  }
  :hover {
    color: ${palette.gray[6]};
  }
  font-weight: bold;
`;

const Spacer = styled.div`
  height: 6rem;
`;

const Header = () => (
  <>
    <HeaderWrapper>
      <Wrapper>
        <TitleWrapper to="/">제목(미정)</TitleWrapper>
        <div>
          <LinkWrapper to="/login">로그인</LinkWrapper>
          <LinkWrapper to="/register">회원가입</LinkWrapper>
        </div>
      </Wrapper>
    </HeaderWrapper>
    <Spacer />
  </>
);

export default Header;
