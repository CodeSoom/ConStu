import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from '../../util/utils';
import { requestLogout } from '../../reducers/authSlice';

import Header from '../../components/base/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const user = useSelector(getAuth('user'));

  const onLogout = useCallback(() => {
    dispatch(requestLogout());
  }, [dispatch]);

  return (
    <Header
      user={user}
      onLogout={onLogout}
    />
  );
};

export default React.memo(HeaderContainer);
