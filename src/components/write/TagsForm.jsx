import React, { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

import TagList from './TagList';

const TagInputWrapper = styled.input`
  ${mq({
    fontSize: ['.8rem', '1rem'],
    height: ['24px', '30px'],
    width: ['200px', '220px'],
  })};

  padding: 5px;
  border-radius: 0.25rem;
  border: 2px solid #D7E2EB;
  line-height: 20px;
  color: ${palette.gray[8]};

  @keyframes shake {
      0% { left: -5px; }
      100% { right: -5px; }
  };

  ${({ error }) => error && css`
    position: relative;
    border: 2px solid ${palette.warn[2]};
    animation: shake .1s linear;
    animation-iteration-count: 3;

    &::placeholder {
      color: ${palette.warn[2]};
    }
  `};

  ${({ error }) => !error && css`
    &:focus, &.hover {
      border: 2px solid ${palette.teal[5]};
    }

    &::placeholder {
      color: ${palette.gray[6]};
    }
  `};
`;

const TagsForm = ({ onChange, tags }) => {
  const [tag, setTag] = useState('');
  const [inputTags, setInputTags] = useState([]);
  const [error, setError] = useState(false);

  const validateInput = (value) => {
    if (!value || inputTags.includes(value)) {
      setError(true);
      return;
    }

    const resultTags = [...inputTags, value];

    setError(false);
    setInputTags(resultTags);
    onChange(resultTags);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setError(false);
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
        error={error}
        onBlur={() => setError(false)}
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
