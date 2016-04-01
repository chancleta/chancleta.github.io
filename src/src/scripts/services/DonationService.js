/**
 * Created by lupena on 3/31/2016.
 */
import DonationModel from '../models/DonationModel';

export default class DonationService{
  /*@ngInject;*/
  constructor($resource,ConfigData,$localStorage) {
    this.resource = $resource(ConfigData.url);
    this.donationDataObject = new DonationModel();
    this.configData = ConfigData;
    this.localStorage = $localStorage;
  }

  donationData(){
    return this.donationDataObject;
  }

  saveDonationData(donateData){
    this.donationDataObject.amount = donateData.amount;
    this.donationDataObject.currency = donateData.currency;
  }

  performPayment (paymentInformation, onSuccess, onError){

    var requestData = {};
    /**
     *  Setting up the request data see https://docs.payon.com/tutorials/server-to-server
     */
    requestData['card.expiryMonth'] = paymentInformation.expiry.split("/")[0];
    requestData['card.expiryYear'] = paymentInformation.expiry.split("/")[1];

    requestData['card.number'] = paymentInformation.card.number;
    requestData['card.cvv'] = paymentInformation.card.cvv;

    requestData = $.extend(requestData, this.configData.authData);
    requestData =  $.extend(requestData, this.donationDataObject );
    requestData['paymentType'] = this.configData.paymentType;

    this.resource.save({},$.param(requestData)).
      $promise.
      then(function(responseData){

      if(responseData.id){
        onSuccess(responseData);
      }else{
        onError(responseData);
      }
      })
      .catch(function(response){
        onError(response);
      });
  }

  getRemainingTimeUntilNextDonation(){
    if(typeof this.localStorage.paymentInfo === 'undefined')
      return -1;

    return  3600 - (new Date().getTime() - this.localStorage.paymentInfo.paidOnTimeStamp)/1000;
  }

  isUserAllowedToDonate(){
    if(typeof this.localStorage.paymentInfo === 'undefined')
        return true;
    return this.getRemainingTimeUntilNextDonation() <= 0;
  }

  restoreDonation(){
    delete  this.localStorage.paymentInfo;
  }

  getPaymentInformation(){
    return this.localStorage.paymentInfo;
  }
}
