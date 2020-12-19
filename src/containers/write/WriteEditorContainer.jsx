import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { ContentState, convertToRaw, EditorState } from 'draft-js';

import { getGroup } from '../../util/utils';
import { changeWriteField } from '../../reducers/groupSlice';

import WriteEditor from '../../components/write/WriteEditor';

const WriteEditorContainer = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const dispatch = useDispatch();

  const { contents } = useSelector(getGroup('writeField'));

  const onChangeContent = useCallback((state) => {
    setEditorState(state);

    dispatch(
      changeWriteField({
        name: 'contents',
        value: draftToHtml(
          convertToRaw(
            state.getCurrentContent(),
          ),
        ),
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (contents) {
      const { contentBlocks, entityMap } = htmlToDraft(contents);

      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorValueState = EditorState.createWithContent(contentState);
      setEditorState(editorValueState);
    }
  }, []);

  return (
    <WriteEditor
      onChange={onChangeContent}
      editorState={editorState}
    />
  );
};

export default WriteEditorContainer;
