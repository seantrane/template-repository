const serveStatic  = require('serve-static');

module.exports = {
  /**
   * Set Cache Headers by MimeType
   * @requires serve-static       serveStatic
   * @param    {express.Response} res
   * @param    {string}           uri_path
   */
  cacheByMimeType: function (res, uri_path) {
    switch (serveStatic.mime.lookup(uri_path)) {
      case 'application/javascript':
      case 'application/x-javascript':
      case 'text/javascript':
      case 'text/x-javascript':
      case 'text/html': {
        res.setHeader('Cache-Control', 'public, max-age=0');
        break;
      }
      case 'application/pdf':
      case 'image/gif':
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg+xml':
      case 'image/x-icon': {
        res.setHeader('Cache-Control', 'public, max-age=30d');
        break;
      }
      case 'audio/mpeg':
      case 'audio/ogg':
      case 'audio/wav':
      case 'video/avi': {
        res.setHeader('Cache-Control', 'public, max-age=90d');
        break;
      }
    }
  }
};
