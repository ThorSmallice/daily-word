module.exports = {
    publicPath: './',
    productionSourceMap:false,
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    },
    devServer : {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                ws: true,
                changeOrigin: true
            }
        }
    }
}