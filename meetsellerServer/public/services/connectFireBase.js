var Firebase = require("firebase");
module.exports = {
	test : function() {
		return "test demo";
	},
	connectFireBase : function() {
		// var myDataRef = new
		// Firebase('https://fjblj10x563.firebaseio-demo.com/');
		// Get a database reference to our posts
		var ref = new Firebase(
				"https://docs-examples.firebaseio.com/web/saving-data/fireblog/posts");

		// Attach an asynchronous callback to read the data at our posts
		// reference
		ref.on("value", function(snapshot) {
			console.log(snapshot.val());
		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}
};