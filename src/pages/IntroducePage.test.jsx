import React from 'react';

import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import IntroducePage from './IntroducePage';

describe('IntroducePage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: {
          id: 1,
          moderatorId: 'user1',
          title: '스터디를 소개합니다. 1',
          personnel: 7,
          contents: '우리는 이것저것 합니다.1',
          participants: [],
          tags: [
            'JavaScript',
            'React',
            'Algorithm',
          ],
        },
      },
      authReducer: {},
    }));
  });

  context('with params props', () => {
    it('renders title', () => {
      const params = { id: '1' };

      const { container } = render((
        <MemoryRouter>
          <IntroducePage params={params} />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');
    });
  });

  context('without params props', () => {
    it('renders title', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/introduce/1']}>
          <IntroducePage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent('스터디를 소개합니다. 1');
    });
  });
});
