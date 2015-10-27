/*
 * GET users listing.
 */
var urlService = require("../public/services/url");
var Firebase = require("firebase");
exports.list = function(req, res) {
	var ref = new Firebase("https://meetsellerdb.firebaseio.com/");
	ref.child("url").on("value", function(snapshot) {
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
exports.create = function(req , res) {
	console.log("create url");
	var rootRef = new Firebase('https://meetsellerdb.firebaseio.com/');
	var urlRef = rootRef.child("url");
	
	var title = req.body.title;
	var id = req.body.id;
	var url = req.body.url;
	var updated_time = req.body.updated_time;
	var description = 	req.body.description;
	var type = req.body.type;
	
	var dataURL = {
			id: id,
			url : url,
			type : type,
			title : title,
			description: description,
			updated_time: updated_time,
			images: ["https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDsy0B1f6jC6WTn&url=http%3A%2F%2Fstatic-01.lazada.vn%2Fp%2Fasus-zenfone-2-laser-16gb-en-7928-2662231-1-product.jpg",
			         "https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDGbR53-GCBvrKZ&url=https%3A%2F%2Ftabletplaza.vn%2Fimage%2Fcache%2Fdata%2Fdienthoaididong%2Fasus%2Fasus-zenfone-2-laser-doi-thu-nang-ki-cho-smartphone-tam-trung-14.jpg",
			         "https://fbexternal-a.akamaihd.net/safe_image.php?d=AQDAeo3NDjrzcW3y&url=https%3A%2F%2Ftabletplaza.vn%2Fimage%2Fcache%2Fdata%2Fdienthoaididong%2Fasus%2Fasus-zenfone-2-laser-doi-thu-nang-ki-cho-smartphone-tam-trung-6.jpg",
			         ]
			
	};
	var newURLRef = urlRef.push();
	newURLRef.set(dataURL);
	res.json({
		result : true
	});
	
};