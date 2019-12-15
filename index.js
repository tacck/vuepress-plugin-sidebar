const path = require('path')

module.exports = (option, context) => ({
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js'),
  define: {
    OPTION: option,
    CONTEXT: context
  }
})