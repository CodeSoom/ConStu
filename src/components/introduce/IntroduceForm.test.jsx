import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import IntroduceForm from './IntroduceForm';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('IntroduceForm', () => {
  const renderIntroduceForm = ({ group, time }) => render((
    <MemoryRouter>
      <IntroduceForm
        group={group}
        realTime={time}
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
});
