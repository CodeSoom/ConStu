import React from 'react';

import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import palette from '../../styles/palette';

const TagsWrapper = styled.div`
  margin-top: 1rem;
`;

const TagStyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding-left: 1em;
  padding-right: 1em;
  height: 3em;
  font-weight: bold;
  font-size: .8em;
  border-radius: .8em;
  margin-right: 0.5rem;
  color: ${palette.teal[7]};
  background:${palette.gray[2]};
  &:hover {
    color: ${palette.teal[5]};
  }
`;

const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <TagStyledLink
          key={tag}
          to={`/?tag=${tag}`}
          className="tag"
        >
          {`#${tag}`}
        </TagStyledLink>
      ))}
    </TagsWrapper>
  );
};

export default Tags;
