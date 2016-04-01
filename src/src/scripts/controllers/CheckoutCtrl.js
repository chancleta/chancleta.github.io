
export default class CheckoutCtrl {

    /*@ngInject;*/
    constructor(DonationService,$location) {
        if(!DonationService.donationData().isValid()){
            $location.path('/');
        }
        this.donationService = DonationService;
        this.paymentInfo = {};
        this.isRequestActive = false;
        this.location = $location;
    }

    performCheckout(paymentForm){

        if(!paymentForm.$valid){
            Materialize.toast("Please verify the fields and try again.", 5000, "error");
        }

        let onError = (response) => {
            this.isRequestActive = false;
            Materialize.toast(response.result.description, 5000, "error");
        };

        let onSuccess = () => {
            Materialize.toast("Donation successfully completed!!!", 5000, "success");
            this.location.panth("/paymentCompleted");
        };

        this.isRequestActive = true;

        this.donationService.performPayment(this.paymentInfo, onSuccess, onError);

    }

}
