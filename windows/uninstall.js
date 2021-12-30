const { argv } = require("yargs");
const { uninstallService } = require("./service");

const stage = argv.stage || "dev";
if (!["dev", "prod"].includes(stage)) {
  throw new Error(`Invalid 'stage' value '${stage}'.`);
}

const params = require(`./params_${stage}`);
console.log(`Uninstall service for stage '${stage}'.`);
uninstallService(params);
