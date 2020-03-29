module.exports = {
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://cs.91boshuo.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/imapi': {
                target: 'https://cs.91boshuo.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/imapi': '/imapi'
                }
            }
        },
        https: false
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/zppc/' : '/'
}