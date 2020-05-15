const NodeHelper = require('node_helper')

module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper for: ' + this.name)
    this.loaded = false
  },

  socketNotificationReceived: function (notification, payload) {
    console.log('Node', notification, payload)
  },

  init: function () {
    console.log('init...')
  }
})
