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
    publicPath : '/jessy/',
    outputDir : "jessy",
    // configureWebpack : config=>{        //config为初始的webpack的配置对象，可以直接修改config
    //     config.entry.app = ["babel-polyfill", "./src/main.js"]      //兼容ie浏览器（不支持es6语法）
    // }
}