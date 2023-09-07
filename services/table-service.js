var azure = require("azure-storage");

var tableSvc = azure.createTableService(
  "mediumtutorial",
  process.env.AZURE_STORAGE_ACCESS_KEY
);

const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(
      tableName,
      entity,
      { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
      function (error, result, response) {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      }
    );
  });
};

const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(
      tableName,
      query,
      null,
      { payloadFormat: "application/json;odata=nometadata" },
      function (error, result, response) {
        if (error) {
          reject(error);
        }

        resolve(response.body);
      }
    );
  });
};

const updateEntity = (table, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.mergeEntity(table, entity, function (error, result, response) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const deleteEntity = (table, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.deleteEntity(table, entity, function (error, result, response) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;
