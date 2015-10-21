/*
 * GET users listing.
 */
var con = require("../public/services/connectFireBase");

exports.list = function(req, res) {
	console.log("test firebase:" + con.connectFireBase());
	res.send("respond with a resource");
};