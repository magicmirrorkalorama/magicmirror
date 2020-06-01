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
    Log.info('Starting module: ' + this.name)
    this.scheduleUpdateInterval()
  },

  notificationReceived: function (notification, payload, sender) {
    if (sender) {
      Log.log(
        this.name +
          ' received a module notification: ' +
          notification +
          ' from sender: ' +
          sender.name
      )
    } else {
      Log.log(this.name + ' received a system notification: ' + notification)
    }
  },

  socketNotificationReceived: function (notification, payload) {
    Log.log(
      this.name +
        ' received a socket notification: ' +
        notification +
        ' - Payload: ' +
        payload
    )
  },

  // socketNotificationReceived: function (notification, payload, sender) {
  //   if (notification === 'ALL_MODULES_STARTED') {
  //     if (notification === 'PIN_CONFIG') {
  //       Log.info('PIN_CONFIG' + JSON.stringify(payload))
  //     }

  //     if (notification === 'TOGGLE_PIN') {
  //       Log.info('TOGGLE_PIN' + JSON.stringify(payload))
  //     }

  //     if (notification === 'JOYSTICK_POSITION') {
  //       Log.info('JOYSTICK_POSITION' + JSON.stringify(payload))
  //       // this.updatePosition(payload)
  //     }

  //     if (notification === 'BUTTON_PRESS') {
  //       Log.info('BUTTON_PRESS' + JSON.stringify(payload))
  //       // this.updateButton(payload)
  //     }
  //   }
  // },

  scheduleUpdateInterval: function () {
    this.updateDom()
    this.timer = setInterval(() => this.updateDom(), this.config.updateInterval)
  },

  updatePosition: function (payload) {
    Log.info('POSITION CHANGED --', payload)
    this.config.position = payload
  },

  updateButton: function (payload) {
    Log.info('BUTTON STATUS CHANGED --', payload)
    this.config.button = payload
  },

  getDom: function () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = JSON.stringify(this.config)
    return wrapper
  }
})
