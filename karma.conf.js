var webpackConfig = require('@vue/cli-service/webpack.config.js')
const path = require('path')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'tests/**/*.spec.js'   //tests目录下，所有.spce.js结尾的测试文件
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [{type: 'lcov', subdir: '.'}, {type: 'text-summary'}]
    },
    browsers: ['ChromeHeadless'],
    autoWatch: true
  })
}
