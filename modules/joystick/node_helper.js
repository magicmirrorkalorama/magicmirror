const NodeHelper = require('node_helper')
const raspi = require('raspi')
const gpio = require('raspi-gpio')

/* Magic Mirror
 * Module: joystick
 */
module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper for: ' + this.name)
    raspi.init(() => {
      const input = new gpio.DigitalInput({
        pin: 'GPIO17',
        pullResistor: gpio.PULL_UP
      })

      console.log(input.read())
    })
  },

  socketNotificationReceived: function (notification, payload) {
    Log.log(
      this.name +
        ' received a socket notification: ' +
        notification +
        ' - Payload: ' +
        payload
    )
  }

  // socketNotificationReceived: function (notification, payload) {
  //   if (notification === 'PIN_CONFIG') {
  //     console.log('PIN_CONFIG -- NODE' + JSON.stringify(payload))
  //     self.sendSocketNotification('PIN_CONFIG', payload)
  //   }
  //   if (notification === 'TOGGLE_PIN') {
  //     console.log('TOGGLE_PIN -- NODE' + JSON.stringify(payload))
  //     self.sendSocketNotification('TOGGLE_PIN', payload)
  //   }
  // }
})
