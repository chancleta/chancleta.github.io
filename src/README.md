Application Flow:

When the user visits / the views/donationForm.thml is loaded, it has Amount and Currency.
The criteria for that view: If the amount is positive and the Currecy is correct ( if somehow the user selects a currency
that is not one of the options determined by: DonationModel.currencyOptions() ) the app will show an error.

After the data its been processed and validated, the user is redirected to /checkout and the views/checkoutForm.thml
is loaded. The checkout contains a form in which the user enters the credit card number, expiry date and cvc number.
If that information is valid, a Post request is sent to the PayOn API to the endpoint: https://test.oppwa.com/v1/payments
to perform a server to server Synchronous request, See: https://docs.payon.com/tutorials/server-to-server.
The app sends all the information needed, along with the currency, amount, credicard information and paymentType=DB.

While the request is in progress a progress bar is shown and the Donate button change its status to disable, letting the
user now that the request is still in progress. If the request fails, the progress bar is set to hide and the donate button
is enable and a error giving the user some information is shown.

If the request is succeed then the user is redirected to the /paymentCompleted which loads views/paymentCompleted.html
in that view, the app shows the user some information about the payment and the reamining time for the next donation.

If the user tries to load another view/page while it has pending time for the next donation, the app will redirect the user to
/paymentCompleted.

Right now im just taking in cosideration the users computer time, in a real case scenario we should be using the payment information
gathered from the payment request.

Libs/Framwork used:

Angularjs
Babel
Gulp for bulding packaging also for running and livereload.
Sass
jQuery
MaterializeCss to give a reponsive, material design look
ngStorage
ngRoute
angularPayments for the Credit Card validation
angular timer, for showing the remaining timing of the user next donation.





