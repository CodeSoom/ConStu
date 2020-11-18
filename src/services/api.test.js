import axios from 'axios';

import {
  getStudyGroup,
  getStudyGroups,
} from './api';

import STUDY_GROUPS from '../../fixtures/study-groups';
import STUDY_GROUP from '../../fixtures/study-group';

jest.mock('axios');
describe('api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const axiosMockResolved = (data) => {
    axios.get.mockResolvedValue({ data });
  };

  describe('getStudyGroups', () => {
    it('returns study groups list', async () => {
      axiosMockResolved(STUDY_GROUPS);

      await expect(getStudyGroups()).resolves.toEqual(STUDY_GROUPS);

      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/groups/',
      );
    });
  });

  describe('getStudyGroup', () => {
    const { id } = STUDY_GROUP;

    it('returns study group detail', async () => {
      axiosMockResolved(STUDY_GROUP);

      await expect(getStudyGroup(id)).resolves.toEqual(STUDY_GROUP);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:3000/groups/${id}`,
      );
    });
  });
});
