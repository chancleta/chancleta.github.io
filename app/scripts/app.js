'use strict';

/**
 * @ngdoc overview
 * @name chancletagithubioApp
 * @description
 * # chancletagithubioApp
 *
 * Main module of the application.
 */
var microAppsDemo =angular
  .module('chancletagithubioApp', [
    'ngResource',
    'ngRoute',
    'ngStorage',
    'angularPayments'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/donationForm.html',
        controller: 'DonationCtrl',
        controllerAs: 'donation'
      })
      .when('/checkout', {
        templateUrl: 'views/checkoutForm.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant("ConfigData", {url: "http://10.100.29.137", port: 9001, wsURL: "ws://10.100.29.137"});



