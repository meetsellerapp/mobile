angular.module('ionicApp.logincontrollers', [])

.controller('loginCtrl', function ($scope, $rootScope, $translate, $firebase, $firebaseSimpleLogin) {
     

    // TODO: Replace "ionic-demo" below with the name of your own Firebase
    var firebaseRef = new Firebase("https://meetsellerdb.firebaseio.com/");
    // Create a Firebase Simple Login object
    $scope.auth = $firebaseSimpleLogin(firebaseRef);
    // Initially set no user to be logged in
    $scope.user = null;

    // Logs a user in with inputted provider
    $scope.login = function(provider) {
        console.log("login fb start")
        $scope.auth.$login(provider);
    };
    // // Logs a user out
    $scope.logout = function() {
        $scope.auth.$logout();
    };
    // // Upon successful login, set the user object
    $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
        $scope.user = user;
        console.log("login successful with " + user);
    });
    //   // Upon successful logout, reset the user object
      $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
        $scope.user = null;
    });
      // Log any login-related errors to the console
      $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
        console.log("Error logging user in: ", error);
    }); 
})