import React from 'react';

import { ToastContainer, Bounce } from 'react-toastify';

import GlobalStyles from '../../styles/GlobalStyles';

import 'react-toastify/dist/ReactToastify.css';

const Core = () => (
  <>
    <GlobalStyles />
    <ToastContainer
      closeOnClick
      pauseOnHover
      autoClose={3000}
      transition={Bounce}
      position="top-right"
    />
  </>
);

export default Core;
