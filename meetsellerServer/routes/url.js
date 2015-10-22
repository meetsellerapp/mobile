/*
 * GET users listing.
 */
var urlService = require("../public/services/url");
var Q = require("q");

exports.list = function(req, res) {
//	urlService.getAllURL.child("url").on("child_added", function(snapshot) {
//		console.log("url data :" + snapshot.val());
//	});
//	var projects = yield urlService.getAllURL();
//	console.log("url data :" + projects);
	urlService.generator().then(function (forty) {
	    console.log(forty, 40);
	}, function (reason) {
	    console.log("reason", reason);
	});
	res.json({
		list : urlService.getAllURL()
	});
};