import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import TagsForm from './TagsForm';

describe('TagsForm', () => {
  const handleChange = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
  });

  const renderTagsTagsForm = (tags) => render((
    <TagsForm
      tags={tags}
      onChange={handleChange}
    />
  ));

  describe('render Tag Form Container contents text', () => {
    it('renders tag form text', () => {
      const { getByPlaceholderText, container } = renderTagsTagsForm([]);

      expect(getByPlaceholderText('태그를 입력하세요')).not.toBeNull();
      expect(container).toHaveTextContent('태그');
    });
  });

  describe('Check input tag validate', () => {
    context('with tag input value', () => {
      const tags = ['JavaScript', 'React'];
      it('listens write field change events', () => {
        const { getByPlaceholderText } = renderTagsTagsForm(['CSS']);

        const input = getByPlaceholderText('태그를 입력하세요');

        tags.forEach((tag) => {
          fireEvent.change(input, { target: { value: tag } });

          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

          expect(input).toHaveValue('');
        });
        expect(handleChange).toBeCalledTimes(2);
      });
    });

    context('without tag input value', () => {
      const tags = [];
      it("doesn't listens write field change events", () => {
        const { getByPlaceholderText } = renderTagsTagsForm(tags);

        const input = getByPlaceholderText('태그를 입력하세요');

        fireEvent.change(input, { target: { value: '' } });

        fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

        expect(handleChange).not.toBeCalled();
      });
    });

    describe('It is not executed because the current tag value is included.', () => {
      const tags = ['JavaScript', 'React'];
      it('listens write field change events', () => {
        const { getByPlaceholderText } = renderTagsTagsForm(tags);

        const input = getByPlaceholderText('태그를 입력하세요');

        tags.forEach((tag) => {
          fireEvent.change(input, { target: { value: tag } });

          fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

          expect(input).toHaveValue('');

          expect(handleChange).not.toBeCalled();
        });
      });
    });
  });

  context('with tags', () => {
    const tags = ['JavaScript', 'React'];

    it('renders Tags are below the input window', () => {
      const { container } = renderTagsTagsForm(tags);

      expect(container).toHaveTextContent('#JavaScript');
      expect(container).toHaveTextContent('#React');
    });

    it('Click event remove tag', () => {
      const { getByText, container } = renderTagsTagsForm(tags);

      tags.forEach((tag) => {
        fireEvent.click(getByText(`#${tag}`));

        expect(container).not.toHaveTextContent(`#${tag}`);
      });

      expect(handleChange).toBeCalledTimes(2);
    });
  });

  context('without tags', () => {
    const tags = [];

    it('renders Tags are below the input window', () => {
      const { container } = renderTagsTagsForm(tags);

      expect(container).not.toHaveTextContent('#JavaScript');
      expect(container).not.toHaveTextContent('#React');
    });
  });
});
