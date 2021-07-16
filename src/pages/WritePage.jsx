import React from 'react';

import { Helmet } from 'react-helmet-async';

import GlobalBlock from '../styles/GlobalBlock';

import HeaderContainer from '../containers/base/HeaderContainer';
import TagFormContainer from '../containers/write/TagsFormContainer';
import WriteFormContainer from '../containers/write/WriteFormContainer';
import ThemeToggleContainer from '../containers/base/ThemeToggleContainer';
import WriteEditorContainer from '../containers/write/WriteEditorContainer';
import WriteButtonsContainer from '../containers/write/WriteButtonsContainer';

const WritePage = () => (
  <>
    <Helmet>
      <title>ConStu | 스터디 개설하기</title>
    </Helmet>
    <HeaderContainer />
    <GlobalBlock>
      <ThemeToggleContainer />
      <WriteFormContainer />
      <WriteEditorContainer />
      <TagFormContainer />
      <WriteButtonsContainer />
    </GlobalBlock>
  </>
);
export default WritePage;
