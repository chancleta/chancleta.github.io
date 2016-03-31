'use strict';

/**
 * @ngdoc function
 * @name microAppsDemo.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the microAppsDemo
 */
microAppsDemo.controller('DonationCtrl', ["$scope","$location","DonationService", function ($scope,$location,DonationService) {

  $scope.donateData = {};

  $scope.currencyOptions = [
    {val:"EUR", label:"EUR"},
    {val:"USD", label:"USD"}
  ];

  $scope.donate = function(donateForm){
    console.log($scope.donateData);
    if(!donateForm.$valid){

    }
    DonationService.saveDonationData($scope.donateData);


  };
}]);
