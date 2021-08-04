import React from 'react';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import MyInfoTab from './MyInfoTab';

describe('MyInfoTab', () => {
  const renderMyInfoTab = () => render((
    <MemoryRouter>
      <MyInfoTab />
    </MemoryRouter>
  ));

  const linkInfo = [
    { name: '내 스터디 정보', url: '/myinfo/study' },
    { name: '계정 설정', url: '/myinfo/setting' },
  ];

  it('render My Info Tab Contents', () => {
    const { container, getByText } = renderMyInfoTab();

    linkInfo.forEach(({ name, url }) => {
      expect(container).toHaveTextContent(name);
      expect(getByText(name)).toHaveAttribute('href', url);
    });
  });

  it('Click on the link to change the color', () => {
    const { getByText } = renderMyInfoTab();

    linkInfo.forEach(({ name }) => {
      fireEvent.click(getByText(name));

      expect(getByText(name)).toHaveStyle('color: skyBlue');
    });
  });
});
