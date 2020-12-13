import React from 'react';

import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import palette from '../../styles/palette';

const TagsWrapper = styled.div`
  margin-top: 1rem;
`;

const TagStyledWrapper = ({ div }) => css`
  font-size: .8em;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: .8em;
  height: 3em;
  color: ${palette.teal[7]};
  background:${palette.gray[2]};

  &:hover {
    color: ${palette.teal[5]};
  }

  ${div && css`
    height: 2.5em;
    border-radius: .5em;
    margin-right: 0.3rem;

    &:hover {
      color: ${palette.teal[7]};
    }
  `};
`;

const TagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const TagSpanWrapper = styled.span`
  font-weight: bold;
  height: 2.4em;
  margin-right: .5rem;
  cursor: pointer;
  color: ${palette.warn[2]};
  
  &:hover {
    color: ${palette.warn[0]};
  }
`;

const TagStyledDiv = styled.div`
  ${TagStyledWrapper}
`;
const TagStyledLink = styled(Link)`
  ${TagStyledWrapper}
`;

const Tags = ({ tags, type, onRemove }) => {
  if (!tags || !tags.length) {
    return null;
  }

  if (type === 'introduce') {
    return (
      <TagsWrapper>
        {tags.map((tag) => (
          <TagWrapper
            key={tag}
          >
            <TagStyledDiv
              div
              className="tag"
            >
              {`#${tag}`}
            </TagStyledDiv>
            <TagSpanWrapper
              onClick={() => onRemove(tag)}
            >
              x
            </TagSpanWrapper>
          </TagWrapper>
        ))}
      </TagsWrapper>
    );
  }

  return (
    <TagsWrapper>
      {tags.map((tag) => (
        <TagStyledLink
          key={tag}
          to={`/?tag=${tag}`}
        >
          {`#${tag}`}
        </TagStyledLink>
      ))}
    </TagsWrapper>
  );
};

export default React.memo(Tags);
