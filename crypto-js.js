CryptoJS.enc.Base64._map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=';
function GenerateLoginKey(partnerId, partnerUserId, expirationSeconds, apikey) {
    var version = 1;
    var expiration = Math.round(Date.now()*0.001) + expirationSeconds;
    var keystring = partnerId.toString()
           + partnerUserId.toString()
           + version.toString()
           + expiration.toString();
    var hmac = CryptoJS.HmacSHA256(keystring, apikey);
    var hmacb64 = hmac.toString(CryptoJS.enc.Base64);
    var loginkey = "$" + version
           + "$" + expiration
           + "$" + hmacb64.substr(0, 43);
    console.log(loginkey)
}

GenerateLoginKey(98765, "UserId", 7200, "RedactedApiKey")