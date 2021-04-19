import React from 'react';

import styled from '@emotion/styled';

import { useMediaQuery } from 'react-responsive';

import Button from '../../styles/Button';
import palette from '../../styles/palette';

import { LOGOUT } from '../../util/constants/constants';

import UserSvg from '../../assets/icons/profile-user.svg';

const UserHeaderStatusWrapper = styled.div`
  span {
    margin-right: 1rem;
  }
`;

const UserIcon = styled(UserSvg)`
  cursor: pointer;
  width: 35px;
  height: 35px;
  fill: ${palette.gray[8]};
  transition: fill .2s;

  &:hover {
    fill: ${palette.gray[7]};
  }
`;

const UserHeaderStatus = ({ user, onClick }) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  if (isMobileScreen) {
    return (
      <UserIcon
        data-testid="user-icon"
      />
    );
  }

  return (
    <UserHeaderStatusWrapper>
      <span>{user}</span>
      <Button
        warn
        onClick={onClick}
      >
        {LOGOUT}
      </Button>
    </UserHeaderStatusWrapper>
  );
};

export default UserHeaderStatus;
