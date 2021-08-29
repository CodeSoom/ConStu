import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from '../util/utils';
import { clearAuth, logout } from '../reducers/authSlice';

function useAuth() {
  const dispatch = useDispatch();

  const auth = useSelector(getAuth('auth'));
  const user = useSelector(getAuth('user'));
  const authError = useSelector(getAuth('authError'));
  const userDetail = useSelector(getAuth('userDetail'));

  const clearAuthState = useCallback(() => dispatch(clearAuth()), [dispatch]);

  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    auth,
    user,
    authError,
    userDetail,
    logoutUser,
    clearAuthState,
  };
}

export default useAuth;
