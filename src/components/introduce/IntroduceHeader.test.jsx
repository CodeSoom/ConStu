import React from 'react';

import { render } from '@testing-library/react';

import IntroduceHeader from './IntroduceHeader';
import InjectMockProviders from '../common/test/InjectMockProviders';

describe('IntroduceHeader', () => {
  const renderIntroduceHeader = (title) => render((
    <InjectMockProviders>
      <IntroduceHeader
        title={title}
      />
    </InjectMockProviders>
  ));

  it('renders study group title and contents', () => {
    const { container } = renderIntroduceHeader('스터디를 소개합니다.2');

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });
});
