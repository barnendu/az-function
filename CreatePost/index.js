const Joi = require("joi");
const MiddlewareHandler = require("azure-middleware");
const createPostHandler = require("./handler");
const { validateBody } = require("../middleware/validator");

const schema = Joi.object().keys({
  blog: Joi.string().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const createPost = new MiddlewareHandler()
  .use((context) => {
    // this is where to put your middleware logic
    validateBody(context, context.req.body, schema);
    context.next();
  })
  .use(createPostHandler)
  .catch((error, context) => {
    context.res = {
      status: 500,
      body: error ? error.message : "Internal server error",
    };
    context.done();
  })
  .listen();

module.exports = createPost;
