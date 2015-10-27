/*
 * GET users listing.
 */
var urlService = require("../public/services/url");
var Firebase = require("firebase");
exports.list = function(req, res) {
	var ref = new Firebase("https://meetsellerdb.firebaseio.com/");
	ref.child("url").on("child_added", function(snapshot) {
//		console.log(snapshot.val());
		res.json({
			list : snapshot.val()
		});
	}, function(errorObject) {
		console.log("The read failed: " + errorObject.code);
	});
//	res.json({
//		list : urlService.getAllURL()
//	});
};