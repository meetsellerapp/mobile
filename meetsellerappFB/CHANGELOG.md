Version 1.1.0 - released 19 August 2015

## Updates
- Updated app to work with Facebook API v2.4
- Update Ionic Version to v.1.0.1
- Update cordova
- Update cordova plugins

## New stuff
- Add cordova whitelist plugin (to fix connectivity issues when using new cordova version)
- Add cordova splashscreen plugin (to fix splash screen issues when using new cordova version)

Note: Most of the changes were due to facebook API updates. Two of the major updates in facebook newest API (v2.4) are:
Fewer default fields for faster performance: “To help improve performance on mobile network connections, we've reduced the number of fields that the API returns by default. You should now use the ?fields=field1,field2 syntax to declare all the fields you want the API to return.”
“The GET /v2.4/{user_id}/home, GET /v2.4/{user_id}/inbox, and GET /v2.4/{user_id}/notifications operations as well as read_stream, read_mailbox, and manage_notifications permissions are deprecated in v2.4.”
Basically those two updates remove the ability to get the user notifications feed and reduced the default fields returned in api calls. As we were using the user notifications feed in our product, we were forced to change that view with the user’s feed (which are the user’s posts, different from the user notifications feed). If you want more information about this, please refer to this changelog: https://developers.facebook.com/blog/post/2015/07/08/graph-api-v2.4/
