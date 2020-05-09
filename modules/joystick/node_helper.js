const NodeHelper = require('node_helper')
const Gpio = require('pigpio').Gpio

module.exports = NodeHelper.create({
  init: function () {
    const JoystickUp = new Gpio(27, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
      alert: true
    })
    const JoystickDown = new Gpio(22, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
      alert: true
    })
    JoystickUp.glitchFilter(1e4)
    JoystickDown.glitchFilter(1e4)
    JoystickUp.on('alert', level => {
      if (level === 0) this.position = 'up'
      if (level === 1) this.position = 'neutral'
      console.log('make sure this, is this...', this)
      console.log('this.sendSocketNotification?', this.sendSocketNotification)
      console.log('and this position?', this.position)
      this.sendSocketNotification('JOYSTICK_POSITION', this.position)
    })
    JoystickDown.on('interrupt', level => {
      if (level === 0) this.position = 'down'
      if (level === 1) this.position = 'neutral'
      this.sendSocketNotification('JOYSTICK_POSITION', this.position)
    })
    const ButtonA = new Gpio(17, {
      mode: Gpio.INPUT,
      pullUpDown: Gpio.PUD_UP,
      edge: Gpio.EITHER_EDGE,
      alert: true
    })
    ButtonA.glitchFilter(1e4)
    ButtonA.on('alert', level => {
      this.sendSocketNotification('BUTTON_PRESS', level + 'red')
    })
    const ButtonB = new Gpio(23, {
      pullUpDown: Gpio.PUD_UP,
      mode: Gpio.INPUT,
      edge: Gpio.EITHER_EDGE,
      alert: true
    })
    ButtonB.glitchFilter(1e4)
    ButtonB.on('alert', level => {
      this.sendSocketNotification('BUTTON_PRESS', level + 'green')
    })
  },

  start: function () {
    this.position = 'neutral'
    this.button = ''
    console.log('Joystick helper module started.')
  }
})
