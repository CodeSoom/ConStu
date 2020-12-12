import React from 'react';

import { Helmet } from 'react-helmet';

import styled from '@emotion/styled';

import Responsive from '../styles/Responsive';

import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteButtonsContainer from '../containers/write/WriteButtonsContainer';
import WriteEditorContainer from '../containers/write/WriteEditorContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';

const WritePageWrapper = styled(Responsive)`
  margin-top: 4rem;
`;

const IntroducePage = () => (
  <>
    <Helmet>
      <title>스터디 소개글 작성</title>
    </Helmet>
    <WritePageWrapper>
      <WriteFormContainer />
      <WriteEditorContainer />
      <TagFormContainer />
      <WriteButtonsContainer />
    </WritePageWrapper>
  </>

);
export default IntroducePage;
