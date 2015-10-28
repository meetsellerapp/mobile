angular.module('ionicApp', ['ionic', 'firebase', 'pascalprecht.translate', 'ionicApp.homecontrollers', 'ionicApp.settingcontrollers', 
  'ionicApp.logincontrollers'])

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
    return {
        getAll: function() {
          var config = {
              "platform" : "android",
              "screen" : "480x800"
          };
          return config;
        }
    };
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
            .state('eventmenu.login', {
                url: "/login",
                views: {
                    'menuContent': {
                        templateUrl: "templates/login.html",
                        controller: "loginCtrl"
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

.controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, $translate, $ionicModal, loadFileConfig) {
    $scope.$root.cls = "bar-linked";
    // ionic.platform.fullScreen(true, false);

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
//        console.log("loadFileConfig:" + response.data.  );
//        console.log("loadFileConfig:" + response.data.screen );
//        $scope.platform = response.data.platform;
//        $scope.platform = response.data.screen;
//    });
    $scope.name = 'First ';
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(){
      $scope.modal.show();
    };
    $scope.closeModal = function(){
      $scope.modal.hide();
    };
})
.directive('notepad', function(loadFileConfig) {
  return {
    restrict: 'AE',
    scope: {},
    link: function(scope, elem, attrs) {
      
    },
    templateUrl: 'templateurl.html'
  };
})
.directive('isolateScopeWithController', function () {
      
    var controller = ['$scope', function ($scope) {

          function init() {
              $scope.items = angular.copy($scope.datasource);
          }

          init();

          $scope.addItem = function () {
              $scope.add();

              //Add new customer to directive scope
              $scope.items.push({
                  name: 'New Directive Controller Item'
              });
          };
      }],
        
      template = '<button ng-click="addItem()">Add Item</button><ul>' +
                 '<li ng-repeat="item in items">{{ ::item.name }}</li></ul>';
      
      return {
          restrict: 'EA', //Default in 1.3+
          scope: {
              datasource: '=',
              add: '&',
          },
          controller: controller,
          template: template
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