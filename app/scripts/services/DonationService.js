/**
 * Created by lupena on 3/31/2016.
 */
'use strict';
microAppsDemo.factory('DonationService',["$resource","$localStorage","$location","ConfigData", function($resource,$localStorage,$location,ConfigData){
  var resource = $resource(ConfigData.url + ":" +ConfigData.port + "/authenticate",{},{ authenticate: {method:'POST'}});
  var donationDataObject = {};
  var doLogin = function(responseData){
    if(responseData.error){
      Materialize.toast(responseData.messsage, 5000,"error");
      return;
    }
    $localStorage.token = responseData.token;

    $("nav.navbar-fixed").attr("logged","true");
    $('#loginForm').hide();
    $location.path("/");
  };



  return {
    getDonationData: function(){
      return donationDataObject;
    },



    saveDonationData: function(donateData){
      donationDataObject = {
        amount: donateData.amount,
        currency: donateData.currency
      };
    }

  };
}]);
