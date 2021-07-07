import { createSlice } from '@reduxjs/toolkit';

import produce from 'immer';

import {
  getStudyGroup,
  getStudyGroups,
  postStudyGroup,
  updatePostParticipant,
  deletePostParticipant,
  updateConfirmPostParticipant,
  deletePostGroup,
  editPostStudyGroup,
  postUpdateStudyReview,
  deletePostReview,
} from '../services/api';

import { setNotFound } from './commonSlice';

import { formatGroup } from '../util/utils';

const writeInitialState = {
  title: '',
  contents: '',
  moderatorId: '',
  applyEndDate: '',
  participants: [],
  personnel: '1',
  tags: [],
};

const { actions, reducer } = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    group: null,
    groupId: null,
    groupError: null,
    originalArticleId: null,
    writeField: writeInitialState,
  },

  reducers: {
    setStudyGroups(state, { payload: groups }) {
      return {
        ...state,
        groups,
      };
    },

    setStudyGroup(state, { payload: group }) {
      return {
        ...state,
        group,
      };
    },

    setGroupError(state, { payload: error }) {
      return {
        ...state,
        groupError: error,
      };
    },

    changeWriteField(state, { payload: { name, value } }) {
      return produce(state, (draft) => {
        draft.writeField[name] = value;
      });
    },

    clearWriteFields(state) {
      return {
        ...state,
        groupId: null,
        groupError: null,
        originalArticleId: null,
        writeField: writeInitialState,
      };
    },

    successWrite(state, { payload: groupId }) {
      return {
        ...state,
        groupId,
      };
    },

    setOriginalArticle(state, { payload: fields }) {
      const {
        title, contents, applyEndDate, tags, personnel, id,
      } = fields;

      return {
        ...state,
        originalArticleId: id,
        writeField: {
          title,
          contents,
          applyEndDate,
          tags,
          personnel,
        },
      };
    },

    setGroupReview(state, { payload: review }) {
      return produce(state, (draft) => {
        draft.group.reviews.push({
          ...review,
          createDate: new Date().toString(),
        });
      });
    },
  },
});

export const {
  setStudyGroups,
  setStudyGroup,
  setGroupError,
  changeWriteField,
  clearWriteFields,
  successWrite,
  setOriginalArticle,
  setGroupReview,
} = actions;

export const loadStudyGroups = (tag) => async (dispatch) => {
  if (tag) {
    dispatch(setStudyGroups(null));
  }

  const response = await getStudyGroups(tag);

  const groups = response.map((doc) => formatGroup(doc));

  dispatch(setStudyGroups(groups));
};

export const loadStudyGroup = (id) => async (dispatch) => {
  dispatch(setStudyGroup(null));

  try {
    const response = await getStudyGroup(id);

    if (!response) {
      dispatch(setNotFound());
    }

    dispatch(setStudyGroup(formatGroup(response)));
  } catch (error) {
    dispatch(setGroupError(error.code));
  }
};

export const writeStudyGroup = () => async (dispatch, getState) => {
  const { groupReducer, authReducer } = getState();

  const { user } = authReducer;

  try {
    const groupId = await postStudyGroup(
      produce(groupReducer.writeField, (draft) => {
        draft.moderatorId = user;
        draft.reviews = [];
        draft.participants.push({
          id: user,
        });
      }),
    );

    dispatch(successWrite(groupId));
    dispatch(clearWriteFields());
  } catch (error) {
    dispatch(setGroupError(error.code));
  }
};

export const editStudyGroup = (id) => async (dispatch, getState) => {
  const { groupReducer } = getState();

  try {
    await editPostStudyGroup({
      ...groupReducer.writeField,
      id,
    });

    dispatch(successWrite(id));
    dispatch(clearWriteFields());
  } catch (error) {
    dispatch(setGroupError(error.code));
  }
};

export const updateParticipant = (formData) => async (dispatch, getState) => {
  const { groupReducer: { group }, authReducer: { user } } = getState();

  const userInfo = {
    id: user,
    confirm: false,
    ...formData,
  };

  const newGroup = produce(group, (draft) => {
    draft.participants.push(userInfo);
  });

  await updatePostParticipant({
    user: userInfo,
    id: group.id,
  });

  dispatch(setStudyGroup(newGroup));
};

export const deleteParticipant = () => async (dispatch, getState) => {
  const { groupReducer: { group }, authReducer: { user } } = getState();

  const participants = group.participants.filter(({ id }) => id !== user);

  const newGroup = {
    ...group,
    participants,
  };

  await deletePostParticipant({
    participants,
    id: group.id,
  });

  dispatch(setStudyGroup(newGroup));
};

export const updateConfirmParticipant = (userEmail) => async (dispatch, getState) => {
  const { groupReducer: { group } } = getState();

  const { participants, id } = group;

  const newParticipants = participants.reduce((users, user) => {
    if (user.id === userEmail) {
      return [
        ...users,
        {
          ...user,
          confirm: !user.confirm,
        },
      ];
    }

    return [...users, user];
  }, []);

  await updateConfirmPostParticipant({
    id,
    participants: newParticipants,
  });

  dispatch(setStudyGroup({
    ...group,
    participants: newParticipants,
  }));
};

export const deleteGroup = (groupId) => async (dispatch) => {
  await deletePostGroup(groupId);

  dispatch(loadStudyGroups());
};

export const setStudyReview = (review) => async (dispatch, getState) => {
  const { groupReducer: { group } } = getState();

  await postUpdateStudyReview({
    groupId: group.id,
    review,
  });

  dispatch(setGroupReview(review));
};

export const deleteStudyReview = (reviewId) => async (dispatch, getState) => {
  const { groupReducer: { group } } = getState();

  const reviews = group.reviews.filter(({ id }) => id !== reviewId);

  await deletePostReview({
    id: group.id,
    reviews,
  });

  dispatch(setStudyGroup({
    ...group,
    reviews,
  }));
};

export default reducer;
