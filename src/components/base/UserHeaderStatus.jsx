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

import DropDown from './DropDown';
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
  const isMobileScreen = useMediaQuery({ query: '(max-width: 550px)' });

  const [isVisible, setVisible] = useState(false);
  const userIconRef = useRef();

  const handleDropdownOutside = useCallback((e) => {
    if (!userIconRef.current) {
      return;
    }

    if (_.isEqual(userIconRef.current, e.target) || userIconRef.current.contains(e.target)) {
      return;
    }

    setVisible(false);
  }, [userIconRef]);

  const addEventDropdown = useCallback((event) => {
    document.addEventListener(event, handleDropdownOutside);
  }, [handleDropdownOutside]);

  useEffect(() => {
    addEventDropdown('scroll');
    addEventDropdown('mousedown');
  }, [addEventDropdown]);

  useUnmount(() => {
    addEventDropdown('scroll');
    addEventDropdown('mousedown');
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
        to="/myinfo"
        style={{ marginRight: '.5rem' }}
      >
        내 정보
      </Button>
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
