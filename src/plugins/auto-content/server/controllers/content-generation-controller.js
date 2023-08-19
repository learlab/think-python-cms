module.exports = ({ strapi }) => {
  const questionService =
    strapi.plugins["auto-content"].service("questionService");

  const generateQuestion = async (ctx) => {
    const text = ctx.request.body.text;

    if (text && text.length > 0) {
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
