import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { loadItem } from './services/storage';
import { setUser } from './reducers/authSlice';

import GlobalStyles from './styles/GlobalStyles';

import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import IntroducePage from './pages/IntroducePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderContainer from './containers/common/HeaderContainer';

const App = () => {
  const dispatch = useDispatch();

  const user = loadItem('user');

  useEffect(() => {
    if (user) {
      const { email } = user;

      dispatch(setUser(email));
    }
  }, [dispatch, user]);

  return (
    <>
      <GlobalStyles />
      <HeaderContainer />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/introduce/:id" component={IntroducePage} />
        <Route component={LoginPage} path="/login" />
        <Route component={RegisterPage} path="/register" />
        <Route path="/write" component={WritePage} />
      </Switch>
    </>
  );
};

export default App;
