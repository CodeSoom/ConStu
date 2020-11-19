import React from 'react';

import styled from '@emotion/styled';
import Tags from '../common/Tags';

const StudyIntroduceWrapper = styled.div``;

const StudyIntroduceForm = ({ group }) => {
  const { title, contents, tags } = group;
  return (
    <StudyIntroduceWrapper>
      <h2>{title}</h2>
      <p>{contents}</p>
      <Tags tags={tags} />
    </StudyIntroduceWrapper>
  );
};

export default StudyIntroduceForm;
