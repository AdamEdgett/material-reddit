const Aviator = require('aviator');

const Routes = require('routes.js');

window.onload = function () {
  Aviator.setRoutes(Routes);
  Aviator.dispatch();
};
