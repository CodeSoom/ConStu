import React from 'react';

import { Helmet } from 'react-helmet-async';

import NotFoundContainer from '../containers/error/NotFoundContainer';

const NotFoundPage = () => (
  <>
    <Helmet>
      <title>404</title>
    </Helmet>
    <NotFoundContainer />
  </>
);

export default NotFoundPage;
