import { auth, db } from './firebase';

import {
  postUserRegister,
  postUserLogin,
  postUserLogout,
  deletePostReview,
  deletePostParticipant,
  updateConfirmPostParticipant,
  deletePostGroup,
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
    const signOut = jest.fn();

    beforeEach(() => {
      auth.signOut = signOut;
    });

    it('call postUserLogout api', async () => {
      await postUserLogout();

      expect(signOut).toBeCalledTimes(1);
    });
  });

  describe('deletePostReview', () => {
    const update = jest.spyOn(db, 'collection');

    it('call deletePostReview api', async () => {
      await deletePostReview({ id: 'test', reviews: { id: 'test' } });

      expect(update).toBeCalledTimes(1);
    });
  });

  describe('deletePostParticipant', () => {
    const update = jest.spyOn(db, 'collection');

    it('call deletePostParticipant api', async () => {
      await deletePostParticipant({ id: 'test', participants: {} });

      expect(update).toBeCalledTimes(1);
    });
  });

  describe('updateConfirmPostParticipant', () => {
    const update = jest.spyOn(db, 'collection');

    it('call updateConfirmPostParticipant api', async () => {
      await updateConfirmPostParticipant({ id: 'test', participants: {} });

      expect(update).toBeCalledTimes(1);
    });
  });

  describe('deletePostGroup', () => {
    const remove = jest.spyOn(db, 'collection');

    it('call deletePostGroup api', async () => {
      await deletePostGroup('1');

      expect(remove).toBeCalledTimes(1);
    });
  });
});
