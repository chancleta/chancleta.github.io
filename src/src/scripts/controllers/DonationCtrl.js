import DonationModel from '../models/DonationModel';

export default class DonationCtrl {

  /*@ngInject;*/
  constructor($location, DonationService) {

    this.donateData = {};
    this.DonationService = DonationService;
    this.location = $location;
    this.currencyOptions = DonationModel.currencyOptions;

    this.donateData.currency = this.currencyOptions[0].val;


  }

  donate(donateForm){

      if (!donateForm.$valid) {
        Materialize.toast("Please verify the fields and try again.", 5000, "error");
        return;
      }

      /**
       * Using array.some to verify if the selected option exists within out $scope.currencyOptions array
       * @type {{val: (*|Document.donateForm.currency), label: (*|Document.donateForm.currency)}}
       */

      let donationData = this.donateData;
      if (!this.currencyOptions.some(function(ele){ return donationData.currency == ele.val})) {
        Materialize.toast("Please select a valid currency.", 5000, "error");
        return;
      }

      /**
       * Verifying the amount contains a numeric value less or igual than 100 and greater than 0
       */
      if (isNaN(parseFloat(this.donateData.amount)) || this.donateData.amount > 100 || this.donateData.amount < 0) {
        Materialize.toast("Please type a valid amount, cannot be greater than 100 and lower than 0.", 5000, "error");
        return;
      }
      /*
       * If we reach this point it means we are good to go
       * We save the selected that for use later on
       * */
      this.DonationService.saveDonationData(this.donateData);

      this.location.path('/checkout');

    }

}

