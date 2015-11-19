var ld = require('lodash');

var config = {};

// default config for running within vagrant
// exceptions for running in different evironments are set at the end
config.development = {
  //environment
  env: 'development',

  //logging  options are: all, warn, info, error, log. example: {error:true, log:false }
  loglevel: {
    all: true
  },
 
  //web server settigns
  serverPort: 4457 || process.env.port || 1337,
  useWebHttps: false,
  serverHost: "echidna.dotbydot.eu",
  server: "https://echidna.dotbydot.eu:4457/",

  //cors settigns
  validDomains: "*",

  //polyphemus settings
  applicationName: "PRPServerCAS",
  polyphemusPort: 4451,
  polyphemusHost: "echidna.dotbydot.eu",
  polyphemusActive: true,
  polyphemusHttps: true,
  useCAS:true,
  CASService:"https://echidna.dotbydot.eu:4457/cas",

  // other settings
  other: {}
};

// config when running from the host of vagrant (NODE_ENV=host)
config.host = ld.cloneDeep(config.development);
config.host.env = 'host';
config.host.serverPort = process.env.PORT || 1337;

// config when running on a production server (NODE_ENV=production)
config.production = ld.cloneDeep(config.development);
config.production.env = 'production';
config.production.pmxActive = true;
config.production.SQLlogging = false;
config.production.loglevel = {error:true, warn:true, log:false,  info:false};

module.exports = config;
