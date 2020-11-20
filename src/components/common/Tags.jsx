import React from 'react';

import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import palette from '../../styles/palette';

const TagsWrapper = styled.div`
  margin-top: 1rem;
  .lang {
    display: inline-flex;
    align-items: center;
    padding-left: .6em;
    padding-right: .6em;
    height: 3em;
    font-weight: bold;
    font-size: .6em;
    border-radius: .6em;
    margin-right: 0.5rem;
    color: ${palette.teal[7]};
    background:${palette.gray[1]};
    &:hover {
      color: ${palette.teal[5]};
    }
  }
`;

const Tags = ({ tags }) => {
  if (!tags || !tags.length) {
    return null;
  }

  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <Link
          key={tag}
          to="/#"
          className="lang"
        >
          {`#${tag}`}
        </Link>
      ))}
    </TagsWrapper>
  );
};

export default Tags;
