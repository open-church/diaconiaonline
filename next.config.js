require('dotenv').config()

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    PREFIX_COMMUNITY_URL: process.env.PREFIX_COMMUNITY_URL,
    SENDGRID_KEY: process.env.SENDGRID_KEY
  }
}

module.exports = nextConfig
