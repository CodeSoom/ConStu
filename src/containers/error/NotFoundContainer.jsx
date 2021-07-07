import React from 'react';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import useNotFound from '../../hooks/useNotFound';

import NotFoundSvg from '../../assets/icons/404.svg';
import ErrorScreenTemplate from '../../components/common/ErrorScreenTemplate';

const NotFoundImage = styled(NotFoundSvg)`
  ${mq({
    width: ['500px', '700px', '800px'],
  })};

  height: auto;
`;

const NotFoundContainer = () => {
  const history = useHistory();
  const { reset } = useNotFound();

  const onClick = () => {
    history.push('/');
    reset();
  };

  return (
    <ErrorScreenTemplate
      buttonText="홈으로"
      message="아무것도 없어요!"
      onClick={onClick}
    >
      <NotFoundImage
        data-testid="not-found-image"
      />
    </ErrorScreenTemplate>
  );
};

export default NotFoundContainer;
