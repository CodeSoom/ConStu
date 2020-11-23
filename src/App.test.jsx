import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import App from './App';

import STUDY_GROUPS from '../fixtures/study-groups';
import STUDY_GROUP from '../fixtures/study-group';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      groups: STUDY_GROUPS,
      group: STUDY_GROUP,
      writeField: {
        tags: [],
      },
    }));
  });

  const renderApp = ({ path }) => render((
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  ));

  context('with path /', () => {
    it('renders the study list page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('지금 바로 시작하세요!');
    });
  });

  context('with path /introduce', () => {
    it('renders the study introduce page', () => {
      const { container } = renderApp({ path: '/introduce/1' });

      expect(container).toHaveTextContent('스터디를 소개합니다.2');
    });
  });

  context('with path /write', () => {
    it('renders the study write page', () => {
      const { container } = renderApp({ path: '/write' });

      expect(container).toHaveTextContent('스터디 그룹 개설하기');
    });
  });
});
