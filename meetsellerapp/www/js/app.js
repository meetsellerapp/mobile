angular.module('ionicApp', ['ionic', 'pascalprecht.translate', 'ionicApp.homecontrollers', 'ionicApp.settingcontrollers'])

.factory('customLoader', function ($http, $q) {
    return function (options) {
      var deferred = $q.defer();
      
      $http({
        method:'GET',
        url:'languages/locale-' + options.key + '.json'
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function () {
        deferred.reject(options.key);
      });
      
      return deferred.promise;
    };
})

.config(function ($stateProvider, $urlRouterProvider, $translateProvider ) {
    
    $translateProvider.translations('de_DE', {
        "HEADLINE": "Hello da!",
        "LANG_DE_DE": "Sprache: Deutsch",
        "LANG_EN_US": "Sprache: Englisch"
    });
    $translateProvider.useLoader('customLoader', {});
    $translateProvider.preferredLanguage('en_US');
    $translateProvider.use('en_US');
    $stateProvider
           .state('eventmenu', {
               url: "/event",
               abstract: true,
               templateUrl: "event-menu.html"
           })
           .state('eventmenu.home', {
               url: "/home",
               views: {
                   'menuContent': {
                       templateUrl: "templates/home.html",
                       controller: "homeCtrl"
                   }
               }
           })
           .state('eventmenu.setting', {
               url: "/setting",
               views: {
                   'menuContent': {
                       templateUrl: "templates/setting.html",
                       controller: "settingCtrl"
                   }
               }
           })
           .state('eventmenu.checkin', {
               url: "/check-in",
               views: {
                   'menuContent': {
                       templateUrl: "check-in.html",
                       controller: "CheckinCtrl"
                   }
               }
           })
           .state('eventmenu.attendees', {
               url: "/attendees",
               views: {
                   'menuContent': {
                       templateUrl: "attendees.html",
                       controller: "AttendeesCtrl"
                   }
               }
           })

$urlRouterProvider.otherwise("/event/home");
})

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, $translate) {
    $scope.$root.cls = "bar-positive"

    $scope.attendees = [
    {firstname: 'Nicolas', lastname: 'Cage'},
    {firstname: 'Jean-Claude', lastname: 'Van Damme'},
    {firstname: 'Keanu', lastname: 'Reeves'},
    {firstname: 'Steven', lastname: 'Seagal'}
    ];

    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };


})

.controller('CheckinCtrl', function ($scope, $ionicNavBarDelegate) {
    $scope.showForm = true;
    $scope.$root.cls = "bar-assertive"
    console.log($ionicNavBarDelegate);
    $scope.shirtSizes = [
    {text: 'Large', value: 'L'},
    {text: 'Medium', value: 'M'},
    {text: 'Small', value: 'S'}
    ];

    $scope.attendee = {};
    $scope.submit = function () {
        if (!$scope.attendee.firstname) {
            alert('Info required');
            return;
        }
        $scope.showForm = false;
        $scope.attendees.push($scope.attendee);
    };

})

.controller('AttendeesCtrl', function ($scope) {
    console.log("AttendeesCtrl");
    $scope.$root.cls = "bar-calm"
    $scope.activity = [];
    $scope.arrivedChange = function (attendee) {
        var msg = attendee.firstname + ' ' + attendee.lastname;
        msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
        msg += new Date().getMilliseconds();
        $scope.activity.push(msg);
        if ($scope.activity.length > 3) {
            $scope.activity.splice(0, 1);
        }
    };

});