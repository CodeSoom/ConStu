import React from 'react';

import { Helmet } from 'react-helmet-async';

import CrashErrorContainer from '../containers/error/CrashErrorContainer';

const CrashErrorPage = ({ onResolve }) => (
  <>
    <Helmet>
      <title>이런.. 오류가 발생했어요!</title>
    </Helmet>
    <CrashErrorContainer onResolve={onResolve} />
  </>
);

export default CrashErrorPage;
