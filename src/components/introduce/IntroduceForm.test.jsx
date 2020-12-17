import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render } from '@testing-library/react';

import IntroduceForm from './IntroduceForm';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('IntroduceForm', () => {
  const handleRemove = jest.fn();

  const renderIntroduceForm = ({ group, time, user = 'user2' }) => render((
    <MemoryRouter>
      <IntroduceForm
        user={user}
        group={group}
        realTime={time}
        onRemove={handleRemove}
      />
    </MemoryRouter>
  ));

  it('renders createDate text', () => {
    const { container } = renderIntroduceForm({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('2020년 12월 06일');
    expect(container).toHaveTextContent('1 / 2');
  });

  it('renders links of tags', () => {
    const { container } = renderIntroduceForm({ group: STUDY_GROUP });

    expect(container.innerHTML).toContain('<a ');
  });

  context('with moderator', () => {
    it('renders delete button and revise button', () => {
      const { container } = renderIntroduceForm({ group: STUDY_GROUP });

      expect(container).toHaveTextContent('수정');
      expect(container).toHaveTextContent('삭제');
    });

    it('click to delete button call event', () => {
      const { getByText } = renderIntroduceForm({ group: STUDY_GROUP });

      fireEvent.click(getByText('삭제'));

      expect(handleRemove).toBeCalled();
    });
  });

  context('without moderator', () => {
    it("doesn't renders delete button and revise button", () => {
      const { container } = renderIntroduceForm({ group: STUDY_GROUP, user: 'user' });

      expect(container).not.toHaveTextContent('수정');
      expect(container).not.toHaveTextContent('삭제');
    });
  });
});
