const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/system/files/documents/pages/', {
      target: 'https://www.health.govt.nz',
    }),
  );
};
