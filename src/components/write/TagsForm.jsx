import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

const TagsFormWrapper = styled.div``;

const TagsForm = ({ onChange, tags }) => {
  const [tag, setTag] = useState('');
  const [inputTags, setInputTags] = useState([]);

  const validateInput = (value) => {
    if (!value) {
      return;
    }

    if (inputTags.includes(value)) {
      return;
    }

    const resultTags = [...inputTags, value];

    setInputTags(resultTags);
    onChange(resultTags);
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleRemove = (removeTag) => {
    const removeTags = inputTags.filter((value) => value !== removeTag);

    setInputTags(removeTags);
    onChange(removeTags);
  };

  const handleSubmit = () => {
    validateInput(tag.trim());
    setTag('');
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
      <div>
        {inputTags.map((inputTag) => (
          <span
            key={inputTag}
            onClick={() => handleRemove(inputTag)}
            onKeyPress={() => {}}
            role="button"
            tabIndex="-1"
          >
            {`#${inputTag}`}
          </span>
        ))}
      </div>
    </TagsFormWrapper>
  );
};

export default TagsForm;
