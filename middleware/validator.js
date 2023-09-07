exports.validateBody = async (context, body, schema) => {
  try {
    if (!body) {
      context.res = {
        status: 400,
        body: "Request body is empty.",
      };
      context.done();
      return;
    }

    await schema.validateAsync(body);
  } catch (error) {
    context.res = {
      status: 400,
      body: error.message,
    };
    context.done();
  }
};
