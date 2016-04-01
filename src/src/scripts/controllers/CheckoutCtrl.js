
export default class CheckoutCtrl {

    /*@ngInject;*/
    constructor(DonationService,$location,$localStorage) {
        if(!DonationService.donationData().isValid()){
            $location.path('/');
        }
        this.donationService = DonationService;
        this.paymentInfo = {};
        this.isRequestActive = false;
        this.location = $location;
        this.localStorage = $localStorage;
    }

    performCheckout(paymentForm){

        if(!paymentForm.$valid){
            Materialize.toast("Please verify the fields and try again.", 5000, "error");
        }

        let onError = (response) => {
            this.isRequestActive = false;
            Materialize.toast("Oops Something went wrong while contacting the server, please verify the fields and try again.", 5000, "error");
        };

        let onSuccess = (data) => {
            Materialize.toast("Donation successfully completed!!!", 5000, "success");
            this.isRequestActive = false;
            this.localStorage.paymentInfo = data;
            this.localStorage.paymentInfo.paidOnTimeStamp = new Date().getTime();
            this.location.path("/paymentCompleted");
        };

        this.isRequestActive = true;

        this.donationService.performPayment(this.paymentInfo, onSuccess, onError);

    }

}
