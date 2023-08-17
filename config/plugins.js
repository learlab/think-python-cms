module.exports = ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  "drag-drop-content-types": {
    enabled: true,
  },
  "open-ai": {
    enabled: true,
    config: {
      API_TOKEN: env("OPEN_AI_API_TOKEN"),
    },
  },
  "content-generator": {
    enabled: true,
    resolve: "./src/plugins/content-generator",
    config: {
      API_TOKEN: env("OPEN_AI_API_TOKEN"),
      contentTypes: {
        article: {
          field: 'keyphrases',
          prompt: 'Extract keyphrases from the following text: ',
          references: 'title',
        },
      },
    },
  },
});
