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
  "auto-content": {
    enabled: true,
    resolve: "./src/plugins/auto-content",
    config: {
      API_TOKEN: env("OPEN_AI_API_TOKEN"),
    },
    "content-versioning": {
      enabled:  true,
    },
  },
});
