import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { Context as ResponsiveContext } from 'react-responsive';

import ReviewForm from './ReviewForm';
import MockTheme from '../common/test/MockTheme';

describe('ReviewForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const reviewForm = { rating: 3, content: '' };

  const renderReviewForm = ({
    error, fields = reviewForm, width = 700, hasPermission,
  }) => render((
    <MockTheme>
      <ResponsiveContext.Provider value={{ width }}>
        <ReviewForm
          error={error}
          fields={fields}
          onSubmit={handleSubmit}
          onChange={handleChange}
          hasPermission={hasPermission}
        />
      </ResponsiveContext.Provider>
    </MockTheme>
  ));

  context('When Mobile Screen', () => {
    describe('When the user is approved applicant and applyEndDate is Deadline', () => {
      const settings = {
        error: false,
        width: 400,
        hasPermission: true,
      };

      it('renders study review form', () => {
        const { container } = renderReviewForm(settings);
        expect(container).toHaveTextContent('스터디 후기를 작성해주세요!');
        expect(container.innerHTML).toContain('width: 30px;');
      });
    });
  });

  context('When Desktop Screen', () => {
    context('Has Permission about write review', () => {
      context('Has error', () => {
        const settings = {
          error: true,
          hasPermission: true,
        };

        it('should be textarea border color changes to red', () => {
          const { getByPlaceholderText } = renderReviewForm(settings);

          const textarea = getByPlaceholderText('후기를 입력해주세요!');

          expect(textarea).toHaveStyle('border: 1px solid #ff8787');
        });
      });

      context("Hasn't error", () => {
        const settings = {
          error: false,
          hasPermission: true,
        };

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

        it('call event submit about review form', () => {
          const { getByText } = renderReviewForm(settings);

          fireEvent.click(getByText('후기 등록하기'));

          expect(handleSubmit).toBeCalled();
        });
      });
    });

    context("Hasn't Permission about write review", () => {
      const settings = {
        error: false,
        hasPermission: false,
      };

      it('Should be nothing renders', () => {
        const { container } = renderReviewForm(settings);

        expect(container).toBeEmptyDOMElement();
      });
    });
  });
});
