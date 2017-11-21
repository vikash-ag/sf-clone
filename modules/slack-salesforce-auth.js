"use strict";

//var SLACK_LOGIN_TOKEN = process.env.SLACK_LOGIN_TOKEN,
//    SLACK_LOGOUT_TOKEN = process.env.SLACK_LOGOUT_TOKEN,
var SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_LOGIN_URL = process.env.SF_LOGIN_URL,
    request = require('request'),
	mapping = {};

exports.oauthLogin = (req, res) => {
    res.redirect('${SF_LOGIN_URL}/services/oauth2/authorize?response_type=code&client_id=${SF_CLIENT_ID}&redirect_uri=https://${req.hostname}/oauthcallback&state=${req.params.slackUserId}');
};

exports.oauthCallback = (req, res) => {

    let options = {
        url: '${SF_LOGIN_URL}/services/oauth2/token',
        qs: {
            grant_type: "authorization_code",
            code: req.query.code,
            client_id: SF_CLIENT_ID,
            client_secret: SF_CLIENT_SECRET,
            redirect_uri: 'https://${req.hostname}/oauthcallback'
        }
    };

    request.post(options, function (error, response, body) {
        if (error) {
            console.log(error);
            return res.send("error");
        }
		mapping = JSON.parse(body);
        let html = '<html><body style="text-align:center;padding-top:100px"><img src="images/linked.png"/><div style="font-family:\'Helvetica Neue\';font-weight:300;color:#444"><h2 style="font-weight: normal">Authentication completed</h2></h2></body></html>';
		
        res.send(html);
    });

};

exports.getOAuthObject = slackUserId => mappings;