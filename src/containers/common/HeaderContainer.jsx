import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import { requestLogout } from '../../reducers/slice';

import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(get('user'));

  const onLogout = useCallback(() => {
    dispatch(requestLogout());

    history.push('/');
  }, [dispatch, history]);

  return (
    <Header
      user={user}
      onLogout={onLogout}
    />
  );
};

export default HeaderContainer;
