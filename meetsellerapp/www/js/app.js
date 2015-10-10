angular.module('ionicApp', ['ionic', 'pascalprecht.translate', 'ionicApp.homecontrollers', 'ionicApp.settingcontrollers'])

.factory('customLoader', function ($http, $q) {
    return function (options) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: 'languages/locale-' + options.key + '.json'
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject(options.key);
        });

        return deferred.promise;
    };
})
.factory('loadFileConfig', function ($http) {
    var platform = $http.get('configApp.json').success(function (response) {
//        console.log("loadFileConfig:" + response.data.platform );
        return response.data.platform;
    });
//    var factory = {};
//
//    factory.getMainConfig = function () {
//
//        return mainInfo;
//
//    };
//
//    return factory;

    return {
        hello: function () {
            return "hello";
        },
        platform: platform
    }
})
.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

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

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, $translate, loadFileConfig) {
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

//    var configData = loadFileConfig.getMainConfig();
//    mainInfo.success(function(data) { 
//    $scope.foo = "Hello "+data.contentItem[0].username;
//});
//    console.log("loadFileConfig:" + configData.platform );
    $scope.foo = "Hello World";
    
//    console.log("loadFileConfig:" + loadFileConfig.platform );
//    loadFileConfig.platform.success(function(response) {
//        console.log("loadFileConfig:" + response.data.platform );
//        console.log("loadFileConfig:" + response.data.screen );
//        $scope.platform = response.data.platform;
//        $scope.platform = response.data.screen;
//    });
$scope.name = 'First ';
   
})
.directive("welcome", function() {
  return {
    restrict: "E",
    controller: function($scope) {
      $scope.words = [];

      this.sayHello = function() {
        $scope.words.push("hello");
      };

      this.sayHowdy = function() {
        $scope.words.push("howdy");
      };

      this.sayHi = function() {
        $scope.words.push("hi");
      };
    },

    link: function(scope, element){
      element.bind("mouseenter", function() {
        console.log(scope.words);
      });
    }
  }
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