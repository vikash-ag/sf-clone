"use strict";

exports.handle = (req, res) => {
    console.log(req.body);
    console.log("inside action.js");	
	res.json({text: "Go it"});
}
