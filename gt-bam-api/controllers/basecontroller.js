const NotImplementedError = require("../domain/errors/notimplemented");
/**
 * Agreggates use case handling for the base resource.
 */
class BaseController {
  /**
   * @param {BatchRepo} batchRepo
   * @param {FileRepo} fileRepo
   * @param {PayoutRepo} payoutRepo
   * @param {Places} places
   */
  constructor() {
    /**
     * Call use case for 'GET /' endpoint.
     * @param {Object} ctx
     */
    this.getBase = async (ctx) => {
      throw new NotImplementedError(ctx.method, ctx.path);
    };
  }
}

module.exports = BaseController;
