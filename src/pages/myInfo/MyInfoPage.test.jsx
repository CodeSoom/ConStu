import React from 'react';

import { render } from '@testing-library/react';

import MyInfoPage from './MyInfoPage';
import InjectMockProviders from '../../components/common/test/InjectMockProviders';

describe('MyInfoPage', () => {
  const renderMyInfoPage = () => render((
    <InjectMockProviders>
      <MyInfoPage />
    </InjectMockProviders>
  ));

  it('renders My Info Page text contents', () => {
    const { container } = renderMyInfoPage();

    expect(container).toHaveTextContent('내 정보');
  });
});
