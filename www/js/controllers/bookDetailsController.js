/**
 * Created by seven on 5/1/2015.
 */
var insight = angular.module('insight');
insight.controller('BookDetailsController', function($scope,$stateParams,$localStorage,$ionicActionSheet,$ionicPopup,$ionicModal) {
    $scope.rate = 3;
    $scope.max = 5;
    console.log($stateParams.id+"--the book id")

        $scope.details = {};
    $scope.getTags = function(tags){
        var tagArray = [];
        angular.forEach(tags, function(value, key) {
            tagArray.push(value.name);
        });
        return tagArray;
    }
    $scope.showActionSheet = function() {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            titleText: '<b>Modify your album</b>',
            buttons: [
                { text: '<i class="icon ion-share balanced"></i>Share this' },
                { text: '<i class="icon ion-arrow-move"></i>Move' }
            ],
            destructiveText: '<i class="icon ion-arrow-move"></i>Delete',
            cancelText: '<i class="icon ion-arrow-move"></i>Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });
        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);
    };

    $scope.showPopup = function() {
        $scope.data = {}
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            templateUrl:'templates/ibook/detailPopup.html',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                },
            ]
        });
        myPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        //$timeout(function() {
        //    myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 3000);
    };


    $scope.$storage = $localStorage;

    $scope.test = function(){
        $scope.$storage.counter = 100;
        $scope.$storage.user = {"name":"steven","pass":"test122333"};
    }


    $ionicModal.fromTemplateUrl('templates/ibook/detailDialog.html', {
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
    $scope.summary ="From the acclaimed author of  River Town  comes a rare portrait, both intimate and epic, of twenty-first-century China as it opens its doors to the outside world.     A century ago, outsiders saw Chinaas a place where nothing ever changes. Today the coun-try has become one of the most dynamic regions on earth. That sense of time¡ªthe contrast between past and present, and the rhythms that emerge in a vast, ever-evolving country¡ªis brilliantly illuminated by Peter Hessler in  Oracle Bones , a book that explores the human side of China's transformation.     Hessler tells the story of modern-day China and its growing links to the Western world as seen through the lives of a handful of ordinary people. In addition to the author, an American writer living in Beijing, the narrative follows Polat, a member of a forgotten ethnic minority, who moves to the United States in searchof freedom; William Jefferson Foster, who grew up in an illiterate family and becomes a teacher; Emily,a migrant factory worker in a city without a past; and Chen Mengjia, a scholar of oracle-bone inscriptions, the earliest known writing in East Asia, and a man whosetragic story has been lost since the Cultural Revolution. All are migrants, emigrants, or wanderers who find themselves far from home, their lives dramatically changed by historical forces they are struggling to understand.     Peter Hessler excavates the past and puts a remarkable human face on the history he uncovers. In a narrative that gracefully moves between the ancient and the present, the East and the West, Hessler captures the soul of a country that is undergoing a momentous change before our eyes."
})