const Ajv = require("ajv");
const BadRequestError = require("../domain/errors/badrequest");
/**
 *
 */
class WriteFileUseCase {
  /**
   * @param {FileRepo} fileRepo
   */
  constructor(
    fileRepo,
  ) {
    this.ajv = new Ajv();
    this.fileRepo = fileRepo;
  }
  /**
   * @param {Object} payload
   * @returns {Object}
   */
  validate(payload) {
    const schema = {
      type: "object",
      properties: {
        file_content: { type: "string" },
        file_name: { type: "string" },
        file_path: { type: "string" }
      },
      required: ["file_content", "file_name", "file_path"],
      additionalProperties: true
    }
    if (this.ajv.validate(schema, payload)) {
      let validatedData = Object.assign({}, payload);
      if (!validatedData.file_name.includes(".xml")) {
        validatedData.file_name = `${validatedData.file_name}.xml`;
      }
      return validatedData;
    }
    throw new BadRequestError(this.ajv.errorsText());
  }
  /**
   * @param {Object} data
   * @returns {Object}
   */
  async execute(data) {
    let { fileContent, fileName, filePath } = data;
    /* Create files in given directory */
    await this.fileRepo.write(
      `${filePath}/${fileName}`,
      fileContent
    );
    return {
      message: "success"
    }
  }
}

module.exports = WriteFileUseCase;
