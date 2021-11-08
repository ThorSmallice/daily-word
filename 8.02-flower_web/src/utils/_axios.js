const axios = require("axios");

const _axios = axios.create({
    // baseURL: 'http://flowerserve.dbice.cn/',
    // withCredentials:true,
    // headers: {
    //     'Content-Type': "application/json;charset=utf-8"
    // },
    
    timeout: 6000
})

module.exports = _axios