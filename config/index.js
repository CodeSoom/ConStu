import devConfig from './dev';
import prodConfig from './prod';

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

export default config;
