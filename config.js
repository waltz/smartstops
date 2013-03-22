var Configuration = {
  foursquare: {
    secrets: {
      clientId:     process.env.FOURSQUARE_CLIENT_ID,
      clientSecret: process.env.FOURSQUARE_CLIENT_SECRET,
      redirectUrl:  process.env.FOURSQUARE_REDIRECT_URL
    }
  }
}

module.exports = Configuration
