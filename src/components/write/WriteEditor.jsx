import React, { useState } from 'react';

import styled from '@emotion/styled';

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

const WriteEditorWrapper = styled.div``;

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
    <WriteEditorWrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleChangeEditor}
        ariaLabel="contents"
        placeholder="내용을 작성해주세요."
        localization={{
          locale: 'ko',
        }}
        // 에디터 상단에 표시될 toolbar 설정
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </WriteEditorWrapper>
  );
};

export default WriteEditor;
