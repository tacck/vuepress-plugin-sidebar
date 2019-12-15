export default ({ Vue, options, router, siteData }) => {
  const sidebar = []
  let postItems = []

  if (OPTION !== null && typeof OPTION === 'object') {
    if ('postItems' in OPTION && Array.isArray(OPTION.postItems)) {
      Array.prototype.push.apply(postItems, OPTION.postItems)
    }
  }

  // regularPath を使うと、ページトップの `#` で宣言した内容をタイトルとして使ってくれる。
  for (const page of siteData.pages) {
    sidebar.push(page.regularPath)
  }

  // regularPath を昇順にソート
  sidebar.sort((page1, page2) => {
    return page1.localeCompare(page2)
  })

  // postItems
  Array.prototype.push.apply(sidebar, postItems)

  siteData.themeConfig.sidebar = sidebar
}
