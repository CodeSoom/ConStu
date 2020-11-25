import axios from 'axios';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
} from './api';

import STUDY_GROUPS from '../../fixtures/study-groups';
import STUDY_GROUP from '../../fixtures/study-group';

jest.mock('axios');
describe('api', () => {
  describe('getStudyGroups', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: STUDY_GROUPS });
    });

    it('returns study groups list', async () => {
      await expect(getStudyGroups()).resolves.toEqual(STUDY_GROUPS);

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/groups/',
      );
    });
  });

  describe('getStudyGroup', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({ data: STUDY_GROUP });
    });

    it('returns study group detail', async () => {
      const { id } = STUDY_GROUP;

      await expect(getStudyGroup(id)).resolves.toEqual(STUDY_GROUP);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:3000/groups/${id}`,
      );
    });
  });

  describe('postStudyGroup', () => {
    beforeEach(() => {
      axios.post.mockResolvedValue({ data: STUDY_GROUP });
    });

    it('returns study group post', async () => {
      await expect(postStudyGroup(STUDY_GROUP)).resolves.toEqual(STUDY_GROUP);

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3000/groups/',
        STUDY_GROUP,
      );
    });
  });
});
