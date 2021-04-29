const path = require("path");
const poststylus = require("poststylus");
const pxtorem = require('postcss-pxtorem')
const resolve = file => path.resolve(__dirname, file);

module.exports = {
    lintOnSave: false,
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: "http://backend:83",
                changeOrigin: true,
            }
        }
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    css: {
        loaderOptions: {
            stylus: {
                use: [
                    poststylus([
                        pxtorem({
                            rootValue: 75,
                            propWhiteList: [],
                            minPixelValue: 2
                        }),
                        "autoprefixer"
                    ])
                ],
                import: [resolve("./src/styles/theme.custom")]
            }
        }
    },
}
