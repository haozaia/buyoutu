module.exports = {
    publicPath: './',
    baseUrl: './',
    outputDir: 'dist',
    configureWebpack: {
        externals: {
          "BMap": "BMap",
          'AMap': 'AMap'
        }
      },
    // 设置反向代理
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    devServer: {
        port: 8080,
        proxy: {
            "/API": {
                target: "http://dcfm.eastmoney.com",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/API": "/"
                }
            },
            "/loginb": {
                target: "http://10.10.20.204:8080/",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                "^/loginb": "/"
                }
            },
            "/zhishu1": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu1": "/"
                }
            },
            "/zhishu2": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu2": "/"
                }
            },
            "/zhishu3": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu3": "/"
                }
            },
            "/zhishu4": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu4": "/"
                }
            },
            "/zhishu5": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu5": "/"
                }
            },
            "/zhishu6": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu6": "/"
                }
            },
            "/zhishu7": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu7": "/"
                }
            },
            "/zhishu8": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu8": "/"
                }
            },
            "/zhishu9": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu9": "/"
                }
            },
            "/zhishu10": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu10": "/"
                }
            },
            "/zhishu11": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu11": "/"
                }
            },
            "/zhishu12": {
                target: "http://hq.sinajs.cn",
                ws: true,
                changOrigin: true,
                pathRequiresRewrite: {
                    "^/zhishu12": "/"
                }
            },
        }
    }
};