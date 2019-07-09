const path = require('path')
module.exports = {
  base: '/my-wheel/',
  title: 'MWUI',
  description: 'MW UI框架',
  themeConfig: {
    sidebar: [
      '/introduce/',
      {
        title: '入门',
        collapsable: false,
        children: [
          '/install/',
          '/quick-start/',
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/button',
          '/components/input',
          '/components/grid',
          '/components/layout',
          '/components/tabs',
          '/components/toast',
          '/components/collapse',
        ]
      },
    ],
    scss: {
      includePaths: [path.join(__dirname, '../../styles')]
    }
  }
}
