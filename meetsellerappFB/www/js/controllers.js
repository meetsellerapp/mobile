angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $q, UserService, $ionicLoading, FACEBOOK_APP_ID) {

//This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }
    console.log('fbLoginSuccess');

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {

      console.log('profile info success', profileInfo);
      //for the purpose of this example I will store user data on local storage
      UserService.setUser({
        authResponse : authResponse,
        profileInfo : profileInfo,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      });

      $ionicLoading.hide();
      $state.go('app.feed');
    }, function(fail){
      //fail get profile info
      console.log('profile info fail', fail);
    });
  };

  //This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError');
    $ionicLoading.hide();
  };

  //this method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=about,bio,birthday,email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        info.resolve(response);
      },
      function (response) {
        info.reject(response);
      }
    );
    return info.promise;
  }

  //This method is executed when the user press the "Login with facebook" button
  $scope.login = function() {
    if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }

    facebookConnectPlugin.getLoginStatus(function(success){
     if(success.status === 'connected'){
        // the user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus',success.status);
        $state.go('app.feed');
     } else {
        //if (success.status === 'not_authorized') the user is logged in to Facebook, but has not authenticated your app
        //else The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
        console.log('getLoginStatus',success.status);
        $ionicLoading.show({
          template: 'Logging in...'
        });

        //ask the permissions you need. You can learn more about FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile', 'user_about_me', 'user_likes', 'user_location', 'user_posts', 'user_status', 'user_birthday', 'user_photos'], fbLoginSuccess, fbLoginError);
      }
    });
  }
})

.controller('FeedCtrl', function($scope, $state, UserService, $q, FACEBOOK_APP_ID, $ionicLoading) {
  $scope.user = UserService.getUser();
  var authResponse = $scope.user.authResponse;

  $scope.doRefresh = function() {
    var feed = $q.defer();

    if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }

    $ionicLoading.show({
      template: 'Loading feed...'
    });

    facebookConnectPlugin.api('/' + authResponse.userID + '/feed?fields=from,full_picture,created_time,message,story,comments,likes,place&access_token=' + authResponse.accessToken, null,
      function (response) {
        feed.resolve(response.data);
      },
      function (response) {
        feed.reject(response);
      }
    );

    feed.promise.then(function(feed_response){
      $scope.items = feed_response;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    }, function(fail){
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
      $state.go('login');
    });
  };

  $scope.doRefresh();
})



.controller('AppCtrl', function($scope, $state, $ionicPopup, UserService, $ionicLoading, FACEBOOK_APP_ID) {
   $scope.user = UserService.getUser();
   // LOG OUT
   // A confirm dialog to be displayed when the user wants to log out
   $scope.showConfirmLogOut = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Log out',
       template: 'Are you sure you want to log out?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         //logout
         $ionicLoading.show({
           template: 'Loging out...'
         });

         if (!window.cordova) {
           //this is for browser only
           facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
         }

         facebookConnectPlugin.logout(function(){
           //success
           $ionicLoading.hide();
           $state.go('login');
         },
         function(fail){
           $ionicLoading.hide();
         });
       } else {
        //cancel log out
       }
     });
   };
})

.controller('ProfileCtrl', function($scope, $state, UserService) {
  $scope.user = UserService.getUser();
})

.controller('LikesCtrl', function($scope, $state, UserService, FACEBOOK_APP_ID, $q, $ionicLoading) {
  $scope.user = UserService.getUser();
  var authResponse = $scope.user.authResponse;

  $scope.doRefresh = function() {
    var likes = $q.defer();

    if (!window.cordova) {
      //this is for browser only
      facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
    }

    $ionicLoading.show({
      template: 'Loading likes...'
    });

    facebookConnectPlugin.api('/' + authResponse.userID + '/likes?access_token=' + authResponse.accessToken, null,
    function (response) {
      likes.resolve(response.data);
    },
    function (response) {
      likes.reject(response);
    });

    likes.promise.then(function(photos){
      $scope.likes = photos;
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    },function(fail){
      $ionicLoading.hide();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.doRefresh();
})

.controller('ShareCtrl', function($scope, $state, UserService, $q, FACEBOOK_APP_ID, $ionicLoading) {
  $scope.user = UserService.getUser();
  $scope.image_to_share = "https://c1.staticflickr.com/9/8322/8057495684_335ee78565_z.jpg";

  if (!window.cordova) {
    //this is for browser only
    facebookConnectPlugin.browserInit(FACEBOOK_APP_ID);
  }

  $scope.post_status = function() {
    facebookConnectPlugin.showDialog({
      method:"feed"
    },
    function (response) {
      $ionicLoading.show({ template: 'Status posted!', noBackdrop: true, duration: 2000 });
    },
    function (response) {
      //fail
    });
  };

  $scope.send_message = function() {
    facebookConnectPlugin.showDialog({
      method: 'send',
      link:'http://example.com',
    },
    function (response) {
      $ionicLoading.show({ template: 'Message sent!', noBackdrop: true, duration: 2000 });
    },
    function (response) {
      //fail
    });
  };

  $scope.post_image = function() {
    facebookConnectPlugin.showDialog(
    {
      method: "feed",
      picture: $scope.image_to_share,
      name:'Test Post',
      message:'This is a test post',
      caption: 'Testing using IonFB app',
      description: 'Posting photo using IonFB app'
    },
    function (response) {
      $ionicLoading.show({ template: 'Image posted!', noBackdrop: true, duration: 2000 });
    },
    function (response) {
      //fail
    });
  };

  $scope.share_link = function() {
    facebookConnectPlugin.showDialog(
    {
      method: "share",
      href: 'http://example.com',
    },
    function (response) {
      $ionicLoading.show({ template: 'Link shared!', noBackdrop: true, duration: 2000 });
    },
    function (response) {
      //fail
    });
  };
});
