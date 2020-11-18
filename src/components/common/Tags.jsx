import React from 'react';

import styled from '@emotion/styled';

const TagsWrapper = styled.div``;

const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <small key={tag}>{`#${tag}`}</small>
      ))}
    </TagsWrapper>
  );
};

export default Tags;
