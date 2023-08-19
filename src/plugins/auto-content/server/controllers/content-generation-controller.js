"use strict";

// module.exports = ({ strapi }) => ({
//   async generateQuestion(ctx) {
//     ctx.body = await strapi
//       .plugin('auto-content')
//       .service('questionService')
//       .generateQuestion(ctx.request.body.text);
//   },
// });


module.exports = ({ strapi }) => {
  const questionService =
    strapi.plugins["auto-content"].service("questionService");

  const generateQuestion = async (ctx) => {
    const text = ctx.request.body.text;

    if (text) {
      try {
        return questionService.generateQuestion(text);
      } catch (err) {
        console.log(err);
        ctx.throw(500, err);
      }
    }
    return ctx.throw(
      400,
      "Text is missing."
    );
  };

  return {
    generateQuestion,
  };
};
