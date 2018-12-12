'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://api-dev"'
  // BASE_API: '"http://mock.com/zhangwei"'   // mock数据
  BASE_API: '"/admin"'    // 开发
})
