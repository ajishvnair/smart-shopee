// development: "http://192.168.43.122:3001/",
// production: "http://18.224.82.86:3001/",
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://192.168.43.122:3001/",
            changeOrigin: true,
        })
    );
};
