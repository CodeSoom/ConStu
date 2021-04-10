import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import App from './App';

import { loadItem } from './services/storage';

import STUDY_GROUPS from '../fixtures/study-groups';
import STUDY_GROUP from '../fixtures/study-group';

jest.mock('react-redux');
jest.mock('./services/storage');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      groupReducer: {
        groups: STUDY_GROUPS,
        group: given.group,
        writeField: {
          tags: [],
        },
        applyFields: {
          reason: '',
          wantToGet: '',
        },
        studyReviewFields: {
          rating: 3,
          review: '',
        },
      },
      authReducer: {
        register: {
          userEmail: '',
          password: '',
          passwordConfirm: '',
        },
        login: {
          userEmail: '',
          password: '',
        },
        user: given.user,
      },
    }));
  });

  const renderApp = ({ path }) => render((
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  ));

  context('with path /', () => {
    given('group', () => (null));
    it('renders the study list page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('스터디를 직접 개설하거나 참여해보세요!');
    });
  });

  context('with path /introduce', () => {
    given('group', () => (STUDY_GROUP));
    it('renders the study introduce page', () => {
      const { container } = renderApp({ path: '/introduce/1' });

      expect(container).toHaveTextContent('스터디를 소개합니다.2');
    });
  });

  context('with path /write', () => {
    given('group', () => (null));
    given('user', () => ('user1'));
    it('renders the study write page', () => {
      const { container } = renderApp({ path: '/write' });

      expect(container).toHaveTextContent('내용을 작성해주세요.');
    });
  });

  context('with path /login', () => {
    it('renders the study login page', () => {
      const { container } = renderApp({ path: '/login' });

      expect(container).toHaveTextContent('로그인');
    });
  });

  context('with path /register', () => {
    it('renders the study register page', () => {
      const { container } = renderApp({ path: '/register' });

      expect(container).toHaveTextContent('회원가입');
    });
  });

  context('when logged in', () => {
    const user = {
      email: 'seungmin@naver.com',
    };

    beforeEach(() => {
      loadItem.mockImplementation(() => user);
    });

    it('calls dispatch with "setUser" action', () => {
      renderApp({ path: '/' });

      expect(dispatch).toBeCalledWith({
        type: 'auth/setUser',
        payload: user.email,
      });
    });
  });
});
