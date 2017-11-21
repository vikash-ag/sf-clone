"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/slack-salesforce-auth'),
    account = require('./modules/account'),
    actions = require('./modules/actions'),
    app = express();

app.enable('trust proxy');

app.set('port', process.env.PORT || 5000);
console.log("port");

app.use('/', express.static(__dirname + '/www')); // serving company logos after successful authentication
console.log("static");

app.use(bodyParser.urlencoded({extended: true}));
console.log("bodyparser");

	app.post('/actions', actions.handle);
	/*
	app.get('/actions',actions.handle,function(req,res){
		res.redirect("/");
		//console.log("server.js line #26");
		//res.redirect(actions.handle);
	});
	*/
	app.post('/account', account.execute);
	console.log("account in server");
	app.get('/login/:slackUserId', auth.oauthLogin);
	console.log("login in server");
	app.get('/oauthcallback', auth.oauthCallback);
	console.log("server.js line #34");

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});