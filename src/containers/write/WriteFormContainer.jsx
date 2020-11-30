import React from 'react';

import { useUnmount } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import WriteForm from '../../components/write/WriteForm';

import { changeWriteField, clearWriteFields } from '../../reducers/slice';

const WriteFormContainer = () => {
  const dispatch = useDispatch();

  const writeField = useSelector(get('writeField'));

  const onChangeWriteField = ({ name, value }) => {
    dispatch(
      changeWriteField({
        name,
        value,
      }),
    );
  };

  useUnmount(() => dispatch(clearWriteFields()));

  return (
    <WriteForm
      fields={writeField}
      onChange={onChangeWriteField}
    />
  );
};

export default WriteFormContainer;
