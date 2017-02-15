import UserService from './user.service.js';
import UtilService from './util.service.js';
import cacheInterceptor from './cache.interceptor.js';
//import socketFactory from './socket.factory.js';
import DashboardService from './dashboard.service';

angular
  .module('app.services', [])
  //.factory('socket', socketFactory)
  .factory('cacheInterceptor', cacheInterceptor)
  .service('User', UserService)
  .service('Util', UtilService)
  .service('DashboardService', DashboardService);
