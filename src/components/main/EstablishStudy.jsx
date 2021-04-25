import React from 'react';

import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import Button from '../../styles/Button';
import PlusSvg from '../../assets/icons/add.svg';

const PlusIcon = styled(PlusSvg)`
  cursor: pointer;
  width: 35px;
  height: 35px;
`;

const EstablishStudy = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="plus-icon">
        <Link
          to="/write"
        >
          <PlusIcon
            data-testid="plus-icon"
          />
        </Link>
      </div>
    );
  }

  return (
    <Button
      to="/write"
      style={{ padding: '0.6rem 1rem' }}
    >
      스터디 개설하기
    </Button>
  );
};

export default EstablishStudy;
