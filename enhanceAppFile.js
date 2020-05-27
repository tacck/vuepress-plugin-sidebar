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

  // Basically, get the title from page.regularPath.
  // When isGrouping is true and frontmatter 'groupTitle' is used, set title from 'groupTitle'.
  for (const page of siteData.pages) {
    const title =
      isGrouping
      && 'groupTitle' in page.frontmatter
      && page.regularPath.lastIndexOf('/') === (page.regularPath.length - 1)
        ? page.frontmatter.groupTitle
        : page.title
    tempSidebar.push({ path: page.regularPath, title: title })
  }

  tempSidebar.sort((page1, page2) => {
    return page1.path.localeCompare(page2.path)
  })

  if (isGrouping) {
    sidebar = grouping(tempSidebar, groupOptions)
  } else {
    sidebar = flat(tempSidebar)
  }

  // set postItems
  Array.prototype.push.apply(sidebar, postItems)

  siteData.themeConfig.sidebar = sidebar
}

function flat(baseItems) {
  let sidebar = []

  for (const item of baseItems) {
    sidebar.push(item.path)
  }

  return sidebar
}

function grouping(baseItems, groupOptions) {
  let sidebar = []
  let groupedItems = []

  // Group by first level of directory.
  for (const item of baseItems) {
    const slashPosition = item.path.lastIndexOf('/')
    // case of README.md
    if (slashPosition === item.path.length - 1) {
      // create a group
      const groupName = item.path.substring(0, slashPosition === 0 ? 1 : slashPosition)
      // set group title
      const groupTitle = item.title
      groupedItems[groupName] = { title: groupTitle, items: [] }
    }
  }

  // Add items to the groups.
  for (const item of baseItems) {
    const slashPosition = item.path.lastIndexOf('/')
    const groupName = item.path.substring(0, slashPosition === 0 ? 1 : slashPosition)

    groupedItems[groupName].items.push(item.path)
  }

  // Set sidebar
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

  return sidebar
}
