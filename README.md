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

### Option: Add static links after generated menu

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

## License

[MIT License](./LICENSE)
