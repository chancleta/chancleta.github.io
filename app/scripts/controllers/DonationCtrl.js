'use strict';

/**
 * @ngdoc function
 * @name microAppsDemo.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the microAppsDemo
 */
microAppsDemo.controller('DonationCtrl', ["$scope", "$location", "DonationService", function ($scope, $location, DonationService) {

  $scope.donateData = {};

  $scope.currencyOptions = [
    {val: "EUR", label: "EUR"},
    {val: "USD", label: "USD"}
  ];

  $scope.donateData.currency = $scope.currencyOptions[0].val;

  $scope.donate = function (donateForm) {

    if (!donateForm.$valid) {
      Materialize.toast("Please verify the fields and try again.", 5000, "error");
      return;
    }

    /**
     * Using array.some to verify if the selected option exists within out $scope.currencyOptions array
     * @type {{val: (*|Document.donateForm.currency), label: (*|Document.donateForm.currency)}}
     */

    if (!$scope.currencyOptions.some(function(ele){ return $scope.donateData.currency == ele.val})) {
      Materialize.toast("Please select a valid currency.", 5000, "error");
      return;
    }

    /**
     * Verifying the amount contains a numeric value less or igual than 100 and greater than 0
     */
    if (isNaN(parseFloat($scope.donateData.amount)) || $scope.donateData.amount > 100 || $scope.donateData.amount < 0) {
      Materialize.toast("Please type a valid amount, cannot be greater than 100 and lower than 0.", 5000, "error");
      return;
    }
    /*
     * If we reach this point it means we are good to go
     * We save the selected that for use later on
     * */
    DonationService.saveDonationData($scope.donateData);

    $location.path('/checkout');

  };
}]);


