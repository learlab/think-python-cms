'use strict';

/**
 * preface router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::preface.preface');
