import React from 'react';

import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import mq from '../../styles/responsive';

import ComputerSvg from '../../assets/icons/computer.svg';
import ErrorScreenTemplate from '../../components/error/ErrorScreenTemplate';

const ComputerImage = styled(ComputerSvg)`
  ${mq({
    width: ['500px', '800px', '900px'],
  })};

  height: auto;
`;

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
    >
      <ComputerImage
        data-testid="computer-image"
      />
    </ErrorScreenTemplate>
  );
};

export default CrashErrorContainer;
