import React from 'react';

import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import IntroduceFormContainer from './IntroduceFormContainer';

describe('IntroduceFormContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((state) => state({
      groupReducer: {
        group: given.group,
        applyFields: given.applyFields,
      },
    }));
  });

  const renderIntroduceContainer = () => render((
    <MemoryRouter>
      <IntroduceFormContainer />
    </MemoryRouter>
  ));

  context('with group', () => {
    given('group', () => ({
      id: 1,
      moderatorId: 'user1',
      title: '스터디를 소개합니다. 1',
      personnel: 7,
      participants: [],
      contents: '우리는 이것저것 합니다.1',
      tags: [
        'JavaScript',
        'React',
        'Algorithm',
      ],
    }));

    it('renders study group title and contents', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toHaveTextContent('우리는 이것저것 합니다.1');
    });
  });

  context('without group ', () => {
    given('group', () => (null));

    it('nothing renders', () => {
      const { container } = renderIntroduceContainer(1);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
