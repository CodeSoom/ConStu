import * as firebase from 'firebase';

import {
  postStudyGroup,
} from './api';

import STUDY_GROUP from '../../fixtures/study-group';

describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postStudyGroup', () => {
    const add = jest.fn((group) => group);
    const collection = jest.spyOn(
      firebase.firestore(), 'collection',
    ).mockReturnValue({ add });

    it('write a study recruitment article', async () => {
      await postStudyGroup(STUDY_GROUP);

      expect(collection).toHaveBeenCalledWith('groups');

      expect(add).toHaveBeenCalledWith(STUDY_GROUP);
    });
  });
});
