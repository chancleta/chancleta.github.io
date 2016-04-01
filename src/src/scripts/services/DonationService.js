/**
 * Created by lupena on 3/31/2016.
 */
import DonationModel from '../models/DonationModel';

export default class DonationService{
  /*@ngInject;*/
  constructor($resource,ConfigData) {
    this.resource = $resource(ConfigData.url);
    this.donationDataObject = new DonationModel();
    this.configData = ConfigData;

  }

  donationData(){
    return this.donationDataObject;
  }

  saveDonationData(donateData){
    this.donationDataObject.amount = donateData.amount;
    this.donationDataObject.currency = donateData.currency;
  }

  performPayment (paymentInformation){

    paymentInformation.card.expiryMonth = paymentInformation.expiry.split("/")[0];
    paymentInformation.card.expiryYear = paymentInformation.expiry.split("/")[1];

    paymentInformation = Object.assign(paymentInformation, this.configData.authData);
    paymentInformation = Object.assign(paymentInformation, this.donationDataObject );
    paymentInformation = Object.assign(paymentInformation, this.configData.paymentType );

    this.resource.save({},paymentInformation);
  }
}
