const FilesController = require("../controllers/filescontroller");
/**
 * @param {AccountRepo} accountRepo
 * @param {BatchRepo} batchRepo
 * @param {FileRepo} fileRepo
 * @param {PayoutRepo} payoutRepo
 * @param {Places} places
 */
const routes = function() {
  const filesController = new FilesController(...arguments);
  return async (router) => {
    router.post("/write", filesController.writeFile);
  };
};

module.exports = routes;
