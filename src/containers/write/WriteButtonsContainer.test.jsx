import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';

import WriteButtonsContainer from './WriteButtonsContainer';

import WRITE_FORM from '../../../fixtures/write-form';
import STUDY_GROUP from '../../../fixtures/study-group';

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
      group: given.group,
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

  describe('when click submit button', () => {
    context('with group', () => {
      given('group', () => (STUDY_GROUP));
      it('dispatch action submit event', () => {
        const { getByText } = renderWriteButtonsContainer();

        fireEvent.click(getByText('등록하기'));

        expect(dispatch).toBeCalledTimes(1);

        expect(mockPush).toBeCalledWith('/introduce/1');
      });
    });

    context('without group', () => {
      given('group', () => (null));
      it('dispatch action submit event', () => {
        const { getByText } = renderWriteButtonsContainer();

        fireEvent.click(getByText('등록하기'));

        expect(mockPush).not.toBeCalled();
      });
    });
  });
});
