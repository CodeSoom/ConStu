import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import TagList from './TagList';

const TagsFormWrapper = styled.div``;

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
    <TagsFormWrapper>
      <h4>태그</h4>
      <input
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
    </TagsFormWrapper>
  );
};

export default TagsForm;
