/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
  address: '0.0.0.0', // Address to listen on, can be:
  // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
  // - another specific IPv4/6 to listen on a specific interface
  // - "0.0.0.0", "::" to listen on any interface
  // Default, when address config is left out or empty, is "localhost"
  port: 8080,
  ipWhitelist: [], // Set [] to allow all IP addresses
  // or add a specific IPv4 of 192.168.1.5 :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
  // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
  // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

  useHttps: false, // Support HTTPS or not, default "false" will use HTTP
  httpsPrivateKey: '', // HTTPS private key path, only require when useHttps is true
  httpsCertificate: '', // HTTPS Certificate path, only require when useHttps is true

  language: 'en',
  timeFormat: 12,
  units: 'imperial',
  // serverOnly: true,
  // local for armv6l processors, default
  //   starts serveronly and then starts chrome browser
  // false, default for all  NON-armv6l devices
  // true, force serveronly mode, because you want to.. no UI on this device

  modules: [
    {
      module: 'alert'
    },

    {
      module: 'clock',
      position: 'top_right'
    },
    {
      module: 'MMM-Remote-Control'
    },
    {
      module: 'MMM-connection-status',
      header: 'connection',
      position: 'top_right',
      config: {}
    },
    {
      module: 'MMM-Online-State',
      position: 'top_right',
      config: {}
    },
    {
      module: 'MMM-DailyPokemon',
      position: 'top_left',
      config: {
        updateInterval: 30000,
        grayscale: false,
        minPoke: 1,
        maxPoke: 649,
        showType: true,
        stats: true,
        language: 'en',
        genera: true,
        gbaMode: false,
        nameSize: 32
      }
    },
    {
      module: 'MMM-Pins',
      config: {
        pinConfiguration: [
          {
            pin: 17,
            direction: 'in',
            notification: 'MONITORON'
          },
          {
            pin: 23,
            direction: 'in',
            notification: 'MONITOROFF'
          },
          {
            pin: 27,
            direction: 'in',
            notification: 'SHOW_ALERT',
            prettyName: 'JOYSTICK_UP'
          },
          {
            pin: 22,
            direction: 'in',
            notification: 'SHOW_ALERT',
            prettyName: 'JOYSTICK_DOWN'
          }
        ]
      }
    },
    {
      module: 'joystick',
      position: 'bottom_bar',
      config: {}
    }
  ]
}

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
  module.exports = config
}
