module.exports = {
    devServer : {
        proxy : {
            "/api":  {
                target : "http://129.204.189.5:8080",
                // target : "http://127.0.0.1:80",
                ws : true,
                changeOrigin :true,
                pathRewrite : {
                    '^/api' : ''
                }
            }
        }
    },
    publicPath : './'
}