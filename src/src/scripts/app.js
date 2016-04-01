/*
  Import all Angular components via ES6 imports and register them
  at your module via their corresponding functions (controller, service, etc.).
*/

import DonationCtrl from './controllers/DonationCtrl';
import CheckoutCtrl from './controllers/CheckoutCtrl';
import DonationService from './services/DonationService';

angular
		.module('chancletagithubioApp', [
			'ngResource',
			'ngRoute',
			'ngStorage',
			'angularPayments'
		])
		.controller('DonationCtrl',DonationCtrl)
		.controller('CheckoutCtrl',CheckoutCtrl)
		.service('DonationService',DonationService)
		.config(["$routeProvider","$httpProvider",function ($routeProvider,$httpProvider) {
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
					.when('/paymentCompleted', {
						templateUrl: 'views/paymentCompleted.html',
						controller: 'PaymentCompletedCtrl',
						controllerAs: 'completed'
					})
					.otherwise({
						redirectTo: '/'
					});
			$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
				return {
					'request': function (config) {
						config.headers = config.headers || {};
						config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
						return config;
					}
				};
			}]);
		}])
		.constant("ConfigData", {
			url: "https://test.oppwa.com/v1/payments",
			authData:{ 'authentication.userId': "8a8294174b7ecb28014b9699220015cc", 'authentication.password':"sy6KJsT8", 'authentication.entityId':"8a8294174b7ecb28014b9699220015ca" },
			paymentType: "DB",
		});
