var Firebase = require("firebase");
module.exports = {
	test : function() {
		return "test demo";
	},
	getAllURL: function() {
		var ref = new Firebase("https://meetsellerdb.firebaseio.com/");

		// Attach an asynchronous callback to read the data at our posts
		// reference
		ref.child("url").on("child_added", function(snapshot) {
//			callback = snapshot.val()
//			console.log(snapshot.val());
			return snapshot.val();
		}, function(errorObject) {
//			console.log("The read failed: " + errorObject.code);
		});
		if (callback && typeof(callback) === "function") {
	        callback();
	    }
		
	},
	connectFireBase : function() {
		// var myDataRef = new
		// Firebase('https://fjblj10x563.firebaseio-demo.com/');
		// Get a database reference to our posts
		var ref = new Firebase("https://meetsellerdb.firebaseio.com/");

		// Attach an asynchronous callback to read the data at our posts
		// reference
		ref.on("value", function(snapshot) {
			console.log(snapshot.val());
		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	},
	createData : function() {
		var rootRef = new Firebase('https://meetsellerdb.firebaseio.com/');
		var urlRef = rootRef.child("url");
		var dataURL = {
			id : "1",
			url : "http://www.lazada.vn/asus-zenfone-2-laser-16gb-den-1322662.html",
			type : "website",
			title : "Asus Zenfone 2 Laser 16GB (Ä�en) | Lazada.vn",
			description : "Mua Asus Zenfone 2 Laser 16GB (Ä�en) chÃ­nh hÃ£ng, giÃ¡ tá»‘t nháº¥t táº¡i Lazada.vn, giao hÃ ng táº­n nÆ¡i, vá»›i nhiá»�u chÆ°Æ¡ng trÃ¬nh khuyáº¿n mÃ£i giáº£m giÃ¡ háº¥p dáº«n.",
			updated_time : 1445071671,
			images : [
					"https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDsy0B1f6jC6WTn&url=http%3A%2F%2Fstatic-01.lazada.vn%2Fp%2Fasus-zenfone-2-laser-16gb-en-7928-2662231-1-product.jpg",
					"https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDGbR53-GCBvrKZ&url=https%3A%2F%2Ftabletplaza.vn%2Fimage%2Fcache%2Fdata%2Fdienthoaididong%2Fasus%2Fasus-zenfone-2-laser-doi-thu-nang-ki-cho-smartphone-tam-trung-14.jpg",
					"https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDAeo3NDjrzcW3y&url=https%3A%2F%2Ftabletplaza.vn%2Fimage%2Fcache%2Fdata%2Fdienthoaididong%2Fasus%2Fasus-zenfone-2-laser-doi-thu-nang-ki-cho-smartphone-tam-trung-6.jpg", ]

		};
		var newURLRef = urlRef.push();
		newURLRef.set(dataURL);
		//			urlRef.set({1 :dataURL});
		//			var usersRef = rootRef.child("users");
		//			usersRef.set({
		//				alanisawesome : {
		//					date_of_birth : "June 23, 1912",
		//					full_name : "Alan Turing"
		//				},
		//				gracehop : {
		//					date_of_birth : "December 9, 1906",
		//					full_name : "Grace Hopper"
		//				}
		//			});
	}
};
