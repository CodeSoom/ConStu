import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';

import styled from '@emotion/styled';

import _ from 'lodash';

import { useMediaQuery } from 'react-responsive';

import { useUnmount } from 'react-use';

import Button from '../../styles/Button';
import palette from '../../styles/palette';

import { LOGOUT } from '../../util/constants/constants';

import UserSvg from '../../assets/icons/profile-user.svg';

import DropDown from './DropDown';

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

const isMobileLoggedIn = (isMobile) => (user) => !!(isMobile && user);

const UserHeaderStatus = ({ user, onClick }) => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 450px)' });

  const [isVisible, setVisible] = useState(false);
  const userIconRef = useRef();

  const isLoggedIn = isMobileLoggedIn(isMobileScreen);

  const handleClickOutside = useCallback((e) => {
    if (!userIconRef.current) {
      return;
    }

    if (_.isEqual(userIconRef.current, e.target) || userIconRef.current.contains(e.target)) {
      return;
    }

    setVisible(false);
  }, [userIconRef]);

  useEffect(() => {
    if (isLoggedIn(user)) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  }, [user, handleClickOutside]);

  useUnmount(() => {
    if (isLoggedIn(user)) {
      document.addEventListener('mousedown', handleClickOutside);
    }
  });

  if (isMobileScreen) {
    return (
      <div
        ref={userIconRef}
      >
        <UserIcon
          onClick={() => setVisible(!isVisible)}
          data-testid="user-icon"
        />
        <DropDown
          user={user}
          visible={isVisible}
          onLogout={onClick}
        />
      </div>
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
