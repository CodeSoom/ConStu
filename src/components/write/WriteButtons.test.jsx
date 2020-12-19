import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import WriteButtons from './WriteButtons';

import WRITE_FROM from '../../../fixtures/write-form';

describe('WriteButtons', () => {
  const handleSubmit = jest.fn();
  const handleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWriteButtons = ({ fields, originalArticleId = false }) => render((
    <WriteButtons
      fields={fields}
      isEdit={originalArticleId}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  ));

  it('render Write buttons', () => {
    const { container } = renderWriteButtons({ fields: WRITE_FROM });

    expect(container).toHaveTextContent('등록하기');
    expect(container).toHaveTextContent('취소');
  });

  context('without originalArticleId', () => {
    context('with input value', () => {
      it('call event submit action', () => {
        const { getByText } = renderWriteButtons({ fields: WRITE_FROM });

        const button = getByText('등록하기');

        fireEvent.click(button);

        expect(handleSubmit).toBeCalled();
      });

      it('call event cancel action', () => {
        const { getByText } = renderWriteButtons({ fields: WRITE_FROM });

        const button = getByText('취소');

        fireEvent.click(button);

        expect(handleCancel).toBeCalled();
      });
    });

    context('with input value null', () => {
      describe('When the title is blank', () => {
        const fields = {
          ...WRITE_FROM,
          title: '',
        };

        it('renders error message "Please enter the subject."', () => {
          const { container, getByText } = renderWriteButtons({ fields });

          fireEvent.click(getByText('등록하기'));

          expect(container).toHaveTextContent('제목을 입력해주세요.');
        });
      });

      describe('When the applyEndDate is blank', () => {
        const fields = {
          ...WRITE_FROM,
          applyEndDate: '',
        };

        it('renders error message "Please enter the application deadline."', () => {
          const { container, getByText } = renderWriteButtons({ fields });

          fireEvent.click(getByText('등록하기'));

          expect(container).toHaveTextContent('모집 마감 일자를 입력해주세요.');
        });
      });

      describe('when personnel error', () => {
        const ERROR_PERSONNEL = '참여 인원 수를 입력하지 않았거나, 잘못된 값을 입력하였습니다.';

        describe("When the personnel isn't number", () => {
          const fields = {
            ...WRITE_FROM,
            personnel: 'e',
          };

          it(`renders error message "You did not enter the number of participants, 
            or you entered an incorrect value."`, () => {
            const { container, getByText } = renderWriteButtons({ fields });

            fireEvent.click(getByText('등록하기'));

            expect(container).toHaveTextContent(ERROR_PERSONNEL);
          });
        });

        describe('When personnel is less than 1', () => {
          const fields = {
            ...WRITE_FROM,
            personnel: '-1',
          };

          it(`renders error message "You did not enter the number of participants, 
            or you entered an incorrect value."`, () => {
            const { container, getByText } = renderWriteButtons({ fields });

            fireEvent.click(getByText('등록하기'));

            expect(container).toHaveTextContent(ERROR_PERSONNEL);
          });
        });
      });

      describe('When there is no content', () => {
        const fields = {
          ...WRITE_FROM,
          contents: '',
        };

        it('renders error message "Please enter your details."', () => {
          const { container, getByText } = renderWriteButtons({ fields });

          fireEvent.click(getByText('등록하기'));

          expect(container).toHaveTextContent('내용을 입력해주세요.');
        });
      });

      describe('When the length of tags is 0', () => {
        const fields = {
          ...WRITE_FROM,
          tags: [],
        };

        it('renders error message "Please enter a tag."', () => {
          const { container, getByText } = renderWriteButtons({ fields });

          fireEvent.click(getByText('등록하기'));

          expect(container).toHaveTextContent('태그를 입력하세요.');
        });
      });

      describe('When the application deadline is earlier than the current time', () => {
        const fields = {
          ...WRITE_FROM,
          applyEndDate: '2020-10-01',
        };

        it('renders error message "The application deadline is earlier than the current time."', () => {
          const { container, getByText } = renderWriteButtons({ fields });

          fireEvent.click(getByText('등록하기'));

          expect(container).toHaveTextContent('접수 마감날짜가 현재 시간보다 빠릅니다.');
        });
      });
    });
  });

  context('with originalArticleId', () => {
    it('renders Edit buttons', () => {
      const { container } = renderWriteButtons({
        fields: WRITE_FROM,
        originalArticleId: true,
      });

      expect(container).toHaveTextContent('수정하기');
    });
  });
});
