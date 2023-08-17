"use strict";

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },
  async getContentTypes() {
    const contentTypes = strapi.contentTypes;
    return Object.values(contentTypes).filter((el) => el.uid.includes("api::"));
  },
  async setContent(ctx, headers) {
    let { pluginOptions, info, collectionName, options, attributes, kind } =
      ctx;
    const toDelete = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "publishedAt",
      "slug",
    ];
    toDelete.map((attr, i) => {
      delete attributes[attr];
    });
    if (ctx.contentGenEnabled && ctx.contentGenField) {
      pluginOptions = {
        keyphrases: {
          field: ctx.contentGenField,
        },
      };
    } else {
      pluginOptions = {};
    }

    const data = {
      pluginOptions,
      collectionName,
      draftAndPublish: options.draftAndPublish,
      singularName: info.singularName,
      pluralName: info.pluralName,
      attributes,
      displayName: info.displayName,
      kind,
      description: info.description,
    };

    ctx.request = {
      body: {
        contentType: data,
        components: [],
      },
    };
    ctx.params = { uid: ctx.uid };
    try {
      strapi
        .plugin("content-type-builder")
        .controller("content-types")
        .updateContentType(ctx);
    } catch (e) {
      console.log("service", e.errors);
    }
    return;
  },
  async generateKeyphrases(ctx, field) {
    const model = "text-davinci-001";
    const prompt =
      "Generate 5 keyphrases for the following text:\n\n" + ctx[field] + "\n\n";
    const temperature = 0.7;
    const response = fetch(`https://api.openai.com/v1/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapi.plugin("open-ai").config("API_TOKEN")}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        temperature,
        max_tokens: 15,
      }),
    })
      .then((res) => res.json().choices[0]?.text.trim())
      .catch((err) => "keyphgrase generation failed");
    console.log(res);
    return res;
  },
});
