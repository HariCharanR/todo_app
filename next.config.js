/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["links.papareact.com","cloud.appwrite.io"]
    }
}

module.exports = nextConfig



/**
 * in order to use images from various domains all domains should be whitelisted
 * here in the next.config.js 
 * 
 */