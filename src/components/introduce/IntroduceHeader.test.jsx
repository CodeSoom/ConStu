import React from 'react';

import { render } from '@testing-library/react';

import IntroduceHeader from './IntroduceHeader';

import STUDY_GROUP from '../../../fixtures/study-group';

describe('IntroduceHeader', () => {
  const renderIntroduceHeader = ({ group }) => render((
    <IntroduceHeader
      group={group}
    />
  ));

  it('renders study group title and contents', () => {
    const { container } = renderIntroduceHeader({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });
});
