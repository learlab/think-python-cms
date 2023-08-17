import { Strapi } from '@strapi/strapi';

const plugin = require('../admin/src/pluginId')

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'keyphrases',
    plugin,
    type: 'keyphrase',
  })
};
