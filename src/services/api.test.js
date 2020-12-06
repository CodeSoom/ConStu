import { auth } from './firebase';

import {
  postUserRegister,
  postUserLogin,
  postUserLogout,
} from './api';

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postUserRegister', () => {
    const register = {
      user: {
        email: 'seungmin@naver.com',
        password: '123456',
      },
    };

    beforeEach(() => {
      auth.createUserWithEmailAndPassword = jest.fn().mockResolvedValue(register);
    });

    it('email returns after user sign up', async () => {
      const { user } = await postUserRegister(register);

      const { user: { email } } = register;

      expect(user.email).toBe(email);
    });
  });

  describe('postUserRegister', () => {
    const register = {
      user: {
        email: 'seungmin@naver.com',
        password: '123456',
      },
    };

    beforeEach(() => {
      auth.createUserWithEmailAndPassword = jest.fn().mockResolvedValue(register);
    });

    it('email returns after user sign up', async () => {
      const { user } = await postUserRegister(register);

      const { user: { email } } = register;

      expect(user.email).toBe(email);
    });
  });

  describe('postUserLogin', () => {
    const login = {
      user: {
        email: 'seungmin@naver.com',
        password: '123456',
      },
    };

    beforeEach(() => {
      auth.signInWithEmailAndPassword = jest.fn().mockResolvedValue(login);
    });

    it('email returns after user login', async () => {
      const { user } = await postUserLogin(login);

      const { user: { email } } = login;

      expect(user.email).toBe(email);
    });
  });

  describe('postUserLogout', () => {
    beforeEach(() => {
      auth.signOut = jest.fn();
    });

    it('returns true after success logout', async () => {
      await postUserLogout();
    });
  });
});
