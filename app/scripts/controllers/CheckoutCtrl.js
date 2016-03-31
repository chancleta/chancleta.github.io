'use strict';

/**
 * @ngdoc function
 * @name microAppsDemo.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the microAppsDemo
 */
microAppsDemo.controller('CheckoutCtrl',["DonationService", function (DonationService) {
console.log(DonationService.getDonationData());
}]);
