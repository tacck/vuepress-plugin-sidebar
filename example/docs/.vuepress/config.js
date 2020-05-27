const sidebar = require('../../../index')

module.exports = {
  plugins: [
    [
      sidebar, {
        grouping: true,
        groupOptions: {
          collapsable: false,
          sidebarDepth: 2,
        },
      }
    ]
  ],
}
