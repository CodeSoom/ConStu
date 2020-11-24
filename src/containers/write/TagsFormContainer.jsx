import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../util/utils';
import TagsForm from '../../components/write/TagsForm';
import { changeWriteField } from '../../reducers/slice';

const TagsFormContainer = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector(get('writeField'));

  const onChangeTags = (nextTags) => {
    dispatch(
      changeWriteField({
        name: 'tags',
        value: nextTags,
      }),
    );
  };

  return (
    <TagsForm onChange={onChangeTags} tags={tags} />
  );
};

export default TagsFormContainer;
