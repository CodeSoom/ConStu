import React from 'react';

import styled from '@emotion/styled';

import TagItem from './TagItem';

const TagListWrapper = styled.div``;

const TagList = ({ tags, onRemove }) => {
  const handleRemove = (removeTag) => {
    const removeTags = tags.filter((tag) => tag !== removeTag);

    onRemove(removeTags);
  };

  return (
    <TagListWrapper>
      {tags.map((tag) => (
        <TagItem
          key={tag}
          tag={tag}
          onRemove={() => handleRemove(tag)}
        />
      ))}
    </TagListWrapper>
  );
};

export default TagList;
