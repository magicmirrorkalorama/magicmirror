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
  timeFormat: 24,
  units: 'imperial',
  serverOnly: true,
  // local for armv6l processors, default
  //   starts serveronly and then starts chrome browser
  // false, default for all  NON-armv6l devices
  // true, force serveronly mode, because you want to.. no UI on this device

  modules: [
    {
      module: 'alert'
    },
    {
      module: 'updatenotification',
      position: 'top_bar'
    },
    {
      module: 'MMM-Remote-Control',
      position: 'bottom_left',
      config: {
        showModuleApiMenu: true
      }
    },
    {
      module: 'MMM-DailyPokemon',
      position: 'top_center',
      config: {
        updateInterval: 10000,
        grayscale: false, //Turns pokemon image and type images gray to match magic mirror styles
        minPoke: 1, //Default to all pokemon
        maxPoke: 649, //Highest number - 802 pokemon currently exist
        showType: true, //Shows type icons below pokemon's image
        stats: true,
        language: 'en',
        genera: true,
        gbaMode: true,
        nameSize: 32
      }
    },
    {
      module: 'MMM-Buttons',
      config: {
        buttons: [
          {
            pin: 17,
            name: 'RED',
            longPress: {
              notification: 'SHOW_ALERT',
              payload: { message: 'REDDDDDDDD' },
              title: 'TEST',
              message: 'RED BUTTON'
            },
            shortPress: {
              notification: 'SHOW_ALERT',
              payload: { message: 'RED' }
            }
          },
          {
            pin: 23,
            name: 'GREEN',
            longPress: {
              notification: 'SHOW_ALERT',
              payload: { message: 'GREEEEEN' },
              title: 'TEST',
              message: 'GREEN BUTTON'
            },
            shortPress: {
              notification: 'SHOW_ALERT',
              payload: { message: 'GREEN' }
            }
          }
        ]
      }
    }
    // {
    //   module: 'clock',
    //   position: 'top_left'
    // },
    // {
    //   module: 'calendar',
    //   header: 'US Holidays',
    //   position: 'top_left',
    //   config: {
    //     calendars: [
    //       {
    //         symbol: 'calendar-check',
    //         url: 'webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics'
    //       }
    //     ]
    //   }
    // },
    // {
    //   module: 'compliments',
    //   position: 'lower_third'
    // },
    // {
    //   module: 'currentweather',
    //   position: 'top_right',
    //   config: {
    //     location: 'New York',
    //     locationID: '', //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
    //     appid: 'YOUR_OPENWEATHER_API_KEY'
    //   }
    // },
    // {
    //   module: 'weatherforecast',
    //   position: 'top_right',
    //   header: 'Weather Forecast',
    //   config: {
    //     location: 'New York',
    //     locationID: '5128581', //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
    //     appid: 'YOUR_OPENWEATHER_API_KEY'
    //   }
    // },
    // {
    //   module: 'newsfeed',
    //   position: 'bottom_bar',
    //   config: {
    //     feeds: [
    //       {
    //         title: 'New York Times',
    //         url: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    //       }
    //     ],
    //     showSourceTitle: true,
    //     showPublishDate: true,
    //     broadcastNewsFeeds: true,
    //     broadcastNewsUpdates: true
    //   }
    // }
  ]
}

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {
  module.exports = config
}
