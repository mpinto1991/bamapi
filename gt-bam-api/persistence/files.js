const path = require("path");
const archiver = require("archiver-promise");
/**
 *
 */
class FileRepo {
  /**
   * @param {Object} client instance of fs.promises
   */
  constructor(client) {
    this.client = client;
  }
  /**
   * Get a list of items by file name.
   * @param {String} filePath
   * @return {Promise<Array<Object>>}
   */
  async listFiles(directory) {
    const fileBase = await this.client.readdir(directory);
    const fileList = [];
    for (let j in fileBase) {
      if (fileBase[j].startsWith(".")) continue;
      const filePath = path.join(directory, fileBase[j]);
      const fileInfo = await this.getInfo(filePath);
      if (fileInfo.isFile) fileList.push(fileInfo);
    }
    return fileList;
  }
  /**
   * @param {String} filePath
   * @return {Promise<Object>}
   */
  async getInfo(filePath) {
    try {
      const stat = await this.client.stat(filePath);
      const { base, name, dir } = path.parse(filePath);
      return {
        fileBase: base,
        fileName: name,
        filePath: filePath,
        filePlace: dir,
        isFile: stat.isFile(),
        updatedAt: stat.mtime,
      };
    } catch (error) {
      return null;
    }
  }
  /**
   * @param {String} filePath
   * @return {Promise<Object>}
   */
  async read(filePath) {
    const fileInfo = await this.getInfo(filePath);
    if (!fileInfo) return null;
    const fileData = await this.client.readFile(filePath);
    return { fileData, ...fileInfo };
  }
  /**
   * @param {String} filePath
   * @param {String} fileData
   * @return {Promise<Object>}
   */
  async write(filePath, fileData) {
    await this.client.writeFile(filePath, fileData);
    const info = await this.getInfo(filePath);
    return { fileData, ...info };
  }
  /**
   * @param {String} filePath
   * @return {Object}
   */
  async remove(filePath) {
    console.log("FileRepo.remove", filePath);
    const fileInfo = await this.getInfo(filePath);
    if (!fileInfo) return null;
    await this.client.unlink(filePath);
    return { ...fileInfo };
  }
  /**
   * @param {String} targetPath output file path
   * @param {Object} fileList input file paths
   * @return {Object}
   */
  async archive(targetPath, fileList) {
    const archive = archiver(targetPath, { store: true });
    const items = [];
    for (const fileRule of fileList) {
      try {
        const fileData = await this.client.readFile(fileRule.from);
        archive.append(fileData.toString(), { name: fileRule.to });
        items.push(fileRule);
      } catch (err) {
        console.log(`File '${fileRule.from}' not found, exclude from tar.zip`);
      }
    }
    return { items, archive: await archive.finalize() };
  }
}

module.exports = FileRepo;
