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

If you want to set group title, please set frontmatter `groupTitle` on each directories' README.md.

```
---
groupTitle: Group Title 01
---
```

Please see [example](https://github.com/tacck/vuepress-plugin-sidebar/tree/master/example/).

## License

[MIT License](./LICENSE)
