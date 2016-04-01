
export default class CheckoutCtrl {

    /*@ngInject;*/
    constructor(DonationService,$location) {
        if(!DonationService.donationData().isValid()){
            $location.path('/');
        }
        this.donationService = DonationService;
        this.paymentInfo = {};
    }

    performCheckout(paymentForm){

        if(!paymentForm.$valid){
            Materialize.toast("Please verify the fields and try again.", 5000, "error");
        }


        this.donationService.performPayment(this.paymentInfo);

    }

}
