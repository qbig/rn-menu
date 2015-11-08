'use strict';

var React  = require('react-native');
var {
  PixelRatio
} = React;

module.exports = {
  ycyred: '#891F02',
  ycycream: '#FFFAF0',
  ycycream2: '#F2EDE4',
  spgreen: '#10E790'

  // http://iosfonts.com/
  fontRegular: "HelveticaNeue",
  fontIcon: "HelveticaNeue", // TODO: get an icon font and include

  listLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 10,
  },
  listFullLine: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(), // thinnest possible line
    marginLeft: 0,
  }
};
