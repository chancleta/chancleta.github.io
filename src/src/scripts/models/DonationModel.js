/*
  Model classes can be exported and imported directly (not using AngularJS' dependency injection).
*/

export default class DonationModel {

	constructor(){
		this.amount = "";
		this.currency = "";
	}

	static get 	currencyOptions(){
		return [{val: "EUR", label: "EUR"},{val: "USD", label: "USD"}];
	}

	isValid(){

		/**
		 * Using array.some to verify if the selected option exists within out $scope.currencyOptions array
		 * @type {{val: (*|Document.donateForm.currency), label: (*|Document.donateForm.currency)}}
		 */

		let currency = this.currency;
		if (!DonationModel.currencyOptions.some(function(ele){ return currency == ele.val})) {
			return false;
		}

		/**
		 * Verifying the amount contains a numeric value less or igual than 100 and greater than 0
		 */
		if (isNaN(parseFloat(this.amount)) || this.amount > 100 || this.amount < 0) {
			return false;
		}

		return true;
	}

}