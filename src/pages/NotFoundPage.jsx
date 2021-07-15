import React from 'react';

import { Helmet } from 'react-helmet';

import NotFoundContainer from '../containers/error/NotFoundContainer';

const NotFoundPage = () => (
  <>
    <Helmet>
      <title>ConStu - 404</title>
    </Helmet>
    <NotFoundContainer />
  </>
);

export default NotFoundPage;
