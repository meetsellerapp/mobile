angular.module('ionicApp', ['ionic', 'pascalprecht.translate', 'ionicApp.homecontrollers'])

        .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {

            /* Prefered way:
             $translateProvider.useUrlLoader('foo/bar.json');
             $translateProvider.preferredLanguage('en');
             // the example above actually requests foo/bar.json?lang=en
             */

            /* Heavy way: */
            $translateProvider.translations('en', {
                TITLE: 'Hello',
                FOO: 'This is a paragraph.',
                BUTTON_LANG_EN: 'English',
                BUTTON_LANG_DE: 'German',
                BUTTON_LANG_NO: 'Norwegian',
                PLURAL: "You have {NUM, plural, =0{no messages} one{1 message} other{# messages}}."
            });
            $translateProvider.translations('de', {
                TITLE: 'Hallo',
                FOO: 'Dies ist ein Paragraph.',
                BUTTON_LANG_EN: 'Englisch',
                BUTTON_LANG_DE: 'Deutsch',
                BUTTON_LANG_NO: 'Norwegisch',
                PLURAL: "Sie haben {NUM, plural, =0{keine Nachrichten haben} one{1 Nachricht} other{# Nachrichten}}."
            });
            $translateProvider.translations('no', {
                TITLE: 'Hei',
                FOO: 'Dette er en paragraf',
                BUTTON_LANG_EN: 'Engelsk',
                BUTTON_LANG_DE: 'Tysk',
                BUTTON_LANG_NO: 'Norsk',
                PLURAL: "Du har {NUM, plural, =0{ingen meldinger} one{1 melding} other{# meldinger}}."
            });
//            $translateProvider.useMessageFormatInterpolation();
            $translateProvider.preferredLanguage('en');
            $translateProvider.fallbackLanguage('en');

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