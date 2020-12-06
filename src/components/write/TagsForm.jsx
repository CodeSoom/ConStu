import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import palette from '../../styles/palette';

import TagList from './TagList';

const TagInputWrapper = styled.input`
  height: 30px;
  padding: 5px;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 20px;
  color: #5f5f5f;
  border: 2px solid #D7E2EB;
  &:focus, &.hover {
    border: 2px solid ${palette.teal[5]};
  }
  width: 220px;
`;

const TagsForm = ({ onChange, tags }) => {
  const [tag, setTag] = useState('');
  const [inputTags, setInputTags] = useState([]);

  const validateInput = (value) => {
    if (!value || inputTags.includes(value)) {
      return;
    }

    const resultTags = [...inputTags, value];

    setInputTags(resultTags);
    onChange(resultTags);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setTag(value);
  };

  const handleRemove = (removeTags) => {
    setInputTags(removeTags);
    onChange(removeTags);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      validateInput(tag.trim());
      setTag('');
    }
  };

  useEffect(() => {
    setInputTags(tags);
  }, [tags]);

  return (
    <div>
      <TagInputWrapper
        type="text"
        placeholder="태그를 입력하세요"
        value={tag}
        onChange={handleChange}
        onKeyPress={handleSubmit}
      />
      <TagList
        tags={inputTags}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default TagsForm;
