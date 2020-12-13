import React, { useState } from 'react';

import styled from '@emotion/styled';

import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';

import palette from '../../styles/palette';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const WriteEditorWrapper = styled.div`
  margin-top: 1rem;

  .toolbar {
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

const WriteEditor = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChangeEditor = (state) => {
    setEditorState(state);
    onChange({
      name: 'contents',
      value: draftToHtml(convertToRaw(state.getCurrentContent())),
    });
  };

  return (
    <>
      <WriteEditorWrapper>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleChangeEditor}
          ariaLabel="contents"
          placeholder="내용을 작성해주세요."
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
};

export default WriteEditor;
