import React from 'react';

import Tags from '../common/Tags';

const TagList = ({ tags, onRemove }) => {
  const handleRemove = (removeTag) => {
    const removeTags = tags.filter((tag) => tag !== removeTag);

    onRemove(removeTags);
  };

  return (
    <Tags
      tags={tags}
      type="introduce"
      onRemove={handleRemove}
    />
  );
};

export default TagList;
