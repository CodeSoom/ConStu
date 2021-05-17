import React from 'react';

import { render } from '@testing-library/react';

import STUDY_GROUP from '../../../fixtures/study-group';

import IntroduceHeader from './IntroduceHeader';
import MockTheme from '../common/test/MockTheme';

describe('IntroduceHeader', () => {
  const renderIntroduceHeader = ({ group }) => render((
    <MockTheme>
      <IntroduceHeader
        group={group}
      />
    </MockTheme>
  ));

  it('renders study group title and contents', () => {
    const { container } = renderIntroduceHeader({ group: STUDY_GROUP });

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });
});
