// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import reducer, {
  setStudyGroups,
  loadStudyGroups,
  setStudyGroup,
  loadStudyGroup,
  changeWriteField,
  writeStudyGroup,
  clearWriteFields,
} from './slice';

import STUDY_GROUPS from '../../fixtures/study-groups';
import STUDY_GROUP from '../../fixtures/study-group';
import WRITE_FORM from '../../fixtures/write-form';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../services/api');

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      groups: [],
      group: null,
      writeField: {
        title: '',
        contents: '',
        moderatorId: '',
        applyEndDate: '',
        participants: [],
        personnel: 0,
        tags: [],
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setStudyGroups', () => {
    context('with tag', () => {
      it('get study groups list with tags filtered', () => {
        const initialState = {
          groups: [],
        };

        const state = reducer(
          initialState,
          setStudyGroups({ groups: STUDY_GROUPS, tag: 'JavaScript' }),
        );

        expect(state.groups).toHaveLength(1);
      });
    });

    context('without tag', () => {
      it("get study groups list doesn't tags filtered", () => {
        const initialState = {
          groups: [],
        };

        const state = reducer(
          initialState,
          setStudyGroups({ groups: STUDY_GROUPS, tag: '' }),
        );

        expect(state.groups).toHaveLength(2);
      });
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

  describe('changeWriteField', () => {
    it('changes a field of establish study group write', () => {
      const initialState = {
        writeField: {
          title: '',
          contents: '',
          moderatorId: '',
          applyEndDate: '',
          participants: [],
          personnel: 0,
          tags: [],
        },
      };

      const state = reducer(
        initialState,
        changeWriteField({ name: 'tags', value: ['JavaScript', 'React'] }),
      );

      expect(state.writeField.tags).toEqual(['JavaScript', 'React']);
    });
  });

  describe('clearWriteFields', () => {
    const initialState = {
      writeField: {
        title: '타이틀',
        contents: '내용',
      },
    };

    it('clears fields of write', () => {
      const state = reducer(initialState, clearWriteFields());

      const { writeField: { title, contents } } = state;

      expect(title).toBe('');
      expect(contents).toBe('');
    });
  });
});

describe('async actions', () => {
  let store;

  describe('loadStudyGroups', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('loads study group list', async () => {
      await store.dispatch(loadStudyGroups());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setStudyGroups({
        groups: [],
        tag: undefined,
      }));
    });
  });

  describe('loadStudyGroup', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('load study group detail', async () => {
      await store.dispatch(loadStudyGroup(1));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setStudyGroup(null));
      expect(actions[1]).toEqual(setStudyGroup(undefined));
    });
  });

  describe('writeStudyGroup', () => {
    beforeEach(() => {
      store = mockStore({
        writeField: WRITE_FORM,
      });
    });

    it('dispatches clearWriteFields', async () => {
      await store.dispatch(writeStudyGroup());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setStudyGroup(undefined));
      expect(actions[1]).toEqual(clearWriteFields(undefined));
    });
  });
});
