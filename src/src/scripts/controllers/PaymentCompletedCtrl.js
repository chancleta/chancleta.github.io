
export default class PaymentCompletedCtrl {

    /*@ngInject;*/
    constructor($location,$scope,DonationService) {

        this.endTime = DonationService.getPaymentInformation().paidOnTimeStamp + 3600000;
        this.isUserAllowedToDonate = DonationService.isUserAllowedToDonate();
        this.donationService = DonationService;
        this.location = $location;
        this.scope = $scope;
        this.paymentInformation =  DonationService.getPaymentInformation();

        let onTimerStopped = (event,data) => {
            this.donationService.restoreDonation();
            this.isUserAllowedToDonate = true;
            this.scope.$apply();
        };


        this.scope.$on('timer-stopped', onTimerStopped);
    }

    redirect(){
        this.location.path("/");
    }
}
