const { insertEntity } = require("../services/table-service");
const createPostHandler = async (context) => {
  const { blog, title, content } = context.req.body;

  const entity = {
    PartitionKey: { _: blog },
    RowKey: { _: new Date().getTime().toString() },
    title: { _: title },
    content: { _: content },
  };

  const result = await insertEntity("posts", entity);

  context.res = {
    status: 200,
    body: result,
  };
  context.done();
};

module.exports = createPostHandler;
