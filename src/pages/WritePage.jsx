import React from 'react';

import { Helmet } from 'react-helmet';

import styled from '@emotion/styled';

import mq from '../styles/responsive';
import AppBlock from '../styles/AppBlock';

import { WRITE_TITLE } from '../util/constants/constants';

import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteButtonsContainer from '../containers/write/WriteButtonsContainer';
import WriteEditorContainer from '../containers/write/WriteEditorContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';

const WritePageWrapper = styled(AppBlock)`
  ${mq({
    marginTop: ['1rem', '2rem', '3rem', '4rem'],
  })};
`;

const WritePage = () => (
  <>
    <Helmet>
      <title>{WRITE_TITLE}</title>
    </Helmet>
    <WritePageWrapper>
      <WriteFormContainer />
      <WriteEditorContainer />
      <TagFormContainer />
      <WriteButtonsContainer />
    </WritePageWrapper>
  </>

);
export default WritePage;
