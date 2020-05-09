/* global Module */

/* Magic Mirror
 * Module: joystick
 */

Module.register('joystick', {
  defaults: {
    position: 'neutral',
    updateInterval: 500
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
      Log.log('BUTTON PRESS', payload)
    }
    Log.log('NOTIFICATION RECEIVED')
  },

  scheduleUpdateInterval: function () {
    this.updateDom()

    this.timer = setInterval(() => {
      this.updateDom()

      if (this.config.position) {
        this.sendNotification('JOYSTICK_POSITION', this.config.position)
      }
    }, this.config.updateInterval)
  },

  stop: function () {
    clearInterval(this.timer)
  },

  updatePosition: function (payload) {
    Log.log('POSITION CHANGED --', payload)
    this.config.position = payload
  },

  getDom: function () {
    Log.log('DOM UPDATED..')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = JSON.stringify(this.config)
    return wrapper
  }
})
