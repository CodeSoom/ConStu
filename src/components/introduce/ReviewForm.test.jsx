import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const reviewForm = { rating: 3, content: '' };

  const renderReviewForm = ({
    group, user, fields = reviewForm, width = 700,
  }) => render((
    <ResponsiveContext.Provider value={{ width }}>
      <ReviewForm
        user={user}
        group={group}
        fields={fields}
        onSubmit={handleSubmit}
        onChangeReview={handleChange}
      />
    </ResponsiveContext.Provider>

  ));

  context('When Mobile Screen', () => {
    describe('When the user is approved applicant and applyEndDate is Deadline', () => {
      const settings = {
        group: {
          participants: [{ id: 'user1', confirm: true }],
          reviews: [],
        },
        user: 'user1',
        width: 400,
      };

      it('renders study review form', () => {
        const { container } = renderReviewForm(settings);
        expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
        expect(container.innerHTML).toContain('width: 30px;');
      });
    });
  });

  context('When Desktop Screen', () => {
    context('with user', () => {
      context('When you have already written a review', () => {
        const settings = {
          group: {
            participants: [{ id: 'user1', confirm: true }],
            reviews: [{ id: 'user1', content: 'review' }],
          },
          user: 'user1',
        };

        it('Should be nothing renders', () => {
          const { container } = renderReviewForm(settings);
          expect(container).toBeEmptyDOMElement();
        });
      });

      context("When you didn't write a review", () => {
        describe('When the user is approved applicant and applyEndDate is Deadline', () => {
          const settings = {
            group: {
              participants: [{ id: 'user1', confirm: true }],
              reviews: [],
            },
            user: 'user1',
          };

          it('renders study review form', () => {
            const { container } = renderReviewForm(settings);
            expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
          });
          it('call event change review form', () => {
            const { getByPlaceholderText } = renderReviewForm(settings);

            const textarea = getByPlaceholderText('후기를 입력해주세요!');

            fireEvent.change(textarea, {
              target: {
                name: 'content',
                value: 'test',
              },
            });

            expect(handleChange).toBeCalled();
          });

          it('call event click for review form', () => {
            const { getByText } = renderReviewForm(settings);

            fireEvent.click(getByText('후기 등록하기'));

            expect(handleSubmit).toBeCalled();
          });
        });

        describe('When the user is not approved applicant', () => {
          it('nothing renders study review form', () => {
            const { container } = renderReviewForm({
              group: {
                participants: [],
                reviews: [],
              },
              user: 'user2',
            });

            expect(container).toBeEmptyDOMElement();
          });
        });
      });
    });

    context('without user', () => {
      it('nothing renders study review form', () => {
        const { container } = renderReviewForm({
          group: {
            participants: [],
            reviews: [],
          },
          user: null,
        });

        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
