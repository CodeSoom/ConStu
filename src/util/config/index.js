import devConfig from './dev';
import prodConfig from './prod';

const config = (env) => {
  if (env === 'production') {
    return prodConfig;
  }

  return devConfig;
};

export default config;
