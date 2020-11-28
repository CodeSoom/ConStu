import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import WriteButtonsContainer from './WriteButtonsContainer';

import WRITE_FORM from '../../../fixtures/write-form';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('WriteButtonsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    mockPush.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      writeField: WRITE_FORM,
      groupId: given.groupId,
    }));
  });

  const renderWriteButtonsContainer = () => render((
    <MemoryRouter>
      <WriteButtonsContainer />
    </MemoryRouter>
  ));

  it('render Write buttons', () => {
    const { container } = renderWriteButtonsContainer();

    expect(container).toHaveTextContent('등록하기');
    expect(container).toHaveTextContent('취소');
  });

  describe('when click cancel button', () => {
    given('groupId', () => (null));

    it('Go to the main page', () => {
      const { getByText } = renderWriteButtonsContainer();

      fireEvent.click(getByText('취소'));

      expect(mockPush).toBeCalledWith('/');
    });
  });

  describe('when click submit button', () => {
    context('with group', () => {
      given('groupId', () => ('1'));

      it('dispatch action writeStudyGroup event', () => {
        const { getByText } = renderWriteButtonsContainer();

        fireEvent.click(getByText('등록하기'));

        expect(dispatch).toBeCalledTimes(1);

        expect(mockPush).toBeCalledWith('/introduce/1');
      });
    });

    context('without group', () => {
      given('groupId', () => (null));

      it('dispatch action submit event', () => {
        const { getByText } = renderWriteButtonsContainer();

        fireEvent.click(getByText('등록하기'));

        expect(mockPush).not.toBeCalled();
      });
    });
  });
});
