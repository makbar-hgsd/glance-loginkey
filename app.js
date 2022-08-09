const express = require('express');
const app = express();
const cors = require('cors');

var corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.post('/loginkey', cors(corsOptions), (request, response) => {
    try {
        const version = 1;
        const expires = (Math.round((new Date()).valueOf() / 1000)) + parseInt(environmentVariables.GLANCE_EXPIRATION, 10);
        const keystring = environmentVariables.GLANCE_GROUP_ID + request.query.partneruserid + version + expires;
        const CryptoJS = require('crypto-js');
        const hmac = CryptoJS.HmacSHA256(keystring, environmentVariables.GLANCE_API_KEY);
        const hmacb64 = hmac.toString(CryptoJS.enc.Base64);
        const loginkey = "$" + version + "$" + expires + "$" + hmacb64.substr(0, 43).replace(/\+/g, '-').replace(/\//g, '_');
    
        response.json({
            'loginKey': loginkey,
            'groupId': environmentVariables.GLANCE_GROUP_ID,
            'expiration': expires
			
        });
    
    } catch(error) {
        console.log("errrrr");
        // handle error
    }
	
});