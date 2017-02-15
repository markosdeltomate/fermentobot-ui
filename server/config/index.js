import development from './development/index';
import production from './production/index';

let config = (process.env.NODE_ENV === 'production') ? production : development;
config.userRoles = ['user', 'admin'];
export { config as default };
