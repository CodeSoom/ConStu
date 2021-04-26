import React from 'react';

import { Link } from 'react-router-dom';

import _ from 'lodash';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import mq from '../../styles/responsive';
import palette from '../../styles/palette';

const tagHeight = mq({
  height: ['2.4rem', '2.8rem'],
});

const TagsWrapper = styled.div`
  font-family: 'Nanum Godic',sans-serif;
  font-weight: bold;
  margin-top: 1rem;

  ${({ type }) => type && type === 'main' && css`
    ${tagHeight}
    overflow: hidden;
    margin-top: .5rem;
  `};
`;

const TagStyledWrapper = ({ div }) => css`
  ${mq({
    fontSize: ['.7rem', '.8rem'],
    padding: ['0 .6rem', '0 .6rem'],
    height: ['2rem', '2.4rem'],
  })};

  display: inline-flex;
  align-items: center;
  margin: .2rem;
  border-radius: .8em;
  color: ${palette.teal[7]};
  background:${palette.gray[2]};
  transition: color .2s;

  &:hover {
    color: ${palette.teal[5]};
  }

  ${div && css`
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
  ${mq({
    height: ['2rem', '2.4rem'],
  })};

  font-weight: bold;
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
  if (_.isEmpty(tags)) {
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
    <TagsWrapper type={type}>
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
