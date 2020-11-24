import React from 'react';

import styled from '@emotion/styled';

const TagItemWrapper = styled.span``;

const TagItem = ({ tag, onRemove }) => (
  <TagItemWrapper
    onClick={onRemove}
  >
    {`#${tag}`}
  </TagItemWrapper>
);

export default TagItem;
