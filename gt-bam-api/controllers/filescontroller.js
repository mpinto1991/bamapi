const WriteFileUseCase = require("../usecases/writefileusecase");
const humps = require("humps");
const { httpResponse } = require("../domain/httpresponse");
/**
 * Agreggates use case handling for the files recource.
 */
class FilesController {
  constructor() {
    this.writeFileUseCase = new WriteFileUseCase(...arguments);
    /**
     * Call use case for 'POST /write' endpoint.
     * @param {Object} ctx
     */
    this.writeFile = async (ctx) => {
      /* Validate event data */
      let validatedData = this.writeFileUseCase.validate(ctx.request.body.data);
      /* Call use case */
      validatedData = humps.camelizeKeys(validatedData);
      const response = await this.writeFileUseCase.execute(validatedData);
      /* Decorate response data */
      httpResponse(ctx, response);
    };
  }
}

module.exports = FilesController;
