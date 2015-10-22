var Firebase = require("firebase");
function Item(delay) {
	this.delay = delay;
}

Item.prototype.someAsyncCall = function(callback) {
	setTimeout(function() {
		console.log("Item is done.");
		if (typeof callback === "function")
			callback();
	}, this.delay);
};

Item.prototype.getAllURL = function(callback) {
	var ref = new Firebase("https://meetsellerdb.firebaseio.com/");
	ref.child("url").on("child_added", function(snapshot) {
		 console.log("from getAllURL:" + snapshot.val());
		 if (typeof callback === "function")
				callback(snapshot.val());
	}, function(errorObject) {
		// console.log("The read failed: " + errorObject.code);
	});
	// setTimeout(function(){
	// console.log("Item is done.");
	// if(typeof callback === "function") callback();
	// }, this.delay);
};

module.exports = Item;
