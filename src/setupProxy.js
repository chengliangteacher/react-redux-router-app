const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log(app)
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3009',
            changeOrigin: true,
        })
    );
};