const Service = require("node-windows").Service;
/**
 * Creates a service from parameters.
 * @param {Object} params
 */
const createService = (params) => {
  console.log(`Create service with params: ${JSON.stringify(params, null, 2)}`);
  /* Parse environment variables from params. */
  const environment = [];
  for (const key in params.env)
    environment.push({
      name: key,
      value: params.env[key],
    });
  /* Create a service instance. */
  const service = new Service({
    name: params.name,
    description: params.description,
    script: params.script,
    env: environment,
    // workingDirectory: '...',
    //, allowServiceLogon: true
    // nodeOptions: [
    //   '--inspect-brk'
    // ]
  });

  // service.logOnAs.domain = 'mydomain.local';
  // service.logOnAs.account = 'username';
  // service.logOnAs.password = 'password';

  /* Handle uninstall event. */
  service.on("uninstall", () => {
    console.log(`Service '${service.name}' uninstalled.`);
  });
  /* Handle alreadyinstalled event. */
  service.on("alreadyinstalled", () => {
    console.log(`Service '${service.name}' already installed.`);
  });
  /* Handle invalidinstallation event. */
  service.on("invalidinstallation", () => {
    console.log(`Service '${service.name}' invalid instalaltion.`);
  });
  /* Handle alreadyuninstalled event. */
  service.on("alreadyuninstalled", () => {
    console.log(`Service '${service.name}' already uninstalled.`);
  });
  /* Handle install event. */
  service.on("install", () => {
    console.log(`Service '${service.name}' installed.`);
    service.start();
  });
  /* Handle install event. */
  service.on("start", () => {
    console.log(`Service '${service.name}' started.`);
  });
  /* Handle install event. */
  service.on("stop", () => {
    console.log(`Service '${service.name}' stopped.`);
  });
  /* Handle error event. */
  service.on("error", (error) => {
    console.log(`Service '${service.name}' error:`, error);
  });
  /* Return the instance with event handlers. */
  return service;
};
/**
 * Create and install a service from parameters.
 * @param {Object} params
 */
const installService = (params) => {
  const service = createService(params);
  service.install();
};
/**
 * Create and uninstall a service from parameters.
 * @param {Object} params
 */
const uninstallService = (params) => {
  const service = createService(params);
  service.uninstall();
};

module.exports = {
  uninstallService,
  installService,
  createService,
};
