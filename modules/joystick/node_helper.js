const NodeHelper = require('node_helper')

module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper for: ' + this.name)
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'PIN_CONFIG') {
      console.log('PIN_CONFIG', notification, payload)
    }
  }
})
