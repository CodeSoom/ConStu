import { useDispatch, useSelector } from 'react-redux';

import { renderHook, act } from '@testing-library/react-hooks';

import useAuth from './useAuth';

describe('useAuth', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      authReducer: {
        user: 'test',
        auth: null,
        authError: null,
        userDetail: {
          email: 'test@test.com',
          displayName: 'test',
        },
      },
    }));
  });

  const renderAuthHook = () => renderHook(() => useAuth());

  describe('renders auth reducer state', () => {
    it('should about auth state', () => {
      const { result: { current } } = renderAuthHook();

      const {
        auth, user, authError, userDetail,
      } = current;

      expect(auth).toBeNull();
      expect(user).toBe('test');
      expect(authError).toBeNull();
      expect(userDetail).toEqual({
        email: 'test@test.com',
        displayName: 'test',
      });
    });
  });

  describe('calls logoutUser', () => {
    it('should be listens dispatch action', () => {
      const { result } = renderAuthHook();

      act(() => {
        result.current.logoutUser();
      });

      expect(dispatch).toBeCalledWith({
        type: 'auth/logout',
      });
    });
  });

  describe('calls clearAuthState', () => {
    it('should be listens dispatch action', () => {
      const { result } = renderAuthHook();

      act(() => {
        result.current.clearAuthState();
      });

      expect(dispatch).toBeCalledWith({
        type: 'auth/clearAuth',
      });
    });
  });
});
