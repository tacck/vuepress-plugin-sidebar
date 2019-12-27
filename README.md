# vuepress-plugin-sidebar

Sidebar-menu generator plugin for VuePress.

## Instration

```
$ npm install --save-dev vuepress-plugin-sidebar
# or
$ yarn add --dev vuepress-plugin-sidebar
```

## How to use

``` .vuepress/config.js
module.exports = {
  plugins: [
    ['sidebar']
  ]
}
```

### Options

#### Add static links after generated menu

``` .vuepress/config.js
module.exports = {
  plugins: [
    [
      'sidebar', {
        postItems: [
          ['https://www.tacck.net/', 'Tacck.NET']
        ]
      }
    ]
  ]
}
```

#### Grouping menu

``` .vuepress/config.js
module.exports = {
  plugins: [
    [
      'sidebar', {
        grouping: true,
        groupOptions: {
          collapsable: true,
          sidebarDepth: 2,
        },
      }
    ]
  ]
}
```

## License

[MIT License](./LICENSE)
