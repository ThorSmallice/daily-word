module.exports = {
    publicPath: './',
    productionSourceMap:false,
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    },
    // devServer : {
    //     proxy: {
    //         "/api": {
    //             target: "http://flowerserve.dbice.cn",
    //             ws: true,
    //             changeOrigin: true
    //         }
    //     }
    // }
}