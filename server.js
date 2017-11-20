"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/slack-salesforce-auth'),
    //contact = require('./modules/contact'),
    account = require('./modules/account'),
    //opportunity = require('./modules/opportunity'),
    //_case = require('./modules/case'),
    //whoami = require('./modules/whoami'),
    actions = require('./modules/actions'),
    app = express();


app.enable('trust proxy');

app.set('port', process.env.PORT || 5000);
console.log("server.js line #18");

app.use('/', express.static(__dirname + '/www')); // serving company logos after successful authentication
console.log("server.js line #20");

app.use(bodyParser.urlencoded({extended: true}));
console.log("server.js line #23");

app.post('/actions', actions.handle);
console.log("server.js line #26");
//app.post('/pipeline', opportunity.execute);
//app.post('/contact', contact.execute);
app.post('/account', account.execute);
console.log("server.js line #30");
//app.post('/case', _case.execute);
//app.post('/whoami', whoami.execute);
//app.post('/login', auth.loginLink);
//app.post('/logout', auth.logout);
app.get('/login/:slackUserId', auth.oauthLogin);
app.get('/oauthcallback', auth.oauthCallback);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});