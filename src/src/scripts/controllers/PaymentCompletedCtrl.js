
export default class PaymentCompletedCtrl {

    /*@ngInject;*/
    constructor($location,$scope,DonationService) {
        this.remainingTime = DonationService.getRemainingTimeUntilNextDonation();

        this.endTime = DonationService.getPaymentInformation().paidOnTimeStamp + 3600000;
        this.isUserAllowedToDonate = DonationService.isUserAllowedToDonate();
        this.donationService = DonationService;
        this.location = $location;
        this.scope = $scope;

        let onTimerStopped = (event,data) => {
            this.donationService.restoreDonation();
            this.isUserAllowedToDonate = true;
            this.scope.$apply();
        };

        this.paymentInformationKeys = Object.keys(this.donationService.getPaymentInformation());
        this.paymentInformation = this.donationService.getPaymentInformation();
        this.scope.$on('timer-stopped', onTimerStopped);
    }

    redirect(){
        this.location.path("/");
    }
}
