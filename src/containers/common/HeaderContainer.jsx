import React from 'react';

import { useSelector } from 'react-redux';

import { get } from '../../util/utils';

import Header from '../../components/common/Header';

const HeaderContainer = () => {
  const user = useSelector(get('user'));

  return (
    <Header
      user={user}
    />
  );
};

export default HeaderContainer;
