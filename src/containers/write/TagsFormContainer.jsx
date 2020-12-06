import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getGroup } from '../../util/utils';
import { changeWriteField } from '../../reducers/groupSlice';

import TagsForm from '../../components/write/TagsForm';

const TagsFormContainer = () => {
  const dispatch = useDispatch();

  const { tags } = useSelector(getGroup('writeField'));

  const onChangeTags = useCallback((nextTags) => {
    dispatch(
      changeWriteField({
        name: 'tags',
        value: nextTags,
      }),
    );
  }, [dispatch]);

  return (
    <TagsForm onChange={onChangeTags} tags={tags} />
  );
};

export default TagsFormContainer;
