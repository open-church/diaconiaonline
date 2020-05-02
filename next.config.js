require('dotenv').config()

const nextConfig = {
  env: {
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig
