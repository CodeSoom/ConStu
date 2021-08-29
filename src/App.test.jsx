import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { lightTheme, darkTheme } from './styles/theme';

import USER_DETAIL from '../fixtures/user-detail';
import STUDY_GROUP from '../fixtures/study-group';
import STUDY_GROUPS from '../fixtures/study-groups';

import App from './App';
import InjectMockProviders from './components/common/test/InjectMockProviders';

jest.mock('react-redux');

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
        user: given.user,
        userDetail: given.userDetail,
      },
      commonReducer: {
        theme: given.theme,
        errorType: null,
      },
    }));
  });

  const renderApp = ({ path, theme = lightTheme }) => render((
    <InjectMockProviders
      path={path}
      theme={theme}
    >
      <App />
    </InjectMockProviders>
  ));

  context('with path /', () => {
    given('group', () => (null));
    it('renders the study list page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('스터디를 직접 개설하거나 참여해보세요!');
    });

    describe('Renders with theme', () => {
      context('When theme is light', () => {
        given('theme', () => (false));

        it('Renders light toggle', () => {
          const { getByTestId } = renderApp({ path: '/', theme: lightTheme });

          expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'light');
        });
      });

      context('When theme is dark', () => {
        given('theme', () => (true));

        it('Renders dark toggle', () => {
          const { getByTestId } = renderApp({ path: '/', theme: darkTheme });

          expect(getByTestId('theme-toggle')).toHaveAttribute('title', 'dark');
        });
      });
    });
  });

  context('with Not Found path', () => {
    given('group', () => ([]));

    it('renders the study introduce page', () => {
      const { container } = renderApp({ path: '/some-not-found' });

      expect(container).toHaveTextContent('아무것도 없어요!');
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

  context('with My Info path', () => {
    given('user', () => ('user1'));

    it('renders My Info Page', () => {
      const { container } = renderApp({ path: '/myinfo' });

      expect(container).toHaveTextContent('내 정보');
    });

    it('renders My Study Info Page', () => {
      const { container } = renderApp({ path: '/myinfo/study' });

      expect(container).toHaveTextContent('내 스터디 정보');
    });

    it('renders Profile Setting Page', () => {
      given('user', () => USER_DETAIL.email);
      given('userDetail', () => (USER_DETAIL));

      const { container } = renderApp({ path: '/myinfo/setting' });

      expect(container).toHaveTextContent('계정 설정');
    });
  });
});
