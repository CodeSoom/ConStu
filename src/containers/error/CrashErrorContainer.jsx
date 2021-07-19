import React from 'react';

import { useHistory } from 'react-router-dom';

import ErrorScreenTemplate from '../../components/error/ErrorScreenTemplate';

const CrashErrorContainer = ({ onResolve }) => {
  const history = useHistory();

  const onClick = () => {
    history.push('/');
    onResolve();
  };

  return (
    <ErrorScreenTemplate
      message="이런.. 오류가 발생했어요!"
      buttonText="홈으로"
      onClick={onClick}
    />
  );
};

export default CrashErrorContainer;
