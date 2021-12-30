const { argv } = require("yargs");
const { installService } = require("./service");

const stage = argv.stage || "dev";
if (!["dev", "prod"].includes(stage)) {
  throw new Error(`Invalid 'stage' value '${stage}'.`);
}

const params = require(`./params_${stage}`);
console.log(`Install service for stage '${stage}'.`);
installService(params);
