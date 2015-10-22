/*
 * GET users listing.
 */
var wait = require('wait.for');
var urlService = require("../public/services/url");
var async = require("async");


exports.list = function(req, res) {
//	var data = urlService.getAllURL(callback);
//	var result = wait.forMethod(urlService,getAllURL, "");
	console.log("test data:" + result);
	res.send("respond with a resource");
};