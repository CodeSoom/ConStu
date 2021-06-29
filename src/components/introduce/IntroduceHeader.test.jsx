import React from 'react';

import { render } from '@testing-library/react';

import IntroduceHeader from './IntroduceHeader';
import MockTheme from '../common/test/MockTheme';

describe('IntroduceHeader', () => {
  const renderIntroduceHeader = (title) => render((
    <MockTheme>
      <IntroduceHeader
        title={title}
      />
    </MockTheme>
  ));

  it('renders study group title and contents', () => {
    const { container } = renderIntroduceHeader('스터디를 소개합니다.2');

    expect(container).toHaveTextContent('스터디를 소개합니다.2');
  });
});
