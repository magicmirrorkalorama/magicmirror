const NodeHelper = require('node_helper')

/* Magic Mirror
 * Module: joystick
 */
module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper for: ' + this.name)
  },

  socketNotificationReceived: function (notification, payload) {
    console.debug(
      this.name +
        ' received a socket notification: ' +
        notification +
        ' - Payload: ' +
        payload
    )

    // if (notification === 'PIN_CONFIG') {
    //       console.log('PIN_CONFIG -- NODE' + JSON.stringify(payload))
    //       self.sendSocketNotification('PIN_CONFIG', payload)
    //     }
    //     if (notification === 'TOGGLE_PIN') {
    //       console.log('TOGGLE_PIN -- NODE' + JSON.stringify(payload))
    //       self.sendSocketNotification('TOGGLE_PIN', payload)
    //     }
  }
})
