module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'contentController.index',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/allContentTypes',
    handler: 'contentController.getContentTypes',
    config: {
      policies: [],
      auth: false,
    }
  },
  {
    method: 'POST',
    path: '/setContent',
    handler: 'contentController.setContent',
    config: {
      policies: [],
      auth: false,
    }
  }
];
