const path = require("path");
/**
 * Service definition params for PROD environment.
 */
const params = {
  name: "vanabamapiprod",
  description: "The nodejs.org app for bam integration.",
  script: path.join(__dirname, "/../index.js"),
  env: {
    LOG: "windows_service",
    LOG_TAG: "Vana Payout Service PROD",
    LISTEN_PORT: "3000",
    PATH_DRIVE: "C:/",
    PATH_RESPONSES: "Respuesta_produccion",
    PATH_TRANSACTIONS: "Escucha_produccion",
    PATH_ACKNOWLEDGED: "Acknowledged_produccion",
    TABLE_PAYOUT_BATCH_ITEM: "payout_batch_item",
    TABLE_PAYOUT_BATCH: "payout_batch",
    TABLE_SETTING_GLOBAL: "setting_global",
    BANK_CREDENTIALS_SECRET_ID: "integrations/payout/bam",
  },
};

module.exports = params;
