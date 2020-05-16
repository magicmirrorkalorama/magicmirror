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
    Log.log('Starting module: ' + this.name)
    this.scheduleUpdateInterval()
  },

  socketNotificationReceived: function (notification, payload, sender) {
    Log.log(
      this.name +
        ' received a socket notification: ' +
        notification +
        ' - Payload: ' +
        payload
    )
    if (notification === 'PIN_CONFIG') {
      Log.log('dude wtf... ok... so pin config...' + JSON.stringify(payload))
    }

    if (notification === 'JOYSTICK_POSITION') {
      Log.log('JOYSTICK_POSITION...', payload)
      // this.updatePosition(payload)
    }

    if (notification === 'BUTTON_PRESS') {
      Log.log('BUTTON PRESS...', payload)
      // this.updateButton(payload)
    }
  },

  scheduleUpdateInterval: function () {
    this.updateDom()
    this.timer = setInterval(() => this.updateDom(), this.config.updateInterval)
  },

  stop: function () {
    clearInterval(this.timer)
  },

  updatePosition: function (payload) {
    Log.log('POSITION CHANGED --', payload)
    this.config.position = payload
  },

  updateButton: function (payload) {
    Log.log('BUTTON STATUS CHANGED --', payload)
    this.config.button = payload
  },

  getDom: function () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = JSON.stringify(this.config) + new Date()
    return wrapper
  }
})
