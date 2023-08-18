'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('auto-content')
      .service('myService')
      .getWelcomeMessage();
  },
});
