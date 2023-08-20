import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import ContentGeneratorIcon from "./components/ContentGenerator/ContentGeneratorIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(
          /* webpackChunkName: "[request]" */ "./pages/App"
        );

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register({
      name: "question",
      pluginId: "auto-content",
      type: "text",
      intlLabel: {
        id: "auto-content.question.label",
        defaultMessage: "Question Content",
      },
      intlDescription: {
        id: "auto-content.question.description",
        defaultMessage: "Generate Question using AI",
      },
      icon: ContentGeneratorIcon,
      components: {
        Input: async () =>
          import("./components/ContentGenerator/ContentGeneratorInput"),
      },
      options: {
        base: [
          // {
          //   // preferably, this should be a dropdown/select with available attributes
          //   // for selecting rather than having to type in the name of the attribute
          //   name: "options.targetFieldTesxt",
          //   type: "string",
          //   intlLabel: {
          //     id: getTrad("options.base.targetFieldTesxt.label"),
          //     defaultMessage: "Target field",
          //   },
          //   description: {
          //     id: getTrad("options.base.targetFieldTesxt.description"),
          //     defaultMessage: "Name of the attribute to generate slug against",
          //   },
          // },
        ],
        advanced: [],
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
