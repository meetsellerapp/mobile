#### init

You need to install ionic and its dependencies
http://ionicframework.com/docs/guide/installation.html

#### Install android sdk (http://goo.gl/iso187, http://goo.gl/dlMOi, 'http://robdodson.me/setting-up-android-studio-on-yosemite/', we need api 19: http://stackoverflow.com/a/24934188)

#### Add ANDROID_HOME to .bash_profile:
```
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```


### To generate app icon and splash screen run
```
ionic resources
```
#### Or
```
ionic resources --icon
ionic resources --splash
```

#### Install fb plugin

To use this app you will need to make sure you've registered your Facebook app with Facebook and have an APP_ID https://developers.facebook.com/apps.

This is the plugin: https://github.com/Wizcorp/phonegap-facebook-plugin

For ios see doc: https://github.com/Wizcorp/phonegap-facebook-plugin/tree/master/platforms/ios

For android see doc: https://github.com/Wizcorp/phonegap-facebook-plugin/tree/master/platforms/android

### Generate ANDROID Key Hash

http://stackoverflow.com/a/12577997/1330740
https://developers.facebook.com/docs/android/getting-started#release-key-hash
