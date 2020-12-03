import React, { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { changeWriteField } from '../../reducers/groupSlice';

import WriteEditor from '../../components/write/WriteEditor';

const WriteEditorContainer = () => {
  const dispatch = useDispatch();

  const onChangeContent = useCallback(({ name, value }) => {
    dispatch(
      changeWriteField({
        name,
        value,
      }),
    );
  }, [dispatch]);

  return (
    <WriteEditor
      onChange={onChangeContent}
    />
  );
};

export default WriteEditorContainer;
