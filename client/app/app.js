import 'jquery';

import angular from 'angular';

import 'angular-ui-router';
import 'angular-ui-bootstrap';

import 'satellizer';
import 'angular-jwt';


import 'bootstrap-loader';
import '../scss/app.scss';

import {configDefaultRoute, configRun} from './app.config';

import './dashboard/dashboard.module';
import './common/common.module.js';
import './login/login.module.js';
import './services/services.module.js';

import 'highcharts';
import 'highcharts/modules/data';
import 'highcharts/modules/exporting';
import 'highcharts/highcharts-more';

import 'highcharts-ng';
const APP_NAME = 'fermentobot';

angular
    .module(APP_NAME, [
        'ui.router',
        'ui.bootstrap',
        'satellizer',
        'angular-jwt',
        'highcharts-ng',
        'app.common',
        'app.dashboard',
        'app.login',
        'app.services'

    ])
    .config(configDefaultRoute)
    .run(configRun);

export default APP_NAME;