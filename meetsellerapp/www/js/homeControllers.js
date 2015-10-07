angular.module('ionicApp.homecontrollers', [])

.controller('homeCtrl', function ($scope, $translate) {

    var currentLang = "en";
    $scope.playlists = [
        {title: 'Reggae', id: 1},
        {title: 'Chill', id: 2},
        {title: 'Dubstep', id: 3},
        {title: 'Indie', id: 4},
        {title: 'Rap', id: 5},
        {title: 'Cowbell', id: 6}
    ];
    $scope.changeLanguage = function (key) {
        console.log("currentLang:" + currentLang);
//        if (currentLang  === "en") {
//            currentLang = "de";
//            $translate.use( "de");
//        } else {
//            currentLang = "en";
//            $translate.use( "en");
//        }
        // $translate.use( key);
    };
    $scope.switchLanguage = function (key) {
        $translate.use(key);
    };
})