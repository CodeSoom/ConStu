import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import IntroduceContainer from './IntroduceContainer';

describe('IntroduceContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      group: given.group,
    }));
  });

  const renderIntroduceContainer = ({ id }) => render((
    <MemoryRouter>
      <IntroduceContainer groupId={id} />
    </MemoryRouter>
  ));

  context('with group', () => {
    given('group', () => ({
      id: 1,
      moderatorId: 'user1',
      title: '스터디를 소개합니다. 1',
      personnel: 7,
      contents: '우리는 이것저것 합니다.1',
      tags: [
        'JavaScript',
        'React',
        'Algorithm',
      ],
    }));

    it('renders study group title and contents', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');
      expect(container).toHaveTextContent('우리는 이것저것 합니다.1');
    });

    it('call dispatch actions', () => {
      renderIntroduceContainer(1);

      expect(dispatch).toBeCalled();
    });
  });

  context('without group', () => {
    given('group', () => (null));

    it('renders "loading.." text', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('로딩중..');
    });
  });
});
