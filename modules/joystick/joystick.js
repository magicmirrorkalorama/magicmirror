/* global Module */

/* Magic Mirror
 * Module: joystick
 */

Module.register('joystick', {
  defaults: {
    position: 'neutral',
    updateInterval: 5000
  },

  start: function () {
    Log.log('Starting module: ' + this.name)
    this.scheduleUpdateInterval()
  },

  notificationReceived: function(notification, payload, sender) {
    Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload)
    if (notification === 'JOYSTICK_POSITION') {
      this.updatePosition(payload)
    }
    if (notification === 'BUTTON_PRESS') {
      this.updateButton(payload)
    }
  },

  scheduleUpdateInterval: function () {
    this.updateDom()
    this.timer = setInterval(() => {
      this.updateDom()
    }, this.config.updateInterval)
  },

  stop: function () {
    clearInterval(this.timer)
  },

  updatePosition: function (payload) {
    Log.log('POSITION CHANGED --', payload)
    this.config.position = payload
    this.updateDom()
  },

  updateButton: function (payload) {
    Log.log('BUTTON STATUS CHANGED --', payload)
    this.config.button = payload
    this.updateDom()
  }

  getDom: function () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = JSON.stringify(this.config)
    return wrapper
  }
})
