import { auth, db, fireStore } from './firebase';

import {
  postUserRegister,
  postUserLogin,
  postUserLogout,
  deletePostReview,
  deletePostParticipant,
  updateConfirmPostParticipant,
  deletePostGroup,
  getStudyGroups,
  getStudyGroup,
  postStudyGroup,
  editPostStudyGroup,
  postUpdateStudyReview,
  updatePostParticipant,
} from './api';

import STUDY_GROUP from '../../fixtures/study-group';

describe('api', () => {
  const fromDate = jest.fn();
  const now = jest.fn();
  const serverTimestamp = jest.fn().mockReturnValue(Date.now());
  const arrayUnion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    fireStore.Timestamp = {
      now,
      fromDate,
    };

    fireStore.FieldValue = {
      serverTimestamp,
      arrayUnion,
    };
  });

  describe('getStudyGroups', () => {
    context('With tag', () => {
      it('Should return groups', async () => {
        const response = await getStudyGroups('tags');

        expect(response).toEqual([]);
      });
    });

    context('Without tag', () => {
      it('Should return groups', async () => {
        const response = await getStudyGroups();

        expect(response).toEqual([]);
      });
    });
  });

  describe('getStudyGroup', () => {
    const setData = (id) => jest.spyOn(db, 'collection').mockImplementationOnce(() => ({
      doc: jest.fn().mockImplementationOnce(() => ({
        get: jest.fn().mockReturnValueOnce({
          exists: id,
        }),
      })),
    }));

    it('should return group', async () => {
      const mockResponse = setData('id');

      const response = await getStudyGroup('id');

      expect(mockResponse).toBeCalledTimes(1);
      expect(response).toEqual({
        exists: 'id',
      });
    });

    describe('response exists is not Exists', () => {
      it('should return null', async () => {
        const mockResponse = setData('');

        const response = await getStudyGroup('id');

        expect(mockResponse).toBeCalledTimes(1);
        expect(response).toBeNull();
      });
    });
  });

  describe('postStudyGroup', () => {
    const group = {
      applyEndDate: new Date(),
    };

    it('should returns group id', async () => {
      const response = await postStudyGroup(group);

      expect(response).toBe('id');
    });
  });

  describe('editPostStudyGroup', () => {
    const update = jest.spyOn(db, 'collection');

    it('should calls collection api', async () => {
      await editPostStudyGroup(STUDY_GROUP);

      expect(update).toBeCalledTimes(1);
    });
  });

  describe('postUpdateStudyReview', () => {
    const set = jest.spyOn(db, 'collection');

    it('should calls collection api', async () => {
      await postUpdateStudyReview(STUDY_GROUP);

      expect(arrayUnion).toBeCalledTimes(1);
      expect(set).toBeCalledTimes(1);
      expect(now).toBeCalledTimes(1);
    });
  });

  describe('updatePostParticipant', () => {
    const update = jest.spyOn(db, 'collection');

    const studyGroup = {
      ...STUDY_GROUP,
      user: 'user',
    };

    it('should calls collection api', async () => {
      await updatePostParticipant(studyGroup);

      expect(arrayUnion).toBeCalledTimes(1);
      expect(update).toBeCalledTimes(1);
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
      await deletePostReview({ id: 'test', reviews: [{ id: 'test', createDate: Date.now() }] });

      expect(update).toBeCalledTimes(1);
      expect(fromDate).toBeCalledTimes(1);
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
