"use strict"
var config = {};

// default config for running within vagrant
// exceptions for running in different evironments are set at the end
//web server settigns
config.serverPort: 4457 ,
config.useWebHttps: false,
config.serverHost: "echidna.dotbydot.eu",

//cors settigns
config.validDomains: "*",

//polyphemus settings
config.applicationName: "PRPServerCAS",
config.polyphemusPort: 4451,
config.polyphemusHost: "echidna.dotbydot.eu",
config.polyphemusActive: true,
config.polyphemusHttps: true,
config.useCAS:true,
config.CASService:"http://echidna.dotbydot.eu:4457/cas"

module.exports = config;
