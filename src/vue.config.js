const webpack = require('webpack')
const express = require('express')
const app = express()

var panghu = require('./static/map.json')  //本地json文件数据

var apiRoutes = express.Router();
app.use('/api', apiRoutes)

module.exports = {
    publicPath: './',
    baseUrl: './',
    outputDir: 'dist',
    lintOnSave:false,
    configureWebpack: {
        externals: {
          "BMap": "BMap",
          'AMap': 'AMap'
        }
      },
      devServer: {
        before(app) {
            app.get('/api/map', (req, res) => {
                res.json({
                    errno: 0,   // 这里是你的json内容
                    data: panghu
                })
            })
        },
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null      //设置跨域，即将本文件内任何没有匹配到的静态文件，都指向跨域地址
    },
    configureWebpack: {

        plugins: [
     
           new webpack.ProvidePlugin({
     
             $:"jquery",
     
             jQuery:"jquery",
     
             "windows.jQuery":"jquery"
     
           })
     
         ]
     
     },
    // 设置反向代理
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'https://172.31.120.61:8080/',
    //         ws: true,
    //         changeOrigin: true,
    //         pathRewrite: {
    //           '^/api': ''
    //         }
    //       }
    //     },
    //     https: true
    // }
};