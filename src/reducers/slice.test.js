// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setStudyGroups,
  loadStudyGroups,
  setStudyGroup,
  loadStudyGroup,
} from './slice';

import STUDY_GROUPS from '../../fixtures/study-groups';
import STUDY_GROUP from '../../fixtures/study-group';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      groups: [],
      group: null,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setStudyGroups', () => {
    it('changes groups', () => {
      const initialState = {
        groups: [],
      };

      const state = reducer(initialState, setStudyGroups(STUDY_GROUPS));

      expect(state.groups).toHaveLength(2);
    });
  });

  describe('setStudyGroup', () => {
    it('get group detail contents', () => {
      const initialState = {
        group: null,
      };

      const state = reducer(initialState, setStudyGroup(STUDY_GROUP));

      expect(state.group.id).toBe(1);
    });
  });
});

describe('async actions', () => {
  let store;

  describe('loadStudyGroups', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('loads groups', async () => {
      await store.dispatch(loadStudyGroups());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setStudyGroups([]));
    });
  });

  describe('loadStudyGroups', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('load study group detail', async () => {
      await store.dispatch(loadStudyGroup(1));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setStudyGroup(null));
      expect(actions[1]).toEqual(setStudyGroup([]));
    });
  });
});
