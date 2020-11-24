import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import WriteForm from '../../components/write/WriteForm';

import { changeWriteField } from '../../reducers/slice';

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

  return (
    <WriteForm
      fields={writeField}
      onChange={onChangeWriteField}
    />
  );
};

export default WriteFormContainer;
