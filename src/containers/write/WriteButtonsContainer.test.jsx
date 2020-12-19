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
      groupReducer: {
        writeField: given.writeField,
        groupId: given.groupId,
        originalArticleId: given.originalArticleId,
      },
      authReducer: {
        user: given.user,
      },
    }));
  });

  const renderWriteButtonsContainer = () => render((
    <MemoryRouter>
      <WriteButtonsContainer />
    </MemoryRouter>
  ));

  context('with originalArticleId', () => {
    given('originalArticleId', () => ('1'));

    it('renders edit button', () => {
      given('writeField', () => (WRITE_FORM));

      const { container } = renderWriteButtonsContainer();

      expect(container).toHaveTextContent('수정하기');
      expect(container).toHaveTextContent('취소');
    });

    describe('when click submit button and then without input value null, so validation check success', () => {
      given('user', () => ('user'));
      given('writeField', () => (WRITE_FORM));

      context('with group', () => {
        given('groupId', () => ('1'));

        it('dispatch action editStudyGroup event', () => {
          const { getByText } = renderWriteButtonsContainer();

          fireEvent.click(getByText('수정하기'));

          expect(dispatch).toBeCalledTimes(1);

          expect(mockPush).toBeCalledWith('/introduce/1');
        });
      });

      context('without group', () => {
        given('groupId', () => (null));

        it('dispatch action submit event', () => {
          const { getByText } = renderWriteButtonsContainer();

          fireEvent.click(getByText('수정하기'));

          expect(mockPush).not.toBeCalled();
        });
      });
    });
  });

  context('without originalArticleId', () => {
    given('originalArticleId', () => (null));

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

        it('go to redirection main page', () => {
          renderWriteButtonsContainer();

          expect(mockPush).toBeCalledWith('/');
        });
      });
    });
  });
});
