import React from 'react';

import { render } from '@testing-library/react';

import MyStudyInfoPage from './MyStudyInfoPage';

describe('MyStudyInfoPage', () => {
  const renderMyStudyInfoPage = () => render((
    <MyStudyInfoPage />
  ));

  it('renders My Study Info Text Contents', () => {
    const { container } = renderMyStudyInfoPage();

    expect(container).toHaveTextContent('내 스터디 정보');
  });
});
