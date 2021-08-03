/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getAuth } from '../../util/utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(getAuth('user'));

  return (
    <Route
      {...rest}
      render={(props) => (user ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
      ))}
    />
  );
};

export default PrivateRoute;
