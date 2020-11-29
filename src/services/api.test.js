import { db, auth } from './firebase';

import {
  postStudyGroup,
  postUserRegister,
  postUserLogin,
  postUserLogout,
} from './api';

import STUDY_GROUP from '../../fixtures/study-group';

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postStudyGroup', () => {
    const add = jest.fn((group) => group);
    const collection = jest.spyOn(
      db, 'collection',
    ).mockReturnValue({ add });

    it('write a study recruitment article', async () => {
      await postStudyGroup(STUDY_GROUP);

      expect(collection).toHaveBeenCalledWith('groups');

      expect(add).toHaveBeenCalledWith(STUDY_GROUP);
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
      auth.signOut = jest.fn().mockResolvedValue(true);
    });

    it('returns true after success logout', async () => {
      const response = await postUserLogout();

      expect(response).toBe(true);
    });
  });
});
