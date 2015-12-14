/**
 * Created by seven on 8/17/2015.
 */
/**
 * Created by seven on 4/25/2015.
 */

var insight = angular.module('insight');
insight.controller('BookScannerController', function ($scope, $rootScope, $ionicPlatform, $ionicModal,$cordovaBarcodeScanner, GoogleBook) {
    $ionicPlatform.ready(function () {
        $scope.scanBarcode = function () {
            $cordovaBarcodeScanner
                .scan()
                .then(function (barcodeData) {
                    // Success! Barcode data is here
                    var theISBN = barcodeData.text;
                    alert("this is barcode text---" + theISBN);
                    if (theISBN && (theISBN.length == 13 || theISBN.length == 10)) {
                        GoogleBook.get({isbn: barcodeData.text}, function (result) {
                            alert("here is data from google---" + JSON.stringify(result.data.items));
                        });
                    } else {
                        alert("no an validate ISBN");
                    }
                    console.log("Barcode Format -> " + barcodeData.format);
                    console.log("Cancelled -> " + barcodeData.cancelled);
                }, function (error) {
                    // An error occurred
                    console.log("An error happened -> " + error);
                });
        }
        $scope.enCodeBarcode = function () {
            // NOTE: encoding not functioning yet
            $cordovaBarcodeScanner
                .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nonumber1989.com")
                .then(function (success) {
                    // Success!
                }, function (error) {
                    // An error occurred
                });
        }
    });

    $ionicModal.fromTemplateUrl('templates/scanner/bookDetailsDialog.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

});