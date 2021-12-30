const BaseController = require("../controllers/basecontroller");
/**
 * @param {AccountRepo} accountRepo
 * @param {BatchRepo} batchRepo
 * @param {AccountRepo} accountRepo
 * @param {FileRepo} fileRepo
 * @param {PayoutRepo} payoutRepo
 */
const routes = function() {
  const basecontroller = new BaseController(...arguments);
  return async (router) => {
    router.get("/", basecontroller.getBase);
  };
};

module.exports = routes;
