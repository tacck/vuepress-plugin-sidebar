export default ({ Vue, options, router, siteData }) => {
  let sidebar = []
  let tempSidebar = []
  let postItems = []
  let isGrouping = false
  let groupOptions = {}

  const opt = OPTION !== null && typeof OPTION === 'object' ? OPTION : JSON.parse(OPTION)

  if (opt !== null && typeof opt === 'object') {
    if ('postItems' in opt && Array.isArray(opt.postItems)) {
      Array.prototype.push.apply(postItems, opt.postItems)
    }
    if ('grouping' in opt && opt.grouping) {
      isGrouping = true
      groupOptions = opt.groupOptions
    }
  }

  // regularPath を使うと、ページトップの `#` で宣言した内容をタイトルとして使ってくれる。
  // If isGrouping is true and use frontmatter 'groupTitle', set title to 'groupTitle'.
  for (const page of siteData.pages) {
    const title =
      isGrouping
      && 'groupTitle' in page.frontmatter
      && page.regularPath.lastIndexOf('/') === (page.regularPath.length - 1)
        ? page.frontmatter.groupTitle
        : page.title
    tempSidebar.push({ path: page.regularPath, title: title })
  }

  // regularPath を昇順にソート
  tempSidebar.sort((page1, page2) => {
    return page1.path.localeCompare(page2.path)
  })

  if (isGrouping) {
    sidebar = grouping(tempSidebar, groupOptions)
  } else {
    sidebar = flat(tempSidebar)
  }

  // postItems
  Array.prototype.push.apply(sidebar, postItems)

  siteData.themeConfig.sidebar = sidebar
}

function flat(baseItems) {
  let sidebar = []

  for (const item in baseItems) {
    sidebar.push(item.path)
  }

  return sidebar
}

function grouping(baseItems, groupOptions) {
  let sidebar = []
  let groupedItems = []

  // ディレクトリの第一階層を使ってグループ化
  for (const item of baseItems) {
    const slashPosition = item.path.lastIndexOf('/')
    // グループのトップページ(README.md)の場合の対応
    if (slashPosition === item.path.length - 1) {
      // グループの作成
      const groupName = item.path.substring(0, slashPosition === 0 ? 1 : slashPosition)
      // グループタイトルをページタイトルから設定
      const groupTitle = item.title
      groupedItems[groupName] = { title: groupTitle, items: [] }
    }
  }

  // グループへアイテム登録
  for (const item of baseItems) {
    const slashPosition = item.path.lastIndexOf('/')
    const groupName = item.path.substring(0, slashPosition === 0 ? 1 : slashPosition)

    groupedItems[groupName].items.push(item.path)
  }

  // sidebarへ反映
  for (const groupName in groupedItems) {
    const item = {
      title: groupedItems[groupName].title,
      path: groupName,
      children: groupedItems[groupName].items
    }

    if ('collapsable' in groupOptions) {
      item['collapsable'] = groupOptions.collapsable
    }
    if ('sidebarDepth' in groupOptions) {
      item['sidebarDepth'] = groupOptions.sidebarDepth
    }

    sidebar.push(item)
  }

  console.log(sidebar)
  return sidebar
}
