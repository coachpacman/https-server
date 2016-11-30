var express = require('express');
var router = express.Router();

var AccessToken = require('twilio').AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var randomUsername = require('../randos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/token', function(request, response) {
    var identity = randomUsername();

    console.log(process.env.TWILIO_ACCOUNT_SID)

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    var token = new AccessToken(
        'AC4ab272e112e605a97762510b1baf1ecb',
        'SKca7dac4bab069c1b060d39e00765a9d6',
        '76jD3sDzp9CqBNtuhR6pwPDWuuBHAwEq'
    );

    // Assign the generated identity to the token
    token.identity = identity;

    //grant the access token Twilio Video capabilities
    var grant = new VideoGrant();
    grant.configurationProfileSid = 'VS122c64045f945ca874913c7c871c3dcf';
    token.addGrant(grant);

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
        identity: identity,
        token: token.toJwt()
    });
});


module.exports = router;
