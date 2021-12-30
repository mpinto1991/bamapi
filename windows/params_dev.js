const path = require("path");
/**
 * Service definition params for DEV environment.
 */
const params = {
  name: "vanabamapidev",
  description: "The nodejs.org app for bam integration.",
  script: path.join(__dirname, "/../index.js"),
  env: {
    LOG: "windows_service",
    LOG_TAG: "Vana BAM Service DEV",
    LISTEN_PORT: "3001",
    PATH_DRIVE: "C:/",
    PATH_RESPONSES: "Respuesta_desarrollo",
    PATH_TRANSACTIONS: "Escucha_desarrollo",
    PATH_ACKNOWLEDGED: "Acknowledged_desarrollo",
    TABLE_PAYOUT_BATCH_ITEM: "payout_batch_item_dev",
    TABLE_PAYOUT_BATCH: "payout_batch_dev",
    TABLE_SETTING_GLOBAL: "setting_global_dev",
    BANK_CREDENTIALS_SECRET_ID: "integrations/payout/bam/dev",
  },
};

module.exports = params;
