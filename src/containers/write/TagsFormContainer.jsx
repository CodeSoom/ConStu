import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getGroup } from '../../util/utils';
import TagsForm from '../../components/write/TagsForm';

import { changeWriteField } from '../../reducers/groupSlice';

const TagsFormContainer = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector(getGroup('writeField'));

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
