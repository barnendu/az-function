const azure = require("azure-storage");
const { queryEntities } = require("../services/table-service");
module.exports = async function (context, req) {
  try {
    const { blog, id } = context.bindingData;

    if (!blog || !id) {
      context.res = {
        status: 400,
        body: "Blog and Post ID are required",
      };
      return;
    }

    var query = new azure.TableQuery()
      .where("PartitionKey eq ?", blog)
      .and("RowKey eq ?", id.toString());

    const result = await queryEntities("Posts", query);

    context.res = {
      body: result,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};
