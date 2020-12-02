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
      writeField: given.writeField,
      groupId: given.groupId,
      user: given.user,
    }));
  });

  const renderWriteButtonsContainer = () => render((
    <MemoryRouter>
      <WriteButtonsContainer />
    </MemoryRouter>
  ));

  it('render Write buttons', () => {
    given('writeField', () => (WRITE_FORM));

    const { container } = renderWriteButtonsContainer();

    expect(container).toHaveTextContent('등록하기');
    expect(container).toHaveTextContent('취소');
  });

  describe('when click cancel button', () => {
    given('groupId', () => (null));
    given('writeField', () => (WRITE_FORM));

    it('Go to the main page', () => {
      const { getByText } = renderWriteButtonsContainer();

      fireEvent.click(getByText('취소'));

      expect(mockPush).toBeCalledWith('/');
    });
  });

  describe('when click submit button', () => {
    context('with user', () => {
      given('user', () => ('user'));

      context('without input value null, so validation check success', () => {
        given('writeField', () => (WRITE_FORM));

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

      context('with input value null, so validation check failure', () => {
        describe('When the title and applyEndDate, personnel are blank', () => {
          given('writeField', () => ({
            title: '',
            contents: '우리는 이것저것 합니다.1',
            moderatorId: 'user1',
            applyEndDate: '',
            participants: [],
            personnel: '',
            tags: [
              'JavaScript',
              'Algorithm',
            ],
          }));

          it('renders error message "There are some items that have not been entered."', () => {
            const { container, getByText } = renderWriteButtonsContainer();

            fireEvent.click(getByText('등록하기'));

            expect(container).toHaveTextContent('입력이 안된 사항이 있습니다.');
          });
        });

        describe('When the length of tags is 0', () => {
          given('writeField', () => ({
            title: '123',
            contents: '우리는 이것저것 합니다.1',
            moderatorId: 'user1',
            applyEndDate: new Date().toString(),
            participants: [],
            personnel: '1',
            tags: [],
          }));

          it('renders error message "Please enter a tag."', () => {
            const { container, getByText } = renderWriteButtonsContainer();

            fireEvent.click(getByText('등록하기'));

            expect(container).toHaveTextContent('태그를 입력하세요.');
          });
        });

        describe('When the application deadline is earlier than the current time', () => {
          given('writeField', () => ({
            title: '123',
            contents: '우리는 이것저것 합니다.1',
            moderatorId: 'user1',
            applyEndDate: '2020-10-01',
            participants: [],
            personnel: '1',
            tags: [
              'javascript',
              'react',
            ],
          }));

          it('renders error message "The application deadline is earlier than the current time."', () => {
            const { container, getByText } = renderWriteButtonsContainer();

            fireEvent.click(getByText('등록하기'));

            expect(container).toHaveTextContent('접수 마감날짜가 현재 시간보다 빠릅니다.');
          });
        });
      });
    });

    context('without user', () => {
      given('user', () => (null));

      given('writeField', () => ({
        title: '123',
        contents: '우리는 이것저것 합니다.1',
        moderatorId: 'user1',
        applyEndDate: '2020-10-01',
        participants: [],
        personnel: '1',
        tags: [
          'javascript',
          'react',
        ],
      }));

      it('renders error message "Please use after logging in"', () => {
        const { container, getByText } = renderWriteButtonsContainer();

        fireEvent.click(getByText('등록하기'));

        expect(container).toHaveTextContent('로그인 후 이용하세요.');
      });
    });
  });
});
