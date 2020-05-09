const NodeHelper = require('node_helper')
const Gpio = require('pigpio').Gpio

module.exports = NodeHelper.create({
  init: function () {
    this.position = 'neutral'
    this.button = ''

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

    this.setupListeners = () => {
      this.JoystickUp.on('alert', level => {
        if (level === 0) this.position = 'up'
        if (level === 1) this.position = 'neutral'
        console.log('UP -- make sure this, is this...', this)
        console.log(
          'UP -- this.sendSocketNotification?',
          this.sendSocketNotification
        )
        console.log('UP -- and this position?', this.position)
        this.sendSocketNotification('JOYSTICK_POSITION', this.position)
      })
      this.JoystickDown.on('interrupt', level => {
        if (level === 0) this.position = 'down'
        if (level === 1) this.position = 'neutral'
        console.log('DOWN -- make sure this, is this...', this)
        console.log(
          'DOWN -- this.sendSocketNotification?',
          this.sendSocketNotification
        )
        console.log('DOWN -- and this position?', this.position)
        this.sendSocketNotification('JOYSTICK_POSITION', this.position)
      })
      this.ButtonA.on('alert', level => {
        console.log('BUTTON RED -- make sure this, is this...', this)
        console.log(
          'BUTTON RED -- this.sendSocketNotification?',
          this.sendSocketNotification
        )
        console.log('BUTTON RED -- and this position?', this.position)
        this.sendSocketNotification('BUTTON_PRESS', level + 'red')
      })
      this.ButtonB.on('alert', level => {
        console.log('BUTTON GREEN -- make sure this, is this...', this)
        console.log(
          'BUTTON GREEN -- this.sendSocketNotification?',
          this.sendSocketNotification
        )
        console.log('BUTTON GREEN -- and this position?', this.position)
        this.sendSocketNotification('BUTTON_PRESS', level + 'green')
      })
    }
    this.setupGlitchFilters = () => {
      this.ButtonA.glitchFilter(1e4)
      this.JoystickUp.glitchFilter(1e4)
      this.JoystickDown.glitchFilter(1e4)
      this.ButtonB.glitchFilter(1e4)
    }
  },

  start: function () {
    this.setupListeners()
    this.setupGlitchFilters()
    console.log('Joystick helper module started.')
  }
})
