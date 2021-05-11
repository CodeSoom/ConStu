import React from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

const DropDownWrapper = styled.div`
  position: absolute;
  top: 100%;
  margin-top: .5rem;
  right: 5px;

  .menu-wrapper {
    position: relative;
    z-index: 5;
    width: 12rem;
    background: ${({ theme }) => theme.dropDownColor[1]};
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 8px;
  }
`;

const MenuContent = styled.div`
  color: ${palette.gray[8]};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .2s;
  
  &:hover {
    background: ${({ theme }) => theme.dropDownColor[2]};
  }

  &.user-id {
    cursor: unset;
    background: ${({ theme }) => theme.dropDownColor[0]};

    &:hover{
      background: ${({ theme }) => theme.dropDownColor[0]};
    }
  }
`;

const DropDown = ({ visible, onLogout, user }) => {
  if (!visible) {
    return null;
  }

  return (
    <DropDownWrapper>
      <div className="menu-wrapper">
        <MenuContent className="user-id">
          {user}
        </MenuContent>
        <MenuContent
          onClick={onLogout}
        >
          로그아웃
        </MenuContent>
      </div>
    </DropDownWrapper>
  );
};

export default DropDown;
