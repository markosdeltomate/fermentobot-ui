import { pageTitle } from './pageTitle.directive.js';
import { menuBarDirective } from './menuBar.directive.js';
angular
  .module('app.common', [])
  .directive('menuBar', menuBarDirective)
  .directive('pageTitle', pageTitle);
