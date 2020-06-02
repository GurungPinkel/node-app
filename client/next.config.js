require("dotenv").config();

module.exports = {
  poweredByHeader: false,
  generateEtags: false,
  env: {
    FACEBOOK_LOGIN_HOST_URL: process.env.FACEBOOK_LOGIN_HOST_URL,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL,
  },
};
