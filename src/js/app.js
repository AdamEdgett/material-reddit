import Aviator from 'aviator';

import Routes from 'routes.js';

window.onload = function () {
  Aviator.setRoutes(Routes);
  Aviator.dispatch();
};
