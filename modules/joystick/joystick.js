/* global Module */

/* Magic Mirror
 * Module: joystick
 */

Module.register('joystick', {
  defaults: {
    position: 'neutral',
    updateInterval: 300,
    button: 'neutral'
  },

  start: function () {
    Log.debug('Starting module: ' + this.name)
    this.scheduleUpdateInterval()
  },

  socketNotificationReceived: function (notification, payload, sender) {
    if (notification === 'ALL_MODULES_STARTED') {
      Log.debug(
        this.name +
          ' received a socket notification: ' +
          notification +
          ' - Payload: ' +
          payload
      )

      // if (notification === 'PIN_CONFIG') {
      //   Log.debug('PIN_CONFIG' + JSON.stringify(payload))
      // }

      // if (notification === 'TOGGLE_PIN') {
      //   Log.debug('TOGGLE_PIN' + JSON.stringify(payload))
      // }

      // if (notification === 'JOYSTICK_POSITION') {
      //   Log.debug('JOYSTICK_POSITION' + JSON.stringify(payload))
      //   // this.updatePosition(payload)
      // }

      // if (notification === 'BUTTON_PRESS') {
      //   Log.debug('BUTTON_PRESS' + JSON.stringify(payload))
      //   // this.updateButton(payload)
      // }
    }
  },

  scheduleUpdateInterval: function () {
    this.updateDom()
    this.timer = setInterval(() => this.updateDom(), this.config.updateInterval)
  },

  updatePosition: function (payload) {
    Log.debug('POSITION CHANGED --', payload)
    this.config.position = payload
  },

  updateButton: function (payload) {
    Log.debug('BUTTON STATUS CHANGED --', payload)
    this.config.button = payload
  },

  getDom: function () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = JSON.stringify(this.config)
    return wrapper
  }
})
