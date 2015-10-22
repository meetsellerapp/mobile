/*
 * GET users listing.
 */
var urlService = require("../public/services/url");
async = require("async");
Item = require("../public/services/testClass");


function doSomethingOnceAllAreDone(){
    console.log("Everything is done--.");
}
exports.list = function(req, res) {
	// // var data = urlService.getAllURL(callback);
	// // var result = wait.forMethod(urlService,getAllURL, "");
	// console.log("test data:" + result);

	var items = [];
	items.push(new Item(1000));
	items.push(new Item(200));
	items.push(new Item(500));

	// 1st parameter in async.each() is the array of items
	async.each(items,
	// 2nd parameter is the function that each item is passed into
	function(item, callback) {
		// Call an asynchronous function (often a save() to MongoDB)
		item.someAsyncCall(function() {
			// Async call is done, alert via callback
			callback();
		});
		item.getAllURL(function() {
			var data;
			callback(data);
			console.log("fron ")
		});
	},
	// 3rd parameter is the function call when everything is done
	function(err) {
		// All tasks are done now
		doSomethingOnceAllAreDone();
	});
	res.send("respond with a resource");
};