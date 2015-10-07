angular.module('ionicApp.settingcontrollers', [])

.controller('settingCtrl', function ($scope, $translate) {
//    $scope.listLang = [
//        {title: 'English', code: 'en_US'},
//        {title: 'Việt Name', code: 'vn_VN'}
//    ];

    $scope.data = {
        currentLang: 'en_US',
        listLang: [
            {title: 'English', code: 'en_US'},
            {title: 'Việt Nam', code: 'vn_VN'}
        ],
    };
    $scope.changeLanguage = function () {
        $translate.use($scope.data.currentLang);
    };
})