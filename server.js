"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/slack-salesforce-auth'),
    account = require('./modules/account'),
    actions = require('./modules/actions'),
    app = express();

//var urlencodedparser = bodyParser.urlencoded({extended: true});

app.enable('trust proxy');

app.set('port', process.env.PORT || 5000);

app.use('/', express.static(__dirname + '/www')); // serving company logos after successful authentication
app.use(bodyParser.urlencoded({extended: true}));
/*
app.get('/',function(req,res){
	res.render('index.html')

});
*/
app.post('/account', account.execute);
console.log('server.js #27');
app.get('/login/:slackUserId', auth.oauthLogin);
console.log('server.js #29');
app.get('/oauthcallback', auth.oauthCallback);
console.log('server.js #32');

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});