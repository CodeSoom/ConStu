import axios from 'axios';

import {
  getStudyGroups,
} from './api';

import STUDY_GROUPS from '../../fixtures/study-groups';

jest.mock('axios');
describe('api', () => {
  describe('getStudyGroups', () => {
    it('returns study groups', async () => {
      axios.get.mockResolvedValue({ data: STUDY_GROUPS });

      await expect(getStudyGroups()).resolves.toEqual(STUDY_GROUPS);

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/groups/',
      );
    });
  });
});
