import { oauthproviders } from '../modules/application_cache';
import asyncHandler from 'express-async-handler';
import { basicAuthentication } from '../middleware/authentication';
import cacheMiddleware from 'express-caching-middleware';
import Cache from 'simple-cache-js';
const oauthCache = new Cache();

import express from 'express';
const router = express.Router();

const formatUrl = (req, res) => {
    const oauthobject = oauthproviders[req.params.application];
    console.log(999, oauthobject);
    // Authorization oauth2 URI
    //const protocol = (req.params.application.toLowerCase() === 'bunq' ? 'https' : req.protocol);
    //const redirecthost = protocol + '://' + req.get('host');
    const authorizationUri = oauthobject.formatUrl();

    // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
    return res.send(authorizationUri);
};

const exchange = async (req, res) => {
    const oauthobject = oauthproviders[req.params.application];

    // Save the access token
    try {
        const accessToken = await oauthobject.getToken(req.body.code);
        console.log(accessToken);
        const accessTokenObject = {
            access_token: accessToken.token.access_token,
            expires_at: accessToken.token.expires_at,
            expires_in: accessToken.token.expires_in,
            refresh_token: accessToken.token.refresh_token,
            scope: accessToken.token.scope,
            token_type: accessToken.token.token_type,
        };
        return res.send({ success: true, data: accessTokenObject });
    } catch (error) {
        console.log(error.message, error.output);
        return res.status(400).send({ success: false, message: error.message, output: error.output });
    }
};

const refresh = async (req, res) => {
    try {
        const oauthobject = oauthproviders[req.params.application];

        const accessToken = await oauthobject.refresh(req.body);
        const accessTokenObject = {
            access_token: accessToken.token.access_token,
            expires_at: accessToken.token.expires_at,
            expires_in: accessToken.token.expires_in,
            refresh_token: accessToken.token.refresh_token,
            scope: accessToken.token.scope,
            token_type: accessToken.token.token_type,
        };
        return res.send({ success: true, data: accessTokenObject });
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message, output: error.output });
    }
};

router.get('/formatUrl/:application', basicAuthentication, cacheMiddleware(oauthCache), asyncHandler(formatUrl));
router.post('/exchange/:application', basicAuthentication, asyncHandler(exchange));
router.post('/refresh/:application', basicAuthentication, asyncHandler(refresh));

module.exports = router;
