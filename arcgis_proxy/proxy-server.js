const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration
app.use('/arcgis-proxy', createProxyMiddleware({
  target: 'https://localhost:6443',  // Target your ArcGIS server
  changeOrigin: true,
  pathRewrite: {
    '^/arcgis-proxy': '',  // Rewrite URL path so it matches ArcGIS endpoint
  },
  secure: false,  // Set to false if your server uses self-signed SSL certificates
}));

// Start the proxy server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});