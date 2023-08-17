"use strict";

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("content-generator")
      .service("contentService")
      .getWelcomeMessage();
  },

  async getContentTypes(ctx) {
    try {
      ctx.body = await strapi
        .plugin("content-generator")
        .service("contentService")
        .getContentTypes();
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async setContent(ctx) {
    const { body, headers } = ctx.request;
    // console.log(headers)
    try {
      await strapi
        .plugin("content-generator")
        .service("contentService")
        .setSlugs(body, headers);
      ctx.body = await strapi
        .plugin("content-generator")
        .service("contentService")
        .getContentTypes();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
});
