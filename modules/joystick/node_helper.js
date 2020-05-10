const NodeHelper = require('node_helper')
const Gpio = require('pigpio').Gpio

module.exports = NodeHelper.create({
  init: function () {
    this.position = 'neutral'
    this.button = ''

    try {
      this.JoystickUp = new Gpio(27, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        edge: Gpio.EITHER_EDGE,
        alert: true
      })

      this.JoystickDown = new Gpio(22, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        edge: Gpio.EITHER_EDGE,
        alert: true
      })

      this.ButtonA = new Gpio(17, {
        mode: Gpio.INPUT,
        pullUpDown: Gpio.PUD_UP,
        edge: Gpio.EITHER_EDGE,
        alert: true
      })

      this.ButtonB = new Gpio(23, {
        pullUpDown: Gpio.PUD_UP,
        mode: Gpio.INPUT,
        edge: Gpio.EITHER_EDGE,
        alert: true
      })
    } catch (err) {
      console.error(err)
    }

    this.setupListeners = () => {
      this.JoystickUp.on('alert', level => {
        if (level === 0) this.position = 'up'
        if (level === 1) this.position = 'neutral'
        this.sendSocketNotification('JOYSTICK_POSITION', this.position)
      })
      this.JoystickDown.on('interrupt', level => {
        if (level === 0) this.position = 'down'
        if (level === 1) this.position = 'neutral'
        this.sendSocketNotification('JOYSTICK_POSITION', this.position)
      })
      this.ButtonA.on('alert', level => {
        if (level === 0) this.button = 'red'
        if (level === 1) this.button = 'neutral'
        this.sendSocketNotification('BUTTON_PRESS', this.button)
      })
      this.ButtonB.on('alert', level => {
        if (level === 0) this.button = 'green'
        if (level === 1) this.button = 'neutral'
        this.sendSocketNotification('BUTTON_PRESS', this.button)
      })
    }
    this.setupGlitchFilters = () => {
      this.JoystickUp.glitchFilter(1e4)
      this.JoystickDown.glitchFilter(1e4)
      this.ButtonA.glitchFilter(1e4)
      this.ButtonB.glitchFilter(1e4)
    }
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === 'CONFIG') {
      this.config = payload.config
      this.initialize
    }
  },

  start: function () {
    this.setupListeners()
    this.setupGlitchFilters()
  }
})
