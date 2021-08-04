const axios = require("axios");

const _axios = axios.create({
    // baseURL: 'http://localhost:3000/',
    timeout: 6000
})

module.exports = _axios