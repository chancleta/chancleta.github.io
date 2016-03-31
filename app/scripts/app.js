'use strict';

/**
 * @ngdoc overview
 * @name chancletagithubioApp
 * @description
 * # chancletagithubioApp
 *
 * Main module of the application.
 */
angular
  .module('chancletagithubioApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
