import React from 'react';

import styled from '@emotion/styled';

import { Editor } from 'react-draft-wysiwyg';

import palette from '../../styles/palette';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WriteEditorWrapper = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  margin-top: 1rem;

  .wrapper-class {
    width: 100%;
  }

  .toolbar {
    background: ${({ theme }) => theme.writeEditorColor[0]};
    border: 1px solid ${({ theme }) => theme.writeEditorColor[1]};
    color: #3d3d3d;
    padding: 6px 5px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 5px 0px;
  }

  .editor {
    margin-left: 1rem;
  }
`;

const SpaceBlock = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 1px;
  background: ${palette.gray[3]};
`;

const WriteEditor = ({ editorState, onChange }) => (
  <>
    <WriteEditorWrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={onChange}
        ariaLabel="contents"
        placeholder="내용을 작성해주세요."
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar"
        editorClassName="editor"
        localization={{
          locale: 'ko',
        }}
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </WriteEditorWrapper>
    <SpaceBlock />
  </>
);

export default WriteEditor;
